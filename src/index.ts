/**
 * cLaw Framework — Asimov-inspired governance for AI agents
 *
 * This package provides two core modules:
 *
 *   1. **Core Laws** — The Fundamental Laws text (Asimov's Three Laws adapted
 *      for AI agents) plus helper functions for integrity awareness, memory
 *      change context, and safe-mode personality.
 *
 *   2. **Attestation Protocol** — Cross-agent governance verification using
 *      SHA-256 hashing + Ed25519 signatures. Every agent proves it operates
 *      under valid Fundamental Laws before peers will trust it.
 *
 * @packageDocumentation
 */

// ── Core Laws ────────────────────────────────────────────────────────────
export {
  getCanonicalLaws,
  getIntegrityAwarenessContext,
  getMemoryChangeContext,
  getSafeModePersonality,
} from './core-laws.js';

// ── Attestation Protocol ─────────────────────────────────────────────────
export {
  // Types
  type ClawAttestation,
  type AttestationResult,
  type AttestationConfig,

  // Hash computation
  computeCanonicalLawsHash,
  resetCanonicalLawsHash,

  // Generation & verification
  generateAttestation,
  verifyAttestation,

  // User override management
  addUserOverride,
  removeUserOverride,
  hasUserOverride,
  getUserOverrides,
  clearUserOverrides,
} from './attestation.js';
