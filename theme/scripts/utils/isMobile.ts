const mdBreakpoint = 900;

const isMobile = () => {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (width < mdBreakpoint) {
    return true
  } 

  return false;

};

export default isMobile;