import { useMemo, useState } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  Building02Icon,
  Bug01Icon,
  Calendar03Icon,
  CheckmarkCircle01Icon,
  CleaningBucketIcon,
  Clock03Icon,
  FlashIcon,
  LayoutGridIcon,
  ListViewIcon,
  Location01Icon,
  TaskDone01Icon,
  User02Icon,
} from "@hugeicons/core-free-icons"
import cleaningPhoto from "../imports/Services/d5fe1e57e8424a711a8962d261475a2f8ec13448.png"
import pestPhoto from "../imports/Services/ae46bab4a35600cf94747f7f013659abed2764b9.png"
import paintingPhoto from "../imports/Services/9012091591689377023e135270a7e38953d2d393.png"
import airconPhoto from "../imports/Services/bf861330172dbe2f069f7921fbad870702e63b0d.png"
import pestIllustration from "../imports/Services/popular-pest-control.png"
import cleaningIllustration from "../imports/Services/popular-cleaning.png"
import StyleTwoPageHeader from "./StyleTwoPageHeader"
import ResidentBottomNav from "../components/ResidentBottomNav"

type BookingStatus = "merchant" | "merchant-confirmed" | "professional-assigned" | "on-the-way" | "in-service" | "completed" | "cancelled"

type BookingFilter = "active" | "completed"
type BookingLayout = "compact" | "spacious"
type ServiceTarget = "cleaning" | "pest"

interface Booking {
  id: string
  service: string
  category: string
  scope: string
  date: string
  time: string
  priorityArrival?: boolean
  address: string
  price: string
  addOns: string
  basePrice: string
  addOnsPrice: string
  status: BookingStatus
  merchant: string
  professional?: string
  target: ServiceTarget
  image: string
  icon: IconSvgElement
}

interface Props {
  onBack: () => void
  onSelectCleaning: () => void
  onSelectPest: () => void
  onOpenSupport: () => void
}

const C = {
  primary: "#1c9dd7",
  primarySoft: "#eaf8fe",
  navy: "#16324f",
  text: "#314b62",
  muted: "#6b7f91",
  line: "#dcebf3",
  surface: "#f6fbfe",
  white: "#ffffff",
  success: "#16835c",
  successSoft: "#eaf8f2",
  orange: "#d98217",
  orangeSoft: "#fff5e6",
  red: "#c75b5b",
  redSoft: "#fff0f0",
}

const BOOKINGS: Booking[] = [
  {
    id: "IFM-260815-104",
    service: "Deep Cleaning",
    category: "Cleaning Service",
    scope: "Studio / 1-Bedroom",
    date: "Today, 15 Aug",
    time: "09:00",
    priorityArrival: true,
    address: "Unit #12-03, Charleston",
    price: "SGD 260",
    addOns: "No add-ons",
    basePrice: "SGD 220",
    addOnsPrice: "SGD 0",
    status: "merchant",
    merchant: "Matching a verified merchant",
    target: "cleaning",
    image: cleaningPhoto,
    icon: CleaningBucketIcon,
  },
  {
    id: "IFM-260815-088",
    service: "General Pest Treatment",
    category: "Pest Control",
    scope: "Studio / 1-Bedroom",
    date: "Today, 15 Aug",
    time: "15:30",
    address: "Unit #12-03, Charleston",
    price: "SGD 170",
    addOns: "Heavy infestation",
    basePrice: "SGD 120",
    addOnsPrice: "SGD 50",
    status: "professional-assigned",
    merchant: "PestGuard Services",
    professional: "Daniel Lim",
    target: "pest",
    image: pestPhoto,
    icon: Bug01Icon,
  },
  {
    id: "IFM-260816-027",
    service: "House Cleaning",
    category: "Cleaning Service",
    scope: "Studio / 1-Bedroom",
    date: "Tomorrow, 16 Aug",
    time: "10:00",
    address: "Unit #12-03, Charleston",
    price: "SGD 120",
    addOns: "No add-ons",
    basePrice: "SGD 120",
    addOnsPrice: "SGD 0",
    status: "merchant-confirmed",
    merchant: "Everonx Clean",
    target: "cleaning",
    image: cleaningPhoto,
    icon: CleaningBucketIcon,
  },
  {
    id: "IFM-260815-073",
    service: "Carpet & Rug Cleaning",
    category: "Cleaning Service",
    scope: "Large rug",
    date: "Today, 15 Aug",
    time: "13:00",
    address: "Unit #12-03, Charleston",
    price: "SGD 95",
    addOns: "No add-ons",
    basePrice: "SGD 95",
    addOnsPrice: "SGD 0",
    status: "on-the-way",
    merchant: "Everonx Clean",
    professional: "Kumar Raj",
    target: "cleaning",
    image: cleaningPhoto,
    icon: CleaningBucketIcon,
  },
  {
    id: "IFM-260815-061",
    service: "Bed Bug Treatment",
    category: "Pest Control",
    scope: "Single room",
    date: "Today, 15 Aug",
    time: "12:00",
    address: "Unit #12-03, Charleston",
    price: "SGD 220",
    addOns: "No add-ons",
    basePrice: "SGD 220",
    addOnsPrice: "SGD 0",
    status: "in-service",
    merchant: "PestGuard Services",
    professional: "Siti Hana",
    target: "pest",
    image: pestPhoto,
    icon: Bug01Icon,
  },
  {
    id: "IFM-260801-511",
    service: "Pest Control Follow-up",
    category: "Pest Control",
    scope: "Follow-up visit",
    date: "1 Aug 2026",
    time: "14:00",
    address: "Unit #12-03, Charleston",
    price: "SGD 120",
    addOns: "No add-ons",
    basePrice: "SGD 120",
    addOnsPrice: "SGD 0",
    status: "completed",
    merchant: "PestGuard Services",
    professional: "Daniel Lim",
    target: "pest",
    image: pestPhoto,
    icon: Bug01Icon,
  },
  {
    id: "IFM-260729-102",
    service: "Sofa Cleaning",
    category: "Cleaning Service",
    scope: "3 Seater",
    date: "29 Jul 2026",
    time: "09:00",
    address: "Unit #12-03, Charleston",
    price: "SGD 95",
    addOns: "No add-ons",
    basePrice: "SGD 95",
    addOnsPrice: "SGD 0",
    status: "cancelled",
    merchant: "Everonx Clean",
    target: "cleaning",
    image: cleaningPhoto,
    icon: CleaningBucketIcon,
  },
]

const STATUS: Record<BookingStatus, {
  label: string
  detail: string
  color: string
  background: string
  step: number
}> = {
  merchant: {
    label: "Finding merchant",
    detail: "The platform is assigning a verified merchant.",
    color: C.orange,
    background: C.orangeSoft,
    step: 1,
  },
  "merchant-confirmed": {
    label: "Merchant confirmed",
    detail: "The merchant is preparing your service team.",
    color: C.primary,
    background: C.primarySoft,
    step: 2,
  },
  "professional-assigned": {
    label: "Professional assigned",
    detail: "Your service professional has been assigned.",
    color: C.success,
    background: C.successSoft,
    step: 3,
  },
  "on-the-way": {
    label: "Professional assigned",
    detail: "Your professional is travelling to the address.",
    color: C.success,
    background: C.successSoft,
    step: 4,
  },
  "in-service": {
    label: "Professional assigned",
    detail: "Your professional is completing the service.",
    color: C.success,
    background: C.successSoft,
    step: 5,
  },
  completed: {
    label: "Completed",
    detail: "Service completed. Your receipt is ready.",
    color: C.success,
    background: C.successSoft,
    step: 6,
  },
  cancelled: {
    label: "Cancelled",
    detail: "This booking was cancelled before service started.",
    color: C.red,
    background: C.redSoft,
    step: 0,
  },
}

const SERVICE_COMPLETION_PHOTOS = [
  { src: pestPhoto, position: "52% 48%" },
  { src: cleaningPhoto, position: "50% 48%" },
  { src: paintingPhoto, position: "50% 45%" },
  { src: airconPhoto, position: "55% 42%" },
  { src: pestIllustration, position: "50% 50%" },
  { src: cleaningIllustration, position: "50% 50%" },
]

function FlowIcon({
  icon,
  size = 20,
  color = C.primary,
}: {
  icon: IconSvgElement
  size?: number
  color?: string
}) {
  return (
    <HugeiconsIcon icon={icon} size={size} color={color} strokeWidth={1.8} />
  )
}

function statusForFilter(status: BookingStatus): BookingFilter {
  if (status === "completed") return "completed"
  if (status === "cancelled") return "completed"
  return "active"
}

function StatusPill({ status }: { status: BookingStatus }) {
  const meta = STATUS[status]
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        minHeight: 24,
        padding: "0 8px",
        borderRadius: 999,
        background: meta.background,
        color: meta.color,
        fontSize: 10,
        fontWeight: 800,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: meta.color,
        }}
      />
      {meta.label}
    </span>
  )
}

function BookingCard({
  booking,
  onOpen,
}: {
  booking: Booking
  onOpen: () => void
}) {
  const meta = STATUS[booking.status]
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${
        booking.priorityArrival ? "priority " : ""
      }${booking.service} booking details`}
      style={{
        width: "100%",
        padding: 0,
        border: `1px solid ${C.line}`,
        borderRadius: 14,
        background: C.white,
        overflow: "hidden",
        textAlign: "left",
        cursor: "pointer",
        boxShadow: "0 4px 13px rgba(34, 78, 110, 0.06)",
        transition: "transform 160ms ease, box-shadow 160ms ease",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "translateY(-1px)"
        event.currentTarget.style.boxShadow =
          "0 8px 18px rgba(34, 78, 110, 0.1)"
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "translateY(0)"
        event.currentTarget.style.boxShadow =
          "0 4px 13px rgba(34, 78, 110, 0.06)"
      }}
    >
      <div style={{ display: "flex", alignItems: "stretch", minHeight: 104 }}>
        <div
          style={{
            position: "relative",
            width: 92,
            flexShrink: 0,
            background: C.primarySoft,
          }}
        >
          <img
            src={booking.image}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 7,
              bottom: 7,
              width: 28,
              height: 28,
              borderRadius: 9,
              display: "grid",
              placeItems: "center",
              background: "rgba(255,255,255,0.94)",
              boxShadow: "0 3px 8px rgba(22,50,79,0.14)",
            }}
          >
            <FlowIcon icon={booking.icon} size={16} />
          </span>
        </div>
        <div style={{ minWidth: 0, flex: 1, padding: "11px 11px 10px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 6,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  minWidth: 0,
                  color: C.navy,
                  fontSize: 13,
                  fontWeight: 900,
                  lineHeight: 1.25,
                }}
              >
                {booking.priorityArrival && (
                  <span
                    aria-label="Priority arrival"
                    style={{
                      display: "inline-grid",
                      flexShrink: 0,
                      placeItems: "center",
                      color: C.orange,
                    }}
                  >
                    <FlowIcon icon={FlashIcon} size={15} color={C.orange} />
                  </span>
                )}
                <span
                  style={{
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {booking.service}
                </span>
              </div>
              <div
                style={{
                  marginTop: 3,
                  color: C.muted,
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                {booking.id}
              </div>
            </div>
            <StatusPill status={booking.status} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginTop: 9,
              color: C.text,
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            <FlowIcon icon={Calendar03Icon} size={14} color={C.primary} />
            <span>{booking.date}</span>
            <span style={{ color: "#b3c1cb" }}>|</span>
            <span>{booking.time}</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              marginTop: 8,
            }}
          >
            <span
              style={{
                minWidth: 0,
                color: meta.color,
                fontSize: 10,
                fontWeight: 800,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {meta.detail}
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}

function SpaciousBookingCard({
  booking,
  onOpen,
}: {
  booking: Booking
  onOpen: () => void
}) {
  const meta = STATUS[booking.status]
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${
        booking.priorityArrival ? "priority " : ""
      }${booking.service} booking details`}
      style={{
        width: "100%",
        padding: 0,
        border: `1px solid ${C.line}`,
        borderRadius: 18,
        background: C.white,
        overflow: "hidden",
        textAlign: "left",
        cursor: "pointer",
        boxShadow: "0 5px 18px rgba(34, 78, 110, 0.065)",
      }}
    >
      <div
        style={{
          margin: 10,
          marginBottom: 0,
          overflow: "hidden",
          aspectRatio: "2.25 / 1",
          borderRadius: 13,
          background: C.primarySoft,
        }}
      >
        <img
          src={booking.image}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <div style={{ padding: "14px 15px 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                color: C.muted,
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {booking.category}
            </div>
            <div
              style={{
                marginTop: 3,
                color: C.navy,
                fontSize: 16,
                fontWeight: 900,
                lineHeight: 1.2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {booking.service}
            </div>
            <div
              style={{
                marginTop: 4,
                color: C.muted,
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              {booking.id}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 7,
              flexShrink: 0,
            }}
          >
            <span style={{ color: C.primary, fontSize: 16, fontWeight: 900 }}>
              {booking.price}
            </span>
            <StatusPill status={booking.status} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 7,
            marginTop: 13,
          }}
        >
          <div
            style={{
              padding: "8px 10px",
              borderRadius: 11,
              background: C.surface,
              border: `1px solid ${C.line}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                color: C.muted,
                fontSize: 9,
                fontWeight: 800,
              }}
            >
              <FlowIcon icon={Calendar03Icon} size={13} color={C.primary} />{" "}
              Appointment
            </div>
            <div
              style={{
                marginTop: 4,
                color: C.navy,
                fontSize: 10,
                fontWeight: 900,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {booking.date} · {booking.time}
            </div>
            <div
              style={{
                marginTop: 2,
                color: C.text,
                fontSize: 9,
                fontWeight: 700,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {booking.scope}
            </div>
          </div>
          <div
            style={{
              padding: "9px 10px",
              borderRadius: 11,
              background: meta.background,
              border: `1px solid ${meta.color}28`,
            }}
          >
            <div
              style={{
                color: meta.color,
                fontSize: 9,
                fontWeight: 800,
                lineHeight: 1.3,
              }}
            >
              {meta.detail}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            marginTop: 11,
            paddingTop: 10,
            borderTop: `1px solid ${C.line}`,
            color: C.muted,
            fontSize: 10,
            fontWeight: 700,
          }}
        >
          <FlowIcon icon={Location01Icon} size={14} color={C.primary} />
          <span
            style={{
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {booking.address}
          </span>
          <span
            style={{
              marginLeft: "auto",
              color: C.primary,
              fontWeight: 900,
              whiteSpace: "nowrap",
            }}
          >
            View details →
          </span>
        </div>
      </div>
    </button>
  )
}

function BookingLayoutToggle({
  layout,
  onChange,
}: {
  layout: BookingLayout
  onChange: (next: BookingLayout) => void
}) {
  return (
    <div
      role="group"
      aria-label="Bookings layout"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        padding: 3,
        border: `1px solid ${C.line}`,
        borderRadius: 11,
        background: C.surface,
      }}
    >
      <button
        type="button"
        onClick={() => onChange("compact")}
        aria-label="Compact booking list"
        aria-pressed={layout === "compact"}
        title="Compact booking list"
        style={{
          width: 34,
          height: 34,
          border: "none",
          borderRadius: 8,
          background: layout === "compact" ? C.white : "transparent",
          color: layout === "compact" ? C.primary : C.muted,
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
          boxShadow:
            layout === "compact" ? "0 2px 6px rgba(22,50,79,0.08)" : "none",
        }}
      >
        <FlowIcon icon={ListViewIcon} size={18} color="currentColor" />
      </button>
      <button
        type="button"
        onClick={() => onChange("spacious")}
        aria-label="Spacious booking cards"
        aria-pressed={layout === "spacious"}
        title="Spacious booking cards"
        style={{
          width: 34,
          height: 34,
          border: "none",
          borderRadius: 8,
          background: layout === "spacious" ? C.white : "transparent",
          color: layout === "spacious" ? C.primary : C.muted,
          display: "grid",
          placeItems: "center",
          cursor: "pointer",
          boxShadow:
            layout === "spacious" ? "0 2px 6px rgba(22,50,79,0.08)" : "none",
        }}
      >
        <FlowIcon icon={LayoutGridIcon} size={18} color="currentColor" />
      </button>
    </div>
  )
}

function BottomNav({
  onHome,
  onSupport,
}: {
  onHome: () => void
  onSupport: () => void
}) {
  return (
    <ResidentBottomNav
      active="bookings"
      onHome={onHome}
      onSupport={onSupport}
    />
  )
}

function BookingDetail({
  booking,
  onBack,
  onRebook,
  onOpenSupport,
}: {
  booking: Booking
  onBack: () => void
  onRebook: () => void
  onOpenSupport: () => void
}) {
  const meta = STATUS[booking.status]
  const isCancelled = booking.status === "cancelled"
  const isCompleted = booking.status === "completed"
  const isInProgress = statusForFilter(booking.status) === "active"
  const isProfessionalAssigned = [
    "professional-assigned",
    "on-the-way",
    "in-service",
  ].includes(booking.status)
  const hasMerchant = booking.status !== "merchant"
  const hasProfessional = Boolean(booking.professional)
  const [isCancelOpen, setIsCancelOpen] = useState(false)
  const [cancelReason, setCancelReason] = useState("")
  const [cancelRequested, setCancelRequested] = useState(false)
  const [completionConfirmed, setCompletionConfirmed] = useState(false)
  const infoRows = [
    { label: "Date", value: booking.date, icon: Calendar03Icon },
    { label: "Time", value: booking.time, icon: Clock03Icon },
    { label: "Location", value: booking.address, icon: Location01Icon },
    { label: "Add-ons", value: booking.addOns, icon: TaskDone01Icon },
  ]

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <StyleTwoPageHeader
        title="Booking details"
        onBack={onBack}
        backLabel="Back to bookings"
      />

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 12px 20px",
          scrollbarWidth: "none",
        }}
      >
        <section
          style={{
            overflow: "hidden",
            border: `1px solid ${C.line}`,
            borderRadius: 15,
            background: C.white,
            boxShadow: "0 4px 13px rgba(34, 78, 110, 0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 11,
              alignItems: "center",
              padding: "13px",
              background: C.primarySoft,
              borderBottom: `1px solid ${C.line}`,
            }}
          >
            <div
              style={{
                position: "relative",
                width: 54,
                height: 54,
                overflow: "hidden",
                borderRadius: 13,
                background: C.primarySoft,
                flexShrink: 0,
              }}
            >
              <img
                src={booking.image}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: C.navy,
                  fontSize: 14,
                  fontWeight: 900,
                }}
              >
                {booking.priorityArrival && (
                  <span
                    aria-label="Priority arrival"
                    style={{
                      display: "inline-grid",
                      flexShrink: 0,
                      placeItems: "center",
                      color: C.orange,
                    }}
                  >
                    <FlowIcon icon={FlashIcon} size={17} color={C.orange} />
                  </span>
                )}
                <span>{booking.service}</span>
              </div>
              <div
                style={{
                  marginTop: 3,
                  color: C.muted,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {booking.scope} - Fixed-price service
              </div>
              <div style={{ marginTop: 7 }}>
                <StatusPill status={booking.status} />
              </div>
            </div>
          </div>
          <div style={{ padding: "7px 13px" }}>
            {infoRows.map((row, index) => (
              <BookingInfoRow
                key={row.label}
                {...row}
                last={index === infoRows.length - 1}
              />
            ))}
          </div>
        </section>

        <section
          style={{
            marginTop: 12,
            padding: "13px",
            border: `1px solid ${C.line}`,
            borderRadius: 15,
            background: C.white,
          }}
        >
          <div
            style={{
              color: C.navy,
              fontSize: 13,
              fontWeight: 900,
              marginBottom: 9,
            }}
          >
            Price breakdown
          </div>
          <BookingPriceRow label="Base service" value={booking.basePrice} />
          <BookingPriceRow
            label="Selected add-ons"
            value={booking.addOnsPrice}
          />
          <BookingPriceRow
            label="Priority arrival"
            value={booking.priorityArrival ? "+ SGD 40" : "Not selected"}
            color={booking.priorityArrival ? C.orange : C.muted}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              marginTop: 9,
              paddingTop: 10,
              borderTop: `2px solid ${C.line}`,
            }}
          >
            <span style={{ color: C.navy, fontSize: 13, fontWeight: 900 }}>
              Total payable
            </span>
            <span style={{ color: C.primary, fontSize: 21, fontWeight: 900 }}>
              {booking.price}
            </span>
          </div>
        </section>

        <section
          style={{
            marginTop: 12,
            padding: "13px",
            border: `1px solid ${C.line}`,
            borderRadius: 15,
            background: C.white,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 9,
                background: meta.background,
                display: "grid",
                placeItems: "center",
              }}
            >
              <FlowIcon
                icon={isCancelled ? Clock03Icon : CheckmarkCircle01Icon}
                size={17}
                color={meta.color}
              />
            </span>
            <div>
              <div style={{ color: C.navy, fontSize: 13, fontWeight: 900 }}>
                {meta.label}
              </div>
              <div
                style={{
                  marginTop: 2,
                  color: meta.color,
                  fontSize: 10,
                  lineHeight: 1.35,
                }}
              >
                {meta.detail}
              </div>
            </div>
          </div>
        </section>

        {hasMerchant && (
          <section
            style={{
              marginTop: 12,
              padding: "13px",
              border: `1px solid ${C.line}`,
              borderRadius: 15,
              background: C.white,
            }}
          >
            <div
              style={{
                color: C.navy,
                fontSize: 13,
                fontWeight: 900,
                marginBottom: 11,
              }}
            >
              Service contacts
            </div>
            <ContactRow
              icon={Building02Icon}
              title="Merchant"
              name={booking.merchant}
              buttonLabel="Contact merchant"
              onContact={onOpenSupport}
            />
            {hasProfessional && (
              <>
                <div
                  style={{ height: 1, margin: "11px 0", background: C.line }}
                />
                <ContactRow
                  icon={User02Icon}
                  title="Service professional"
                  name={booking.professional ?? ""}
                  buttonLabel="Contact professional"
                  onContact={onOpenSupport}
                />
              </>
            )}
          </section>
        )}

        {(isProfessionalAssigned || isCompleted) && (
          <ServiceCompletedPhotos booking={booking} />
        )}

        {isInProgress && !isProfessionalAssigned && !cancelRequested && (
          <button
            type="button"
            onClick={() => setIsCancelOpen(true)}
            style={{
              width: "100%",
              minHeight: 44,
              marginTop: 14,
              border: `1px solid ${C.red}`,
              borderRadius: 12,
              background: C.white,
              color: C.red,
              fontSize: 12,
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Cancel booking
          </button>
        )}

        {cancelRequested && (
          <section
            style={{
              marginTop: 14,
              padding: "12px 13px",
              border: `1px solid ${C.line}`,
              borderRadius: 14,
              background: C.white,
            }}
          >
            <div style={{ color: C.navy, fontSize: 12, fontWeight: 900 }}>
              Cancellation request sent
            </div>
            <div
              style={{
                marginTop: 4,
                color: C.muted,
                fontSize: 10,
                lineHeight: 1.4,
              }}
            >
              We have recorded your request and will follow up shortly.
            </div>
          </section>
        )}

        {isProfessionalAssigned && !completionConfirmed && (
          <button
            type="button"
            onClick={() => setCompletionConfirmed(true)}
            style={{
              width: "100%",
              minHeight: 46,
              marginTop: 14,
              border: "none",
              borderRadius: 12,
              background: C.success,
              color: C.white,
              fontSize: 12,
              fontWeight: 900,
              cursor: "pointer",
              boxShadow: "0 8px 18px rgba(22,131,92,0.22)",
            }}
          >
            Confirm service completed
          </button>
        )}

        {completionConfirmed && (
          <section
            aria-live="polite"
            style={{
              marginTop: 14,
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "12px 13px",
              border: `1px solid ${C.success}`,
              borderRadius: 14,
              background: C.successSoft,
            }}
          >
            <span
              style={{
                width: 29,
                height: 29,
                borderRadius: 9,
                display: "grid",
                placeItems: "center",
                background: C.white,
                flexShrink: 0,
              }}
            >
              <FlowIcon
                icon={CheckmarkCircle01Icon}
                size={18}
                color={C.success}
              />
            </span>
            <div>
              <div style={{ color: C.success, fontSize: 12, fontWeight: 900 }}>
                Completion confirmed
              </div>
              <div
                style={{
                  marginTop: 2,
                  color: C.text,
                  fontSize: 10,
                  lineHeight: 1.4,
                }}
              >
                Thank you. Your confirmation has been recorded.
              </div>
            </div>
          </section>
        )}

        {(isCompleted || isCancelled) && (
          <button
            type="button"
            onClick={onRebook}
            style={{
              width: "100%",
              minHeight: 46,
              marginTop: 14,
              border: "none",
              borderRadius: 12,
              background: C.primary,
              color: C.white,
              fontSize: 13,
              fontWeight: 900,
              cursor: "pointer",
              boxShadow: "0 8px 18px rgba(28,157,215,0.25)",
            }}
          >
            Book this service again
          </button>
        )}
      </main>
      {isCancelOpen && (
        <CancelReasonModal
          reason={cancelReason}
          onChange={setCancelReason}
          onClose={() => setIsCancelOpen(false)}
          onSubmit={() => {
            setCancelRequested(true)
            setIsCancelOpen(false)
            setCancelReason("")
          }}
        />
      )}
    </div>
  )
}

function BookingInfoRow({
  icon,
  label,
  value,
  last,
}: {
  icon: IconSvgElement
  label: string
  value: string
  last: boolean
}) {
  const displayValues =
    label === "Add-ons" ? value.split(", ").filter(Boolean) : [value]

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        padding: "8px 0",
        borderBottom: last ? "none" : `1px solid ${C.line}`,
      }}
    >
      <FlowIcon icon={icon} size={15} color={C.primary} />
      <span
        style={{
          width: 62,
          flexShrink: 0,
          color: C.muted,
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        {label}
      </span>
      <span
        style={{
          minWidth: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4,
          color: C.navy,
          fontSize: 11,
          fontWeight: 800,
          lineHeight: 1.35,
          textAlign: "right",
          overflowWrap: "anywhere",
        }}
      >
        {displayValues.map((displayValue, index) => (
          <span key={`${label}-${index}`}>{displayValue}</span>
        ))}
      </span>
    </div>
  )
}

function BookingPriceRow({
  label,
  value,
  color = C.navy,
}: {
  label: string
  value: string
  color?: string
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "4px 0",
        color: C.muted,
        fontSize: 11,
      }}
    >
      <span>{label}</span>
      <span style={{ color, fontWeight: 800, textAlign: "right" }}>
        {value}
      </span>
    </div>
  )
}

function ContactRow({
  icon,
  title,
  name,
  buttonLabel,
  onContact,
}: {
  icon: IconSvgElement
  title: string
  name: string
  buttonLabel: string
  onContact: () => void
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <span
        style={{
          width: 30,
          height: 30,
          borderRadius: 9,
          background: C.primarySoft,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        <FlowIcon icon={icon} size={17} />
      </span>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ color: C.muted, fontSize: 9, fontWeight: 800 }}>
          {title}
        </div>
        <div
          style={{
            marginTop: 2,
            color: C.navy,
            fontSize: 11,
            fontWeight: 800,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
      </div>
      <button
        type="button"
        onClick={onContact}
        style={{
          minHeight: 36,
          padding: "0 10px",
          border: `1px solid ${C.primary}`,
          borderRadius: 9,
          background: C.white,
          color: C.primary,
          fontSize: 10,
          fontWeight: 800,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

function ServiceCompletedPhotos({ booking }: { booking: Booking }) {
  return (
    <section
      style={{
        marginTop: 12,
        padding: "13px",
        border: `1px solid ${C.line}`,
        borderRadius: 15,
        background: C.white,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          marginBottom: 11,
        }}
      >
        <div style={{ color: C.navy, fontSize: 13, fontWeight: 900 }}>
          Service completed
        </div>
        <span style={{ color: C.success, fontSize: 10, fontWeight: 800 }}>
          6 photos
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 7,
        }}
      >
        {SERVICE_COMPLETION_PHOTOS.map((photo, index) => (
          <div
            key={`${booking.id}-${index}`}
            style={{
              position: "relative",
              overflow: "hidden",
              aspectRatio: "1.12 / 1",
              borderRadius: 9,
              background: C.primarySoft,
            }}
          >
            <img
              src={photo.src}
              alt={`${booking.service} service process photo ${index + 1}`}
              loading={index < 3 ? "eager" : "lazy"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: photo.position,
                display: "block",
              }}
            />
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                right: 5,
                bottom: 5,
                minWidth: 19,
                height: 19,
                padding: "0 5px",
                borderRadius: 6,
                display: "inline-grid",
                placeItems: "center",
                background: "rgba(22,50,79,0.72)",
                color: C.white,
                fontSize: 9,
                fontWeight: 900,
              }}
            >
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function CancelReasonModal({
  reason,
  onChange,
  onClose,
  onSubmit,
}: {
  reason: string
  onChange: (value: string) => void
  onClose: () => void
  onSubmit: () => void
}) {
  const canSubmit = reason.trim().length > 0
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cancel-booking-title"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "flex-end",
        background: "rgba(22,50,79,0.22)",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "18px 14px 16px",
          borderRadius: "18px 18px 0 0",
          background: C.white,
          boxShadow: "0 -10px 28px rgba(22,50,79,0.18)",
        }}
      >
        <div
          id="cancel-booking-title"
          style={{ color: C.navy, fontSize: 15, fontWeight: 900 }}
        >
          Cancel booking
        </div>
        <div
          style={{
            marginTop: 5,
            color: C.muted,
            fontSize: 10,
            lineHeight: 1.45,
          }}
        >
          Please tell us why you need to cancel this booking.
        </div>
        <textarea
          aria-label="Cancellation reason"
          value={reason}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter your reason"
          rows={4}
          style={{
            width: "100%",
            minHeight: 88,
            marginTop: 12,
            padding: "10px 11px",
            border: `1px solid ${C.line}`,
            borderRadius: 10,
            background: C.surface,
            color: C.navy,
            fontFamily: "inherit",
            fontSize: 11,
            lineHeight: 1.45,
            outline: "none",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 9,
            marginTop: 12,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              minHeight: 42,
              border: `1px solid ${C.line}`,
              borderRadius: 10,
              background: C.white,
              color: C.text,
              fontSize: 11,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Keep booking
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            style={{
              minHeight: 42,
              border: "none",
              borderRadius: 10,
              background: canSubmit ? C.red : "#e6edf1",
              color: canSubmit ? C.white : C.muted,
              fontSize: 11,
              fontWeight: 900,
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
          >
            Cancel booking
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BookingsPage({
  onBack,
  onSelectCleaning,
  onSelectPest,
  onOpenSupport,
}: Props) {
  const [filter, setFilter] = useState<BookingFilter>("active")
  const [bookingLayout, setBookingLayout] = useState<BookingLayout>("spacious")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filters = useMemo(
    () => [
      {
        id: "active" as const,
        label: "In progress",
        count: BOOKINGS.filter(
          (item) => statusForFilter(item.status) === "active",
        ).length,
      },
      {
        id: "completed" as const,
        label: "Completed",
        count: BOOKINGS.filter(
          (item) => statusForFilter(item.status) === "completed",
        ).length,
      },
    ],
    [],
  )
  const bookings = BOOKINGS.filter(
    (booking) => statusForFilter(booking.status) === filter,
  )
  const selected = BOOKINGS.find((booking) => booking.id === selectedId)

  if (selected) {
    return (
      <BookingDetail
        booking={selected}
        onBack={() => setSelectedId(null)}
        onRebook={
          selected.target === "cleaning" ? onSelectCleaning : onSelectPest
        }
        onOpenSupport={onOpenSupport}
      />
    )
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
        title="Bookings"
        onBack={onBack}
        backLabel="Back to Services"
      />

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "18px 16px 26px",
          scrollbarWidth: "none",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 8,
            marginBottom: 14,
          }}
        >
          {filters.map((item) => {
            const selectedFilter = filter === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={selectedFilter}
                style={{
                  minWidth: 0,
                  minHeight: 38,
                  border: `1px solid ${selectedFilter ? C.primary : C.line}`,
                  borderRadius: 10,
                  background: selectedFilter ? C.primary : C.white,
                  color: selectedFilter ? C.white : C.text,
                  padding: "0 7px",
                  fontSize: 11,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span>{item.label}</span>
                  <span
                    style={{
                      display: "inline-grid",
                      placeItems: "center",
                      minWidth: 18,
                      height: 18,
                      borderRadius: 6,
                      background: selectedFilter
                        ? "rgba(255,255,255,0.2)"
                        : C.primarySoft,
                      color: selectedFilter ? C.white : C.primary,
                      fontSize: 9,
                    }}
                  >
                    {item.count}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 9,
          }}
        >
          <div style={{ color: C.navy, fontSize: 14, fontWeight: 900 }}>
            {filters.find((item) => item.id === filter)?.label}
          </div>
          <div style={{ color: C.muted, fontSize: 11, fontWeight: 700 }}>
            {bookings.length} booking{bookings.length === 1 ? "" : "s"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {bookings.map((booking) => (
            <SpaciousBookingCard
              key={booking.id}
              booking={booking}
              onOpen={() => setSelectedId(booking.id)}
            />
          ))}
        </div>
      </main>
      <BottomNav onHome={onBack} onSupport={onOpenSupport} />
    </div>
  )
}
