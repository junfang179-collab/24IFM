import { useMemo, useState, type CSSProperties, type ReactNode } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  Add01Icon,
  Alert02Icon,
  ArrowRight01Icon,
  Building01Icon,
  Calendar03Icon,
  CheckmarkCircle01Icon,
  ChevronDownIcon,
  Cancel01Icon,
  ChartBarBigIcon,
  Clock03Icon,
  JusticeScale01Icon,
  Copy01Icon,
  Doc01Icon,
  ExternalLinkIcon,
  HashIcon,
  InformationCircleIcon,
  Location01Icon,
  Notification01Icon,
  Pdf01Icon,
  RefreshIcon,
  Share08Icon,
  UserAdd02Icon,
  UserMultipleIcon,
  UserSharingIcon,
  Xls01Icon,
} from "@hugeicons/core-free-icons"
import StyleTwoPageHeader from "./StyleTwoPageHeader"

const C = {
  primary: "#1c9dd7",
  primarySoft: "#e8f6fd",
  navy: "#16324f",
  text: "#314b62",
  muted: "#6b7f91",
  line: "#dcebf3",
  surface: "#f6fbfe",
  white: "#ffffff",
  success: "#16835c",
  successSoft: "#e2f6ec",
  graySoft: "#eef1f4",
  grayText: "#8296a5",
}

type MeetingKind = "AGM" | "EGM"
type MeetingStatus = "ongoing" | "notified" | "finished"
type Filter = "all" | "upcoming" | "live" | "finished"

interface MeetingUnit {
  name: string
  shares: string
  pass: string
  proxyPass: string
}

interface Meeting {
  id: string
  kind: MeetingKind
  status: MeetingStatus
  day: string
  month: string
  title: string
  venue: string
  when: string
  room: string
  /* detail view */
  code: string
  quorum: string
  dateChip: string
  timeChip: string
  dateLong: string
  proxyCloses: string | null
  units: MeetingUnit[]
}

const MEETINGS: Meeting[] = [
  {
    id: "egm-1105",
    kind: "EGM",
    status: "ongoing",
    day: "05",
    month: "NOV",
    title: "Lift Replacement Programme",
    venue: "Marina Bay Residences",
    when: "Today · 19:30",
    room: "Function Room, Level 3",
    code: "CR-EGM11",
    quorum: "30% of share values",
    dateChip: "05 Nov 2026",
    timeChip: "19:30",
    dateLong: "Thu, 05 Nov 2026 · 07:30 PM",
    proxyCloses: null,
    units: [
      { name: "#12-08 Tower A", shares: "8.00", pass: "482913", proxyPass: "215043" },
      { name: "#05-11 Tower B", shares: "7.00", pass: "731204", proxyPass: "683271" },
    ],
  },
  {
    id: "agm-1121",
    kind: "AGM",
    status: "notified",
    day: "21",
    month: "NOV",
    title: "18th Annual General Meeting",
    venue: "Palm Gardens Condominium",
    when: "Sat, 21 Nov 2026 · 10:00",
    room: "Function Room, Level 3",
    code: "CR-AGM27",
    quorum: "30% of share values",
    dateChip: "21 Nov 2026",
    timeChip: "10:00",
    dateLong: "Sat, 21 Nov 2026 · 10:00 AM",
    proxyCloses: "Closes 19 Nov 2026, 10:00 · 48 hours before the meeting",
    units: [
      { name: "#12-08 Tower A", shares: "8.00", pass: "482913", proxyPass: "604218" },
      { name: "#05-11 Tower B", shares: "7.00", pass: "731204", proxyPass: "351790" },
    ],
  },
  {
    id: "agm-1018",
    kind: "AGM",
    status: "finished",
    day: "18",
    month: "OCT",
    title: "17th Annual General Meeting",
    venue: "Palm Gardens Condominium",
    when: "Sun, 18 Oct 2026 · 10:00",
    room: "Function Room, Level 3",
    code: "CR-AGM17",
    quorum: "30% of share values",
    dateChip: "18 Oct 2026",
    timeChip: "10:00",
    dateLong: "Sun, 18 Oct 2026 · 10:00 AM",
    proxyCloses: null,
    units: [
      { name: "#12-08 Tower A", shares: "8.00", pass: "481902", proxyPass: "771902" },
      { name: "#05-11 Tower B", shares: "7.00", pass: "703316", proxyPass: "440516" },
    ],
  },
]

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "upcoming", label: "Upcoming" },
  { key: "live", label: "Live" },
  { key: "finished", label: "Finished" },
]

const STATUS_META: Record<
  MeetingStatus,
  { label: string; bg: string; color: string }
> = {
  ongoing: { label: "ONGOING", bg: C.successSoft, color: C.success },
  notified: { label: "NOTIFIED", bg: C.primarySoft, color: C.primary },
  finished: { label: "FINISHED", bg: C.graySoft, color: C.grayText },
}

function matchesFilter(meeting: Meeting, filter: Filter): boolean {
  if (filter === "all") return true
  if (filter === "live") return meeting.status === "ongoing"
  if (filter === "finished") return meeting.status === "finished"
  return meeting.status === "notified"
}

/* ----------------------- Two-phone side-by-side shell ----------------------- */

const SCREEN_W = 375
const SCREEN_H = 812

/** Duplicated phone bezel used by the AGM two-phone workspace. */
function PhoneShell({ children }: { children: ReactNode }) {
  return (
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

      {/* Screen */}
      <div
        style={{
          position: "absolute",
          inset: 10,
          borderRadius: 46,
          overflow: "hidden",
          background: "#fafcfe",
        }}
      >
        {/* Dynamic island */}
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

        {children}

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
  )
}

/**
 * AGM module workspace: two phones side by side — the left one shows the
 * meetings list, the right one shows the details of the selected meeting.
 * Selecting a card updates the right phone instead of navigating.
 */
export function OwnersMeetingsWorkspace({
  onBack,
}: {
  onBack: () => void
}) {
  const [selectedId, setSelectedId] = useState<string>(MEETINGS[0].id)
  const selected = MEETINGS.find((m) => m.id === selectedId) ?? null

  /* Proxy appointment form state, shared by the form phone and the
     "Proxy appointed" phone. */
  const [proxyUnit, setProxyUnit] = useState<string>(MEETINGS[0].units[0].name)
  const [proxyName, setProxyName] = useState("Tan Wei Ming")
  const [proxyMobile, setProxyMobile] = useState("+65 9123 4401")

  /* Per-unit proxy appointments (demo state), shared with the Proxy phone. */
  const [appointments, setAppointments] = useState<
    Record<string, { name: string; mobile: string }>
  >(() => ({
    "egm-1105::#12-08 Tower A": { name: "Tan Wei Ming", mobile: "+65 9123 4401" },
    "agm-1121::#12-08 Tower A": { name: "Tan Wei Ming", mobile: "+65 9123 4401" },
    "agm-1018::#12-08 Tower A": { name: "Lim Mei Ling", mobile: "+65 8301 2214" },
  }))

  const currentAppointment = selected
    ? appointments[`${selected.id}::${proxyUnit}`] ?? null
    : null

  const handleSelectMeeting = (id: string) => {
    setSelectedId(id)
    const meeting = MEETINGS.find((m) => m.id === id)
    if (meeting) setProxyUnit(meeting.units[0].name)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center overflow-x-auto bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 py-16"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 44,
          padding: "0 22px",
          justifyContent: "center",
        }}
      >
        <PhoneShell>
          <OwnersMeetingsList
            selectedId={selectedId}
            onSelect={handleSelectMeeting}
            onBack={onBack}
          />
        </PhoneShell>

        <PhoneShell>
          {selected && <MeetingDetailsPage meeting={selected} />}
        </PhoneShell>

        <PhoneShell>
          {selected && (
            <ProxyFormPage
              meeting={selected}
              unit={proxyUnit}
              onUnitChange={setProxyUnit}
              name={proxyName}
              onNameChange={setProxyName}
              mobile={proxyMobile}
              onMobileChange={setProxyMobile}
            />
          )}
        </PhoneShell>

        <PhoneShell>
          {selected && (
            <ProxyAppointedPage
              meeting={selected}
              unit={proxyUnit}
              name={currentAppointment?.name ?? proxyName}
              mobile={currentAppointment?.mobile ?? proxyMobile}
            />
          )}
        </PhoneShell>

        <PhoneShell>
          <ProxyPage />
        </PhoneShell>

        <PhoneShell>
          <MeetingDetailsAfterPage />
        </PhoneShell>

        <PhoneShell>
          <VotingResultsPage />
        </PhoneShell>

        <PhoneShell>
          <DocumentsPage />
        </PhoneShell>
      </div>
    </div>
  )
}

/* ------------------------------ Meetings list ------------------------------ */

export function OwnersMeetingsList({
  selectedId,
  onSelect,
  onBack,
}: {
  selectedId: string
  onSelect: (id: string) => void
  onBack: () => void
}) {
  const [filter, setFilter] = useState<Filter>("all")

  const visible = useMemo(
    () => MEETINGS.filter((m) => matchesFilter(m, filter)),
    [filter],
  )

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <StyleTwoPageHeader
        title="Owners' meetings"
        onBack={onBack}
        backLabel="Back to home"
        trailing={
          <button
            type="button"
            aria-label="Notifications"
            title="Notifications"
            style={{
              width: 44,
              height: 44,
              minWidth: 44,
              border: "none",
              borderRadius: "50%",
              background: C.primarySoft,
              color: C.primary,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            <HugeiconsIcon
              icon={Notification01Icon}
              size={20}
              color={C.primary}
              strokeWidth={1.8}
            />
          </button>
        }
      />

      {/* Filter chips */}
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          gap: 8,
          padding: "12px 16px 12px",
          background: C.white,
          borderBottom: `1px solid ${C.line}`,
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {FILTERS.map((f) => {
          const active = filter === f.key
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={active}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexShrink: 0,
                padding: "7px 14px",
                border: active ? "none" : `1px solid ${C.line}`,
                borderRadius: 999,
                background: active ? C.primary : C.white,
                color: active ? C.white : C.text,
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {f.label}
              {f.key === "all" && (
                <span
                  style={{
                    minWidth: 17,
                    height: 17,
                    padding: "0 4px",
                    borderRadius: 999,
                    display: "grid",
                    placeItems: "center",
                    background: active ? "rgba(255,255,255,0.28)" : C.primarySoft,
                    color: active ? C.white : C.primary,
                    fontSize: 9,
                    fontWeight: 900,
                  }}
                >
                  {MEETINGS.length}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Meeting cards */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 16px 20px",
          scrollbarWidth: "none",
        }}
      >
        {visible.length === 0 ? (
          <div
            style={{
              marginTop: 36,
              textAlign: "center",
              color: C.muted,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            No meetings in this view
          </div>
        ) : (
          visible.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              selected={meeting.id === selectedId}
              onClick={() => onSelect(meeting.id)}
            />
          ))
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 14,
            color: C.muted,
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {visible.length} meetings · page 1
        </div>
      </main>
    </div>
  )
}

function MeetingCard({
  meeting,
  selected,
  onClick,
}: {
  meeting: Meeting
  selected: boolean
  onClick: () => void
}) {
  const status = STATUS_META[meeting.status]
  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick()
        }
      }}
      style={{
        background: C.white,
        border: selected ? `1.5px solid ${C.primary}` : `1px solid ${C.line}`,
        borderRadius: 15,
        padding: "13px 12px 13px 12px",
        marginBottom: 12,
        display: "flex",
        alignItems: "stretch",
        gap: 11,
        boxShadow: selected
          ? "0 6px 16px rgba(28, 157, 215, 0.18)"
          : "0 4px 13px rgba(34, 78, 110, 0.05)",
        cursor: "pointer",
      }}
    >
      {/* Date block */}
      <div
        style={{
          flexShrink: 0,
          width: 54,
          borderRadius: 12,
          background: C.primarySoft,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          padding: "10px 0",
        }}
      >
        <span
          style={{
            color: C.primary,
            fontSize: 20,
            fontWeight: 900,
            lineHeight: 1.05,
          }}
        >
          {meeting.day}
        </span>
        <span
          style={{
            color: C.primary,
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: 0.6,
          }}
        >
          {meeting.month}
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              padding: "2px 7px",
              borderRadius: 6,
              background: C.primarySoft,
              color: C.primary,
              fontSize: 9,
              fontWeight: 900,
              letterSpacing: 0.4,
            }}
          >
            {meeting.kind}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 7px",
              borderRadius: 6,
              background: status.bg,
              color: status.color,
              fontSize: 9,
              fontWeight: 900,
              letterSpacing: 0.4,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "currentColor",
              }}
            />
            {status.label}
          </span>
        </div>

        <h3
          style={{
            margin: "5px 0 6px",
            color: C.navy,
            fontSize: 14,
            fontWeight: 900,
            lineHeight: 1.3,
          }}
        >
          {meeting.title}
        </h3>

        <MetaRow icon={Location01Icon} text={meeting.venue} />
        <MetaRow icon={Clock03Icon} text={meeting.when} />
        <MetaRow icon={Building01Icon} text={meeting.room} />
      </div>

      {/* Chevron */}
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={16}
          color={C.muted}
          strokeWidth={2}
        />
      </div>
    </article>
  )
}

function MetaRow({
  icon,
  text,
}: {
  icon: IconSvgElement
  text: string
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        marginTop: 3,
        minWidth: 0,
      }}
    >
      <HugeiconsIcon
        icon={icon}
        size={12}
        color={C.muted}
        strokeWidth={1.8}
        style={{ flexShrink: 0 }}
      />
      <span
        style={{
          color: C.muted,
          fontSize: 10.5,
          fontWeight: 600,
          lineHeight: 1.35,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {text}
      </span>
    </div>
  )
}

/* ------------------------------ Meeting details ------------------------------ */

const HERO_GRADIENT = "linear-gradient(140deg, #35b5e8 0%, #1c9dd7 58%, #178fc6 100%)"

export function MeetingDetailsPage({ meeting }: { meeting: Meeting }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <StyleTwoPageHeader
        title="Meeting details"
        onBack={() => {}}
        backLabel="Back to meetings"
        trailing={
          <button
            type="button"
            aria-label="Share"
            title="Share"
            style={{
              width: 44,
              height: 44,
              minWidth: 44,
              border: "none",
              borderRadius: "50%",
              background: C.primarySoft,
              color: C.primary,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            <HugeiconsIcon
              icon={Share08Icon}
              size={20}
              color={C.primary}
              strokeWidth={1.8}
            />
          </button>
        }
      />

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          scrollbarWidth: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Hero */}
        <div
          style={{
            background: HERO_GRADIENT,
            padding: "18px 16px 34px",
            color: C.white,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: 1.1,
              opacity: 0.85,
              marginBottom: 5,
            }}
          >
            {meeting.venue.toUpperCase()} · {meeting.kind}
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: 19,
              fontWeight: 900,
              lineHeight: 1.25,
            }}
          >
            {meeting.title}
          </h2>
        </div>

        {/* Body overlapping hero */}
        <div
          style={{
            flex: 1,
            marginTop: -20,
            padding: "0 16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {/* Meeting information */}
          <Card>
            <CardLabel>Meeting information</CardLabel>
            <InfoRow
              icon={Calendar03Icon}
              label="Date & time"
              value={meeting.dateLong}
            />
            <InfoRow
              icon={Location01Icon}
              label="Venue"
              value={meeting.room}
            />
            <InfoRow
              icon={HashIcon}
              label="Meeting code"
              value={meeting.code}
            />
            <InfoRow
              icon={UserMultipleIcon}
              label="Quorum"
              value={meeting.quorum}
              last
            />
          </Card>

          {/* My units */}
          <Card>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <CardLabel style={{ marginBottom: 0 }}>My units</CardLabel>
              <span
                style={{
                  color: C.primary,
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                {meeting.units.length} eligible
              </span>
            </div>
            {meeting.units.map((unit, i) => (
              <UnitBlock key={unit.name} unit={unit} last={i === meeting.units.length - 1} />
            ))}
            <div
              style={{
                marginTop: 12,
                display: "flex",
                gap: 7,
                background: C.surface,
                border: `1px solid ${C.line}`,
                borderRadius: 10,
                padding: "9px 11px",
              }}
            >
              <HugeiconsIcon
                icon={InformationCircleIcon}
                size={14}
                color={C.muted}
                strokeWidth={1.8}
                style={{ flexShrink: 0, marginTop: 1 }}
              />
              <span
                style={{
                  color: C.muted,
                  fontSize: 10.5,
                  fontWeight: 600,
                  lineHeight: 1.45,
                }}
              >
                One pass per unit. Use your own mobile number + this code on
                the meeting page.
              </span>
            </div>
          </Card>

          {/* Actions */}
          <Card>
            <CardLabel>Actions</CardLabel>
            {meeting.status === "finished" ? (
              <>
                <button
                  type="button"
                  style={{
                    width: "100%",
                    minHeight: 46,
                    border: "none",
                    borderRadius: 12,
                    background: C.primary,
                    color: C.white,
                    fontSize: 13,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    cursor: "pointer",
                    boxShadow: "0 8px 18px rgba(28,157,215,0.25)",
                  }}
                >
                  <HugeiconsIcon icon={Doc01Icon} size={17} color={C.white} strokeWidth={1.8} />
                  View minutes &amp; results
                </button>
                <ActionCaption>Meeting minutes published 20 Oct 2026</ActionCaption>
              </>
            ) : (
              <>
                <button
                  type="button"
                  style={{
                    width: "100%",
                    minHeight: 46,
                    border: "none",
                    borderRadius: 12,
                    background: C.primary,
                    color: C.white,
                    fontSize: 13,
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    cursor: "pointer",
                    boxShadow: "0 8px 18px rgba(28,157,215,0.25)",
                  }}
                >
                  <HugeiconsIcon icon={ExternalLinkIcon} size={17} color={C.white} strokeWidth={1.8} />
                  Open meeting page
                </button>
                <ActionCaption>
                  {meeting.status === "ongoing"
                    ? "Check-in and voting are open now"
                    : "Check-in and voting open on the meeting day"}
                </ActionCaption>
                {meeting.proxyCloses && (
                  <>
                    <button
                      type="button"
                      style={{
                        width: "100%",
                        minHeight: 46,
                        marginTop: 10,
                        border: `1.5px solid ${C.primary}`,
                        borderRadius: 12,
                        background: C.white,
                        color: C.primary,
                        fontSize: 13,
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        cursor: "pointer",
                      }}
                    >
                      <HugeiconsIcon icon={UserSharingIcon} size={17} color={C.primary} strokeWidth={1.8} />
                      Appoint a proxy
                    </button>
                    <ActionCaption>{meeting.proxyCloses}</ActionCaption>
                  </>
                )}
              </>
            )}
          </Card>

          {/* Warning footer */}
          <div
            style={{
              display: "flex",
              gap: 7,
              background: "#fdf6e7",
              borderRadius: 10,
              padding: "10px 12px",
            }}
          >
            <HugeiconsIcon
              icon={Alert02Icon}
              size={14}
              color="#b07b1e"
              strokeWidth={1.8}
              style={{ flexShrink: 0, marginTop: 1 }}
            />
            <span
              style={{
                color: "#a3761d",
                fontSize: 10.5,
                fontWeight: 600,
                lineHeight: 1.45,
              }}
            >
              If you check in yourself, any proxy appointed for that unit is
              cancelled automatically.
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}

/* ------------------------------ Appoint a proxy ------------------------------ */

const INPUT_STYLE: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px 14px",
  border: `1px solid ${C.line}`,
  borderRadius: 12,
  background: C.surface,
  color: C.navy,
  fontSize: 13,
  fontWeight: 800,
  fontFamily: "inherit",
  outline: "none",
}

export function ProxyFormPage({
  meeting,
  unit,
  onUnitChange,
  name,
  onNameChange,
  mobile,
  onMobileChange,
}: {
  meeting: Meeting
  unit: string
  onUnitChange: (unit: string) => void
  name: string
  onNameChange: (name: string) => void
  mobile: string
  onMobileChange: (mobile: string) => void
}) {
  const proxyOpen = meeting.proxyCloses !== null
  const [submitted, setSubmitted] = useState(false)

  // Reset the inline success state when switching to another meeting
  const [lastMeetingId, setLastMeetingId] = useState(meeting.id)
  if (lastMeetingId !== meeting.id) {
    setLastMeetingId(meeting.id)
    setSubmitted(false)
  }

  const selectedUnit = meeting.units.find((u) => u.name === unit)

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <StyleTwoPageHeader
        title="Appoint a proxy"
        onBack={() => {}}
        backLabel="Back to meetings"
      />

      {/* Meeting context */}
      <div
        style={{
          flexShrink: 0,
          background: C.white,
          borderBottom: `1px solid ${C.line}`,
          padding: "14px 16px 16px",
        }}
      >
        <div
          style={{
            color: C.primary,
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 5,
          }}
        >
          {meeting.title}
        </div>
        <h2
          style={{
            margin: 0,
            color: C.navy,
            fontSize: 18,
            fontWeight: 900,
            lineHeight: 1.25,
          }}
        >
          Appoint someone to attend for you
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            marginTop: 7,
            color: proxyOpen ? "#d98217" : C.muted,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          <HugeiconsIcon
            icon={Clock03Icon}
            size={13}
            color={proxyOpen ? "#d98217" : C.muted}
            strokeWidth={1.8}
          />
          {proxyOpen
            ? meeting.proxyCloses?.split(" · ")[0]
            : "Proxy appointment closed"}
        </div>
      </div>

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 16px 18px",
          scrollbarWidth: "none",
        }}
      >
        {submitted ? (
          <>
            <Card>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "18px 6px 10px",
                  gap: 10,
                }}
              >
                <HugeiconsIcon
                  icon={CheckmarkCircle01Icon}
                  size={46}
                  color={C.success}
                  strokeWidth={1.6}
                />
                <div
                  style={{
                    color: C.navy,
                    fontSize: 16,
                    fontWeight: 900,
                  }}
                >
                  Proxy appointed
                </div>
                <p
                  style={{
                    margin: 0,
                    color: C.muted,
                    fontSize: 12,
                    fontWeight: 600,
                    lineHeight: 1.5,
                  }}
                >
                  {name || "Your proxy"} will attend for{" "}
                  <strong style={{ color: C.navy }}>{unit}</strong> (
                  {selectedUnit?.shares} share values). The 6-digit proxy pass
                  has been sent by SMS.
                </p>
              </div>
            </Card>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              style={{
                width: "100%",
                minHeight: 46,
                marginTop: 14,
                border: `1.5px solid ${C.primary}`,
                borderRadius: 12,
                background: C.white,
                color: C.primary,
                fontSize: 13,
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Edit appointment
            </button>
          </>
        ) : (
          <>
            {/* Form */}
            <Card>
              <CardLabel>Unit</CardLabel>
              <div style={{ position: "relative", marginBottom: 14 }}>
                <select
                  value={unit}
                  onChange={(e) => onUnitChange(e.target.value)}
                  aria-label="Unit"
                  style={{
                    ...INPUT_STYLE,
                    appearance: "none",
                    paddingRight: 38,
                    cursor: "pointer",
                  }}
                >
                  {meeting.units.map((u) => (
                    <option key={u.name} value={u.name}>
                      {u.name} · {u.shares} SV
                    </option>
                  ))}
                </select>
                <HugeiconsIcon
                  icon={ChevronDownIcon}
                  size={16}
                  color={C.muted}
                  strokeWidth={2}
                  style={{
                    position: "absolute",
                    right: 13,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              <CardLabel>Proxy&apos;s full name</CardLabel>
              <input
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Enter full name"
                style={{ ...INPUT_STYLE, marginBottom: 14 }}
              />

              <CardLabel>Proxy&apos;s mobile number</CardLabel>
              <input
                value={mobile}
                onChange={(e) => onMobileChange(e.target.value)}
                placeholder="+65"
                inputMode="tel"
                style={INPUT_STYLE}
              />
              <div
                style={{
                  color: C.muted,
                  fontSize: 10,
                  fontWeight: 600,
                  lineHeight: 1.45,
                  marginTop: 6,
                }}
              >
                The 6-digit proxy pass will be sent to this number by SMS.
              </div>

              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  gap: 7,
                  background: C.surface,
                  border: `1px solid ${C.line}`,
                  borderRadius: 10,
                  padding: "9px 11px",
                }}
              >
                <HugeiconsIcon
                  icon={InformationCircleIcon}
                  size={14}
                  color={C.muted}
                  strokeWidth={1.8}
                  style={{ flexShrink: 0, marginTop: 1 }}
                />
                <span
                  style={{
                    color: C.muted,
                    fontSize: 10.5,
                    fontWeight: 600,
                    lineHeight: 1.45,
                  }}
                >
                  Appointing a new proxy replaces the existing proxy for this
                  unit. One unit has one pass.
                </span>
              </div>
            </Card>

            {/* Submit */}
            <button
              type="button"
              onClick={() => proxyOpen && setSubmitted(true)}
              disabled={!proxyOpen}
              style={{
                width: "100%",
                minHeight: 46,
                marginTop: 16,
                border: "none",
                borderRadius: 12,
                background: proxyOpen ? C.primary : "#b9c9d4",
                color: C.white,
                fontSize: 13,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: proxyOpen ? "pointer" : "not-allowed",
                boxShadow: proxyOpen
                  ? "0 8px 18px rgba(28,157,215,0.25)"
                  : "none",
              }}
            >
              <HugeiconsIcon
                icon={UserSharingIcon}
                size={17}
                color={C.white}
                strokeWidth={1.8}
              />
              Appoint proxy
            </button>
            <div
              style={{
                textAlign: "center",
                color: C.muted,
                fontSize: 10,
                fontWeight: 600,
                marginTop: 8,
                lineHeight: 1.4,
              }}
            >
              You can revoke the appointment before the meeting.
            </div>
          </>
        )}
      </main>
    </div>
  )
}

/* ------------------------------ Proxy appointed ------------------------------ */

const NEXT_STEPS = [
  "The proxy checks in on the meeting page using their own mobile number and this pass.",
  "If you check in yourself, this proxy pass for the unit is cancelled.",
  "You can revoke the appointment at any time before the meeting.",
]

export function ProxyAppointedPage({
  meeting,
  unit,
  name,
  mobile,
}: {
  meeting: Meeting
  unit: string
  name: string
  mobile: string
}) {
  const [copied, setCopied] = useState(false)

  const selectedUnit =
    meeting.units.find((u) => u.name === unit) ?? meeting.units[0]
  const pass = selectedUnit.proxyPass
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const handleCopy = () => {
    try {
      void navigator.clipboard?.writeText(pass)
    } catch {
      /* clipboard unavailable in this context */
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ height: 44, flexShrink: 0, background: C.white }} />
      <header
        style={{
          minHeight: 56,
          padding: "0 16px 12px",
          background: C.white,
          borderBottom: "1px solid #cfe8f3",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          aria-label="Close"
          title="Close"
          style={{
            width: 44,
            height: 44,
            minWidth: 44,
            border: "none",
            borderRadius: "50%",
            background: C.primarySoft,
            color: C.primary,
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          <HugeiconsIcon
            icon={Cancel01Icon}
            size={20}
            color={C.primary}
            strokeWidth={2}
          />
        </button>
        <div
          style={{
            position: "absolute",
            left: "50%",
            maxWidth: "calc(100% - 152px)",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              overflow: "hidden",
              color: C.navy,
              fontSize: 17,
              fontWeight: 900,
              lineHeight: 1.2,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            Proxy appointed
          </div>
        </div>
        <div style={{ minWidth: 44, height: 44 }} />
      </header>

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "18px 16px 18px",
          scrollbarWidth: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Success hero */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "14px 12px 20px",
          }}
        >
          <span
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: C.successSoft,
              display: "grid",
              placeItems: "center",
            }}
          >
            <HugeiconsIcon
              icon={CheckmarkCircle01Icon}
              size={36}
              color={C.success}
              strokeWidth={1.6}
            />
          </span>
          <h2
            style={{
              margin: "14px 0 6px",
              color: C.navy,
              fontSize: 20,
              fontWeight: 900,
            }}
          >
            Proxy appointed
          </h2>
          <p
            style={{
              margin: 0,
              color: C.muted,
              fontSize: 12,
              fontWeight: 600,
              lineHeight: 1.55,
              maxWidth: 260,
            }}
          >
            {name || "Your proxy"} can now attend on behalf of {unit}.
          </p>
        </div>

        {/* Proxy pass */}
        <Card>
          <CardLabel>Proxy pass</CardLabel>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: C.primarySoft,
                color: C.primary,
                display: "grid",
                placeItems: "center",
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: 0.5,
              }}
            >
              {initials || "?"}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: C.navy,
                  fontSize: 14,
                  fontWeight: 900,
                  lineHeight: 1.25,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {name || "Your proxy"}
              </div>
              <div
                style={{
                  color: C.muted,
                  fontSize: 11,
                  fontWeight: 600,
                  marginTop: 1,
                }}
              >
                {mobile}
              </div>
            </div>
            <span
              style={{
                flexShrink: 0,
                padding: "3px 9px",
                borderRadius: 6,
                background: C.successSoft,
                color: C.success,
                fontSize: 9,
                fontWeight: 900,
                letterSpacing: 0.6,
              }}
            >
              APPOINTED
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            {pass.split("").map((digit, i) => (
              <span
                key={i}
                style={{
                  width: 36,
                  height: 44,
                  borderRadius: 10,
                  border: `1px solid ${C.line}`,
                  background: C.white,
                  boxShadow: "0 2px 6px rgba(34, 78, 110, 0.06)",
                  display: "grid",
                  placeItems: "center",
                  color: C.navy,
                  fontSize: 17,
                  fontWeight: 900,
                }}
              >
                {digit}
              </span>
            ))}
          </div>
          <div
            style={{
              textAlign: "center",
              color: C.muted,
              fontSize: 10.5,
              fontWeight: 600,
              marginBottom: 14,
            }}
          >
            Proxy pass · share this code with {name.split(" ")[0] || "the proxy"}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={handleCopy}
              style={{
                flex: 1,
                minHeight: 44,
                border: `1px solid ${C.line}`,
                borderRadius: 12,
                background: C.white,
                color: C.primary,
                fontSize: 12.5,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                cursor: "pointer",
              }}
            >
              <HugeiconsIcon
                icon={Copy01Icon}
                size={15}
                color={C.primary}
                strokeWidth={1.8}
              />
              {copied ? "Copied" : "Copy code"}
            </button>
            <button
              type="button"
              style={{
                flex: 1,
                minHeight: 44,
                border: "none",
                borderRadius: 12,
                background: C.primarySoft,
                color: C.primary,
                fontSize: 12.5,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                cursor: "pointer",
              }}
            >
              <HugeiconsIcon
                icon={Share08Icon}
                size={15}
                color={C.primary}
                strokeWidth={1.8}
              />
              Share
            </button>
          </div>
        </Card>

        {/* What happens next */}
        <div style={{ height: 14, flexShrink: 0 }} />
        <Card>
          <CardLabel>What happens next</CardLabel>
          {NEXT_STEPS.map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 9,
                alignItems: "flex-start",
                marginBottom: i === NEXT_STEPS.length - 1 ? 0 : 11,
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: C.primarySoft,
                  color: C.primary,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 10,
                  fontWeight: 900,
                  marginTop: 1,
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  color: C.muted,
                  fontSize: 11,
                  fontWeight: 600,
                  lineHeight: 1.5,
                }}
              >
                {step}
              </span>
            </div>
          ))}
        </Card>

        <button
          type="button"
          style={{
            width: "100%",
            minHeight: 46,
            marginTop: 16,
            border: "none",
            borderRadius: 12,
            background: C.primarySoft,
            color: C.primary,
            fontSize: 13,
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          Back to proxy settings
        </button>
      </main>
    </div>
  )
}

/* ------------------------------ Proxy management ------------------------------ */

const PROXY_HISTORY: {
  name: string
  meta: string
  tag: string
  tagBg: string
  tagColor: string
}[] = [
  {
    name: "Lim Mei Ling",
    meta: "#12-08 Tower A · replaced · 28 Oct 2026",
    tag: "REPLACED",
    tagBg: "#fdf0dd",
    tagColor: "#b07b1e",
  },
  {
    name: "Goh Jia Hui",
    meta: "#05-11 Tower B · revoked · 20 Oct 2026",
    tag: "REVOKED",
    tagBg: C.graySoft,
    tagColor: C.grayText,
  },
]

const PROXY_UNITS = [
  {
    name: "#12-08 Tower A",
    sv: "8.00 SV",
    appointed: {
      name: "Tan Wei Ming",
      mobile: "+65 9123 4401",
      pass: "604218",
      meta: "Appointed 05 Nov 2026, 14:32 · proxy pass active",
    },
  },
  {
    name: "#05-11 Tower B",
    sv: "7.00 SV",
    appointed: null,
  },
]

export function ProxyPage() {
  const [copiedUnit, setCopiedUnit] = useState<string | null>(null)

  const handleCopy = (unitName: string, pass: string) => {
    try {
      void navigator.clipboard?.writeText(pass)
    } catch {
      /* clipboard unavailable in this context */
    }
    setCopiedUnit(unitName)
    window.setTimeout(() => setCopiedUnit(null), 1400)
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <StyleTwoPageHeader
        title="Proxy"
        onBack={() => {}}
        backLabel="Back to meetings"
        trailing={
          <button
            type="button"
            aria-label="New appointment"
            title="New appointment"
            style={{
              width: 44,
              height: 44,
              minWidth: 44,
              border: "none",
              borderRadius: "50%",
              background: "#EFF8FD",
              color: C.primary,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            <HugeiconsIcon
              icon={Add01Icon}
              size={22}
              color={C.primary}
              strokeWidth={2}
            />
          </button>
        }
      />

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 16px 18px",
          scrollbarWidth: "none",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Deadline banner */}
        <div
          style={{
            display: "flex",
            gap: 7,
            background: "#fdf6e7",
            borderRadius: 10,
            padding: "10px 12px",
          }}
        >
          <HugeiconsIcon
            icon={InformationCircleIcon}
            size={14}
            color="#b07b1e"
            strokeWidth={1.8}
            style={{ flexShrink: 0, marginTop: 1 }}
          />
          <span
            style={{
              color: "#a3761d",
              fontSize: 10.5,
              fontWeight: 600,
              lineHeight: 1.45,
            }}
          >
            Appointments close{" "}
            <strong style={{ fontWeight: 900 }}>19 Nov 2026, 10:00</strong>.
            After that, contact the management office.
          </span>
        </div>

        {/* Per-unit appointment cards */}
        {PROXY_UNITS.map((unit) => {
          const appointment = unit.appointed
          const copied = copiedUnit === unit.name
          const initials = appointment
            ? appointment.name
                .split(" ")
                .filter(Boolean)
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()
            : ""
          return (
            <Card key={unit.name}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 11,
                }}
              >
                <span
                  style={{
                    color: C.navy,
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: 0.8,
                    textTransform: "uppercase",
                  }}
                >
                  {unit.name}
                </span>
                <span
                  style={{
                    color: C.muted,
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  {unit.sv}
                </span>
              </div>

              {appointment ? (
                <div
                  style={{
                    background: C.surface,
                    border: `1px solid ${C.line}`,
                    borderRadius: 12,
                    padding: "11px 12px 12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 11,
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: C.primarySoft,
                        color: C.primary,
                        display: "grid",
                        placeItems: "center",
                        fontSize: 13,
                        fontWeight: 900,
                        letterSpacing: 0.5,
                      }}
                    >
                      {initials || "?"}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          color: C.navy,
                          fontSize: 14,
                          fontWeight: 900,
                          lineHeight: 1.25,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {appointment.name}
                      </div>
                      <div
                        style={{
                          color: C.muted,
                          fontSize: 11,
                          fontWeight: 600,
                          marginTop: 1,
                        }}
                      >
                        {appointment.mobile}
                      </div>
                    </div>
                    <span
                      style={{
                        flexShrink: 0,
                        padding: "3px 9px",
                        borderRadius: 6,
                        background: C.successSoft,
                        color: C.success,
                        fontSize: 9,
                        fontWeight: 900,
                        letterSpacing: 0.6,
                      }}
                    >
                      APPOINTED
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      marginBottom: 7,
                    }}
                  >
                    <div style={{ display: "flex", gap: 4, flex: 1 }}>
                      {appointment.pass.split("").map((digit, i) => (
                        <span
                          key={i}
                          style={{
                            flex: 1,
                            height: 30,
                            borderRadius: 7,
                            border: `1px solid ${C.line}`,
                            background: C.white,
                            display: "grid",
                            placeItems: "center",
                            color: C.navy,
                            fontSize: 13,
                            fontWeight: 900,
                          }}
                        >
                          {digit}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(unit.name, appointment.pass)}
                      aria-label="Copy proxy pass"
                      title="Copy proxy pass"
                      style={{
                        flexShrink: 0,
                        width: 30,
                        height: 30,
                        marginLeft: 4,
                        border: "none",
                        borderRadius: 8,
                        background: C.primarySoft,
                        color: C.primary,
                        display: "grid",
                        placeItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <HugeiconsIcon
                        icon={Copy01Icon}
                        size={14}
                        color={C.primary}
                        strokeWidth={1.8}
                      />
                    </button>
                  </div>
                  <div
                    style={{
                      color: C.muted,
                      fontSize: 10,
                      fontWeight: 600,
                      marginBottom: 12,
                    }}
                  >
                    {copied
                      ? "Proxy pass copied"
                      : appointment.meta}
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      type="button"
                      style={{
                        flex: 1,
                        minHeight: 42,
                        border: "none",
                        borderRadius: 11,
                        background: C.primarySoft,
                        color: C.primary,
                        fontSize: 12.5,
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 7,
                        cursor: "pointer",
                      }}
                    >
                      <HugeiconsIcon
                        icon={RefreshIcon}
                        size={15}
                        color={C.primary}
                        strokeWidth={1.8}
                      />
                      Replace
                    </button>
                    <button
                      type="button"
                      style={{
                        flex: 1,
                        minHeight: 42,
                        border: "1px solid #e4c7c7",
                        borderRadius: 11,
                        background: C.white,
                        color: "#c75b5b",
                        fontSize: 12.5,
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 7,
                        cursor: "pointer",
                      }}
                    >
                      <HugeiconsIcon
                        icon={Cancel01Icon}
                        size={15}
                        color="#c75b5b"
                        strokeWidth={1.8}
                      />
                      Revoke
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      marginBottom: 12,
                      color: C.muted,
                      fontSize: 11.5,
                      fontWeight: 600,
                    }}
                  >
                    <HugeiconsIcon
                      icon={UserSharingIcon}
                      size={14}
                      color={C.muted}
                      strokeWidth={1.8}
                    />
                    No proxy appointed for this unit.
                  </div>
                  <button
                    type="button"
                    style={{
                      width: "100%",
                      minHeight: 42,
                      border: `1.5px solid ${C.primary}`,
                      borderRadius: 11,
                      background: C.white,
                      color: C.primary,
                      fontSize: 12.5,
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 7,
                      cursor: "pointer",
                    }}
                  >
                    <HugeiconsIcon
                      icon={UserAdd02Icon}
                      size={15}
                      color={C.primary}
                      strokeWidth={1.8}
                    />
                    Appoint proxy
                  </button>
                </>
              )}
            </Card>
          )
        })}

        {/* History */}
        <Card>
          <CardLabel style={{ marginBottom: 12 }}>History</CardLabel>
          {PROXY_HISTORY.map((entry, i) => (
            <div
              key={entry.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                paddingBottom: i === PROXY_HISTORY.length - 1 ? 0 : 11,
                marginBottom: i === PROXY_HISTORY.length - 1 ? 0 : 11,
                borderBottom:
                  i === PROXY_HISTORY.length - 1 ? "none" : `1px solid ${C.line}`,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    color: C.navy,
                    fontSize: 12.5,
                    fontWeight: 900,
                  }}
                >
                  {entry.name}
                </div>
                <div
                  style={{
                    color: C.muted,
                    fontSize: 10,
                    fontWeight: 600,
                    marginTop: 2,
                  }}
                >
                  {entry.meta}
                </div>
              </div>
              <span
                style={{
                  flexShrink: 0,
                  padding: "3px 9px",
                  borderRadius: 6,
                  background: entry.tagBg,
                  color: entry.tagColor,
                  fontSize: 9,
                  fontWeight: 900,
                  letterSpacing: 0.6,
                }}
              >
                {entry.tag}
              </span>
            </div>
          ))}
        </Card>
      </main>
    </div>
  )
}

/* --------------------- Meeting details · after the meeting --------------------- */

export function MeetingDetailsAfterPage() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <StyleTwoPageHeader
        title="Meeting details"
        onBack={() => {}}
        backLabel="Back to meetings"
        trailing={
          <button
            type="button"
            aria-label="Share"
            title="Share"
            style={{
              width: 44,
              height: 44,
              minWidth: 44,
              border: "none",
              borderRadius: "50%",
              background: C.primarySoft,
              color: C.primary,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            <HugeiconsIcon
              icon={Share08Icon}
              size={20}
              color={C.primary}
              strokeWidth={1.8}
            />
          </button>
        }
      />

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          scrollbarWidth: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Hero */}
        <div
          style={{
            background: HERO_GRADIENT,
            padding: "18px 16px 34px",
            color: C.white,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: 1.1,
              opacity: 0.85,
              marginBottom: 5,
            }}
          >
            PALM GARDENS CONDOMINIUM · AGM
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: 19,
              fontWeight: 900,
              lineHeight: 1.25,
            }}
          >
            17th Annual General Meeting
          </h2>
        </div>

        {/* Body overlapping hero */}
        <div
          style={{
            flex: 1,
            marginTop: -20,
            padding: "0 16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {/* Meeting information */}
          <Card>
            <CardLabel>Meeting information</CardLabel>
            <InfoRow
              icon={Calendar03Icon}
              label="Date & time"
              value="Sun, 18 Oct 2026 · 10:00 AM"
            />
            <InfoRow
              icon={Location01Icon}
              label="Venue"
              value="Function Room, Level 3"
            />
            <InfoRow
              icon={HashIcon}
              label="Meeting code"
              value="CR-AGM26"
              last
            />
          </Card>

          {/* My units — pass expired */}
          <Card>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <CardLabel style={{ marginBottom: 0 }}>My units</CardLabel>
              <span
                style={{
                  color: C.grayText,
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                pass expired
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  color: C.navy,
                  fontSize: 13.5,
                  fontWeight: 900,
                }}
              >
                #12-08 Tower A
              </span>
              <span
                style={{
                  padding: "3px 9px",
                  borderRadius: 6,
                  background: C.graySoft,
                  color: C.grayText,
                  fontSize: 9,
                  fontWeight: 900,
                  letterSpacing: 0.6,
                }}
              >
                PASS EXPIRED
              </span>
            </div>
            <div
              style={{
                color: C.muted,
                fontSize: 10.5,
                fontWeight: 600,
                marginBottom: 11,
              }}
            >
              8.00 share values
            </div>
            <div
              style={{
                display: "flex",
                gap: 7,
                background: C.surface,
                border: `1px solid ${C.line}`,
                borderRadius: 10,
                padding: "9px 11px",
              }}
            >
              <HugeiconsIcon
                icon={InformationCircleIcon}
                size={14}
                color={C.muted}
                strokeWidth={1.8}
                style={{ flexShrink: 0, marginTop: 1 }}
              />
              <span
                style={{
                  color: C.muted,
                  fontSize: 10.5,
                  fontWeight: 600,
                  lineHeight: 1.45,
                }}
              >
                The attendance pass is only valid while the meeting is open.
              </span>
            </div>
          </Card>

          {/* After the meeting */}
          <Card>
            <CardLabel>After the meeting</CardLabel>
            <button
              type="button"
              style={{
                width: "100%",
                minHeight: 46,
                border: "none",
                borderRadius: 12,
                background: C.primary,
                color: C.white,
                fontSize: 13,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
                boxShadow: "0 8px 18px rgba(28,157,215,0.25)",
              }}
            >
              <HugeiconsIcon
                icon={ChartBarBigIcon}
                size={17}
                color={C.white}
                strokeWidth={1.8}
              />
              View voting results
            </button>
            <button
              type="button"
              style={{
                width: "100%",
                minHeight: 46,
                marginTop: 10,
                border: `1.5px solid ${C.primary}`,
                borderRadius: 12,
                background: C.white,
                color: C.primary,
                fontSize: 13,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <HugeiconsIcon
                icon={Doc01Icon}
                size={17}
                color={C.primary}
                strokeWidth={1.8}
              />
              Post-meeting documents
            </button>
            <ActionCaption>
              Documents appear only after the management publishes them.
            </ActionCaption>
          </Card>
        </div>
      </main>
    </div>
  )
}

/* ------------------------------ Voting results ------------------------------ */

const VOTING_ITEMS: {
  kind: "SINGLE CHOICE" | "RATING"
  accent: string
  accentSoft: string
  title: string
  options?: { label: string; yourVote: boolean; pct: string; meta: string; fill: number; color?: string; soft?: string }[]
  score?: { value: string; max: string; label: string; meta: string }
  total?: { sv: string; pct: string }
}[] = [
  {
    kind: "SINGLE CHOICE",
    accent: "#1c9dd7",
    accentSoft: "#e8f6fd",
    title:
      "To approve the audited financial statements for the financial year ended 30 June 2026.",
    options: [
      { label: "Approve", yourVote: true, pct: "78.4%", meta: "137 SV · 24 units", fill: 78.4 },
      { label: "Reject", yourVote: false, pct: "21.6%", meta: "38 SV · 7 units", fill: 21.6, color: "#c75b5b", soft: "#f7e6e6" },
    ],
    total: { sv: "175 SV · 31 units voted", pct: "100%" },
  },
  {
    kind: "SINGLE CHOICE",
    accent: "#16835c",
    accentSoft: "#e2f6ec",
    title:
      "To approve the lift replacement programme and the special levy of S$1.2 million.",
    options: [
      { label: "For", yourVote: true, pct: "62.1%", meta: "109 SV · 19 units", fill: 62.1 },
      { label: "Against", yourVote: false, pct: "37.9%", meta: "66 SV · 12 units", fill: 37.9, color: "#c75b5b", soft: "#f7e6e6" },
    ],
    total: { sv: "175 SV · 31 units voted", pct: "100%" },
  },
  {
    kind: "RATING",
    accent: "#d98217",
    accentSoft: "#fbeed9",
    title: "Rate the performance of the managing agent for FY2025/2026.",
    score: { value: "7.6", max: "/ 10", label: "Average score", meta: "28 units voted" },
  },
]

export function VotingResultsPage() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <StyleTwoPageHeader
        title="Voting results"
        onBack={() => {}}
        backLabel="Back to meetings"
      />

      {/* Meeting context */}
      <div
        style={{
          flexShrink: 0,
          background: C.white,
          borderBottom: `1px solid ${C.line}`,
          padding: "14px 16px 14px",
        }}
      >
        <div
          style={{
            color: C.primary,
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 5,
          }}
        >
          17th Annual General Meeting
        </div>
        <h2
          style={{
            margin: 0,
            color: C.navy,
            fontSize: 20,
            fontWeight: 900,
            lineHeight: 1.2,
          }}
        >
          Results
        </h2>
        <div
          style={{
            color: C.muted,
            fontSize: 11,
            fontWeight: 600,
            marginTop: 5,
          }}
        >
          18 Oct 2026 · 3 closed items
        </div>
      </div>

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 16px 18px",
          scrollbarWidth: "none",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {VOTING_ITEMS.map((item, i) => (
          <Card key={i}>
            <div
              style={{
                color: item.accent,
                fontSize: 9.5,
                fontWeight: 900,
                letterSpacing: 0.8,
                textTransform: "uppercase",
                marginBottom: 7,
              }}
            >
              Item {i + 1} · {item.kind}
            </div>
            <p
              style={{
                margin: "0 0 13px",
                color: C.navy,
                fontSize: 12.5,
                fontWeight: 800,
                lineHeight: 1.45,
              }}
            >
              {item.title}
            </p>

            {item.options && (
              <>
                {item.options.map((opt) => (
                  <div key={opt.label} style={{ marginBottom: 13 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          color: C.navy,
                          fontSize: 12.5,
                          fontWeight: 900,
                        }}
                      >
                        {opt.label}
                      </span>
                      {opt.yourVote && (
                        <span
                          style={{
                            padding: "2px 7px",
                            borderRadius: 6,
                            background: item.accentSoft,
                            color: item.accent,
                            fontSize: 8.5,
                            fontWeight: 900,
                            letterSpacing: 0.5,
                          }}
                        >
                          YOUR VOTE
                        </span>
                      )}
                      <span
                        style={{
                          marginLeft: "auto",
                          color: C.navy,
                          fontSize: 12.5,
                          fontWeight: 900,
                        }}
                      >
                        {opt.pct}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 8,
                        borderRadius: 999,
                        background: opt.soft ?? item.accentSoft,
                        overflow: "hidden",
                        marginBottom: 5,
                      }}
                    >
                      <div
                        style={{
                          width: `${opt.fill}%`,
                          height: "100%",
                          borderRadius: 999,
                          background: opt.color ?? item.accent,
                        }}
                      />
                    </div>
                    <div
                      style={{
                        color: C.muted,
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      {opt.meta}
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 10,
                    borderTop: `1px solid ${C.line}`,
                  }}
                >
                  <span
                    style={{
                      color: C.text,
                      fontSize: 10.5,
                      fontWeight: 800,
                    }}
                  >
                    {item.total?.sv}
                  </span>
                  <span
                    style={{
                      color: C.muted,
                      fontSize: 10.5,
                      fontWeight: 800,
                    }}
                  >
                    {item.total?.pct}
                  </span>
                </div>
              </>
            )}

            {item.score && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      color: item.accent,
                      fontSize: 34,
                      fontWeight: 900,
                      lineHeight: 1,
                    }}
                  >
                    {item.score.value}
                  </span>
                  <span
                    style={{
                      color: C.muted,
                      fontSize: 13,
                      fontWeight: 800,
                      paddingBottom: 4,
                    }}
                  >
                    {item.score.max}
                  </span>
                  <div style={{ paddingBottom: 3 }}>
                    <div
                      style={{
                        color: C.text,
                        fontSize: 11,
                        fontWeight: 800,
                      }}
                    >
                      {item.score.label}
                    </div>
                    <div
                      style={{
                        color: C.muted,
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      {item.score.meta}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    gap: 7,
                    background: C.surface,
                    border: `1px solid ${C.line}`,
                    borderRadius: 10,
                    padding: "9px 11px",
                  }}
                >
                  <HugeiconsIcon
                    icon={InformationCircleIcon}
                    size={14}
                    color={C.muted}
                    strokeWidth={1.8}
                    style={{ flexShrink: 0, marginTop: 1 }}
                  />
                  <span
                    style={{
                      color: C.muted,
                      fontSize: 10.5,
                      fontWeight: 600,
                      lineHeight: 1.45,
                    }}
                  >
                    Rating results show the average score; the individual score
                    distribution is not returned by this endpoint.
                  </span>
                </div>
              </>
            )}
          </Card>
        ))}

        {/* Warning footer */}
        <div
          style={{
            display: "flex",
            gap: 7,
            background: "#fdf6e7",
            borderRadius: 10,
            padding: "10px 12px",
          }}
        >
          <HugeiconsIcon
            icon={JusticeScale01Icon}
            size={14}
            color="#b07b1e"
            strokeWidth={1.8}
            style={{ flexShrink: 0, marginTop: 1 }}
          />
          <span
            style={{
              color: "#a3761d",
              fontSize: 10.5,
              fontWeight: 600,
              lineHeight: 1.45,
            }}
          >
            The system records votes only. Whether a resolution is carried is
            announced by the chair.
          </span>
        </div>

        <div
          style={{
            textAlign: "center",
            color: C.muted,
            fontSize: 10.5,
            fontWeight: 600,
            lineHeight: 1.5,
            padding: "2px 12px 4px",
          }}
        >
          Results for items still open will appear after the chair closes
          them.
        </div>
      </main>
    </div>
  )
}

const POST_MEETING_FILES: {
  name: string
  ext: string
  icon: IconSvgElement
  color: string
  soft: string
}[] = [
  {
    name: "Signed AGM Minutes — 17th AGM.pdf",
    ext: "PDF",
    icon: Pdf01Icon,
    color: "#c0564c",
    soft: "#fbeae8",
  },
  {
    name: "AGM Results Summary.xlsx",
    ext: "XLSX",
    icon: Xls01Icon,
    color: "#16835c",
    soft: C.successSoft,
  },
]

export function DocumentsPage() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <StyleTwoPageHeader
        title="Documents"
        onBack={() => {}}
        backLabel="Back to meetings"
      />

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 16px 18px",
          scrollbarWidth: "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Context */}
        <div
          style={{
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: 1,
            color: C.primary,
            marginBottom: 4,
          }}
        >
          17TH ANNUAL GENERAL MEETING
        </div>
        <h2
          style={{
            margin: 0,
            color: C.navy,
            fontSize: 21,
            fontWeight: 900,
            lineHeight: 1.2,
          }}
        >
          Post-meeting documents
        </h2>
        <div
          style={{
            marginTop: 5,
            color: C.muted,
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          Published 24 Oct 2026 · 2 files
        </div>

        {/* File cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
          {POST_MEETING_FILES.map((file) => (
            <button
              key={file.name}
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                width: "100%",
                textAlign: "left",
                background: C.white,
                border: `1px solid ${C.line}`,
                borderRadius: 14,
                padding: "11px 12px",
                boxShadow: "0 4px 13px rgba(34, 78, 110, 0.05)",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: file.soft,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <HugeiconsIcon
                  icon={file.icon}
                  size={21}
                  color={file.color}
                  strokeWidth={1.6}
                />
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    display: "block",
                    color: C.navy,
                    fontSize: 12.5,
                    fontWeight: 900,
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {file.name}
                </span>
                <span
                  style={{
                    display: "block",
                    marginTop: 2,
                    color: C.muted,
                    fontSize: 10.5,
                    fontWeight: 600,
                  }}
                >
                  Tap to open
                </span>
              </span>
              <HugeiconsIcon
                icon={ExternalLinkIcon}
                size={16}
                color={C.muted}
                strokeWidth={1.8}
                style={{ flexShrink: 0 }}
              />
            </button>
          ))}
        </div>

        {/* Note */}
        <div
          style={{
            display: "flex",
            gap: 7,
            marginTop: 14,
            background: "#fdf6e7",
            borderRadius: 10,
            padding: "10px 12px",
          }}
        >
          <HugeiconsIcon
            icon={InformationCircleIcon}
            size={14}
            color="#b07b1e"
            strokeWidth={1.8}
            style={{ flexShrink: 0, marginTop: 1 }}
          />
          <span
            style={{
              color: "#a3761d",
              fontSize: 10.5,
              fontWeight: 600,
              lineHeight: 1.45,
            }}
          >
            Only files published by the management office are visible here.
            If the list is empty, nothing has been published yet.
          </span>
        </div>
      </main>
    </div>
  )
}

function Card({ children }: { children: ReactNode }) {
  return (
    <section
      style={{
        background: C.white,
        border: `1px solid ${C.line}`,
        borderRadius: 15,
        padding: "14px 14px 15px",
        boxShadow: "0 4px 13px rgba(34, 78, 110, 0.05)",
      }}
    >
      {children}
    </section>
  )
}

function CardLabel({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        fontSize: 10,
        fontWeight: 900,
        letterSpacing: 1,
        textTransform: "uppercase",
        color: C.muted,
        marginBottom: 12,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function InfoRow({
  icon,
  label,
  value,
  last,
}: {
  icon: IconSvgElement
  label: string
  value: string
  last?: boolean
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
        paddingBottom: last ? 0 : 12,
        marginBottom: last ? 0 : 12,
        borderBottom: last ? "none" : `1px solid ${C.line}`,
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: 34,
          height: 34,
          borderRadius: 10,
          background: C.primarySoft,
          display: "grid",
          placeItems: "center",
        }}
      >
        <HugeiconsIcon
          icon={icon}
          size={16}
          color={C.primary}
          strokeWidth={1.8}
        />
      </span>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 9,
            fontWeight: 900,
            letterSpacing: 0.8,
            textTransform: "uppercase",
            color: C.muted,
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div
          style={{
            color: C.navy,
            fontSize: 12.5,
            fontWeight: 800,
            lineHeight: 1.3,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  )
}

function UnitBlock({ unit, last }: { unit: MeetingUnit; last: boolean }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    try {
      void navigator.clipboard?.writeText(unit.pass)
    } catch {
      /* clipboard unavailable in this context */
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div
      style={{
        paddingBottom: last ? 0 : 12,
        marginBottom: last ? 0 : 12,
        borderBottom: last ? "none" : `1px solid ${C.line}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <span
          style={{
            color: C.navy,
            fontSize: 13.5,
            fontWeight: 900,
          }}
        >
          {unit.name}
        </span>
        <span
          style={{
            padding: "3px 9px",
            borderRadius: 6,
            background: C.successSoft,
            color: C.success,
            fontSize: 9,
            fontWeight: 900,
            letterSpacing: 0.6,
          }}
        >
          ELIGIBLE
        </span>
      </div>
      <div
        style={{
          color: C.muted,
          fontSize: 10.5,
          fontWeight: 600,
          marginTop: 2,
          marginBottom: 9,
        }}
      >
        {unit.shares} share values
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ display: "flex", gap: 5 }}>
          {unit.pass.split("").map((digit, i) => (
            <span
              key={i}
              style={{
                width: 26,
                height: 28,
                borderRadius: 7,
                border: `1px solid ${C.line}`,
                background: C.white,
                display: "grid",
                placeItems: "center",
                color: C.navy,
                fontSize: 13,
                fontWeight: 900,
              }}
            >
              {digit}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            marginLeft: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "7px 11px",
            border: "none",
            borderRadius: 9,
            background: C.primarySoft,
            color: C.primary,
            fontSize: 11,
            fontWeight: 900,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <HugeiconsIcon
            icon={Copy01Icon}
            size={13}
            color={C.primary}
            strokeWidth={1.8}
          />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  )
}

function ActionCaption({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        textAlign: "center",
        color: C.muted,
        fontSize: 10,
        fontWeight: 600,
        marginTop: 7,
        lineHeight: 1.4,
      }}
    >
      {children}
    </div>
  )
}

export default OwnersMeetingsWorkspace
