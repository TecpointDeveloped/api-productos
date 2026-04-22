# 🚀 Guía de Deployment

## En tu máquina local

### 1. Compilar/Preparar
```bash
npm install
```

### 2. Testear en producción local
```bash
NODE_ENV=production npm start
```

---

## En el servidor (Digital Ocean)

### 1. Conectarse por SSH
```bash
ssh root@143.198.142.90
```

### 2. Clonar el repositorio
```bash
cd /opt
git clone <tu-repositorio> api-productos
cd api-productos
```

### 3. Instalar dependencias
```bash
npm install --production
```

### 4. Configurar variables de entorno
```bash
nano .env.production
```

Agregar:
```
DB_HOST=143.198.142.90
DB_PORT=5432
DB_USER=digiusreli
DB_PASSWORD=elizer!22
DB_NAME=dbeliezer
NODE_ENV=production
PORT=3000
```

### 5. Instalar PM2 globalmente
```bash
npm install -g pm2
```

### 6. Iniciar con PM2
```bash
pm2 start ecosystem.config.js --env production
```

### 7. Hacer que PM2 se inicie con el sistema
```bash
pm2 startup
pm2 save
```

### 8. Monitorear
```bash
pm2 logs api-productos
pm2 monit
```

---

## Configurar Nginx (Reverse Proxy)

### 1. Instalar Nginx
```bash
sudo yum install nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2. Configurar Nginx
```bash
sudo nano /etc/nginx/conf.d/api.conf
```

Agregar:
```nginx
server {
    listen 80;
    server_name 143.198.142.90;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Verificar y reiniciar
```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## Acceso a la API

- **Local**: `http://localhost:3000`
- **Servidor**: `http://143.198.142.90`

---

## Comandos útiles de PM2

```bash
pm2 list              # Ver procesos
pm2 logs              # Ver logs
pm2 restart all       # Reiniciar
pm2 stop all          # Parar
pm2 delete api-productos  # Eliminar
```
