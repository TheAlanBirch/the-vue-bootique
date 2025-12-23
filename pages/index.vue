<template>
  <div class="container py-4">
    <b-navbar background="dark" variant="dark" class="mb-4">
      <template #brand>
        <span class="d-flex align-items-center gap-2">
          <b-icon-flower2 />
          <span>Vue Bootique</span>
       </span>
      </template>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Docs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#directives">Directives</a>
        </li>
      </ul>
    </b-navbar>

    <div class="d-flex align-items-center gap-2 mb-3">
      <b-button variant="primary" @click="showAlert = true"> <b-icon-bell-fill class="me-2" /> Show Alert </b-button>
      <b-button variant="secondary" @click="isModalOpen = true">
        <b-icon-columns-gap class="me-2" /> Open Modal
      </b-button>
    </div>

    <b-alert v-model="showAlert" variant="success" dismissible class="mb-3">
      <b-icon-check-circle class="me-2" />
      Welcome to the Vue Bootique component library.
    </b-alert>

    <b-modal v-model="isModalOpen" title="Quick Modal">
      <p class="mb-0">This modal demonstrates the default layout with header, body, and footer slots.</p>
    </b-modal>

    <b-card class="mb-4" header="Card Header" title="Card Title" footer="Card Footer">
      <b-card-text>Card body text rendered with Bootstrap utility classes.</b-card-text>
    </b-card>

    <form class="row g-3">
      <div class="col-md-6">
        <b-form-input
          v-model="form.name"
          label="Name"
          placeholder="Enter your name"
          :state="form.name ? 'valid' : null"
          valid-feedback="Looks good!"
          required
        />
      </div>
      <div class="col-md-6">
        <b-form-select v-model="form.role" label="Role" placeholder="Select a role" :options="roles" />
      </div>
      <div class="col-12">
        <b-form-textarea v-model="form.bio" label="Bio" rows="3" placeholder="Tell us about yourself" />
      </div>
      <div class="col-12">
        <b-form-checkbox v-model="form.accepted" label="I agree to the terms" />
      </div>
      <div class="col-12">
        <b-button type="submit" variant="primary" :disabled="!form.accepted">Submit</b-button>
      </div>
    </form>

    <section id="directives" class="mt-5">
      <div class="d-flex align-items-center gap-2 mb-3">
        <b-icon-lightning-charge-fill />
        <h2 class="mb-0">Directives</h2>
      </div>
      <p class="text-muted">
        Lightweight Vue directives that wrap Bootstrap JS behavior without rendering markup.
      </p>

      <div class="row g-4">
        <div class="col-md-4">
          <div class="d-flex flex-column gap-3">
            <b-button variant="outline-primary" v-tooltip="'Save your changes'">
              Tooltip (v-tooltip)
            </b-button>
            <b-button
              variant="outline-secondary"
              v-popover="{ title: 'Popover', content: 'Rich content goes here.' }"
            >
              Popover (v-popover)
            </b-button>
            <b-form-input v-focus placeholder="Auto-focused input (v-focus)" />
          </div>
        </div>

        <div class="col-md-4">
          <div class="d-grid gap-2">
            <b-button variant="outline-success" v-toggle="'#directiveCollapse'">
              Toggle Details (v-toggle)
            </b-button>
            <div id="directiveCollapse" class="collapse show border rounded p-3">
              <p class="mb-0">
                This content is controlled by the toggle directive. Works with any collapse target.
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="row">
            <div class="col-4">
              <div id="directivesNav" class="nav flex-column nav-pills small">
                <a class="nav-link active" href="#spy-1">Tooltip</a>
                <a class="nav-link" href="#spy-2">Popover</a>
                <a class="nav-link" href="#spy-3">Toggle</a>
                <a class="nav-link" href="#spy-4">Focus</a>
              </div>
            </div>
            <div class="col-8">
              <div
                class="border rounded p-3 overflow-auto"
                style="max-height: 220px"
                v-scrollspy="{ target: '#directivesNav', offset: 10 }"
              >
                <div id="spy-1" class="mb-4">
                  <h6 class="mb-1">Tooltip</h6>
                  <p class="mb-0">Attach helpful hints to any control.</p>
                </div>
                <div id="spy-2" class="mb-4">
                  <h6 class="mb-1">Popover</h6>
                  <p class="mb-0">Provide richer contextual information on demand.</p>
                </div>
                <div id="spy-3" class="mb-4">
                  <h6 class="mb-1">Toggle</h6>
                  <p class="mb-0">Declaratively toggle collapsible content.</p>
                </div>
                <div id="spy-4" class="mb-0">
                  <h6 class="mb-1">Focus</h6>
                  <p class="mb-0">Auto-focus inputs with optional delay.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { vFocus, vPopover, vScrollspy, vToggle, vTooltip } from '../src/directives';

const showAlert = ref(false);
const isModalOpen = ref(false);
const form = ref({
  name: '',
  role: '',
  bio: '',
  accepted: false,
});

const roles = [
  { label: 'Developer', value: 'dev' },
  { label: 'Designer', value: 'design' },
  { label: 'Product Manager', value: 'pm' },
];
</script>
