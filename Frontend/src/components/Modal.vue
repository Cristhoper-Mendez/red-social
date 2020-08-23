<template>
  <div>
      <b-modal
        id="modal-tall"
        title="Subiendo tu publicacion"
        v-bind:ok-disabled=true
        v-bind:no-close-on-backdrop=true
        v-bind:cancel-disabled=true
      >
        <div class="d-flex justify-content-center mb-3">
          <b-spinner style="width: 7rem; height: 7rem;" label="Loading..." variant="primary"></b-spinner>
        </div>
      </b-modal>
    </div>
</template>

<script>
export default {
  name: "Modal",
};
</script>