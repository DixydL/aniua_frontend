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
        <swiper-slide v-for="anime in animes" :key="anime.id">
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
            <swiper-slide v-for="anime in animes" :key="anime.id">
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
  created() {
    console.log(process.env.APP_URL);
    this.$store.dispatch("anime/load");
  },
  computed: {
    ...mapGetters({
      animes: "anime/getAnimes",
    }),
  },
  data() {
    return {
      //animes: [1, 2],
      appUrl: process.env.APP_URL,
      swiperOption: {
        slidesPerView: "auto",
        spaceBetween: 20,
        freeMode: false,
        allowTouchMove: false,
        slidesPerGroup: 2,
        on: {
          resize: () => {
            this.$refs.swiperUpdate.$swiper.changeDirection(
              window.innerWidth <= 960 ? "vertical" : "horizontal"
            );
          },
        },
      },
      swiperOptionAll: {
        slidesPerView: "auto",
        spaceBetween: 20,
        slidesPerColumn: 2,
        freeMode: false,
        allowTouchMove: false,
        slidesPerGroup: 2,
        on: {
          resize: () => {
            this.$refs.swiperUpdate.$swiper.changeDirection(
              window.innerWidth <= 960 ? "vertical" : "horizontal"
            );
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
.swiper {
  .swiper-slide {
    display: flex;
    width: 210px;
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
  margin-bottom: 20px;

  .swiper-slide {
    display: flex;
    width: 210px;
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
