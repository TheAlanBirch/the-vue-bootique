import type { App } from 'vue';
import BAlert from './components/feedback/BAlert.vue';
import BButton from './components/base/BButton.vue';
import BCard from './components/card/BCard.vue';
import BCardText from './components/card/BCardText.vue';
import BFormCheckbox from './components/form/BFormCheckbox.vue';
import BFormInput from './components/form/BFormInput.vue';
import BFormRadio from './components/form/BFormRadio.vue';
import BFormSelect from './components/form/BFormSelect.vue';
import BFormTextarea from './components/form/BFormTextarea.vue';
import BModal from './components/overlay/BModal.vue';
import BNavbar from './components/navigation/BNavbar.vue';
import BCol from './components/layout/BCol.vue';
import BContainer from './components/layout/BContainer.vue';
import BRow from './components/layout/BRow.vue';

const components = [
  BAlert,
  BButton,
  BCard,
  BFormCheckbox,
  BFormInput,
  BFormRadio,
  BFormSelect,
  BFormTextarea,
  BModal,
  BNavbar,
  BCardText,
  BCol,
  BContainer,
  BRow,
];

export const install = (app: App): void => {
  components.forEach((component) => {
    if (component.name) {
      app.component(component.name, component);
    }
  });
};

export default {
  install,
};

export {
  BAlert,
  BButton,
  BCard,
  BFormCheckbox,
  BFormInput,
  BFormRadio,
  BFormSelect,
  BFormTextarea,
  BModal,
  BNavbar,
  BCardText,
  BCol,
  BContainer,
  BRow,
};

export * from './types/common';
