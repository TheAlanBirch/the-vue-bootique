# the-vue-bootique
TheVueBootique is a Vue 3 + TypeScript component library that wraps Bootstrap 5 with composable, accessible building blocks. It ships modular components (Button, Alert, Modal, Navbar, Card, and form controls) that can be imported individually or installed as a plugin.

## Usage

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import Bootique, { VBButton } from 'the-vue-bootique';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);
app.use(Bootique); // registers B* and b-* aliases
app.component('BButton', VBButton); // or register individually with the public alias
app.mount('#app');
```

Use components in templates via their public aliases, e.g. `<b-button>` or `<BButton>`.
