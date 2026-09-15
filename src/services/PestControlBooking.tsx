import { useState, type Dispatch, type SetStateAction } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  AlarmClockIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  BedDoubleIcon,
  Bug01Icon,
  Bug02Icon,
  Calendar03Icon,
  CalendarCheckIcon,
  Clock03Icon,
  Door01Icon,
  FileSearchIcon,
  FlashIcon,
  Location01Icon,
  Note01Icon,
  SecurityCheckIcon,
  Shield01Icon,
  SprayCanIcon,
  Stairs01Icon,
  Target01Icon,
  TaskDone01Icon,
} from "@hugeicons/core-free-icons"
import pestPhoto from "../imports/Services/ae46bab4a35600cf94747f7f013659abed2764b9.png"
import AddonQuantityStepper from "./AddonQuantityStepper"
import StyleTwoPageHeader from "./StyleTwoPageHeader"

type PestType = "general" | "mosquito" | "bedbug" | "rodent" | "termite"

interface PestOption {
  id: string
  label: string
  price: number
  unit: string
  quoteOnly?: boolean
}

interface PestJob {
  id: PestType
  label: string
  sub: string
  options: PestOption[]
}

interface Extra {
  id: string
  label: string
  price: number
  unit: string
  sub: string
}

interface BookingData {
  pestType: PestType
  option: string
  optionQuantities: Record<string, number>
  date: number | null
  time: string
  extras: string[]
  extraQuantities: Record<string, number>
  notes: string
  priorityArrival: boolean
}

interface Props {
  onBack: () => void
  onDone: () => void
  initialStep?: number
}

const C = {
  primary: "#1c9dd7",
  text: "#31536f",
  gray: "#6b7787",
  surface: "#f7fbfd",
  blueSoft: "#e5f4fb",
  bluePale: "#f3faff",
  border: "#dbeaf2",
  green: "#16834f",
  greenSoft: "#eaf8f0",
  orange: "#d97706",
  orangeSoft: "#fff5df",
}

const STEPS = ["Type", "Scope", "Schedule", "Extras", "Confirm"]
const CAL_START_DAY = 6
const CAL_TOTAL_DAYS = 31
const TODAY = 6
const PRIORITY_ARRIVAL_MINUTES = 120
const PRIORITY_ARRIVAL_FEE = 40
const PRIORITY_ARRIVAL_TIME = `Within ${PRIORITY_ARRIVAL_MINUTES} minutes`
const PRIORITY_ARRIVAL_FEE_LABEL = `+ SGD ${PRIORITY_ARRIVAL_FEE}`

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
    const hours = Math.floor(time / 60)
    const minutes = time % 60
    points.push(`${hours}:${minutes.toString().padStart(2, "0")}`)
  }
  return points
}

const STYLE_TWO_TIME_POINTS = buildTimePoints(9, 22, 30)
const STYLE_TWO_PRIORITY_TIMES = new Set(["9:00", "9:30", "10:00"])

const PEST_JOBS: PestJob[] = [
  {
    id: "general",
    label: "General Pest Treatment",
    sub: "Common residential pest control and treatment",
    options: [
      { id: "studio", label: "Studio / 1-Bedroom", price: 120, unit: "visit" },
      { id: "2br", label: "2-Bedroom", price: 150, unit: "visit" },
      { id: "3br", label: "3-Bedroom / Landed", price: 180, unit: "visit" },
    ],
  },
  {
    id: "mosquito",
    label: "Mosquito Treatment",
    sub: "Fogging and targeted mosquito control",
    options: [
      { id: "apartment", label: "Apartment", price: 150, unit: "visit" },
      {
        id: "condo-common",
        label: "Condo common area",
        price: 220,
        unit: "visit",
      },
      { id: "small-landed", label: "Small landed", price: 280, unit: "visit" },
    ],
  },
  {
    id: "bedbug",
    label: "Bed Bug Treatment",
    sub: "Bedroom and mattress area treatment",
    options: [
      { id: "single-room", label: "Single room", price: 220, unit: "room" },
      {
        id: "master-bedroom",
        label: "Master bedroom",
        price: 280,
        unit: "room",
      },
      {
        id: "whole-bedroom-set",
        label: "Whole bedroom set",
        price: 350,
        unit: "room",
      },
    ],
  },
  {
    id: "rodent",
    label: "Rodent Control",
    sub: "Baiting, trap monitoring, and follow-up visits",
    options: [
      {
        id: "basic-baiting",
        label: "Basic baiting",
        price: 160,
        unit: "visit",
      },
      {
        id: "trap-monitoring",
        label: "Trap monitoring",
        price: 180,
        unit: "visit",
      },
      {
        id: "follow-up-visit",
        label: "Follow-up visit",
        price: 120,
        unit: "visit",
      },
    ],
  },
  {
    id: "termite",
    label: "Termite Inspection",
    sub: "Inspection, spot treatment, and reporting",
    options: [
      {
        id: "residential-inspection",
        label: "Residential inspection",
        price: 180,
        unit: "visit",
      },
      {
        id: "spot-treatment",
        label: "Spot treatment",
        price: 260,
        unit: "area",
      },
      {
        id: "full-report-addon",
        label: "Full report add-on",
        price: 0,
        unit: "quote",
        quoteOnly: true,
      },
    ],
  },
]

const EXTRAS_LIST: Extra[] = [
  {
    id: "heavy-infestation",
    label: "Heavy infestation",
    price: 50,
    unit: "visit",
    sub: "+ SGD 50 / visit",
  },
  {
    id: "extra-room",
    label: "Extra room",
    price: 30,
    unit: "room",
    sub: "+ SGD 30 / room",
  },
  {
    id: "staircase-area",
    label: "Staircase / attic / store room",
    price: 25,
    unit: "area",
    sub: "+ SGD 25 / area",
  },
  {
    id: "photo-report",
    label: "Follow-up report with photos",
    price: 35,
    unit: "report",
    sub: "SGD 35 / report",
  },
  {
    id: "urgent",
    label: "Urgent same-day booking",
    price: 40,
    unit: "booking",
    sub: "Priority arrival today",
  },
]

const SERVICE_NOTES = [
  "Prices are reference prices for standard residential conditions.",
  "Treatment method depends on pest type and severity.",
  "Residents should vacate the area temporarily if required by treatment type.",
  "Severe or whole-unit infestation cases may require custom quotation.",
]

const JOB_ICONS: Record<PestType, IconSvgElement> = {
  general: Bug01Icon,
  mosquito: SprayCanIcon,
  bedbug: BedDoubleIcon,
  rodent: Target01Icon,
  termite: FileSearchIcon,
}

const EXTRA_ICONS: Record<string, IconSvgElement> = {
  "heavy-infestation": Bug02Icon,
  "extra-room": Door01Icon,
  "staircase-area": Stairs01Icon,
  "photo-report": FileSearchIcon,
  urgent: FlashIcon,
}

function Icon({
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

function jobFor(type: PestType) {
  return PEST_JOBS.find((job) => job.id === type) ?? PEST_JOBS[0]
}

function optionFor(booking: BookingData) {
  const job = jobFor(booking.pestType)
  return (
    job.options.find((option) => option.id === booking.option) ?? job.options[0]
  )
}

function money(value: number) {
  return `SGD ${value}`
}

function priceText(option: PestOption) {
  return option.quoteOnly
    ? "Refer to notes"
    : `SGD ${option.price} / ${option.unit}`
}

function extraPrice(extra: Extra, quantity = 1) {
  return `+ SGD ${extra.price * quantity}`
}

function selectBookingDate(
  setBooking: Dispatch<SetStateAction<BookingData>>,
  date: number,
) {
  setBooking((current) =>
    current.priorityArrival && date !== TODAY
      ? { ...current, date, time: "", priorityArrival: false }
      : { ...current, date },
  )
}

function selectRegularArrival(
  setBooking: Dispatch<SetStateAction<BookingData>>,
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
  setBooking: Dispatch<SetStateAction<BookingData>>,
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
  setBooking: Dispatch<SetStateAction<BookingData>>
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
        marginBottom: 10,
        padding: "10px 11px",
        border: `1.5px solid ${selected ? C.orange : "#f1d59d"}`,
        borderRadius: 12,
        background: selected ? C.orangeSoft : "#fffaf0",
        display: "flex",
        alignItems: "center",
        gap: 10,
        textAlign: "left",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          width: 40,
          height: 40,
          borderRadius: 11,
          background: selected ? "#fbdca1" : "#fff0ce",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon
          icon={AlarmClockIcon}
          size={21}
          color={C.orange}
          strokeWidth={1.8}
        />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 900,
            color: C.text,
          }}
        >
          Priority arrival
        </span>
        <span
          style={{
            display: "block",
            marginTop: 3,
            fontSize: 10,
            lineHeight: 1.3,
            color: C.gray,
          }}
        >
          {PRIORITY_ARRIVAL_TIME}
        </span>
      </span>
      <span style={{ textAlign: "right", flexShrink: 0 }}>
        <span
          style={{
            display: "block",
            fontSize: 9,
            fontWeight: 900,
            color: C.orange,
          }}
        >
          URGENT
        </span>
        <span
          style={{
            display: "block",
            marginTop: 3,
            fontSize: 12,
            fontWeight: 900,
            color: C.orange,
          }}
        >
          {PRIORITY_ARRIVAL_FEE_LABEL}
        </span>
      </span>
    </button>
  )
}

function StyleTwoPriorityNote() {
  return (
    <div
      aria-label="Priority arrival available at 9:00, 9:30 and 10:00"
      style={{
        width: "100%",
        minHeight: 58,
        marginBottom: 10,
        padding: "9px 11px",
        border: "1.5px solid #f1d59d",
        borderRadius: 12,
        background: "#fffaf0",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "#fff0ce",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon icon={FlashIcon} size={19} color={C.orange} strokeWidth={1.8} />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 900,
            color: C.text,
          }}
        >
          Priority arrival
        </span>
        <span
          style={{
            display: "block",
            marginTop: 3,
            fontSize: 10,
            lineHeight: 1.3,
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
          color: C.orange,
        }}
      >
        {PRIORITY_ARRIVAL_FEE_LABEL}
      </span>
    </div>
  )
}

function Header({ step, onBack }: { step: number onBack: () => void }) {
  return (
    <StyleTwoPageHeader
      title="Pest Control"
      subtitle={step > 0 ? `Step ${step} of 5` : undefined}
      onBack={onBack}
    />
  )
}

function Progress({ step }: { step: number }) {
  return (
    <div
      style={{
        background: "white",
        padding: "11px 12px 10px",
        borderBottom: `1px solid ${C.border}`,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {STEPS.map((label, index) => (
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
                      ? C.green
                      : index === step
                        ? C.primary
                        : "#e8f0f4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {index < step ? (
                  <Icon
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
                  color: index === step ? C.primary : "#7d8c98",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
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

function PriceRow({
  label,
  value,
  accent = false,
  orange = false,
}: {
  label: string
  value: string
  accent?: boolean
  orange?: boolean
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 8,
      }}
    >
      <span style={{ fontSize: 11, color: C.gray }}>{label}</span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: orange ? "#e67e22" : accent ? C.primary : C.text,
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  )
}

function Catalogue() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {PEST_JOBS.map((job) => (
        <div
          key={job.id}
          style={{
            background: "white",
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: "9px 10px",
            boxShadow: "0 3px 10px rgba(49,83,111,0.04)",
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
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                background: C.blueSoft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon icon={JOB_ICONS[job.id]} size={16} color={C.primary} />
            </span>
            <span style={{ fontSize: 11, fontWeight: 800, color: C.text }}>
              {job.label}
            </span>
          </div>
          {job.options.map((option, index) => (
            <div
              key={option.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 8,
                padding: "5px 0",
                borderTop: index ? `1px solid ${C.border}` : "none",
              }}
            >
              <span style={{ fontSize: 10, color: "#364b5d" }}>
                {option.label}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: option.quoteOnly ? C.gray : C.primary,
                  whiteSpace: "nowrap",
                }}
              >
                {priceText(option)}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function Detail({ onBack, onBook }: { onBack: () => void onBook: () => void }) {
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
      <Header step={0} onBack={onBack} />
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 12px 18px" }}>
        <div
          style={{
            position: "relative",
            height: 138,
            overflow: "hidden",
            borderRadius: 18,
            marginBottom: 12,
            boxShadow: "0 8px 20px rgba(22,50,79,0.14)",
          }}
        >
          <img
            src={pestPhoto}
            alt="Pest Control"
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
            style={{ position: "absolute", left: 16, top: 18, color: C.text }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 0.8,
                opacity: 0.74,
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
              Pest
              <br />
              Control
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
              <Icon icon={Shield01Icon} size={14} color={C.primary} />{" "}
              Residential treatment
            </div>
          </div>
        </div>
        <div
          style={{
            background: "white",
            border: `1px solid ${C.border}`,
            borderRadius: 15,
            padding: "14px",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              marginBottom: 7,
            }}
          >
            <Icon icon={SecurityCheckIcon} size={20} color={C.primary} />
            <span style={{ fontSize: 16, fontWeight: 900, color: C.text }}>
              Reliable pest control
            </span>
          </div>
          <div style={{ fontSize: 11, lineHeight: 1.5, color: C.gray }}>
            Common residential treatments with trained technicians, transparent
            pricing, and practical safety guidance.
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
                background: C.primary,
              }}
            />
            <div>
              <div style={{ fontSize: 16, fontWeight: 900, color: C.text }}>
                Standard fixed-price jobs
              </div>
              <div style={{ fontSize: 9, color: C.gray }}>
                Choose a treatment and match it to your space
              </div>
            </div>
          </div>
          <Catalogue />
        </div>
        <div
          style={{
            background: C.greenSoft,
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
            <span
              style={{
                width: 27,
                height: 27,
                borderRadius: 14,
                background: C.green,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                icon={TaskDone01Icon}
                size={16}
                color="white"
                strokeWidth={2}
              />
            </span>
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
            {EXTRAS_LIST.map((extra) => (
              <div
                key={extra.id}
                style={{
                  background: "rgba(255,255,255,0.72)",
                  borderRadius: 10,
                  padding: "8px 7px",
                }}
              >
                <Icon icon={EXTRA_ICONS[extra.id]} size={19} color={C.green} />
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 9,
                    fontWeight: 800,
                    lineHeight: 1.2,
                    color: "#145b38",
                  }}
                >
                  {extra.label}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 10,
                    fontWeight: 900,
                    color: C.green,
                  }}
                >
                  {extraPrice(extra)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            background: C.orangeSoft,
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
            <Icon icon={Note01Icon} size={20} color={C.orange} />
            <span style={{ fontSize: 15, fontWeight: 900, color: "#9a5200" }}>
              Service notes
            </span>
          </div>
          {SERVICE_NOTES.map((note) => (
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
                  background: C.orange,
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
          borderTop: `1px solid ${C.border}`,
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
            background: C.primary,
            color: "white",
            fontFamily: "Inter, sans-serif",
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "0 7px 18px rgba(28,157,215,0.3)",
          }}
        >
          Start booking
        </button>
      </div>
    </div>
  )
}

function TypeStep({
  booking,
  setBooking,
}: {
  booking: BookingData
  setBooking: Dispatch<SetStateAction<BookingData>>
}) {
  return (
    <div style={{ padding: "16px 12px" }}>
      <div style={{ fontSize: 19, fontWeight: 900, color: C.text }}>
        Choose a pest treatment
      </div>
      <div style={{ margin: "4px 0 14px", fontSize: 12, color: C.gray }}>
        Fixed-price options from the service catalogue
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {PEST_JOBS.map((job) => {
          const selected = booking.pestType === job.id
          const priced = job.options.filter((option) => !option.quoteOnly)
          const min = Math.min(...priced.map((option) => option.price))
          return (
            <button
              key={job.id}
              onClick={() =>
                setBooking((current) => ({
                  ...current,
                  pestType: job.id,
                  option: job.options[0].id,
                  optionQuantities: { [job.options[0].id]: 1 },
                }))
              }
              style={{
                width: "100%",
                minHeight: 68,
                padding: "10px 12px",
                border: `1.5px solid ${selected ? C.primary : C.border}`,
                borderRadius: 14,
                background: selected ? C.bluePale : "white",
                display: "flex",
                alignItems: "center",
                gap: 11,
                textAlign: "left",
                cursor: "pointer",
                boxShadow: selected
                  ? "0 5px 14px rgba(28,157,215,0.14)"
                  : "0 3px 10px rgba(49,83,111,0.04)",
              }}
            >
              <span
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: selected ? C.primary : C.blueSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon
                  icon={JOB_ICONS[job.id]}
                  size={23}
                  color={selected ? "white" : C.primary}
                />
              </span>
              <span style={{ flex: 1 }}>
                <span
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 800,
                    color: C.text,
                  }}
                >
                  {job.label}
                </span>
                <span
                  style={{
                    display: "block",
                    marginTop: 3,
                    fontSize: 11,
                    color: C.gray,
                  }}
                >
                  {job.sub}
                </span>
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 900,
                  color: C.primary,
                  whiteSpace: "nowrap",
                }}
              >
                From SGD {min}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ScopeStep({
  booking,
  setBooking,
}: {
  booking: BookingData
  setBooking: Dispatch<SetStateAction<BookingData>>
}) {
  const job = jobFor(booking.pestType)
  const quantityFor = (id: string) => booking.optionQuantities[id] ?? 0
  const setOptionQuantity = (id: string, nextQuantity: number) => {
    const quantity = Math.max(0, Math.min(99, nextQuantity))
    setBooking((current) => {
      const nextQuantities = { ...current.optionQuantities }
      if (quantity === 0) delete nextQuantities[id]
      else nextQuantities[id] = quantity
      return { ...current, optionQuantities: nextQuantities }
    })
  }
  const selectedOptions = job.options.filter((o) => quantityFor(o.id) > 0)
  return (
    <div style={{ padding: "16px 12px" }}>
      <div style={{ fontSize: 19, fontWeight: 900, color: C.text }}>
        Choose your treatment scope
      </div>
      <div style={{ margin: "4px 0 14px", fontSize: 12, color: C.gray }}>
        {job.label} options for your home
      </div>
      <div
        style={{
          background: C.blueSoft,
          border: `1px solid ${C.border}`,
          borderRadius: 15,
          padding: "13px 14px",
          marginBottom: 12,
          color: C.text,
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>
          Selected service
        </div>
        <div style={{ marginTop: 3, fontSize: 17, fontWeight: 900 }}>
          {job.label}
        </div>
        {selectedOptions.length > 0 && (
          <div
            style={{
              marginTop: 8,
              paddingTop: 8,
              borderTop: `1px solid ${C.border}`,
              fontSize: 11,
              color: C.gray,
            }}
          >
            {selectedOptions
              .map(
                (o) =>
                  `${o.label} ×${quantityFor(o.id)} (SGD ${o.price * quantityFor(o.id)})`,
              )
              .join(", ")}
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {job.options.map((option) => {
          const quantity = quantityFor(option.id)
          const selected = quantity > 0
          return (
            <div
              key={option.id}
              style={{
                width: "100%",
                minHeight: 68,
                padding: "10px 12px",
                border: `1.5px solid ${selected ? C.primary : C.border}`,
                borderRadius: 13,
                background: selected ? C.bluePale : "white",
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
                  background: selected ? C.primary : C.blueSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon
                  icon={JOB_ICONS[job.id]}
                  size={21}
                  color={selected ? "white" : C.primary}
                />
              </span>
              <span style={{ flex: 1 }}>
                <span
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 800,
                    color: C.text,
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
                  {option.quoteOnly
                    ? "Refer to notes"
                    : `SGD ${option.price} / ${option.unit}`}
                </span>
              </span>
              <AddonQuantityStepper
                label={option.label}
                quantity={quantity}
                onDecrease={() => setOptionQuantity(option.id, quantity - 1)}
                onIncrease={() => setOptionQuantity(option.id, quantity + 1)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ScheduleStep({
  booking,
  setBooking,
}: {
  booking: BookingData
  setBooking: Dispatch<SetStateAction<BookingData>>
}) {
  const cells: (number | null)[] = Array(CAL_START_DAY).fill(null)
  for (let day = 1; day <= CAL_TOTAL_DAYS; day += 1) cells.push(day)
  return (
    <div style={{ padding: "16px 12px" }}>
      <div style={{ fontSize: 19, fontWeight: 900, color: C.text }}>
        Set your schedule
      </div>
      <div style={{ margin: "4px 0 14px", fontSize: 12, color: C.gray }}>
        Choose a date and preferred arrival time
      </div>
      <div
        style={{
          background: "white",
          border: `1px solid ${C.border}`,
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
          <span style={{ fontSize: 14, fontWeight: 900, color: C.text }}>
            August 2026
          </span>
          <span style={{ display: "flex", gap: 6 }}>
            <button
              aria-label="Previous month"
              style={{
                width: 32,
                height: 32,
                border: "none",
                borderRadius: 9,
                background: C.blueSoft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon icon={ArrowLeft01Icon} size={15} />
            </button>
            <button
              aria-label="Next month"
              style={{
                width: 32,
                height: 32,
                border: "none",
                borderRadius: 9,
                background: C.blueSoft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon icon={ArrowRight01Icon} size={15} />
            </button>
          </span>
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
                  background: booking.date === day ? C.primary : "transparent",
                  color:
                    booking.date === day
                      ? "white"
                      : day <= TODAY
                        ? "#c9d5dc"
                        : C.text,
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
          border: `1px solid ${C.border}`,
          borderRadius: 15,
          padding: "14px 12px",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 900,
            color: C.text,
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
                  border: `1px solid ${isSelected ? C.primary : C.border}`,
                  borderRadius: 9,
                  background: isSelected ? C.primary : "white",
                  color: isSelected ? "white" : C.text,
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
                    <Icon
                      icon={FlashIcon}
                      size={11}
                      color={isSelected ? "white" : C.orange}
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
              background: C.blueSoft,
              color: C.primary,
            }}
          >
            <Icon icon={CalendarCheckIcon} size={16} />
            <span style={{ fontSize: 12, fontWeight: 800 }}>
              Aug {booking.date}, 2026 - {booking.time}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function ExtrasStep({
  booking,
  setBooking,
}: {
  booking: BookingData
  setBooking: Dispatch<SetStateAction<BookingData>>
}) {
  const quantityFor = (id: string) => booking.extraQuantities[id] ?? 0
  const setQuantity = (id: string, nextQuantity: number) =>
    setBooking((current) => {
      const quantity = Math.max(0, Math.min(99, nextQuantity))
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
  return (
    <div style={{ padding: "16px 12px" }}>
      <div style={{ fontSize: 19, fontWeight: 900, color: C.text }}>
        Add-on charges
      </div>
      <div style={{ margin: "4px 0 14px", fontSize: 12, color: C.gray }}>
        Only pay for the extras you select
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {EXTRAS_LIST.filter((extra) => extra.id !== "urgent").map((extra) => {
          const quantity = quantityFor(extra.id)
          const selected = quantity > 0
          return (
            <div
              key={extra.id}
              style={{
                width: "100%",
                minHeight: 68,
                padding: "10px 12px",
                border: `1.5px solid ${selected ? C.green : C.border}`,
                borderRadius: 13,
                background: selected ? C.greenSoft : "white",
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
                  background: selected ? "#caecd7" : C.blueSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon
                  icon={EXTRA_ICONS[extra.id]}
                  size={21}
                  color={selected ? C.green : C.primary}
                />
              </span>
              <span style={{ flex: 1 }}>
                <span
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 800,
                    color: C.text,
                  }}
                >
                  {extra.label}
                </span>
                <span
                  style={{
                    display: "block",
                    marginTop: 3,
                    fontSize: 11,
                    color: C.gray,
                  }}
                >
                  {extra.sub}
                </span>
              </span>
              <AddonQuantityStepper
                label={extra.label}
                quantity={quantity}
                onDecrease={() => setQuantity(extra.id, quantity - 1)}
                onIncrease={() => setQuantity(extra.id, quantity + 1)}
              />
            </div>
          )
        })}
      </div>
      <label
        style={{
          display: "block",
          marginTop: 12,
          background: "white",
          border: `1px solid ${C.border}`,
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
            color: C.text,
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
          placeholder="Tell the technician where you have seen pests"
          rows={3}
          style={{
            width: "100%",
            boxSizing: "border-box",
            resize: "none",
            border: `1px solid ${C.border}`,
            borderRadius: 9,
            background: C.surface,
            padding: "9px 10px",
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            color: C.text,
            outline: "none",
          }}
        />
      </label>
    </div>
  )
}

function ConfirmStep({
  booking,
  total,
}: {
  booking: BookingData
  total: number
}) {
  const job = jobFor(booking.pestType)
  const option = optionFor(booking)
  const selectedOptionsText = job.options
    .filter((o) => (booking.optionQuantities[o.id] ?? 0) > 0)
    .map(
      (o) =>
        `${o.label} ×${booking.optionQuantities[o.id]}${
          o.quoteOnly ? " (custom quote)" : ""
        }`,
    )
    .join(", ")
  const selectedExtras = booking.extras
    .map((id) => {
      const label = EXTRAS_LIST.find((extra) => extra.id === id)?.label
      const quantity = booking.extraQuantities[id] ?? 0
      return label ? `${label} ×${quantity}` : undefined
    })
    .filter(Boolean)
    .join("\n")
  const extras = booking.extras
    .map((id) => EXTRAS_LIST.find((extra) => extra.id === id))
    .filter((extra): extra is Extra => Boolean(extra))
  return (
    <div style={{ padding: "16px 12px" }}>
      <div style={{ fontSize: 19, fontWeight: 900, color: C.text }}>
        Booking summary
      </div>
      <div style={{ margin: "4px 0 14px", fontSize: 12, color: C.gray }}>
        Check the service, schedule, and final price
      </div>
      <div
        style={{
          background: "white",
          border: `1px solid ${C.border}`,
          borderRadius: 15,
          overflow: "hidden",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            background: C.blueSoft,
            padding: "14px",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Icon icon={JOB_ICONS[job.id]} size={21} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 900, color: C.text }}>
                {job.label}
              </div>
              <div style={{ marginTop: 3, fontSize: 11, color: "#6d8798" }}>
                {selectedOptionsText || option.label} - Fixed-price service
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
              value: "Unit #12-03 - Charleston",
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
            { label: "Notes", value: booking.notes || "OK", icon: Note01Icon },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                padding: "7px 0",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <Icon icon={row.icon} size={15} />
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
                  color: C.text,
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
          border: `1px solid ${C.border}`,
          borderRadius: 15,
          padding: "13px 14px",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 900,
            color: C.text,
            marginBottom: 10,
          }}
        >
          Payment details
        </div>
        <PriceRow label="Base service" value={priceText(option)} />
        {extras.length > 0 && (
          <PriceRow
            label="Selected add-ons"
            value={`+ SGD ${extras.reduce((sum, extra) => {
              const qty = booking.extraQuantities[extra.id] ?? 0
              return sum + extra.price * qty
            }, 0)}`}
          />
        )}
        <PriceRow
          label="Priority arrival"
          value={
            booking.priorityArrival
              ? `+ SGD ${PRIORITY_ARRIVAL_FEE}`
              : "Not selected"
          }
          orange={booking.priorityArrival}
        />
        <div
          style={{
            marginTop: 9,
            paddingTop: 10,
            borderTop: `2px solid ${C.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 900, color: C.text }}>
            Total payable
          </span>
          <span
            style={{
              fontSize: option.quoteOnly ? 15 : 21,
              fontWeight: 900,
              color: option.quoteOnly ? C.gray : C.primary,
            }}
          >
            {option.quoteOnly ? "Custom quote" : money(total)}
          </span>
        </div>
      </div>
    </div>
  )
}

function Success({
  booking,
  total,
  onDone,
}: {
  booking: BookingData
  total: number
  onDone: () => void
}) {
  const job = jobFor(booking.pestType)
  const selectedOptionsText = job.options
    .filter((o) => (booking.optionQuantities[o.id] ?? 0) > 0)
    .map(
      (o) =>
        `${o.label} ×${booking.optionQuantities[o.id]}${
          o.quoteOnly ? " (custom quote)" : ""
        }`,
    )
    .join(", ")
  const hasQuoteOnlyOptions = job.options.some(
    (o) => (booking.optionQuantities[o.id] ?? 0) > 0 && o.quoteOnly,
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
      <div
        style={{
          background: "#eef8fc",
          borderBottom: `1px solid ${C.border}`,
          padding: "58px 20px 26px",
          textAlign: "center",
          color: C.text,
        }}
      >
        <div
          style={{
            width: 68,
            height: 68,
            margin: "0 auto 14px",
            borderRadius: 34,
            background: C.greenSoft,
            border: "1px solid #b8e2c8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 0 8px rgba(22,131,79,0.08)",
          }}
        >
          <Icon
            icon={TaskDone01Icon}
            size={34}
            color={C.green}
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
          Your technician has been notified and your treatment is scheduled.
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 12px" }}>
        <div
          style={{
            background: "white",
            border: `1px solid ${C.border}`,
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
              borderBottom: `1px solid ${C.border}`,
              marginBottom: 8,
            }}
          >
            <Icon icon={JOB_ICONS[job.id]} size={20} />
            <span style={{ fontSize: 14, fontWeight: 900, color: C.text }}>
              {job.label}
            </span>
          </div>
          {[
            ["Scope", selectedOptionsText || option.label],
            ["Date", booking.date ? `Aug ${booking.date}, 2026` : "-"],
            ["Time", booking.time || "-"],
            ["Location", "Unit #12-03 - Charleston"],
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
                  color: C.text,
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
              borderTop: `1px solid ${C.border}`,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 900, color: C.text }}>
              Total charged
            </span>
            <span
              style={{
                fontSize: hasQuoteOnlyOptions ? 14 : 18,
                fontWeight: 900,
                color: hasQuoteOnlyOptions ? C.gray : C.primary,
              }}
            >
              {hasQuoteOnlyOptions ? "Custom quote" : money(total)}
            </span>
          </div>
        </div>
        <div
          style={{
            marginTop: 10,
            background: C.greenSoft,
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
            You will receive a confirmation message. Your assigned technician
            will arrive at the selected time.
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "12px 16px 26px",
          background: "white",
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <button
          onClick={onDone}
          style={{
            width: "100%",
            minHeight: 48,
            border: "none",
            borderRadius: 14,
            background: C.primary,
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

export default function PestControlBooking({
  onBack,
  onDone,
  initialStep = 0,
}: Props) {
  const [step, setStep] = useState(initialStep)
  const [booking, setBooking] = useState<BookingData>({
    pestType: "general",
    option: "studio",
    optionQuantities: { studio: 1 },
    date: null,
    time: "",
    extras: [],
    extraQuantities: {},
    notes: "",
    priorityArrival: false,
  })
  const option = optionFor(booking)
  const job = jobFor(booking.pestType)
  const basePrice = Object.entries(booking.optionQuantities).reduce(
    (sum, [optionId, qty]) => {
      const opt = job.options.find((o) => o.id === optionId)
      if (!opt || opt.quoteOnly) return sum
      return sum + opt.price * qty
    },
    0,
  )
  const extrasTotal = booking.extras.reduce(
    (sum, id) =>
      sum +
      (EXTRAS_LIST.find((extra) => extra.id === id)?.price ?? 0) *
        (booking.extraQuantities[id] ?? 0),
    0,
  )
  const priorityArrivalFee = booking.priorityArrival ? PRIORITY_ARRIVAL_FEE : 0
  const total = basePrice + extrasTotal + priorityArrivalFee
  const canContinue =
    step === 2
      ? Object.keys(booking.optionQuantities).length > 0
      : step !== 3 || (booking.date !== null && booking.time !== "")

  if (step === 0) return <Detail onBack={onBack} onBook={() => setStep(1)} />

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
      <Header
        step={step}
        onBack={() =>
          step === 1 ? setStep(0) : setStep((current) => current - 1)
        }
      />
      <Progress step={step - 1} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {step === 1 && <TypeStep booking={booking} setBooking={setBooking} />}
        {step === 2 && <ScopeStep booking={booking} setBooking={setBooking} />}
        {step === 3 && (
          <ScheduleStep booking={booking} setBooking={setBooking} />
        )}
        {step === 4 && <ExtrasStep booking={booking} setBooking={setBooking} />}
        {step === 5 && <ConfirmStep booking={booking} total={total} />}
      </div>
      <div
        style={{
          padding: "11px 16px 25px",
          background: "white",
          borderTop: `1px solid ${C.border}`,
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
                fontSize: option.quoteOnly ? 14 : 18,
                fontWeight: 900,
                color: option.quoteOnly ? C.gray : C.text,
              }}
            >
              {option.quoteOnly ? "Custom quote" : money(total)}
            </span>
          </div>
        )}
        <button
          onClick={() =>
            canContinue &&
            (step < 5 ? setStep((current) => current + 1) : onDone())
          }
          style={{
            width: "100%",
            minHeight: 48,
            border: "none",
            borderRadius: 14,
            background: canContinue ? C.primary : "#bcd8e4",
            color: "white",
            fontFamily: "Inter, sans-serif",
            fontSize: 15,
            fontWeight: 800,
            cursor: canContinue ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: canContinue
              ? "0 7px 18px rgba(28,157,215,0.28)"
              : "none",
          }}
        >
          {step < 5 ? "Continue" : "Checkout"}
        </button>
      </div>
    </div>
  )
}
