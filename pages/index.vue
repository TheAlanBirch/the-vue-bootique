<template>
  <div class="container py-4">
    <b-navbar brand="Vue Bootique" background="dark" variant="dark" class="mb-4">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Docs</a>
        </li>
      </ul>
    </b-navbar>

    <div class="d-flex align-items-center gap-2 mb-3">
      <b-button variant="primary" @click="showAlert = true">Show Alert</b-button>
      <b-button variant="secondary" @click="isModalOpen = true">Open Modal</b-button>
    </div>

    <b-alert v-model="showAlert" variant="success" dismissible class="mb-3">
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
        <b-form-select
          v-model="form.role"
          label="Role"
          placeholder="Select a role"
          :options="roles"
        />
      </div>
      <div class="col-12">
        <b-form-textarea
          v-model="form.bio"
          label="Bio"
          rows="3"
          placeholder="Tell us about yourself"
        />
      </div>
      <div class="col-12">
        <b-form-checkbox v-model="form.accepted" label="I agree to the terms" />
      </div>
      <div class="col-12">
        <b-button type="submit" variant="primary" :disabled="!form.accepted">Submit</b-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const showAlert = ref(true);
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
