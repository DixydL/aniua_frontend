<template>
  <div>
    <v-card>
      <v-container>
        <anime-form :anime="anime"></anime-form>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import AnimeForm from "~/components/AnimeForm.vue";
import { mapGetters } from "vuex";

export default {
  layout: "admin",
  components: {
    AnimeForm,
  },
  computed: {
    animeId() {
      return this.$route.params.id;
    },
    ...mapGetters({
      anime: "anime/getAnime",
    }),
  },
  created() {
    this.$store.dispatch("anime/loadAnime", this.animeId);

  },
};
</script>
