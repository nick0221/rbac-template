FROM php:8.4-fpm

# System dependencies
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

# PHP extensions
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

# Working directory
WORKDIR /var/www/html

# Copy composer files and install composer
COPY composer.json composer.lock ./
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN php -d memory_limit=-1 /usr/local/bin/composer install --no-dev --optimize-autoloader

# Copy project
COPY . .

# Node dependencies + build
RUN npm install
RUN npm run build

# SQLite file permissions
RUN touch database/database.sqlite
RUN chmod -R 777 database

# Expose port
EXPOSE 8000

# Start Laravel server
CMD php artisan serve --host=0.0.0.0 --port=8000
