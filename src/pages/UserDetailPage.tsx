import { useNavigate } from "react-router-dom";
import type { User } from "../types";
import { mockUserDetails } from "../data";

export function UserDetailPage({
  user,
  onBack,
}: {
  user: User;
  onBack: () => void;
}) {
  const navigate = useNavigate();

  const detail = mockUserDetails[user.email] || {
    email: user.email,
    badge: user.badge,
    isLive: true,
    isMerchant: false,
    lockedOut: "NO",
    memberSupportPin: "N/A",
    pin: "",
    teams: [],
    logins: [],
    pendingExport: false,
    exportLimitReached: false,
  };

  const sectionBox = {
    border: "1px solid #e0e0e0",
    borderRadius: 6,
    padding: "20px 24px",
    marginBottom: 24,
  };
  const labelStyle = {
    fontSize: 11,
    color: "#888",
    fontWeight: 600,
    letterSpacing: "0.5px",
  };

  return (
    <div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>
        <span onClick={onBack} style={{ color: "#1a56db", cursor: "pointer" }}>
          /accounts
        </span>
        <span>/{detail.email}</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: "#1a1a2e",
              margin: 0,
            }}
          >
            {detail.email}
          </h2>
          {detail.isLive && (
            <span
              style={{
                padding: "2px 10px",
                borderRadius: 4,
                fontSize: 11,
                fontWeight: 600,
                background: "#d4edda",
                color: "#155724",
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
                width: 28,
                height: 28,
                borderRadius: "50%",
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
        {detail.isMerchant && (
          <button
            onClick={() =>
              navigate(
                "/accounts/" + encodeURIComponent(detail.email) + "/merchants",
              )
            }
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
            Merchant
          </button>
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
          Teams
        </h3>
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
        >
          <tbody>
            {detail.teams.map((t, i) => (
              <tr
                key={i}
                style={{ borderBottom: "1px solid #f0f0f0" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f8f9ff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <td style={{ padding: "10px 8px", width: 40 }}>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: 3,
                      fontSize: 11,
                      fontWeight: 600,
                      background: t.active ? "#d4edda" : "#f5f5f5",
                      color: t.active ? "#155724" : "#888",
                    }}
                  >
                    {t.active ? "YES" : "NO"}
                  </span>
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    color: "#1a56db",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(
                      "/accounts/" +
                        encodeURIComponent(detail.email) +
                        "/merchants/" +
                        encodeURIComponent(t.name),
                    )
                  }
                >
                  {t.name}
                </td>
                <td style={{ padding: "10px 8px", width: 40 }}>
                  {t.badge && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "#4CAF50",
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 700,
                      }}
                    >
                      {t.badge}
                    </span>
                  )}
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    color: "#4CAF50",
                    fontWeight: 500,
                  }}
                >
                  {t.tag || ""}
                </td>
                <td
                  style={{ padding: "10px 8px", color: "#888", fontSize: 12 }}
                >
                  {t.email || ""}
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    color: "#888",
                    fontSize: 12,
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            textAlign: "center",
            padding: "12px 0",
            fontSize: 13,
            color: "#888",
          }}
        >
          displaying all {detail.teams.length} teams
        </div>
      </div>

      <div style={{ ...sectionBox }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <div>
            <div style={{ ...labelStyle, marginBottom: 4 }}>Locked out</div>
            <div style={{ fontSize: 14, color: "#1a1a2e" }}>
              {detail.lockedOut}
            </div>
          </div>
          <div>
            <div style={{ ...labelStyle, marginBottom: 4 }}>
              Member support pin
            </div>
            <div style={{ fontSize: 14, color: "#1a1a2e" }}>
              {detail.memberSupportPin}
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <div style={{ ...labelStyle, marginBottom: 4 }}>PIN:</div>
          <div style={{ fontSize: 14, color: "#1a1a2e" }}>
            {detail.pin || "—"}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              background: "none",
              border: "none",
              color: "#1a56db",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Edit
          </button>
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
          Logins
        </h3>
        {detail.logins.map((login, i) => (
          <div key={i} style={{ ...sectionBox, marginBottom: 12 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#1a1a2e",
                marginBottom: 4,
              }}
            >
              {login.browser}
            </div>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 2 }}>
              Signed in on {login.signedIn}
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>
              Approximate location given by geolocating IP {login.ip}
            </div>
          </div>
        ))}
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
          Reset Export
        </h3>
        <div style={{ ...sectionBox }}>
          <div style={{ fontSize: 13, color: "#555", marginBottom: 4 }}>
            Any Pending Export:{" "}
            <strong>{detail.pendingExport ? "true" : "false"}</strong>
          </div>
          <div style={{ fontSize: 13, color: "#555", marginBottom: 14 }}>
            Export Limit Reached:{" "}
            <strong>{detail.exportLimitReached ? "true" : "false"}</strong>
          </div>
          <button
            style={{
              padding: "7px 18px",
              border: "1px solid #1a56db",
              borderRadius: 4,
              background: "#fff",
              color: "#1a56db",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Reset user's export
          </button>
        </div>
      </div>
    </div>
  );
}
