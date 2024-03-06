<template>
  <div class="d-flex gap-3">
    <b-container class="text-center">
      <b-row>
        <b-col>Column</b-col>
        <b-col>Column</b-col>
        <b-col>Column</b-col>
      </b-row>
      <hr />
      <div class="row">
        <div class="col">Column</div>
        <div class="col">Column</div>
        <div class="col">Column</div>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts" setup></script>

<style>
.col {
  background-color: var(--bs-purple);
  border: 1px solid var(--bs-purple);
  padding: 1rem;
}
</style>
