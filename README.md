<h1 align="center"> API de Cadastro e Autenticação de Usuários </h1>

## 💻 Sobre o projeto<p id="-sobre-o-projeto"></p>

O projeto é uma API RESTful que permite você cadastrar, fazer autenticação de usuários e retornar dados do usuário

#### 🧭 Rodando a api

+ Para cadastrar um novo usuário (POST)
+ 
      {
        "nome": "",
        "email": "",
        "senha" : "",
        "telefones": [{"numero": "", "ddd": ""}]
      }

+ Para fazer login de um usuário (POST)
+ 
      {
        "email": "",
        "senha": ""
      }

+ Para fazer pesquisar um usuário (GET)
+ 
      {
        "nome": ""
      }


  ## 🛠 Tecnologias<p id="-tecnologias"></p>

  -   **[Express](https://expressjs.com/pt-br/)**
  -   **[Jwt](https://jwt.io/)**
  -   **[Bcrypt](https://www.npmjs.com/package/bcrypt)**

