// const currentProductVariants = (window as any).__current_product_variants;

export default(function() {
	const ProductVariantHandler = {
		SELECTORS: {
      quantitySelector: "data-product-quantity-selector",
      variantSelector: "data-product-variant-selector",
      variantOption: "data-product-variant-option",
		},
    ATTRIBUTES: {
      variantId: "[data-variantId]",
      variantQty: "[data-variantQty]",
		},
    STATE: {
      products: {},
      selectedProductVariantId: null
    },

		init() {
      //do i need to get all variant selectors on all pages? 
      const variantSelector: Element[] = [].slice.call(
        document.querySelectorAll(ProductVariantHandler.SELECTORS.variantSelector)
      );
      
      variantSelector.forEach(ProductVariantHandler.bindVariantSelectorEventListeners);
		},

    bindVariantSelectorEventListeners(variantSelector: Element) {
      const variantId = variantSelector.getAttribute(
        ProductVariantHandler.ATTRIBUTES.variantId
      );

      const variantQty = variantSelector.getAttribute(
        ProductVariantHandler.ATTRIBUTES.variantQty
      );

      if (!variantId && !variantQty) return;
      
      //when the user changes the current selected item in the variant select, update the selectedProductVariantId  
      variantSelector.addEventListener("change", async(e: any) => {
        e.preventDefault();

        ProductVariantHandler.STATE.selectedProductVariantId = variantId
      });

      //add to the Products object
      ProductVariantHandler.STATE.products[variantId] = variantQty;
    },
  }

	ProductVariantHandler.init();
  
})();
