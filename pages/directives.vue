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
          <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Docs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/directives">Directives</a>
        </li>
      </ul>
    </b-navbar>

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
            <b-button v-tooltip="'Save your changes'" variant="primary" outline>
              Tooltip (v-tooltip)
            </b-button>
            <b-button
              v-popover="{ title: 'Popover', content: 'Rich content goes here.' }"
              variant="secondary"
              outline
            >
              Popover (v-popover)
            </b-button>
            <b-form-input v-model="focusedInput" v-focus placeholder="Auto-focused input (v-focus)" />
          </div>
        </div>

        <div class="col-md-4">
          <div class="d-grid gap-2">
            <b-button v-toggle="'#directiveCollapse'" variant="success" outline>
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
                v-scrollspy="{ target: '#directivesNav', offset: 10 }"
                class="border rounded p-3 overflow-auto"
                style="max-height: 220px"
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

const focusedInput = ref('');
</script>
