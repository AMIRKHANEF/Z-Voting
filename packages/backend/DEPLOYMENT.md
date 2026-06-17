# Backend Deployment Guide

## Prerequisites

- Node.js 18+
- npm or yarn

## Environment Variables

Create `.env` in `packages/backend`:

```bash
NODE_ENV=production
PORT=3001
LOG_LEVEL=info
CIRCUITS_PATH=/path/to/circuits/build
```

## Installation

```bash
cd packages/backend
npm install
```

## Building

```bash
npm run build
```

## Running

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm run start
```

## Docker

```bash
docker build -f packages/backend/Dockerfile -t z-voting-backend .
docker run -p 3001:3001 z-voting-backend
```

## API Endpoints

### Health Check

```bash
GET /api/health
```

### Generate Proof

```bash
POST /api/proof/generate
Content-Type: application/json

{
  "privateVotingID": "your-private-id",
  "voterIndex": 0,
  "merkleRoot": "0x...",
  "voteChoice": 1,
  "merkleProof": ["0x...", "0x..."]
}
```

### Create Merkle Tree

```bash
POST /api/merkle/create
Content-Type: application/json

{
  "voters": ["voter1", "voter2", "voter3"]
}
```

### Generate Merkle Proof

```bash
POST /api/merkle/proof
Content-Type: application/json

{
  "voter": "voter1",
  "voters": ["voter1", "voter2", "voter3"]
}
```

## Troubleshooting

### Circuit files not found

Ensure `CIRCUITS_PATH` points to compiled circuits directory with `.wasm` and `.zkey` files.

### Proof generation timeout

Increase Node.js heap size:

```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run start
```

### CORS issues

Frontend connects via `http://localhost:3001/api`. Update CORS in `src/index.ts` if needed.
