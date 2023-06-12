import useMediaQuery from "./useMediaQuery";



export default function useBreakpoints() {
    const breakpoints = {
      isXs: useMediaQuery("(max-width: 575px)"),
      isSm: useMediaQuery("(min-width: 576px) and (max-width: 768px)"),
      isMd: useMediaQuery("(min-width: 769px) and (max-width: 992px)"),
      isLg: useMediaQuery("(min-width: 993px) and (max-width: 1200px)"),
      isXl: useMediaQuery("(min-width: 1201px)"),
      active: "xs"
    };
    if (breakpoints.isXs) breakpoints.active = "xs";
    if (breakpoints.isSm) breakpoints.active = "sm";
    if (breakpoints.isMd) breakpoints.active = "md";
    if (breakpoints.isLg) breakpoints.active = "lg";
    if (breakpoints.isXl) breakpoints.active = "xl";
    return breakpoints;
  }