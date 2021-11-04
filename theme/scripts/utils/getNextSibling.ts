/**
 * Given a DOM element and a selector, returns the next
 * sibling of the given element which matches the selector.
 * If no selector is provided, returns the next sibling element
 * without checking for a selector match.
 */
export default (elem, selector) => {
  var sibling = elem.nextElementSibling;
  if (!selector) return sibling;

  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling
  }
}