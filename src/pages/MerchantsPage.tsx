import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mockMerchants } from "../data";

export function MerchantsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("tag") || "");
  const filtered = useMemo(() => {
    if (!search) return mockMerchants;
    return mockMerchants.filter(
      (m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div>
      <div style={{ fontSize: 14, color: "#888", margin: "0 0 20px 0" }}>
        /merchants
      </div>
      <div style={{ position: "relative", marginBottom: 12 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ex. team_123 or john@email.com, etc..."
          style={{
            width: "100%",
            padding: "10px 40px 10px 14px",
            border: "1px solid #ddd",
            borderRadius: 4,
            fontSize: 14,
            boxSizing: "border-box",
            outline: "none",
          }}
        />
        <span
          style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#bbb",
            fontSize: 16,
          }}
        >
          🔍
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          fontSize: 13,
        }}
      >
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ color: "#888" }}>Suggestion:</span>
          <button
            style={{
              background: "none",
              border: "none",
              color: "#1a56db",
              cursor: "pointer",
              fontSize: 13,
              padding: "2px 4px",
            }}
          >
            All live activated
          </button>
        </div>
        <button
          style={{
            background: "none",
            border: "none",
            color: "#1a56db",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Advanced Search
        </button>
      </div>
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #eee" }}>
            {[
              "LIVE",
              "TEAM NAME",
              "",
              "STATEMENT NAME",
              "OWNER EMAIL",
              "CREATED",
            ].map((h) => (
              <th
                key={h || "badge"}
                style={{
                  textAlign: "left",
                  padding: "8px 10px",
                  color: "#888",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: "0.5px",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((m, i) => (
            <tr
              key={i}
              style={{ borderBottom: "1px solid #f5f5f5" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f8f9ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <td
                style={{
                  padding: "12px 10px",
                  color: "#4CAF50",
                  fontWeight: 600,
                }}
              >
                {m.live}
              </td>
              <td
                style={{
                  padding: "12px 10px",
                  color: "#1a56db",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate("/merchants/" + encodeURIComponent(m.name))
                }
              >
                {m.name}
              </td>
              <td style={{ padding: "12px 10px", width: 40 }}>
                {m.badge && (
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
                    {m.badge}
                  </span>
                )}
              </td>
              <td style={{ padding: "12px 10px" }}></td>
              <td style={{ padding: "12px 10px", color: "#555" }}>{m.email}</td>
              <td
                style={{
                  padding: "12px 10px",
                  color: "#888",
                  whiteSpace: "nowrap",
                }}
              >
                {m.created}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
