<template>
  <div>
    <v-card>
      <v-container>
        <v-alert type="success"
          :value="alert"
          ismissible
          color="cyan"
          border="left"
          elevation="2"
        >
          Успішно оновлено
        </v-alert>
        <episode-form :episode="episode" v-bind:alert.sync="alert"></episode-form>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import EpisodeForm from "~/components/EpisodeForm.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    EpisodeForm,
  },
  data: () => ({
    alert: false
  }),
  layout: "admin",
  computed: {
    animeId() {
      return this.$route.params.id;
    },
    episodeId() {
      return this.$route.params.episode_id;
    },
    ...mapGetters({
      episode: "episode/getEpisode",
    }),
  },
  created() {
    this.$store.dispatch("episode/loadEpisode", this.episodeId);
  },
};
</script>
