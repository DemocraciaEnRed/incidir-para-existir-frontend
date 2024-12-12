# ARG NODE_VERSION=20.14.0
ARG NODE_VERSION=22.11.0

# Create build stage
FROM node:${NODE_VERSION}-slim AS build


RUN npm install -g pnpm

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files to the working directory

COPY ./package.json /app/
COPY ./package-lock.json /app/

## Install dependencies
RUN pnpm import
RUN pnpm install --shamefully-hoist


# Copy the rest of the application files to the working directory
COPY . ./


# Build the application
RUN pnpm run build


# Create a new stage for the production image
FROM node:${NODE_VERSION}-slim


# Set the working directory inside the container
WORKDIR /app


# Copy the output from the build stage to the working directory
COPY --from=build /app/.output ./


# Define environment variables
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=4000 
ENV NODE_ENV=production


# Expose the port the application will run on
EXPOSE 4000

# Start the application
CMD ["node","/app/server/index.mjs"]