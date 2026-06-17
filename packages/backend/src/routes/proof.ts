import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { ProofService } from '../services/proof.js';
import { createLogger } from '../services/logger.js';

const logger = createLogger();
const router = Router();

const generateProofSchema = z.object({
  privateVotingID: z.string().min(1, 'Private voting ID required'),
  voterIndex: z.number().int().min(0, 'Valid index required'),
  merkleRoot: z.string().regex(/^0x/, 'Must be hex string'),
  voteChoice: z.number().int().min(0, 'Valid vote choice required'),
  merkleProof: z.array(z.string()),
});

/**
 * POST /api/proof/generate
 * Generate zero-knowledge proof for voting
 */
router.post('/generate', async (req: Request, res: Response) => {
  try {
    const input = generateProofSchema.parse(req.body);

    logger.info({
      action: 'proof_generation_request',
      voterIndex: input.voterIndex,
    });

    const { proof, publicSignals } = await ProofService.generateProof(input);
    const solidityProof = await ProofService.exportSolidityProof(
      proof,
      publicSignals
    );

    res.json({
      success: true,
      proof: solidityProof,
      publicSignals,
    });
  } catch (error: any) {
    logger.error({ action: 'proof_generation_error', error: error.message });
    res.status(400).json({
      error: 'Proof generation failed',
      details: error.message,
    });
  }
});

export default router;
