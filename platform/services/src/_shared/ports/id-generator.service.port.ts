/**
 * IdGeneratorService Port — Pilotspan domain prefixes.
 */

import type { DomainCode } from '@pilotspan/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  rdyId(): string;
  pltId(): string;
  chrId(): string;
  pdcId(): string;
  angId(): string;
  cstId(): string;
  dsaId(): string;
  qisId(): string;
  talId(): string;
  shaId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
