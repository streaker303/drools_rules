import Vue from 'vue';
import backTop from './backTop/index.js';
import {searchBtn, cancleBtn} from './searchBtn/index.js';
import angleBtn from './angleBtn/index.js';
import {addBtn, otherBtn, deleteBtn, loadBtn} from './colorBtn/index.js';

const components = [
    backTop,
    searchBtn,
    angleBtn,
    cancleBtn,
    addBtn,
    otherBtn,
    deleteBtn,
    loadBtn
];
const install = function (Vue) {
    components.map(component => {
        Vue.component(component.name, component);
    });
};

install(Vue);

export default {
    version: '0.0.1',
    backTop,
    searchBtn,
    angleBtn,
    cancleBtn,
    addBtn,
    otherBtn,
    deleteBtn,
    loadBtn
}
