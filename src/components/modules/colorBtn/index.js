import addBtn from './addBtn.vue';
import deleteBtn from './deleteBtn.vue';
import loadBtn from './loadBtn.vue';
import otherBtn from './otherBtn.vue';

/* istanbul ignore next */
addBtn.install = function(Vue) {
    Vue.component(addBtn.name, addBtn);
};
deleteBtn.install = function(Vue) {
    Vue.component(deleteBtn.name, deleteBtn);
};
loadBtn.install = function(Vue) {
    Vue.component(loadBtn.name, loadBtn);
};
otherBtn.install = function(Vue) {
    Vue.component(otherBtn.name, otherBtn);
};


export {
    addBtn,
    deleteBtn,
    loadBtn,
    otherBtn
};
