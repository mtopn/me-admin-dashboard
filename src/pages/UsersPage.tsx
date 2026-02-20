import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../data";

export function UsersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return mockUsers;
    return mockUsers.filter((u) =>
      u.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div>
      <div style={{ fontSize: 14, color: "#888", margin: "0 0 20px 0" }}>
        /accounts
      </div>
      <div style={{ position: "relative", marginBottom: 12 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search accounts..."
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
            Created this month
          </button>
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
            By user PIN
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
      <div>
        {filtered.map((u) => (
          <div
            key={u.id}
            onClick={() => navigate("/accounts/" + encodeURIComponent(u.email))}
            style={{
              padding: "14px 8px",
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f9ff")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <span style={{ color: "#1a56db", fontSize: 14 }}>{u.email}</span>
            {u.badge && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "#4CAF50",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {u.badge}
              </span>
            )}
            {u.pin && (
              <span style={{ color: "#555", fontSize: 14 }}>{u.pin}</span>
            )}
            {u.tag && (
              <span style={{ color: "#4CAF50", fontSize: 14, fontWeight: 500 }}>
                {u.tag}
              </span>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "16px 0",
          fontSize: 13,
          color: "#888",
        }}
      >
        displaying all {filtered.length} accounts
      </div>
    </div>
  );
}
