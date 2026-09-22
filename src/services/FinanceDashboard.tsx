import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  BankIcon,
  Building01Icon,
  DashboardSquare01Icon,
  File01Icon,
  Invoice01Icon,
  MoreHorizontalIcon,
  Notification01Icon,
  Search01Icon,
  Settings01Icon,
  Store01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"
import logoDark from "../imports/logo-dark.png"
import PortalSwitcher from "../components/PortalSwitcher"

function Icon({
  icon,
  size = 18,
  color = "currentColor",
}: {
  icon: any
  size?: number
  color?: string
}) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      color={color}
      strokeWidth={1.8}
      aria-hidden="true"
    />
  )
}

const financeNav = [
  ["Dashboard", DashboardSquare01Icon],
  ["Platform", Building01Icon],
  ["Setup & Master Data", Settings01Icon],
  ["Owners & Billing", UserGroupIcon],
  ["Customer", UserGroupIcon],
  ["Supplier Payments", Store01Icon],
  ["Banking", BankIcon],
  ["General Ledger", File01Icon],
  ["Fixed Assets", Building01Icon],
] as const

const invoices = [
  [
    "INV-GS-2026-010",
    "GreenShield Pest Solutions",
    "Pest Control · Oct 2026 visit",
    "TDR-2026-00157",
    "Recurring",
    "S$1,900.00",
    "Pending review",
  ],
  [
    "INV-GS-2026-ADH1",
    "GreenShield Pest Solutions",
    "Termite treatment (ad-hoc)",
    "SOQ-2026-00412",
    "Ad-hoc SOQ",
    "S$3,200.00",
    "Pending review",
  ],
  [
    "INV-UG-2026-006",
    "UrbanGuard Hygiene",
    "Common-area sanitation · Nov",
    "TDR-2026-00133",
    "Recurring",
    "S$1,000.00",
    "On hold",
  ],
  [
    "INV-GS-2026-009",
    "GreenShield Pest Solutions",
    "Pest Control · Sep 2026 visit",
    "TDR-2026-00157",
    "Recurring",
    "S$1,900.00",
    "Paid",
  ],
  [
    "INV-GS-2026-008",
    "GreenShield Pest Solutions",
    "Pest Control · Aug 2026 visit",
    "TDR-2026-00157",
    "Recurring",
    "S$1,900.00",
    "Paid",
  ],
]

function FinanceTopbar() {
  return (
    <header className="finance-topbar">
      <div className="finance-logo">
        <img src={logoDark} alt="24iFM" />
      </div>
      <label className="finance-search">
        <Icon icon={Search01Icon} size={18} color="#91a0b4" />
        <input aria-label="Search" placeholder="Search something..." />
        <span>⌘K</span>
      </label>
      <div className="finance-top-tools">
        <button
          type="button"
          className="finance-icon-btn"
          aria-label="Notifications"
        >
          <Icon icon={Notification01Icon} size={19} />
        </button>
        <div className="finance-profile">
          <div className="finance-avatar">M</div>
          <div>
            <strong>Morris Zhu</strong>
            <small>15 Scotts · Finance</small>
          </div>
          <Icon icon={ArrowDown01Icon} size={14} />
        </div>
      </div>
    </header>
  )
}

function FinanceNav() {
  return (
    <>
      <nav className="finance-primary-nav" aria-label="Finance navigation">
        {financeNav.map(([label, icon]) => (
          <button
            type="button"
            key={label}
            className={`finance-primary-item ${
              label === "Supplier Payments" ? "active" : ""
            }`}
          >
            <Icon icon={icon} size={17} />
            <span>{label}</span>
            {label !== "Dashboard" && (
              <Icon icon={ArrowRight01Icon} size={13} />
            )}
          </button>
        ))}
      </nav>
    </>
  )
}

function FinanceKpis() {
  return (
    <div className="finance-kpis">
      <section className="finance-kpi balance">
        <span>Total Balance</span>
        <strong>S$92,652.36</strong>
        <small>Operating account · 15 Scotts MCST</small>
      </section>
      <section className="finance-kpi pending">
        <span>Pending review</span>
        <strong>3 invoices</strong>
        <small>S$5,100 awaiting finance check</small>
      </section>
      <section className="finance-kpi recurring">
        <span>Recurring invoices</span>
        <strong>2</strong>
        <small>From active tender contracts</small>
      </section>
      <section className="finance-kpi adhoc">
        <span>Ad-hoc SOQ invoices</span>
        <strong>1</strong>
        <small>Reviewed on a separate track</small>
      </section>
    </div>
  )
}

function FinanceInvoiceInbox() {
  const [notice, setNotice] = useState("")
  return (
    <>
      <div className="finance-heading">
        <div>
          <div className="finance-crumb">
            Finance <span>›</span> Supplier Payments <span>›</span>{" "}
            <b>Invoice Inbox</b>
          </div>
          <h1>Supplier Payments — Tender Invoices</h1>
          <p>
            Invoices flowing in from confirmed tender jobs · GreenShield Pest
            Solutions and others
          </p>
        </div>
        <span className="finance-account-pill">
          <Icon icon={Store01Icon} size={15} /> 15 Scotts MCST
        </span>
      </div>
      <FinanceKpis />
      <div className="finance-guide">
        <div className="finance-guide-icon">i</div>
        <div>
          <strong>Invoice Inbox — intake from tender jobs</strong>
          <p>
            Recurring visit invoices and ad-hoc SOQ invoices arrive here after
            the managing agent confirms completion evidence.
          </p>
        </div>
      </div>
      <section className="finance-card">
        <div className="finance-card-heading">
          <div className="finance-card-icon">
            <Icon icon={Invoice01Icon} size={18} />
          </div>
          <div>
            <h2>Invoice Inbox</h2>
            <p>Review source, type, amount, and current payment status.</p>
          </div>
          <span className="finance-pending-pill">3 pending · 2 paid</span>
        </div>
        <div className="finance-table-wrap">
          <table className="finance-table">
            <thead>
              <tr>
                <th>INVOICE</th>
                <th>CONTRACTOR</th>
                <th>JOB / SOURCE</th>
                <th>TYPE</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th aria-label="Actions"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice[0]}>
                  <td>
                    <strong>{invoice[0]}</strong>
                    <small>{invoice[2]}</small>
                  </td>
                  <td>{invoice[1]}</td>
                  <td>
                    <span>{invoice[2]}</span>
                    <small>{invoice[3]}</small>
                  </td>
                  <td>
                    <span
                      className={`finance-type-pill ${
                        invoice[4] === "Ad-hoc SOQ" ? "purple" : "blue"
                      }`}
                    >
                      {invoice[4]}
                    </span>
                  </td>
                  <td className="amount-cell">{invoice[5]}</td>
                  <td>
                    <span
                      className={`finance-status-pill ${
                        invoice[6] === "Paid"
                          ? "green"
                          : invoice[6] === "Pending review"
                            ? "amber"
                            : "grey"
                      }`}
                    >
                      {invoice[6]}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="finance-row-more"
                      aria-label={`More actions for ${invoice[0]}`}
                      onClick={() =>
                        setNotice(
                          `${invoice[0]} is queued for the Invoice Detail phase.`,
                        )
                      }
                    >
                      <Icon icon={MoreHorizontalIcon} size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="finance-card-note">
          <strong>Where these come from:</strong> recurring invoices are created
          per visit after MA confirmation; ad-hoc SOQ invoices arrive
          independently. Both keep their source reference for finance
          traceability.
        </div>
      </section>
      {notice && (
        <div className="property-toast" role="status">
          <span>✓</span>
          {notice}
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setNotice("")}
          >
            ×
          </button>
        </div>
      )}
    </>
  )
}

export default function FinanceDashboard({
  onSwitchPortal,
}: {
  onSwitchPortal: (portal: "property-dashboard" | "merchant-dashboard" | "finance-dashboard") => void
}) {
  return (
    <div className="finance-app figma-capture-root">
      <FinanceTopbar />
      <FinanceNav />
      <main className="finance-main">
        <FinanceInvoiceInbox />
        <PortalSwitcher current="finance-dashboard" onSwitch={onSwitchPortal} />
      </main>
    </div>
  )
}
