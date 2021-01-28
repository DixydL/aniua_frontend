<template>
  <div>
    <v-card>
      <v-container>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                to="/admin/anime/create"
              >Додати нове аніме</v-btn>
              <tr>
                <th class="text-left">Назва аніме</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="anime in animes" :key="anime.name">
                <td>{{ anime.name }}</td>
                <td>
                  <v-btn color="blue darken-1" text :to="'/admin/anime/'+anime.id">Список серій</v-btn>
                  <v-btn color="blue darken-1" text :to="'/admin/anime/'+anime.id+'/edit'">Редагувати</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Видалити</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  layout: "admin",
  created() {
    this.$store.dispatch("anime/load");
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      animes: "anime/getAnimes",
    }),
  },
  methods: {
    async submit() {
      let respose = await this.$store.dispatch("anime/add", this.form);
    },
  },
};
</script>
