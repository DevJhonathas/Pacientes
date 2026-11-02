
<template>
  <v-card class="register-card pa-5 pa-md-7" rounded="xl" elevation="0">
    <div class="d-flex justify-space-between align-start mb-6">
      <div class="d-flex align-center ga-3">
        <v-avatar color="primary" variant="tonal" size="48">
          <v-icon icon="mdi-account-plus-outline" size="25" />
        </v-avatar>

        <div>
          <h2 class="text-h5 font-weight-bold">Novo paciente</h2>
          <p class="text-caption text-medium-emphasis mt-1">
            Preencha os dados para realizar o cadastro.
          </p>
        </div>
      </div>

      <v-btn
        icon
        variant="text"
        color="grey-darken-1"
        aria-label="Fechar formulário"
        @click="emit('cancel')"
      >
        <v-icon icon="mdi-close" />
      </v-btn>
    </div>

    <v-divider class="mb-5" />

    <v-form ref="formRef" @submit.prevent="savePatient">
      <div class="text-subtitle-2 font-weight-bold mb-3">
        Informações pessoais
      </div>

      <v-row dense>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.primeiro_nome"
            label="Primeiro nome"
            placeholder="Ex.: João"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            density="comfortable"
            :rules="[requiredRule]"
            autocomplete="given-name"
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.sobrenome"
            label="Sobrenome"
            placeholder="Ex.: Silva"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            density="comfortable"
            :rules="[requiredRule]"
            autocomplete="family-name"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="form.email"
            label="E-mail"
            placeholder="exemplo@email.com"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            density="comfortable"
            :rules="[requiredRule, emailRule]"
            autocomplete="email"
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.cpf"
            label="CPF"
            placeholder="000.000.000-00"
            prepend-inner-icon="mdi-card-account-details-outline"
            variant="outlined"
            density="comfortable"
            maxlength="14"
            :rules="[requiredRule, cpfRule]"
            @update:model-value="updateCpf"
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.nascimento"
            label="Data de nascimento"
            prepend-inner-icon="mdi-calendar-outline"
            type="date"
            variant="outlined"
            density="comfortable"
            :max="today"
            :rules="[requiredRule, birthDateRule]"
          />
        </v-col>
      </v-row>

      <v-divider class="my-3" />

      <div class="text-subtitle-2 font-weight-bold mb-3">
        Informações complementares
      </div>

      <v-row dense>
        <v-col cols="12" sm="7">
          <v-select
            v-model="form.educacao"
            label="Escolaridade"
            placeholder="Selecione uma opção"
            prepend-inner-icon="mdi-school-outline"
            :items="educationOptions"
            variant="outlined"
            density="comfortable"
            :rules="[requiredRule]"
          />
        </v-col>

        <v-col cols="12" sm="5">
          <v-select
            v-model="form.sexo"
            label="Sexo"
            placeholder="Selecione"
            prepend-inner-icon="mdi-account-outline"
            :items="sexOptions"
            variant="outlined"
            density="comfortable"
            :rules="[requiredRule]"
          />
        </v-col>
      </v-row>

      <v-alert
        type="info"
        variant="tonal"
        density="compact"
        rounded="lg"
        class="mt-2 mb-5"
      >
        Confira as informações antes de confirmar o cadastro.
      </v-alert>

      <div class="d-flex justify-end flex-wrap ga-2">
        <v-btn
          variant="text"
          color="grey-darken-1"
          rounded="lg"
          @click="emit('cancel')"
        >
          Cancelar
        </v-btn>

        <v-btn
          type="submit"
          color="primary"
          variant="flat"
          rounded="lg"
          prepend-icon="mdi-check-circle-outline"
        >
          Salvar paciente
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script setup>
import { reactive, ref } from "vue";

const emit = defineEmits(["saved", "cancel"]);

const formRef = ref(null);

const createEmptyForm = () => ({
  primeiro_nome: "",
  sobrenome: "",
  email: "",
  cpf: "",
  educacao: "",
  sexo: "",
  nascimento: "",
});

const form = reactive(createEmptyForm());

const educationOptions = [
  "Ens. Fundamental Incompleto",
  "Ens. Fundamental Completo",
  "Ens. Médio Incompleto",
  "Ens. Médio Completo",
  "Curso Técnico",
  "Tecnólogo",
  "Bacharelado",
  "Mestrado",
  "Doutorado",
  "Outro",
];

const sexOptions = [
  "Masculino",
  "Feminino",
  "Outro",
  "Prefiro não informar",
];

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const today = getToday();

const requiredRule = (value) =>
  !!String(value ?? "").trim() || "Este campo é obrigatório.";

const emailRule = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || "Informe um e-mail válido.";
};

const formatCPF = (value) => {
  const digits = String(value ?? "").replace(/\D/g, "").slice(0, 11);

  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
};

const updateCpf = (value) => {
  form.cpf = formatCPF(value);
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

const cpfRule = (value) =>
  isValidCPF(value) || "Informe um CPF válido.";

const birthDateRule = (value) =>
  !value || value <= today || "A data não pode ser futura.";

const formatDateBR = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `patient-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const savePatient = async () => {
  if (!formRef.value) return;

  const { valid } = await formRef.value.validate();

  if (!valid) return;

  const cpfDigits = form.cpf.replace(/\D/g, "");

  try {
    const storedData = localStorage.getItem("patientList");
    const existingPatients = storedData ? JSON.parse(storedData) : [];
    const patients = Array.isArray(existingPatients)
      ? existingPatients
      : [];

    const duplicatedCPF = patients.some(
      (patient) =>
        String(patient.cpf ?? "").replace(/\D/g, "") === cpfDigits
    );

    if (duplicatedCPF) {
      window.alert("Já existe um paciente cadastrado com este CPF.");
      return;
    }

    const newPatient = {
      id: createId(),
      primeiro_nome: form.primeiro_nome.trim(),
      sobrenome: form.sobrenome.trim(),
      email: form.email.trim().toLowerCase(),
      cpf: formatCPF(cpfDigits),
      nascimento: formatDateBR(form.nascimento),
      educacao: form.educacao,
      sexo: form.sexo,
    };

    patients.push(newPatient);

    localStorage.setItem("patientList", JSON.stringify(patients));

    Object.assign(form, createEmptyForm());

    emit("saved");
  } catch (error) {
    console.error("Erro ao cadastrar paciente:", error);
    window.alert("Não foi possível salvar o cadastro.");
  }
};
</script>

<style scoped>
.register-card {
  width: 100%;
  background: #ffffff;
}

:deep(.v-field) {
  border-radius: 10px;
}

:deep(.v-field__outline) {
  --v-field-border-opacity: 0.2;
}
</style>
