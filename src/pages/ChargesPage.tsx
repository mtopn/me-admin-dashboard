import { useState, useMemo } from "react";
import type { Charge } from "../types";
import { mockCharges } from "../data";
import { StatusIcon, MerchantBadge } from "../components/StatusIcon";
import { ChargeDetail } from "../components/ChargeDetail";

export function ChargesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedCharge, setSelectedCharge] = useState<Charge | null>(null);

  const filtered = useMemo(() => {
    let items = mockCharges;
    if (search)
      items = items.filter(
        (c) =>
          c.id.toLowerCase().includes(search.toLowerCase()) ||
          c.authorized.toLowerCase().includes(search.toLowerCase()),
      );
    if (filter === "success")
      items = items.filter((c) => c.statusType === "success");
    if (filter === "failed")
      items = items.filter((c) => c.statusType === "failed");
    if (filter === "pending")
      items = items.filter((c) => c.statusType === "pending");
    return items;
  }, [search, filter]);

  return (
    <div>
      <h2
        style={{
          fontSize: 18,
          fontWeight: 400,
          color: "#1a1a2e",
          margin: "0 0 20px 0",
        }}
      >
        Charges
      </h2>
      <div style={{ position: "relative", marginBottom: 12 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ex. chrg_123 or John Doe, etc..."
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
          marginBottom: 18,
          fontSize: 13,
        }}
      >
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ color: "#888" }}>Suggestion:</span>
          {[
            { label: "Successful today", value: "success" },
            { label: "Captured yesterday", value: "success" },
            { label: "All Success", value: "success" },
            { label: "All Failed", value: "failed" },
          ].map((s) => (
            <button
              key={s.label}
              onClick={() =>
                setFilter(
                  filter === s.value && s.label.includes("All")
                    ? s.value
                    : s.value === filter
                      ? "all"
                      : s.value,
                )
              }
              style={{
                background: "none",
                border: "none",
                color: "#1a56db",
                cursor: "pointer",
                fontSize: 13,
                padding: "2px 4px",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setFilter("all")}
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
            <th style={{ width: 40 }}></th>
            {[
              "AUTHORIZED",
              "CAPTURED",
              "DETAILS",
              "",
              "PAYMENTS",
              "CREATED AT",
            ].map((h) => (
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
          {filtered.map((c) => (
            <tr
              key={c.id}
              onClick={() => setSelectedCharge(c)}
              style={{
                borderBottom: "1px solid #f5f5f5",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f8f9ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <td style={{ padding: "12px 10px", textAlign: "center" }}>
                <StatusIcon type={c.statusType} />
              </td>
              <td style={{ padding: "12px 10px" }}>{c.authorized}</td>
              <td style={{ padding: "12px 10px" }}>{c.captured}</td>
              <td
                style={{
                  padding: "12px 10px",
                  color:
                    c.statusType === "pending"
                      ? "#f59e0b"
                      : c.statusType === "failed"
                        ? "#ef4444"
                        : "#888",
                }}
              >
                {c.status}
              </td>
              <td style={{ padding: "12px 10px" }}>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    color: "#555",
                  }}
                >
                  {c.id}
                </span>
                <br />
                <span style={{ fontSize: 11, color: "#999" }}>
                  {c.stmtname}
                </span>
                <MerchantBadge label={c.merchant} />
              </td>
              <td style={{ padding: "12px 10px" }}>
                {c.payment}
                <br />
                <span style={{ fontSize: 11, color: "#999" }}>
                  {c.stmtname}
                </span>
              </td>
              <td
                style={{
                  padding: "12px 10px",
                  color: "#888",
                  whiteSpace: "nowrap",
                }}
              >
                {c.created}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: 40, color: "#999" }}>
          No charges found
        </div>
      )}
      <ChargeDetail
        charge={selectedCharge}
        onClose={() => setSelectedCharge(null)}
      />
    </div>
  );
}
