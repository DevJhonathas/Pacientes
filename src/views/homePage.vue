
<script setup>
import TableGrid from "../components/ag-grid-table/tableGrid.vue";
</script>

<template>
  <div id="inicio" class="page-shell">
      
    <!-- Navegação responsiva -->
    <header class="app-navbar">
      <v-container class="d-flex align-center justify-space-between fill-height px-4">
        <!-- Logotipo -->
        <a href="#inicio" class="brand-link">
          <v-avatar color="primary" rounded="lg" size="36">
            <v-icon icon="mdi-account-group" color="white" size="21" />
          </v-avatar>

          <span class="brand-name">Pacientes<span>.</span></span>
        </a>

        <!-- Menu Desktop -->
        <nav class="desktop-nav d-none d-sm-flex align-center ga-2">
          <v-btn
            href="#sobre"
            variant="text"
            color="grey-darken-3"
            size="small"
          >
            Sobre
          </v-btn>

          <v-btn
            href="#cadastro"
            color="primary"
            variant="flat"
            rounded="lg"
            size="small"
            prepend-icon="mdi-account-plus-outline"
          >
            Cadastro
          </v-btn>
        </nav>

        <!-- Menu Mobile -->
        <div class="d-flex d-sm-none">
          <v-menu location="bottom end" offset="8">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-menu"
                variant="text"
                color="grey-darken-3"
                aria-label="Abrir menu de navegação"
              />
            </template>

            <v-list
              nav
              density="comfortable"
              min-width="190"
              rounded="lg"
              elevation="3"
            >
              <v-list-item
                href="#sobre"
                prepend-icon="mdi-information-outline"
                title="Sobre"
              />

              <v-list-item
                href="#cadastro"
                prepend-icon="mdi-account-plus-outline"
                title="Cadastro"
              />
            </v-list>
          </v-menu>
        </div>
      </v-container>
    </header>


    <main>
      <!-- Apresentação -->
      <section id="sobre" class="hero-section">
        <v-container class="content-width py-12 py-md-16">
          <v-row align="center" justify="space-between">
            <v-col cols="12" md="7">
              <v-chip
                color="primary"
                variant="tonal"
                prepend-icon="mdi-shield-check-outline"
                class="mb-5"
              >
                Organização e praticidade
              </v-chip>

              <h1 class="hero-title mb-5">
                Gerencie o cadastro de pacientes de forma simples.
              </h1>

              <p class="hero-description mb-7">
                O Pacientes é um sistema de demonstração desenvolvido para
                facilitar o registro, a consulta e a organização de informações
                cadastrais em uma única interface.
              </p>

              <div class="d-flex flex-wrap ga-3">
                <v-btn
                  href="#cadastro"
                  color="primary"
                  size="large"
                  rounded="lg"
                  prepend-icon="mdi-account-plus-outline"
                  elevation="0"
                >
                  Acessar cadastro
                </v-btn>

                <v-btn
                  href="#recursos"
                  variant="outlined"
                  size="large"
                  rounded="lg"
                  color="grey-darken-2"
                >
                  Conhecer recursos
                </v-btn>
              </div>
            </v-col>

            <v-col cols="12" md="4" class="d-none d-md-flex justify-center">
              <v-card class="hero-card pa-6" rounded="xl" elevation="0">
                <v-avatar color="primary" variant="tonal" size="58" class="mb-5">
                  <v-icon icon="mdi-clipboard-account-outline" size="32" />
                </v-avatar>

                <div class="text-overline text-primary mb-2">
                  CONTROLE DE CADASTROS
                </div>

                <h2 class="text-h5 font-weight-bold mb-3">
                  Tudo organizado em um só lugar.
                </h2>

                <p class="text-body-2 text-medium-emphasis mb-5">
                  Cadastre, consulte e atualize os registros por meio de uma
                  tabela interativa.
                </p>

                <v-divider class="mb-4" />

                <div class="d-flex align-center ga-3 mb-3">
                  <v-icon color="success" icon="mdi-check-circle-outline" />
                  <span class="text-body-2">Cadastro simplificado</span>
                </div>

                <div class="d-flex align-center ga-3 mb-3">
                  <v-icon color="success" icon="mdi-check-circle-outline" />
                  <span class="text-body-2">Pesquisa e filtros</span>
                </div>

                <div class="d-flex align-center ga-3">
                  <v-icon color="success" icon="mdi-check-circle-outline" />
                  <span class="text-body-2">Exportação de registros</span>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Recursos -->
      <section id="recursos" class="features-section py-12 py-md-16">
        <v-container class="content-width">
          <div class="text-center mb-10">
            <span class="section-eyebrow">RECURSOS</span>
            <h2 class="text-h4 font-weight-bold mt-2 mb-3">
              Gestão mais organizada
            </h2>
            <p class="text-body-1 text-medium-emphasis mx-auto section-description">
              Ferramentas para facilitar o gerenciamento das informações
              cadastrais.
            </p>
          </div>

          <v-row>
            <v-col cols="12" md="4">
              <v-card class="feature-card pa-6 h-100" rounded="xl" elevation="0">
                <v-avatar color="primary" variant="tonal" size="48" class="mb-5">
                  <v-icon icon="mdi-account-plus-outline" size="25" />
                </v-avatar>

                <h3 class="text-h6 font-weight-bold mb-2">
                  Cadastro de pacientes
                </h3>

                <p class="text-body-2 text-medium-emphasis">
                  Registre informações pessoais por meio de um formulário
                  organizado e com validação dos campos.
                </p>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card class="feature-card pa-6 h-100" rounded="xl" elevation="0">
                <v-avatar color="success" variant="tonal" size="48" class="mb-5">
                  <v-icon icon="mdi-table-edit" size="25" />
                </v-avatar>

                <h3 class="text-h6 font-weight-bold mb-2">
                  Organização dos dados
                </h3>

                <p class="text-body-2 text-medium-emphasis">
                  Visualize os registros em uma tabela interativa, com
                  possibilidade de pesquisar, filtrar e editar informações.
                </p>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card class="feature-card pa-6 h-100" rounded="xl" elevation="0">
                <v-avatar color="info" variant="tonal" size="48" class="mb-5">
                  <v-icon icon="mdi-file-download-outline" size="25" />
                </v-avatar>

                <h3 class="text-h6 font-weight-bold mb-2">
                  Exportação
                </h3>

                <p class="text-body-2 text-medium-emphasis">
                  Exporte os registros cadastrados em formato CSV para
                  facilitar consultas e análises externas.
                </p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Tabela no final da página -->
      <section class="registration-section py-12 py-md-16">
        <v-container class="content-width">
          <div class="mb-8">
            <span class="section-eyebrow">ÁREA DE GERENCIAMENTO</span>

            <h2 class="text-h4 font-weight-bold mt-2 mb-3">
              Cadastro de pacientes
            </h2>

            <p class="text-body-1 text-medium-emphasis">
              Consulte os registros existentes ou adicione um novo paciente
              à tabela.
            </p>
          </div>

          <TableGrid />
        </v-container>
      </section>
    </main>

    <!-- Rodapé -->
    <v-footer class="footer-section">
      <v-container class="content-width d-flex flex-wrap justify-space-between align-center ga-3 py-5">
        <span class="text-body-2 text-medium-emphasis">
          © {{ new Date().getFullYear() }} Pacientes. Projeto demonstrativo.
        </span>

        <a href="#inicio" class="footer-link">
          Voltar ao início
          <v-icon icon="mdi-arrow-up" size="16" />
        </a>
      </v-container>
    </v-footer>
  </div>
</template>

<style scoped>
.page-shell {
  min-height: 100vh;
  background: #f7f9fc;
  color: #172033;
}

.app-navbar {
  height: 64px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.97);
  border-bottom: 1px solid #e9edf3;
  backdrop-filter: blur(12px);
}

.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: inherit;
  text-decoration: none;
}

.brand-name {
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.7px;
  color: #172033;
}

.brand-name span {
  color: #1976d2;
}

.brand-name span {
  color: #1976d2;
}

.content-width {
  max-width: 1160px;
}

.hero-section {
  background:
    radial-gradient(circle at 85% 20%, rgba(25, 118, 210, 0.09), transparent 30%),
    linear-gradient(135deg, #ffffff 0%, #f2f7ff 100%);
}

.hero-title {
  max-width: 680px;
  font-size: clamp(2.3rem, 5vw, 3.65rem);
  line-height: 1.12;
  letter-spacing: -1.8px;
  font-weight: 800;
  color: #172033;
}

.hero-description {
  max-width: 620px;
  color: #657187;
  font-size: 1.08rem;
  line-height: 1.8;
}

.hero-card {
  width: 100%;
  max-width: 350px;
  border: 1px solid #e5ebf3;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 20px 50px rgba(30, 60, 100, 0.08);
}

.features-section {
  background: #ffffff;
}

.section-eyebrow {
  color: #1976d2;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.section-description {
  max-width: 590px;
}

.feature-card {
  border: 1px solid #e8edf4;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 30px rgba(25, 50, 80, 0.07);
}

.registration-section {
  background: #f7f9fc;
}

.footer-section {
  background: #ffffff;
  border-top: 1px solid #e9edf3;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #1976d2;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
}

@media (max-width: 600px) {
  .brand-name {
    font-size: 1.1rem;
  }

  .app-navbar {
    height: 60px;
  }

  .hero-title {
    letter-spacing: -1px;
  }
}
</style>
