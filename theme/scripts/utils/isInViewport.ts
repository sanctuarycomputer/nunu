export default (element: Element) => {
  const rect = element.getBoundingClientRect();
  const threshold = 2;

  return (
    rect.top + (rect.height / threshold) > 0 && 
    rect.left + (rect.width / threshold) > 0 && 
    rect.top + (rect.height / threshold) < (window.innerHeight || document.documentElement.clientHeight) && 
    rect.left + (rect.width / threshold) < (window.innerWidth || document.documentElement.clientWidth) 
  );
};
