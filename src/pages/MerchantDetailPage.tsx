import { useState } from "react";
import type { ReactNode } from "react";
import type { Merchant } from "../types";
import { mockMerchantDetails } from "../data";

export function MerchantDetailPage({
  merchant,
  onBack,
}: {
  merchant: Merchant;
  onBack: () => void;
}) {
  const detail = mockMerchantDetails[merchant.name];
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = [
    "Overview",
    "Information",
    "Charges",
    "Receipts",
    "Team members",
    "Email subscriptions",
    "Fraud Detection",
  ];

  const InfoRow = ({ label, value }: { label: string; value?: string }) => (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          fontWeight: 600,
          fontSize: 13,
          color: "#333",
          marginBottom: 2,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 13, color: "#555" }}>{value || "N/A"}</div>
    </div>
  );

  const InfoGrid = ({ children }: { children: ReactNode }) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0 40px",
        border: "1px solid #e5e7eb",
        borderRadius: 6,
        padding: "20px 24px",
      }}
    >
      {children}
    </div>
  );

  if (!detail) {
    return (
      <div style={{ padding: 40, color: "#888" }}>
        Merchant details not found.
        <button
          onClick={onBack}
          style={{
            marginLeft: 16,
            color: "#1a56db",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 32 }}>
        {/* Left sidebar */}
        <div style={{ width: 180, minWidth: 180 }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 2 }}>
            Merchant:
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#1a56db",
              fontWeight: 500,
              marginBottom: 8,
            }}
          >
            {detail.name}
          </div>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              color: "#1a56db",
              fontSize: 12,
              cursor: "pointer",
              padding: 0,
              marginBottom: 24,
              textAlign: "left",
            }}
          >
            ← Back to Omise United States
          </button>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  textAlign: "left",
                  padding: "8px 12px",
                  border: "none",
                  borderLeft:
                    activeTab === tab
                      ? "3px solid #1a56db"
                      : "3px solid transparent",
                  background: activeTab === tab ? "#f0f4ff" : "transparent",
                  color: activeTab === tab ? "#1a56db" : "#555",
                  fontSize: 13,
                  cursor: "pointer",
                  fontWeight: activeTab === tab ? 500 : 400,
                  transition: "all 0.15s",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
            {activeTab}
          </div>

          {activeTab === "Overview" && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 24,
                }}
              >
                <span
                  style={{ fontSize: 22, fontWeight: 600, color: "#1a1a2e" }}
                >
                  {detail.name}
                </span>
                {detail.isLive && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "3px 12px",
                      borderRadius: 12,
                      background: "#4CAF50",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    LIVE
                  </span>
                )}
                {detail.badge && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "3px 12px",
                      borderRadius: 12,
                      background: "#4CAF50",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {detail.badge}
                  </span>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  background: "#f9fafb",
                  borderRadius: 6,
                  marginBottom: 28,
                  border: "1px solid #e5e7eb",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      stroke="#4CAF50"
                      strokeWidth="2"
                    />
                    <path
                      d="M5 8l2 2 4-4"
                      stroke="#4CAF50"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span style={{ fontSize: 13, color: "#333" }}>Created</span>
                </div>
                <span style={{ fontSize: 13, color: "#555" }}>
                  {detail.created}
                </span>
              </div>

              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#333",
                  marginBottom: 14,
                }}
              >
                Test Account
              </h3>
              {detail.testAccount && (
                <InfoGrid>
                  <InfoRow
                    label="Statement name"
                    value={detail.testAccount.statementName}
                  />
                  <InfoRow
                    label="Sub merchant"
                    value={detail.testAccount.subMerchant}
                  />
                  <InfoRow label="Locked" value={detail.testAccount.locked} />
                  <InfoRow
                    label="Sub merchant team name"
                    value={detail.testAccount.subMerchantTeamName}
                  />
                  <InfoRow label="Email" value={detail.testAccount.email} />
                  <InfoRow
                    label="Master merchant team name"
                    value={detail.testAccount.masterMerchantTeamName}
                  />
                </InfoGrid>
              )}

              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#333",
                  marginTop: 32,
                  marginBottom: 14,
                }}
              >
                Live Account
              </h3>
              {detail.liveAccount && (
                <InfoGrid>
                  <InfoRow
                    label="Statement name"
                    value={detail.liveAccount.statementName}
                  />
                  <InfoRow label="Email" value={detail.liveAccount.email} />
                  <InfoRow
                    label="Fraud detectors"
                    value={detail.liveAccount.fraudDetectors}
                  />
                  <InfoRow
                    label="Sub merchant"
                    value={detail.liveAccount.subMerchant}
                  />
                  <InfoRow
                    label="MM Threshold"
                    value={detail.liveAccount.mmThreshold}
                  />
                  <InfoRow
                    label="Sub merchant team name"
                    value={detail.liveAccount.subMerchantTeamName}
                  />
                  <InfoRow label="Locked" value={detail.liveAccount.locked} />
                  <InfoRow
                    label="Master merchant team name"
                    value={detail.liveAccount.masterMerchantTeamName}
                  />
                  <InfoRow
                    label="Suspended Transfers"
                    value={detail.liveAccount.suspendedTransfers}
                  />
                </InfoGrid>
              )}
            </div>
          )}

          {activeTab !== "Overview" && (
            <div
              style={{
                padding: 40,
                textAlign: "center",
                color: "#888",
                fontSize: 14,
                border: "1px solid #e5e7eb",
                borderRadius: 6,
              }}
            >
              {activeTab} content for {detail.name} — wireframe placeholder
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 40,
          paddingTop: 16,
          borderTop: "1px solid #eee",
          fontSize: 12,
          color: "#999",
        }}
      >
        <span>© Omise United States</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <select
            style={{
              border: "1px solid #ddd",
              borderRadius: 4,
              padding: "4px 8px",
              fontSize: 12,
              color: "#555",
            }}
          >
            <option>English</option>
          </select>
          <span style={{ cursor: "pointer" }}>About</span>
          <span style={{ cursor: "pointer" }}>Documentation</span>
          <span style={{ cursor: "pointer" }}>Privacy</span>
        </div>
      </div>
    </div>
  );
}
