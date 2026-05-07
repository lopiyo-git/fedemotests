# Use official Playwright image with browsers preinstalled
FROM mcr.microsoft.com/playwright:v1.59.1-jammy

# Patch OS-level vulnerabilities (Fixes many Trivy failures)
USER root
RUN apt-get update && apt-get upgrade -y && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy dependency files first for better caching
COPY package.json package-lock.json ./

# Upgrade npm to latest to patch bundled vulnerable packages
RUN npm install -g npm@latest

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Give pwuser ownership of the app directory
RUN mkdir -p /app/test-results /app/playwright-report && \
    chown -R pwuser:pwuser /app

# Use non-root user provided by Playwright image
USER pwuser

# Default command to run Playwright tests
CMD ["npx", "playwright", "test"]