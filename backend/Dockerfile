FROM php:8.2-fpm

# Defina o nome de usuário e UID
ARG user=caio
ARG uid=1000

# Instale dependências do sistema
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Limpe o cache
RUN rm -rf /var/cache/apk/*

# Instale o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Crie um usuário do sistema para rodar os comandos do Composer e Artisan
RUN addgroup -g $uid -S $user && adduser -u $uid -S $user -G $user

# Crie um diretório para o cache do Composer
RUN mkdir -p /home/$user/.composer && chown -R $user:$user /home/$user

# Instale o Redis
RUN pecl install redis && docker-php-ext-enable redis

# Defina o diretório de trabalho
WORKDIR /var/www

# Copie as configurações personalizadas do PHP
COPY docker/php/custom.ini /usr/local/etc/php/conf.d/custom.ini

# Ajuste as permissões dos diretórios storage e bootstrap/cache
RUN chown -R $user:www-data /var/www/storage /var/www/bootstrap/cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Mude para o usuário definido
USER $user
