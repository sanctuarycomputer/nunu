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
      products: {}
    },

		init() {
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

      ProductVariantHandler.STATE.products[variantId] = variantQty;

    },

  }

	ProductVariantHandler.init();
  
})();
