import type {
  Charge,
  Refund,
  Merchant,
  MerchantDetail,
  Partner,
  TagNode,
  FlatNode,
  TagPathNode,
  Profile,
  UserDetail,
  User,
} from "./types";

// --- Mock Data ---

export const mockCharges: Charge[] = [
  {
    id: "chrg_66lnsttkukox0pey6r",
    authorized: "100.00 USD",
    captured: "100.00 USD",
    status: "Paid",
    statusType: "success",
    payment: "Credit card",
    stmtname: "STMTNAME",
    merchant: "SM",
    created: "Feb 04, 2026 13:00:12",
  },
  {
    id: "chrg_66lnd7ab5ss9koi0gw0",
    authorized: "100.00 USD",
    captured: "100.00 USD",
    status: "Paid",
    statusType: "success",
    payment: "Credit card",
    stmtname: "STMTNAME",
    merchant: "SM",
    created: "Feb 04, 2026 13:00:12",
  },
  {
    id: "chrg_66lnlpwkox2gqkqf5du",
    authorized: "100.00 USD",
    captured: "50.00 USD",
    status: "Paid",
    statusType: "success",
    payment: "Credit card",
    stmtname: "STMTNAME",
    merchant: "SM",
    created: "Feb 04, 2026 13:00:12",
  },
  {
    id: "chrg_66jokdd963jcij0n4i0",
    authorized: "100.00 USD",
    captured: "100.00 USD",
    status: "Pending",
    statusType: "pending",
    payment: "Credit card",
    stmtname: "STMTNAME",
    merchant: "SM",
    created: "Jan 28, 2026 12:40:09",
  },
  {
    id: "chrg_66joidx28jsug6zorpa",
    authorized: "100.00 THB",
    captured: "100.00 THB",
    status: "Paid",
    statusType: "success",
    payment: "Credit card",
    stmtname: "STMTNAME",
    merchant: "SM",
    created: "Jan 28, 2026 12:40:09",
  },
  {
    id: "chrg_66jorwg43rvock0wtn3",
    authorized: "100.00 THB",
    captured: "50.00 THB",
    status: "Paid",
    statusType: "success",
    payment: "Credit card",
    stmtname: "STMTNAME",
    merchant: "SM",
    created: "Jan 28, 2026 12:40:09",
  },
  {
    id: "chrg_66jo1r5dc03vb6flpf4",
    authorized: "100.00 USD",
    captured: "100.00 USD",
    status: "Paid",
    statusType: "success",
    payment: "Credit card",
    stmtname: "STMTNAME",
    merchant: "SM",
    created: "Jan 28, 2026 12:40:09",
  },
  {
    id: "chrg_66jo6kmvks6pswidojy",
    authorized: "100.00 USD",
    captured: "100.00 USD",
    status: "Paid",
    statusType: "success",
    payment: "Credit card",
    stmtname: "STMTNAME",
    merchant: "SM",
    created: "Jan 28, 2026 12:40:09",
  },
  {
    id: "chrg_66l8z7qihm4lr7cd3ng",
    authorized: "100.00 USD",
    captured: "50.00 USD",
    status: "Paid",
    statusType: "success",
    payment: "Credit card",
    stmtname: "STMTNAME",
    merchant: "SM",
    created: "Jan 28, 2026 12:40:09",
  },
  {
    id: "chrg_66kfa82jd9x0mn3pq7r",
    authorized: "250.00 USD",
    captured: "250.00 USD",
    status: "Failed",
    statusType: "failed",
    payment: "Credit card",
    stmtname: "STMTNAME",
    merchant: "SM",
    created: "Jan 25, 2026 09:15:33",
  },
  {
    id: "chrg_66kx9b3mw7y2lo4rs5t",
    authorized: "75.00 THB",
    captured: "75.00 THB",
    status: "Paid",
    statusType: "success",
    payment: "Credit card",
    stmtname: "STMTNAME",
    merchant: "SM",
    created: "Jan 22, 2026 16:22:45",
  },
];

export const mockRefunds: Refund[] = [
  {
    id: "rfnd_66abc123def456",
    chargeId: "chrg_66lnsttkukox0pey6r",
    amount: "50.00 USD",
    status: "Completed",
    statusType: "success",
    created: "Feb 05, 2026 10:30:00",
  },
  {
    id: "rfnd_66abc789ghi012",
    chargeId: "chrg_66joidx28jsug6zorpa",
    amount: "100.00 THB",
    status: "Completed",
    statusType: "success",
    created: "Feb 03, 2026 14:15:22",
  },
  {
    id: "rfnd_66abc345jkl678",
    chargeId: "chrg_66jo1r5dc03vb6flpf4",
    amount: "25.00 USD",
    status: "Pending",
    statusType: "pending",
    created: "Feb 02, 2026 08:45:11",
  },
  {
    id: "rfnd_66abc901mno234",
    chargeId: "chrg_66jorwg43rvock0wtn3",
    amount: "50.00 THB",
    status: "Completed",
    statusType: "success",
    created: "Jan 30, 2026 17:20:33",
  },
];

export const mockMerchants: Merchant[] = [
  {
    live: "YES",
    name: "merchant_1",
    badge: "SM",
    email: "partner_a@yopmail.com",
    created: "February 11, 2026 15:37",
    tagName: "3003811000 - Non-Chain Merchants",
  },
  {
    live: "YES",
    name: "merchant_2",
    badge: "SM",
    email: "partner_a@yopmail.com",
    created: "February 11, 2026 15:24",
    tagName: "3003811000 - Non-Chain Merchants",
  },
  {
    live: "YES",
    name: "merchant_3",
    badge: "SM",
    email: "partner_a@yopmail.com",
    created: "February 11, 2026 15:04",
    tagName: "3003811000 - Non-Chain Merchants",
  },
  {
    live: "YES",
    name: "merchant_4",
    badge: "SM",
    email: "partner_a@yopmail.com",
    created: "February 11, 2026 15:01",
    tagName: "3003811001 - Indx Software",
  },
  {
    live: "YES",
    name: "merchant_5",
    badge: "SM",
    email: "partner_a@yopmail.com",
    created: "February 11, 2026 14:48",
    tagName: "3003811001 - Indx Software",
  },
  {
    live: "YES",
    name: "merchant_a",
    badge: "SM",
    email: "partner_a@yopmail.com",
    created: "February 11, 2026 14:30",
    tagName: "3003811002 - Kofax Image",
  },
  {
    live: "YES",
    name: "merchant_b",
    badge: "SM",
    email: "partner_a@yopmail.com",
    created: "February 11, 2026 14:22",
    tagName: "3003811002 - Kofax Image",
  },
  {
    live: "YES",
    name: "merchant_c",
    badge: "SM",
    email: "partner_a@yopmail.com",
    created: "February 11, 2026 14:15",
    tagName: "3003811002 - Kofax Image",
  },
  {
    live: "YES",
    name: "merchant_d",
    badge: "SM",
    email: "partner_a@yopmail.com",
    created: "February 11, 2026 14:08",
    tagName: "3003811002 - Kofax Image",
  },
  {
    live: "YES",
    name: "merchant_e",
    badge: "SM",
    email: "partner_a@yopmail.com",
    created: "February 11, 2026 14:01",
    tagName: "3003811002 - Kofax Image",
  },
];

export const mockMerchantDetails: Record<string, MerchantDetail> = {
  merchant_1: {
    name: "merchant_1",
    isLive: true,
    badge: "SM",
    created: "August 06, 2025 23:14:16",
    subMerchant: "team_64mset4ckgud7q92trw",
    masterMerchantTeamName: "Partner A",
    testAccount: {
      statementName: "N/A",
      subMerchant: "team_64mset4ckgud7q92trw",
      locked: "false",
      subMerchantTeamName: "merchant_1",
      email: "mo_test3@yopmail.com",
      masterMerchantTeamName: "Partner A",
    },
    liveAccount: {
      statementName: "N/A",
      email: "mo_test@yopmail.com",
      fraudDetectors: "N/A",
      subMerchant: "team_64mset4ckgud7q92trw",
      mmThreshold: "80",
      subMerchantTeamName: "merchant_1",
      locked: "false",
      masterMerchantTeamName: "Partner A",
      suspendedTransfers: "false",
    },
  },
  merchant_2: {
    name: "merchant_2",
    isLive: true,
    badge: "SM",
    created: "August 07, 2025 10:22:05",
    subMerchant: "team_74bxet5dlhve8r03usw",
    masterMerchantTeamName: "Partner A",
    testAccount: {
      statementName: "N/A",
      subMerchant: "team_74bxet5dlhve8r03usw",
      locked: "false",
      subMerchantTeamName: "merchant_2",
      email: "mo_test3@yopmail.com",
      masterMerchantTeamName: "Partner A",
    },
    liveAccount: {
      statementName: "N/A",
      email: "mo_test@yopmail.com",
      fraudDetectors: "N/A",
      subMerchant: "team_74bxet5dlhve8r03usw",
      mmThreshold: "80",
      subMerchantTeamName: "merchant_2",
      locked: "false",
      masterMerchantTeamName: "Partner A",
      suspendedTransfers: "false",
    },
  },
  merchant_3: {
    name: "merchant_3",
    isLive: true,
    badge: "SM",
    created: "August 08, 2025 14:05:30",
    subMerchant: "team_85cyfu6emiwf9s14vtx",
    masterMerchantTeamName: "Partner A",
    testAccount: {
      statementName: "N/A",
      subMerchant: "team_85cyfu6emiwf9s14vtx",
      locked: "false",
      subMerchantTeamName: "merchant_3",
      email: "mo_test3@yopmail.com",
      masterMerchantTeamName: "Partner A",
    },
    liveAccount: {
      statementName: "N/A",
      email: "mo_test@yopmail.com",
      fraudDetectors: "N/A",
      subMerchant: "team_85cyfu6emiwf9s14vtx",
      mmThreshold: "80",
      subMerchantTeamName: "merchant_3",
      locked: "false",
      masterMerchantTeamName: "Partner A",
      suspendedTransfers: "false",
    },
  },
  merchant_4: {
    name: "merchant_4",
    isLive: true,
    badge: "SM",
    created: "August 09, 2025 09:48:12",
    subMerchant: "team_96dzgv7fnjxg0t25wuy",
    masterMerchantTeamName: "Partner A",
    testAccount: {
      statementName: "N/A",
      subMerchant: "team_96dzgv7fnjxg0t25wuy",
      locked: "false",
      subMerchantTeamName: "merchant_4",
      email: "mo_test3@yopmail.com",
      masterMerchantTeamName: "Partner A",
    },
    liveAccount: {
      statementName: "N/A",
      email: "mo_test@yopmail.com",
      fraudDetectors: "N/A",
      subMerchant: "team_96dzgv7fnjxg0t25wuy",
      mmThreshold: "80",
      subMerchantTeamName: "merchant_4",
      locked: "false",
      masterMerchantTeamName: "Partner A",
      suspendedTransfers: "false",
    },
  },
  merchant_5: {
    name: "merchant_5",
    isLive: true,
    badge: "SM",
    created: "August 10, 2025 16:33:44",
    subMerchant: "team_07eahw8gokyh1u36xvz",
    masterMerchantTeamName: "Partner A",
    testAccount: {
      statementName: "N/A",
      subMerchant: "team_07eahw8gokyh1u36xvz",
      locked: "false",
      subMerchantTeamName: "merchant_5",
      email: "mo_test3@yopmail.com",
      masterMerchantTeamName: "Partner A",
    },
    liveAccount: {
      statementName: "N/A",
      email: "mo_test@yopmail.com",
      fraudDetectors: "N/A",
      subMerchant: "team_07eahw8gokyh1u36xvz",
      mmThreshold: "80",
      subMerchantTeamName: "merchant_5",
      locked: "false",
      masterMerchantTeamName: "Partner A",
      suspendedTransfers: "false",
    },
  },
  merchant_a: {
    name: "merchant_a",
    isLive: true,
    badge: "SM",
    created: "August 11, 2025 09:10:22",
    subMerchant: "team_18fbiw9hplzj2v47ywa",
    masterMerchantTeamName: "Partner A",
    testAccount: {
      statementName: "N/A",
      subMerchant: "team_18fbiw9hplzj2v47ywa",
      locked: "false",
      subMerchantTeamName: "merchant_a",
      email: "mo_test3@yopmail.com",
      masterMerchantTeamName: "Partner A",
    },
    liveAccount: {
      statementName: "N/A",
      email: "mo_test@yopmail.com",
      fraudDetectors: "N/A",
      subMerchant: "team_18fbiw9hplzj2v47ywa",
      mmThreshold: "80",
      subMerchantTeamName: "merchant_a",
      locked: "false",
      masterMerchantTeamName: "Partner A",
      suspendedTransfers: "false",
    },
  },
  merchant_b: {
    name: "merchant_b",
    isLive: true,
    badge: "SM",
    created: "August 12, 2025 11:25:38",
    subMerchant: "team_29gcjx0iqmak3w58zxb",
    masterMerchantTeamName: "Partner A",
    testAccount: {
      statementName: "N/A",
      subMerchant: "team_29gcjx0iqmak3w58zxb",
      locked: "false",
      subMerchantTeamName: "merchant_b",
      email: "mo_test3@yopmail.com",
      masterMerchantTeamName: "Partner A",
    },
    liveAccount: {
      statementName: "N/A",
      email: "mo_test@yopmail.com",
      fraudDetectors: "N/A",
      subMerchant: "team_29gcjx0iqmak3w58zxb",
      mmThreshold: "80",
      subMerchantTeamName: "merchant_b",
      locked: "false",
      masterMerchantTeamName: "Partner A",
      suspendedTransfers: "false",
    },
  },
  merchant_c: {
    name: "merchant_c",
    isLive: true,
    badge: "SM",
    created: "August 13, 2025 14:42:55",
    subMerchant: "team_30hdky1jrnbl4x69ayc",
    masterMerchantTeamName: "Partner A",
    testAccount: {
      statementName: "N/A",
      subMerchant: "team_30hdky1jrnbl4x69ayc",
      locked: "false",
      subMerchantTeamName: "merchant_c",
      email: "mo_test3@yopmail.com",
      masterMerchantTeamName: "Partner A",
    },
    liveAccount: {
      statementName: "N/A",
      email: "mo_test@yopmail.com",
      fraudDetectors: "N/A",
      subMerchant: "team_30hdky1jrnbl4x69ayc",
      mmThreshold: "80",
      subMerchantTeamName: "merchant_c",
      locked: "false",
      masterMerchantTeamName: "Partner A",
      suspendedTransfers: "false",
    },
  },
  merchant_d: {
    name: "merchant_d",
    isLive: true,
    badge: "SM",
    created: "August 14, 2025 08:18:07",
    subMerchant: "team_41ielz2ksocm5y70bzd",
    masterMerchantTeamName: "Partner A",
    testAccount: {
      statementName: "N/A",
      subMerchant: "team_41ielz2ksocm5y70bzd",
      locked: "false",
      subMerchantTeamName: "merchant_d",
      email: "mo_test3@yopmail.com",
      masterMerchantTeamName: "Partner A",
    },
    liveAccount: {
      statementName: "N/A",
      email: "mo_test@yopmail.com",
      fraudDetectors: "N/A",
      subMerchant: "team_41ielz2ksocm5y70bzd",
      mmThreshold: "80",
      subMerchantTeamName: "merchant_d",
      locked: "false",
      masterMerchantTeamName: "Partner A",
      suspendedTransfers: "false",
    },
  },
  merchant_e: {
    name: "merchant_e",
    isLive: true,
    badge: "SM",
    created: "August 15, 2025 17:55:33",
    subMerchant: "team_52jfma3ltpdn6z81cae",
    masterMerchantTeamName: "Partner A",
    testAccount: {
      statementName: "N/A",
      subMerchant: "team_52jfma3ltpdn6z81cae",
      locked: "false",
      subMerchantTeamName: "merchant_e",
      email: "mo_test3@yopmail.com",
      masterMerchantTeamName: "Partner A",
    },
    liveAccount: {
      statementName: "N/A",
      email: "mo_test@yopmail.com",
      fraudDetectors: "N/A",
      subMerchant: "team_52jfma3ltpdn6z81cae",
      mmThreshold: "80",
      subMerchantTeamName: "merchant_e",
      locked: "false",
      masterMerchantTeamName: "Partner A",
      suspendedTransfers: "false",
    },
  },
};

export const mockUsers: User[] = [
  {
    id: "user_001",
    email: "moistesting_8989@yopmail.com",
    pin: "80",
    tag: "test",
    badge: null,
  },
  {
    id: "user_002",
    email: "moistesting_123@yopmail.com",
    pin: null,
    tag: null,
    badge: null,
  },
  {
    id: "user_003",
    email: "moistesting-us1@yopmail.com",
    pin: "80",
    tag: "test",
    badge: null,
  },
  {
    id: "user_004",
    email: "partner_a@yopmail.com",
    pin: "80",
    tag: "Partner A",
    badge: "MM",
  },
];

export const mockUserDetails: Record<string, UserDetail> = {
  "partner_a@yopmail.com": {
    email: "partner_a@yopmail.com",
    badge: "MM",
    isLive: true,
    isMerchant: true,
    lockedOut: "NO",
    memberSupportPin: "N/A",
    pin: "",
    teams: [
      {
        active: true,
        name: "Partner A",
        badge: "MM",
        tag: "PartnerA",
        email: "partner_a@yopmail.com",
        date: "April 23, 2025 5:50 AM",
        merchantId: null,
        tagName: null,
      },
      {
        active: true,
        name: "merchant_1",
        badge: "SM",
        tag: "N/A",
        email: "partner_a@yopmail.com",
        date: "April 23, 2025 5:50 AM",
        merchantId: "300300034029",
        tagName: "3003811000 - Non-Chain Merchants",
      },
      {
        active: true,
        name: "merchant_2",
        badge: "SM",
        tag: "N/A",
        email: "partner_a@yopmail.com",
        date: "April 24, 2025 5:50 AM",
        merchantId: "300300034030",
        tagName: "3003811000 - Non-Chain Merchants",
      },
      {
        active: true,
        name: "merchant_3",
        badge: "SM",
        tag: "N/A",
        email: "partner_a@yopmail.com",
        date: "April 25, 2025 5:50 AM",
        merchantId: "300300034031",
        tagName: "3003811000 - Non-Chain Merchants",
      },
      {
        active: true,
        name: "merchant_4",
        badge: "SM",
        tag: "N/A",
        email: "partner_a@yopmail.com",
        date: "April 26, 2025 5:50 AM",
        merchantId: "300300034032",
        tagName: "3003811001 - Indx Software",
      },
      {
        active: true,
        name: "merchant_5",
        badge: "SM",
        tag: "N/A",
        email: "partner_a@yopmail.com",
        date: "April 27, 2025 5:50 AM",
        merchantId: "300300034033",
        tagName: "3003811001 - Indx Software",
      },
      {
        active: true,
        name: "merchant_a",
        badge: "SM",
        tag: "N/A",
        email: "partner_a@yopmail.com",
        date: "April 28, 2025 5:50 AM",
        merchantId: "300300034034",
        tagName: "3003811002 - Kofax Image",
      },
      {
        active: true,
        name: "merchant_b",
        badge: "SM",
        tag: "N/A",
        email: "partner_a@yopmail.com",
        date: "April 29, 2025 5:50 AM",
        merchantId: "300300034035",
        tagName: "3003811002 - Kofax Image",
      },
      {
        active: true,
        name: "merchant_c",
        badge: "SM",
        tag: "N/A",
        email: "partner_a@yopmail.com",
        date: "April 30, 2025 5:50 AM",
        merchantId: "300300034036",
        tagName: "3003811002 - Kofax Image",
      },
      {
        active: true,
        name: "merchant_d",
        badge: "SM",
        tag: "N/A",
        email: "partner_a@yopmail.com",
        date: "May 01, 2025 5:50 AM",
        merchantId: "300300034037",
        tagName: "3003811002 - Kofax Image",
      },
      {
        active: true,
        name: "merchant_e",
        badge: "SM",
        tag: "N/A",
        email: "partner_a@yopmail.com",
        date: "May 02, 2025 5:50 AM",
        merchantId: "300300034038",
        tagName: "3003811002 - Kofax Image",
      },
    ],
    logins: [
      {
        browser: "Chrome 138 (Macintosh), Bangkok, Thailand",
        signedIn: "July 21, 2025 03:26 AM",
        ip: "58.181.243.160",
      },
      {
        browser: "Firefox 147 (Macintosh), Bangkok, Thailand",
        signedIn: "January 23, 2025 01:59 AM",
        ip: "58.181.243.160",
      },
    ],
    pendingExport: false,
    exportLimitReached: false,
  },
  "moistesting_8989@yopmail.com": {
    email: "moistesting_8989@yopmail.com",
    badge: null,
    isLive: true,
    isMerchant: false,
    balance: { total: "$0", onHold: "$0", reserve: "$0", transferable: "$0" },
    lockedOut: "NO",
    memberSupportPin: "N/A",
    pin: "",
    teams: [
      {
        active: true,
        name: "moistesting_8989@yopmail.com",
        badge: null,
        tag: "test",
        email: "moistesting_8989@yop...",
        date: "March 10, 2025 10:00 AM",
      },
    ],
    logins: [
      {
        browser: "Chrome 138 (Macintosh), Bangkok, Thailand",
        signedIn: "Feb 01, 2026 09:15 AM",
        ip: "58.181.243.160",
      },
    ],
    pendingExport: false,
    exportLimitReached: false,
  },
};

export const tagHierarchyData: TagNode = {
  id: "300300000",
  label: "Partner A",
  children: [
    {
      id: "3003500002",
      label: "Silicon Valley Bank",
      children: [
        {
          id: "3003400010",
          label: "Silicon Valley Bank",
          children: [
            {
              id: "3003300010",
              label: "Silicon Valley Bank / All Other Regions",
              children: [
                {
                  id: "3003200633",
                  label: "Western Region",
                  children: [
                    {
                      id: "3003103238",
                      label: "Southern California",
                      children: [
                        {
                          id: "3003811000",
                          label: "Non-Chain Merchants",
                          children: [],
                        },
                        {
                          id: "3003811001",
                          label: "Indx Software",
                          children: [],
                        },
                        {
                          id: "3003811002",
                          label: "Kofax Image",
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Mutable partners store — shared across PartnersPage and PartnerCreatePage
// so newly created partners persist across navigation
const initialPartners: Partner[] = [
  {
    status: "live",
    name: "Partner A",
    email: "partner_a@yopmail.com",
    created: "February 10, 2026 15:00:00",
  },
];
export const mockPartnersStore: Partner[] = [...initialPartners];
// Alias for read-only access in routes/components
export const mockPartners = mockPartnersStore;

export const mockPartnerDetails: Record<string, MerchantDetail> = {
  "Partner A": {
    name: "Partner A",
    isLive: true,
    badge: "MM",
    created: "February 10, 2026 15:00:00",
    subMerchant: "team_mm_partner_a",
    masterMerchantTeamName: "Partner A",
    testAccount: {
      statementName: "PartnerA",
      subMerchant: "team_mm_partner_a",
      locked: "false",
      subMerchantTeamName: "Partner A",
      email: "partner_a@yopmail.com",
      masterMerchantTeamName: "Partner A",
    },
    liveAccount: {
      statementName: "PartnerA",
      email: "partner_a@yopmail.com",
      fraudDetectors: "N/A",
      subMerchant: "team_mm_partner_a",
      mmThreshold: "80",
      subMerchantTeamName: "Partner A",
      locked: "false",
      masterMerchantTeamName: "Partner A",
      suspendedTransfers: "false",
    },
  },
};

export const mockProfileSetups: Record<string, Profile[]> = {
  merchant_1: [
    {
      id: "PF_0001",
      profileKey: "PK_0001",
      name: "Product_001",
      status: "active",
      created: "February 13, 2026 03:34 AM",
    },
  ],
  merchant_2: [
    {
      id: "PF_0002",
      profileKey: "PK_0002",
      name: "Product_002",
      status: "active",
      created: "February 13, 2026 04:10 AM",
    },
  ],
  merchant_3: [
    {
      id: "PF_0003",
      profileKey: "PK_0003",
      name: "Product_003",
      status: "active",
      created: "February 13, 2026 04:45 AM",
    },
  ],
  merchant_4: [
    {
      id: "PF_0004",
      profileKey: "PK_0004",
      name: "Product_004",
      status: "active",
      created: "February 13, 2026 05:12 AM",
    },
  ],
  merchant_5: [
    {
      id: "PF_0005",
      profileKey: "PK_0005",
      name: "Product_005",
      status: "active",
      created: "February 13, 2026 05:38 AM",
    },
  ],
  merchant_a: [
    {
      id: "PF_0006",
      profileKey: "PK_0006",
      name: "Product_006",
      status: "active",
      created: "February 13, 2026 06:01 AM",
    },
  ],
  merchant_b: [
    {
      id: "PF_0007",
      profileKey: "PK_0007",
      name: "Product_007",
      status: "active",
      created: "February 13, 2026 06:22 AM",
    },
  ],
  merchant_c: [
    {
      id: "PF_0008",
      profileKey: "PK_0008",
      name: "Product_008",
      status: "active",
      created: "February 13, 2026 06:45 AM",
    },
  ],
  merchant_d: [
    {
      id: "PF_0009",
      profileKey: "PK_0009",
      name: "Product_009",
      status: "active",
      created: "February 13, 2026 07:03 AM",
    },
  ],
  merchant_e: [
    {
      id: "PF_0010",
      profileKey: "PK_0010",
      name: "Product_010",
      status: "active",
      created: "February 13, 2026 07:30 AM",
    },
  ],
};

// --- Sidebar Config ---
export const sidebarSections = [
  {
    title: "TRANSACTIONS",
    items: ["Charges", "Refunds", "Chargeback", "Deposit"],
  },
  { title: "PEOPLE", items: ["Partners", "Merchants", "Accounts"] },
  { title: "TECHNICALS", items: ["Audits"] },
];

export const sidebarItemPaths: Record<string, string> = {
  Charges: "/charges",
  Refunds: "/refunds",
  Chargeback: "/chargeback",
  Deposit: "/deposit",
  Partners: "/partners",
  Merchants: "/merchants",
  Accounts: "/accounts",
  Audits: "/audits",
};

// --- Tag Tree Utilities ---
export function deepCloneTree(node: TagNode): TagNode {
  return {
    id: node.id,
    label: node.label,
    children: node.children.map(deepCloneTree),
  };
}

export function renameInTree(
  node: TagNode,
  targetId: string,
  newLabel: string,
): TagNode {
  if (node.id === targetId) return { ...node, label: newLabel };
  return {
    ...node,
    children: node.children.map((c) => renameInTree(c, targetId, newLabel)),
  };
}

export function changeIdInTree(
  node: TagNode,
  targetId: string,
  newId: string,
): TagNode {
  if (node.id === targetId) return { ...node, id: newId };
  return {
    ...node,
    children: node.children.map((c) => changeIdInTree(c, targetId, newId)),
  };
}

export function removeFromTree(node: TagNode, targetId: string): TagNode {
  return {
    ...node,
    children: node.children
      .filter((c) => c.id !== targetId)
      .map((c) => removeFromTree(c, targetId)),
  };
}

export function findNode(node: TagNode, targetId: string): TagNode | null {
  if (node.id === targetId) return node;
  for (const child of node.children) {
    const found = findNode(child, targetId);
    if (found) return found;
  }
  return null;
}

export function insertIntoTree(
  node: TagNode,
  parentId: string,
  newChild: TagNode,
): TagNode {
  if (node.id === parentId) {
    return { ...node, children: [...node.children, newChild] };
  }
  return {
    ...node,
    children: node.children.map((c) => insertIntoTree(c, parentId, newChild)),
  };
}

export function collectAllNodes(
  node: TagNode,
  parentId: string | null = null,
  prefix = "",
): FlatNode[] {
  const uniqueKey = prefix ? prefix + "/" + node.id : node.id;
  const result: FlatNode[] = [
    { id: node.id, label: node.label, parentId, uniqueKey },
  ];
  for (const child of node.children) {
    result.push(...collectAllNodes(child, node.id, uniqueKey));
  }
  return result;
}

export function isDescendant(
  root: TagNode,
  ancestorId: string,
  targetId: string,
): boolean {
  const ancestor = findNode(root, ancestorId);
  if (!ancestor) return false;
  return !!findNode(ancestor, targetId);
}

export function findTagPathById(
  node: TagNode,
  targetId: string,
  path: TagPathNode[] = [],
): TagPathNode[] | null {
  const currentPath = [...path, { id: node.id, label: node.label }];
  if (node.id === targetId) return currentPath;
  for (const child of node.children) {
    const result = findTagPathById(child, targetId, currentPath);
    if (result) return result;
  }
  return null;
}

export function filterTree(node: TagNode, query: string): TagNode | null {
  const lq = query.toLowerCase();
  const matches =
    node.label.toLowerCase().includes(lq) || node.id.toLowerCase().includes(lq);
  const filteredChildren = node.children
    .map((c) => filterTree(c, query))
    .filter(Boolean) as TagNode[];
  if (matches || filteredChildren.length > 0) {
    return { ...node, children: filteredChildren };
  }
  return null;
}
