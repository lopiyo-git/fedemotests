# Use official Playwright image with browsers preinstalled
FROM mcr.microsoft.com/playwright:v1.59.1-jammy

# Set working directory
WORKDIR /app

# Copy dependency files first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN yarn install --frozen-lockfile --non-interactive

# Copy project files
COPY . .

# Give pwuser ownership of the app directory
RUN mkdir -p /app/test-results /app/playwright-report && \
    chown -R pwuser:pwuser /app

# Use non-root user provided by Playwright image
USER pwuser

# Default command to run Playwright tests
CMD ["npx", "playwright", "test"]