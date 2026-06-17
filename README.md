# Z-Voting v2 - Zero-Knowledge Anonymous Voting Framework

> A completely anonymous and private voting framework built with modern zero-knowledge proof technology.

## 🎯 Overview

Z-Voting is a decentralized, privacy-preserving voting system that leverages zero-knowledge proofs and blockchain technology to enable:

- **Complete Anonymity** - Voters' identities are never revealed
- **Gasless Voting** - Proofs are generated off-chain
- **Transparent Results** - Immutable voting records on blockchain
- **Sybil-Resistant** - Merkle tree-based voter verification
- **No Double Voting** - Nullifier mechanism prevents duplicate votes

## 🏗️ Architecture

### Smart Contracts (Solidity 0.8.19)
- `ZVoting.sol` - Main voting contract with state management
- `ZVotingFactory.sol` - Factory for creating voting instances
- Groth16 verifier for zero-knowledge proof validation

### Backend (Node.js + TypeScript)
- Express/Fastify API for proof generation
- Circuit proof compilation and caching
- Merkle tree operations
- Proper validation and error handling

### Frontend (React 18 + TypeScript)
- Modern responsive UI with Shadcn/UI
- Real-time voting updates via Web3 events
- Admin dashboard for voting management
- Voter interface for secure voting

### Zero-Knowledge Circuits (Circom)
- Voter eligibility proof
- Merkle tree membership verification
- Nullifier commitment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask or compatible Web3 wallet

### Installation

```bash
# Clone and install dependencies
git clone https://github.com/AMIRKHANEF/Z-Voting.git
cd Z-Voting
npm install

# Install workspace dependencies
cd packages/backend && npm install
cd ../frontend && npm install
cd ../contracts && npm install
```

### Development

```bash
# Start development server (all packages)
npm run dev

# Backend only
npm run dev:backend

# Frontend only
npm run dev:frontend

# Contracts (hardhat)
npm run dev:contracts
```

### Deployment

```bash
# Deploy contracts to testnet
npm run deploy:testnet

# Build for production
npm run build:all

# Deploy to production
npm run deploy:prod
```

## 📚 Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md)
- [Smart Contract Docs](./packages/contracts/README.md)
- [Backend API Reference](./packages/backend/README.md)
- [Frontend Setup](./packages/frontend/README.md)
- [Circuit Documentation](./packages/circuits/README.md)

## 🔐 Security

- All proofs are verified on-chain
- Nullifier mechanism prevents double voting
- Voter privacy maintained through zero-knowledge proofs
- Contract upgradeable through proxy pattern
- Full audit recommended before mainnet deployment

## 🧪 Testing

```bash
# Run all tests
npm run test

# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# Contract tests
npm run test:contracts
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md).

## 📝 License

GPL-3.0 License - See [LICENSE](./LICENSE) file

## 👨‍💻 Author

[Amir Ekbatani Fard](https://github.com/AMIRKHANEF)

## 🙏 Acknowledgments

- Circom for zero-knowledge circuit language
- SnarkJS for proof generation
- Ethereum community for ZK research
