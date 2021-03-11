<template>
  <v-container>
    <h1>{{ anime.name }}</h1>
    <v-row>
      <v-col cols="12" lg="9">
        <v-card class="view mx-auto">
          <v-container>
            <v-row justify="space-between">
              <v-col cols="12" lg="3">
                <v-sheet class="pa-3">
                  <v-skeleton-loader
                    class="mx-auto"
                    height="370"
                    width="223"
                    type="image"
                    v-if="loading"
                  ></v-skeleton-loader>
                </v-sheet>
                <v-img
                  v-if="!loading"
                  height="370"
                  width="320"
                  :src="appUrl + anime.poster_url"
                ></v-img>
              </v-col>

              <v-col class="detail">
                <p>
                  <span class="font-weight-medium label-detail"
                    >Оригінальна назва:</span
                  >
                  {{ anime.name_origin }}
                </p>
                <p>
                  <span class="font-weight-medium label-detail"
                    >Рік випуску аніме:</span
                  >
                  {{ anime.release_date }}
                </p>
                <p>
                  <span class="font-weight-medium label-detail">Жанр:</span>
                  {{ genres }}
                </p>
                <p>
                  <span class="font-weight-medium label-detail">Студія:</span>
                  {{ anime.studio }}
                </p>
                <p>
                  <span class="font-weight-medium label-detail">Серій:</span>
                  {{ anime.current_episodes }} з {{ anime.count_episodes }}
                </p>
                <p>
                  <span class="font-weight-medium label-detail">Переклад:</span>
                  {{ translators }}
                </p>
                <p>
                  <span class="font-weight-medium label-detail"
                    >Ролі озвучували:</span
                  >
                  {{ voicers }}
                </p>
                <p>
                  {{ anime.description }}
                </p>
              </v-col>

              <v-col cols="auto" class="text-center pl-0">
                <v-row class="flex-column ma-0 fill" justify="top">
                  <v-col class="px-0">
                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                  </v-col>

                  <v-col class="px-0">
                    <v-btn icon>
                      <v-icon>mdi-bookmark</v-icon>
                    </v-btn>
                  </v-col>

                  <v-col class="px-0">
                    <v-btn icon>
                      <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <div class="video">
              <div class="episode-button">
                <v-btn
                  v-for="episodeButton in anime.episodes"
                  :key="episodeButton.id"
                  small
                  v-bind:color="
                    episodeButton.id === episode.id ? 'teal' : 'dark'
                  "
                  @click="onEpisodeNext(episodeButton.id)"
                  >{{ episodeButton.episode }}</v-btn
                >
              </div>
              <div v-html="episode.iframe"></div>
            </div>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" lg="2">
        <v-card class="mx-auto">
          <v-list-item>
            <v-list-item-content>
              <div class="overline">Також дивляться</div>
            </v-list-item-content>
          </v-list-item>
          <div class="related-anime">
            <div class="all-anime" v-for="anime in animes" :key="anime.id">
              <v-card class="mx-auto" height="235">
                <v-img
                  :src="appUrl + anime.poster_url"
                  class
                  height="230px"
                ></v-img>
              </v-card>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { mapGetters } from "vuex";
import "swiper/swiper-bundle.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  async created() {
    await this.$store.dispatch("anime/loadAnime", this.$route.params.id);
    await this.$store.dispatch("anime/loadRelative");
    this.loading = false;
  },
  watch: {
    anime: async function (val) {
      val.genres.forEach((genre) => (this.genres += genre.name + ", "));
      val.voicers.forEach((voicer) => (this.voicers += voicer.name + ", "));
      val.translators.forEach(
        (translator) => (this.translators += translator.name + ", ")
      );
      this.genres = this.genres.trim().slice(0, -1);
      this.voicers = this.voicers.trim().slice(0, -1);
      this.translators = this.translators.trim().slice(0, -1);
      console.log(val.episodes.length !== 0);
      if (val.episodes.length !== 0) {
        this.$store.dispatch("episode/loadEpisode", val.episodes[0].id);
      }
    },
  },
  computed: {
    ...mapGetters({
      anime: "anime/getAnime",
      animes: "anime/getRelativeAnimes",
      episode: "episode/getEpisode",
      episodes: "episode/getEpisodes",
    }),
  },
  methods: {
    onEpisodeNext: async function (episode_id) {
      await this.$store.dispatch("episode/loadEpisode", episode_id);
    },
  },
  data() {
    return {
      loading: true,
      appUrl: process.env.APP_URL,
      genres: "",
      voicers: "",
      translators: "",
      episode_id: null,
    };
  },
};
</script>
<style lang="scss">
.swiper {
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 14 * 2;
  }
}

iframe {
  //max-width: 1200px !important;
  width: 100% !important;
  height: 600px;
}
@media screen and (max-width: 750px) {
  iframe {
    max-width: 100% !important;
    width: 100% !important;
    height: auto !important;
  }
}

.episode-button {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
