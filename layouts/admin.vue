<template>
  <v-app dark>
    <v-container>
      <v-navigation-drawer v-model="drawer" absolute dark>
        <v-list dense nav class="py-0">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Адмінка</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item to="/admin/anime" nuxt link>
            <v-list-item-icon>
              <v-icon>mdi-image</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Аніме</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/admin/cooperation" nuxt link>
            <v-list-item-icon>
              <v-icon>mdi-image</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Співпраця</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-container>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    expandOnHover: false,
    drawer: true,
  }),
};
</script>
