# # Etapa 1: Construcción de la aplicación Angular
# FROM node:20.11.1-alpine AS builder

# # Instalar dependencias necesarias para compilar paquetes nativos
# RUN apk add --no-cache python3 make g++ bash

# # Configuración del directorio de trabajo
# WORKDIR /app

# # Copiar package.json y package-lock.json
# COPY package*.json ./

# # Eliminar node_modules y package-lock.json para evitar conflictos
# RUN rm -rf node_modules package-lock.json && npm cache clean --force

# # Instalar dependencias sin dependencias opcionales
# RUN npm install --omit=optional --legacy-peer-deps

# # Instalar rollup manualmente para evitar problemas
# RUN npm install rollup @rollup/rollup-linux-arm64-musl --legacy-peer-deps

# # Copiar el resto del código fuente
# COPY . .

# # Construir la aplicación Angular
# RUN npm run build

# # Etapa 2: Servir la aplicación con Nginx
# FROM nginx:alpine AS runner

# # Copiar la aplicación compilada al servidor web
# COPY --from=builder /app/dist /usr/share/nginx/html


# # Exponer el puerto 80
# EXPOSE 80

# # Configurar Nginx
# CMD ["nginx", "-g", "daemon off;"]
# Etapa 1: Construcción de la aplicación Angular
# Etapa 1: Construcción de la aplicación Angular
FROM node:20.11.1-alpine AS builder

WORKDIR /app

# Instalar dependencias necesarias para compilar paquetes nativos
RUN apk add --no-cache python3 make g++ bash

# Copiar package.json y package-lock.json
COPY package*.json ./

# Limpiar dependencias previas
RUN rm -rf node_modules package-lock.json && npm cache clean --force

# Instalar dependencias sin opcionales
RUN npm install --omit=optional --legacy-peer-deps

# Asegurar instalación de Rollup
RUN npm install --save-dev rollup

# Copiar el código fuente
COPY . .

# Construir la aplicación Angular
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine AS runner

# Copiar la aplicación compilada
COPY --from=builder /app/dist /usr/share/nginx/html

# Configurar Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 4200
EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
