import { handleFetchJSONResponse } from './utils';
import activatable from './activatable';

export default(function() {
  const Cart = {
    SELECTORS: {
      addToCartForm: "[data-add-to-cart-form]",
      addToCartButton: "[data-add-to-cart-button]",
      removeFromCartButton: "[data-remove-from-cart-button]",
      navCartItemCount: "[data-nav-cart-item-count]",
      cartInner: "[data-cart-inner]"
    },
    ATTRIBUTES: {
      productType: "data-product-type",
      disabled: "disabled",
      lineItemVariantId: "data-line-item-variant-id",
      lineItemQuantity: "data-line-item-quantity",
    },
    CONSTANTS: {
      "addedToCart": "Added to cart"
    },

    init() {
      const addToCartForms: Element[] = [].slice.call(
        document.querySelectorAll(Cart.SELECTORS.addToCartForm)
      );

      const removeLineItemButtons: Element[] = [].slice.call(document.querySelectorAll(Cart.SELECTORS.removeFromCartButton));

      addToCartForms.forEach(Cart.bindEventListeners);
      removeLineItemButtons.forEach(Cart.bindRemoveEventListeners);
    },

    bindEventListeners(form: Element) {
      const formId = form.id;
      form.addEventListener("submit", async(e: any) => {
        e.preventDefault();

        const form = document.getElementById(formId) as HTMLFormElement;

        if (!form) return;

        const variantId = form.variant?.value;
        const quantity = form.quantity?.value ?? 1;
        const productType = form.getAttribute(Cart.ATTRIBUTES.productType);

        if (!variantId) return;

        try {
          await Cart.addLineItem(variantId, quantity, productType);
        } catch (response) {
          // TO-DO: Add Sentry
          console.warn("Item could not be added to cart");
          throw response;
        }
      });
    },

    bindRemoveEventListeners(removeButton: any) {
      const lineItemVariantId = removeButton.getAttribute(Cart.ATTRIBUTES.lineItemVariantId);
      const lineItemQuantity = removeButton.getAttribute(Cart.ATTRIBUTES.lineItemQuantity);

      removeButton.addEventListener('click', async(e: any) => {
        e.preventDefault();

        const quantity = parseInt(lineItemQuantity) - 1;

        try {
          await Cart.removeLineItem(lineItemVariantId, quantity);
        } catch (response) {
          // TO-DO: Add Sentry
          console.warn("Item could not be added to cart");
          throw response;
        }
      });
    },

    async addLineItem(variantId: string, quantity: number, productType: string) {
      return fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              id: variantId,
              quantity,
            },
          ],
        }),
      })
        .then(handleFetchJSONResponse) 
        .then(() => Cart.onChange(productType))
    },

    async removeLineItem(variantId: string, quantity: number) {
      return fetch("/cart/change.js", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: variantId,
          quantity: quantity
        })
      }).then(handleFetchJSONResponse) 
      .then(Cart.onChange)
    },

    getCartJson() {
      return fetch("/cart.js", {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(handleFetchJSONResponse)
    },

    getCartHtml() {
      return fetch("/pages/cart", {
        headers: {
          "Content-Type": "text/html",
        },
      })
        .then((response) => response.text());
    },

    async onChange(productType?: string) {
      const cartHtml = await Cart.getCartHtml();
      const cartInner = Cart.render(cartHtml)[0];
      const cartJson =  await Cart.getCartJson();
      Cart.updateCartItemCount(cartJson.item_count);

      if (productType) {
        Cart.updateProductInfoBar(productType);
      }

      if (cartInner) {
        console.log("We out here")
        // const quantityIndicators: Element[] = [].slice.call(
        //   cartInner.querySelectorAll(Cart.SELECTORS.quantityIndicator)
        // );
        // const cartTotal = quantityIndicators.reduce((acc, el) => {
        //   acc = acc + parseInt(el.textContent);
        //   return acc;
        // }, 0);
        // Cart.updateIndicators(cartTotal);
      }

      Cart.init();
    },

    render(cartHtml) {
      const cartInners: Element[] = [].slice.call(
        document.querySelectorAll(Cart.SELECTORS.cartInner)
      );

      if (cartInners.length === 0) return [];

      cartInners.forEach((cartInner) => {
        cartInner.innerHTML = cartHtml;
      });

      return cartInners;
    },


    updateCartItemCount(cartItemCount: string) {
      const navCartItemsCount = [].slice.call(document.querySelectorAll(Cart.SELECTORS.navCartItemCount));

      if (!navCartItemsCount.length) return;

      navCartItemsCount.forEach(navCartItem => {
        if (activatable.isActive(navCartItem)) {
          navCartItem.textContent = cartItemCount;
        } else {
          activatable.activate([], navCartItemsCount);
          navCartItem.textContent = cartItemCount;
        }
      })
    },

    updateProductInfoBar(productType: string) {
      if (productType) {
        const addToCartButton = document.querySelector(Cart.SELECTORS.addToCartButton);

        addToCartButton.textContent = Cart.CONSTANTS.addedToCart;
        addToCartButton.setAttribute(Cart.ATTRIBUTES.disabled, Cart.ATTRIBUTES.disabled);
      }
    },
  };

  Cart.init();
})();
