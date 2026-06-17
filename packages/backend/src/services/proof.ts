import snarkjs from 'snarkjs';
import { createLogger } from './logger.js';
import { config } from '../config/environment.js';
import path from 'path';
import { fileURLToPath } from 'url';

const logger = createLogger();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface ProofInput {
  privateVotingID: string;
  voterIndex: number;
  merkleRoot: string;
  voteChoice: number;
  merkleProof: string[];
}

export class ProofService {
  private static circuitCache: Map<string, any> = new Map();

  /**
   * Generate zero-knowledge proof for voting
   * @param input Proof input parameters
   * @returns Generated proof
   */
  static async generateProof(input: ProofInput) {
    try {
      logger.info({ action: 'proof_generation_started', voterIndex: input.voterIndex });

      const wasmPath = path.join(
        config.CIRCUITS_PATH,
        'voterEligibility.wasm'
      );
      const zkeyPath = path.join(
        config.CIRCUITS_PATH,
        'voterEligibility_0001.zkey'
      );

      const proofInput = {
        privateSeed: this.hexToDecimal(input.privateVotingID),
        index: input.voterIndex,
        root: this.hexToDecimal(input.merkleRoot),
        siblings: input.merkleProof.map((p) => this.hexToDecimal(p)),
      };

      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        proofInput,
        wasmPath,
        zkeyPath
      );

      logger.info({
        action: 'proof_generation_completed',
        publicSignalsCount: publicSignals.length,
      });

      return {
        proof,
        publicSignals,
      };
    } catch (error) {
      logger.error({ action: 'proof_generation_failed', error });
      throw error;
    }
  }

  /**
   * Export proof in Solidity format
   * @param proof Generated proof
   * @param publicSignals Public signals
   * @returns Solidity-compatible proof format
   */
  static async exportSolidityProof(
    proof: any,
    publicSignals: any[]
  ) {
    try {
      const calldata = await snarkjs.groth16.exportSolidityCallData(
        proof,
        publicSignals
      );

      const parsed = JSON.parse('[' + calldata + ']');

      logger.info({ action: 'solidity_proof_export_completed' });

      return {
        a: parsed[0],
        b: parsed[1],
        c: parsed[2],
        input: parsed[3],
      };
    } catch (error) {
      logger.error({ action: 'solidity_proof_export_failed', error });
      throw error;
    }
  }

  /**
   * Convert hex string to decimal
   * @param hex Hex string
   * @returns Decimal number as string
   */
  private static hexToDecimal(hex: string): string {
    const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
    return BigInt('0x' + cleanHex).toString();
  }
}
