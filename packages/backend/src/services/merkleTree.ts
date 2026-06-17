import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import { createLogger } from './logger.js';

const logger = createLogger();

export class MerkleTreeService {
  /**
   * Create merkle tree from voter list
   * @param voters Array of voter IDs
   * @returns Object with merkle root and tree
   */
  static createTree(voters: string[]) {
    try {
      if (!voters || voters.length === 0) {
        throw new Error('Voters list cannot be empty');
      }

      const leaves = voters.map((voter) => keccak256(voter));
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

      logger.info({
        action: 'merkle_tree_created',
        voterCount: voters.length,
        root: tree.getRoot().toString('hex'),
      });

      return {
        root: '0x' + tree.getRoot().toString('hex'),
        tree,
      };
    } catch (error) {
      logger.error({ action: 'merkle_tree_creation_failed', error });
      throw error;
    }
  }

  /**
   * Generate merkle proof for voter
   * @param tree Merkle tree instance
   * @param voter Voter ID
   * @returns Proof and index
   */
  static getProof(tree: MerkleTree, voter: string) {
    try {
      const leaf = keccak256(voter);
      const index = tree
        .getLeaves()
        .findIndex((leaf_) => leaf_.equals(leaf));

      if (index === -1) {
        throw new Error('Voter not found in tree');
      }

      const proof = tree.getHexProof(leaf);

      logger.info({
        action: 'merkle_proof_generated',
        voterIndex: index,
        proofLength: proof.length,
      });

      return {
        proof,
        index,
        root: tree.getRoot().toString('hex'),
      };
    } catch (error) {
      logger.error({ action: 'merkle_proof_generation_failed', error });
      throw error;
    }
  }

  /**
   * Verify merkle proof
   * @param tree Merkle tree instance
   * @param leaf Voter hash
   * @param proof Merkle proof
   * @returns Boolean indicating validity
   */
  static verifyProof(tree: MerkleTree, leaf: Buffer, proof: Buffer[]) {
    try {
      return tree.verify(proof, leaf);
    } catch (error) {
      logger.error({ action: 'merkle_proof_verification_failed', error });
      return false;
    }
  }
}
