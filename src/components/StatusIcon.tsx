export function StatusIcon({ type }: { type: string }) {
  if (type === "success")
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#4CAF50",
          color: "#fff",
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        ✓
      </span>
    );
  if (type === "pending")
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#FFC107",
          color: "#fff",
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        !
      </span>
    );
  if (type === "failed")
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#F44336",
          color: "#fff",
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        ✕
      </span>
    );
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: "#9E9E9E",
        color: "#fff",
        fontSize: 12,
      }}
    >
      —
    </span>
  );
}

export function MerchantBadge({ label }: { label: string }) {
  return (
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
        marginLeft: 6,
      }}
    >
      {label}
    </span>
  );
}
