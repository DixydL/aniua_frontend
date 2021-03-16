<template>
  <div>
    <v-card>
      <v-container>
        <v-data-table
          dense
          :headers="headers"
          :items="genresItems"
          item-key="name"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn color="blue darken-1" text @click="edit(item.id)"
              >Редагувати</v-btn
            >
            <v-btn color="blue darken-1" text @click="remove">Видалити</v-btn>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    headers: [
      {
        text: "Назва жанра",
        value: "name",
      },
      { text: "", align: "right", value: "actions", sortable: false },
    ],
    genresItems: [],
  }),
  watch: {
    genres: function (genres) {
      this.genresItems = genres;
    },
  },
  async created() {
    this.$store.dispatch("genre/load");
  },
  computed: {
    ...mapGetters({
      genres: "genre/getGenres",
    }),
  },
  methods: {
    edit(id) {
      console.log(id);
    },
  },
};
</script>
