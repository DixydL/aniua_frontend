<template></template>

<script>
import DashboardCoreAppBar from "~/components/core/AppBar.vue";
// import DashboardCoreDrawer from "~/components/core/Drawer.vue";
// import DashboardCoreSettings from "~/components/core/Settings.vue";
//import DashboardCoreView from "~/components/core/View.vue";

export default {
  layout: "admin",
  components: {
    DashboardCoreAppBar,
    // DashboardCoreDrawer,
    // DashboardCoreSettings,
    //  DashboardCoreView,
  },
  name: "DashboardIndex",

  data: () => ({
    expandOnHover: false,
    drawer: true,
  }),
};
</script>
