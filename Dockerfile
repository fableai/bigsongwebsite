# Frontend Build Stage
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NEXT_PUBLIC_OSS_REGION=oss-cn-hangzhou \
    NEXT_PUBLIC_OSS_BUCKET=bigsong-website \
    NEXT_PUBLIC_OSS_ENDPOINT=https://bigsong-website.oss-cn-hangzhou.aliyuncs.com
RUN npm run build

# Frontend Production Stage
FROM node:20-alpine AS frontend
WORKDIR /app
COPY --from=frontend-builder /app/package*.json ./
COPY --from=frontend-builder /app/.next ./.next
COPY --from=frontend-builder /app/public ./public
COPY --from=frontend-builder /app/node_modules ./node_modules
ENV NODE_ENV=production \
    NEXT_PUBLIC_OSS_REGION=oss-cn-hangzhou \
    NEXT_PUBLIC_OSS_BUCKET=bigsong-website \
    NEXT_PUBLIC_OSS_ENDPOINT=https://bigsong-website.oss-cn-hangzhou.aliyuncs.com
EXPOSE 3000
CMD ["npm", "start"]

# Backend Build Stage
FROM python:3.12-slim AS backend-builder
WORKDIR /app
COPY bigsong_backend/ ./
RUN pip install poetry && \
    poetry config virtualenvs.create false && \
    poetry install --no-root

# Backend Production Stage
FROM python:3.12-slim AS backend
WORKDIR /app
COPY --from=backend-builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY bigsong_backend/app ./app
COPY bigsong_backend/alembic.ini ./
COPY bigsong_backend/alembic ./alembic
ENV PYTHONPATH=/app
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
