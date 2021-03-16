<template>
  <div>
    <v-card>
      <client-only>
        <v-data-table
          dense
          :headers="headers"
          :items="episodesItems"
          item-key="name"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                :to="'/admin/anime/' + $route.params.id + '/episodes/create'"
                >Додати нову серію</v-btn
              >
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn color="blue darken-1" text @click="edit(item.id)"
              >Редагувати</v-btn
            >
            <v-btn color="blue darken-1" text @click="save">Видалити</v-btn>
          </template>
        </v-data-table>
      </client-only>
    </v-card>
  </div>
</template>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  layout: "admin",
  async beforeCreate() {
    await this.$store.dispatch("episode/loadByAnime", this.$route.params.id);
    this.episodesItems = this.episodes;
  },
  data: () => ({
    headers: [
      {
        text: "Назва серії",
        align: "start",
        value: "name",
      },
      { text: "Номер серії", value: "episode" },
      { text: "", align: "right", value: "actions", sortable: false },
    ],
    episodesItems: [],
  }),
  computed: {
    animeId() {
      return this.$route.params.id;
    },
    ...mapGetters({
      episodes: "episode/getEpisodes",
    }),
  },
  methods: {
    async edit(episode_id) {
      this.$router.push({ path: "/admin/anime/" + this.animeId + "/episodes/" + episode_id + "/edit" });
    },
  },
};
</script>
