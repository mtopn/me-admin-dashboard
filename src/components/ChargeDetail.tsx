import type { Charge } from "../types";

export function ChargeDetail({
  charge,
  onClose,
}: {
  charge: Charge | null;
  onClose: () => void;
}) {
  if (!charge) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.3)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          padding: 32,
          minWidth: 520,
          maxWidth: 640,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18, color: "#1a1a2e" }}>
            Charge Details
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 22,
              cursor: "pointer",
              color: "#999",
            }}
          >
            ✕
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "140px 1fr",
            gap: "14px 16px",
            fontSize: 14,
          }}
        >
          {[
            ["Charge ID", charge.id],
            ["Status", charge.status],
            ["Authorized", charge.authorized],
            ["Captured", charge.captured],
            ["Payment", charge.payment],
            ["Statement Name", charge.stmtname],
            ["Created", charge.created],
          ].map(([label, value]) => (
            <div key={label} style={{ display: "contents" }}>
              <span style={{ color: "#888", fontWeight: 500 }}>{label}</span>
              <span
                style={{
                  color: "#1a1a2e",
                  fontFamily: label === "Charge ID" ? "monospace" : "inherit",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
          }}
        >
          <button
            style={{
              padding: "8px 20px",
              border: "1px solid #ddd",
              borderRadius: 4,
              background: "#fff",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Refund
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "8px 20px",
              border: "none",
              borderRadius: 4,
              background: "#1a56db",
              color: "#fff",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
