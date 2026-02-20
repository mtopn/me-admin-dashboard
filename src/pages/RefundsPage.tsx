import { mockRefunds } from "../data";
import { StatusIcon } from "../components/StatusIcon";

export function RefundsPage() {
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
        Refunds
      </h2>
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #eee" }}>
            <th style={{ width: 40 }}></th>
            {["REFUND ID", "CHARGE ID", "AMOUNT", "STATUS", "CREATED AT"].map(
              (h) => (
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
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {mockRefunds.map((r) => (
            <tr
              key={r.id}
              style={{ borderBottom: "1px solid #f5f5f5" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f8f9ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <td style={{ padding: "12px 10px", textAlign: "center" }}>
                <StatusIcon type={r.statusType} />
              </td>
              <td
                style={{
                  padding: "12px 10px",
                  fontFamily: "monospace",
                  fontSize: 12,
                }}
              >
                {r.id}
              </td>
              <td
                style={{
                  padding: "12px 10px",
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#888",
                }}
              >
                {r.chargeId}
              </td>
              <td style={{ padding: "12px 10px" }}>{r.amount}</td>
              <td
                style={{
                  padding: "12px 10px",
                  color: r.statusType === "pending" ? "#f59e0b" : "#888",
                }}
              >
                {r.status}
              </td>
              <td style={{ padding: "12px 10px", color: "#888" }}>
                {r.created}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
