import { useState, useRef, useEffect } from "react";
import "../styles/layout.css";
import Logo from "../assets/logo.png";

// Icons
import {
  FiUser,
  FiHome,
  FiBox,
  FiChevronDown,
  FiChevronUp,
  FiFileText,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

export default function Layout({ children, filters, setFilters }) {
  const [servicesOpen, setServicesOpen] = useState(true);
  const [invoicesOpen, setInvoicesOpen] = useState(true);

  // NEW: Avatar dropdown
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  function toggleUserMenu() {
    setUserMenuOpen((prev) => !prev);
  }

  // Close when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSearchChange(e) {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      search: value,
      page: 1,
      sort: "customer_name",
      order: "asc",
    }));
  }

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar">

        {/* Brand Card */}
        <div
          className="brand-card"
          onClick={toggleUserMenu}
          ref={dropdownRef}
        >
          <img src={Logo} alt="Logo" className="brand-logo" />

          <div className="brand-text">
            <div className="brand-name">Vault</div>
            <div className="brand-user">Ragul M</div>
          </div>

          {/* Arrow icon change */}
          {userMenuOpen ? (
            <FiChevronUp className="menu-arrow" />
          ) : (
            <FiChevronDown className="menu-arrow" />
          )}

          {/* Dropdown */}
          {userMenuOpen && (
            <div className="user-dropdown">
              <button>Profile</button>
              <button>Settings</button>
              <button>Logout</button>
            </div>
          )}
        </div>

        {/* DASHBOARD */}
        <div className="menu-card">
          <div className="menu-item active">
            <FiHome className="menu-icon" /> Nexus
          </div>

          <div className="menu-item">
            <FiUser className="menu-icon" /> Intake
          </div>
        </div>

        {/* SERVICES */}
        <div className="menu-card">
          <div
            className="menu-header"
            onClick={() => setServicesOpen(!servicesOpen)}
          >
            <span>
              <FiBox className="menu-icon" /> Services
            </span>

            {servicesOpen ? (
              <FiChevronUp className="menu-arrow" />
            ) : (
              <FiChevronDown className="menu-arrow" />
            )}
          </div>

          {servicesOpen && (
            <>
              <div className="menu-sub">
                <FiCheckCircle className="menu-icon" /> Pre-active
              </div>
              <div className="menu-sub">
                <FiCheckCircle className="menu-icon" /> Active
              </div>
              <div className="menu-sub">
                <FiXCircle className="menu-icon" /> Blocked
              </div>
              <div className="menu-sub">
                <FiXCircle className="menu-icon" /> Closed
              </div>
            </>
          )}
        </div>

        {/* INVOICES */}
        <div className="menu-card">
          <div
            className="menu-header"
            onClick={() => setInvoicesOpen(!invoicesOpen)}
          >
            <span>
              <FiFileText className="menu-icon" /> Invoices
            </span>

            {invoicesOpen ? (
              <FiChevronUp className="menu-arrow" />
            ) : (
              <FiChevronDown className="menu-arrow" />
            )}
          </div>

          {invoicesOpen && (
            <>
              <div className="menu-sub active">
                <FiFileText className="menu-icon" /> Proforma Invoices
              </div>
              <div className="menu-sub">
                <FiFileText className="menu-icon" /> Final Invoices
              </div>
            </>
          )}
        </div>
      </aside>

      {/* MAIN */}
      <div className="main">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <h1 className="title">Sales Management System</h1>
          </div>

          <div className="header-right">
            <input
              type="text"
              className="search-box"
              placeholder="Name, Phone no."
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
        </header>

        {/* Page content */}
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
