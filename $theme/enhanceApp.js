import "@vuepress/theme-default/styles";
import "../$icons/dist/j-icon.styl";
import Components from "../$components";
/*
import Vuex from "vuex";
import stores from "./stores";
import mixins from "./mixins";
*/

export default ({ Vue, options, router, siteData }) => {
  Vue.use(Components);

  /*
  Vue.use(Vuex);
  Object.assign(options, {
    store: stores(Vuex)
  });

  Vue.mixin(mixins(Vue, Vuex));
  */
};
