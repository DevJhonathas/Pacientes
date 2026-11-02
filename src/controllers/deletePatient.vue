
<template>
  <v-tooltip text="Excluir paciente" location="top">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon
        size="small"
        variant="text"
        color="error"
        aria-label="Excluir paciente"
        @click="onClick"
      >
        <v-icon icon="mdi-trash-can-outline" />
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script>
export default {
  name: "DeletePacientes",

  props: {
    params: {
      type: Object,
      required: true,
    },
  },

  methods: {
    onClick() {
      this.params.clicked(this.params.data);
    },
  },
};
</script>
