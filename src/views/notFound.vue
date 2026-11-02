
<template>
  <v-container fluid class="not-found-page d-flex align-center justify-center pa-5">
    <v-card class="not-found-card pa-6 pa-md-10 text-center" rounded="xl" elevation="0">
      <div class="error-code mb-3">404</div>

      <div class="mb-6">
        <img
          src="../assets/bunny_with_coffe.gif"
          alt="Coelhinho tomando café"
          class="not-found-img"
        />
      </div>

      <v-chip
        color="primary"
        variant="tonal"
        prepend-icon="mdi-alert-circle-outline"
        class="mb-4"
      >
        Página não encontrada
      </v-chip>

      <h1 class="text-h4 font-weight-bold mb-3">
        Ops! Não encontramos essa página.
      </h1>

      <p class="text-body-1 text-medium-emphasis mb-8 max-width-text">
        O endereço que você tentou acessar não existe ou foi alterado.
        Verifique o link ou retorne à página inicial para continuar.
      </p>

      <v-btn
        to="/"
        color="primary"
        variant="flat"
        size="large"
        rounded="lg"
        prepend-icon="mdi-home-outline"
        class="px-7"
      >
        Voltar para o início
      </v-btn>

      <div class="mt-8">
        <span class="text-caption text-medium-emphasis">
          Pacientes · Sistema de cadastro
        </span>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 50% 10%, rgba(25, 118, 210, 0.08), transparent 35%),
    #f7f9fc;
}

.not-found-card {
  width: 100%;
  max-width: 650px;
  border: 1px solid #e8edf4;
  background: #ffffff;
  box-shadow: 0 20px 60px rgba(20, 40, 70, 0.06);
}

.error-code {
  font-size: clamp(4rem, 12vw, 6rem);
  line-height: 1;
  font-weight: 900;
  letter-spacing: -5px;
  color: #1976d2;
  opacity: 0.9;
}

.not-found-img {
  width: 160px;
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.max-width-text {
  max-width: 450px;
  margin-inline: auto;
  line-height: 1.8;
}
</style>
