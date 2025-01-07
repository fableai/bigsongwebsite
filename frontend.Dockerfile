FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src ./src
COPY public ./public
COPY next.config.mjs ./
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./
COPY eslint.config.mjs ./
COPY next-env.d.ts ./
ENV NEXT_PUBLIC_OSS_REGION=oss-cn-hangzhou \
    NEXT_PUBLIC_OSS_BUCKET=bigsong-website \
    NEXT_PUBLIC_OSS_ENDPOINT=https://bigsong-website.oss-cn-hangzhou.aliyuncs.com
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
ENV NODE_ENV=production \
    NEXT_PUBLIC_OSS_REGION=oss-cn-hangzhou \
    NEXT_PUBLIC_OSS_BUCKET=bigsong-website \
    NEXT_PUBLIC_OSS_ENDPOINT=https://bigsong-website.oss-cn-hangzhou.aliyuncs.com
EXPOSE 3000
CMD ["npm", "start"]
