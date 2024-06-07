# Define a imagem base usando a versão LTS do Node.js sobre Alpine Linux
FROM registry.docker.com/library/node:21.6.2-alpine

# Atualiza o instalador de pacotes do Alpine e instala as dependências necessárias
RUN apk add --no-cache \
  build-base \
  git \
  vips-dev \
  curl

# Define o diretório de trabalho da aplicação
WORKDIR /seller-app

# Copia todos os arquivos da aplicação para a imagem
COPY . .

# Copia tanto 'package.json' quanto 'package-lock.json' para o diretório de trabalho
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Expõe a porta 5173 para ser acessível externamente
EXPOSE 5173

# Comando para executar o servidor HTTP, servindo os arquivos construídos
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
