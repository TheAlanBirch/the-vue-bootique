<template>
  <div class="d-flex justify-content-center align-items-center mt-5 mx-4">
    <div class="col">
      <div class="row mb-2">
        <b-card-group>
          <b-card header="Card Header" title="Card Title" sub-title="Card Subtitle" footer="Card Footer">
            <b-card-text
              >Some quick example text to build on the card title and make up the bulk of the card's
              content.</b-card-text
            >
          </b-card>
          <b-card header="Card Header" title="Card Title" sub-title="Card Subtitle" footer="Card Footer">
            <b-card-text
              >Some quick example text to build on the card title and make up the bulk of the card's
              content.</b-card-text
            >
          </b-card>
          <b-card header="Card Header" title="Card Title" sub-title="Card Subtitle" footer="Card Footer">
            <b-card-text
              >Some quick example text to build on the card title and make up the bulk of the card's
              content.</b-card-text
            >
          </b-card>
        </b-card-group>
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <b-card class="mb-2">
          <template #header>
            <h4>Hello World</h4>
          </template>
          <template #footer>
            <h4>Goodbye World</h4>
          </template>
        </b-card>
        <b-card class="mb-2" no-body>
          <b-card-header>Card Header</b-card-header>
          <b-card-body>
            <b-card-title>Card Title</b-card-title>
            <b-card-text>Some text for my card</b-card-text>
          </b-card-body>
          <b-card-footer>Card Footer</b-card-footer>
        </b-card>
        <b-card
          class="mb-2"
          header="Card Header"
          title="Card Title"
          sub-title="Card Subtitle"
          footer="Card Footer"
          img-src="https://tracklist.ajrbrothers.com/files/2023/08/share-scaled.jpeg"
          style="max-width: 540px"
        >
          <b-card-text> Another quick card I'm testing with. </b-card-text>
        </b-card>
        <b-card
          class="mb-2"
          header="Card Header"
          title="Card Title"
          sub-title="Card Subtitle"
          footer="Card Footer"
          img-src="https://tracklist.ajrbrothers.com/files/2023/08/share-scaled.jpeg"
          style="max-width: 540px"
          img-left
        >
          <b-card-text> Another quick card I'm testing with. </b-card-text>
        </b-card>
        <b-card
          class="mb-2"
          header="Card Header"
          title="Card Title"
          sub-title="Card Subtitle"
          footer="Card Footer"
          img-src="https://tracklist.ajrbrothers.com/files/2023/08/share-scaled.jpeg"
          style="max-width: 540px"
          img-right
        >
          <b-card-text> Another quick card I'm testing with. </b-card-text>
        </b-card>
        <b-card
          class="mb-2"
          header="Card Header"
          title="Card Title"
          sub-title="Card Subtitle"
          footer="Card Footer"
          img-src="https://tracklist.ajrbrothers.com/files/2023/08/share-scaled.jpeg"
          style="max-width: 540px"
          img-bottom
        >
          <b-card-text> Another quick card I'm testing with. </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
