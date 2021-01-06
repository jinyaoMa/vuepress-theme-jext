import "@vuepress/theme-default/styles";
import "../$icons/dist/j-icon.styl";
import Components from "../$components";
import Vuex from "vuex";
import stores from "./stores";
import mixins from "./mixins";

export default ({ Vue, options, router, siteData }) => {
  Vue.use(Components);

  Vue.use(Vuex);
  Object.assign(options, {
    store: stores(Vuex)
  });

  Vue.mixin(mixins(Vuex));

  /**
   * Another: https://github.com/vuejs/vue-router/blob/dev/examples/scroll-behavior/app.js
   */
  router.options.scrollBehavior = function(to, from, savedPosition) {
    if (Vue.$vuepress.$get("disableScrollBehavior")) {
      return false;
    }
    if (!document || !document.querySelector(".j-layout-frame")) return false;
    const frame = document.querySelector(".j-layout-frame");
    if (to.hash) {
      if (!document.querySelector(to.hash)) return false;
      const hash = document.querySelector(to.hash);
      return frame.scrollTo({
        top: hash.offsetTop
      });
    } else {
      return false;
    }
  };
};
