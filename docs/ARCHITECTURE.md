# Z-Voting v2 Architecture

## Overview

Z-Voting v2 is built on a modular architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React 18)                   │
│              (Admin Dashboard & Voter UI)                │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP/WebSocket
┌─────────────────────▼───────────────────────────────────┐
│              Backend (Node.js + TS)                      │
│   (Proof Generation, Merkle Trees, API Gateway)          │
└──────────┬─────────────────┬───────────────┬────────────┘
           │                 │               │
           ▼                 ▼               ▼
      ┌────────┐        ┌─────────┐    ┌─────────┐
      │ Circom │        │  Web3   │    │Database │
      │Circuits│        │Provider │    │(Optional)│
      └────────┘        └─────────┘    └─────────┘
                            │
                            ▼
                    ┌──────────────────┐
                    │  Blockchain      │
                    │ (Ethereum/Other) │
                    └──────────────────┘
```

## Components

### 1. Smart Contracts

**Purpose**: Immutable voting logic on-chain

**Key Contracts**:
- `ZVoting.sol` - Core voting logic
  - State management (active, ended, cancelled)
  - Voter registration via merkle root
  - Vote submission with proof verification
  - Result queries
  - Event emissions for transparency

- `ZVotingFactory.sol` - Voting instance factory
  - Create new voting instances
  - Track active votings
  - Pause/resume functionality

- `Verifier.sol` - Groth16 proof verification
  - Verify zero-knowledge proofs
  - Validate proof structure
  - Prevent invalid submissions

**Data Flow**:
```
User Submits Vote
       ↓
Generate ZK Proof (backend)
       ↓
Submit Proof to Contract
       ↓
Verify Proof On-Chain
       ↓
Update Vote Counter
       ↓
Emit VoteRecorded Event
```

### 2. Backend

**Purpose**: Generate proofs, manage circuits, provide APIs

**Key Services**:
- **Proof Service**: Generate Groth16 proofs
  - Voter eligibility proofs
  - Merkle tree membership proofs
  - Nullifier generation

- **Circuit Service**: Manage Circom circuits
  - Load and cache circuit artifacts
  - Handle different circuit versions
  - Support circuit updates

- **Merkle Tree Service**: Build and verify merkle trees
  - Create merkle trees from voter list
  - Generate merkle proofs
  - Verify membership

- **Validation Service**: Input validation
  - Voter ID validation
  - Contract address validation
  - Proof structure validation

**API Endpoints**:
- `POST /api/proof/generate` - Generate voting proof
- `POST /api/merkle/create` - Create merkle tree
- `POST /api/merkle/proof` - Generate merkle proof
- `GET /api/voting/:address` - Get voting info
- `GET /api/voting/:address/results` - Get voting results

### 3. Frontend

**Purpose**: User-friendly interface for admin and voters

**Pages**:
- **Home** - Role selection (Admin/Voter)
- **Admin Dashboard** - Create votings, manage voters, view results
- **Voter Interface** - Join voting, verify eligibility, cast vote
- **Results Page** - View final results after voting ends

**Key Features**:
- Real-time vote updates via Web3 event listeners
- Responsive design (mobile-first)
- Error boundaries and fallback UI
- Toast notifications
- Loading skeletons
- Accessibility (ARIA, keyboard navigation)

**State Management**:
- React Context for global state
- Custom hooks for Web3 interactions
- Local storage for session persistence

### 4. Circuits

**Purpose**: Zero-knowledge proof generation

**Circuits**:

#### VotingKeyGenerator Circuit
- Converts private voting ID to public voting ID
- Prevents ID tampering
- Output: Public voting ID (commitment)

#### VoterEligibility Circuit
- Proves voter is in whitelist (merkle tree)
- Proves knowledge of private voting ID
- Prevents double voting (nullifier)
- Outputs: Nullifier, merkle proof

#### MerkleTree Circuit
- Generates merkle root from voter list
- Used for merkle tree verification
- Output: Merkle root hash

**Proof Format**:
```solidity
// On-chain proof format
struct Proof {
    uint[2] a;              // G1 point
    uint[2][2] b;           // G2 point
    uint[2] c;              // G1 point
    uint[7] input;          // Public inputs
}
```

## Data Flow

### 1. Admin Creates Voting

```
1. Admin fills voting form
   - Title
   - Voting deadline
   - Voters list
   - Options (binary or multiple choice)

2. Frontend calls backend:
   POST /api/merkle/create
   {
     voters: [voterID1, voterID2, ...]
   }

3. Backend generates merkle root
   - Creates merkle tree
   - Returns merkle root

4. Frontend deploys contract
   - Calls ZVotingFactory.createVoting
   - Passes merkle root
   - Contract stores voting parameters

5. Admin shares voting address with voters
```

### 2. Voter Casts Vote

```
1. Voter enters private voting ID
2. Frontend converts to public voting ID
3. Voter enters voting contract address
4. Frontend fetches:
   - Merkle tree root
   - Voter index in tree
   - Voting parameters

5. Frontend calls backend:
   POST /api/proof/generate
   {
     privateVotingID,
     voterIndex,
     merkleRoot,
     voteChoice
   }

6. Backend:
   - Generates voting proof
   - Returns proof + proof data

7. Frontend submits vote to contract
   - Calls ZVoting.vote()
   - Passes proof + vote choice

8. Contract verifies proof on-chain
   - Checks nullifier not used
   - Verifies proof validity
   - Updates vote counter
   - Emits VoteRecorded event
```

### 3. Results Query

```
1. Admin/Voter queries results
2. Frontend calls contract:
   - getResults() after voting deadline
   - Returns vote counts

3. Frontend displays results
   - Shows vote distribution
   - Displays percentage
   - Shows timestamp
```

## Security Considerations

### Privacy
- **Voter Anonymity**: Zero-knowledge proofs hide voter identity
- **Vote Secrecy**: Only proof and vote commitment visible on-chain
- **No Correlation**: Vote cannot be linked to voter

### Integrity
- **Proof Verification**: On-chain groth16 verification
- **Merkle Verification**: Membership proof checked
- **Nullifier**: Double voting prevention

### Availability
- **Voting Deadline**: Prevents indefinite voting
- **Pause Mechanism**: Admin can pause/resume
- **Emergency Stop**: Cancel voting if compromised

## Deployment

### Local Development
```bash
npm run dev  # Starts all services
```

### Testnet
```bash
npm run deploy:testnet
# Deploys to Sepolia/Mumbai
```

### Mainnet
```bash
npm run deploy:mainnet
# Deploys to Ethereum/Polygon
# Requires full audit first!
```

## Future Enhancements

1. **Upgradeable Contracts** - Proxy pattern for contract upgrades
2. **Multi-chain Support** - Deploy to multiple chains simultaneously
3. **Delegation** - Allow voters to delegate votes
4. **Weighted Voting** - Support token-weighted voting
5. **DAO Integration** - Integrate with Snapshot/other DAOs
6. **Off-chain Voting** - Gasless voting with signature aggregation
7. **Circuit Optimization** - Reduce proof generation time
8. **Mobile App** - Native mobile application
