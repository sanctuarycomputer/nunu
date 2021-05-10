const currentProductVariants = (window as any).__current_product_variants;

export default(function() {
	const ProductVariantHandler = {
		SELECTORS: {
		},

		init() {
      //create objects of the products with Id, variant, quantity 
      //what's the variant selected
      //update teh options to reflect
      //on init and when something chagnes (onChange on varaitnselect). this is new selected variant, look through the variant map created, 
      //another function that will create a DOM for those option.s this variants has max 10, in JS create 10 options, the insert it in the quantity dropdown.. 
      

			console.log(currentProductVariants);
      console.log(currentProductVariants.inventory_quantity)
		},

  }

	ProductVariantHandler.init();
  
})();
