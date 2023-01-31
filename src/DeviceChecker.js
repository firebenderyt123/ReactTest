export const isMobile = (width=768) => (
  window.innerWidth < width ? true : false
);

export const getMostSideLength = () => (
  window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight 
);