# Use a imagem Alpine do Node.js 18
FROM node:18-alpine

WORKDIR /app

# Copie apenas os arquivos de definição de pacote
COPY package*.json ./

# Instale dependências
RUN npm install --no-cache

# Copie o restante dos arquivos
COPY . .

# Exponha a porta que o Vite utiliza no modo de desenvolvimento
EXPOSE 5173

# Comando para iniciar o ambiente de desenvolvimento
CMD ["npm", "run", "dev"]
