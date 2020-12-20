const components = {};
const path = require("path");
const vueFiles = require.context(path.join(__dirname, "./"), true, /\.vue$/);
vueFiles.keys().forEach((key) => {
  const name = path.basename(key, ".vue");
  components[name] = vueFiles(key).default || vueFiles(key);
});

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
