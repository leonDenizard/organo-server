# ⚙️ Organo Server

**Organo Server** é o backend da aplicação **Organo**, responsável por toda a lógica de negócio, CRUDs e manipulação dos dados relacionados a usuários, cargos, squads, escalas e demais entidades administrativas.
Desenvolvido em **Node.js + Express** e integrado ao **MongoDB**, fornece uma API REST que alimenta o frontend hospedado na Vercel.

---

## 🚀 Tecnologias utilizadas

* **Node.js**
* **Express**
* **MongoDB (Mongoose)**
* **JavaScript (ES Modules)**
* **Vercel** (deploy)

---

## 🧠 Objetivo

Gerenciar os dados da aplicação **Organo**, garantindo a comunicação entre o frontend e o banco de dados com segurança, escalabilidade e clareza na estrutura dos endpoints.

---

## 📂 Estrutura de pastas

```
organo-server/
├── node_modules/
├── src/
│   ├── controllers/    # Regras de negócio e controle das rotas
│   ├── database/       # Conexão e configuração do MongoDB
│   ├── mockup/         # Dados de exemplo e testes
│   ├── models/         # Modelos (schemas) do MongoDB
│   ├── routes/         # Definição das rotas da aplicação
│   ├── services/       # Funções auxiliares e integrações
│   └── utils/          # Utilitários e middlewares de suporte
├── .env
├── .gitignore
├── app.js              # Configuração principal do Express
├── server.js           # Ponto de entrada da aplicação
├── package.json
├── package-lock.json
└── vercel.json
```

---

## ⚙️ Funcionalidades principais

### 🔄 CRUDs disponíveis

* **Escala global** – criação, edição e remoção de escalas mensais
* **Cargos** – gerenciamento de cargos internos
* **Squads** – criação e manutenção de squads
* **Status de trabalho** – parametrização de status (ex: trabalhando, folga, feriado) com cor personalizada
* **Supervisores** – cadastro e associação com colaboradores
* **Usuários** – criação, atualização e exclusão de perfis
* **Horários de trabalho** – definição e edição de horários padrão

### 🧩 Integração com o frontend

* API REST conectada ao **Organo Frontend**
* Comunicação via `VITE_API_URL`
* Suporte a autenticação por **Google OAuth** (validada pelo front)

---

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes chaves:

```env
PORT=3000
MONGO_URI=retryWrites=true&w=majority&appName=Cluster0
REACT_APP_API_URL=http://localhost:3000/api
```

> ⚠️ Substitua `MONGO_URI` pela string de conexão real do seu cluster no MongoDB Atlas.

---

## 🧰 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/leonDenizard/organo-server.git
cd organo-server
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o `.env`

Use o exemplo acima e insira suas credenciais do MongoDB.

### 4. Execute o servidor

```bash
npm run dev
```

O servidor iniciará em:
👉 [http://localhost:3000/api](http://localhost:3000/api)

---

## 🌐 Deploy

O backend é hospedado na **Vercel**, integrando diretamente com o frontend:
🔗 [Organo Frontend](https://organo-two-henna.vercel.app/)

---

## 💡 Ideias futuras

* Logs e histórico de alterações por usuário
* Middleware de auditoria e segurança
* Integração com mensageria (RabbitMQ / Kafka)
* Endpoint de relatórios e métricas
* Notificações automáticas para o frontend

---

✨ Desenvolvido com **Express**, **MongoDB** e uma arquitetura limpa e escalável.