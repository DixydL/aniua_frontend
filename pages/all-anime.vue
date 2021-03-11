<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="all-anime-header">
        <h3>Аніме серіали</h3>
        <v-btn class="menu-filter d-lg-none" @click="openFilter" dark small color="cyan darken-2">
          Меню
        </v-btn>
      </v-col>
      <v-navigation-drawer v-model="drawerFilter" absolute temporary>
        <v-col cols="12">
          <v-form>
            <v-autocomplete
              auto-select-first
              deletable-chips
              multiple
              small-chips
              solo
              v-model="choseGenres"
              :items="items"
              label="Жанри"
            ></v-autocomplete>
            <v-text-field
              placeholder="Введіть назву аніме..."
              :height="20"
              dense
              outlined
              v-model="search"
            >
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
            </v-text-field>
            <v-row class="justify-center">
              <v-btn @click="handleSearch" depressed color="teal" justify-center
                >Пошук</v-btn
              >
            </v-row>
          </v-form>
        </v-col>
      </v-navigation-drawer>
      <v-col cols="12" lg="9" class="anime-all-right pa-0">
        <v-container>
          <v-row class="all-anime-block">
            <div class="anime-block" v-for="anime in animes" :key="anime.id">
              <v-card class="mx-auto poster" height="270">
                <nuxt-link :to="'/anime/' + anime.id">
                  <v-img
                    :src="appUrl + anime.poster_url"
                    class="img"
                    height="250px"
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
      <v-col cols="12" lg="3"
        ><v-sheet class="filter d-none d-lg-flex d-xl-none" height="310">
          <v-col cols="12">
            <v-form>
              <v-autocomplete
                auto-select-first
                deletable-chips
                multiple
                small-chips
                solo
                v-model="choseGenres"
                :items="items"
                label="Жанри"
              ></v-autocomplete>
              <v-text-field
                placeholder="Введіть назву аніме..."
                :height="20"
                dense
                outlined
                v-model="search"
              >
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
              </v-text-field>
              <v-row class="justify-center">
                <v-btn
                  @click="handleSearch"
                  depressed
                  color="teal"
                  justify-center
                  >Пошук</v-btn
                >
              </v-row>
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
    this.$store.dispatch("genre/load");
  },
  computed: {
    ...mapGetters({
      animes: "anime/getAnimes",
      genres: "genre/getGenres",
    }),
  },
  watch: {
    genres: function (val) {
      var items = [];
      val.forEach((element) => items.push(element.name));
      this.items = this.items.concat(items);
    },
  },
  data() {
    return {
      items: [{ header: "Виберіть жанр" }],
      choseGenres: [],
      search: "",
      appUrl: process.env.APP_URL,
      drawerFilter: false,
    };
  },

  methods: {
    handleSearch() {
      this.$store.dispatch("anime/load", {
        search: this.search,
        genres: this.choseGenres,
      });
    },
    openFilter() {
      this.drawerFilter = true;
    }
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

.menu-filter {
}

// .all-anime-header {
//   padding: 12px !important;
// }

@media (max-width: 600px) {
  .all-anime {
    width: 170px;
  }
}
</style>
