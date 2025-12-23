<template>
  <div class="p-4">
    <h1 class="h3 mb-3">Bootstrap Icons preview</h1>
    <div class="d-flex flex-wrap align-items-center gap-3">
      <b-icon icon="arrow-up" variant="primary" />
      <b-icon-arrow-up variant="success" animation="spin" />
      <b-icon icon="alarm" variant="danger" animation="pulse" font-scale="1.4" />
      <b-icon icon="battery-charging" variant="info" rotate="15" />
      <b-icon icon="lightning-charge" variant="warning" animation="fade" size="1.5rem" />
      <b-icon-stack class="ms-2" animation="pulse">
        <b-icon icon="circle-fill" variant="secondary" stacked />
        <b-icon icon="star-fill" variant="warning" stacked stacked-order="2" />
      </b-icon-stack>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
