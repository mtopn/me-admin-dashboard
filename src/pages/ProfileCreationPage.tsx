import { useState } from "react";
import type { Profile } from "../types";

export function ProfileCreationPage({
  merchantName,
  userEmail,
  onBack,
  onCreate,
}: {
  merchantName: string;
  userEmail: string;
  onBack: () => void;
  onCreate: (profile: Profile) => void;
}) {
  const [profileId, setProfileId] = useState("");
  const [profileKey, setProfileKey] = useState("");
  const [productName, setProductName] = useState("");

  const handleSubmit = () => {
    if (!profileId.trim() || !profileKey.trim() || !productName.trim()) return;
    const now = new Date();
    const created =
      now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }) +
      " " +
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    onCreate({
      id: profileId.trim(),
      name: productName.trim(),
      status: "active",
      created,
    });
  };

  const rowStyle = { display: "flex", alignItems: "center", marginBottom: 16 };
  const labelStyle = {
    width: 130,
    flexShrink: 0,
    fontSize: 13,
    fontWeight: 500,
    color: "#333",
    textAlign: "right" as const,
    paddingRight: 16,
  };
  const inputStyle = {
    flex: 1,
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: 3,
    fontSize: 13,
    outline: "none",
    background: "#fff",
    color: "#333",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 6,
          fontSize: 13,
          color: "#888",
          paddingBottom: 10,
          marginBottom: 24,
          borderBottom: "1px solid #1a56db",
        }}
      >
        <span style={{ color: "#1a56db", cursor: "pointer" }}>/accounts</span>
        <span style={{ color: "#1a56db", cursor: "pointer" }} onClick={onBack}>
          /{userEmail}
        </span>
        <span style={{ color: "#1a56db", cursor: "pointer" }} onClick={onBack}>
          /{merchantName}
        </span>
        <span>/new profile</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#1a1a2e",
            whiteSpace: "nowrap",
          }}
        >
          {merchantName}
        </span>
        <div style={{ flex: 1, height: 1, background: "#ddd" }}></div>
      </div>

      <div style={{ maxWidth: 520 }}>
        <div style={rowStyle}>
          <label style={labelStyle}>Profile ID</label>
          <input
            value={profileId}
            onChange={(e) => setProfileId(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={rowStyle}>
          <label style={labelStyle}>Profile Key</label>
          <input
            value={profileKey}
            onChange={(e) => setProfileKey(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={rowStyle}>
          <label style={labelStyle}>Product Name</label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={{ marginTop: 20, paddingLeft: 146 }}>
          <button
            onClick={handleSubmit}
            style={{
              padding: "7px 28px",
              background: "#fff",
              border: "1px solid #1a56db",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 500,
              color: "#1a56db",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f4ff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
