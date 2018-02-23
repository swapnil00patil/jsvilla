export const deviceType = {
    giant: function () { return window.innerWidth > 1279 },
    desktop: function () { return window.innerWidth > 991 && window.innerWidth < 1280 }, // desktop === tablet landscape
    tablet: function () { return window.innerWidth > 767 && window.innerWidth < 992 }, // tablet portrait
    mobile: function () { return window.innerWidth < 768 }
  }