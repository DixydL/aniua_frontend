<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h3>Аніме серіали</h3>
        <v-divider></v-divider>
      </v-col>
      <v-col cols="9" class="anime-all-right">
        <v-container>
          <v-row class="all-anime-block">
            <div class="anime-block" v-for="anime in animes" :key="anime.id">
              <v-card class="mx-auto poster" height="300">
                <nuxt-link :to="'/anime/' + anime.id">
                  <v-img
                    :src="appUrl + anime.poster_url"
                    class="img"
                    height="270px"
                  ></v-img>
                  <span class="count-series">
                    {{ anime.current_episodes }}/{{ anime.count_episodes }}
                  </span>
                  <span class="info-detail-anime"
                    ><v-icon style="font-size: 70px"
                      >mdi-arrow-right-drop-circle-outline</v-icon
                    ></span
                  >
                  <v-card-subtitle class="pb-0 name-title">{{
                    anime.name
                  }}</v-card-subtitle>
                </nuxt-link>
              </v-card>
            </div>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="3">
        <v-sheet class="d-flex filter" height="310">
          <v-col cols="12">
            <v-form>
              <v-text-field v-model="search">
                <template v-slot:append>
                  <v-fade-transition leave-absolute>
                    <v-progress-circular
                      v-if="loading"
                      size="24"
                      color="info"
                      indeterminate
                    ></v-progress-circular>
                  </v-fade-transition>
                </template>
                <template v-slot:append-outer>
                  <v-btn @click="handleSearch" icon
                    ><v-icon>mdi-magnify</v-icon></v-btn
                  >
                </template>
              </v-text-field>
            </v-form>
          </v-col>
        </v-sheet>
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
  created() {
    this.$store.dispatch("anime/load");
  },
  computed: {
    ...mapGetters({
      animes: "anime/getAnimes",
    }),
  },
  data() {
    return {
      search: "",
      appUrl: process.env.APP_URL,
      //animes: [1, 2],
    };
  },
  methods: {
    handleSearch() {
      this.$store.dispatch("anime/load", { search: this.search });
    },
  },
};
</script>
<style lang="scss">
.swiper {
  .swiper-slide {
    display: flex;
    width: 220px;
    //height: 260px;
    justify-content: left;
    align-items: left;
    text-align: center;
    font-weight: bold;
    font-size: 14 * 2;
  }
}

.swiper-all {
  height: 660px;
  margin-left: auto;
  margin-right: auto;

  .swiper-slide {
    display: flex;
    width: 220px;
    height: 320px;
    justify-content: left;
    align-items: left;
    text-align: center;
    font-weight: bold;
    font-size: 14 * 2;
  }
}

.all-anime-container {
  text-align: center;
}

@media (max-width: 600px) {
  .all-anime {
    width: 170px;
  }
}
</style>
