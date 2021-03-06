import "./index.styl";
import "@fortawesome/fontawesome-free/css/all.css";
import Layout from "./Layout";
import Audio from "./Audio";
import Link from "./Link";
import Menu from "./Menu";
import Container from "./Container";
import Panel from "./Panel";
import SkinPanel from "./SkinPanel";
import CounterList from "./CounterList";
import CloudList from "./CloudList";
import PostCard from "./PostCard";

const components = {
  Layout,
  Audio,
  Link,
  Menu,
  Container,
  Panel,
  SkinPanel,
  CounterList,
  CloudList,
  PostCard
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
