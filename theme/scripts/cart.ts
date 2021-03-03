import { handleFetchJSONResponse } from './utils';
import activatable from './activatable';

export default(function() {
  const Cart = {
    SELECTORS: {
      addToCartForm: "[data-add-to-cart-form]",
      addToCartButton: "[data-add-to-cart-button]",
      navCartItemCount: "[data-nav-cart-item-count]",
    },
    ATTRIBUTES: {
      productType: "data-product-type",
      disabled: "disabled"
    },
    CONSTANTS: {
      "addedToCart": "Added to cart"
    },

    init() {
      const addToCartForms: Element[] = [].slice.call(
        document.querySelectorAll(Cart.SELECTORS.addToCartForm)
      );

      addToCartForms.forEach(Cart.bindEventListeners);
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

    getCartJson() {
      return fetch("/cart.js", {
        headers: {
          "Content-Type": "application/json",
        },
      }).then(handleFetchJSONResponse)
    },

    async onChange(productType: string) {
      const cartJson =  await Cart.getCartJson();
      Cart.updateCartItemCount(cartJson.item_count);
      Cart.updateProductInfoBar(productType);
    },

    updateCartItemCount(cartItemCount: string) {
      const navCartItemsCount = [].slice.call(document.querySelectorAll(Cart.SELECTORS.navCartItemCount));

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
