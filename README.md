# Company Management API

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

<p align="center">
  <strong>API para gerenciamento de empresas e destinatários de e-mail</strong>
</p>

<p align="center">
  <a href="https://nestjs.com/" target="_blank">NestJS</a> • 
  <a href="https://www.prisma.io/" target="_blank">Prisma</a> • 
  <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a> • 
  <a href="https://swagger.io/" target="_blank">Swagger</a>
</p>

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Documentação da API](#documentação-da-api)
- [Endpoints Disponíveis](#endpoints-disponíveis)
- [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Testes](#testes)
- [Deploy](#deploy)

---

## 🚀 Sobre o Projeto

Esta é uma API REST desenvolvida com NestJS para gerenciamento de empresas e destinatários de e-mail. O sistema permite:

- ✅ Cadastro e gerenciamento de empresas
- ✅ Gestão de destinatários de e-mail
- ✅ Envio automático de e-mails de confirmação
- ✅ API totalmente documentada com Swagger
- ✅ Validação de dados com class-validator
- ✅ Banco de dados PostgreSQL com Prisma ORM

---

## 🛠 Tecnologias Utilizadas

### Backend
- **[NestJS](https://nestjs.com/)** - Framework Node.js para aplicações server-side
- **[TypeScript](https://www.typescriptlang.org/)** - Linguagem de programação
- **[Prisma](https://www.prisma.io/)** - ORM moderno para TypeScript e Node.js
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Docker](https://www.docker.com/)** - Containerização do banco de dados

### Documentação e Validação
- **[Swagger/OpenAPI](https://swagger.io/)** - Documentação interativa da API
- **[class-validator](https://github.com/typestack/class-validator)** - Validação de DTOs
- **[class-transformer](https://github.com/typestack/class-transformer)** - Transformação de objetos

### E-mail
- **[Nodemailer](https://nodemailer.com/)** - Envio de e-mails
- **[@nestjs-modules/mailer](https://github.com/nest-modules/mailer)** - Módulo de e-mail para NestJS

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **[Node.js](https://nodejs.org/)** (versão 18 ou superior)
- **[npm](https://www.npmjs.com/)** ou **[yarn](https://yarnpkg.com/)**
- **[Docker](https://www.docker.com/)** e **[Docker Compose](https://docs.docker.com/compose/)**
- **[Git](https://git-scm.com/)**

---

## 🔧 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd backend
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```bash
# Banco de dados
DATABASE_URL="postgresql://user:password@localhost:5432/companydb"

# E-mail (opcional - configure se quiser enviar e-mails)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=seu-email@gmail.com
MAIL_PASS=sua-senha-de-app
```

### 4. Inicie o banco de dados
```bash
docker compose up -d
```

### 5. Execute as migrações do Prisma
```bash
npx prisma migrate deploy
```

---

## 🚀 Executando o Projeto

### Desenvolvimento
```bash
npm run start:dev
```

### Produção
```bash
npm run build
npm run start:prod
```

### Debug
```bash
npm run start:debug
```

O servidor estará rodando em:
- **API**: http://localhost:8080
- **Swagger**: http://localhost:8080/api

---

## 📚 Documentação da API

A documentação completa da API está disponível através do Swagger UI:

**🔗 [Acesse a documentação interativa](http://localhost:8080/api)**

A documentação inclui:
- ✅ Descrição de todos os endpoints
- ✅ Exemplos de requisições e respostas
- ✅ Teste interativo dos endpoints
- ✅ Esquemas dos DTOs
- ✅ Códigos de status HTTP

---

## 🔌 Endpoints Disponíveis

### Companies (`/companies`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/companies` | Criar uma nova empresa |
| `GET` | `/companies` | Listar todas as empresas |
| `GET` | `/companies/:id` | Buscar empresa por ID |
| `PATCH` | `/companies/:id` | Atualizar empresa |
| `DELETE` | `/companies/:id` | Deletar empresa |

### Emails (`/emails`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/emails` | Adicionar destinatário de e-mail |
| `GET` | `/emails` | Listar todos os destinatários |
| `PATCH` | `/emails/:id` | Atualizar destinatário |
| `DELETE` | `/emails/:id` | Deletar destinatário |

### Exemplos de Uso

#### Criar uma empresa
```bash
curl -X POST http://localhost:8080/companies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Empresa Exemplo Ltda",
    "cnpj": "12345678000195",
    "tradeName": "Empresa Exemplo",
    "address": "Rua das Flores, 123 - Centro - São Paulo/SP",
    "favorite": true
  }'
```

#### Listar empresas
```bash
curl http://localhost:8080/companies
```

#### Adicionar destinatário de e-mail
```bash
curl -X POST http://localhost:8080/emails \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com",
    "active": true
  }'
```

---

## 🗄 Estrutura do Banco de Dados

### Tabela: Company
```sql
CREATE TABLE "Company" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "cnpj" VARCHAR UNIQUE NOT NULL,
  "tradeName" VARCHAR NOT NULL,
  "address" VARCHAR NOT NULL,
  "favorite" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);
```

### Tabela: EmailRecipient
```sql
CREATE TABLE "EmailRecipient" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR UNIQUE NOT NULL,
  "active" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);
```

---

## 🔐 Variáveis de Ambiente

| Variável | Descrição | Obrigatória | Padrão |
|----------|-----------|-------------|---------|
| `DATABASE_URL` | URL de conexão com PostgreSQL | ✅ | - |
| `PORT` | Porta do servidor | ❌ | 3000 |
| `MAIL_HOST` | Servidor SMTP | ❌ | - |
| `MAIL_PORT` | Porta do servidor SMTP | ❌ | - |
| `MAIL_USER` | Usuário do e-mail | ❌ | - |
| `MAIL_PASS` | Senha do e-mail | ❌ | - |

---

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev          # Inicia em modo watch
npm run start:debug        # Inicia em modo debug

# Produção
npm run build             # Compila o projeto
npm run start:prod        # Inicia em modo produção

# Testes
npm run test              # Executa testes unitários
npm run test:watch        # Executa testes em modo watch
npm run test:cov          # Executa testes com coverage
npm run test:e2e          # Executa testes end-to-end

# Qualidade de código
npm run lint              # Executa o linter
npm run format            # Formata o código

# Banco de dados
npx prisma migrate dev    # Cria nova migração
npx prisma migrate deploy # Aplica migrações
npx prisma generate       # Gera o cliente Prisma
npx prisma studio         # Abre o Prisma Studio
```

---

## 🧪 Testes

### Executar todos os testes
```bash
npm run test
```

### Executar testes com coverage
```bash
npm run test:cov
```

### Executar testes end-to-end
```bash
npm run test:e2e
```

### Executar testes em modo watch
```bash
npm run test:watch
```

---

## 🚀 Deploy

### Docker
```bash
# Build da imagem
docker build -t company-api .

# Executar container
docker run -p 8080:8080 company-api
```

### Variáveis de ambiente para produção
```bash
DATABASE_URL="postgresql://user:password@host:5432/companydb"
PORT=8080
NODE_ENV=production
```

---

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── company/           # Módulo de empresas
│   │   ├── dto/          # Data Transfer Objects
│   │   ├── *.controller.ts
│   │   ├── *.service.ts
│   │   └── *.module.ts
│   ├── emails/           # Módulo de e-mails
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── *.controller.ts
│   │   ├── *.service.ts
│   │   └── *.module.ts
│   ├── prisma/           # Configuração do Prisma
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   ├── migrations/       # Migrações do banco
│   └── schema.prisma     # Schema do banco
├── test/                 # Testes e2e
├── docker-compose.yml    # Configuração do Docker
└── package.json
```

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Suporte

Para dúvidas ou suporte, entre em contato:

- 📧 E-mail: suporte@exemplo.com
- 💬 Discord: [Servidor da Comunidade](https://discord.gg/nestjs)
- 📖 Documentação: [NestJS Docs](https://docs.nestjs.com/)

---

<p align="center">
  Feito com ❤️ usando <a href="https://nestjs.com/">NestJS</a>
</p>