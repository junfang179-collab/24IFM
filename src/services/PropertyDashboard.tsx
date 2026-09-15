import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Building01Icon,
  CheckListIcon,
  DashboardSquare01Icon,
  File01Icon,
  FilterIcon,
  Menu01Icon,
  MoreHorizontalIcon,
  News01Icon,
  Notification01Icon,
  Search01Icon,
  Settings01Icon,
  Store01Icon,
  UserAccountIcon,
} from "@hugeicons/core-free-icons"
import logoDark from "../imports/logo-dark.png"

type PropertyView = "tender-list" | "tender-create"

const navItems = [
  { label: "Dashboard", icon: DashboardSquare01Icon },
  { label: "System", icon: Settings01Icon, chevron: true },
  { label: "Property News", icon: News01Icon, chevron: true },
  {
    label: "Property Company",
    icon: Building01Icon,
    chevron: true,
    children: ["Companies", "Accounts", "Menus"],
  },
  { label: "Marketplace", icon: Store01Icon, chevron: true },
  { label: "Merchant", icon: UserAccountIcon, chevron: true },
  { label: "Rewards", icon: File01Icon, chevron: true },
  { label: "Latest", icon: Notification01Icon, chevron: true },
  { label: "News Feed", icon: File01Icon },
]

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

function Field({
  id,
  label,
  required,
  children,
  hint,
  className = "",
}: {
  id: string
  label: string
  required?: boolean
  children: React.ReactNode
  hint?: string
  className?: string
}) {
  return (
    <div className={`property-field ${className}`}>
      <label htmlFor={id}>
        {label}
        {required && <span className="required-mark"> *</span>}
      </label>
      {children}
      {hint && <div className="field-hint">{hint}</div>}
    </div>
  )
}

function PropertySidebar({
  view,
  onView,
}: {
  view: PropertyView
  onView: (view: PropertyView) => void
}) {
  const [tenderMenuOpen, setTenderMenuOpen] = useState(true)

  return (
    <aside className="property-sidebar">
      <div className="property-logo">
        <img src={logoDark} alt="24iFM" />
      </div>
      <nav aria-label="Property navigation">
        {navItems.map((item) => (
          <div key={item.label}>
            <button
              type="button"
              className="property-nav-item"
              onClick={() =>
                item.label === "Dashboard" ? onView("tender-list") : undefined
              }
            >
              <Icon icon={item.icon} size={19} />
              <span>{item.label}</span>
              {item.chevron && <Icon icon={ArrowDown01Icon} size={14} />}
            </button>
            {item.children && (
              <div className="property-nav-children">
                {item.children.map((child) => (
                  <span key={child}>{child}</span>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="property-nav-section">Procurement</div>
        <button
          type="button"
          className={`property-nav-item tender-nav ${
            view === "tender-list" || view === "tender-create" ? "active" : ""
          }`}
          onClick={() => setTenderMenuOpen((open) => !open)}
          aria-expanded={tenderMenuOpen}
          aria-controls="tender-management-subnav"
        >
          <Icon icon={CheckListIcon} size={19} />
          <span>Tender Management</span>
          <span className={`nav-chevron ${tenderMenuOpen ? "open" : ""}`}>
            <Icon icon={ArrowDown01Icon} size={15} />
          </span>
        </button>
        {tenderMenuOpen && (
          <div className="property-subnav" id="tender-management-subnav">
            <button
              type="button"
              className={`property-subnav-item ${
                view === "tender-list" ? "active" : ""
              }`}
              onClick={() => onView("tender-list")}
            >
              <span>Tender Board / Bids</span>
              <span className="subnav-count">7</span>
            </button>
            <button
              type="button"
              className={`property-subnav-item ${
                view === "tender-create" ? "active" : ""
              }`}
              onClick={() => onView("tender-create")}
            >
              <span>Create Tender / Project</span>
            </button>
            <button
              type="button"
              className="property-subnav-item disabled"
              disabled
            >
              <span>Shortlist</span>
              <span className="subnav-state">Soon</span>
            </button>
            <button
              type="button"
              className="property-subnav-item disabled"
              disabled
            >
              <span>Council Decision</span>
              <span className="subnav-state">Soon</span>
            </button>
            <button
              type="button"
              className="property-subnav-item disabled"
              disabled
            >
              <span>Create Task Checklist</span>
              <span className="subnav-state">Soon</span>
            </button>
            <button
              type="button"
              className="property-subnav-item disabled"
              disabled
            >
              <span>Per-visit Tracker</span>
              <span className="subnav-state">Soon</span>
            </button>
            <button
              type="button"
              className="property-subnav-item disabled"
              disabled
            >
              <span>Ad-hoc SOQ</span>
              <span className="subnav-state">Soon</span>
            </button>
          </div>
        )}
        <button type="button" className="property-nav-item">
          <Icon icon={Building01Icon} size={19} />
          <span>Maintenance</span>
          <Icon icon={ArrowDown01Icon} size={14} />
        </button>
        <button type="button" className="property-nav-item">
          <Icon icon={File01Icon} size={19} />
          <span>Finance</span>
          <Icon icon={ArrowDown01Icon} size={14} />
        </button>
        <button type="button" className="property-nav-item">
          <Icon icon={Building01Icon} size={19} />
          <span>Contracts</span>
        </button>
      </nav>
    </aside>
  )
}

function PropertyTopbar() {
  return (
    <header className="property-topbar">
      <button
        type="button"
        className="mobile-menu"
        aria-label="Open navigation"
      >
        <Icon icon={Menu01Icon} size={21} />
      </button>
      <div className="property-search">
        <Icon icon={Search01Icon} size={18} color="#91a0b4" />
        <input aria-label="Search" placeholder="Search something..." />
        <span>⌘K</span>
      </div>
      <div className="topbar-tools">
        <button
          type="button"
          aria-label="Notifications"
          className="topbar-icon"
        >
          <Icon icon={Notification01Icon} size={19} />
        </button>
        <div className="profile-chip">
          <div className="profile-avatar">M</div>
          <div>
            <strong>Morris Zhu</strong>
            <small>15 Scotts</small>
          </div>
          <Icon icon={ArrowDown01Icon} size={14} />
        </div>
      </div>
    </header>
  )
}

function TenderList({ onCreate }: { onCreate: () => void }) {
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const rows = [
    [
      "TDR-2026-00157",
      "Annual Pest Control Services 2026",
      "Pest Control · Sanitation",
      "05 Jun 2026",
      "Draft",
    ],
    [
      "TDR-2026-00142",
      "Lift Maintenance Contract 2026",
      "Facilities · Mechanical",
      "22 May 2026",
      "Collect Bids",
    ],
    [
      "TDR-2026-00131",
      "Landscape Maintenance Renewal",
      "Landscape · Outdoor",
      "30 Apr 2026",
      "Shortlist",
    ],
    [
      "TDR-2026-00124",
      "Common Area Cleaning Contract",
      "Cleaning Services",
      "18 Apr 2026",
      "Council Decision",
    ],
    [
      "TDR-2026-00118",
      "Fire Safety Equipment Inspection",
      "Safety · Compliance",
      "02 Apr 2026",
      "Task Checklist",
    ],
    [
      "TDR-2026-00105",
      "Carpark Lighting Replacement",
      "Electrical · Lighting",
      "22 Mar 2026",
      "Run & Pay",
    ],
    [
      "TDR-2026-00098",
      "Ad-hoc Basement Repair Request",
      "Maintenance · SOQ",
      "11 Mar 2026",
      "Ad-hoc Issue",
    ],
  ]
  const totalEntries = rows.length
  const pageCount = Math.max(1, Math.ceil(totalEntries / pageSize))
  const safePage = Math.min(page, pageCount)
  const firstIndex = (safePage - 1) * pageSize
  const visibleRows = rows.slice(firstIndex, firstIndex + pageSize)
  const firstEntry = totalEntries === 0 ? 0 : firstIndex + 1
  const lastEntry = Math.min(firstIndex + pageSize, totalEntries)

  return (
    <>
      <div className="property-page-heading">
        <div>
          <div className="property-crumb">
            Property <span>›</span> Tender
          </div>
          <h1>Tender Management</h1>
          <p>Manage recurring service tenders, bids, and council decisions.</p>
        </div>
        <button
          className="property-btn primary"
          type="button"
          onClick={onCreate}
        >
          <Icon icon={Add01Icon} size={17} /> Create Tender
        </button>
      </div>
      <section className="property-card tender-list-card">
        <div className="table-toolbar">
          <div className="list-summary">
            <strong>All tenders</strong>
            <span>{totalEntries} lifecycle states</span>
          </div>
          <div className="table-actions">
            <label className="table-search">
              <Icon icon={Search01Icon} size={16} />
              <input
                aria-label="Search tenders"
                placeholder="Search keyword..."
              />
            </label>
            <button type="button" className="property-btn outline">
              <Icon icon={FilterIcon} size={16} /> Filter
            </button>
            <button type="button" className="property-btn reset">
              Reset
            </button>
          </div>
        </div>
        <div className="property-table-wrap">
          <table className="property-table">
            <thead>
              <tr>
                <th>TENDER ID</th>
                <th>TITLE</th>
                <th>CATEGORY</th>
                <th>SUBMISSION DEADLINE</th>
                <th>STATUS</th>
                <th aria-label="Actions"></th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => {
                const isDraft = row[4] === "Draft"
                const statusClass = isDraft
                  ? "grey"
                  : row[4] === "Run & Pay"
                    ? "green"
                    : row[4] === "Ad-hoc Issue"
                      ? "amber"
                      : "grey"
                return (
                  <tr key={row[0]} className={isDraft ? "is-clickable" : ""}>
                    <td className="muted-cell">{row[0]}</td>
                    <td>
                      {isDraft ? (
                        <button
                          type="button"
                          className="tender-title-link"
                          onClick={onCreate}
                        >
                          {row[1]}
                        </button>
                      ) : (
                        <strong>{row[1]}</strong>
                      )}
                      <small>15 Scotts · Managing Agent</small>
                    </td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                    <td>
                      {isDraft ? (
                        <button
                          type="button"
                          className={`status-pill ${statusClass} status-button`}
                          onClick={onCreate}
                        >
                          {row[4]}
                        </button>
                      ) : (
                        <span className={`status-pill ${statusClass}`}>
                          {row[4]}
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="row-more"
                        aria-label={
                          isDraft
                            ? `View details for ${row[1]}`
                            : `${row[4]} details are not available yet`
                        }
                        disabled={!isDraft}
                        onClick={isDraft ? onCreate : undefined}
                      >
                        <Icon icon={MoreHorizontalIcon} size={19} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className="table-footer-meta">
            <label htmlFor="tender-page-size">Rows per page</label>
            <select
              id="tender-page-size"
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value))
                setPage(1)
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
            <span>
              Showing {firstEntry} to {lastEntry} of {totalEntries} entries
            </span>
          </div>
          <div className="pagination">
            <button
              type="button"
              aria-label="Previous page"
              disabled={safePage === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              ‹
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  type="button"
                  key={pageNumber}
                  className={safePage === pageNumber ? "selected" : ""}
                  aria-current={safePage === pageNumber ? "page" : undefined}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ),
            )}
            <button
              type="button"
              aria-label="Next page"
              disabled={safePage === pageCount}
              onClick={() =>
                setPage((current) => Math.min(pageCount, current + 1))
              }
            >
              ›
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

function TenderCreate({ onBack }: { onBack: () => void }) {
  const [saved, setSaved] = useState(false)
  const [posted, setPosted] = useState(false)
  return (
    <>
      <div className="property-page-heading create-heading">
        <div>
          <div className="property-crumb">
            Tender <span>›</span> <b>Create Tender</b>
          </div>
          <h1>Create Tender</h1>
          <p>
            Set up a recurring service tender and invite qualified merchants to
            bid.
          </p>
        </div>
        <button type="button" className="property-btn outline" onClick={onBack}>
          <Icon icon={ArrowLeft01Icon} size={16} /> Back to tenders
        </button>
      </div>
      <div className="tender-guide">
        <div className="guide-icon">i</div>
        <div>
          <strong>Create Tender</strong>
          <p>
            Fill in the project details and post the request to qualified or
            selected merchants. Required fields are marked with an asterisk.
          </p>
        </div>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          setPosted(true)
        }}
      >
        <section className="property-card form-card">
          <div className="form-card-heading">
            <span>1</span>
            <div>
              <h2>Project Information</h2>
              <p>Identify the project, site, and tender visibility.</p>
            </div>
          </div>
          <div className="form-card-body form-grid two-col">
            <Field id="project-title" label="Project Title" required>
              <input
                id="project-title"
                defaultValue="Annual Pest Control Services 2026"
                required
              />
            </Field>
            <Field id="created-by" label="Created By" required>
              <input
                id="created-by"
                defaultValue="Morris Zhu (MA – YY Operation)"
                required
              />
            </Field>
            <Field id="project-site" label="Project / Site" required>
              <input
                id="project-site"
                defaultValue="Block A – Office Tower, 15 Scotts"
                required
              />
            </Field>
            <Field id="create-date" label="Create Date">
              <input id="create-date" type="date" defaultValue="2026-05-18" />
            </Field>
            <Field id="project-id" label="Job / Project ID">
              <input
                id="project-id"
                defaultValue="TDR-2026-00157"
                readOnly
                className="readonly"
              />
            </Field>
            <Field id="visibility" label="Project Visibility">
              <select id="visibility" defaultValue="private">
                <option value="private">
                  Private — invite qualified merchants
                </option>
                <option value="marketplace">
                  Marketplace — open to all merchants
                </option>
              </select>
            </Field>
            <Field id="reference" label="Project Reference No.">
              <input id="reference" defaultValue="MCST-15S/PC/2026" />
            </Field>
            <Field
              id="shortlist"
              label="Shortlist Count (configurable)"
              hint="The default shortlist is 3 vendors."
            >
              <select id="shortlist" defaultValue="3">
                <option>3 vendors — default</option>
                <option>5 vendors</option>
                <option>10 vendors</option>
              </select>
            </Field>
          </div>
        </section>
        <section className="property-card form-card">
          <div className="form-card-heading">
            <span>2</span>
            <div>
              <h2>Tender Schedule</h2>
              <p>Set the response window and optional site briefing.</p>
            </div>
          </div>
          <div className="form-card-body form-grid three-col">
            <Field id="deadline" label="Submission Deadline" required>
              <input
                id="deadline"
                type="date"
                defaultValue="2026-06-05"
                required
              />
            </Field>
            <Field id="deadline-time" label="Submission Time" required>
              <input
                id="deadline-time"
                type="time"
                defaultValue="17:00"
                required
              />
            </Field>
            <Field id="site-visit" label="Site Visit / Briefing">
              <input id="site-visit" defaultValue="28 May 2026, 10:00 AM" />
            </Field>
          </div>
        </section>
        <section className="property-card form-card">
          <div className="form-card-heading">
            <span>3</span>
            <div>
              <h2>Project Details</h2>
              <p>Describe the category, term, and indicative budget.</p>
            </div>
          </div>
          <div className="form-card-body form-grid two-col">
            <Field id="category" label="Job Categories" required>
              <select id="category" defaultValue="pest" required>
                <option value="pest">Pest Control · Sanitation</option>
                <option value="cleaning">Cleaning Services</option>
                <option value="landscape">Landscape · Outdoor</option>
                <option value="maintenance">Facilities · Mechanical</option>
              </select>
            </Field>
            <Field id="type" label="Project Type" required>
              <select id="type" defaultValue="recurring" required>
                <option value="recurring">Maintenance (Recurring)</option>
                <option value="one-time">One-time project</option>
              </select>
            </Field>
            <Field id="timeframe" label="Project Time Frame" required>
              <input
                id="timeframe"
                defaultValue="29 Jul 2026 → 28 Jul 2027"
                required
              />
            </Field>
            <Field id="budget" label="Estimated Budget">
              <div className="currency-input">
                <span>SGD</span>
                <input id="budget" defaultValue="24,000 (indicative)" />
              </div>
            </Field>
          </div>
        </section>
        <section className="property-card form-card">
          <div className="form-card-heading">
            <span>4</span>
            <div>
              <h2>Task Requirements</h2>
              <p>
                Give merchants enough scope and qualification context to quote
                accurately.
              </p>
            </div>
          </div>
          <div className="form-card-body">
            <Field id="scope" label="Scope of Work" required>
              <textarea
                id="scope"
                defaultValue="Monthly pest control across all common areas of Block A: general inspection, chemical pest treatment, rodent trap checking & resetting, and clean-up. 12 recurring monthly visits over a one-year term."
                required
              />
            </Field>
            <div className="form-grid two-col requirements-row">
              <Field id="documents" label="Required Documents">
                <input
                  id="documents"
                  defaultValue="BizSafe cert, Pest-control licence (NEA), Public liability insurance"
                />
              </Field>
              <Field id="technical" label="Technical / Qualification">
                <input
                  id="technical"
                  defaultValue="Min. 3 years commercial pest-control experience; NEA-registered technicians"
                />
              </Field>
            </div>
          </div>
        </section>
        <div className="form-actions">
          <button
            type="button"
            className="property-btn outline"
            onClick={onBack}
          >
            Cancel
          </button>
          <button
            type="button"
            className="property-btn soft"
            onClick={() => setSaved(true)}
          >
            Save as Draft
          </button>
          <button type="submit" className="property-btn primary">
            <Icon icon={ArrowRight01Icon} size={17} /> Post to Tender Board
          </button>
        </div>
      </form>
      {(saved || posted) && (
        <div className="property-toast" role="status">
          <span>✓</span>
          {posted
            ? "Posted to Tender Board — sent to qualified merchants."
            : "Tender draft saved."}
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => {
              setSaved(false)
              setPosted(false)
            }}
          >
            ×
          </button>
        </div>
      )}
    </>
  )
}

export default function PropertyDashboard({ onExit }: { onExit: () => void }) {
  const [view, setView] = useState<PropertyView>("tender-list")
  return (
    <div className="property-app figma-capture-root">
      <PropertySidebar view={view} onView={setView} />
      <div className="property-workspace">
        <PropertyTopbar />
        <main className="property-main">
          {view === "tender-list" ? (
            <TenderList onCreate={() => setView("tender-create")} />
          ) : (
            <TenderCreate onBack={() => setView("tender-list")} />
          )}
          <button type="button" className="property-exit" onClick={onExit}>
            切换端口
          </button>
        </main>
      </div>
    </div>
  )
}
