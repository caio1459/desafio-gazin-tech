# Desafio FullStack Gazin Tech

## 📗 Sobre o Projeto
O Desafio FullStack Gazin Tech é uma aplicação desenvolvida para gerenciar cadastros de desenvolvedores associados a diferentes níveis. A aplicação consiste em um backend que fornece uma API REST e um frontend que é uma SPA (Single Page Application), sendo ambos integrados.

## 🔨 Ferramentas e Bibliotecas
O projeto utiliza diversas ferramentas e bibliotecas essenciais para seu funcionamento:
- [Laravel](https://laravel.com/): Framework PHP moderno para construção do backend.
- [MySQL](https://www.mysql.com/): Banco de dados relacional usado para armazenar os dados dos desenvolvedores.
- [React.js](https://react.dev): Biblioteca JavaScript para construção do frontend interativo.
- [Vite](https://vitejs.dev/): Build tool rápido e moderno para o frontend React.
- [Docker](https://www.docker.com/): Plataforma de containers que facilita a execução e o gerenciamento do ambiente de desenvolvimento.
- [Swagger](https://swagger.io/): Ferramenta para documentação e consumo de APIs REST, usado para documentar a API do projeto.

## 🦾 Iniciando o Projeto
Para executar o projeto em seu ambiente local, siga os passos abaixo:

1. **Instalação do Docker:**
   Certifique-se de ter o Docker instalado em sua máquina. Você pode baixá-lo e instalá-lo a partir do [site oficial do Docker](https://www.docker.com/).

2. **Configuração do Banco de Dados:**
   Utilize um editor de banco de dados de sua preferência para criar um novo banco de dados chamado `tech_dev`.

3. **Clone do Repositório:**
   Clone o repositório do projeto executando o seguinte comando no terminal:
    ```bash
    git clone https://github.com/caio1459/desafio-gazin-tech
    ```

4. **Acesso ao Diretório do Projeto:**
   Navegue para o diretório do projeto clonado:
    ```bash
    cd desafio-gazin-tech
    ```

5. **Configuração das Variáveis de Ambiente:**
   Edite o arquivo `.env` no diretório raiz do projeto e ajuste as seguintes variáveis para se conectar ao banco de dados MySQL:
    ```dotenv
    DB_CONNECTION=mysql
    DB_HOST=mysql_db
    DB_PORT=3306
    DB_DATABASE=tech_dev
    DB_USERNAME=root
    DB_PASSWORD=102030
    ```

6. **Execução dos Containers:**
   Inicie os containers do banco de dados, backend e frontend executando o seguinte comando:
    ```bash
    docker-compose up -d
    ```

Agora, o projeto estará disponível localmente para desenvolvimento e teste.

Para mais detalhes sobre as rotas e funcionalidades da API, consulte a [documentação Swagger](https://app.swaggerhub.com/apis-docs/CAIOGRECHIC50_1/tech-dev_api/1.0#/).
