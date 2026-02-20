import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mockPartnersStore } from "../data";

export function PartnersPage() {
  const [search, setSearch] = useState("");
  // Initialize from the mutable store so newly created partners are visible
  const [partners] = useState(() => [...mockPartnersStore]);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!search) return partners;
    return partners.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, partners]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 14, color: "#888" }}>/partners</div>
        <button
          onClick={() => navigate("/partners/new")}
          style={{
            padding: "8px 20px",
            background: "#1a56db",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontSize: 13,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          + New Partner
        </button>
      </div>
      <div style={{ position: "relative", marginBottom: 12 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ex. partner name or email..."
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
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #eee" }}>
            {["STATUS", "PARTNER NAME / EMAIL", "CREATED"].map((h) => (
              <th
                key={h}
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
          {filtered.map((p, i) => (
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
              <td style={{ padding: "12px 10px" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 10px",
                    borderRadius: 10,
                    background: "#e8f5e9",
                    color: "#2e7d32",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {p.status}
                </span>
              </td>
              <td style={{ padding: "12px 10px" }}>
                <div
                  style={{
                    color: "#1a56db",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate("/partners/" + encodeURIComponent(p.name))
                  }
                >
                  {p.name}
                </div>
                <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>
                  {p.email}
                </div>
              </td>
              <td
                style={{
                  padding: "12px 10px",
                  color: "#888",
                  whiteSpace: "nowrap",
                }}
              >
                {p.created}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 12, fontSize: 12, color: "#888" }}>
        displaying all {filtered.length} partners
      </div>
    </div>
  );
}
