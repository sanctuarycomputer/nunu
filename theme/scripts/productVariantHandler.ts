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

		init() {
      //create objects of the products with Id, variant, quantity 
      //what's the variant selected
      //update teh options to reflect
      //on init and when something chagnes (onChange on varaitnselect). this is new selected variant, look through the variant map created, 
      //another function that will create a DOM for those option.s this variants has max 10, in JS create 10 options, the insert it in the quantity dropdown.. 
      
      const variantSelector: Element[] = [].slice.call(
        document.querySelectorAll(ProductVariantHandler.SELECTORS.variantSelector)
      );
      
      variantSelector.forEach(ProductVariantHandler.bindVariantSelectorEventListeners);

      console.log('variant', variantSelector)
		},

    bindVariantSelectorEventListeners() {

    }

  }

	ProductVariantHandler.init();
  
})();
