export function PlaceholderPage({ title }: { title: string }) {
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
        {title}
      </h2>
      <div
        style={{
          padding: 40,
          textAlign: "center",
          color: "#bbb",
          border: "2px dashed #e0e0e0",
          borderRadius: 8,
          background: "#fafafa",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
        <div style={{ fontSize: 14 }}>This page is under development</div>
        <div style={{ fontSize: 12, marginTop: 4 }}>
          Content for <strong>{title}</strong> will appear here
        </div>
      </div>
    </div>
  );
}
