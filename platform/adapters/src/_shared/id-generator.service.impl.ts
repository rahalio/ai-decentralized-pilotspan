/**
 * ID Generator Service Implementation — Pilotspan prefixes.
 */

import type { DomainCode } from '@pilotspan/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@pilotspan/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@pilotspan/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  rdyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.readiness);
  }
  pltId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.pilot);
  }
  chrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.charter);
  }
  pdcId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.portfolioDecision);
  }
  angId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.anonymisationGate);
  }
  cstId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.custodian);
  }
  dsaId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.datasetApproval);
  }
  qisId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.qualityIssue);
  }
  talId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.talentAssignment);
  }
  shaId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.shadowAi);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
