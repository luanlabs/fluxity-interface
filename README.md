# Fluxity Interface

Fluxity is a token streaming solution designed to enhance the efficiency of financial transactions within the Stellar blockchain ecosystem. By enabling real-time transfer of cryptographic tokens, Fluxity introduces a new paradigm in financial interactions, fostering dynamic ecosystems.

**Token Streaming as a Solution**

Token streaming provides an innovative solution, offering real-time, continuous transactions that can be adapted to various use cases, ensuring attractiveness, flexibility, and trust in financial engagements. It allows for an ongoing flow of tokens, similar to streaming media content, with predefined start and stop times and transfer rates, providing both parties with predictable, fluid transactions. Token streams can be cancellable and offer maximum flexibility to payment configurations at slashed transaction costs.

**Key Features**

- **Flexible Token Streaming**: Choose between linear or exponential token streaming to suit your needs.
- **Cliff Streams**: Delay token distribution to incentivize commitment and discourage speculative behavior.
- **Vesting Streams**: Create streams where tokens unlock daily, weekly, monthly, or yearly based on preferred rates set during creation.

For more information, visit [https://fluxity.finance](https://fluxity.finance/). To access the app, go to [https://app.fluxity.finance](https://app.fluxity.finance/). Join our [Discord community](https://discord.com/invite/JnT7KPEuQs) and read the [docs](https://docs.fluxity.finance).

---

## Tech stack

| Area       | Technology                                                                                   |
| ---------- | -------------------------------------------------------------------------------------------- |
| Framework  | [Next.js 15](https://nextjs.org/) (App Router)                                               |
| UI         | React 18, Tailwind CSS 3, styled-components 6                                                |
| State      | Redux Toolkit 2 + React-Redux 9                                                              |
| Forms      | react-hook-form 7                                                                            |
| Blockchain | [@stellar/stellar-sdk](https://stellar.github.io/js-stellar-sdk/) 13 (Horizon + Soroban RPC) |
| Wallet     | [@bluxcc/react](https://www.npmjs.com/package/@bluxcc/react)                                 |
| Language   | TypeScript 5 (strict)                                                                        |
| Tooling    | ESLint 9 (flat config), Prettier 3                                                           |

## Prerequisites

- **Node.js ≥ 20.18** (Node **22 LTS** recommended — used by the Docker image and CI)
- **npm** (the repo ships a `package-lock.json`; use `npm ci` for reproducible installs)

## Getting started

```bash
# 1. Install dependencies
npm ci

# 2. Create a local environment file
cp .env.example .env

# 3. Start the dev server (http://localhost:3000)
npm run dev
```

## Available scripts

| Script                 | Description                               |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Start the Next.js dev server on port 3000 |
| `npm run build`        | Production build (type-checks and lints)  |
| `npm run start`        | Serve the production build on port 3001   |
| `npm run lint`         | Run ESLint                                |
| `npm run lint:fix`     | Run ESLint with autofix                   |
| `npm run typecheck`    | Run the TypeScript compiler (no emit)     |
| `npm run format`       | Format the codebase with Prettier         |
| `npm run format:check` | Check formatting without writing          |

> The production `build` enforces both TypeScript and ESLint — a type or lint error fails the build.

## Environment variables

All variables are prefixed with `NEXT_PUBLIC_` and are **inlined into the client bundle at build time** — they are public, so never store secrets here. See [`.env.example`](./.env.example) for the full template.

| Variable                             | Required | Description                                     |
| ------------------------------------ | :------: | ----------------------------------------------- |
| `NEXT_PUBLIC_LANDING`                |    –     | Marketing site URL                              |
| `NEXT_PUBLIC_DOCUMENTATION`          |    –     | Documentation site URL                          |
| `NEXT_PUBLIC_COMMUNITY`              |    –     | Discord invite URL                              |
| `NEXT_PUBLIC_FLUXITY_API`            |   yes    | Fluxity backend API base URL                    |
| `NEXT_PUBLIC_FRIENDBOT`              |   yes    | Stellar Friendbot URL (testnet account funding) |
| `NEXT_PUBLIC_WHITEPAPER`             |    –     | Whitepaper URL                                  |
| `NEXT_PUBLIC_MAINNET_CONTRACT`       |  yes\*   | Mainnet Fluxity Soroban contract ID (`C…`)      |
| `NEXT_PUBLIC_TESTNET_CONTRACT`       |   yes    | Testnet Fluxity Soroban contract ID (`C…`)      |
| `NEXT_PUBLIC_MAINNET_HORIZONURL`     |  yes\*   | Mainnet Horizon endpoint                        |
| `NEXT_PUBLIC_TESTNET_HORIZONURL`     |   yes    | Testnet Horizon endpoint                        |
| `NEXT_PUBLIC_MAINNET_SOROBAN_RPCURL` |  yes\*   | Mainnet Soroban RPC endpoint                    |
| `NEXT_PUBLIC_TESTNET_SOROBAN_RPCURL` |   yes    | Testnet Soroban RPC endpoint                    |

\* Required only for mainnet usage. Missing/invalid values are reported as console warnings at startup (see `src/constants/env.ts`); the app still renders but the affected network will not function.

## Production build & run

```bash
npm ci
npm run build      # outputs an optimised, standalone build to .next/
npm run start      # serves on http://localhost:3001
```

## Docker

The image is built from Next.js [standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output) as a multi-stage, non-root build.

```bash
# Build and run with Docker
docker build -t fluxity-interface:latest .
docker run --rm -p 3001:3001 fluxity-interface:latest

# …or with Docker Compose
docker compose up -d --build
```

The app is then available on [http://localhost:3001](http://localhost:3001). A container `HEALTHCHECK` probes the home page every 30s.

> Because `NEXT_PUBLIC_*` values are inlined at build time, custom configuration must be present **when the image is built** (e.g. an `.env` file in the build context). Setting them only at container runtime has no effect.

## Continuous integration

[`.github/workflows/main.yml`](./.github/workflows/main.yml) runs a **Verify** job (`npm ci` → `typecheck` → `lint` → `build`) on every push and pull request to `master`. On pushes, self-hosted runners then build the Docker image, deploy it via `docker compose`, and prune unused images.

## Project structure

```
src/
├── app/          # Next.js App Router routes & layouts
├── assets/       # Inline SVG/icon React components
├── components/   # Reusable presentational components (C-prefixed)
├── constants/    # Static config, env access, network definitions
├── containers/   # Feature/page-level composite components
├── features/     # Data + Soroban contract interactions
├── hooks/        # Custom React hooks
├── reducers/     # Redux Toolkit slices
├── styles/       # Global styles, theme, styled-components registry
└── utils/        # Pure helpers (formatting, BigNumber, Soroban helpers)
```
