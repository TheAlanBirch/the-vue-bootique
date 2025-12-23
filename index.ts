import type { App, Component } from 'vue';
import VBAlert from './components/feedback/VBAlert.vue';
import VBButton from './components/base/VBButton.vue';
import VBCard from './components/card/VBCard.vue';
import VBCardBody from './components/card/VBCardBody.vue';
import VBCardFooter from './components/card/VBCardFooter.vue';
import VBCardGroup from './components/card/VBCardGroup.vue';
import VBCardHeader from './components/card/VBCardHeader.vue';
import VBCardImg from './components/card/VBCardImg.vue';
import VBCardImgLazy from './components/card/VBCardImgLazy.vue';
import VBCardLink from './components/card/VBCardLink.vue';
import VBCardSubTitle from './components/card/VBCardSubTitle.vue';
import VBCardText from './components/card/VBCardText.vue';
import VBCardTitle from './components/card/VBCardTitle.vue';
import VBFormCheckbox from './components/form/VBFormCheckbox.vue';
import VBFormInput from './components/form/VBFormInput.vue';
import VBFormRadio from './components/form/VBFormRadio.vue';
import VBFormSelect from './components/form/VBFormSelect.vue';
import VBFormTextarea from './components/form/VBFormTextarea.vue';
import VBIcon from './components/icon/VBIcon.vue';
import VBIconStack from './components/icon/VBIconStack.vue';
import VBModal from './components/overlay/VBModal.vue';
import VBNavbar from './components/navigation/VBNavbar.vue';

const components = [
  VBAlert,
  VBButton,
  VBCard,
  VBCardBody,
  VBCardFooter,
  VBCardGroup,
  VBCardHeader,
  VBCardImg,
  VBCardImgLazy,
  VBCardLink,
  VBCardSubTitle,
  VBCardText,
  VBCardTitle,
  VBFormCheckbox,
  VBFormInput,
  VBFormRadio,
  VBFormSelect,
  VBFormTextarea,
  VBIcon,
  VBIconStack,
  VBModal,
  VBNavbar,
];

const toKebabCase = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

const registerComponent = (app: App, component: Component) => {
  const name = (component as { name?: string }).name;
  if (!name) return;

  app.component(name, component);

  if (name.startsWith('VB')) {
    const publicName = name.slice(1);
    app.component(publicName, component);
    app.component(toKebabCase(publicName), component);
  }
};

export const install = (app: App): void => {
  components.forEach((component) => registerComponent(app, component));
};

export default {
  install,
};

export {
  VBAlert,
  VBButton,
  VBCard,
  VBCardBody,
  VBCardFooter,
  VBCardGroup,
  VBCardHeader,
  VBCardImg,
  VBCardImgLazy,
  VBCardLink,
  VBCardSubTitle,
  VBCardText,
  VBCardTitle,
  VBFormCheckbox,
  VBFormInput,
  VBFormRadio,
  VBFormSelect,
  VBFormTextarea,
  VBIcon,
  VBIconStack,
  VBModal,
  VBNavbar,
};

export * from './types/common';
