<template>
  <section>
    <client-only>
      <Editor ref="editor"/>
    </client-only>
  </section>
</template>

<script>
import Editor from "~/components/Editor";

export default {
  layout: "admin",
  components: {
    Editor,
  },
  created() {
    console.log(this.$refs.editor);
  }
};
</script>
