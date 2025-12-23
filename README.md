# The Vue Bootique

The Vue Bootique is a Vue 3 + TypeScript component library that wraps Bootstrap 5 into composable, accessible building blocks. It is Nuxt-ready out of the box and ships modular components that can be imported individually or installed as a plugin.

## Features implemented

- **Buttons:** Solid or outline styles, size variants, block layout, and disabled state handling with native click event forwarding.
- **Alerts:** Color variants with dismissible support, `v-model` binding for visibility, and close events.
- **Cards:** Header/title/sub-title/footer props, body-less layouts, grouped cards, linked cards, and flexible image placement (top, bottom, left, right).
- **Form controls:** Text inputs, textareas, selects, checkboxes, and radios with label support, placeholders, disabled states, and validation/feedback helpers.
- **Modals:** `v-model` controlled open state with title prop plus header/body/footer slots.
- **Navigation:** Navbar component with brand slot, variant/background options, and support for custom nav content.
- **Icons:** Bootstrap Icons wrapper (`BIcon`, `BIconStack`) with sizing, color variants, stacking, transforms, and simple animations.

## Installation

```bash
npm install
```

Nuxt automatically imports the library CSS from `assets/main.css`, which pulls in Bootstrap 5 and Bootstrap Icons. In a non-Nuxt setup, import the styles yourself:

```ts
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
```

## Usage

Register all components via the plugin or pick individual components as needed.

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import Bootique, { BButton, BAlert } from 'the-vue-bootique';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);
app.use(Bootique); // registers all exported components
app.component('BButton', BButton); // or register selectively
app.component('BAlert', BAlert);
app.mount('#app');
```

### Component quick start

- **Buttons:** `<b-button variant="primary" size="lg" :block="true">Get Started</b-button>`
- **Alerts:** `<b-alert v-model="showAlert" variant="success" dismissible>Saved successfully.</b-alert>`
- **Cards:** `<b-card title="Card Title" sub-title="Subtitle" img-src="..."><b-card-text>Body text</b-card-text></b-card>`
- **Forms:** `<b-form-input v-model="name" label="Name" :state="'valid'" valid-feedback="Looks good!" />`
- **Modal:** `<b-modal v-model="isOpen" title="Example Modal">Content goes here.</b-modal>`
- **Navbar:** `<b-navbar background="dark" variant="dark"><template #brand>Vue Bootique</template></b-navbar>`
- **Icons:** `<b-icon icon="bell" variant="primary" animation="spin" />` or stack them with `<b-icon-stack>`.

## Running the project locally

```bash
npm run dev      # Start the Nuxt dev server
npm run test     # Run unit tests (Vitest + happy-dom)
npm run lint     # Lint with ESLint
npm run build    # Production build
```

## Project structure

- `components/` – Source components (base, form, card, navigation, overlay, feedback, icons).
- `pages/` – Demo pages showcasing implemented components.
- `test/` – Vitest coverage for core components and behaviors.
