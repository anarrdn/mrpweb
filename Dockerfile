# Use the official Node.js image
FROM node:18 AS base

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN yarn build

# Only copy the necessary files for production
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /app

# Copy over the node_modules and built Next.js app from the previous stage
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
