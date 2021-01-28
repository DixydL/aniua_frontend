<template>
  <v-form ref="form">
    <v-text-field
      v-model="form.name"
      label="Назва серії"
      hide-details="auto"
    ></v-text-field>
    <v-text-field v-model="form.episode" label="Номер серії"></v-text-field>
    <v-textarea
      v-model="form.iframe"
      name="input-7-1"
      label="Код плеєра(Основний)"
      value
      hint="iframe"
    ></v-textarea>
    <v-textarea
      v-model="form.iframe2"
      name="input-7-1"
      label="Код плеєра(Додатковий)"
      value
      hint="iframe"
    ></v-textarea>
    <v-textarea
      v-model="form.iframe3"
      name="input-7-1"
      label="Код плеєра(Субтитри)"
      value
      hint="iframe"
    ></v-textarea>
    <v-btn v-if="!update" class="mr-4" @click="save">Зберегти</v-btn>
    <v-btn v-else class="mr-4" @click="edit">Оновити</v-btn>
  </v-form>
</template>
<script>
export default {
  layout: "admin",
  props: ["episode", "alert"],
  data: () => ({
    form: {
      name: "",
      episode: "",
      iframe: "",
      iframe2: "",
      iframe3: "",
      update: false,
    },
  }),
  watch: {
    episode: function (episode) {
      if (episode) {
        this.form.name = episode.name;
        this.form.episode = episode.episode;
        this.form.iframe = episode.iframe;
        this.update = true;
      }
    },
  },
  methods: {
    async save() {
      let respose = await this.$store.dispatch("episode/add", {
        anime_id: this.$route.params.id,
        form: this.form,
      });
      this.$router.push("/admin/anime/" + this.$route.params.id);
    },
    async edit() {
      let respose = await this.$store.dispatch("episode/update", {
        anime_id: this.$route.params.id,
        episode_id: this.$route.params.episode_id,
        form: this.form,
      });
      this.$emit("update:alert", true);
      window.scrollTo(0, 0);
    },
  },
};
</script>
