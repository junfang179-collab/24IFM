import { useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  Briefcase01Icon,
  DashboardSquare01Icon,
  Delete02Icon,
  FileAttachmentIcon,
  FileUploadIcon,
  File01Icon,
  GraduationCapIcon,
  Invoice01Icon,
  Menu01Icon,
  MoneyReceive01Icon,
  Notification01Icon,
  Search01Icon,
  Settings01Icon,
  Store01Icon,
} from "@hugeicons/core-free-icons"
import logoDark from "../imports/logo-dark.png"

type MerchantView = "bid-request"

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

function MerchantSidebar({
  view,
  onView,
}: {
  view: MerchantView
  onView: (view: MerchantView) => void
}) {
  const [tenderOpen, setTenderOpen] = useState(true)
  return (
    <aside className="property-sidebar merchant-sidebar">
      <div className="property-logo">
        <img src={logoDark} alt="24iFM" />
      </div>
      <div className="merchant-nav-label">Home</div>
      <nav aria-label="Merchant navigation">
        <button type="button" className="property-nav-item">
          <Icon icon={DashboardSquare01Icon} size={19} />
          <span>Dashboard</span>
        </button>
        <div className="merchant-nav-label app-label">Apps &amp; Pages</div>
        <button type="button" className="property-nav-item">
          <Icon icon={Settings01Icon} size={19} />
          <span>System</span>
          <Icon icon={ArrowDown01Icon} size={14} />
        </button>
        <button type="button" className="property-nav-item">
          <Icon icon={GraduationCapIcon} size={19} />
          <span>Education</span>
          <Icon icon={ArrowRight01Icon} size={14} />
        </button>
        <button type="button" className="property-nav-item">
          <Icon icon={Invoice01Icon} size={19} />
          <span>Orders</span>
        </button>
        <button type="button" className="property-nav-item">
          <Icon icon={MoneyReceive01Icon} size={19} />
          <span>Settlements</span>
          <Icon icon={ArrowRight01Icon} size={14} />
        </button>
        <button
          type="button"
          className={`property-nav-item merchant-tender-nav ${
            view === "bid-request" ? "active" : ""
          }`}
          onClick={() => setTenderOpen((open) => !open)}
          aria-expanded={tenderOpen}
          aria-controls="merchant-tender-subnav"
        >
          <Icon icon={Briefcase01Icon} size={19} />
          <span>Tender Bidding</span>
          <span className={`nav-chevron ${tenderOpen ? "open" : ""}`}>
            <Icon icon={ArrowDown01Icon} size={15} />
          </span>
        </button>
        {tenderOpen && (
          <div className="property-subnav" id="merchant-tender-subnav">
            <button
              type="button"
              className="property-subnav-item active"
              onClick={() => onView("bid-request")}
            >
              <span>Bid Request</span>
              <span className="subnav-count">1</span>
            </button>
            <button
              type="button"
              className="property-subnav-item disabled"
              disabled
            >
              <span>Submit Quotation</span>
              <span className="subnav-state">Soon</span>
            </button>
            <button
              type="button"
              className="property-subnav-item disabled"
              disabled
            >
              <span>Outcome</span>
              <span className="subnav-state">Soon</span>
            </button>
            <button
              type="button"
              className="property-subnav-item disabled"
              disabled
            >
              <span>Deliver &amp; Evidence</span>
              <span className="subnav-state">Soon</span>
            </button>
            <button
              type="button"
              className="property-subnav-item disabled"
              disabled
            >
              <span>Invoice &amp; Settlements</span>
              <span className="subnav-state">Soon</span>
            </button>
          </div>
        )}
      </nav>
    </aside>
  )
}

function MerchantTopbar() {
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
          <div className="profile-avatar merchant-avatar">GS</div>
          <div>
            <strong>GreenShield</strong>
            <small>Merchant account</small>
          </div>
          <Icon icon={ArrowDown01Icon} size={14} />
        </div>
      </div>
    </header>
  )
}

function MerchantBidRequest() {
  const [notice, setNotice] = useState("")
  return (
    <>
      <div className="property-page-heading">
        <div>
          <div className="property-crumb">
            Tenders <span>›</span> <b>Bid Request</b>
          </div>
          <h1>Tender Bidding</h1>
          <p>Annual Pest Control Services 2026 · 15 Scotts</p>
        </div>
        <span className="merchant-persona-pill">
          <Icon icon={Store01Icon} size={15} /> GreenShield
        </span>
      </div>
      <div className="merchant-guide">
        <div className="guide-icon">i</div>
        <div>
          <strong>Bid Request — review before you respond</strong>
          <p>
            The managing agent invited your company to quote. Review the full
            scope and required documents before the response deadline.
          </p>
        </div>
      </div>
      <section className="property-card form-card merchant-request-card">
        <div className="form-card-heading">
          <span>1</span>
          <div>
            <h2>Bid Request — TDR-2026-00157</h2>
            <p>Annual Pest Control Services 2026</p>
          </div>
          <span className="merchant-status-pill">Invited</span>
        </div>
        <div className="form-card-body">
          <div className="form-grid two-col">
            <MerchantField
              label="Project Title"
              value="Annual Pest Control Services 2026"
            />
            <MerchantField
              label="Site"
              value="Block A – Office Tower, 15 Scotts"
            />
            <MerchantField label="Category" value="Pest Control · Sanitation" />
            <MerchantField
              label="Contract Period"
              value="29 Jul 2026 → 28 Jul 2027"
            />
            <MerchantField
              label="Submission Deadline"
              value="05 Jun 2026, 05:00 PM"
            />
            <MerchantField
              label="Site Visit / Briefing"
              value="28 May 2026, 10:00 AM"
            />
          </div>
          <MerchantField
            label="Scope of Work"
            value="Monthly pest control across all common areas: general inspection, chemical treatment, rodent trap checking & resetting, clean-up. 12 recurring monthly visits over a one-year term."
            multiline
          />
          <MerchantDocuments />
        </div>
      </section>
      <div className="merchant-actions">
        <button
          type="button"
          className="property-btn merchant-decline"
          onClick={() =>
            setNotice("Tender declined for this merchant account.")
          }
        >
          Decline tender
        </button>
        <button
          type="button"
          className="property-btn primary merchant-next"
          onClick={() =>
            setNotice("Submit Quotation is prepared for the next build phase.")
          }
        >
          <Icon icon={ArrowRight01Icon} size={17} /> Prepare quotation
        </button>
      </div>
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

type MerchantDocument = { id: string name: string meta: string }

function MerchantDocuments() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [documents, setDocuments] = useState<MerchantDocument[]>([
    { id: "bizsafe", name: "BizSafe Certificate.pdf", meta: "PDF · 1.2 MB" },
    { id: "nea", name: "NEA Pest-control Licence.pdf", meta: "PDF · 842 KB" },
    {
      id: "insurance",
      name: "Public Liability Insurance.pdf",
      meta: "PDF · 2.4 MB",
    },
  ])

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) return
    const additions = Array.from(files).map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      name: file.name,
      meta: `${file.type.split("/").pop()?.toUpperCase() || "FILE"} · ${formatFileSize(file.size)}`,
    }))
    setDocuments((current) => [...current, ...additions])
  }

  return (
    <div className="merchant-field merchant-documents wide">
      <div className="merchant-documents-heading">
        <div>
          <label>Required Documents</label>
          <small>Attach all documents requested in the bid brief.</small>
        </div>
        <span>{documents.length} files</span>
      </div>
      <div className="merchant-upload-list">
        {documents.map((document) => (
          <div className="merchant-upload-row" key={document.id}>
            <span className="merchant-upload-icon">
              <Icon icon={FileAttachmentIcon} size={17} color="#1c9dd7" />
            </span>
            <span className="merchant-upload-info">
              <strong>{document.name}</strong>
              <small>{document.meta}</small>
            </span>
            <button
              type="button"
              className="merchant-upload-remove"
              onClick={() =>
                setDocuments((current) =>
                  current.filter((item) => item.id !== document.id),
                )
              }
              aria-label={`Remove ${document.name}`}
            >
              <Icon icon={Delete02Icon} size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="merchant-add-document"
          onClick={() => inputRef.current?.click()}
        >
          <span>
            <Icon icon={FileUploadIcon} size={16} />
          </span>
          <strong>
            <Icon icon={Add01Icon} size={14} /> Add document
          </strong>
          <small>PDF, DOCX, XLSX, JPG or PNG · multiple files allowed</small>
        </button>
      </div>
      <input
        ref={inputRef}
        className="merchant-file-input"
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
        onChange={(event) => {
          handleFiles(event.currentTarget.files)
          event.currentTarget.value = ""
        }}
      />
    </div>
  )
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function MerchantField({
  label,
  value,
  multiline = false,
  hint = "",
}: {
  label: string
  value: string
  multiline?: boolean
  hint?: string
}) {
  return (
    <div className={`merchant-field ${multiline ? "wide" : ""}`}>
      <label>{label}</label>
      <div className={`merchant-field-value ${multiline ? "multiline" : ""}`}>
        {value}
      </div>
      {hint && <small>{hint}</small>}
    </div>
  )
}

export default function MerchantDashboard({ onExit }: { onExit: () => void }) {
  const [view, setView] = useState<MerchantView>("bid-request")
  return (
    <div className="property-app figma-capture-root merchant-app">
      <MerchantSidebar view={view} onView={setView} />
      <div className="property-workspace">
        <MerchantTopbar />
        <main className="property-main">
          {view === "bid-request" && <MerchantBidRequest />}
          <button type="button" className="property-exit" onClick={onExit}>
            切换端口
          </button>
        </main>
      </div>
    </div>
  )
}
