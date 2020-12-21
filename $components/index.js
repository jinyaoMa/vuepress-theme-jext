import "./index.styl";
import "@fortawesome/fontawesome-free/css/all.css";
import layout from "./layout";
import audio from "./audio";

const components = {
  layout,
  audio
};

const install = function(Vue) {
  if (install.installed) return;
  install.installed = true;

  for (const key in components) {
    Vue.component(components[key].name, components[key]);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components
};
