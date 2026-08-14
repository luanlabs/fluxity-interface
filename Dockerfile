# syntax=docker/dockerfile:1

# =============================================================================
# Fluxity Interface — production image
#
# Multi-stage build that produces a small, non-root runtime image from Next.js
# standalone output (configured via `output: 'standalone'` in next.config.js).
#
# NOTE: NEXT_PUBLIC_* variables are inlined at BUILD time. To bake custom
# configuration into the image, provide them at build time (e.g. an `.env`
# file in the build context, or `--build-arg`/build secrets). Otherwise the
# production defaults in src/constants are used.
# =============================================================================

# --- Stage 1: install dependencies (cached unless lockfile changes) ----------
FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- Stage 2: build the application ------------------------------------------
FROM node:22-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- Stage 3: minimal runtime image ------------------------------------------
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3001 \
    HOSTNAME=0.0.0.0

# Run as the unprivileged, pre-existing `node` user instead of root.
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3001/').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
