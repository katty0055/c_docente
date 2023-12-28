# Usa la imagen de Node.js como base
FROM node:14

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe) al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que se ejecutará la aplicación (puerto 5173)
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
