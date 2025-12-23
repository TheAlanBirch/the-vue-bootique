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
import { registerDirectives } from './src/directives';

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
];

export const install = (app: App): void => {
  components.forEach((component) => {
    if (component.name) {
      app.component(component.name, component);
    }
  });

  registerDirectives(app);
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
};

export * from './types/common';
export * from './src/directives';
