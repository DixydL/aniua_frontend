<template>
  <v-form ref="form">
    <v-text-field
      v-model="form.name"
      label="Назва аніме"
      hide-details="auto"
    ></v-text-field>
    <v-text-field
      v-model="form.name_origin"
      label="Назва аніме(Оригінал)"
      hide-details="auto"
    ></v-text-field>
    <v-select
      :items="countries"
      v-model="form.country"
      label="Країна"
    ></v-select>
    <v-text-field v-model="form.studio" label="Назва студія"></v-text-field>
    <v-text-field v-model="form.release_date" label="Дата виходу Рік"></v-text-field>
    <v-btn-toggle v-model="form.season" borderless>
      <v-btn value="0">
        <span class="hidden-sm-and-down">Без сезону</span>
      </v-btn>

      <v-btn value="1">
        <span class="hidden-sm-and-down">Весна</span>
      </v-btn>

      <v-btn value="2">
        <span class="hidden-sm-and-down">Літо</span>
      </v-btn>

      <v-btn value="3">
        <span class="hidden-sm-and-down">Осінь</span>
      </v-btn>

      <v-btn value="4">
        <span class="hidden-sm-and-down">Зима</span>
      </v-btn>
    </v-btn-toggle>
    <v-combobox
      v-model="form.voicers"
      :items="items"
      :search-input.sync="search"
      hide-selected
      label="Дабери"
      multiple
      persistent-hint
      small-chips
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Натисніть
              <kbd>enter</kbd> щоб додати нового дабера
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-combobox>
    <v-combobox
      v-model="form.translators"
      :items="items"
      :search-input.sync="search"
      hide-selected
      label="Перекладачі"
      multiple
      persistent-hint
      small-chips
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Натисніть
              <kbd>enter</kbd> щоб додати нового перекладача
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-combobox>
    <v-select :items="types" v-model="form.type" label="Тип тайтл"></v-select>
    <v-combobox
      v-model="form.genres"
      :items="items"
      :search-input.sync="search"
      hide-selected
      label="Жанри"
      multiple
      persistent-hint
      small-chips
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Натисніть
              <kbd>enter</kbd> щоб додати новий жанр
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-combobox>
    <v-row>
      <v-col md="3">
        <v-text-field v-model="form.current_episodes" label="Серія">
          <template v-slot:append-outer>із</template>
        </v-text-field>
      </v-col>
      <v-col md="3">
        <v-text-field v-model="form.episodes" label="Серій"></v-text-field>
      </v-col>
    </v-row>
    <v-file-input
      @change="uploadFile"
      v-model="form.files"
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Виберіть постер"
      prepend-icon="mdi-camera"
      label="Постер"
    ></v-file-input>
    <v-textarea
      v-model="form.description"
      name="input-7-1"
      label="Опис"
      value
      hint="Опис аніме"
    ></v-textarea>
    <v-btn v-if="!update" class="mr-4" @click="save">Зберегти</v-btn>
    <v-btn v-else class="mr-4" @click="edit">Оновити</v-btn>
  </v-form>
</template>
<script>
export default {
  props: ["anime"],
  watch: {
    anime: function (anime) {
      if (anime) {
        this.form.name = anime.name;
        this.form.name_origin = anime.name_origin;
        this.form.country = anime.country;
        this.form.release_date = anime.release_date;
        this.form.studio = anime.studio;
        this.form.studio = anime.studio;
        this.form.type = anime.type;
        this.form.count_episodes = anime.count_episodes;
        this.form.current_episodes = anime.current_episodes;
        this.form.description = anime.description;
        this.form.poster_id = anime.poster_id;

        var genres;
        anime.genres.forEach((genre) => this.form.genres.push(genre.name));
        anime.voicers.forEach((voicer) => this.form.voicers.push(voicer.name));
        anime.translators.forEach((translator) =>
          this.form.translators.push(translator.name)
        );

        this.update = true;
      }
    },
  },
  layout: "admin",
  data: () => ({
    search: null,
    countries: ["Японія", "Китай", "США", "Україна", "Франція"],
    types: ["TV серіал", "Фільм"],
    colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
    items: [],
    menu2: false,
    update: false,
    form: {
      name: "",
      name_origin: "",
      voicers: [],
      translators: [],
      country: "",
      release_date: "",
      season: "0",
      type: "",
      studio: "",
      genres: [],
      current_episodes: "",
      count_episodes: "",
      description: "",
      poster_id: null,
      date: new Date().toISOString().substr(0, 10),
    },
  }),
  methods: {
    async save() {
      let respose = await this.$store.dispatch("anime/add", this.form);
      this.$router.push("/admin/anime/" + respose.id);
    },
    async edit() {
      let respose = await this.$store.dispatch("anime/update", {
        form: this.form,
        anime_id: this.anime.id,
      });
      this.$router.push("/admin/anime/" + respose.id);
    },
    async uploadFile(file) {
      let respose = await this.$store.dispatch("file/upload", file);
      this.form.poster_id = respose.id;
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = (val) => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      );
    },
    saveYear(year) {
      this.$refs.menu2.save(year);

      // Reset activePicker to type YEAR
      this.$refs.picker.activePicker = "YEAR";

      // Close the menu/datepicker
      this.menu2 = false;
    },
  },
};
</script>
