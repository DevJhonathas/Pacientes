
<template>
  <v-card id="cadastro" class="table-card pa-4 pa-md-6" rounded="xl" elevation="0">
    <!-- Cabeçalho da tabela -->
    <div class="d-flex flex-column flex-md-row justify-space-between align-md-center ga-4 mb-6">
      <div>
        <h3 class="text-h5 font-weight-bold">Pacientes cadastrados</h3>
        <p class="text-body-2 text-medium-emphasis mt-1">
          Gerencie os registros disponíveis no sistema.
        </p>
      </div>

      <div class="d-flex flex-wrap ga-2">
        <v-btn
          color="primary"
          variant="flat"
          rounded="lg"
          prepend-icon="mdi-account-plus-outline"
          @click="registerDialog = true"
        >
          Novo paciente
        </v-btn>

        <v-btn
          variant="outlined"
          color="grey-darken-2"
          rounded="lg"
          prepend-icon="mdi-file-download-outline"
          :disabled="rowData.length === 0"
          @click="exportCsv"
        >
          Exportar
        </v-btn>

        <v-btn
          color="error"
          variant="text"
          rounded="lg"
          prepend-icon="mdi-delete-sweep-outline"
          :disabled="rowData.length === 0"
          @click="deleteStorage"
        >
          Limpar lista
        </v-btn>
      </div>
    </div>

    <!-- Indicadores -->
    <v-row dense class="mb-5">
      <v-col
        v-for="stat in statCards"
        :key="stat.title"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          class="stat-card pa-4"
          :color="stat.color"
          variant="tonal"
          rounded="lg"
        >
          <div class="d-flex justify-space-between align-center">
            <div>
              <div class="text-caption font-weight-medium">
                {{ stat.title }}
              </div>

              <div class="text-h4 font-weight-bold mt-1">
                {{ stat.value }}
              </div>
            </div>

            <v-avatar color="surface" size="42">
              <v-icon :icon="stat.icon" :color="stat.color" size="22" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="mb-5" />

    <!-- Pesquisa -->
    <div class="d-flex flex-column flex-sm-row justify-space-between align-sm-center ga-3 mb-4">
      <div>
        <h4 class="text-subtitle-1 font-weight-bold">Lista de registros</h4>
        <span class="text-caption text-medium-emphasis">
          {{ rowData.length }} registro(s) encontrado(s)
        </span>
      </div>

      <v-text-field
        v-model="quickFilterText"
        label="Pesquisar paciente"
        placeholder="Nome, CPF, e-mail..."
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="comfortable"
        hide-details
        clearable
        class="search-field"
      />
    </div>

    <!-- Tabela -->
    <div class="table-wrapper">
      <ag-grid-vue
        :rowData="rowData"
        :columnDefs="colDefs"
        :defaultColDef="defaultColDef"
        :quickFilterText="quickFilterText"
        :pagination="true"
        :paginationPageSize="10"
        :getRowId="getRowId"
        :animateRows="true"
        class="ag-theme-quartz patient-grid"
        @grid-ready="onGridReady"
        @cell-value-changed="onCellValueChanged"
      />
    </div>

    <div class="d-flex align-center ga-2 mt-4 text-medium-emphasis">
      <v-icon icon="mdi-information-outline" size="18" />
      <span class="text-caption">
        Clique duas vezes em uma célula para editar o respectivo campo.
      </span>
    </div>

    <!-- Modal de cadastro -->
    <v-dialog
      v-model="registerDialog"
      max-width="680"
      scrollable
    >
    <RegisterPatient
      @saved="handlePatientSaved"
      @cancel="registerDialog = false"
    />
    </v-dialog>
  </v-card>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridVue } from "ag-grid-vue3";

import RegisterPatient from "@/components/registerPatient";
import DeletePacientes from "@/controllers/deletePatient";

const rowData = ref([]);
const quickFilterText = ref("");
const registerDialog = ref(false);
const gridApi = ref(null);

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `patient-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const formatCPF = (value) => {
  const digits = String(value ?? "").replace(/\D/g, "").slice(0, 11);

  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
};

const isValidCPF = (value) => {
  const cpf = String(value ?? "").replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  const calculateDigit = (base, weight) => {
    const sum = [...base].reduce(
      (total, digit, index) => total + Number(digit) * (weight - index),
      0
    );

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calculateDigit(cpf.slice(0, 9), 10);
  const secondDigit = calculateDigit(cpf.slice(0, 10), 11);

  return (
    firstDigit === Number(cpf[9]) &&
    secondDigit === Number(cpf[10])
  );
};

// Comparador para o filtro de datas do AG Grid.
const dateComparator = (filterDate, cellValue) => {
  if (!cellValue) return -1;

  const parts = String(cellValue).split("/").map(Number);

  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return -1;
  }

  const cellDate = new Date(parts[2], parts[1] - 1, parts[0]);

  if (cellDate.getTime() === filterDate.getTime()) return 0;
  return cellDate < filterDate ? -1 : 1;
};

const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  editable: true,
  floatingFilter: true,
  minWidth: 130,
};

const colDefs = ref([
  {
    headerName: "Nome",
    field: "primeiro_nome",
    minWidth: 140,
    flex: 1.3,
  },
  {
    headerName: "Sobrenome",
    field: "sobrenome",
    minWidth: 150,
    flex: 1.3,
  },
  {
    headerName: "E-mail",
    field: "email",
    minWidth: 210,
    flex: 1.8,
  },
  {
    headerName: "CPF",
    field: "cpf",
    minWidth: 150,
    flex: 1.2,
  },
  {
    headerName: "Nascimento",
    field: "nascimento",
    filter: "agDateColumnFilter",
    filterParams: {
      comparator: dateComparator,
    },
    minWidth: 145,
    flex: 1.1,
  },
  {
    headerName: "Escolaridade",
    field: "educacao",
    minWidth: 180,
    flex: 1.4,
  },
  {
    headerName: "Sexo",
    field: "sexo",
    minWidth: 120,
    flex: 0.9,
  },
  {
    headerName: "Ações",
    field: "action",
    cellRenderer: DeletePacientes,
    cellRendererParams: {
      clicked: deleteRow,
    },
    editable: false,
    filter: false,
    sortable: false,
    resizable: false,
    width: 95,
    minWidth: 95,
    maxWidth: 95,
  },
]);

const statCards = computed(() => {
  const patients = rowData.value;

  const male = patients.filter(
    (patient) => patient.sexo === "Masculino"
  ).length;

  const female = patients.filter(
    (patient) => patient.sexo === "Feminino"
  ).length;

  return [
    {
      title: "Total de pacientes",
      value: patients.length,
      icon: "mdi-account-group-outline",
      color: "primary",
    },
    {
      title: "Masculino",
      value: male,
      icon: "mdi-account-outline",
      color: "info",
    },
    {
      title: "Feminino",
      value: female,
      icon: "mdi-account-outline",
      color: "success",
    },
    {
      title: "Outros / não informado",
      value: patients.length - male - female,
      icon: "mdi-account-question-outline",
      color: "warning",
    },
  ];
});

const getRowId = (params) => params.data.id;

const persistPatients = (patients) => {
  try {
    localStorage.setItem("patientList", JSON.stringify(patients));
  } catch (error) {
    console.error("Erro ao salvar os pacientes:", error);
    window.alert("Não foi possível salvar os dados no navegador.");
  }
};

// Carrega os registros e adiciona um ID aos cadastros antigos.
const loadPatients = () => {
  let savedPatients = [];

  try {
    const storedData = localStorage.getItem("patientList");
    const parsedData = storedData ? JSON.parse(storedData) : [];

    savedPatients = Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error("Erro ao carregar os pacientes:", error);
  }

  const normalizedPatients = savedPatients.map((patient) => ({
    ...patient,
    id: patient.id || createId(),
  }));

  rowData.value = normalizedPatients;
  persistPatients(normalizedPatients);
};

const onGridReady = (params) => {
  gridApi.value = params.api;
};

function deleteRow(data) {
  const confirmed = window.confirm(
    `Deseja excluir o cadastro de ${data.primeiro_nome} ${data.sobrenome}?`
  );

  if (!confirmed) return;

  const updatedPatients = rowData.value.filter(
    (patient) => patient.id !== data.id
  );

  rowData.value = updatedPatients;
  persistPatients(updatedPatients);
}

const onCellValueChanged = (event) => {
  const updatedData = event.data;
  const field = event.colDef.field;

  const patientIndex = rowData.value.findIndex(
    (patient) => patient.id === updatedData.id
  );

  if (patientIndex === -1) return;

  // Evita CPF inválido ou duplicado durante a edição da tabela.
  if (field === "cpf") {
    const digits = String(updatedData.cpf ?? "").replace(/\D/g, "");

    const duplicated = rowData.value.some(
      (patient) =>
        patient.id !== updatedData.id &&
        String(patient.cpf ?? "").replace(/\D/g, "") === digits
    );

    if (!isValidCPF(digits) || duplicated) {
      updatedData.cpf = event.oldValue;

      event.api.refreshCells({
        rowNodes: [event.node],
        columns: ["cpf"],
        force: true,
      });

      window.alert(
        duplicated
          ? "Este CPF já está cadastrado."
          : "Informe um CPF válido."
      );

      return;
    }

    updatedData.cpf = formatCPF(digits);
  }

  const updatedPatients = [...rowData.value];
  updatedPatients[patientIndex] = { ...updatedData };

  rowData.value = updatedPatients;
  persistPatients(updatedPatients);
};

const deleteStorage = () => {
  const confirmed = window.confirm(
    "Tem certeza que deseja excluir todos os pacientes cadastrados?"
  );

  if (!confirmed) return;

  rowData.value = [];
  localStorage.removeItem("patientList");
};

const exportCsv = () => {
  if (!gridApi.value || rowData.value.length === 0) return;

  gridApi.value.exportDataAsCsv({
    fileName: "cadastro-de-pacientes.csv",
  });
};

const handlePatientSaved = () => {
  registerDialog.value = false;
  loadPatients();
};

onMounted(loadPatients);
</script>

<style scoped>
.table-card {
  width: 100%;
  border: 1px solid #e6ebf2;
  background: #ffffff;
  box-shadow: 0 10px 35px rgba(20, 40, 70, 0.04);
}

.stat-card {
  border: 1px solid rgba(100, 116, 139, 0.08);
  min-height: 105px;
}

.search-field {
  width: 100%;
  max-width: 360px;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.patient-grid {
  width: 100%;
  height: 560px;
  min-width: 850px;
  font-family: inherit;
}

@media (max-width: 600px) {
  .search-field {
    max-width: 100%;
  }
}
</style>
