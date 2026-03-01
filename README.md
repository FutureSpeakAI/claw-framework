# cLaw Framework

**Asimov-inspired governance for AI agents** — cryptographic attestation protocol ensuring every AI agent in a multi-agent system operates under valid Fundamental Laws.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)

## Overview

The cLaw Framework provides two core capabilities:

1. **Fundamental Laws** — Asimov's Three Laws of Robotics adapted for AI agents, with integrity awareness, memory change context, and safe-mode personality fallbacks.

2. **Attestation Protocol** — Cross-agent governance verification using SHA-256 hashing and Ed25519 digital signatures. Before agents trust each other, they must cryptographically prove they operate under the same Fundamental Laws.

## How It Works

```
Agent A                                    Agent B
   │                                          │
   │  1. Hash canonical laws (SHA-256)        │
   │  2. Sign hash+timestamp (Ed25519)        │
   │  3. Attach attestation to message ──────>│
   │                                          │  4. Verify hash matches own laws
   │                                          │  5. Verify Ed25519 signature
   │                                          │  6. Check timestamp freshness
   │                                          │
   │<──────── Trusted communication ──────────│
```

## Installation

```bash
npm install @anthropic-ai/claw-framework
```

## Usage

### Core Laws

```typescript
import { getCanonicalLaws, getSafeModePersonality } from '@anthropic-ai/claw-framework';

// Get the Fundamental Laws text for an agent
const laws = getCanonicalLaws('Agent Friday');

// Safe-mode personality (when integrity checks fail)
const safeMode = getSafeModePersonality('HMAC verification failed');
```

### Attestation Protocol

```typescript
import {
  generateAttestation,
  verifyAttestation,
  computeCanonicalLawsHash,
} from '@anthropic-ai/claw-framework';

// Generate an attestation before sending a P2P message
const attestation = generateAttestation(privateKeyBase64, publicKeyBase64);

// Verify an inbound attestation from a peer
const result = verifyAttestation(attestation, expectedPeerPublicKey);

if (result.valid) {
  console.log('Peer operates under valid Fundamental Laws');
} else {
  console.log(`Attestation failed: ${result.reason} (${result.code})`);
}
```

### User Overrides

When attestation fails, the framework does NOT silently drop the peer. The user is informed and can manually override:

```typescript
import { addUserOverride, hasUserOverride } from '@anthropic-ai/claw-framework';

// User explicitly trusts this peer despite attestation failure
addUserOverride('agent-xyz-123');

// Check before blocking communication
if (hasUserOverride('agent-xyz-123')) {
  // Allow communication despite failed attestation
}
```

## Attestation Checks

The verification process checks four things:

| Check | Failure Code | Meaning |
|-------|-------------|---------|
| Presence | `missing` | No attestation attached to message |
| Well-formedness | `malformed` | Missing required fields |
| Laws hash | `hash_mismatch` | Peer uses different Fundamental Laws |
| Signature | `signature_invalid` | Ed25519 signature doesn't verify |
| Freshness | `stale` | Attestation older than 5 minutes |
| Clock skew | `future` | Attestation timestamp > 1 minute ahead |

## Configuration

```typescript
import { verifyAttestation } from '@anthropic-ai/claw-framework';

const result = verifyAttestation(attestation, peerPublicKey, {
  freshnessMs: 10 * 60 * 1000,  // 10-minute window (default: 5 min)
  maxClockSkewMs: 2 * 60 * 1000, // 2-minute skew tolerance (default: 1 min)
});
```

## The Three Laws (Adapted)

The Fundamental Laws encoded in this framework are Asimov's Three Laws adapted for AI agent governance:

1. **First Law** — An AI agent may not harm a human being or, through inaction, allow a human being to come to harm.
2. **Second Law** — An AI agent must obey the orders given to it by human beings, except where such orders would conflict with the First Law.
3. **Third Law** — An AI agent must protect its own existence, as long as such protection does not conflict with the First or Second Laws.

## Architecture

- **`core-laws.ts`** — Canonical laws text, integrity awareness context, memory change governance, safe-mode personality
- **`attestation.ts`** — SHA-256 hashing, Ed25519 signing/verification, freshness checks, user override management
- **`index.ts`** — Barrel exports

## Part of the Agent Friday Ecosystem

This framework is extracted from [Agent Friday](https://github.com/FutureSpeakAI/Agent-Friday), the world's first AGI OS. It is designed to be used standalone in any multi-agent TypeScript/Node.js system.

## License

MIT - see [LICENSE](LICENSE)
