import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Team } from "../types";

export function MerchantListPage({
  userEmail,
  teams,
  onBack,
}: {
  userEmail: string;
  teams: Team[];
  onBack: () => void;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [filterTagName, setFilterTagName] = useState<string | null>(
    searchParams.get("tag"),
  );
  const [merchantIds, setMerchantIds] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    teams.forEach((t) => {
      map[t.name] = t.merchantId || "—";
    });
    return map;
  });
  const [editingMerchantId, setEditingMerchantId] = useState<string | null>(
    null,
  );
  const [editMerchantIdValue, setEditMerchantIdValue] = useState("");

  const merchants = useMemo(() => {
    let list = teams
      .filter((t) => t.badge !== "MM")
      .map((t) => ({
        name: t.name,
        merchantId: merchantIds[t.name] || t.merchantId || "—",
        tagName: t.tagName || "—",
      }))
      .reverse();
    if (filterTagName) list = list.filter((m) => m.tagName === filterTagName);
    if (!search) return list;
    return list.filter(
      (m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.merchantId.toLowerCase().includes(search.toLowerCase()),
    );
  }, [teams, search, merchantIds, filterTagName]);

  const handleMerchantIdSubmit = (merchantName: string) => {
    if (
      editMerchantIdValue.trim() &&
      editMerchantIdValue !== merchantIds[merchantName]
    ) {
      setMerchantIds((prev) => ({
        ...prev,
        [merchantName]: editMerchantIdValue.trim(),
      }));
    }
    setEditingMerchantId(null);
  };

  const btnOutline = {
    padding: "8px 24px",
    border: "1px solid #1a56db",
    borderRadius: 4,
    background: "#fff",
    color: "#1a56db",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
  };

  return (
    <div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>
        <span style={{ color: "#1a56db", cursor: "pointer" }}>accounts</span>
        <span>/</span>
        <span onClick={onBack} style={{ color: "#1a56db", cursor: "pointer" }}>
          {userEmail}
        </span>
        <span>/</span>
        <span style={{ color: "#1a56db" }}>merchants</span>
        <span>/</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <button
          onClick={() =>
            navigate(
              "/accounts/" + encodeURIComponent(userEmail) + "/tag-hierarchy",
            )
          }
          style={btnOutline}
        >
          Tag management
        </button>
        <button onClick={onBack} style={btnOutline}>
          Back to Partner
        </button>
      </div>

      {filterTagName && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
            padding: "8px 14px",
            background: "#eef2ff",
            border: "1px solid #c7d2fe",
            borderRadius: 6,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a56db"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span style={{ fontSize: 13, color: "#1a1a2e" }}>
            Filtered by tag: <strong>{filterTagName}</strong>
          </span>
          <button
            onClick={() => setFilterTagName(null)}
            style={{
              marginLeft: "auto",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 12px",
              background: "#fff",
              border: "1px solid #1a56db",
              borderRadius: 4,
              color: "#1a56db",
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Clear filter
          </button>
        </div>
      )}

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
            {["NAME", "TAG", "MERCHANT ID", "ACTION"].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "10px 12px",
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
          {merchants.map((m, i) => (
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
              <td
                style={{
                  padding: "14px 12px",
                  color: "#1a56db",
                  cursor: "pointer",
                  fontWeight: 400,
                }}
              >
                {m.name}
              </td>
              <td style={{ padding: "14px 12px", color: "#555" }}>
                {m.tagName}
              </td>
              <td style={{ padding: "14px 12px" }}>
                {editingMerchantId === m.name ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      autoFocus
                      value={editMerchantIdValue}
                      onChange={(e) => setEditMerchantIdValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleMerchantIdSubmit(m.name);
                        if (e.key === "Escape") setEditingMerchantId(null);
                      }}
                      onBlur={() => handleMerchantIdSubmit(m.name)}
                      style={{
                        padding: "4px 10px",
                        border: "1px solid #e67e22",
                        borderRadius: 4,
                        fontSize: 13,
                        fontFamily: "monospace",
                        outline: "none",
                        width: 130,
                        background: "#fff8f0",
                      }}
                    />
                    <button
                      onClick={() => handleMerchantIdSubmit(m.name)}
                      style={{
                        padding: "4px 10px",
                        background: "#e67e22",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingMerchantId(null)}
                      style={{
                        padding: "4px 10px",
                        background: "#f5f5f5",
                        color: "#666",
                        border: "1px solid #ddd",
                        borderRadius: 4,
                        fontSize: 11,
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </span>
                ) : (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: "#555",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#999"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    {m.merchantId}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingMerchantId(m.name);
                        setEditMerchantIdValue(m.merchantId);
                      }}
                      title="Edit Merchant ID"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 22,
                        height: 22,
                        borderRadius: 3,
                        border: "1px solid #e67e22",
                        background: "#fff8f0",
                        cursor: "pointer",
                        color: "#e67e22",
                        fontSize: 10,
                        fontWeight: 700,
                        marginLeft: 4,
                      }}
                    >
                      #
                    </button>
                  </span>
                )}
              </td>
              <td style={{ padding: "14px 12px" }}>
                <button
                  onClick={() =>
                    navigate(
                      "/accounts/" +
                        encodeURIComponent(userEmail) +
                        "/merchants/" +
                        encodeURIComponent(m.name),
                    )
                  }
                  style={{
                    padding: "5px 18px",
                    background: "#1a56db",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          textAlign: "center",
          padding: "16px 0",
          fontSize: 13,
          color: "#888",
        }}
      >
        displaying {merchants.length} team
      </div>
    </div>
  );
}
