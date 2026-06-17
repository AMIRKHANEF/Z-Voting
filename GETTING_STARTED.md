# Getting Started with Z-Voting v2

## Quick Start (5 minutes)

### 1. Clone Repository

```bash
git clone https://github.com/AMIRKHANEF/Z-Voting.git
cd Z-Voting
git checkout redesign/v2-complete-overhaul
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Stack

```bash
# Terminal 1: Backend
cd packages/backend
npm run dev

# Terminal 2: Frontend
cd packages/frontend
npm run dev

# Terminal 3: Smart Contracts (local hardhat)
cd packages/contracts
npx hardhat node
```

Your application is now running:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Smart Contracts: http://localhost:8545

## Project Structure

```
Z-Voting/
├── packages/
│   ├── backend/          # Node.js proof generation service
│   ├── frontend/         # React 18 UI
│   ├── contracts/        # Solidity smart contracts
│   └── circuits/         # Circom ZK circuits
├── docs/                 # Documentation
└── docker-compose.yml    # Docker setup
```

## Development Workflow

### Frontend Development

1. Modify files in `packages/frontend/src/`
2. Hot reload automatically at localhost:3000
3. Run tests: `npm run test`

### Backend Development

1. Modify files in `packages/backend/src/`
2. Server auto-restarts on save
3. API logs printed to console
4. Run tests: `npm run test`

### Smart Contract Development

1. Modify contracts in `packages/contracts/contracts/`
2. Compile: `npm run compile`
3. Test: `npm run test`
4. Deploy locally: `npm run deploy:local`

## Building for Production

```bash
# Build all packages
npm run build:all

# Deploy contracts
cd packages/contracts
npm run deploy:sepolia  # or deploy:mumbai or deploy:mainnet

# Build frontend
cd packages/frontend
npm run build

# Build backend
cd packages/backend
npm run build
```

## Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build individual services
docker build -f packages/backend/Dockerfile -t z-voting-backend .
docker build -f packages/frontend/Dockerfile -t z-voting-frontend .

docker run -p 3001:3001 z-voting-backend
docker run -p 3000:3000 z-voting-frontend
```

## Testing

```bash
# Test all packages
npm run test

# Test specific package
npm run test:backend
npm run test:frontend
npm run test:contracts

# Contract coverage
cd packages/contracts
npm run test:coverage
```

## Key Features

✅ **Complete Anonymity** - Zero-knowledge proofs hide voter identity
✅ **Gasless Voting** - Proof generation happens off-chain
✅ **Transparent Results** - Immutable records on blockchain
✅ **No Double Voting** - Nullifier mechanism prevents duplicates
✅ **Modern Stack** - TypeScript, React 18, Solidity 0.8.19
✅ **Beautiful UI** - Tailwind CSS with smooth animations
✅ **Production Ready** - Error handling, logging, validation

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React 18)                  │
│                  (Admin & Voter Pages)                  │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP/WebSocket
┌────────────────────────▼────────────────────────────────┐
│                Backend (Node.js + TS)                   │
│      (Proof Generation, Merkle Trees, API Gateway)      │
└────┬──────────────────────────────┬─────────────────────┘
     │                              │
     ▼                              ▼
┌───────────────────┐      ┌──────────────────┐
│ Circom Circuits   │      │ Web3 Provider    │
│ (ZK Proofs)       │      │ (Contract Calls) │
└───────────────────┘      └────────┬─────────┘
                                    ▼
                          ┌──────────────────────┐
                          │   Blockchain         │
                          │  (Ethereum/Other)    │
                          └──────────────────────┘
```

## Environment Setup

### MetaMask Configuration

1. Install MetaMask extension
2. Add Sepolia testnet:
   - RPC URL: https://sepolia.infura.io/v3/YOUR_KEY
   - Chain ID: 11155111
   - Currency: SepoliaETH
3. Get testnet ETH from [Sepolia Faucet](https://sepoliafaucet.com)

### Circuit Setup

Circuits are pre-compiled in `packages/circuits/build/`. To recompile:

```bash
cd packages/circuits
npm run build
npm run setup
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port
lsof -i :3000
kill -9 <PID>
```

### Circuit Files Missing

```bash
cd packages/circuits
npm run build
```

### Backend Won't Connect

- Check `CIRCUITS_PATH` in `.env`
- Verify backend is running on port 3001
- Check logs for errors

### MetaMask Connection Issues

- Refresh page
- Clear browser cache
- Ensure correct network selected
- Try incognito mode

## Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## Security Considerations

- **Never commit private keys** - Use environment variables
- **Circuits are trusted setup** - Generated keys are secure
- **Contract audit recommended** - Before mainnet deployment
- **Test thoroughly** - Start with testnet

## Performance

- Proof generation: ~5-10 seconds per vote
- Vote submission: ~30 seconds (blockchain confirmation)
- Frontend load: <500ms
- Backend API: <100ms response time

## Support

- GitHub Issues: [Report bugs](https://github.com/AMIRKHANEF/Z-Voting/issues)
- Discussions: [Ask questions](https://github.com/AMIRKHANEF/Z-Voting/discussions)
- Email: amiref007@gmail.com

## License

GPL-3.0 - See [LICENSE](LICENSE) file

## Acknowledgments

- Circom for ZK circuit language
- SnarkJS for proof generation
- Ethereum community for ZK research
- Contributors and testers
