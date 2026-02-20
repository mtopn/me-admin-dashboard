export interface Charge {
  id: string;
  authorized: string;
  captured: string;
  status: string;
  statusType: string;
  payment: string;
  stmtname: string;
  merchant: string;
  created: string;
}

export interface Refund {
  id: string;
  chargeId: string;
  amount: string;
  status: string;
  statusType: string;
  created: string;
}

export interface Merchant {
  live: string;
  name: string;
  badge: string;
  email: string;
  created: string;
  tagName: string;
}

export interface AccountInfo {
  statementName: string;
  subMerchant: string;
  locked: string;
  subMerchantTeamName: string;
  email: string;
  masterMerchantTeamName: string;
  fraudDetectors?: string;
  mmThreshold?: string;
  suspendedTransfers?: string;
}

export interface MerchantDetail {
  name: string;
  isLive: boolean;
  badge: string;
  created: string;
  subMerchant: string;
  masterMerchantTeamName: string;
  testAccount: AccountInfo;
  liveAccount: AccountInfo;
}

export interface Partner {
  status: string;
  name: string;
  email: string;
  created: string;
}

export interface TagNode {
  id: string;
  label: string;
  children: TagNode[];
}

export interface FlatNode {
  id: string;
  label: string;
  parentId: string | null;
  uniqueKey: string;
}

export interface TagPathNode {
  id: string;
  label: string;
}

export interface Profile {
  id: string;
  profileKey?: string;
  name: string;
  status: string;
  created: string;
}

export interface Team {
  active: boolean;
  name: string;
  badge: string | null;
  tag: string | null;
  email: string;
  date: string;
  merchantId?: string | null;
  tagName?: string | null;
}

export interface Login {
  browser: string;
  signedIn: string;
  ip: string;
}

export interface UserDetail {
  email: string;
  badge: string | null;
  isLive: boolean;
  isMerchant: boolean;
  lockedOut: string;
  memberSupportPin: string;
  pin: string;
  teams: Team[];
  logins: Login[];
  pendingExport: boolean;
  exportLimitReached: boolean;
  balance?: {
    total: string;
    onHold: string;
    reserve: string;
    transferable: string;
  };
}

export interface User {
  id: string;
  email: string;
  pin: string | null;
  tag: string | null;
  badge: string | null;
}
