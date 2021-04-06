const breakpointIsMdUp = 900;

const isMobile = () => {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (width < breakpointIsMdUp) {
    return true
  } 

  return false;

};

export default isMobile;