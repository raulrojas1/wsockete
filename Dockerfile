# Usa la última versión de Node.js como base
#FROM node:latest

# Crea un directorio para el código de la aplicación
#WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
#COPY package*.json ./

# Instala las dependencias de la aplicación
#RUN npm install

# Copia el resto de los archivos de la aplicación
#COPY . .

# Expone el puerto en el que se ejecuta la aplicación
#EXPOSE 4000

# Inicia la aplicación al iniciar el contenedor
#CMD ["node", "index.js"]

# Build stage
FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Production stage
# FROM node:14-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install --production
# COPY --from=build /app/dist ./dist
EXPOSE 4001
CMD ["node", "index.js"]