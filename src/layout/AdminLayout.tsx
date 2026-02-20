import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { sidebarSections, sidebarItemPaths } from "../data";

export function AdminLayout() {
  const [adminSearch, setAdminSearch] = useState("");
  const [showAdminSearch, setShowAdminSearch] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        .sidebar-link:hover { background: #f5f5f5 !important; }

        /* Responsive Styles */
        .sidebar {
          width: 200px;
          min-width: 200px;
          border-right: 1px solid #eee;
          padding: 16px 0;
          overflow-y: auto;
          background: #fff;
          transition: transform 0.3s ease;
        }

        .main-content {
          flex: 1;
          padding: 24px 32px;
          overflow-y: auto;
        }

        .search-input {
          padding: 7px 14px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 13px;
          width: 220px;
          outline: none;
        }

        .top-bar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          border-bottom: 1px solid #eee;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .search-btn {
            padding: 7px 20px;
            background: #1a56db;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-size: 13px;
            cursor: pointer;
            font-weight: 500;
        }

        .hide-mobile {
            display: inline-block;
        }

        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 20px;
          padding: 0;
          margin-right: 8px;
        }

        .overlay {
          display: none;
        }

        @media (max-width: 768px) {
            .header-container {
                padding: 12px 16px;
            }

            .header-left {
                gap: 8px;
            }
            
            .sidebar {
                position: fixed;
                top: 52px;
                left: 0;
                bottom: 0;
                z-index: 1000;
                transform: translateX(-100%);
                box-shadow: 2px 0 8px rgba(0,0,0,0.1);
            }
            
            .sidebar.mobile-open {
                transform: translateX(0);
            }

            .hamburger-btn {
                display: block;
            }

            .overlay.visible {
                display: block;
                position: fixed;
                top: 52px;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 999;
            }

            .main-content {
                padding: 16px;
            }

            .search-input {
                width: 140px;
            }

            .search-btn {
                display: none;
            }

            .hide-mobile {
                display: none;
            }

            table {
              display: block;
              overflow-x: auto;
              white-space: nowrap;
            }
        }
      `}</style>
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          minHeight: "100vh",
          background: "#fff",
        }}
      >
        {/* Top Bar */}
        <div className="header-container">
          <div className="header-left">
            <button
              className="hamburger-btn"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              ☰
            </button>
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
          <div className="top-bar-actions">
            <div style={{ position: "relative" }}>
              <input
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                onFocus={() => setShowAdminSearch(true)}
                onBlur={() => setTimeout(() => setShowAdminSearch(false), 200)}
                placeholder="Admin Charges Search"
                className="search-input"
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
            <button className="search-btn">Search</button>
            <span
              style={{ color: "#555", fontSize: 13, cursor: "pointer" }}
              className="hide-mobile"
            >
              Exports
            </span>
            <span
              style={{ color: "#555", fontSize: 13 }}
              className="hide-mobile"
            >
              jakrapan@omise.co
            </span>
          </div>
        </div>

        <div style={{ display: "flex", minHeight: "calc(100vh - 52px)" }}>
          {/* Overlay */}
          <div
            className={`overlay ${isSidebarOpen ? "visible" : ""}`}
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className={`sidebar ${isSidebarOpen ? "mobile-open" : ""}`}>
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
          <div className="main-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
