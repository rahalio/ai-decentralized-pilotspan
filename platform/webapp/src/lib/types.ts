export type Pilot = {
  pilotId: string;
  name: string;
  status: string;
  lane?: string;
  sponsorId: string;
  successMetric: string;
  nextCadenceAt?: string;
  createdAt?: string;
};

export type ReadinessAssessment = {
  assessmentId: string;
  organisationId: string;
  structureScore: number;
  infrastructureScore: number;
  dataScore: number;
  talentScore: number;
  processScore: number;
  overallScore: number;
  admissionStatus: string;
  hardwareCloudNotes?: string;
  evidenceNotes?: string;
};

export type AnonymisationGate = {
  gateId: string;
  pilotId: string;
  status: string;
  aggregateScore: number;
  removeScore: number;
  topBottomCodingScore: number;
  groupScore: number;
  hashDigestScore: number;
  totalScore: number;
  correlatedFeatureNotes?: string;
};

export type Custodian = {
  custodianId: string;
  personId: string;
  datasetName: string;
  pilotId?: string;
};

export type DatasetApproval = {
  approvalId: string;
  pilotId: string;
  datasetName: string;
  outcome: string;
  rationale?: string;
};

export type QualityIssue = {
  issueId: string;
  datasetName: string;
  summary: string;
  severity: string;
};

export type TalentAssignment = {
  assignmentId: string;
  pilotId: string;
  role: string;
  personId: string;
  hoursCommitted?: number;
  domainConsultBookedAt?: string;
};

export type ShadowAiSystem = {
  systemId: string;
  name: string;
  department: string;
  status: string;
  riskNotes?: string;
};

export type PortfolioDecision = {
  decisionId: string;
  pilotId: string;
  decision: string;
  rationale: string;
  evidencedBusinessValue: boolean;
  decidedAt: string;
};
