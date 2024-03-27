# Use the official Node.js 16 image as a parent image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the monorepo files to the container
COPY . .

RUN ls .

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV PATH="/root/.bun/bin:${PATH}"

# Install workspace dependencies
RUN yarn install

# Expose the port the app runs on
EXPOSE 3000

# Command to run the server
CMD ["yarn", "start"]