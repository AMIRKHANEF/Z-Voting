# Z-Voting Smart Contracts

Solidity 0.8.19 smart contracts for Z-Voting.

## Contracts

### ZVoting.sol
Main voting contract with:
- State management (active, ended, cancelled)
- Voter registration via merkle root
- Vote submission with proof verification
- Result queries
- Event emissions

### ZVotingFactory.sol
Factory contract for:
- Creating voting instances
- Tracking active votings
- Pause/resume functionality

### Verifier.sol
Groth16 proof verification:
- Verify zero-knowledge proofs
- Validate proof structure

## Setup

```bash
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

### Mainnet
```bash
npm run deploy:mainnet
```

## Project Structure

```
contracts/
├── ZVoting.sol
├── ZVotingFactory.sol
├── Verifier.sol
└── interfaces/
    └── IZVoting.sol

scripts/
└── deploy.ts

test/
├── ZVoting.test.ts
├── ZVotingFactory.test.ts
└── Verifier.test.ts
```

## License

GPL-3.0
