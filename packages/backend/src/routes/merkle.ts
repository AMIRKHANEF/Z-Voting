import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { MerkleTreeService } from '../services/merkleTree.js';
import { createLogger } from '../services/logger.js';

const logger = createLogger();
const router = Router();

const createTreeSchema = z.object({
  voters: z.array(z.string()).min(2, 'At least 2 voters required'),
});

const getProofSchema = z.object({
  voter: z.string().min(1, 'Voter ID required'),
  voters: z.array(z.string()),
});

/**
 * POST /api/merkle/create
 * Create merkle tree from voter list
 */
router.post('/create', async (req: Request, res: Response) => {
  try {
    const input = createTreeSchema.parse(req.body);

    logger.info({
      action: 'merkle_tree_creation_request',
      voterCount: input.voters.length,
    });

    const { root, tree } = MerkleTreeService.createTree(input.voters);

    // Store tree in memory for this session (in production, use database)
    (req as any).merkleTree = tree;

    res.json({
      success: true,
      root,
      voterCount: input.voters.length,
    });
  } catch (error: any) {
    logger.error({ action: 'merkle_tree_creation_error', error: error.message });
    res.status(400).json({
      error: 'Merkle tree creation failed',
      details: error.message,
    });
  }
});

/**
 * POST /api/merkle/proof
 * Generate merkle proof for specific voter
 */
router.post('/proof', async (req: Request, res: Response) => {
  try {
    const input = getProofSchema.parse(req.body);

    logger.info({
      action: 'merkle_proof_request',
    });

    const { root, tree } = MerkleTreeService.createTree(input.voters);
    const { proof, index } = MerkleTreeService.getProof(tree, input.voter);

    res.json({
      success: true,
      proof,
      index,
      root,
    });
  } catch (error: any) {
    logger.error({ action: 'merkle_proof_error', error: error.message });
    res.status(400).json({
      error: 'Merkle proof generation failed',
      details: error.message,
    });
  }
});

export default router;
