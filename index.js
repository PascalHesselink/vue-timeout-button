import ButtonComponent from './components/ButtonComponent.vue';

const VueTimeoutButton = {
    install(Vue, options) {
        Vue.component(ButtonComponent.name, ButtonComponent)
    }
};

export default VueTimeoutButton;
