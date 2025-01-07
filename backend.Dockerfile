FROM python:3.12-slim AS builder
WORKDIR /app
COPY bigsong_backend/pyproject.toml bigsong_backend/poetry.lock ./
RUN pip install poetry && \
    poetry config virtualenvs.create false && \
    poetry install --no-root

FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin/uvicorn /usr/local/bin/
COPY --from=builder /usr/local/bin/alembic /usr/local/bin/
COPY bigsong_backend/app ./app
COPY bigsong_backend/alembic.ini ./
COPY bigsong_backend/alembic ./alembic
ENV PYTHONPATH=/app

# Install required system packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    netcat-traditional \
    curl \
    postgresql-client && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 8000

COPY bigsong_backend/docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
