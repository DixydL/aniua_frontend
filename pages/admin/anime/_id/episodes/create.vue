<template>
  <div>
    <v-card>
      <v-container>
          <episode-form></episode-form>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import EpisodeForm from "~/components/EpisodeForm.vue";

export default {
  components: {
    EpisodeForm,
  },
  layout: "admin",
}
</script>
