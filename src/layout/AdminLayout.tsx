import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { sidebarSections, sidebarItemPaths } from "../data";

export function AdminLayout() {
  const [adminSearch, setAdminSearch] = useState("");
  const [showAdminSearch, setShowAdminSearch] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        .sidebar-link:hover { background: #f5f5f5 !important; }
      `}</style>
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          minHeight: "100vh",
          background: "#fff",
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 24px",
            borderBottom: "1px solid #eee",
            background: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <span
              style={{
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "3px",
                color: "#1a1a2e",
              }}
            >
              OMISE
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <input
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                onFocus={() => setShowAdminSearch(true)}
                onBlur={() => setTimeout(() => setShowAdminSearch(false), 200)}
                placeholder="Admin Charges Search"
                style={{
                  padding: "7px 14px",
                  border: "1px solid #ddd",
                  borderRadius: 4,
                  fontSize: 13,
                  width: 220,
                  outline: "none",
                }}
              />
              {showAdminSearch && adminSearch && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "0 0 4px 4px",
                    padding: 8,
                    fontSize: 12,
                    color: "#888",
                    zIndex: 10,
                  }}
                >
                  Searching for &ldquo;{adminSearch}&rdquo;...
                </div>
              )}
            </div>
            <button
              style={{
                padding: "7px 20px",
                background: "#1a56db",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                fontSize: 13,
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Search
            </button>
            <span style={{ color: "#555", fontSize: 13, cursor: "pointer" }}>
              Exports
            </span>
            <span style={{ color: "#555", fontSize: 13 }}>
              jakrapan@omise.co
            </span>
          </div>
        </div>

        <div style={{ display: "flex", minHeight: "calc(100vh - 52px)" }}>
          {/* Sidebar */}
          <div
            style={{
              width: 200,
              minWidth: 200,
              borderRight: "1px solid #eee",
              padding: "16px 0",
              overflowY: "auto",
              background: "#fff",
            }}
          >
            <div
              style={{
                padding: "8px 20px",
                fontSize: 13,
                color: "#999",
                marginBottom: 8,
              }}
            >
              admin
            </div>
            {sidebarSections.map((section) => (
              <div key={section.title} style={{ marginBottom: 16 }}>
                <div
                  style={{
                    padding: "6px 20px",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#bbb",
                    letterSpacing: "1px",
                  }}
                >
                  {section.title}
                </div>
                {section.items.map((item) => (
                  <NavLink
                    key={item}
                    to={sidebarItemPaths[item] ?? "/" + item.toLowerCase()}
                    className="sidebar-link"
                    style={({ isActive }) => ({
                      display: "block",
                      width: "calc(100% - 12px)",
                      margin: "1px 6px",
                      padding: "7px 14px",
                      textAlign: "left",
                      border: "none",
                      borderRadius: 4,
                      fontSize: 13,
                      cursor: "pointer",
                      textDecoration: "none",
                      background: isActive ? "#1a56db" : "transparent",
                      color: isActive ? "#fff" : "#555",
                      fontWeight: isActive ? 500 : 400,
                      transition: "all 0.15s",
                    })}
                  >
                    {item}
                  </NavLink>
                ))}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, padding: "24px 32px", overflowY: "auto" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
