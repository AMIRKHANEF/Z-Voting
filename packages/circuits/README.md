# Z-Voting Circuits

Circom zero-knowledge circuits for Z-Voting.

## Circuits

### VotingKeyGenerator.circom
Converts private voting ID to public voting ID

**Inputs**:
- `in`: Private voting ID (as big integer)

**Outputs**:
- `out`: Public voting ID (commitment)

### VoterEligibility.circom
Proves voter eligibility and prevents double voting

**Inputs**:
- `privateSeed`: Private voting ID
- `index`: Voter index in merkle tree
- `root`: Merkle tree root
- `siblings`: Merkle proof path (for 20-level tree)

**Outputs**:
- `nullifier`: Unique identifier for this vote
- `commitment`: Public voter ID

### MerkleTree.circom
Generates merkle root from voter list

**Inputs**:
- `voters[n]`: Array of voter IDs

**Outputs**:
- `root`: Merkle tree root

## Building

```bash
npm run build
```

Generated in `build/` directory:
- `.r1cs` files
- `.wasm` files  
- Circuit keys

## Setup (Trusted Setup)

```bash
npm run setup
```

Generates:
- `.zkey` files (proving keys)
- Verification keys

## Testing

```bash
npm run test
```

## Circuit Files

```
circuits/
├── votingKeyGenerator.circom
├── voterEligibility.circom
├── merkleTree.circom
└── lib/
    └── merkle.circom

build/
├── *.wasm
├── *.r1cs
├── *.zkey
└── *.sym
```

## Security

- All circuits audited for correctness
- Merkle tree uses Keccak256 hashing
- Groth16 proofs with 128-bit security
- Trusted setup completed (keys backed up securely)

## License

GPL-3.0
