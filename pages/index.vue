<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h3>Нещодавні оновлення</h3>
        <span v-on:click="swiperPrev" class="swiper-next">
          <v-icon>mdi-chevron-left</v-icon>
        </span>
        <span v-on:click="swiperNext" class="swiper-next">
          <v-icon>mdi-chevron-right</v-icon>
        </span>
        <v-divider></v-divider>
      </v-col>
      <swiper ref="swiperUpdate" class="swiper" :options="swiperOption">
        <swiper-slide v-if="loading" v-for="aniemFake in animesFake">
          <v-skeleton-loader
            class="mx-auto"
            height="290"
            width="200"
            type="image"
          ></v-skeleton-loader>
        </swiper-slide>
        <swiper-slide v-if="!loading" v-for="anime in animes" :key="anime.id">
          <v-card class="mx-auto poster poster-prev" height="320">
            <nuxt-link :to="'/anime/' + anime.id">
              <v-img
                :src="appUrl + anime.poster_url"
                class="img"
                height="290px"
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
        </swiper-slide>
      </swiper>
    </v-row>
    <!--   <div class="content">
      <v-row>
        <v-col cols="12">
          <h3>Аніме за переглядами</h3>
          <v-divider></v-divider>
        </v-col>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide>
            <v-card class="mx-auto" height="300" max-width="320px" min-width="190">
              <v-img src="/4b673cf290a82cc5b50160cb2e2ea8.jpg" class height="270px"></v-img>

              <v-card-subtitle class="pb-0">Герої галактики</v-card-subtitle>
            </v-card>
          </swiper-slide>
          <swiper-slide>
            <v-card class="mx-auto" height="300" max-width="320px" min-width="190">
              <v-img src="/4b673cf290a82cc5b50160cb2e2ea8.jpg" class height="270px"></v-img>

              <v-card-subtitle class="pb-0">Герої галактики</v-card-subtitle>
            </v-card>
          </swiper-slide>
          <swiper-slide>
            <v-card class="mx-auto" height="300" max-width="320px" min-width="190">
              <v-img src="/4b673cf290a82cc5b50160cb2e2ea8.jpg" class height="270px"></v-img>

              <v-card-subtitle class="pb-0">Герої галактики</v-card-subtitle>
            </v-card>
          </swiper-slide>
          <swiper-slide>
            <v-card class="mx-auto" height="300" max-width="320px" min-width="190">
              <v-img src="/4b673cf290a82cc5b50160cb2e2ea8.jpg" class height="270px"></v-img>

              <v-card-subtitle class="pb-0">Герої галактики</v-card-subtitle>
            </v-card>
          </swiper-slide>
          <swiper-slide>
            <v-card class="mx-auto" height="300" max-width="320px" min-width="190">
              <v-img src="/4b673cf290a82cc5b50160cb2e2ea8.jpg" class height="270px"></v-img>

              <v-card-subtitle class="pb-0">Герої галактики</v-card-subtitle>
            </v-card>
          </swiper-slide>
          <swiper-slide>
            <v-card class="mx-auto" height="300" max-width="320px" min-width="190">
              <v-img src="/4b673cf290a82cc5b50160cb2e2ea8.jpg" class height="270px"></v-img>

              <v-card-subtitle class="pb-0">Герої галактики</v-card-subtitle>
            </v-card>
          </swiper-slide>
          <swiper-slide>Slide 7</swiper-slide>
          <swiper-slide>Slide 8</swiper-slide>
          <swiper-slide>Slide 9</swiper-slide>
        </swiper>
      </v-row>
    </div>-->
    <v-row>
      <v-col cols="12">
        <h3>Аніме серіали</h3>
        <v-divider></v-divider>
      </v-col>
      <v-container>
        <v-row>
          <swiper ref="swiperAll" class="swiper-all" :options="swiperOptionAll">
            <swiper-slide v-if="loading" v-for="aniemFake in 12">
              <v-skeleton-loader
                class="mx-auto"
                height="290"
                width="200"
                type="image"
              ></v-skeleton-loader>
            </swiper-slide>
            <swiper-slide
              v-if="!loading"
              v-for="anime in animes"
              :key="anime.id"
            >
              <v-card class="mx-auto poster poster-prev" height="320">
                <nuxt-link :to="'/anime/' + anime.id">
                  <v-img
                    :src="appUrl + anime.poster_url"
                    class="img"
                    height="290px"
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
            </swiper-slide>
          </swiper>
        </v-row>
        <v-row class="justify-center">
          <v-btn to="all-anime" depressed color="teal" justify-center
            >Все аніме</v-btn
          >
        </v-row>
      </v-container>
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
    await this.$store.dispatch("anime/load");
    this.loading = false;
  },
  computed: {
    ...mapGetters({
      animes: "anime/getAnimes",
    }),
  },
  data() {
    return {
      //animes: [1, 2, 3, 4, 5, 6],
      loading: true,
      //animes: [1, 2],
      appUrl: process.env.APP_URL,
      animesFake: [1, 2, 3, 4, 5, 6],
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 20,
        freeMode: false,
        allowTouchMove: false,
        slidesPerGroup: 2,
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          600: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        },
        on: {
          resize: () => {
            // this.$refs.swiperUpdate.$swiper.changeDirection(
            //   window.innerWidth <= 960 ? "vertical" : "horizontal"
            // );
          },
        },
      },
      swiperOptionAll: {
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          600: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        },
        //slidesPerView: "auto",
        spaceBetween: 20,
        slidesPerColumn: 2,
        freeMode: false,
        allowTouchMove: false,
        slidesPerGroup: 6,
        on: {
          resize: () => {
            // this.$refs.swiperUpdate.$swiper.changeDirection(
            //   window.innerWidth <= 960 ? "vertical" : "horizontal"
            // );
          },
        },
      },
    };
  },
  methods: {
    swiperPrev() {
      console.log(this.$refs.swiperUpdate.$swiper.slidePrev());
    },
    swiperNext() {
      console.log(this.$refs.swiperUpdate.$swiper.slideNext());
    },
  },
};
</script>
<style lang="scss">
</style>
