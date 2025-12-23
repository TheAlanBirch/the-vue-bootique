<template>
  <b-container class="py-4">
    <b-navbar background="dark" variant="dark" class="mb-4">
      <template #brand>
        <span class="d-flex align-items-center gap-2">
          <b-icon-flower2 />
          <span>Vue Bootique</span>
        </span>
      </template>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <NuxtLink class="nav-link" to="/">Home</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link active" to="/layout">Layout</NuxtLink>
        </li>
      </ul>
    </b-navbar>

    <h2 class="mb-4">Layout & Grid System</h2>

    <section class="mb-5">
      <h5 class="mb-3">Container variants</h5>
      <div class="row gy-3">
        <div class="col-12 col-md-4">
          <b-container class="p-3 bg-light border rounded">
            <strong>.container</strong>
            <div class="small text-muted">Fixed width, responsive breakpoints.</div>
          </b-container>
        </div>
        <div class="col-12 col-md-4">
          <b-container fluid class="p-3 bg-light border rounded">
            <strong>.container-fluid</strong>
            <div class="small text-muted">Always full width.</div>
          </b-container>
        </div>
        <div class="col-12 col-md-4">
          <b-container fluid="lg" class="p-3 bg-light border rounded">
            <strong>.container-lg</strong>
            <div class="small text-muted">Fluid until the lg breakpoint.</div>
          </b-container>
        </div>
      </div>
    </section>

    <section class="mb-5">
      <h5 class="mb-3">Row columns, gutters, alignment</h5>
      <b-row cols="1" cols-md="3" gutters="3" align="center" justify="between" class="text-center">
        <b-col>
          <div class="p-3 border rounded bg-light">row-cols-1 row-cols-md-3</div>
        </b-col>
        <b-col>
          <div class="p-3 border rounded bg-light">g-3 align-items-center</div>
        </b-col>
        <b-col>
          <div class="p-3 border rounded bg-light">justify-content-between</div>
        </b-col>
      </b-row>
      <b-row class="text-center mt-3" gutters="0" no-gutters>
        <b-col>
          <div class="p-3 border rounded bg-light">g-0 no-gutters</div>
        </b-col>
        <b-col>
          <div class="p-3 border rounded bg-light">tight spacing</div>
        </b-col>
      </b-row>
    </section>

    <section class="mb-5">
      <h5 class="mb-3">Column sizing, offsets, and auto widths</h5>
      <b-row class="g-3 text-center">
        <b-col cols="12" md="6" lg="4">
          <div class="p-3 border rounded bg-light">col-12 col-md-6 col-lg-4</div>
        </b-col>
        <b-col cols="auto">
          <div class="p-3 border rounded bg-light">col-auto</div>
        </b-col>
        <b-col>
          <div class="p-3 border rounded bg-light">flex-fill</div>
        </b-col>
      </b-row>
      <b-row class="g-3 text-center mt-3">
        <b-col cols="12" md="5" offset-md="1">
          <div class="p-3 border rounded bg-light">offset-md-1</div>
        </b-col>
        <b-col cols="12" md="5">
          <div class="p-3 border rounded bg-light">paired column</div>
        </b-col>
      </b-row>
    </section>

    <section class="mb-5">
      <h5 class="mb-3">Ordering and self alignment</h5>
      <b-row class="g-3 text-center">
        <b-col cols="12" md="4" order="last" order-md="first">
          <div class="p-3 border rounded bg-light">order last → first on md+</div>
        </b-col>
        <b-col cols="12" md="4" align-self="center">
          <div class="p-3 border rounded bg-light">align-self-center</div>
        </b-col>
        <b-col cols="12" md="4" order="first" order-md="last">
          <div class="p-3 border rounded bg-light">order first → last on md+</div>
        </b-col>
      </b-row>
    </section>
  </b-container>
</template>
