# Stage 1: Build Backend
FROM node:18 as backend-builder

WORKDIR /usr/src/app

COPY server/package*.json ./
RUN npm install
COPY server/ .

# Stage 2: Build Frontend
FROM node:18 as frontend-builder

WORKDIR /usr/src/app

COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Stage 3: Combine Backend and Frontend
FROM node:18

WORKDIR /usr/src/app

# Copy built backend and frontend from previous stages
COPY --from=backend-builder /usr/src/app /usr/src/app/backend
COPY --from=frontend-builder /usr/src/app/build /usr/src/app/backend/client/build

# Install backend dependencies
WORKDIR /usr/src/app/backend
RUN npm install --only=production

# Expose ports
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
