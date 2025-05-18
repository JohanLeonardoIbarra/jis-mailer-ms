# Etapa 1: Construcción
FROM node:20-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package.json yarn.lock ./

# Instalar dependencias
RUN yarn install --frozen-lockfile

# Copiar el resto del proyecto
COPY . .

# Construir la aplicación
RUN yarn build

# Etapa 2: Producción
FROM node:20-alpine AS production

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias necesarias solo para producción
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copiar archivos compilados desde la etapa de construcción
COPY --from=builder /app/dist ./dist

# Copiar archivos de configuración necesarios
COPY --from=builder /app/node_modules ./node_modules

# Establecer variable de entorno
ENV NODE_ENV=production

# Comando por defecto
CMD ["node", "dist/main"]
