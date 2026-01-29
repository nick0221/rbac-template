# ---------------------------
# Base image: PHP + Composer
# ---------------------------
FROM php:8.2-fpm

# ---------------------------
# Install system dependencies
# ---------------------------
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    npm \
    nodejs \
    sqlite3 \
    libsqlite3-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ---------------------------
# Install PHP extensions
# ---------------------------
RUN docker-php-ext-install pdo pdo_mysql pdo_sqlite mbstring exif pcntl bcmath gd

# ---------------------------
# Set working directory
# ---------------------------
WORKDIR /var/www/html

# ---------------------------
# Copy composer files and install dependencies
# ---------------------------
COPY composer.json composer.lock ./
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# ---------------------------
# Copy the rest of the project
# ---------------------------
COPY . .

# ---------------------------
# Install Node dependencies and build React/Inertia assets
# ---------------------------
RUN npm install
RUN npm run build

# ---------------------------
# Make sure SQLite database file exists
# ---------------------------
RUN touch database/database.sqlite
RUN chmod -R 777 database

# ---------------------------
# Expose port
# ---------------------------
EXPOSE 8000

# ---------------------------
# Start Laravel server
# ---------------------------
CMD php artisan serve --host=0.0.0.0 --port=8000
