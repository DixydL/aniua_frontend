<template>
  <v-container fluid>
    <h1>{{anime.name}}}</h1>
    <v-card class="mx-auto">
      <v-container>
        <v-row justify="space-between">
          <v-col cols="3">
            <v-img height="400" width="300" src="/e51b513a73308319fb5eeda21a82ae.jpg"></v-img>
          </v-col>

          <v-col>
            <p>Оригінальна назва: Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season</p>
            <p>Рік випуску аніме: 2020</p>
            <p>Жанр: Драма, Психологія, Триллер, Фентезі</p>
            <p>Режисер: Ватанабе Масахару</p>
            <p>Студія: White Fox</p>
            <p>Серій: 9 з 13 (24 хв.)</p>
            <p>Переклад: Surgeon</p>
            <p>Ролі озвучували: AdrianZP, Helga Victim</p>
            <p>Другий сезон бере початок відразу ж після подій першого. Заледве подолавши одного архієпископа гріха та чотирьохсотрічне чудовисько, наші герої стикаються з новими, не менш небезпечними ворогами.</p>
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
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 10,
        slidesPerGroup: 6,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
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
</style>
