import { useState } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  Add01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  BedDoubleIcon,
  BrushCleaningIcon,
  Calendar03Icon,
  CalendarCheckIcon,
  CheckmarkCircle01Icon,
  CleaningBucketIcon,
  Clock03Icon,
  FlashIcon,
  Home01Icon,
  House01Icon,
  HouseHeartIcon,
  Location01Icon,
  MapPinIcon,
  Message01Icon,
  MinusSignIcon,
  Note01Icon,
  SecurityCheckIcon,
  Sofa01Icon,
  SprayCanIcon,
  Stairs01Icon,
  TaskDone01Icon,
  Tick02Icon,
  UserShield01Icon,
  WindowsNewIcon,
} from "@hugeicons/core-free-icons"
import StyleTwoPageHeader from "./StyleTwoPageHeader"
import AddonQuantityStepper from "./AddonQuantityStepper"

const catalogueImg =
  "https://images.unsplash.com/photo-1649083048337-4aeb6dda80bb?w=800&q=80"

// ── Types ──────────────────────────────────────────────────────────
type CleanType = "general" | "deep" | "sofa" | "mattress" | "carpet"
type HomeSize = "studio" | "2br" | "3br"
type SofaSize = "1seater" | "2seater" | "3seater" | "lshape"
type MattressSize = "single" | "queen" | "king"
type CarpetSize = "small" | "medium" | "large"
type AnySize = HomeSize | SofaSize | MattressSize | CarpetSize

interface BookingData {
  cleanType: CleanType
  size: AnySize
  sizeQuantities: Record<string, number>
  date: number | null
  time: string
  extras: string[]
  extraQuantities: Record<string, number>
  notes: string
  priorityArrival: boolean
}

// ── Pricing ────────────────────────────────────────────────────────
const PRICES: Record<CleanType, Record<string, number>> = {
  general: { studio: 120, "2br": 160, "3br": 210 },
  deep: { studio: 220, "2br": 320, "3br": 420 },
  sofa: { "1seater": 40, "2seater": 70, "3seater": 95, lshape: 150 },
  mattress: { single: 45, queen: 65, king: 80 },
  carpet: { small: 35, medium: 60, large: 95 },
}

const EXTRAS_LIST = [
  { id: "pet", label: "Home with pet", price: 30 },
  { id: "stain", label: "Heavy stain treatment", price: 15 },
  { id: "window", label: "Interior window cleaning", price: 12 },
  { id: "staircase", label: "Staircase / loft cleaning", price: 25 },
]

const PHOTOS: Record<CleanType, string> = {
  general:
    "https://images.unsplash.com/photo-1647381518264-97ff1835026f?w=400&q=80",
  deep: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80",
  sofa: "https://images.unsplash.com/photo-1686178827149-6d55c72d81df?w=400&q=80",
  mattress:
    "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&q=80",
  carpet:
    "https://images.unsplash.com/photo-1742483359033-13315b247c74?w=400&q=80",
}

const STEPS = ["Type", "Size", "Date & Time", "Add-ons", "Confirm"]

const CLEAN_TYPES: { id: CleanType label: string sub: string }[] = [
  {
    id: "general",
    label: "General Home Cleaning",
    sub: "Routine home maintenance clean",
  },
  { id: "deep", label: "Deep Cleaning", sub: "Thorough top-to-bottom clean" },
  { id: "sofa", label: "Sofa Cleaning", sub: "Fabric & leather sofas" },
  {
    id: "mattress",
    label: "Mattress Cleaning",
    sub: "Dust mite & stain removal",
  },
  {
    id: "carpet",
    label: "Carpet / Rug Cleaning",
    sub: "Dry or steam cleaning",
  },
]

const SIZE_OPTIONS: Record<CleanType, { id: AnySize label: string }[]> = {
  general: [
    { id: "studio", label: "Studio / 1-Bedroom" },
    { id: "2br", label: "2-Bedroom" },
    { id: "3br", label: "3-Bedroom" },
  ],
  deep: [
    { id: "studio", label: "Studio / 1-Bedroom" },
    { id: "2br", label: "2-Bedroom" },
    { id: "3br", label: "3-Bedroom" },
  ],
  sofa: [
    { id: "1seater", label: "1 Seater" },
    { id: "2seater", label: "2 Seater" },
    { id: "3seater", label: "3 Seater" },
    { id: "lshape", label: "L-Shape Sofa" },
  ],
  mattress: [
    { id: "single", label: "Single" },
    { id: "queen", label: "Queen" },
    { id: "king", label: "King" },
  ],
  carpet: [
    { id: "small", label: "Small (< 5 sqm)" },
    { id: "medium", label: "Medium (5–10 sqm)" },
    { id: "large", label: "Large (> 10 sqm)" },
  ],
}

const CAL_START_DAY = 6
const CAL_TOTAL_DAYS = 31
const TODAY = 6

function formatTimeLabel(totalMinutes: number) {
  const hours24 = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours24}:${minutes.toString().padStart(2, "0")}`
}

function buildTimeSlots(
  startHour: number,
  endHour: number,
  intervalMinutes: number,
) {
  const slots: string[] = []
  for (
    let start = startHour * 60;
    start + intervalMinutes <= endHour * 60;
    start += intervalMinutes
  ) {
    const end = start + intervalMinutes
    slots.push(`${formatTimeLabel(start)}-${formatTimeLabel(end)}`)
  }
  return slots
}

function buildTimePoints(
  startHour: number,
  endHour: number,
  intervalMinutes: number,
) {
  const points: string[] = []
  for (
    let time = startHour * 60;
    time < endHour * 60;
    time += intervalMinutes
  ) {
    points.push(formatTimeLabel(time))
  }
  return points
}

const TIME_SLOTS = buildTimeSlots(9, 22, 30)
const STYLE_TWO_TIME_POINTS = buildTimePoints(9, 22, 30)
const STYLE_TWO_PRIORITY_TIMES = new Set(["9:00", "9:30", "10:00"])
const PRIORITY_ARRIVAL_MINUTES = 120
const PRIORITY_ARRIVAL_FEE = 40
const PRIORITY_ARRIVAL_TIME = `Within ${PRIORITY_ARRIVAL_MINUTES} minutes`
const PRIORITY_ARRIVAL_FEE_LABEL = `+ SGD ${PRIORITY_ARRIVAL_FEE}`

const C = {
  primary: "#1c9dd7",
  dark: "#16324f",
  gray: "#6b7787",
  light: "#eaf0f5",
  bg: "#fafcfe",
  white: "#ffffff",
}

const STYLE_TWO_FLOW = {
  surface: "#f7fbfd",
  navy: "#31536f",
  blue: "#1c9dd7",
  blueSoft: "#e5f4fb",
  bluePale: "#f3faff",
  border: "#dbeaf2",
  green: "#16834f",
  greenSoft: "#eaf8f0",
  orange: "#d97706",
  orangeSoft: "#fff5df",
}

function FlowIcon({
  icon,
  size = 20,
  color = C.primary,
  strokeWidth = 1.7,
}: {
  icon: IconSvgElement
  size?: number
  color?: string
  strokeWidth?: number
}) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    />
  )
}

function selectBookingDate(
  setBooking: React.Dispatch<React.SetStateAction<BookingData>>,
  date: number,
) {
  setBooking((current) =>
    current.priorityArrival && date !== TODAY
      ? { ...current, date, time: "", priorityArrival: false }
      : { ...current, date },
  )
}

function selectRegularArrival(
  setBooking: React.Dispatch<React.SetStateAction<BookingData>>,
  time: string,
) {
  setBooking((current) => ({
    ...current,
    date: current.priorityArrival ? TODAY + 1 : current.date,
    time,
    priorityArrival: false,
  }))
}

function selectStyleTwoArrival(
  setBooking: React.Dispatch<React.SetStateAction<BookingData>>,
  time: string,
) {
  setBooking((current) => ({
    ...current,
    time,
    priorityArrival: STYLE_TWO_PRIORITY_TIMES.has(time),
  }))
}

function PriorityArrivalOption({
  booking,
  setBooking,
}: {
  booking: BookingData
  setBooking: React.Dispatch<React.SetStateAction<BookingData>>
}) {
  const selected = booking.priorityArrival
  return (
    <button
      className="priority-arrival-option"
      type="button"
      aria-pressed={selected}
      onClick={() =>
        setBooking((current) => ({
          ...current,
          date: TODAY,
          time: PRIORITY_ARRIVAL_TIME,
          priorityArrival: true,
        }))
      }
      style={{
        width: "100%",
        minHeight: 64,
        marginBottom: 12,
        padding: "10px 12px",
        border: `1.5px solid ${selected ? STYLE_TWO_FLOW.orange : "#f1d19a"}`,
        borderRadius: 13,
        background: selected ? STYLE_TWO_FLOW.orangeSoft : "#fffaf0",
        display: "flex",
        alignItems: "center",
        gap: 10,
        textAlign: "left",
        cursor: "pointer",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <span
        style={{
          width: 40,
          height: 40,
          borderRadius: 11,
          background: selected ? "#ffe3a3" : "#ffefcf",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <FlowIcon
          icon={FlashIcon}
          size={21}
          color={STYLE_TWO_FLOW.orange}
          strokeWidth={1.8}
        />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 800,
            color: C.dark,
          }}
        >
          Priority arrival
        </span>
        <span
          style={{
            display: "block",
            marginTop: 3,
            fontSize: 10,
            lineHeight: 1.35,
            color: C.gray,
          }}
        >
          {PRIORITY_ARRIVAL_TIME}
        </span>
      </span>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 3,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: STYLE_TWO_FLOW.orange,
          }}
        >
          URGENT
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 900,
            color: STYLE_TWO_FLOW.orange,
          }}
        >
          {PRIORITY_ARRIVAL_FEE_LABEL}
        </span>
      </span>
    </button>
  )
}

// ── Shared: Step progress pills ────────────────────────────────────
function StyleTwoPriorityNote() {
  return (
    <div
      aria-label="Priority arrival available at 9:00, 9:30 and 10:00"
      style={{
        width: "100%",
        minHeight: 58,
        marginBottom: 12,
        padding: "9px 11px",
        border: "1.5px solid #f1d19a",
        borderRadius: 12,
        background: "#fffaf0",
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "#ffefcf",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <FlowIcon
          icon={FlashIcon}
          size={19}
          color={STYLE_TWO_FLOW.orange}
          strokeWidth={1.8}
        />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 800,
            color: C.dark,
          }}
        >
          Priority arrival
        </span>
        <span
          style={{
            display: "block",
            marginTop: 3,
            fontSize: 10,
            lineHeight: 1.35,
            color: C.gray,
          }}
        >
          Urgent same-day booking
        </span>
      </span>
      <span
        style={{
          flexShrink: 0,
          fontSize: 11,
          fontWeight: 900,
          color: STYLE_TWO_FLOW.orange,
        }}
      >
        {PRIORITY_ARRIVAL_FEE_LABEL}
      </span>
    </div>
  )
}

function StepProgress({ step }: { step: number }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 5,
        justifyContent: "center",
        padding: "0 20px 14px",
      }}
    >
      {STEPS.map((_, i) => (
        <div
          key={i}
          style={{
            height: 4,
            flex: i === step - 1 ? 2.5 : 1,
            borderRadius: 3,
            background:
              i < step ? C.primary : i === step - 1 ? C.primary : "#dce9f0",
            opacity: i < step ? 0.45 : 1,
            transition: "all 0.3s",
          }}
        />
      ))}
    </div>
  )
}

function CheckCircle() {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        background: "#dbeafe",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <FlowIcon
        icon={CheckmarkCircle01Icon}
        size={13}
        color={C.primary}
        strokeWidth={1.8}
      />
    </div>
  )
}

const EXTRA_HUGE_ICONS: IconSvgElement[] = [
  HouseHeartIcon,
  SprayCanIcon,
  WindowsNewIcon,
  Stairs01Icon,
]

const STYLE_TWO_TYPE_ICONS: IconSvgElement[] = [
  CleaningBucketIcon,
  BrushCleaningIcon,
  Sofa01Icon,
  BedDoubleIcon,
  SprayCanIcon,
]

const STYLE_TWO_ADD_ONS = [
  {
    id: "pet",
    label: "Home with pet",
    price: 30,
    unit: "visit",
    icon: HouseHeartIcon,
  },
  {
    id: "stain",
    label: "Heavy stain treatment",
    price: 15,
    unit: "seat or item",
    icon: SprayCanIcon,
  },
  {
    id: "staircase",
    label: "Staircase / loft cleaning",
    price: 25,
    unit: "area",
    icon: Stairs01Icon,
  },
  {
    id: "window",
    label: "Interior window cleaning",
    price: 12,
    unit: "panel",
    icon: WindowsNewIcon,
  },
  {
    id: "urgent",
    label: "Urgent same-day booking",
    price: 40,
    unit: "booking",
    icon: FlashIcon,
  },
] as const

const MAX_ADD_ON_QUANTITY = 99

function PriceRow({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color?: string
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8,
      }}
    >
      <span style={{ fontSize: 12, color: C.gray }}>{label}</span>
      <span style={{ fontWeight: 600, fontSize: 12, color: color ?? C.dark }}>
        {value}
      </span>
    </div>
  )
}

// ── Shared extras icon config ──────────────────────────────────────
const extrasConfig = [
  { bg: "#e8f4fd", accentBg: "#bfe0f5", icon: EXTRA_HUGE_ICONS[0] },
  { bg: "#edf6ff", accentBg: "#c2e1f8", icon: EXTRA_HUGE_ICONS[1] },
  { bg: "#e6f7ff", accentBg: "#b8dff5", icon: EXTRA_HUGE_ICONS[2] },
  { bg: "#e8f5fe", accentBg: "#bfdef5", icon: EXTRA_HUGE_ICONS[3] },
]
const STYLE_TWO_CATALOGUE_ROWS = [
  {
    title: "General Home Cleaning",
    options: ["Studio / 1-Bedroom", "2-Bedroom", "3-Bedroom"],
    prices: [120, 160, 210],
    icon: Home01Icon,
    tone: STYLE_TWO_FLOW.blue,
  },
  {
    title: "Deep Cleaning",
    options: ["Studio / 1-Bedroom", "2-Bedroom", "3-Bedroom"],
    prices: [220, 320, 420],
    icon: BrushCleaningIcon,
    tone: STYLE_TWO_FLOW.blue,
  },
  {
    title: "Sofa Cleaning",
    options: ["1 Seater", "2 Seater", "3 Seater", "L-Shape Sofa"],
    prices: [40, 70, 95, 150],
    icon: Sofa01Icon,
    tone: STYLE_TWO_FLOW.blue,
  },
  {
    title: "Mattress Cleaning",
    options: ["Single", "Queen", "King"],
    prices: [45, 65, 80],
    icon: BedDoubleIcon,
    tone: STYLE_TWO_FLOW.blue,
  },
  {
    title: "Carpet / Rug Cleaning",
    options: ["Small", "Medium", "Large"],
    prices: [35, 60, 95],
    icon: CleaningBucketIcon,
    tone: STYLE_TWO_FLOW.blue,
  },
]

function StyleTwoHeader({ step, onBack }: { step: number onBack: () => void }) {
  return (
    <StyleTwoPageHeader
      title="Cleaning Service"
      subtitle={step > 0 ? `Step ${step} of 5` : undefined}
      onBack={onBack}
    />
  )
}

function StyleTwoProgress({ step }: { step: number }) {
  const labels = ["Type", "Size", "Schedule", "Extras", "Confirm"]
  return (
    <div
      style={{
        background: "white",
        padding: "11px 12px 10px",
        borderBottom: `1px solid ${STYLE_TWO_FLOW.border}`,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {labels.map((label, index) => (
          <div
            key={label}
            style={{ flex: 1, display: "flex", alignItems: "center" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                minWidth: 38,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  background:
                    index < step
                      ? STYLE_TWO_FLOW.green
                      : index === step
                        ? STYLE_TWO_FLOW.blue
                        : "#e8f0f4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {index < step ? (
                  <FlowIcon
                    icon={CheckmarkCircle01Icon}
                    size={14}
                    color="white"
                    strokeWidth={2}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: index === step ? "white" : "#94a4af",
                    }}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: index === step ? STYLE_TWO_FLOW.blue : "#7d8c98",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>
            {index < labels.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  margin: "0 3px 18px",
                  background: index < step ? "#9bd7b6" : "#e8f0f4",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function StyleTwoPriceTable({ compact = false }: { compact?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: compact ? 8 : 10,
      }}
    >
      {STYLE_TWO_CATALOGUE_ROWS.map((row) => (
        <div
          key={row.title}
          style={{
            background: "white",
            border: `1px solid ${STYLE_TWO_FLOW.border}`,
            borderRadius: compact ? 12 : 14,
            padding: compact ? "9px 10px" : "11px 12px",
            boxShadow: "0 3px 10px rgba(22,50,79,0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: compact ? 7 : 9,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                background: `${row.tone}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FlowIcon
                icon={row.icon}
                size={16}
                color={row.tone}
                strokeWidth={1.8}
              />
            </div>
            <span
              style={{
                fontSize: compact ? 11 : 12,
                fontWeight: 800,
                color: STYLE_TWO_FLOW.navy,
              }}
            >
              {row.title}
            </span>
          </div>
          {row.options.map((option, index) => (
            <div
              key={option}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: compact ? "5px 0" : "6px 0",
                borderTop: index
                  ? `1px solid ${STYLE_TWO_FLOW.border}`
                  : "none",
                gap: 8,
              }}
            >
              <span style={{ fontSize: compact ? 10 : 11, color: "#364b5d" }}>
                {option}
              </span>
              <span
                style={{
                  fontSize: compact ? 10 : 11,
                  fontWeight: 800,
                  color: STYLE_TWO_FLOW.blue,
                  whiteSpace: "nowrap",
                }}
              >
                SGD {row.prices[index]} / visit
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function StyleTwoDetail({
  onBack,
  onBook,
}: {
  onBack: () => void
  onBook: () => void
}) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: STYLE_TWO_FLOW.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <StyleTwoHeader step={0} onBack={onBack} />
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px 18px" }}>
        <div
          style={{
            position: "relative",
            height: 138,
            borderRadius: 18,
            overflow: "hidden",
            marginBottom: 12,
            boxShadow: "0 8px 20px rgba(22,50,79,0.14)",
          }}
        >
          <img
            src={catalogueImg}
            alt="Cleaning Service"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(238,248,252,0.96), rgba(238,248,252,0.18))",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 16,
              top: 18,
              color: STYLE_TWO_FLOW.navy,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 0.8,
                opacity: 0.78,
              }}
            >
              MARKETPLACE FIXED-PRICE
            </div>
            <div
              style={{
                marginTop: 7,
                fontSize: 24,
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              Cleaning
              <br />
              Services
            </div>
            <div
              style={{
                marginTop: 8,
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 9,
                fontWeight: 700,
              }}
            >
              <FlowIcon
                icon={CheckmarkCircle01Icon}
                size={14}
                color={STYLE_TWO_FLOW.blue}
                strokeWidth={2}
              />{" "}
              Equipment included
            </div>
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: 15,
            padding: "14px 14px 13px",
            border: `1px solid ${STYLE_TWO_FLOW.border}`,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 7,
            }}
          >
            <HugeiconsIcon
              icon={SecurityCheckIcon}
              size={20}
              color={STYLE_TWO_FLOW.blue}
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <span
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: STYLE_TWO_FLOW.navy,
              }}
            >
              Reliable home cleaning
            </span>
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: C.gray }}>
            Routine, deep, and fabric cleaning with trained professionals,
            transparent fixed prices, and no hidden fees.
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 4,
                height: 22,
                borderRadius: 2,
                background: STYLE_TWO_FLOW.blue,
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 900,
                  color: STYLE_TWO_FLOW.navy,
                }}
              >
                Standard fixed-price jobs
              </div>
              <div style={{ fontSize: 10, color: C.gray }}>
                Choose a service and match it to your space
              </div>
            </div>
          </div>
          <StyleTwoPriceTable compact />
        </div>

        <div
          style={{
            background: STYLE_TWO_FLOW.greenSoft,
            border: "1px solid #b8e2c8",
            borderRadius: 15,
            padding: "13px 12px",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 9,
            }}
          >
            <div
              style={{
                width: 27,
                height: 27,
                borderRadius: 14,
                background: STYLE_TWO_FLOW.green,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FlowIcon
                icon={TaskDone01Icon}
                size={16}
                color="white"
                strokeWidth={2}
              />
            </div>
            <span style={{ fontSize: 15, fontWeight: 900, color: "#11663c" }}>
              Add-on charges
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 7,
            }}
          >
            {STYLE_TWO_ADD_ONS.map((addOn) => (
              <div
                key={addOn.id}
                style={{
                  background: "rgba(255,255,255,0.72)",
                  borderRadius: 10,
                  padding: "8px 7px",
                }}
              >
                <FlowIcon
                  icon={addOn.icon}
                  size={19}
                  color={STYLE_TWO_FLOW.green}
                  strokeWidth={1.7}
                />
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 9,
                    fontWeight: 800,
                    lineHeight: 1.2,
                    color: "#145b38",
                  }}
                >
                  {addOn.label}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 10,
                    fontWeight: 900,
                    color: STYLE_TWO_FLOW.green,
                  }}
                >
                  + SGD {addOn.price} / {addOn.unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: STYLE_TWO_FLOW.orangeSoft,
            border: "1px solid #f3c778",
            borderRadius: 15,
            padding: "13px 14px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <FlowIcon
              icon={Note01Icon}
              size={20}
              color={STYLE_TWO_FLOW.orange}
              strokeWidth={1.8}
            />
            <span style={{ fontSize: 15, fontWeight: 900, color: "#9a5200" }}>
              Service notes
            </span>
          </div>
          {[
            "Prices are reference prices for standard residential conditions.",
            "Final price may vary based on actual size and accessibility.",
            "Cleaning chemicals and basic equipment are included.",
            "Non-standard cases may require a custom quotation.",
          ].map((note) => (
            <div
              key={note}
              style={{
                display: "grid",
                gridTemplateColumns: "8px minmax(0, 1fr)",
                columnGap: 6,
                alignItems: "start",
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 4,
                  height: 4,
                  marginTop: 5,
                  marginLeft: 1,
                  borderRadius: "50%",
                  background: STYLE_TWO_FLOW.orange,
                }}
              />
              <span
                style={{ fontSize: 10, lineHeight: 1.35, color: "#704b1d" }}
              >
                {note}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          padding: "12px 16px 26px",
          background: "white",
          borderTop: `1px solid ${STYLE_TWO_FLOW.border}`,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBook}
          style={{
            width: "100%",
            minHeight: 48,
            border: "none",
            borderRadius: 14,
            background: STYLE_TWO_FLOW.blue,
            color: "white",
            fontFamily: "Inter, sans-serif",
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 7px 18px rgba(28,157,215,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          Start booking
        </button>
      </div>
    </div>
  )
}

function StyleTwoTypeStep({
  booking,
  setBooking,
}: {
  booking: BookingData
  setBooking: React.Dispatch<React.SetStateAction<BookingData>>
}) {
  return (
    <div style={{ padding: "16px 12px" }}>
      <div
        style={{ fontSize: 19, fontWeight: 900, color: STYLE_TWO_FLOW.navy }}
      >
        Choose a cleaning service
      </div>
      <div style={{ margin: "4px 0 14px", fontSize: 12, color: C.gray }}>
        Fixed-price options from the service catalogue
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {CLEAN_TYPES.map((type, index) => {
          const selected = booking.cleanType === type.id
          const min = Math.min(...Object.values(PRICES[type.id]))
          return (
            <button
              key={type.id}
              onClick={() =>
                setBooking((current) => ({
                  ...current,
                  cleanType: type.id,
                  size: Object.keys(PRICES[type.id])[0] as AnySize,
                  sizeQuantities: {
                    [Object.keys(PRICES[type.id])[0]]: 1,
                  },
                }))
              }
              style={{
                width: "100%",
                minHeight: 68,
                padding: "10px 12px",
                border: `1.5px solid ${
                  selected ? STYLE_TWO_FLOW.blue : STYLE_TWO_FLOW.border
                }`,
                borderRadius: 14,
                background: selected ? STYLE_TWO_FLOW.bluePale : "white",
                display: "flex",
                alignItems: "center",
                gap: 11,
                textAlign: "left",
                cursor: "pointer",
                boxShadow: selected
                  ? "0 5px 14px rgba(28,157,215,0.14)"
                  : "0 3px 10px rgba(22,50,79,0.04)",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: selected
                    ? STYLE_TWO_FLOW.blue
                    : STYLE_TWO_FLOW.blueSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <FlowIcon
                  icon={STYLE_TWO_TYPE_ICONS[index]}
                  size={23}
                  color={selected ? "white" : STYLE_TWO_FLOW.blue}
                  strokeWidth={1.7}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: STYLE_TWO_FLOW.navy,
                  }}
                >
                  {type.label}
                </div>
                <div style={{ marginTop: 3, fontSize: 11, color: C.gray }}>
                  {type.sub}
                </div>
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 900,
                  color: STYLE_TWO_FLOW.blue,
                  whiteSpace: "nowrap",
                }}
              >
                From SGD {min}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function StyleTwoSizeStep({
  booking,
  setBooking,
}: {
  booking: BookingData
  setBooking: React.Dispatch<React.SetStateAction<BookingData>>
}) {
  const type = CLEAN_TYPES.find((item) => item.id === booking.cleanType)
  const options = SIZE_OPTIONS[booking.cleanType]
  const quantityFor = (id: string) => booking.sizeQuantities[id] ?? 0
  const setSizeQuantity = (id: string, nextQuantity: number) => {
    const quantity = Math.max(0, Math.min(99, nextQuantity))
    setBooking((current) => {
      const nextQuantities = { ...current.sizeQuantities }
      if (quantity === 0) delete nextQuantities[id]
      else nextQuantities[id] = quantity
      return { ...current, sizeQuantities: nextQuantities }
    })
  }
  const selectedSizes = options.filter((o) => quantityFor(o.id) > 0)
  const sizesTotal = selectedSizes.reduce(
    (sum, o) =>
      sum + (PRICES[booking.cleanType]?.[o.id] ?? 0) * quantityFor(o.id),
    0,
  )
  return (
    <div style={{ padding: "16px 12px" }}>
      <div
        style={{ fontSize: 19, fontWeight: 900, color: STYLE_TWO_FLOW.navy }}
      >
        Choose your size
      </div>
      <div style={{ margin: "4px 0 14px", fontSize: 12, color: C.gray }}>
        {type?.label} pricing by space or item
      </div>
      <div
        style={{
          background: STYLE_TWO_FLOW.blueSoft,
          border: `1px solid ${STYLE_TWO_FLOW.border}`,
          borderRadius: 15,
          padding: "13px 14px",
          marginBottom: 12,
          color: STYLE_TWO_FLOW.navy,
        }}
      >
        <div
          style={{ fontSize: 12, fontWeight: 700, color: STYLE_TWO_FLOW.blue }}
        >
          Selected service
        </div>
        <div style={{ marginTop: 3, fontSize: 17, fontWeight: 900 }}>
          {type?.label}
        </div>
        {selectedSizes.length > 0 && (
          <div
            style={{
              marginTop: 8,
              paddingTop: 8,
              borderTop: `1px solid ${STYLE_TWO_FLOW.border}`,
              fontSize: 11,
              color: C.gray,
            }}
          >
            {selectedSizes
              .map(
                (o) =>
                  `${o.label} ×${quantityFor(o.id)} (SGD ${(PRICES[booking.cleanType]?.[o.id] ?? 0) * quantityFor(o.id)})`,
              )
              .join(", ")}
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((option) => {
          const quantity = quantityFor(option.id)
          const selected = quantity > 0
          const price = PRICES[booking.cleanType]?.[option.id] ?? 0
          return (
            <div
              key={option.id}
              style={{
                width: "100%",
                minHeight: 68,
                padding: "10px 12px",
                border: `1.5px solid ${
                  selected ? STYLE_TWO_FLOW.blue : STYLE_TWO_FLOW.border
                }`,
                borderRadius: 13,
                background: selected ? STYLE_TWO_FLOW.bluePale : "white",
                display: "flex",
                alignItems: "center",
                gap: 10,
                textAlign: "left",
              }}
            >
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 11,
                  background: selected
                    ? STYLE_TWO_FLOW.blue
                    : STYLE_TWO_FLOW.blueSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <FlowIcon
                  icon={Home01Icon}
                  size={21}
                  color={selected ? "white" : STYLE_TWO_FLOW.blue}
                  strokeWidth={1.8}
                />
              </span>
              <span style={{ flex: 1 }}>
                <span
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 800,
                    color: STYLE_TWO_FLOW.navy,
                  }}
                >
                  {option.label}
                </span>
                <span
                  style={{
                    display: "block",
                    marginTop: 3,
                    fontSize: 11,
                    color: C.gray,
                  }}
                >
                  SGD {price} / session
                </span>
              </span>
              <AddonQuantityStepper
                label={option.label}
                quantity={quantity}
                onDecrease={() => setSizeQuantity(option.id, quantity - 1)}
                onIncrease={() => setSizeQuantity(option.id, quantity + 1)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StyleTwoDateStep({
  booking,
  setBooking,
}: {
  booking: BookingData
  setBooking: React.Dispatch<React.SetStateAction<BookingData>>
}) {
  const cells: (number | null)[] = Array(CAL_START_DAY).fill(null)
  for (let day = 1; day <= CAL_TOTAL_DAYS; day++) cells.push(day)
  return (
    <div style={{ padding: "16px 12px" }}>
      <div
        style={{ fontSize: 19, fontWeight: 900, color: STYLE_TWO_FLOW.navy }}
      >
        Set your schedule
      </div>
      <div style={{ margin: "4px 0 14px", fontSize: 12, color: C.gray }}>
        Choose a date and preferred arrival time
      </div>
      <div
        style={{
          background: "white",
          border: `1px solid ${STYLE_TWO_FLOW.border}`,
          borderRadius: 15,
          padding: "14px 10px",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 900,
              color: STYLE_TWO_FLOW.navy,
            }}
          >
            August 2026
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              aria-label="Previous month"
              style={{
                width: 32,
                height: 32,
                border: "none",
                borderRadius: 9,
                background: STYLE_TWO_FLOW.blueSoft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FlowIcon
                icon={ArrowLeft01Icon}
                size={15}
                color={STYLE_TWO_FLOW.blue}
              />
            </button>
            <button
              aria-label="Next month"
              style={{
                width: 32,
                height: 32,
                border: "none",
                borderRadius: 9,
                background: STYLE_TWO_FLOW.blueSoft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FlowIcon
                icon={ArrowRight01Icon}
                size={15}
                color={STYLE_TWO_FLOW.blue}
              />
            </button>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            marginBottom: 4,
          }}
        >
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <span
              key={day}
              style={{
                textAlign: "center",
                fontSize: 10,
                fontWeight: 800,
                color: "#8c9ba7",
              }}
            >
              {day}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 3,
          }}
        >
          {cells.map((day, index) =>
            day === null ? (
              <div key={index} style={{ height: 32 }} />
            ) : (
              <button
                key={index}
                disabled={day <= TODAY}
                onClick={() => selectBookingDate(setBooking, day)}
                style={{
                  width: 32,
                  height: 32,
                  padding: 0,
                  margin: "0 auto",
                  border: "none",
                  borderRadius: 16,
                  background:
                    booking.date === day ? STYLE_TWO_FLOW.blue : "transparent",
                  color:
                    booking.date === day
                      ? "white"
                      : day <= TODAY
                        ? "#c9d5dc"
                        : STYLE_TWO_FLOW.navy,
                  fontSize: 12,
                  fontWeight: booking.date === day ? 900 : 500,
                  cursor: day <= TODAY ? "default" : "pointer",
                }}
              >
                {day}
              </button>
            ),
          )}
        </div>
      </div>
      <div
        style={{
          background: "white",
          border: `1px solid ${STYLE_TWO_FLOW.border}`,
          borderRadius: 15,
          padding: "14px 12px",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 900,
            color: STYLE_TWO_FLOW.navy,
            marginBottom: 10,
          }}
        >
          Preferred arrival time
        </div>
        <StyleTwoPriorityNote />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 7,
          }}
        >
          {STYLE_TWO_TIME_POINTS.map((time) => {
            const isSelected = booking.time === time
            const isPriority = STYLE_TWO_PRIORITY_TIMES.has(time)
            return (
              <button
                key={time}
                onClick={() => selectStyleTwoArrival(setBooking, time)}
                aria-label={isPriority ? `${time}, priority arrival` : time}
                style={{
                  position: "relative",
                  minHeight: 38,
                  border: `1px solid ${
                    isSelected ? STYLE_TWO_FLOW.blue : STYLE_TWO_FLOW.border
                  }`,
                  borderRadius: 9,
                  background: isSelected ? STYLE_TWO_FLOW.blue : "white",
                  color: isSelected ? "white" : STYLE_TWO_FLOW.navy,
                  fontSize: 10,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {isPriority && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: 3,
                      right: 4,
                      display: "flex",
                      lineHeight: 0,
                    }}
                  >
                    <FlowIcon
                      icon={FlashIcon}
                      size={11}
                      color={isSelected ? "white" : STYLE_TWO_FLOW.orange}
                      strokeWidth={2}
                    />
                  </span>
                )}
                {time}
              </button>
            )
          })}
        </div>
        {booking.date && booking.time && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              marginTop: 10,
              padding: "9px 10px",
              borderRadius: 10,
              background: STYLE_TWO_FLOW.blueSoft,
              color: STYLE_TWO_FLOW.blue,
            }}
          >
            <FlowIcon
              icon={CalendarCheckIcon}
              size={16}
              color={STYLE_TWO_FLOW.blue}
            />
            <span style={{ fontSize: 12, fontWeight: 800 }}>
              Aug {booking.date}, 2026 · {booking.time}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function StyleTwoAddOnsStep({
  booking,
  setBooking,
}: {
  booking: BookingData
  setBooking: React.Dispatch<React.SetStateAction<BookingData>>
}) {
  const quantityFor = (id: string) => booking.extraQuantities[id] ?? 0
  const setQuantity = (id: string, nextQuantity: number) => {
    const quantity = Math.max(0, Math.min(MAX_ADD_ON_QUANTITY, nextQuantity))
    setBooking((current) => {
      const nextQuantities = { ...current.extraQuantities }
      if (quantity === 0) delete nextQuantities[id]
      else nextQuantities[id] = quantity
      return {
        ...current,
        extraQuantities: nextQuantities,
        extras: Object.entries(nextQuantities)
          .filter(([, count]) => count > 0)
          .map(([extraId]) => extraId),
      }
    })
  }
  return (
    <div style={{ padding: "16px 12px" }}>
      <div
        style={{ fontSize: 19, fontWeight: 900, color: STYLE_TWO_FLOW.navy }}
      >
        Add-on charges
      </div>
      <div style={{ margin: "4px 0 14px", fontSize: 12, color: C.gray }}>
        Add as many units as you need. Your total updates instantly.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {STYLE_TWO_ADD_ONS.filter((addOn) => addOn.id !== "urgent").map(
          (addOn) => {
            const quantity = quantityFor(addOn.id)
            const isOn = quantity > 0
            return (
              <div
                key={addOn.id}
                style={{
                  width: "100%",
                  minHeight: 76,
                  padding: "10px 12px",
                  border: `1.5px solid ${
                    isOn ? STYLE_TWO_FLOW.green : STYLE_TWO_FLOW.border
                  }`,
                  borderRadius: 13,
                  background: isOn ? STYLE_TWO_FLOW.greenSoft : "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    background: isOn ? "#caecd7" : STYLE_TWO_FLOW.blueSoft,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <FlowIcon
                    icon={addOn.icon}
                    size={21}
                    color={isOn ? STYLE_TWO_FLOW.green : STYLE_TWO_FLOW.blue}
                    strokeWidth={1.7}
                  />
                </span>
                <span style={{ flex: 1 }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 800,
                      color: STYLE_TWO_FLOW.navy,
                    }}
                  >
                    {addOn.label}
                  </span>
                  <span
                    style={{
                      display: "block",
                      marginTop: 3,
                      fontSize: 11,
                      color: C.gray,
                    }}
                  >
                    + SGD {addOn.price} / {addOn.unit}
                  </span>
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    flexShrink: 0,
                    marginLeft: "auto",
                  }}
                >
                  <button
                    type="button"
                    aria-label={`Remove one ${addOn.label}`}
                    onClick={() => setQuantity(addOn.id, quantity - 1)}
                    disabled={!isOn}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      border: `1.5px solid ${
                        isOn ? STYLE_TWO_FLOW.border : "#e5edf1"
                      }`,
                      background: isOn ? "white" : "#f5f8fa",
                      color: isOn ? STYLE_TWO_FLOW.navy : "#b8c6cf",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: isOn ? "pointer" : "not-allowed",
                      opacity: isOn ? 1 : 0.7,
                    }}
                  >
                    <FlowIcon
                      icon={MinusSignIcon}
                      size={15}
                      color="currentColor"
                    />
                  </button>
                  <span
                    aria-live="polite"
                    style={{
                      minWidth: 22,
                      textAlign: "center",
                      fontSize: 14,
                      fontWeight: 900,
                      color: isOn ? STYLE_TWO_FLOW.green : C.gray,
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`Add one ${addOn.label}`}
                    onClick={() => setQuantity(addOn.id, quantity + 1)}
                    disabled={quantity >= MAX_ADD_ON_QUANTITY}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      border: `1.5px solid ${STYLE_TWO_FLOW.blue}`,
                      background: STYLE_TWO_FLOW.blue,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor:
                        quantity >= MAX_ADD_ON_QUANTITY
                          ? "not-allowed"
                          : "pointer",
                      boxShadow: "0 4px 10px rgba(28,157,215,0.18)",
                      opacity: quantity >= MAX_ADD_ON_QUANTITY ? 0.55 : 1,
                    }}
                  >
                    <FlowIcon icon={Add01Icon} size={15} color="white" />
                  </button>
                </span>
              </div>
            )
          },
        )}
      </div>
      <label
        style={{
          display: "block",
          marginTop: 12,
          background: "white",
          border: `1px solid ${STYLE_TWO_FLOW.border}`,
          borderRadius: 13,
          padding: "12px",
        }}
      >
        <span
          style={{
            display: "block",
            marginBottom: 7,
            fontSize: 12,
            fontWeight: 800,
            color: STYLE_TWO_FLOW.navy,
          }}
        >
          Service notes
        </span>
        <textarea
          aria-label="Service notes"
          value={booking.notes}
          onChange={(event) =>
            setBooking((current) => ({ ...current, notes: event.target.value }))
          }
          placeholder="Tell the cleaner what to focus on"
          rows={3}
          style={{
            width: "100%",
            boxSizing: "border-box",
            resize: "none",
            border: `1px solid ${STYLE_TWO_FLOW.border}`,
            borderRadius: 9,
            background: STYLE_TWO_FLOW.surface,
            padding: "9px 10px",
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            color: STYLE_TWO_FLOW.navy,
            outline: "none",
          }}
        />
      </label>
    </div>
  )
}

function StyleTwoConfirmStep({
  booking,
  base,
  extrasAmt,
  urgentAmt,
  total,
}: {
  booking: BookingData
  base: number
  extrasAmt: number
  urgentAmt: number
  total: number
}) {
  const typeLabel =
    CLEAN_TYPES.find((item) => item.id === booking.cleanType)?.label ?? ""
  const selectedSizes = SIZE_OPTIONS[booking.cleanType]
    .filter((item) => (booking.sizeQuantities[item.id] ?? 0) > 0)
    .map((item) => `${item.label} ×${booking.sizeQuantities[item.id]}`)
    .join(", ")
  const sizeLabel =
    selectedSizes ||
    (SIZE_OPTIONS[booking.cleanType]?.find((item) => item.id === booking.size)
      ?.label ??
      "")
  const selectedExtras = booking.extras
    .map((id) => {
      const label = EXTRAS_LIST.find((item) => item.id === id)?.label
      const quantity = booking.extraQuantities[id] ?? 1
      return label ? `${label} ×${quantity}` : undefined
    })
    .filter(Boolean)
    .join("\n")
  return (
    <div style={{ padding: "16px 12px" }}>
      <div
        style={{ fontSize: 19, fontWeight: 900, color: STYLE_TWO_FLOW.navy }}
      >
        Booking summary
      </div>
      <div style={{ margin: "4px 0 14px", fontSize: 12, color: C.gray }}>
        Check the service, schedule, and final price
      </div>
      <div
        style={{
          background: "white",
          border: `1px solid ${STYLE_TWO_FLOW.border}`,
          borderRadius: 15,
          overflow: "hidden",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            background: STYLE_TWO_FLOW.blueSoft,
            padding: "14px",
            borderBottom: `1px solid ${STYLE_TWO_FLOW.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <FlowIcon
              icon={CleaningBucketIcon}
              size={21}
              color={STYLE_TWO_FLOW.blue}
            />
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  color: STYLE_TWO_FLOW.navy,
                }}
              >
                {typeLabel}
              </div>
              <div style={{ marginTop: 3, fontSize: 11, color: "#6d8798" }}>
                {sizeLabel} · Fixed-price service
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: "13px 14px" }}>
          {[
            {
              label: "Date",
              value: booking.date
                ? `Aug ${booking.date}, 2026`
                : "Not selected",
              icon: Calendar03Icon,
            },
            {
              label: "Time",
              value: booking.time || "Not selected",
              icon: Clock03Icon,
            },
            {
              label: "Location",
              value: "Unit #12-03 · Charleston",
              icon: Location01Icon,
            },
            ...(selectedExtras
              ? [
                  {
                    label: "Add-ons",
                    value: selectedExtras,
                    icon: TaskDone01Icon,
                  },
                ]
              : []),
            {
              label: "Notes",
              value: booking.notes || "OK",
              icon: Note01Icon,
            },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                padding: "7px 0",
                borderBottom: `1px solid ${STYLE_TWO_FLOW.border}`,
              }}
            >
              <FlowIcon icon={row.icon} size={15} color={STYLE_TWO_FLOW.blue} />
              <span
                style={{
                  width: 52,
                  flexShrink: 0,
                  fontSize: 11,
                  color: C.gray,
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: 700,
                  color: STYLE_TWO_FLOW.navy,
                  textAlign: "right",
                  whiteSpace: "pre-line",
                  lineHeight: 1.45,
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          background: "white",
          border: `1px solid ${STYLE_TWO_FLOW.border}`,
          borderRadius: 15,
          padding: "13px 14px",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 900,
            color: STYLE_TWO_FLOW.navy,
            marginBottom: 10,
          }}
        >
          Payment details
        </div>
        <PriceRow label="Base service" value={`SGD ${base}`} />
        <PriceRow label="Selected add-ons" value={`SGD ${extrasAmt}`} />
        <PriceRow
          label="Priority arrival"
          value={urgentAmt > 0 ? `+ SGD ${urgentAmt}` : "Not selected"}
          color={urgentAmt > 0 ? STYLE_TWO_FLOW.orange : C.gray}
        />
        <div
          style={{
            marginTop: 9,
            paddingTop: 10,
            borderTop: `2px solid ${STYLE_TWO_FLOW.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 900,
              color: STYLE_TWO_FLOW.navy,
            }}
          >
            Total payable
          </span>
          <span
            style={{
              fontSize: 21,
              fontWeight: 900,
              color: STYLE_TWO_FLOW.blue,
            }}
          >
            SGD {total}
          </span>
        </div>
      </div>
    </div>
  )
}

function StyleTwoSuccess({
  booking,
  total,
  onDone,
}: {
  booking: BookingData
  total: number
  onDone: () => void
}) {
  const typeLabel =
    CLEAN_TYPES.find((item) => item.id === booking.cleanType)?.label ?? ""
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: STYLE_TWO_FLOW.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          background: "#eef8fc",
          borderBottom: `1px solid ${STYLE_TWO_FLOW.border}`,
          padding: "58px 20px 26px",
          textAlign: "center",
          color: STYLE_TWO_FLOW.navy,
        }}
      >
        <div
          style={{
            width: 68,
            height: 68,
            margin: "0 auto 14px",
            borderRadius: 34,
            background: STYLE_TWO_FLOW.greenSoft,
            border: "1px solid #b8e2c8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 0 8px rgba(22,131,79,0.08)",
          }}
        >
          <FlowIcon
            icon={TaskDone01Icon}
            size={34}
            color={STYLE_TWO_FLOW.green}
            strokeWidth={2.1}
          />
        </div>
        <div style={{ fontSize: 22, fontWeight: 900 }}>Booking confirmed</div>
        <div
          style={{
            marginTop: 6,
            fontSize: 12,
            lineHeight: 1.45,
            color: "#6d8798",
          }}
        >
          Your cleaner has been notified and your fixed-price service is
          scheduled.
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 12px" }}>
        <div
          style={{
            background: "white",
            border: `1px solid ${STYLE_TWO_FLOW.border}`,
            borderRadius: 15,
            padding: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              paddingBottom: 11,
              borderBottom: `1px solid ${STYLE_TWO_FLOW.border}`,
              marginBottom: 8,
            }}
          >
            <FlowIcon
              icon={CleaningBucketIcon}
              size={20}
              color={STYLE_TWO_FLOW.blue}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: STYLE_TWO_FLOW.navy,
              }}
            >
              {typeLabel}
            </span>
          </div>
          {[
            ["Date", booking.date ? `Aug ${booking.date}, 2026` : "—"],
            ["Time", booking.time || "—"],
            ["Location", "Unit #12-03 · Charleston"],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
                marginBottom: 9,
              }}
            >
              <span style={{ fontSize: 11, color: C.gray }}>{label}</span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: STYLE_TWO_FLOW.navy,
                  textAlign: "right",
                }}
              >
                {value}
              </span>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 10,
              borderTop: `1px solid ${STYLE_TWO_FLOW.border}`,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: STYLE_TWO_FLOW.navy,
              }}
            >
              Total charged
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: STYLE_TWO_FLOW.blue,
              }}
            >
              SGD {total}
            </span>
          </div>
        </div>
        <div
          style={{
            marginTop: 10,
            background: STYLE_TWO_FLOW.greenSoft,
            border: "1px solid #b8e2c8",
            borderRadius: 14,
            padding: "12px 14px",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 900,
              color: "#11663c",
              marginBottom: 6,
            }}
          >
            What happens next
          </div>
          <div style={{ fontSize: 11, lineHeight: 1.45, color: "#376b4d" }}>
            You will receive a confirmation message. The assigned professional
            will arrive at your selected time.
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "12px 16px 26px",
          background: "white",
          borderTop: `1px solid ${STYLE_TWO_FLOW.border}`,
        }}
      >
        <button
          onClick={onDone}
          style={{
            width: "100%",
            minHeight: 48,
            border: "none",
            borderRadius: 14,
            background: STYLE_TWO_FLOW.blue,
            color: "white",
            fontFamily: "Inter, sans-serif",
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
// MAIN EXPORT — Style Two only
// ══════════════════════════════════════════════════════════════════

interface Props {
  onBack: () => void
  onDone: () => void
  initialStep?: number
}

export default function CleaningBooking({
  onBack,
  onDone,
  initialStep = 0,
}: Props) {
  const [step, setStep] = useState(initialStep)
  const [booking, setBooking] = useState<BookingData>({
    cleanType: "general",
    size: "studio",
    sizeQuantities: { studio: 1 },
    date: null,
    time: "",
    extras: [],
    extraQuantities: {},
    notes: "",
    priorityArrival: false,
  })

  const basePrice = Object.entries(booking.sizeQuantities).reduce(
    (sum, [sizeId, qty]) =>
      sum + (PRICES[booking.cleanType]?.[sizeId] ?? 0) * qty,
    0,
  )
  const extrasPrice = booking.extras.reduce((sum, id) => {
    const unitPrice = EXTRAS_LIST.find((extra) => extra.id === id)?.price ?? 0
    const quantity = booking.extraQuantities[id] ?? 0
    return sum + unitPrice * quantity
  }, 0)
  const urgentCharge = booking.priorityArrival ? PRIORITY_ARRIVAL_FEE : 0
  const total = basePrice + extrasPrice + urgentCharge
  const canNext = () => {
    if (step === 2) return Object.keys(booking.sizeQuantities).length > 0
    if (step === 3) return booking.date !== null && booking.time !== ""
    return true
  }

  if (step === 0)
    return <StyleTwoDetail onBack={onBack} onBook={() => setStep(1)} />

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: STYLE_TWO_FLOW.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <StyleTwoHeader
        step={step}
        onBack={() =>
          step === 1 ? setStep(0) : setStep((current) => current - 1)
        }
      />
      <StyleTwoProgress step={step - 1} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {step === 1 && (
          <StyleTwoTypeStep booking={booking} setBooking={setBooking} />
        )}
        {step === 2 && (
          <StyleTwoSizeStep booking={booking} setBooking={setBooking} />
        )}
        {step === 3 && (
          <StyleTwoDateStep booking={booking} setBooking={setBooking} />
        )}
        {step === 4 && (
          <StyleTwoAddOnsStep booking={booking} setBooking={setBooking} />
        )}
        {step === 5 && (
          <StyleTwoConfirmStep
            booking={booking}
            base={basePrice}
            extrasAmt={extrasPrice}
            urgentAmt={urgentCharge}
            total={total}
          />
        )}
      </div>
      <div
        style={{
          padding: "11px 16px 25px",
          background: "white",
          borderTop: `1px solid ${STYLE_TWO_FLOW.border}`,
          flexShrink: 0,
        }}
      >
        {step >= 2 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 9,
            }}
          >
            <span style={{ fontSize: 12, color: C.gray }}>Current total</span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: STYLE_TWO_FLOW.navy,
              }}
            >
              SGD {total}
            </span>
          </div>
        )}
        <button
          onClick={() =>
            canNext() &&
            (step < 5 ? setStep((current) => current + 1) : onDone())
          }
          style={{
            width: "100%",
            minHeight: 48,
            border: "none",
            borderRadius: 14,
            background: canNext() ? STYLE_TWO_FLOW.blue : "#bcd8e4",
            color: "white",
            fontFamily: "Inter, sans-serif",
            fontSize: 15,
            fontWeight: 800,
            cursor: canNext() ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: canNext() ? "0 7px 18px rgba(28,157,215,0.28)" : "none",
          }}
        >
          <span>{step < 5 ? "Continue" : "Checkout"}</span>
        </button>
      </div>
    </div>
  )
}
