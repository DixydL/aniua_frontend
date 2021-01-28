<template>
  <v-app dark>
    <!--<v-navigation-drawer v-model="drawer" fixed app temporary>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar class="title" :clipped-left="clipped" fixed app>
      <nuxt-link to="/">
        <v-toolbar-title class="link-title" v-text="title" />
      </nuxt-link>
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          v-for="item in items"
          :key="item.icon"
          :to="item.to"
          :title="item.title"
          text
          >{{ item.title }}</v-btn
        >
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Головна",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Все аніме",
          to: "/all-anime",
        },
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: "AniUA",
    };
  },
};
</script>
