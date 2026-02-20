import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockPartnersStore } from "../data";

export function PartnerCreatePage() {
  const navigate = useNavigate();
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleCreate = () => {
    if (!newName.trim() || !newEmail.trim()) return;
    const now = new Date();
    const created =
      now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }) +
      " " +
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    // Push to the shared mutable store so PartnersPage can show the new entry
    mockPartnersStore.unshift({
      status: "live",
      name: newName.trim(),
      email: newEmail.trim(),
      created,
    });
    navigate("/partners");
  };

  return (
    <div>
      <div style={{ fontSize: 14, color: "#888", margin: "0 0 28px 0" }}>
        /partners/new
      </div>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#1a1a2e",
          marginBottom: 28,
        }}
      >
        Create new partner
      </h2>
      <div style={{ maxWidth: 480 }}>
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 500,
              color: "#333",
              marginBottom: 6,
            }}
          >
            Partner Company Name
          </label>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Sample Partner"
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #ddd",
              borderRadius: 4,
              fontSize: 14,
              boxSizing: "border-box",
              outline: "none",
              background: "#2d3748",
              color: "#fff",
            }}
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 500,
              color: "#333",
              marginBottom: 6,
            }}
          >
            Partner Contact Email
          </label>
          <input
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            type="email"
            placeholder="sample@partner.com"
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #ddd",
              borderRadius: 4,
              fontSize: 14,
              boxSizing: "border-box",
              outline: "none",
              background: "#2d3748",
              color: "#fff",
            }}
          />
        </div>
        <p
          style={{
            fontSize: 13,
            color: "#555",
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          By clicking Create Partner, you are going to create a new test partner
          account. You can configure their details after creation.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={handleCreate}
            style={{
              padding: "9px 22px",
              background: "#1a56db",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              fontSize: 14,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Create Partner
          </button>
          <span
            onClick={() => navigate("/partners")}
            style={{ color: "#555", fontSize: 13, cursor: "pointer" }}
          >
            Or go back
          </span>
        </div>
      </div>
    </div>
  );
}
