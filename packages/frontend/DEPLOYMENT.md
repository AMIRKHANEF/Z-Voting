# Frontend Deployment Guide

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

```bash
cd packages/frontend
npm install
```

## Development

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## Building

```bash
npm run build
```

Output in `dist/`

## Preview Production Build

```bash
npm run preview
```

## Docker

```bash
docker build -f packages/frontend/Dockerfile -t z-voting-frontend .
docker run -p 3000:3000 z-voting-frontend
```

## Deployment Options

### Vercel

```bash
npm i -g vercel
vercel
```

Configure:
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment: `VITE_API_URL=https://your-backend.com`

### Netlify

```bash
npm i -g netlify-cli
netlify deploy
```

### Traditional Server

```bash
npm run build
# Copy dist/ to your web server
```

## Environment Variables

Create `.env.production.local`:

```bash
VITE_API_URL=https://your-backend-api.com
VITE_RPC_URL=https://your-rpc-provider.com
VITE_FACTORY_ADDRESS=0x...
```

## Configuration

Edit `vite.config.ts` to update API proxy:

```typescript
proxy: {
  '/api': {
    target: 'https://your-backend-api.com',
    changeOrigin: true,
  },
}
```

## Performance

- ~50KB gzipped (main bundle)
- ~200ms initial load
- Lazy loading for routes

## Troubleshooting

### API calls failing

Check:
1. Backend is running
2. CORS is properly configured
3. API URLs match in vite.config.ts

### Assets not loading

Ensure build output is served from correct path.

### Wallet not connecting

Verify Web3 provider (MetaMask) is installed and connected to correct network.
