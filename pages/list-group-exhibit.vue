<template>
  <div class="d-flex flex-column justify-content-center align-items-center my-5 mx-4 gap-5">
    <div class="row justify-content-between w-100">
      <div class="col">
        <b-list-group class="w-100" style="max-width: 400px">
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item href="#" disabled>Morbi leo risus</b-list-group-item>
          <b-list-group-item button>Cras justo odio</b-list-group-item>
          <b-list-group-item button>Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item disabled>Morbi leo risus</b-list-group-item>
          <b-list-group-item action>Cras justo odio</b-list-group-item>
          <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item active>Morbi leo risus</b-list-group-item>
        </b-list-group>
      </div>
      <div class="col align-items-center d-flex flex-column justify-content-between">
        <b-list-group class="w-100" style="max-width: 400px">
          <b-list-group-item>Default list group item</b-list-group-item>
          <b-list-group-item variant="primary">Primary list group item</b-list-group-item>
          <b-list-group-item variant="secondary">Secondary list group item</b-list-group-item>
          <b-list-group-item variant="success">Success list group item</b-list-group-item>
          <b-list-group-item variant="danger">Danger list group item</b-list-group-item>
          <b-list-group-item variant="warning">Warning list group item</b-list-group-item>
          <b-list-group-item variant="info">Info list group item</b-list-group-item>
          <b-list-group-item variant="light">Light list group item</b-list-group-item>
          <b-list-group-item variant="dark">Dark list group item</b-list-group-item>
        </b-list-group>
      </div>
      <div class="col align-items-end d-flex flex-column justify-content-between">
        <b-list-group class="w-100" style="max-width: 400px">
          <b-list-group-item href="#">Default list group item</b-list-group-item>
          <b-list-group-item href="#" variant="primary">Primary list group item</b-list-group-item>
          <b-list-group-item href="#" variant="secondary">Secondary list group item</b-list-group-item>
          <b-list-group-item href="#" variant="success">Success list group item</b-list-group-item>
          <b-list-group-item href="#" variant="danger">Danger list group item</b-list-group-item>
          <b-list-group-item href="#" variant="warning">Warning list group item</b-list-group-item>
          <b-list-group-item href="#" variant="info">Info list group item</b-list-group-item>
          <b-list-group-item href="#" variant="light">Light list group item</b-list-group-item>
          <b-list-group-item href="#" variant="dark">Dark list group item</b-list-group-item>
        </b-list-group>
      </div>
    </div>
    <div class="row justify-content-between w-100">
      <div class="col">
        <b-card header="Card Header" footer="Card Footer" style="width: 400px" no-body>
          <b-list-group flush>
            <b-list-group-item href="#">Cras justo odio</b-list-group-item>
            <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
            <b-list-group-item href="#" disabled>Morbi leo risus</b-list-group-item>
            <b-list-group-item button>Cras justo odio</b-list-group-item>
            <b-list-group-item button>Dapibus ac facilisis in</b-list-group-item>
            <b-list-group-item disabled>Morbi leo risus</b-list-group-item>
          </b-list-group>

          <b-card-body>
            <b-card-text class="mt-2">
              Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum consequat non
              elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur mollit voluptate est in duis
              laboris ad sit ipsum anim Lorem.
            </b-card-text>
          </b-card-body>
        </b-card>
      </div>
      <div class="col align-items-end d-flex flex-column justify-content-between">
        <b-card header="Card Header" footer="Card Footer" style="width: 400px">
          <b-list-group>
            <b-list-group-item href="#">Cras justo odio</b-list-group-item>
            <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
            <b-list-group-item href="#" disabled>Morbi leo risus</b-list-group-item>
            <b-list-group-item button>Cras justo odio</b-list-group-item>
            <b-list-group-item button>Dapibus ac facilisis in</b-list-group-item>
            <b-list-group-item disabled>Morbi leo risus</b-list-group-item>
          </b-list-group>
        </b-card>

        <b-list-group horizontal class="w-100" style="max-width: 400px">
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item href="#" disabled>Morbi leo risus</b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
