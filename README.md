
---

# Locavia Backend

Este projeto é um backend desenvolvido para a empresa Info Sistemas, como parte de uma avaliação técnica para uma oportunidade de emprego. Ele oferece uma API CRUD para gerenciar o cadastro, edição, exclusão e listagem de veículos.

## Autor
- **Júlio César Vitor**

## Tecnologias Utilizadas
- **Node.js**
- **Prisma ORM**
- **Mocha** e **Chai** para testes


## Pré-requisitos
- **Node.js** e **npm** instalados

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/juliov1tor/locavia-backend
   cd locavia-backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o banco de dados no arquivo `.env` (para uso com Prisma e PostgreSQL, se necessário):

   ```plaintext
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nomedobanco"
   ```

4. Execute as migrações do Prisma:

   ```bash
   npx prisma migrate deploy
   ```

## Scripts

- **Iniciar o servidor:** `npm start`
- **Rodar os testes:** `npm test`



## Testes

Os testes são realizados usando **Mocha**, **Chai** e **Supertest**. Para rodar os testes, use o comando:

```bash
npm test
```
