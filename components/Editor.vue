<template>
  <div class="editor">
    <ClientOnly>
      <!-- Use the component in the right place of the template -->
      <tiptap-vuetify
        v-model="content"
        :extensions="extensions"
        :toolbar-attributes="{ color: 'black', dark: true }"
      />

      <template #placeholder> Loading... </template>
      <hr />
      <v-card>
        <v-btn @click="onClick"> Зберегти </v-btn>
      </v-card>
    </ClientOnly>
  </div>
</template>

<script>
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Heading,
  Bold,
  Italic,
  Image,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";

export default {
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify },
  data: () => ({
    // declare extensions you want to use
    extensions: [
      [
        Table,
        {
          resizable: true,
        },
      ],
      TableCell,
      TableHeader,
      TableRow,
      History,
      Blockquote,
      Underline,
      Image,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Link,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
    // starting editor's content
    content: `
      <h1>Yay Headlines!</h1>
      <p>All these <strong>cool tags</strong> are working now.</p>
    `,
  }),
  methods: {
    onClick: async function (event) {
      let respose = await this.$store.dispatch("cooperation/add", {
        html: this.content,
      });
    },
  },
};
</script>

<style>
.v-card.v-sheet.theme--light {
  background: #000 !important;
}
.v-card.theme--light input {
  background: #999999 !important;
}
.v-label.theme--light {
  color: #d4d4d4;
}

.v-btn__content {
  color: #d4d4d4;
}

.headline {
  color: #d4d4d4;
}
</style>
