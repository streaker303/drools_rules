import searchBtn from './searchBtn.vue';
import cancleBtn from "./cancleBtn.vue";

/* istanbul ignore next */
searchBtn.install = function(Vue) {
  Vue.component(searchBtn.name, searchBtn);
};
cancleBtn.install = function(Vue) {
  Vue.component(cancleBtn.name, cancleBtn);
};

export {
  searchBtn,
  cancleBtn
};
