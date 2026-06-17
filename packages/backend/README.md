# Z-Voting Backend

Proof generation service and API gateway for Z-Voting.

## Features

- ✅ Groth16 proof generation
- ✅ Merkle tree operations
- ✅ Circuit artifact caching
- ✅ Input validation (Zod)
- ✅ Proper error handling
- ✅ Structured logging (Pino)
- ✅ CORS support
- ✅ TypeScript with full type safety

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Server runs on `http://localhost:3001`

## API Endpoints

### POST /api/proof/generate
Generate a voting proof

```json
{
  "privateVotingID": "mnemonic string",
  "voterIndex": 0,
  "merkleRoot": "0x123...",
  "voteChoice": 1
}
```

### POST /api/merkle/create
Create merkle tree from voter list

```json
{
  "voters": ["voter1", "voter2", ...]
}
```

### GET /api/health
Health check

## Environment Variables

Create `.env`:

```bash
PORT=3001
NODE_ENV=development
LOG_LEVEL=info
```

## Testing

```bash
npm run test
```

## Building

```bash
npm run build
```

## License

GPL-3.0
