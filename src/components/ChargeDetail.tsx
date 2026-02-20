import type { Charge } from "../types";
import { StatusIcon } from "./StatusIcon";

export function ChargeDetail({
  charge,
  onClose,
}: {
  charge: Charge | null;
  onClose: () => void;
}) {
  if (!charge) return null;

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.15s ease-out;
          padding: 16px;
        }
        .dialog-content {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          width: 100%;
          max-width: 480px;
          animation: slideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 90vh;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f3f4f6;
          font-size: 14px;
          align-items: center;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-label {
          color: #6b7280;
          font-weight: 500;
        }
        .detail-value {
          color: #111827;
          font-weight: 500;
          text-align: right;
        }
        .btn {
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-secondary {
          background: #fff;
          border: 1px solid #d1d5db;
          color: #374151;
        }
        .btn-secondary:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }
        .btn-primary {
          background: #1a56db;
          border: 1px solid transparent;
          color: #fff;
        }
        .btn-primary:hover {
          background: #1e40af;
        }
        .close-btn {
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 8px;
            border-radius: 4px;
            color: #9ca3af;
            font-size: 20px;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .close-btn:hover {
            background: #f3f4f6;
            color: #4b5563;
        }
      `}</style>

      <div className="dialog-overlay" onClick={onClose}>
        <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#fff",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                Charge Details
              </h2>
              <span
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  fontFamily: "monospace",
                  marginTop: 4,
                  display: "block",
                }}
              >
                {charge.id}
              </span>
            </div>
            <button
              className="close-btn"
              onClick={onClose}
              aria-label="Close dialog"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "24px", overflowY: "auto" }}>
            {/* Hero Section */}
            <div
              style={{
                textAlign: "center",
                marginBottom: 24,
                padding: "20px",
                background: "#f9fafb",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
              }}
            >
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>
                Total Authorized
              </div>
              <div
                style={{ fontSize: 32, fontWeight: 700, color: "#111827", letterSpacing: "-0.5px" }}
              >
                {charge.authorized}
              </div>
              <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", padding: "4px 12px", borderRadius: 20, border: "1px solid #e5e7eb" }}>
                 <StatusIcon type={charge.statusType} />
                 <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{charge.status}</span>
              </div>
            </div>

            {/* Content Grid */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="detail-row">
                <span className="detail-label">Captured Amount</span>
                <span className="detail-value">{charge.captured}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Payment Method</span>
                <span className="detail-value">{charge.payment}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Statement Name</span>
                <span className="detail-value">{charge.stmtname}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Merchant</span>
                <span className="detail-value">{charge.merchant}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date Created</span>
                <span className="detail-value">{charge.created}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "16px 24px",
              background: "#f9fafb",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
            }}
          >
            <button className="btn btn-secondary">Refund</button>
            <button className="btn btn-primary" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
