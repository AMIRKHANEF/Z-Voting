# Smart Contracts Deployment Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Private key with testnet ETH

## Environment Variables

Create `.env` in `packages/contracts`:

```bash
# Network RPCs
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
MUMBAI_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY
MAINNET_RPC_URL=https://eth-mainnet.alchemyapi.io/v2/YOUR_KEY

# Private Key (DO NOT COMMIT)
PRIVATE_KEY=your_private_key_here

# Etherscan API Key (for verification)
ETHERSCAN_API_KEY=your_etherscan_key

# Gas reporting
REPORT_GAS=true
COINMARKETCAP_API_KEY=your_coinmarketcap_key
```

## Installation

```bash
cd packages/contracts
npm install
```

## Compilation

```bash
npm run compile
```

## Testing

```bash
npm run test
```

## Coverage

```bash
npm run test:coverage
```

## Deployment

### Sepolia Testnet

```bash
npm run deploy:sepolia
```

### Mumbai Testnet

```bash
npm run deploy:mumbai
```

### Ethereum Mainnet

```bash
npm run deploy:mainnet
```

## Verification

Contracts are automatically verified after deployment.

To manually verify:

```bash
npm run verify -- --network sepolia FACTORY_ADDRESS
```

## Contract Addresses

Save deployed addresses:

```
Sepolia:
  Factory: 0x...

Mumbai:
  Factory: 0x...

Mainnet:
  Factory: 0x...
```

## Security

### Before Mainnet Deployment

- [ ] Full code audit by security firm
- [ ] Run hardhat coverage (aim for 95%+)
- [ ] Test on testnet thoroughly
- [ ] Review all contracts for common vulnerabilities
- [ ] Set up monitoring and alerts
- [ ] Have incident response plan

### Gas Optimization

Contracts use:
- `pure` and `view` for read-only functions
- Efficient storage packing
- Optimized loops

Gas estimates:
- Vote submission: ~80,000 gas
- Create voting: ~150,000 gas

## Upgrading Contracts

For proxy pattern upgrades:

1. Deploy new implementation
2. Update proxy pointer
3. Test thoroughly on testnet first

See `OpenZeppelin/hardhat-upgrades` documentation.

## Troubleshooting

### Insufficient funds

Ensure account has enough testnet ETH from faucet.

### Network timeout

Try different RPC provider or increase timeout in hardhat.config.json

### Verification fails

Ensure:
- Correct network specified
- Constructor arguments match deployment
- Etherscan API key is valid
