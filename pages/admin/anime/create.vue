<template>
  <div>
    <v-card>
      <v-container>
        <anime-form></anime-form>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import AnimeForm from "~/components/AnimeForm.vue";

export default {
  layout: "admin",
  components: {
    AnimeForm
  },
};
</script>
