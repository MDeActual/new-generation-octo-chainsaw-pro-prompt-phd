// ============================================================
// MOCK DATA — Demo Mode only. Replace with real Azure/Graph
// API calls once credentials are configured in Settings.
// ============================================================

export const PARTNER_INFO = {
  name: "NorthStar Cloud Partners",
  mpnId: "MPN-4821039",
  tier: "Solutions Partner – Security",
  region: "Canada Central",
  csrp: "Indirect CSP",
  isv: true,
  mssp: true,
};

// ---- Tenants -----------------------------------------------
export type TenantStatus = "Active" | "Onboarding" | "Offboarding" | "Suspended";
export type LighthouseStatus = "Delegated" | "Pending" | "Not Configured";

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  country: string;
  industry: string;
  status: TenantStatus;
  lighthouse: LighthouseStatus;
  secureScore: number;
  complianceScore: number;
  onboardedDate: string;
  csm: string;
}

export const TENANTS: Tenant[] = [
  { id: "t1", name: "Maple Leaf Financial", domain: "mlf.ca", country: "CA", industry: "Financial Services", status: "Active", lighthouse: "Delegated", secureScore: 82, complianceScore: 91, onboardedDate: "2024-03-12", csm: "Priya Sharma" },
  { id: "t2", name: "Arctic Health Systems", domain: "arctichealth.ca", country: "CA", industry: "Healthcare", status: "Active", lighthouse: "Delegated", secureScore: 76, complianceScore: 88, onboardedDate: "2024-05-01", csm: "James Whitfield" },
  { id: "t3", name: "TerraFirma Mining Corp", domain: "terrafirma.ca", country: "CA", industry: "Mining & Resources", status: "Active", lighthouse: "Delegated", secureScore: 69, complianceScore: 74, onboardedDate: "2024-07-18", csm: "Priya Sharma" },
  { id: "t4", name: "ClearPath Legal", domain: "clearpathlaw.ca", country: "CA", industry: "Legal", status: "Onboarding", lighthouse: "Pending", secureScore: 54, complianceScore: 61, onboardedDate: "2025-01-03", csm: "Marcus Chen" },
  { id: "t5", name: "Boreal Logistics Inc", domain: "boreallogistics.ca", country: "CA", industry: "Transportation", status: "Active", lighthouse: "Delegated", secureScore: 78, complianceScore: 83, onboardedDate: "2024-09-22", csm: "James Whitfield" },
  { id: "t6", name: "Summit Education Trust", domain: "summitedu.ca", country: "CA", industry: "Education", status: "Active", lighthouse: "Delegated", secureScore: 71, complianceScore: 79, onboardedDate: "2024-11-15", csm: "Marcus Chen" },
  { id: "t7", name: "Rideau Gov Consulting", domain: "rideauconsult.ca", country: "CA", industry: "Government", status: "Active", lighthouse: "Delegated", secureScore: 88, complianceScore: 95, onboardedDate: "2024-02-07", csm: "Priya Sharma" },
  { id: "t8", name: "Pacific Retail Group", domain: "pacificretail.ca", country: "CA", industry: "Retail", status: "Offboarding", lighthouse: "Not Configured", secureScore: 63, complianceScore: 58, onboardedDate: "2023-11-30", csm: "Marcus Chen" },
];

// ---- Security ----------------------------------------------
export interface SecurityAlert {
  id: string;
  tenant: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  title: string;
  category: string;
  status: "Active" | "In Progress" | "Resolved";
  detectedAt: string;
}

export const SECURITY_ALERTS: SecurityAlert[] = [
  { id: "a1", tenant: "TerraFirma Mining Corp", severity: "Critical", title: "Impossible Travel Detected", category: "Identity", status: "In Progress", detectedAt: "2026-07-03T14:22:00Z" },
  { id: "a2", tenant: "Arctic Health Systems", severity: "High", title: "Privileged Role Assigned Outside PIM", category: "Identity", status: "Active", detectedAt: "2026-07-03T09:45:00Z" },
  { id: "a3", tenant: "ClearPath Legal", severity: "High", title: "Legacy Authentication Enabled", category: "Configuration", status: "Active", detectedAt: "2026-07-02T17:30:00Z" },
  { id: "a4", tenant: "Maple Leaf Financial", severity: "Medium", title: "MFA Not Enforced for Guest Users", category: "Identity", status: "In Progress", detectedAt: "2026-07-02T11:10:00Z" },
  { id: "a5", tenant: "Boreal Logistics Inc", severity: "Medium", title: "Storage Account Public Access Enabled", category: "Data", status: "Resolved", detectedAt: "2026-07-01T08:00:00Z" },
  { id: "a6", tenant: "Summit Education Trust", severity: "Low", title: "Audit Log Retention Below 180 Days", category: "Compliance", status: "Active", detectedAt: "2026-06-30T12:00:00Z" },
];

export const SECURE_SCORE_TREND = [
  { month: "Feb", score: 67 },
  { month: "Mar", score: 70 },
  { month: "Apr", score: 73 },
  { month: "May", score: 75 },
  { month: "Jun", score: 77 },
  { month: "Jul", score: 79 },
];

// ---- Compliance --------------------------------------------
export interface ControlStatus {
  id: string;
  control: string;
  framework: string;
  status: "Compliant" | "Partial" | "Non-Compliant" | "Not Assessed";
  owner: string;
  lastReview: string;
  evidence: string;
}

export const COMPLIANCE_CONTROLS: ControlStatus[] = [
  { id: "c1", control: "Data Residency – Canada Regions Only", framework: "PIPEDA", status: "Compliant", owner: "Platform Team", lastReview: "2026-06-15", evidence: "Policy ARM export" },
  { id: "c2", control: "Consent Management", framework: "PIPEDA", status: "Partial", owner: "Legal", lastReview: "2026-05-20", evidence: "Privacy notice v2" },
  { id: "c3", control: "Access Control (CC6)", framework: "SOC 2", status: "Compliant", owner: "Security Team", lastReview: "2026-06-01", evidence: "PIM audit export" },
  { id: "c4", control: "Incident Response (CC7)", framework: "SOC 2", status: "Compliant", owner: "Security Team", lastReview: "2026-05-28", evidence: "IR runbook v3" },
  { id: "c5", control: "Change Management (CC8)", framework: "SOC 2", status: "Partial", owner: "DevOps", lastReview: "2026-06-10", evidence: "ADO pipeline config" },
  { id: "c6", control: "A.9 – Access Control", framework: "ISO 27001", status: "Compliant", owner: "Security Team", lastReview: "2026-06-20", evidence: "RBAC matrix" },
  { id: "c7", control: "A.12 – Operations Security", framework: "ISO 27001", status: "Compliant", owner: "Platform Team", lastReview: "2026-06-18", evidence: "Defender for Cloud export" },
  { id: "c8", control: "A.18 – Compliance", framework: "ISO 27001", status: "Partial", owner: "Legal", lastReview: "2026-04-30", evidence: "Gap analysis v1" },
  { id: "c9", control: "ID.AM – Asset Management", framework: "NIST CSF", status: "Compliant", owner: "Platform Team", lastReview: "2026-06-05", evidence: "Resource inventory" },
  { id: "c10", control: "PR.AC – Identity Management", framework: "NIST CSF", status: "Compliant", owner: "Security Team", lastReview: "2026-06-12", evidence: "Entra ID config" },
  { id: "c11", control: "DE.CM – Continuous Monitoring", framework: "NIST CSF", status: "Partial", owner: "SOC", lastReview: "2026-05-15", evidence: "Sentinel workspace" },
  { id: "c12", control: "RS.RP – Incident Response Plan", framework: "NIST CSF", status: "Non-Compliant", owner: "SOC", lastReview: "2026-03-01", evidence: "Pending update" },
];

// ---- Partner Ops -------------------------------------------
export interface PalEntry {
  id: string;
  tenant: string;
  subscriptionId: string;
  palStatus: "Active" | "Pending" | "Missing";
  dporStatus: "Active" | "Not Applicable";
  revenue: string;
  workload: string;
}

export const PAL_ENTRIES: PalEntry[] = [
  { id: "p1", tenant: "Maple Leaf Financial", subscriptionId: "sub-mfa-001", palStatus: "Active", dporStatus: "Active", revenue: "$8,400/mo", workload: "Azure SQL, Key Vault, Defender" },
  { id: "p2", tenant: "Arctic Health Systems", subscriptionId: "sub-ahs-001", palStatus: "Active", dporStatus: "Not Applicable", revenue: "$5,200/mo", workload: "Azure Storage, Monitor, Sentinel" },
  { id: "p3", tenant: "TerraFirma Mining Corp", subscriptionId: "sub-tfc-001", palStatus: "Active", dporStatus: "Active", revenue: "$3,100/mo", workload: "VM, Backup, Policy" },
  { id: "p4", tenant: "ClearPath Legal", subscriptionId: "sub-cpl-001", palStatus: "Pending", dporStatus: "Not Applicable", revenue: "$1,800/mo", workload: "M365, Purview" },
  { id: "p5", tenant: "Boreal Logistics Inc", subscriptionId: "sub-bli-001", palStatus: "Active", dporStatus: "Active", revenue: "$4,700/mo", workload: "Arc, Monitor, Defender" },
  { id: "p6", tenant: "Summit Education Trust", subscriptionId: "sub-set-001", palStatus: "Active", dporStatus: "Not Applicable", revenue: "$2,600/mo", workload: "M365, Intune, Entra" },
  { id: "p7", tenant: "Rideau Gov Consulting", subscriptionId: "sub-rgc-001", palStatus: "Missing", dporStatus: "Not Applicable", revenue: "$6,900/mo", workload: "Azure Gov, Sentinel, Purview" },
];

// ---- Identity & Access -------------------------------------
export interface AdminRole {
  id: string;
  displayName: string;
  email: string;
  role: string;
  accessType: "Permanent" | "JIT (PIM)" | "Break-Glass";
  mfaStatus: "Enabled" | "Disabled";
  lastSignIn: string;
  tenant: string;
}

export const ADMIN_ROLES: AdminRole[] = [
  { id: "u1", displayName: "Priya Sharma", email: "priya@northstar.ca", role: "Global Admin", accessType: "JIT (PIM)", mfaStatus: "Enabled", lastSignIn: "2026-07-03T08:12:00Z", tenant: "Partner Tenant" },
  { id: "u2", displayName: "James Whitfield", email: "james@northstar.ca", role: "Security Admin", accessType: "JIT (PIM)", mfaStatus: "Enabled", lastSignIn: "2026-07-03T09:45:00Z", tenant: "Partner Tenant" },
  { id: "u3", displayName: "Marcus Chen", email: "marcus@northstar.ca", role: "Compliance Admin", accessType: "JIT (PIM)", mfaStatus: "Enabled", lastSignIn: "2026-07-02T14:20:00Z", tenant: "Partner Tenant" },
  { id: "u4", displayName: "Break-Glass Account", email: "breakglass@northstar.ca", role: "Global Admin", accessType: "Break-Glass", mfaStatus: "Enabled", lastSignIn: "2025-11-01T02:00:00Z", tenant: "Partner Tenant" },
  { id: "u5", displayName: "Lighthouse Delegated Admin", email: "lighthouse-svc@northstar.ca", role: "Lighthouse Admin", accessType: "Permanent", mfaStatus: "Enabled", lastSignIn: "2026-07-03T00:05:00Z", tenant: "Customer Tenants" },
];

// ---- Automation --------------------------------------------
export interface Workflow {
  id: string;
  name: string;
  trigger: string;
  lastRun: string;
  status: "Success" | "Failed" | "Running" | "Disabled";
  type: "Remediation" | "Onboarding" | "Reporting" | "Alerting";
  runsThisMonth: number;
}

export const WORKFLOWS: Workflow[] = [
  { id: "w1", name: "Tenant Onboarding Runbook", trigger: "Manual / Partner Center webhook", lastRun: "2026-07-01T10:00:00Z", status: "Success", type: "Onboarding", runsThisMonth: 3 },
  { id: "w2", name: "Auto-Remediate Legacy Auth", trigger: "Defender alert", lastRun: "2026-07-02T17:35:00Z", status: "Success", type: "Remediation", runsThisMonth: 12 },
  { id: "w3", name: "PAL Association Checker", trigger: "Scheduled – Daily 06:00", lastRun: "2026-07-03T06:00:00Z", status: "Success", type: "Reporting", runsThisMonth: 33 },
  { id: "w4", name: "Secure Score Delta Report", trigger: "Scheduled – Weekly", lastRun: "2026-06-30T08:00:00Z", status: "Success", type: "Reporting", runsThisMonth: 4 },
  { id: "w5", name: "PIM Activation Alert", trigger: "Entra PIM event", lastRun: "2026-07-03T09:45:00Z", status: "Running", type: "Alerting", runsThisMonth: 28 },
  { id: "w6", name: "Guest User Cleanup", trigger: "Scheduled – Monthly", lastRun: "2026-07-01T00:00:00Z", status: "Success", type: "Remediation", runsThisMonth: 1 },
  { id: "w7", name: "Compliance Evidence Collector", trigger: "Scheduled – Monthly", lastRun: "2026-07-01T01:00:00Z", status: "Failed", type: "Reporting", runsThisMonth: 1 },
  { id: "w8", name: "Tenant Offboarding Runbook", trigger: "Manual", lastRun: "2026-06-15T13:00:00Z", status: "Success", type: "Onboarding", runsThisMonth: 0 },
];
