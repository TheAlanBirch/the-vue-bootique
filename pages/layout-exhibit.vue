<template>
  <div class="d-flex flex-column justify-content-evenly min-vh-100">
    <div class="d-flex flex-column gap-3">
      <b-container class="text-center">
        <b-row>
          <b-col>Column</b-col>
          <b-col>Column</b-col>
          <b-col>Column</b-col>
        </b-row>
      </b-container>
      <hr />
      <div class="container">
        <div class="row">
          <div class="col">Column</div>
          <div class="col">Column</div>
          <div class="col">Column</div>
        </div>
      </div>
    </div>
    <hr />
    <hr />
    <div class="d-flex flex-column gap-3">
      <b-container class="text-center">
        <b-row>
          <b-col>1 of 2</b-col>
          <b-col>2 of 2</b-col>
        </b-row>
        <b-row>
          <b-col>1 of 3</b-col>
          <b-col>2 of 3</b-col>
          <b-col>3 of 3</b-col>
        </b-row>
      </b-container>
      <hr />
      <div class="container text-center">
        <div class="row">
          <div class="col">1 of 2</div>
          <div class="col">2 of 2</div>
        </div>
        <div class="row">
          <div class="col">1 of 3</div>
          <div class="col">2 of 3</div>
          <div class="col">3 of 3</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style>
.col {
  background-color: var(--bs-gray-200);
  border: 1px solid var(--bs-gray-400);
  padding: 1rem;
}
</style>
