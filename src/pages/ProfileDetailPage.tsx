import { useState } from "react";
import type { Profile } from "../types";

export function ProfileDetailPage({
  profile,
  merchantName,
  userEmail,
  onBack,
  onUpdate,
  onDelete,
}: {
  profile: Profile;
  merchantName: string;
  userEmail: string;
  onBack: () => void;
  onUpdate: (updated: Profile) => void;
  onDelete: (id: string) => void;
}) {
  const [profileId, setProfileId] = useState(profile.id || "");
  const [profileKey, setProfileKey] = useState(profile.profileKey || "");
  const [productName, setProductName] = useState(profile.name || "");
  const [status, setStatus] = useState(profile.status || "active");
  const [showActionMenu, setShowActionMenu] = useState(false);

  const handleUpdate = () => {
    if (!profileId.trim() || !profileKey.trim() || !productName.trim()) return;
    onUpdate({
      ...profile,
      id: profileId.trim(),
      name: productName.trim(),
      profileKey: profileKey.trim(),
      status,
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this profile?")) {
      onDelete(profile.id);
    }
  };

  const handleToggleStatus = () => {
    const newStatus = status === "active" ? "deactivated" : "active";
    setStatus(newStatus);
    onUpdate({
      ...profile,
      id: profileId.trim() || profile.id,
      name: productName.trim() || profile.name,
      profileKey: profileKey.trim() || profile.profileKey,
      status: newStatus,
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
        <span>/{profile.id}</span>
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
        <span
          style={{
            padding: "3px 12px",
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 600,
            whiteSpace: "nowrap",
            background: status === "active" ? "#d4edda" : "#f8d7da",
            color: status === "active" ? "#155724" : "#721c24",
          }}
        >
          {status === "active" ? "ACTIVE" : "DEACTIVATED"}
        </span>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowActionMenu(!showActionMenu)}
            style={{
              padding: "6px 16px",
              background: "#fff",
              border: "1px solid #1a56db",
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 500,
              color: "#1a56db",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f4ff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            Action
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {showActionMenu && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: 4,
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 6,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                zIndex: 10,
                minWidth: 150,
                overflow: "hidden",
              }}
            >
              <div
                onClick={handleToggleStatus}
                style={{
                  padding: "10px 16px",
                  fontSize: 13,
                  cursor: "pointer",
                  color: status === "active" ? "#dc3545" : "#155724",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f8f9fa")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#fff")
                }
              >
                {status === "active" ? "Deactivate" : "Activate"}
              </div>
            </div>
          )}
        </div>
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
        <div
          style={{ marginTop: 20, paddingLeft: 146, display: "flex", gap: 10 }}
        >
          <button
            onClick={handleUpdate}
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
            Update
          </button>
          <button
            onClick={handleDelete}
            style={{
              padding: "7px 28px",
              background: "#fff",
              border: "1px solid #dc3545",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 500,
              color: "#dc3545",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fff5f5")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
