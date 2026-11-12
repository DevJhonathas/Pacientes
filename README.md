# 🏥 Pacientes — Sistema de Gerenciamento de Cadastros

Aplicação web desenvolvida com Vue.js para realizar o gerenciamento de cadastros de pacientes, oferecendo uma interface intuitiva, responsiva e organizada para operações de CRUD (Create, Read, Update e Delete).

O projeto busca demonstrar a utilização de tecnologias do ecossistema Vue.js na construção de uma aplicação administrativa, combinando componentes visuais, manipulação de dados e armazenamento local.

<p align="center">
  <a href="https://cg-crud-git-master-jhonathas-projects.vercel.app">
    <strong>🌐 Acessar aplicação</strong>
  </a>
</p>

<p align="center">
  <img width="44.3%" alt="pacientes" src="https://github.com/user-attachments/assets/9eaeb705-1d32-499c-91c9-e30998286e96" />
  <img width="48%" alt="cadastra_pacientes" src="https://github.com/user-attachments/assets/a195ea89-ac35-4aba-8674-95bf6269a1e6" />

</p>

---

## 📋 Sobre o projeto

O **Pacientes** foi desenvolvido com o objetivo de facilitar o gerenciamento de informações cadastrais por meio de uma tabela interativa.

A aplicação permite cadastrar novos pacientes, consultar informações, editar registros existentes e realizar exclusões individuais ou em massa.

Além das funcionalidades de CRUD, o sistema apresenta uma página inicial explicativa, indicadores de cadastros, ferramentas de pesquisa e filtragem, exportação de dados e uma interface adaptável a diferentes dispositivos.

---

## ✨ Funcionalidades

### 🏠 Página inicial

- Apresentação do projeto e de sua finalidade.
- Navegação por seções através de uma navbar.
- Menu hambúrguer para dispositivos móveis.
- Seção explicativa sobre os recursos disponíveis.
- Área de gerenciamento posicionada ao final da página.
- Rodapé com identificação do projeto e navegação.

### 👤 Cadastro de pacientes

O formulário permite registrar as seguintes informações:

| Campo | Descrição |
|---|---|
| Primeiro nome | Nome do paciente |
| Sobrenome | Sobrenome do paciente |
| E-mail | Endereço de e-mail |
| CPF | Documento com formatação automática |
| Nascimento | Data de nascimento |
| Escolaridade | Nível de escolaridade |
| Sexo | Informação selecionada pelo usuário |

**Validações implementadas:**

- Verificação de campos obrigatórios.
- Validação básica do formato de e-mail.
- Validação matemática dos dígitos verificadores do CPF.
- Formatação automática do CPF.
- Verificação de CPF duplicado.
- Impedimento de datas de nascimento futuras.

 ### 🔢 Validação matemática do CPF

A validação do CPF utiliza o algoritmo de **módulo 11**, responsável por verificar os dois dígitos verificadores do documento.

O cálculo é realizado em duas etapas:

1. **Primeiro dígito:** os nove primeiros números são multiplicados por pesos de 10 a 2. A soma dos resultados é dividida por 11 para determinar o primeiro dígito verificador.
2. **Segundo dígito:** os nove números iniciais, juntamente com o primeiro dígito calculado, são multiplicados por pesos de 11 a 2. O mesmo procedimento é aplicado para obter o segundo dígito.

Em ambos os cálculos, quando o resto da divisão por 11 é menor que 2, o dígito resultante é 0. Caso contrário, utiliza-se a diferença entre 11 e o resto.

**O sistema também rejeita sequências repetidas**, como `000.000.000-00` e `111.111.111-11`.

> **Importante:** essa validação verifica apenas a consistência matemática do CPF. Ela não confirma sua existência, situação cadastral ou identidade do titular junto à Receita Federal.

### 📊 Gerenciamento de registros

A aplicação utiliza o AG Grid para apresentar os pacientes em uma tabela interativa.

Principais recursos:

- **Consulta:** visualização dos pacientes cadastrados.
- **Pesquisa:** busca rápida por informações dos registros.
- **Filtros:** filtragem individual das colunas.
- **Ordenação:** organização dos registros por diferentes campos.
- **Edição:** alteração dos dados diretamente na tabela, utilizando dois cliques sobre a célula.
- **Exclusão individual:** remoção de pacientes específicos.
- **Exclusão em massa:** limpeza de todos os registros cadastrados.
- **Identificação única:** utilização de identificadores para preservar a referência dos registros durante as edições.

### 📈 Indicadores

A interface apresenta indicadores dinâmicos para facilitar a visualização dos cadastros:

- Total de pacientes.
- Quantidade de pacientes do sexo masculino.
- Quantidade de pacientes do sexo feminino.
- Quantidade de outros registros ou sem classificação nas categorias anteriores.

Os indicadores são atualizados conforme os registros são adicionados ou removidos.

### 📥 Exportação de dados

- Exportação dos registros em formato CSV.
- Arquivo compatível com ferramentas de planilhas, como Microsoft Excel e LibreOffice Calc.
- Exportação dos dados disponíveis na tabela.

### 🚫 Página 404 personalizada

A aplicação possui uma página personalizada para endereços inexistentes.

Características:

- Apresentação do código de erro 404.
- Mensagem explicativa.
- Botão para retornar à página inicial.
- GIF animado de um coelhinho com uma xícara de café.
- Interface alinhada à identidade visual do projeto.

### 📱 Responsividade

A interface foi desenvolvida para oferecer uma experiência adaptável a diferentes tamanhos de tela.

- Navbar responsiva.
- Menu hambúrguer em dispositivos móveis.
- Layout adaptável.
- Organização dos componentes para telas menores.
- Elementos visuais ajustados para desktop e mobile.

---

## 🛠️ Tecnologias utilizadas

O projeto utiliza tecnologias do ecossistema JavaScript e Vue.js.

| Tecnologia | Versão declarada | Aplicação |
|---|---|---|
| [Vue.js](https://vuejs.org/) | 3.4.x | Construção da interface |
| [Vuetify](https://vuetifyjs.com/) | 3.5.x | Componentes visuais e estilização |
| [Vite](https://vite.dev/) | 5.x | Ambiente de desenvolvimento e build |
| [Vue Router](https://router.vuejs.org/) | 4.x | Gerenciamento de rotas |
| [AG Grid](https://www.ag-grid.com/) | 32.x | Tabela interativa e manipulação de dados |
| [TinyMCE](https://www.tiny.cloud/) | 5.x (integração Vue) | Dependência disponível para edição de conteúdo |
| [Material Design Icons](https://pictogrammers.com/library/mdi/) | 7.x | Ícones da interface |

### Outras ferramentas

- **JavaScript:** lógica e manipulação dos dados.
- **HTML5:** estrutura da aplicação.
- **CSS3:** personalização visual.
- **LocalStorage:** armazenamento local dos registros no navegador.
- **Git e GitHub:** versionamento e hospedagem do código-fonte.
- **Vercel:** implantação e disponibilização da aplicação.

---

## 🚀 Instalação e execução

Para executar o projeto localmente, é necessário ter o Node.js e o npm instalados.

**Requisito de ambiente:** Node.js 26.x, conforme a configuração atual de implantação na Vercel.

### 1. Clone o repositório

```bash
git clone https://github.com/DevJhonathas/CG-CRUD.git
```

### 2. Entre na pasta do projeto

```bash
cd CG-CRUD
```

### 3. Instale as dependências

Caso exista um arquivo `package-lock.json`, prefira:

```bash
npm ci
```

Alternativamente:

```bash
npm install
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O Vite disponibilizará o endereço local no terminal, normalmente:

```text
http://localhost:5173
```

### 5. Gere a versão de produção

Para compilar a aplicação:

```bash
npm run build
```

O resultado será gerado no diretório `dist/`.

### 6. Visualize a versão de produção localmente

```bash
npm run preview
```

---

## ☁️ Implantação

A aplicação está hospedada na **Vercel**, permitindo seu acesso por meio de um endereço público.

**Acessar:**  
https://cg-crud-git-master-jhonathas-projects.vercel.app

A implantação pode ser realizada conectando o repositório do GitHub à Vercel.

Configurações principais:

- Framework Preset: Vite.
- Build Command: `npm run build`.
- Output Directory: `dist`.
- Node.js Version: `26.x`.

---

## 💾 Armazenamento de dados

Atualmente, o projeto utiliza o `localStorage` para armazenar os cadastros.

Isso significa que:

- Os dados permanecem salvos no navegador utilizado.
- Não é necessário configurar um banco de dados para executar a aplicação.
- Os registros não são sincronizados automaticamente entre dispositivos.
- A limpeza dos dados do navegador pode ocasionar a perda dos cadastros.

A aplicação também utiliza identificadores únicos para cada registro, permitindo realizar edições sem depender do CPF como identificador principal.

### ⚠️ Privacidade e segurança

Este projeto possui finalidade demonstrativa e educacional.

Como os dados são armazenados localmente no navegador, não há autenticação, controle de acesso ou proteção adequada para informações pessoais sensíveis.

**Não utilize informações reais de pacientes.** Para um ambiente de produção, seria necessário implementar uma API, banco de dados seguro, autenticação, autorização e medidas adequadas de proteção de dados, considerando especialmente a LGPD.

A validação matemática do CPF não confirma sua existência, situação cadastral ou identidade do titular junto à Receita Federal.

---

## 📌 Possíveis melhorias futuras

Algumas funcionalidades que podem ser incorporadas em versões futuras:

- Integração com banco de dados.
- Backend para gerenciamento dos registros.
- Sistema de autenticação e controle de usuários.
- Paginação e relatórios mais avançados.
- Histórico de alterações dos cadastros.
- Dashboard com gráficos estatísticos.
- Implementação de testes automatizados.
- Melhorias de acessibilidade.

---

## 👨‍💻 Autor

**Desenvolvido por Jhonathas Souza.**

- GitHub: [@DevJhonathas](https://github.com/DevJhonathas)

---

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE). Disponibilizado para fins de estudo, aprendizado e demonstração de desenvolvimento web.

Você é livre para utilizar, copiar, modificar, distribuir e comercializar este software, desde que mantenha os avisos de direitos autorais e o texto da licença original.

---

<p align="center">
  Desenvolvido com ❤️ utilizando Vue.js.
</p>
