# ---------------------------
# Base image: PHP 8.4 + FPM
# ---------------------------
FROM php:8.4-fpm

# ---------------------------
# Install system dependencies
# ---------------------------
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libsqlite3-dev \
    sqlite3 \
    g++ \
    make \
    npm \
    nodejs \
    libzip-dev \
    libicu-dev \
    zlib1g-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ---------------------------
# Install PHP extensions
# ---------------------------
RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    pdo_sqlite \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    intl \
    zip

# ---------------------------
# Set working directory
# ---------------------------
WORKDIR /var/www/html

# ---------------------------
# Cache Composer dependencies
# ---------------------------
COPY composer.json composer.lock ./
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN php -d memory_limit=-1 /usr/local/bin/composer install --no-dev --optimize-autoloader --no-scripts

# ---------------------------
# Copy the rest of the project
# ---------------------------
COPY . .

# ---------------------------
# Run package discovery manually
# ---------------------------
RUN php artisan package:discover --ansi

# ---------------------------
# Cache Node dependencies & build React/Inertia assets
# ---------------------------
RUN npm ci
RUN npm run build

# ---------------------------
# Ensure SQLite file exists and fix permissions
# ---------------------------
RUN mkdir -p database storage bootstrap/cache
RUN touch database/database.sqlite || true
RUN chmod -R 777 database storage bootstrap/cache

# ---------------------------
# Laravel cache & optimization (production)
# ---------------------------
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache
RUN php artisan event:cache || echo "No events to cache"

# ---------------------------
# Expose Laravel port
# ---------------------------
EXPOSE 8000

# ---------------------------
# Start Laravel server
# Ensure SQLite exists & permissions are fixed on container start
# Optionally run migrations so app works immediately
# ---------------------------
# CMD mkdir -p database storage bootstrap/cache && \
#     touch database/database.sqlite && \
#     chmod -R 777 database storage bootstrap/cache && \
#     php artisan migrate --force --seed && \
#     php artisan serve --host=0.0.0.0 --port=8000

CMD sh -c "\
    if [ ! -f .env ]; then \
        echo '.env not found. Creating from .env.example'; \
        cp .env.example .env; \
    fi && \
    mkdir -p database storage bootstrap/cache && \
    touch database/database.sqlite && \
    chmod -R 777 database storage bootstrap/cache && \
    php artisan migrate --seed --force && \
    php artisan config:clear && \
    php artisan route:clear && \
    php artisan view:clear && \
    # Run scheduler in background
    (while true; do php artisan schedule:run; sleep 60; done) & \
    # Run Laravel web server
    php artisan serve --host=0.0.0.0 --port=8000 \
"
