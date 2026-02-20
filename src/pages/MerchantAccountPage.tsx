import { useState } from "react";
import type { Profile } from "../types";
import {
  mockMerchants,
  mockUserDetails,
  mockProfileSetups,
  tagHierarchyData,
  findTagPathById,
} from "../data";
import { ProfileCreationPage } from "./ProfileCreationPage";
import { ProfileDetailPage } from "./ProfileDetailPage";

export function MerchantAccountPage({
  merchantName,
  userEmail,
  onBack,
}: {
  merchantName: string;
  userEmail: string;
  onBack: () => void;
}) {
  const profiles = mockProfileSetups[merchantName] || [];
  const [newProfiles, setNewProfiles] = useState<Profile[]>([]);
  const [showProfileCreation, setShowProfileCreation] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const allProfiles = [...profiles, ...newProfiles];

  const teamEntry = (mockUserDetails[userEmail]?.teams || []).find(
    (t) => t.name === merchantName,
  );
  const merchantId = teamEntry?.merchantId || "—";

  const merchantData = mockMerchants.find((m) => m.name === merchantName);
  const tagStr = merchantData?.tagName || null;
  const tagId = tagStr ? tagStr.split(" - ")[0].trim() : null;
  const tagPath = tagId ? findTagPathById(tagHierarchyData, tagId) : null;

  if (selectedProfile) {
    return (
      <ProfileDetailPage
        profile={selectedProfile}
        merchantName={merchantName}
        userEmail={userEmail}
        onBack={() => setSelectedProfile(null)}
        onUpdate={(updated) => {
          const inMock = profiles.findIndex((p) => p.id === updated.id);
          if (inMock >= 0) {
            mockProfileSetups[merchantName][inMock] = updated;
          } else {
            setNewProfiles((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p)),
            );
          }
          setSelectedProfile(null);
        }}
        onDelete={(id) => {
          const inMock = profiles.findIndex((p) => p.id === id);
          if (inMock >= 0) {
            mockProfileSetups[merchantName].splice(inMock, 1);
          } else {
            setNewProfiles((prev) => prev.filter((p) => p.id !== id));
          }
          setSelectedProfile(null);
        }}
      />
    );
  }

  if (showProfileCreation) {
    return (
      <ProfileCreationPage
        merchantName={merchantName}
        userEmail={userEmail}
        onBack={() => setShowProfileCreation(false)}
        onCreate={(profile) => {
          setNewProfiles((prev) => [...prev, profile]);
          setShowProfileCreation(false);
        }}
      />
    );
  }

  return (
    <div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>
        <span style={{ color: "#1a56db", cursor: "pointer" }}>accounts</span>
        <span>/ </span>
        <span style={{ color: "#1a56db", cursor: "pointer" }} onClick={onBack}>
          {userEmail}
        </span>
        <span>/ </span>
        <span style={{ color: "#1a56db" }}>{merchantName}</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#1a1a2e",
              margin: 0,
            }}
          >
            {merchantName}
          </h2>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#555">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <button
          onClick={onBack}
          style={{
            padding: "6px 20px",
            border: "1px solid #1a56db",
            borderRadius: 4,
            background: "#fff",
            color: "#1a56db",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Back to Partner
        </button>
      </div>
      <div style={{ marginBottom: 24 }}>
        <span
          style={{
            display: "inline-block",
            padding: "3px 12px",
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 600,
            background: "#d4edda",
            color: "#155724",
          }}
        >
          LIVE
        </span>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div style={{ padding: "16px 20px", background: "#fff" }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#1a1a2e",
                marginBottom: 6,
                letterSpacing: "0.3px",
              }}
            >
              Merchant ID
            </div>
            <div
              style={{
                fontSize: 14,
                fontFamily: "monospace",
                color: "#1a1a2e",
              }}
            >
              {merchantId}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <h3
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#1a1a2e",
            marginBottom: 14,
          }}
        >
          Merchant Tag
        </h3>
        {tagPath ? (
          <div
            style={{
              border: "1px solid #e0e7ff",
              borderRadius: 8,
              padding: "16px 20px",
              background: "#fafbff",
            }}
          >
            {tagPath.map((tag, i) => {
              const isDirect = i === tagPath.length - 1;
              const isRoot = i === 0;
              return (
                <div
                  key={tag.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    paddingLeft: i * 20,
                    paddingTop: i === 0 ? 0 : 6,
                    paddingBottom: 6,
                    borderBottom: isDirect ? "none" : "1px solid #eef0fb",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      flexShrink: 0,
                      color: "#c7d2fe",
                      fontSize: 14,
                      fontFamily: "monospace",
                    }}
                  >
                    {isRoot ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    ) : isDirect ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1a56db"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </span>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12,
                      color: isDirect ? "#1a56db" : "#64748b",
                      fontWeight: isDirect ? 600 : 400,
                      flexShrink: 0,
                    }}
                  >
                    {tag.id}
                  </span>
                  <span style={{ color: "#cbd5e1", fontSize: 12 }}>—</span>
                  <span
                    style={{
                      fontSize: 13,
                      color: isDirect ? "#1a1a2e" : "#64748b",
                      fontWeight: isDirect ? 600 : 400,
                    }}
                  >
                    {tag.label}
                  </span>
                  {isDirect && (
                    <span
                      style={{
                        marginLeft: "auto",
                        padding: "2px 10px",
                        borderRadius: 12,
                        fontSize: 11,
                        fontWeight: 600,
                        background: "#e0e7ff",
                        color: "#3730a3",
                      }}
                    >
                      Direct
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              padding: "16px 20px",
              border: "1px solid #eee",
              borderRadius: 8,
              color: "#999",
              fontSize: 13,
            }}
          >
            No tag associated with this merchant account.
          </div>
        )}
      </div>

      <div style={{ marginBottom: 28 }}>
        <h3
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#1a1a2e",
            marginBottom: 14,
          }}
        >
          Profile Setup
        </h3>
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
        >
          <tbody>
            {allProfiles.map((p, i) => (
              <tr
                key={i}
                style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }}
                onClick={() => setSelectedProfile(p)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f8f9ff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <td style={{ padding: "10px 8px", width: 60 }}>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: 3,
                      fontSize: 11,
                      fontWeight: 600,
                      background:
                        p.status === "active"
                          ? "#d4edda"
                          : p.status === "deactivated"
                            ? "#f8d7da"
                            : "#f5f5f5",
                      color:
                        p.status === "active"
                          ? "#155724"
                          : p.status === "deactivated"
                            ? "#721c24"
                            : "#888",
                    }}
                  >
                    {p.status}
                  </span>
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    color: "#1a56db",
                    fontWeight: 600,
                  }}
                >
                  {p.id}
                </td>
                <td style={{ padding: "10px 8px", color: "#333" }}>{p.name}</td>
                <td
                  style={{
                    padding: "10px 8px",
                    color: "#888",
                    fontSize: 12,
                    whiteSpace: "nowrap",
                    textAlign: "right",
                  }}
                >
                  {p.created}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: "center", padding: "14px 0" }}>
          <span
            onClick={() => setShowProfileCreation(true)}
            style={{ color: "#1a56db", cursor: "pointer", fontSize: 13 }}
          >
            New Profile Setup
          </span>
        </div>
      </div>
    </div>
  );
}
