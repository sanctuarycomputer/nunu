
import * as Sentry from "@sentry/browser";

import handleFetchJSONResponse from './utils/handleFetchJSONResponse';
import activatable from './activatable';

export default(function() {
  const Cart = {
    SELECTORS: {
      productAddToCartForm: "[data-product-add-to-cart-form]",
      desktopProductAddToCartButton: "[data-desktop-product-add-to-cart-button]",
      mobileProductAddToCartButton: "[data-mobile-product-add-to-cart-button]",
      desktopProductAddToCartButtonError: "[data-desktop-product-add-to-cart-button-error]",
      mobileProductAddToCartButtonError: "[data-mobile-product-add-to-cart-button-error]",
      quantity: "data-quantity",
      increment: "[data-increment]",
      decrement: "[data-decrement]",
      quantitySelector: "[data-quantity-selector]",
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
      pointerEvents: "pointerEvents",
    },
    CONSTANTS: {
      addToCart: "Add to cart",
      addedToCart: "Added to cart",
      remove: "Remove",
      removing: "Removing...",
      auto: "auto",
      none: "none",
    },

    init(bindProductAddToCartForms = true) {

      if (bindProductAddToCartForms) {
        const productAddToCartForms: Element[] = [].slice.call(
          document.querySelectorAll(Cart.SELECTORS.productAddToCartForm)
        );
        productAddToCartForms.forEach(Cart.bindAddEventListeners);
      }

      const removeLineItemButtons: Element[] = [].slice.call(document.querySelectorAll(Cart.SELECTORS.removeFromCartButton));
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

      removeButton.addEventListener('click', async(e: any) => {
        e.preventDefault();

        const quantity = 0;

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
        .then(() => Cart.onChange(Cart.handleProductAddedToCart))
        .catch(() => {
          Cart.handleProductAddedToCartError();
        })
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
        .then(() => Cart.onChange())
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
      .then(() => Cart.onChange())
    },

    async onChange(callback?: () => void) {
      const cartHtml = await Cart.getCartHtml();
      Cart.render(cartHtml);

      const cartItemCount = document.querySelector(Cart.SELECTORS.cartItemCount).getAttribute(Cart.ATTRIBUTES.itemCount);
      if (cartItemCount) {
        Cart.updateCartItemCount(cartItemCount);
      }
      
      //This callback is specifically used to handle the add to cart button behavior after an item is added to the cart. See function handleProductAddedToCart. 
      if (callback) {
        callback();
      }
      
      /**
       * TO-DO (#176): Better solve for this
       * Currently, when calling Cart.init()
       * after when onChange runs, binds multiple event
       * to the productAddToCartForm on the product#show page
       * 
       * Potential Solutions:
       * - Move addToCart form logic out of cart
       * - Track and remove bound event listeners
       */
      Cart.init(false);
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
  
    handleProductAddedToCart() {
      const desktopProductAddToCartButton = document.querySelector(Cart.SELECTORS.desktopProductAddToCartButton);
      const mobileProductAddToCartButton = document.querySelector(Cart.SELECTORS.mobileProductAddToCartButton);

      if (desktopProductAddToCartButton) {
        Cart.handleProductAddedToCartButtonStyling(desktopProductAddToCartButton);
      }

      if (mobileProductAddToCartButton) {
        Cart.handleProductAddedToCartButtonStyling(mobileProductAddToCartButton);
      }
    },
    
    handleProductAddedToCartButtonStyling(button: Element) {
      button.textContent = Cart.CONSTANTS.addedToCart;
      button.setAttribute(Cart.ATTRIBUTES.disabled, Cart.ATTRIBUTES.disabled);

      setTimeout(() => {
        button.textContent = Cart.CONSTANTS.addToCart;
        button.removeAttribute(Cart.ATTRIBUTES.disabled);
      }, 2000);  
    },

    //Handles any errors adding an item to the cart
    handleProductAddedToCartError() {
      const desktopProductAddToCartButtonError = document.querySelector(Cart.SELECTORS.desktopProductAddToCartButtonError);
      const mobileProductAddToCartButtonError = document.querySelector(Cart.SELECTORS.mobileProductAddToCartButtonError);

      if (desktopProductAddToCartButtonError) {
        Cart.handleProductAddedToCartButtonErrorStyling(desktopProductAddToCartButtonError);
      }

      if (mobileProductAddToCartButtonError) {
        Cart.handleProductAddedToCartButtonErrorStyling(mobileProductAddToCartButtonError);
      }
    },

    //Shows text below the Add to Cart button, indicating that the customer was not able to add that item to their cart
    handleProductAddedToCartButtonErrorStyling(button: Element) {
      button.classList.toggle("none");

      setTimeout(() => {
        button.classList.toggle("none");
      }, 4000);  
    },

  };

  Cart.init();
})();
