
import * as Sentry from "@sentry/browser";

import handleFetchJSONResponse from './utils/handleFetchJSONResponse';
import activatable from './activatable';

enum Action {
  ADD = 'add',
  REMOVE = 'remove',
  UPDATE = 'update'
};

export default(function() {
  const Cart = {
    SELECTORS: {
      addToCartForm: "[data-add-to-cart-form]",
      addToCartButton: "[data-add-to-cart-button]",
      quantitySelector: "[data-quantity-selector]",
      quantity: "data-quantity",
      increment: "[data-increment]",
      decrement: "[data-decrement]",
      quantitySelectorVariantId: "data-quantity-selector-variant-id",
      quantityIndicator: "[data-quantity-indicator]",
      removeFromCartButton: "[data-remove-from-cart-button]",
      navCartItemCount: "[data-nav-cart-item-count]",
      cartInner: "[data-cart-inner]",
      cartItemCount: "[data-cart-item-count]"
    },
    ATTRIBUTES: {
      disabled: "disabled",
      lineItemVariantId: "data-line-item-variant-id",
      lineItemQuantity: "data-line-item-quantity",
      itemCount: "data-cart-item-count",
      variantId: "data-variant-id",
      pointerEvents: "pointerEvents",
    },
    CONSTANTS: {
      addedToCart: "Added to cart",
      addToCart: "Add to cart",
      remove: "Remove",
      removing: "Removing...",
      auto: "auto",
      none: "none",
    },

    init() {
      const addToCartForms: Element[] = [].slice.call(
        document.querySelectorAll(Cart.SELECTORS.addToCartForm)
      );

      const removeLineItemButtons: Element[] = [].slice.call(document.querySelectorAll(Cart.SELECTORS.removeFromCartButton));

      addToCartForms.forEach(Cart.bindAddEventListeners);
      removeLineItemButtons.forEach(Cart.bindRemoveEventListeners);

      const quantitySelector: Element[] = [].slice.call(
        document.querySelectorAll(Cart.SELECTORS.quantitySelector)
      );
      
      quantitySelector.forEach(Cart.bindQuantitySelectorEventListeners);
    },

    bindAddEventListeners(form: Element) {
      const formId = form.id;
      form.addEventListener("submit", async(e: any) => {
        e.preventDefault();

        const form = document.getElementById(formId) as HTMLFormElement;

        if (!form) return;

        const variantId = form.variant?.value;
        const quantity = form.quantity?.value ?? 1;

        if (!variantId) return;

        try {
          await Cart.addLineItem(variantId, quantity);
        } catch (response) {
          Sentry.captureException(response);
          throw response;
        }
      });
    },

    bindRemoveEventListeners(removeButton: any) {
      const lineItemVariantId = removeButton.getAttribute(Cart.ATTRIBUTES.lineItemVariantId);
      const lineItemQuantity = removeButton.getAttribute(Cart.ATTRIBUTES.lineItemQuantity);

      removeButton.addEventListener('click', async(e: any) => {
        e.preventDefault();

        const quantity = parseInt(lineItemQuantity) - parseInt(lineItemQuantity);

        try {
          Cart.setRemoving(removeButton);
          await Cart.removeLineItem(lineItemVariantId, quantity);
        } catch (response) {
          Cart.resetRemoving(removeButton);
          Sentry.captureException(response);
          throw response;
        }
      });
    },

    bindQuantitySelectorEventListeners(quantitySelector: Element) {
      const variantId = quantitySelector.getAttribute(
        Cart.SELECTORS.quantitySelectorVariantId
      );

      if (!variantId) return;
  
      const quantity = quantitySelector.getAttribute(Cart.SELECTORS.quantity);
      const decrement = quantitySelector.querySelector(Cart.SELECTORS.decrement);
      const increment = quantitySelector.querySelector(Cart.SELECTORS.increment);
      const indicator = quantitySelector.querySelector(
        Cart.SELECTORS.quantityIndicator
      );
  
      if (!decrement) {
        return console.warn("Missing decrement quantity button");
      }
  
      if (!increment) {
        return console.warn("Missing increment quantity button");
      }
  
      if (!quantity || isNaN(parseInt(quantity))) {
        return console.warn("Missing quantity");
      }
  
      if (!indicator) {
        return console.warn("Missing quantity indicator");
      }
  
      decrement.addEventListener("click", async(e: any) => {
        e.preventDefault();

        try {
          await Cart.changeLineItem(variantId, parseInt(quantity) - 1);

        } catch (response) {
          Sentry.captureException(response);
          throw response;
        }
      });
  
      increment.addEventListener("click", async(e: any) => {
        e.preventDefault();

        try {
          await Cart.changeLineItem(variantId, parseInt(quantity) + 1);
          
        } catch (response) {
          Sentry.captureException(response);
          throw response;
        }
      });
    },

    async addLineItem(variantId: string, quantity: number) {
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
        .then(() => Cart.onChange(variantId, Action.ADD))
    },

    async changeLineItem(variantId: string, quantity: number) {
      return fetch("/cart/change.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: variantId,
          quantity,
        }),
      })
        .then(handleFetchJSONResponse)
        .then(() => Cart.onChange(variantId, Action.UPDATE))
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
      .then(() => Cart.onChange(variantId, Action.REMOVE))
    },

    async onChange(variantId: string, action: Action ) {
      const cartHtml = await Cart.getCartHtml();
      Cart.render(cartHtml);

      const cartItemCount = document.querySelector(Cart.SELECTORS.cartItemCount).getAttribute(Cart.ATTRIBUTES.itemCount);
      if (cartItemCount) {
        Cart.updateCartItemCount(cartItemCount);
      }

      if (variantId) {
        Cart.updateProductInfoBar(variantId, action);
      }

      Cart.init();
    },

    setRemoving(removeButton: HTMLElement) {
      removeButton.innerHTML = Cart.CONSTANTS.removing;
      removeButton.style[Cart.ATTRIBUTES.pointerEvents] = Cart.CONSTANTS.none;
    },

    resetRemoving(removeButton: HTMLElement) {
      removeButton.innerHTML = Cart.CONSTANTS.remove;
      removeButton.style[Cart.ATTRIBUTES.pointerEvents] = Cart.CONSTANTS.auto;
    },

    getCartHtml() {
      return fetch("/pages/cart", {
        headers: {
          "Content-Type": "text/html",
        },
      })
        .then((response) => response.text());
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
          if (parseInt(cartItemCount) === 0) {
            activatable.deactivate(navCartItemsCount);
          } else {
            navCartItem.textContent = cartItemCount;
          }
        } else {
          activatable.activate([], navCartItemsCount);
          navCartItem.textContent = cartItemCount;
        }
      })
    },

    updateProductInfoBar(variantId: string, action: Action) {
      const addToCartButton = document.querySelector(Cart.SELECTORS.addToCartButton);

      if (!addToCartButton) return;
      
      const addToCartVariantId = addToCartButton.getAttribute(Cart.ATTRIBUTES.variantId);

      if (addToCartVariantId === variantId) {
        if (action === Action.ADD || action === Action.UPDATE) {
          addToCartButton.textContent = Cart.CONSTANTS.addedToCart;
          addToCartButton.setAttribute(Cart.ATTRIBUTES.disabled, Cart.ATTRIBUTES.disabled);
        }

        if (action === Action.REMOVE) {
          addToCartButton.textContent = Cart.CONSTANTS.addToCart;
          addToCartButton.removeAttribute(Cart.ATTRIBUTES.disabled);
        }
      }
    },
  };

  Cart.init();
})();
