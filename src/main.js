import Vue from "vue";
import App from "@/App.vue";
import axios from "axios";
import router from "@/router";
import store from "@/store";
import VueMeta from "vue-meta";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./filters";
import {
  faAngleDown,
  faAngleRight,
  faBars,
  faFileAlt,
  faThLarge,
  faFile,
  faUser,
  faLock,
  faMinus,
  faAngleUp,
  faCalendarAlt,
  faPlusSquare,
  faTasks,
  faSearch,
  faCogs,
  faSignOutAlt,
  faThList,
  faTachometerAlt,
  faEye,
  faTrash,
  faSort,
  faAlignJustify,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import "./utils/init-font-icons";
import "./utils/init-toast";
import "./utils/init-validation";
import "./utils/http-configs";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
import "./utils/filters";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.component("loading-overlay", Loading);

library.add(
  faUserSecret,
  faThLarge,
  faAngleDown,
  faAngleRight,
  faBars,
  faFileAlt,
  faFile,
  faUser,
  faLock,
  faAngleUp,
  faCalendarAlt,
  faPlusSquare,
  faTasks,
  faSearch,
  faCogs,
  faSignOutAlt,
  faThList,
  faTachometerAlt,
  faEye,
  faTrash,
  faSort,
  faMinus,
  faAlignJustify,
  faChevronDown,
  faChevronUp
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("v-select", vSelect);
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
});
axios.defaults.headers.post["Content-Type"] = "application/json";
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
