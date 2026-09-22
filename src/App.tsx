import Home, { HomeBottomNav } from "../imports/index"
import bannerImg from "./imports/Container__1_.png"
import BookingsPage from "./services/BookingsPage"
import SupportPage from "./services/SupportPage"
import CleaningBooking from "./services/CleaningBooking"
import PestControlBooking from "./services/PestControlBooking"
import PlumbingBooking from "./services/PlumbingBooking"
import ElectricalBooking from "./services/ElectricalBooking"
import HandymanBooking from "./services/HandymanBooking"
import PaintingBooking from "./services/PaintingBooking"
import LandscapingBooking from "./services/LandscapingBooking"
import MovingBooking from "./services/MovingBooking"
import AirconBooking from "./services/AirconBooking"
import HomeSupportBooking from "./services/HomeSupportBooking"
import PropertyDashboard from "./services/PropertyDashboard"
import MerchantDashboard from "./services/MerchantDashboard"
import FinanceDashboard from "./services/FinanceDashboard"
import ReplicatedServicesPage from "./services/ServicesPage"
import LifeStylePage from "./lifestyle/LifeStylePage"
import CopyToFigmaButton from "./components/CopyToFigmaButton"
import ResidentBottomNav from "./components/ResidentBottomNav"
import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Award01Icon,
  Briefcase01Icon,
  Building01Icon,
  Calculator01Icon,
  CalendarClockIcon,
  CheckmarkCircle01Icon,
  FileCheckIcon,
  Home01Icon,
  Store01Icon,
  Task01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"
import pestScene from "./imports/Services/popular-pest-control.png"

const DESIGN_W = 780
// Keep the app viewport at a common iPhone content frame; the shell adds its
// own 10px inset on each side and is intentionally excluded from this size.
const SCREEN_W = 375
const SCREEN_H = 812
const SCALE = SCREEN_W / DESIGN_W

// Services icon (Container20) in the 780px design, after zoom 0.455:
// original: top=494.92px left=47.98px w=171px h=139px
const SERVICES_OVERLAY = {
  top: Math.round(494.92 * SCALE),
  left: Math.round(47.98 * SCALE),
  width: Math.round(171 * SCALE),
  height: Math.round(139 * SCALE),
}

type Screen = "role-select" | "role-preview" | "tender-vote" | "property-dashboard" | "merchant-dashboard" | "finance-dashboard" | "home" | "lifestyle" | "services" | "bookings" | "support" | "cleaning" | "cleaning-step1" | "pest" | "pest-step1" | "plumbing" | "plumbing-step1" | "electrical" | "handyman" | "painting" | "landscaping" | "moving" | "aircon" | "home-support"
type AppRole = "resident" | "property" | "finance" | "merchant"

const validScreens: Screen[] = [
  "role-select", "role-preview", "tender-vote", "property-dashboard",
  "merchant-dashboard", "finance-dashboard", "home", "lifestyle", "services",
  "bookings", "support", "cleaning", "cleaning-step1", "pest", "pest-step1",
  "plumbing", "plumbing-step1", "electrical", "handyman", "painting",
  "landscaping", "moving", "aircon", "home-support",
]

function initialScreen(): Screen {
  const value = new URLSearchParams(window.location.search).get("screen")
  return validScreens.includes(value as Screen) ? (value as Screen) : "home"
}

const ROLE_OPTIONS: {
  id: AppRole
  label: string
  sub: string
  icon: typeof Home01Icon
  accent: string
  available?: boolean
}[] = [
  {
    id: "resident",
    label: "居民端",
    sub: "Resident app",
    icon: Home01Icon,
    accent: "#1c9dd7",
    available: true,
  },
  {
    id: "property",
    label: "物业端",
    sub: "Property management",
    icon: Building01Icon,
    accent: "#16834f",
  },
  {
    id: "finance",
    label: "财务端",
    sub: "Finance workspace",
    icon: Calculator01Icon,
    accent: "#8b5cf6",
  },
  {
    id: "merchant",
    label: "商家端",
    sub: "Merchant workspace",
    icon: Store01Icon,
    accent: "#d97706",
  },
]

function RoleMenu({
  onSelect,
  onTenderVote,
}: {
  onSelect: (role: AppRole) => void
  onTenderVote: () => void
}) {
  return (
    <div
      style={{
        height: SCREEN_H,
        overflowY: "auto",
        background: "#f7fbfd",
        fontFamily: "Inter, sans-serif",
        color: "#16324f",
      }}
    >
      <div
        style={{
          padding: "64px 20px 24px",
          background: "linear-gradient(145deg, #e6f5fb 0%, #f7fbfd 68%)",
          borderBottom: "1px solid #dbeaf2",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "6px 9px",
            borderRadius: 8,
            background: "#ffffff",
            border: "1px solid #dbeaf2",
            color: "#1c9dd7",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 0.6,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 4,
              background: "#1c9dd7",
            }}
          />{" "}
          MARKETPLACE
        </div>
        <h1
          style={{
            margin: "18px 0 7px",
            fontSize: 28,
            lineHeight: 1.12,
            fontWeight: 900,
            letterSpacing: 0,
          }}
        >
          选择使用端
        </h1>
        <p
          style={{
            margin: 0,
            maxWidth: 285,
            fontSize: 12,
            lineHeight: 1.5,
            color: "#6b7787",
          }}
        >
          请选择你的工作空间。当前已开放居民端服务。
        </p>
      </div>
      <main style={{ padding: "18px 16px 26px" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}
        >
          {ROLE_OPTIONS.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => onSelect(role.id)}
              aria-label={`进入${role.label}`}
              style={{
                minHeight: 148,
                padding: "15px 13px 13px",
                border: `1.5px solid ${role.available ? "#a8dff2" : "#dbeaf2"}`,
                borderRadius: 15,
                background: "#fff",
                boxShadow: role.available
                  ? "0 7px 16px rgba(28,157,215,.12)"
                  : "0 4px 12px rgba(20,40,70,.06)",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <span
                style={{
                  width: 43,
                  height: 43,
                  borderRadius: 13,
                  background: `${role.accent}16`,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <HugeiconsIcon
                  icon={role.icon}
                  size={24}
                  color={role.accent}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>
              <span>
                <strong
                  style={{
                    display: "block",
                    fontSize: 15,
                    fontWeight: 900,
                    color: "#16324f",
                  }}
                >
                  {role.label}
                </strong>
                <span
                  style={{
                    display: "block",
                    marginTop: 3,
                    fontSize: 10,
                    lineHeight: 1.25,
                    color: "#7b8997",
                  }}
                >
                  {role.sub}
                </span>
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 9,
                  fontSize: 10,
                  fontWeight: 800,
                  color: role.available ? role.accent : "#9aa6b2",
                }}
              >
                {role.available ? "进入应用" : "查看端口"}
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={15}
                  color={role.available ? role.accent : "#9aa6b2"}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>
            </button>
          ))}
        </div>
        <div
          style={{
            marginTop: 16,
            padding: "11px 12px",
            borderRadius: 11,
            background: "#fff",
            border: "1px solid #dbeaf2",
            color: "#6b7787",
            fontSize: 10,
            lineHeight: 1.45,
          }}
        >
          <strong style={{ color: "#31536f" }}>当前版本</strong>
          <br />
          居民端已开放完整服务下单流程，其他端口将逐步开放。
        </div>
        <button
          type="button"
          onClick={onTenderVote}
          aria-label="进入投标投票"
          style={{
            width: "100%",
            minHeight: 76,
            display: "flex",
            alignItems: "center",
            gap: 11,
            marginTop: 11,
            padding: "12px 13px",
            border: "1px solid #bde4f1",
            borderRadius: 12,
            background: "#fff",
            color: "#16324f",
            textAlign: "left",
            cursor: "pointer",
            boxShadow: "0 5px 14px rgba(28,157,215,.08)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <span
            style={{
              width: 40,
              height: 40,
              flex: "0 0 40px",
              display: "grid",
              placeItems: "center",
              borderRadius: 12,
              background: "#e5f5fb",
              color: "#1c9dd7",
            }}
          >
            <HugeiconsIcon
              icon={Award01Icon}
              size={22}
              color="#1c9dd7"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </span>
          <span style={{ flex: 1 }}>
            <strong style={{ display: "block", fontSize: 13, fontWeight: 900 }}>
              投标投票
            </strong>
            <span
              style={{
                display: "block",
                marginTop: 3,
                color: "#73869a",
                fontSize: 10,
                lineHeight: 1.35,
              }}
            >
              委员会扫码后，在手机上完成投票
            </span>
          </span>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={17}
            color="#1c9dd7"
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </button>
      </main>
    </div>
  )
}

type VoteChoice = "award" | "reject" | "amend"

function TenderVoteMobile({ onBack }: { onBack: () => void }) {
  const [choice, setChoice] = useState<VoteChoice | null>(null)
  const [vendor, setVendor] = useState("GreenShield Pest Solutions")
  const [submitted, setSubmitted] = useState(false)

  const choices: {
    id: VoteChoice
    title: string
    detail: string
    icon: typeof Award01Icon
    color: string
  }[] = [
    {
      id: "award",
      title: "Pick a contractor",
      detail: "Select one shortlisted merchant",
      icon: Award01Icon,
      color: "#1c9dd7",
    },
    {
      id: "reject",
      title: "Reject all bids",
      detail: "Send the tender back for review",
      icon: FileCheckIcon,
      color: "#d76a5b",
    },
    {
      id: "amend",
      title: "Amend the task",
      detail: "Request changes before award",
      icon: Task01Icon,
      color: "#a16a1b",
    },
  ]
  const vendors = [
    {
      name: "GreenShield Pest Solutions",
      meta: "NEA licensed · 3 years experience",
      price: "SGD 8,400 / year",
      tag: "Lowest bid",
    },
    {
      name: "PestGuard Services",
      meta: "BizSafe 3 · 24/7 response",
      price: "SGD 9,120 / year",
      tag: "Best response",
    },
    {
      name: "SafeNest Hygiene",
      meta: "ISO 9001 · Monthly reporting",
      price: "SGD 10,200 / year",
      tag: "Strong compliance",
    },
  ]

  if (submitted) {
    return (
      <div className="tender-vote-page tender-vote-success">
        <header className="tender-vote-simple-header">
          <button type="button" onClick={onBack}>
            ‹ 返回
          </button>
        </header>
        <main>
          <span className="tender-vote-success-icon">
            <HugeiconsIcon
              icon={CheckmarkCircle01Icon}
              size={42}
              color="#268657"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </span>
          <h1>Vote recorded</h1>
          <p>
            Your council decision for Annual Pest Control Services 2026 has been
            securely saved.
          </p>
          <div className="tender-vote-result">
            <span>Decision</span>
            <strong>
              {choice === "award"
                ? `Pick · ${vendor}`
                : choice === "reject"
                  ? "Reject all bids"
                  : "Amend the task"}
            </strong>
            <small>Recorded 21 Aug 2026 · Council session</small>
          </div>
          <button
            type="button"
            className="tender-vote-primary"
            onClick={onBack}
          >
            Return to start
          </button>
        </main>
      </div>
    )
  }

  return (
    <div className="tender-vote-page">
      <header className="tender-vote-header">
        <button
          type="button"
          className="tender-vote-back"
          onClick={onBack}
          aria-label="返回端口选择"
        >
          <HugeiconsIcon
            icon={ArrowLeft01Icon}
            size={16}
            color="#1c9dd7"
            strokeWidth={1.8}
          />{" "}
          返回
        </button>
        <div className="tender-vote-heading">
          <div>
            <span>Council session</span>
            <h1>投标投票</h1>
          </div>
          <strong>
            <i /> Voting open
          </strong>
        </div>
      </header>
      <main className="tender-vote-main">
        <section className="tender-vote-project">
          <img src={pestScene} alt="Pest control service scene" />
          <div className="tender-vote-project-body">
            <div>
              <span>TDR-2026-00157</span>
              <h2>Annual Pest Control Services 2026</h2>
            </div>
            <strong>05 Jun 2026</strong>
            <p>15 Scotts · Pest Control · Sanitation</p>
          </div>
        </section>
        <div className="tender-vote-guide">
          <span>i</span>
          <p>
            This vote is recorded for the council meeting. Review the
            shortlisted proposals, then submit one decision.
          </p>
        </div>
        <h2 className="tender-vote-section-title">Choose an outcome</h2>
        <div className="tender-vote-options">
          {choices.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setChoice(item.id)}
              aria-pressed={choice === item.id}
              style={{ "--vote-color": item.color } as React.CSSProperties}
              className={choice === item.id ? "selected" : ""}
            >
              <span className="tender-vote-option-icon">
                <HugeiconsIcon
                  icon={item.icon}
                  size={19}
                  color={item.color}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.detail}</small>
              </span>
              <i>{choice === item.id && <b />}</i>
            </button>
          ))}
        </div>
        {choice === "award" && (
          <section className="tender-vote-contractors">
            <div className="tender-vote-contractors-heading">
              <h2>Select contractor</h2>
              <span>3 shortlisted</span>
            </div>
            <div>
              {vendors.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setVendor(item.name)}
                  aria-pressed={vendor === item.name}
                  className={vendor === item.name ? "selected" : ""}
                >
                  <div>
                    <span className="tender-vendor-icon">
                      <HugeiconsIcon
                        icon={UserGroupIcon}
                        size={13}
                        color="currentColor"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                    <strong>{item.name}</strong>
                    <b>{item.price}</b>
                  </div>
                  <p>
                    <span>{item.meta}</span>
                    <em>{item.tag}</em>
                  </p>
                </button>
              ))}
            </div>
          </section>
        )}
        {choice === "reject" && (
          <div className="tender-vote-note reject">
            <label htmlFor="reject-reason">Reason for rejecting all bids</label>
            <textarea
              id="reject-reason"
              placeholder="Add a short council note"
            />
          </div>
        )}
        {choice === "amend" && (
          <div className="tender-vote-note amend">
            <label htmlFor="amend-note">Requested amendment</label>
            <textarea
              id="amend-note"
              placeholder="Describe the scope or budget change"
            />
          </div>
        )}
        <section className="tender-vote-record">
          <span>
            <HugeiconsIcon
              icon={CalendarClockIcon}
              size={18}
              color="#6b8295"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </span>
          <div>
            <strong>Council meeting record</strong>
            <small>
              18 Apr 2026 · Minutes will be attached by the managing agent
            </small>
          </div>
          <b>Ready</b>
        </section>
        <button
          type="button"
          className="tender-vote-primary"
          onClick={() => setSubmitted(true)}
          disabled={!choice}
        >
          Submit council decision
        </button>
        <p className="tender-vote-consent">
          By submitting, you confirm this reflects the committee's recorded
          decision.
        </p>
      </main>
    </div>
  )
}

function RolePreview({
  role,
  onBack,
  onResident,
}: {
  role: AppRole
  onBack: () => void
  onResident: () => void
}) {
  const option =
    ROLE_OPTIONS.find((item) => item.id === role) ?? ROLE_OPTIONS[0]
  return (
    <div
      style={{
        height: SCREEN_H,
        display: "flex",
        flexDirection: "column",
        background: "#f7fbfd",
        fontFamily: "Inter, sans-serif",
        color: "#16324f",
      }}
    >
      <div
        style={{
          padding: "64px 20px 22px",
          background: "#eaf7fb",
          borderBottom: "1px solid #dbeaf2",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            minHeight: 44,
            padding: 0,
            border: 0,
            background: "transparent",
            color: "#1c9dd7",
            fontSize: 12,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          ‹ 返回端选择
        </button>
      </div>
      <main style={{ flex: 1, padding: "34px 20px" }}>
        <span
          style={{
            width: 62,
            height: 62,
            borderRadius: 18,
            background: `${option.accent}16`,
            display: "grid",
            placeItems: "center",
          }}
        >
          <HugeiconsIcon
            icon={option.icon}
            size={33}
            color={option.accent}
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </span>
        <h1
          style={{
            margin: "20px 0 8px",
            fontSize: 25,
            fontWeight: 900,
            letterSpacing: 0,
          }}
        >
          {option.label}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            lineHeight: 1.55,
            color: "#6b7787",
          }}
        >
          该端口正在建设中，当前可用的是居民端完整服务流程。
        </p>
        <button
          type="button"
          onClick={onResident}
          style={{
            width: "100%",
            minHeight: 48,
            marginTop: 26,
            border: 0,
            borderRadius: 12,
            background: "#1c9dd7",
            color: "#fff",
            fontSize: 13,
            fontWeight: 900,
            cursor: "pointer",
            boxShadow: "0 7px 15px rgba(28,157,215,.2)",
          }}
        >
          进入居民端
        </button>
      </main>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>(initialScreen)
  const [selectedRole, setSelectedRole] = useState<AppRole>("resident")

  if (screen === "property-dashboard") {
    return (
      <>
        <PropertyDashboard onSwitchPortal={setScreen} />
        <CopyToFigmaButton />
      </>
    )
  }

  if (screen === "merchant-dashboard") {
    return (
      <>
        <MerchantDashboard onSwitchPortal={setScreen} />
        <CopyToFigmaButton />
      </>
    )
  }

  if (screen === "finance-dashboard") {
    return (
      <>
        <FinanceDashboard onSwitchPortal={setScreen} />
        <CopyToFigmaButton />
      </>
    )
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center overflow-x-hidden bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 py-16">
        {/* ── Phone shell ── */}
        <div
          className="figma-capture-root"
          style={{
            position: "relative",
            width: SCREEN_W + 20,
            maxWidth: "calc(100% - 20px)",
            height: SCREEN_H + 20,
            boxSizing: "border-box",
            borderRadius: 54,
            background:
              "linear-gradient(160deg, #2e2e2e 0%, #1a1a1a 60%, #111 100%)",
            boxShadow:
              "0 0 0 1px #444, 0 0 0 3px #0a0a0a, 0 50px 140px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.1)",
            flexShrink: 0,
          }}
        >
          {/* Side buttons */}
          <div
            style={{
              position: "absolute",
              left: -4,
              top: 160,
              width: 4,
              height: 34,
              background: "#252525",
              borderRadius: "3px 0 0 3px",
              boxShadow: "-1px 0 0 #0a0a0a",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -4,
              top: 208,
              width: 4,
              height: 34,
              background: "#252525",
              borderRadius: "3px 0 0 3px",
              boxShadow: "-1px 0 0 #0a0a0a",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -4,
              top: 200,
              width: 4,
              height: 68,
              background: "#252525",
              borderRadius: "0 3px 3px 0",
              boxShadow: "1px 0 0 #0a0a0a",
            }}
          />

          {/* ── Screen ── */}
          <div
            style={{
              position: "absolute",
              inset: 10,
              borderRadius: 46,
              overflow: "hidden",
              background: "#fafcfe",
            }}
          >
            {/* Dynamic island — always on top */}
            <div
              style={{
                position: "absolute",
                top: 12,
                left: "50%",
                transform: "translateX(-50%)",
                width: 110,
                height: 30,
                background: "#111",
                borderRadius: 20,
                zIndex: 60,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 10,
                  height: 10,
                  background: "#1a1a1a",
                  borderRadius: "50%",
                  top: 10,
                  right: 20,
                  boxShadow: "inset 0 0 0 2px #222",
                }}
              />
            </div>

            {/* ── Resident home ── */}
            {screen === "role-select" && (
              <RoleMenu
                onTenderVote={() => setScreen("tender-vote")}
                onSelect={(role) => {
                  setSelectedRole(role)
                  setScreen(
                    role === "resident"
                      ? "home"
                      : role === "property"
                        ? "property-dashboard"
                        : role === "merchant"
                          ? "merchant-dashboard"
                          : role === "finance"
                            ? "finance-dashboard"
                            : "role-preview",
                  )
                }}
              />
            )}

            {screen === "tender-vote" && (
              <TenderVoteMobile onBack={() => setScreen("role-select")} />
            )}

            {screen === "role-preview" && (
              <RolePreview
                role={selectedRole}
                onBack={() => setScreen("role-select")}
                onResident={() => {
                  setSelectedRole("resident")
                  setScreen("home")
                }}
              />
            )}

            {screen === "home" && (
              <div
                style={{
                  height: SCREEN_H,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: SCREEN_W,
                    height: SCREEN_H,
                    overflowY: "auto",
                    overflowX: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    className="figma-design-canvas"
                    style={{
                      width: DESIGN_W,
                      zoom: SCALE,
                      position: "relative",
                    }}
                  >
                    <Home
                      onServicesClick={() => setScreen("services")}
                      onLifestyleClick={() => setScreen("lifestyle")}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 681.91,
                        left: 32,
                        width: 716.016,
                        height: 236.523,
                        borderRadius: 32,
                        overflow: "hidden",
                        pointerEvents: "none",
                        background: "#dceef8",
                      }}
                    >
                      <img
                        src={bannerImg}
                        alt="Home services, guaranteed by YY"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    left: 0,
                    height: 205 * SCALE,
                    overflow: "hidden",
                    zIndex: 20,
                  }}
                >
                  <div
                    className="figma-design-canvas"
                    style={{
                      width: DESIGN_W,
                      height: 205,
                      zoom: SCALE,
                      position: "relative",
                    }}
                  >
                    <HomeBottomNav />
                  </div>
                </div>
              </div>
            )}

            {screen === "lifestyle" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <LifeStylePage
                  onBack={() => setScreen("home")}
                  onHome={() => setScreen("home")}
                  onOpenBookings={() => setScreen("bookings")}
                  onOpenSupport={() => setScreen("support")}
                  initialPath={new URLSearchParams(window.location.search).get("lifestylePath") || undefined}
                  initialStyle={new URLSearchParams(window.location.search).get("lifestyleStyle") || undefined}
                />
              </div>
            )}

            {/* ── Mobile Interface Replication Services page ── */}
            {screen === "services" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <ReplicatedServicesPage
                  onBack={() => setScreen("home")}
                  onHome={() => setScreen("home")}
                  onSelectCleaning={() => setScreen("cleaning")}
                  onSelectPest={() => setScreen("pest")}
                  onSelectPlumbing={() => setScreen("plumbing")}
                  onSelectElectrical={() => setScreen("electrical")}
                  onSelectHandyman={() => setScreen("handyman")}
                  onSelectPainting={() => setScreen("painting")}
                  onSelectLandscaping={() => setScreen("landscaping")}
                  onSelectMoving={() => setScreen("moving")}
                  onSelectAircon={() => setScreen("aircon")}
                  onSelectSupportService={() => setScreen("home-support")}
                  onBookCleaning={() => setScreen("cleaning-step1")}
                  onBookPest={() => setScreen("pest-step1")}
                  onBookPlumbing={() => setScreen("plumbing-step1")}
                  onOpenBookings={() => setScreen("bookings")}
                  onOpenSupport={() => setScreen("support")}
                />
              </div>
            )}

            {/* ── Cleaning booking flow ── */}
            {screen === "bookings" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <BookingsPage
                  onBack={() => setScreen("services")}
                  onSelectCleaning={() => setScreen("cleaning")}
                  onSelectPest={() => setScreen("pest")}
                  onOpenSupport={() => setScreen("support")}
                />
              </div>
            )}

            {screen === "support" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <SupportPage
                  onBack={() => setScreen("services")}
                  onOpenBookings={() => setScreen("bookings")}
                />
              </div>
            )}

            {screen === "cleaning" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <CleaningBooking
                  onBack={() => setScreen("services")}
                  onDone={() => setScreen("services")}
                />
              </div>
            )}

            {screen === "cleaning-step1" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <CleaningBooking
                  onBack={() => setScreen("services")}
                  onDone={() => setScreen("services")}
                  initialStep={1}
                />
              </div>
            )}

            {/* Pest control booking flow */}
            {screen === "pest" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <PestControlBooking
                  onBack={() => setScreen("services")}
                  onDone={() => setScreen("services")}
                />
              </div>
            )}

            {screen === "pest-step1" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <PestControlBooking
                  onBack={() => setScreen("services")}
                  onDone={() => setScreen("services")}
                  initialStep={1}
                />
              </div>
            )}

            {screen === "plumbing" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <PlumbingBooking
                  onBack={() => setScreen("services")}
                  onDone={() => setScreen("services")}
                />
              </div>
            )}

            {screen === "plumbing-step1" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <PlumbingBooking
                  onBack={() => setScreen("services")}
                  onDone={() => setScreen("services")}
                  initialStep={1}
                />
              </div>
            )}

            {screen === "electrical" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <ElectricalBooking
                  onBack={() => setScreen("services")}
                  onDone={() => setScreen("home")}
                />
              </div>
            )}

            {screen === "handyman" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <HandymanBooking
                  onBack={() => setScreen("services")}
                  onDone={() => setScreen("home")}
                />
              </div>
            )}

            {screen === "painting" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <PaintingBooking
                  onBack={() => setScreen("services")}
                  onDone={() => setScreen("home")}
                />
              </div>
            )}

            {screen === "landscaping" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <LandscapingBooking
                  onBack={() => setScreen("services")}
                  onDone={() => setScreen("home")}
                />
              </div>
            )}

            {screen === "moving" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <MovingBooking
                  onBack={() => setScreen("services")}
                  onDone={() => setScreen("home")}
                />
              </div>
            )}

            {screen === "aircon" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <AirconBooking
                  onBack={() => setScreen("services")}
                  onDone={() => setScreen("home")}
                />
              </div>
            )}

            {screen === "home-support" && (
              <div style={{ height: SCREEN_H, overflow: "hidden" }}>
                <HomeSupportBooking
                  onBack={() => setScreen("services")}
                  onDone={() => setScreen("home")}
                />
              </div>
            )}
          </div>

          {/* Screen glare */}
          <div
            style={{
              position: "absolute",
              inset: 10,
              borderRadius: 46,
              background:
                "linear-gradient(130deg, rgba(255,255,255,0.06) 0%, transparent 45%)",
              pointerEvents: "none",
              zIndex: 50,
            }}
          />
        </div>
      </div>
      <CopyToFigmaButton />
    </>
  )
}
