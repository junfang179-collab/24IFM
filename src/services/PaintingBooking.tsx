import { useState } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Door01Icon,
  Calendar03Icon,
  CalendarCheckIcon,
  CheckmarkCircle01Icon,
  Clock03Icon,
  FlashIcon,
  GridIcon,
  Home01Icon,
  Location01Icon,
  Note01Icon,
  SecurityCheckIcon,
  TaskDone01Icon,
  Layers01Icon,
  PaintBrush01Icon,
  PaintBrush02Icon,
  PaintBucketIcon,
  Sofa01Icon,
  Stairs01Icon,
} from "@hugeicons/core-free-icons"
import paintingImage from "../imports/Services/popular-painting.png"
import AddonQuantityStepper from "./AddonQuantityStepper"
import StyleTwoPageHeader from "./StyleTwoPageHeader"

type CategoryId = "touch-up" | "room" | "doors" | "wall-repair" | "finishing"
type Item = { id: string label: string price: number unit: string }
type Category = {
  id: CategoryId
  label: string
  sub: string
  icon: IconSvgElement
  tone: string
  items: Item[]
}
const P = {
  surface: "#f7fbfd",
  navy: "#31536f",
  blue: "#1c9dd7",
  blueSoft: "#e5f4fb",
  bluePale: "#f3faff",
  border: "#dbeaf2",
  gray: "#6b7787",
  green: "#16834f",
  greenSoft: "#eaf8f0",
  orange: "#d97706",
  orangeSoft: "#fff5df",
  white: "#fff",
}
const CATEGORIES: Category[] = [
  {
    id: "touch-up",
    label: "Touch-up Painting",
    sub: "Small areas, patches and stain coverage",
    icon: PaintBrush01Icon,
    tone: P.blue,
    items: [
      {
        id: "small-touch-up",
        label: "Small touch-up area",
        price: 80,
        unit: "area",
      },
      {
        id: "wall-patch",
        label: "Wall patch and repaint",
        price: 120,
        unit: "area",
      },
      {
        id: "stain-cover",
        label: "Stain cover touch-up",
        price: 95,
        unit: "area",
      },
    ],
  },
  {
    id: "room",
    label: "Room Painting",
    sub: "Bedroom, living room and ceiling repaint",
    icon: Home01Icon,
    tone: P.blue,
    items: [
      {
        id: "bedroom-repaint",
        label: "Bedroom repaint",
        price: 380,
        unit: "room",
      },
      {
        id: "living-room-repaint",
        label: "Living room repaint",
        price: 550,
        unit: "room",
      },
      {
        id: "ceiling-repaint",
        label: "Ceiling repaint",
        price: 180,
        unit: "room",
      },
    ],
  },
  {
    id: "doors",
    label: "Doors / Trim",
    sub: "Doors, metal gates and skirting",
    icon: Door01Icon,
    tone: P.green,
    items: [
      {
        id: "wooden-door",
        label: "Wooden door painting",
        price: 85,
        unit: "door",
      },
      {
        id: "metal-gate",
        label: "Metal gate touch-up",
        price: 95,
        unit: "gate",
      },
      { id: "skirting", label: "Skirting repaint", price: 45, unit: "section" },
    ],
  },
  {
    id: "wall-repair",
    label: "Minor Wall Repair",
    sub: "Plaster patches, cracks and hole filling",
    icon: PaintBrush02Icon,
    tone: P.orange,
    items: [
      {
        id: "plaster-patch",
        label: "Plaster patch repair",
        price: 120,
        unit: "job",
      },
      {
        id: "hairline-crack",
        label: "Hairline crack treatment",
        price: 90,
        unit: "area",
      },
      {
        id: "hole-filling",
        label: "Hole filling and paint match",
        price: 75,
        unit: "area",
      },
    ],
  },
  {
    id: "finishing",
    label: "Tile / Finishing",
    sub: "Regrouting, sealant and feature walls",
    icon: GridIcon,
    tone: P.green,
    items: [
      {
        id: "regrouting",
        label: "Regrouting bathroom",
        price: 160,
        unit: "bathroom",
      },
      {
        id: "sealant-touch-up",
        label: "Sealant touch-up",
        price: 65,
        unit: "area",
      },
      {
        id: "feature-wall",
        label: "Feature wall repaint",
        price: 220,
        unit: "wall",
      },
    ],
  },
]
const ADDONS = [
  {
    id: "furniture-covering",
    label: "Moving / covering furniture",
    price: 40,
    unit: "room",
    icon: Sofa01Icon,
  },
  {
    id: "high-ceiling",
    label: "High ceiling / stairway wall",
    price: 50,
    unit: "area",
    icon: Stairs01Icon,
  },
  {
    id: "extra-coat",
    label: "Extra coats",
    price: 35,
    unit: "coat",
    icon: Layers01Icon,
  },
]
const TIMES = Array.from({ length: 26 }, (_, i) => {
  const m = 540 + i * 30
  return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`
})
const URGENT_TIMES = new Set(["9:00", "9:30", "10:00"])
const timeFee = (time: string) => (URGENT_TIMES.has(time) ? 40 : 0)
function I({
  icon,
  size = 20,
  color = P.blue,
}: {
  icon: IconSvgElement
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
function Header({ step, back }: { step: number back: () => void }) {
  return (
    <StyleTwoPageHeader
      title="Painting & Renovation"
      subtitle={step ? `Step ${step} of 5` : undefined}
      onBack={back}
    />
  )
}
function Progress({ step }: { step: number }) {
  return (
    <div
      style={{
        background: P.white,
        padding: "11px 12px 10px",
        borderBottom: `1px solid ${P.border}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {["Type", "Size", "Schedule", "Extras", "Confirm"].map((label, i) => (
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
                    i < step ? P.green : i === step ? P.blue : "#e8f0f4",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {i < step ? (
                  <I icon={CheckmarkCircle01Icon} size={14} color={P.white} />
                ) : (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: i === step ? P.white : "#94a4af",
                    }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: i === step ? P.blue : "#7d8c98",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>
            {i < 4 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  margin: "0 3px 18px",
                  background: i < step ? "#9bd7b6" : "#e8f0f4",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
function Title({ title, sub }: { title: string sub: string }) {
  return (
    <>
      <div style={{ fontSize: 19, fontWeight: 900, color: P.navy }}>
        {title}
      </div>
      <div style={{ margin: "4px 0 14px", fontSize: 12, color: P.gray }}>
        {sub}
      </div>
    </>
  )
}
const card = (selected: boolean) => ({
  width: "100%",
  minHeight: 68,
  padding: "10px 12px",
  border: `1.5px solid ${selected ? P.blue : P.border}`,
  borderRadius: 14,
  background: selected ? P.bluePale : P.white,
  display: "flex",
  alignItems: "center",
  gap: 11,
  textAlign: "left" as const,
  cursor: "pointer",
  fontFamily: "inherit",
  boxShadow: selected
    ? "0 5px 14px rgba(28,157,215,.14)"
    : "0 3px 10px rgba(22,50,79,.04)",
})
function PriceTable() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {CATEGORIES.map((c) => (
        <div
          key={c.id}
          style={{
            background: P.white,
            border: `1px solid ${P.border}`,
            borderRadius: 12,
            padding: "9px 10px",
            boxShadow: "0 3px 10px rgba(22,50,79,.04)",
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
                background: `${c.tone}18`,
                display: "grid",
                placeItems: "center",
              }}
            >
              <I icon={c.icon} size={16} color={c.tone} />
            </span>
            <b style={{ fontSize: 11, fontWeight: 800, color: P.navy }}>
              {c.label}
            </b>
          </div>
          {c.items.map((x, i) => (
            <div
              key={x.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0",
                borderTop: i ? `1px solid ${P.border}` : 0,
                gap: 8,
              }}
            >
              <span style={{ fontSize: 10, color: "#364b5d" }}>{x.label}</span>
              <b
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: c.tone,
                  whiteSpace: "nowrap",
                }}
              >
                SGD {x.price} / {x.unit}
              </b>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
function Detail({ back, book }: { back: () => void book: () => void }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: P.surface,
        fontFamily: "Inter,sans-serif",
      }}
    >
      <Header step={0} back={back} />
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 12px 18px",
          scrollbarWidth: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            height: 138,
            borderRadius: 18,
            overflow: "hidden",
            marginBottom: 12,
            background: "#dff2fa",
            boxShadow: "0 8px 20px rgba(22,50,79,.14)",
          }}
        >
          <img
            src={paintingImage}
            alt="Painting and renovation service"
            style={{
              position: "absolute",
              right: -8,
              top: -8,
              width: "58%",
              height: "calc(100% + 16px)",
              objectFit: "cover",
              objectPosition: "center",
              transform: "scale(1.08)",
              transformOrigin: "right center",
              mixBlendMode: "multiply",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg,#eef8fc 0%,rgba(238,248,252,.92) 46%,rgba(238,248,252,.08) 78%)",
            }}
          />
          <div
            style={{ position: "absolute", left: 16, top: 18, color: P.navy }}
          >
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8 }}>
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
              Painting &
              <br />
              Renovation
            </div>
            <div
              style={{
                marginTop: 8,
                display: "flex",
                gap: 5,
                alignItems: "center",
                fontSize: 9,
                fontWeight: 700,
              }}
            >
              <I icon={CheckmarkCircle01Icon} size={14} />
              Touch-ups, repainting and finishing works
            </div>
          </div>
        </div>
        <section
          style={{
            background: P.white,
            borderRadius: 15,
            padding: 14,
            border: `1px solid ${P.border}`,
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
            <I icon={SecurityCheckIcon} />
            <b style={{ fontSize: 16, fontWeight: 900, color: P.navy }}>
              Reliable painting and renovation service
            </b>
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: P.gray }}>
            Fixed-price touch-up painting, room repainting, and minor finishing
            works with verified professionals and transparent prices.
          </div>
        </section>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              width: 4,
              height: 22,
              borderRadius: 2,
              background: P.blue,
            }}
          />
          <div>
            <b style={{ fontSize: 16, fontWeight: 900, color: P.navy }}>
              Standard fixed-price jobs
            </b>
            <div style={{ fontSize: 10, color: P.gray }}>
              Choose the paintwork that best matches your request
            </div>
          </div>
        </div>
        <PriceTable />
        <section
          style={{
            marginTop: 12,
            background: P.greenSoft,
            border: "1px solid #b8e2c8",
            borderRadius: 15,
            padding: "13px 12px",
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
                background: P.green,
                display: "grid",
                placeItems: "center",
              }}
            >
              <I icon={TaskDone01Icon} size={16} color={P.white} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 900, color: "#11663c" }}>
              Add-on charges
            </span>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}
          >
            {ADDONS.map((a) => (
              <div
                key={a.id}
                style={{
                  background: "rgba(255,255,255,.72)",
                  borderRadius: 10,
                  padding: 8,
                }}
              >
                <I icon={a.icon} size={19} color={P.green} />
                <b
                  style={{
                    display: "block",
                    marginTop: 4,
                    fontSize: 9,
                    fontWeight: 800,
                    color: "#145b38",
                  }}
                >
                  {a.label}
                </b>
                <b
                  style={{
                    display: "block",
                    marginTop: 4,
                    fontSize: 10,
                    fontWeight: 900,
                    color: P.green,
                  }}
                >
                  + SGD {a.price} / {a.unit}
                </b>
              </div>
            ))}
            <div
              style={{
                background: "rgba(255,255,255,.72)",
                borderRadius: 10,
                padding: 8,
              }}
            >
              <I icon={FlashIcon} size={19} color={P.green} />
              <b
                style={{
                  display: "block",
                  marginTop: 4,
                  fontSize: 9,
                  fontWeight: 800,
                  color: "#145b38",
                }}
              >
                Urgent same-day service
              </b>
              <b
                style={{
                  display: "block",
                  marginTop: 4,
                  fontSize: 10,
                  fontWeight: 900,
                  color: P.green,
                }}
              >
                + SGD 40 / booking
              </b>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.72)",
                borderRadius: 10,
                padding: 8,
              }}
            >
              <I icon={PaintBucketIcon} size={19} color={P.green} />
              <b
                style={{
                  display: "block",
                  marginTop: 4,
                  fontSize: 9,
                  fontWeight: 800,
                  color: "#145b38",
                }}
              >
                Premium paint upgrade
              </b>
              <b
                style={{
                  display: "block",
                  marginTop: 4,
                  fontSize: 10,
                  fontWeight: 900,
                  color: P.green,
                }}
              >
                Charged separately
              </b>
            </div>
          </div>
        </section>
        <section
          style={{
            marginTop: 12,
            background: P.orangeSoft,
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
            <I icon={Note01Icon} size={20} color={P.orange} />
            <span style={{ fontSize: 15, fontWeight: 900, color: "#9a5200" }}>
              Service notes
            </span>
          </div>
          {[
            "Prices are reference prices for standard residential units.",
            "Surface condition, paint brand, and color change may affect final price.",
            "Major hacking, waterproofing, or extensive renovation is excluded.",
            "Color matching is best effort unless full repaint is selected.",
          ].map((n) => (
            <div
              key={n}
              style={{
                display: "flex",
                gap: 7,
                marginBottom: 6,
                fontSize: 10,
                lineHeight: 1.35,
                color: "#704b1d",
              }}
            >
              <span
                style={{
                  width: 4,
                  height: 4,
                  marginTop: 5,
                  borderRadius: 2,
                  background: P.orange,
                  flexShrink: 0,
                }}
              />
              {n}
            </div>
          ))}
        </section>
      </main>
      <Footer label="Start booking" click={book} />
    </div>
  )
}
function Footer({
  label,
  click,
  disabled = false,
  total,
}: {
  label: string
  click: () => void
  disabled?: boolean
  total?: number
}) {
  return (
    <footer
      style={{
        padding: "11px 16px 25px",
        background: P.white,
        borderTop: `1px solid ${P.border}`,
      }}
    >
      {total !== undefined && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 9,
          }}
        >
          <span style={{ fontSize: 12, color: P.gray }}>Current total</span>
          <b style={{ fontSize: 18, color: P.navy }}>SGD {total}</b>
        </div>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={click}
        className="plumbing-primary"
        style={{
          width: "100%",
          minHeight: 48,
          border: 0,
          borderRadius: 14,
          background: disabled ? "#bcd8e4" : P.blue,
          color: P.white,
          fontFamily: "Inter, sans-serif",
          fontSize: 15,
          fontWeight: 800,
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: disabled ? "none" : "0 7px 18px rgba(28,157,215,.28)",
        }}
      >
        {label}
      </button>
    </footer>
  )
}
function Summary({
  icon,
  label,
  value,
}: {
  icon: IconSvgElement
  label: string
  value: string
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        padding: "7px 0",
        borderBottom: `1px solid ${P.border}`,
      }}
    >
      <I icon={icon} size={15} color={P.blue} />
      <span style={{ width: 52, fontSize: 11, color: P.gray }}>{label}</span>
      <b
        style={{
          flex: 1,
          fontSize: 12,
          fontWeight: 700,
          color: P.navy,
          textAlign: "right",
          whiteSpace: "pre-line",
        }}
      >
        {value}
      </b>
    </div>
  )
}
interface Props {
  onBack: () => void
  onDone: () => void
}
export default function PaintingBooking({ onBack, onDone }: Props) {
  const [step, setStep] = useState(0),
    [categoryId, setCategoryId] = useState<CategoryId>("touch-up"),
    [itemQuantities, setItemQuantities] = useState<Record<string, number>>({
      "small-touch-up": 1,
    }),
    [date, setDate] = useState<number | null>(null),
    [time, setTime] = useState(""),
    [extras, setExtras] = useState<string[]>([]),
    [extraQuantities, setExtraQuantities] = useState<Record<string, number>>(
      {},
    ),
    [notes, setNotes] = useState("")
  const category = CATEGORIES.find((c) => c.id === categoryId) ?? CATEGORIES[0],
    selectedItems = category.items.filter(
      (x) => (itemQuantities[x.id] ?? 0) > 0,
    ),
    itemsTotal = selectedItems.reduce(
      (s, x) => s + x.price * (itemQuantities[x.id] ?? 0),
      0,
    ),
    extrasTotal = ADDONS.filter((a) => extras.includes(a.id)).reduce(
      (s, a) => s + a.price * (extraQuantities[a.id] ?? 0),
      0,
    ),
    priorityFee = timeFee(time),
    total = itemsTotal + extrasTotal + priorityFee,
    disabled =
      (step === 2 && selectedItems.length === 0) ||
      (step === 3 && (!date || !time))
  const choose = (c: Category) => {
      setCategoryId(c.id)
      setItemQuantities({ [c.items[0].id]: 1 })
    },
    toggle = (id: string) =>
      setExtras((x) =>
        x.includes(id) ? x.filter((v) => v !== id) : [...x, id],
      )
  const itemQuantityFor = (id: string) => itemQuantities[id] ?? 0
  const setItemQuantity = (id: string, nextQuantity: number) => {
    const quantity = Math.max(0, Math.min(99, nextQuantity))
    const nextQuantities = { ...itemQuantities }
    if (quantity === 0) delete nextQuantities[id]
    else nextQuantities[id] = quantity
    setItemQuantities(nextQuantities)
  }
  const quantityFor = (id: string) => extraQuantities[id] ?? 0
  const setQuantity = (id: string, nextQuantity: number) => {
    const quantity = Math.max(0, Math.min(99, nextQuantity))
    const nextQuantities = { ...extraQuantities }
    if (quantity === 0) delete nextQuantities[id]
    else nextQuantities[id] = quantity
    setExtraQuantities(nextQuantities)
    setExtras(
      Object.entries(nextQuantities)
        .filter(([, count]) => count > 0)
        .map(([extraId]) => extraId),
    )
  }
  if (!step) return <Detail back={onBack} book={() => setStep(1)} />
  if (step === 6)
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: P.surface,
          fontFamily: "Inter,sans-serif",
        }}
      >
        <div
          style={{
            background: "#eef8fc",
            padding: "58px 20px 26px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              width: 68,
              height: 68,
              margin: "0 auto 14px",
              borderRadius: 34,
              background: P.greenSoft,
              display: "grid",
              placeItems: "center",
              boxShadow: "0 0 0 8px rgba(22,131,79,.08)",
            }}
          >
            <I icon={TaskDone01Icon} size={34} color={P.green} />
          </span>
          <b style={{ display: "block", fontSize: 22, color: P.navy }}>
            Booking confirmed
          </b>
          <p style={{ fontSize: 12, color: "#6d8798" }}>
            Your painting professional has been notified and your fixed-price
            service is scheduled.
          </p>
        </div>
        <main style={{ flex: 1, padding: 14 }}>
          <section
            style={{
              background: P.white,
              border: `1px solid ${P.border}`,
              borderRadius: 15,
              padding: 15,
            }}
          >
            <b style={{ color: P.navy }}>
              {selectedItems.length === 1
                ? selectedItems[0].label
                : `${selectedItems.length} items selected`}
            </b>
            {selectedItems.length > 1 && (
              <div style={{ marginTop: 4, fontSize: 11, color: P.gray }}>
                {selectedItems
                  .map((x) => `${x.label} ×${itemQuantityFor(x.id)}`)
                  .join(", ")}
              </div>
            )}
            <Summary
              icon={Calendar03Icon}
              label="Date"
              value={`Aug ${date}, 2026`}
            />
            <Summary icon={Clock03Icon} label="Time" value={time} />
            <Summary
              icon={Location01Icon}
              label="Location"
              value="Unit #12-03 · Charleston"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 10,
              }}
            >
              <b>Total charged</b>
              <b style={{ color: P.blue }}>SGD {total}</b>
            </div>
          </section>
          <section
            style={{
              marginTop: 10,
              padding: 14,
              borderRadius: 14,
              background: P.greenSoft,
              color: "#376b4d",
              fontSize: 11,
              lineHeight: 1.45,
            }}
          >
            <b style={{ display: "block", color: "#11663c", marginBottom: 6 }}>
              What happens next
            </b>
            The assigned painting professional will arrive at your selected time
            and confirm the surface condition and any paint upgrade costs.
          </section>
        </main>
        <Footer label="Back to Home" click={onDone} />
      </div>
    )
  let content
  if (step === 1)
    content = (
      <div style={{ padding: "16px 12px" }}>
        <Title
          title="Choose a painting service"
          sub="Fixed-price options from the service catalogue"
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => choose(c)}
              style={card(c.id === categoryId)}
            >
              <span
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: c.id === categoryId ? P.blue : P.blueSoft,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <I
                  icon={c.icon}
                  size={23}
                  color={c.id === categoryId ? P.white : P.blue}
                />
              </span>
              <span style={{ flex: 1 }}>
                <b style={{ display: "block", fontSize: 13, color: P.navy }}>
                  {c.label}
                </b>
                <span style={{ fontSize: 11, color: P.gray }}>{c.sub}</span>
              </span>
              <b style={{ fontSize: 12, color: P.blue }}>
                From SGD {Math.min(...c.items.map((x) => x.price))}
              </b>
            </button>
          ))}
        </div>
      </div>
    )
  if (step === 2)
    content = (
      <div style={{ padding: "16px 12px" }}>
        <Title
          title="Choose your services"
          sub={`Add ${category.label} items and adjust quantities`}
        />
        <div
          style={{
            padding: "13px 14px",
            marginBottom: 12,
            borderRadius: 15,
            background: P.blueSoft,
            border: `1px solid ${P.border}`,
            color: P.navy,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: P.blue }}>
            Selected service category
          </div>
          <b
            style={{
              display: "block",
              marginTop: 3,
              fontSize: 17,
              fontWeight: 900,
              color: P.navy,
            }}
          >
            {category.label}
          </b>
          {selectedItems.length > 0 && (
            <div
              style={{
                marginTop: 8,
                paddingTop: 8,
                borderTop: `1px solid ${P.border}`,
                fontSize: 11,
                color: P.gray,
              }}
            >
              {selectedItems
                .map(
                  (x) =>
                    `${x.label} ×${itemQuantityFor(x.id)} (SGD ${x.price * itemQuantityFor(x.id)})`,
                )
                .join(", ")}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {category.items.map((x) => {
            const quantity = itemQuantityFor(x.id)
            const selected = quantity > 0
            return (
              <div
                key={x.id}
                style={{
                  width: "100%",
                  minHeight: 68,
                  padding: "10px 12px",
                  border: `1.5px solid ${selected ? P.blue : P.border}`,
                  borderRadius: 13,
                  background: selected ? P.bluePale : P.white,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  textAlign: "left",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    background: selected ? P.blue : P.blueSoft,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <I
                    icon={category.icon}
                    size={21}
                    color={selected ? P.white : P.blue}
                  />
                </span>
                <span style={{ flex: 1 }}>
                  <b
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 800,
                      color: P.navy,
                    }}
                  >
                    {x.label}
                  </b>
                  <span
                    style={{
                      display: "block",
                      marginTop: 3,
                      fontSize: 11,
                      color: P.gray,
                    }}
                  >
                    SGD {x.price} / {x.unit}
                  </span>
                </span>
                <AddonQuantityStepper
                  label={x.label}
                  quantity={quantity}
                  onDecrease={() => setItemQuantity(x.id, quantity - 1)}
                  onIncrease={() => setItemQuantity(x.id, quantity + 1)}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  if (step === 3) {
    const cells = [
      ...Array(6).fill(null),
      ...Array.from({ length: 31 }, (_, i) => i + 1),
    ]
    content = (
      <div style={{ padding: "16px 12px" }}>
        <Title
          title="Set your schedule"
          sub="Choose a date and preferred arrival time"
        />
        <section
          style={{
            padding: 14,
            border: `1px solid ${P.border}`,
            borderRadius: 15,
            background: P.white,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <b style={{ fontSize: 14, fontWeight: 900, color: P.navy }}>
              August 2026
            </b>
            <span style={{ display: "flex", gap: 6 }}>
              <button
                type="button"
                aria-label="Previous month"
                style={{
                  width: 32,
                  height: 32,
                  border: 0,
                  borderRadius: 9,
                  background: P.blueSoft,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <I icon={ArrowLeft01Icon} size={15} />
              </button>
              <button
                type="button"
                aria-label="Next month"
                style={{
                  width: 32,
                  height: 32,
                  border: 0,
                  borderRadius: 9,
                  background: P.blueSoft,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <I icon={ArrowRight01Icon} size={15} />
              </button>
            </span>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}
          >
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <b
                key={d}
                style={{ textAlign: "center", fontSize: 10, color: "#8c9ba7" }}
              >
                {d}
              </b>
            ))}
            {cells.map((d, i) =>
              d ? (
                <button
                  key={d}
                  disabled={d <= 6}
                  onClick={() => setDate(d)}
                  style={{
                    width: 32,
                    height: 32,
                    margin: "2px auto",
                    border: 0,
                    borderRadius: 16,
                    background: date === d ? P.blue : "transparent",
                    color: date === d ? P.white : d <= 6 ? "#c9d5dc" : P.navy,
                    fontSize: 12,
                    fontWeight: date === d ? 900 : 500,
                    cursor: d <= 6 ? "default" : "pointer",
                  }}
                >
                  {d}
                </button>
              ) : (
                <span key={i} />
              ),
            )}
          </div>
        </section>
        <section
          style={{
            marginTop: 10,
            padding: 12,
            border: `1px solid ${P.border}`,
            borderRadius: 15,
            background: P.white,
          }}
        >
          <b
            style={{
              display: "block",
              marginBottom: 10,
              fontSize: 13,
              fontWeight: 900,
              color: P.navy,
            }}
          >
            Preferred arrival time
          </b>
          <div
            style={{
              margin: "10px 0 12px",
              padding: 10,
              borderRadius: 12,
              border: "1.5px solid #f1d19a",
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
                background: "#ffefcf",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <I icon={FlashIcon} size={19} color={P.orange} />
            </span>
            <span style={{ flex: 1, fontSize: 10, color: P.gray }}>
              <b
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 800,
                  color: P.navy,
                }}
              >
                Urgent same-day arrival
              </b>
              Priority arrival from 9:00–10:00 · + SGD 40 / booking
            </span>
            <b
              style={{
                flexShrink: 0,
                fontSize: 11,
                fontWeight: 900,
                color: P.orange,
              }}
            >
              + SGD 40
            </b>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 7,
            }}
          >
            {TIMES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTime(t)}
                style={{
                  position: "relative",
                  minHeight: 38,
                  border: `1px solid ${time === t ? P.blue : P.border}`,
                  borderRadius: 9,
                  background: time === t ? P.blue : P.white,
                  color: time === t ? P.white : P.navy,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {URGENT_TIMES.has(t) && (
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
                    <I
                      icon={FlashIcon}
                      size={11}
                      color={time === t ? P.white : P.orange}
                    />
                  </span>
                )}
                {t}
              </button>
            ))}
          </div>
          {date && time && (
            <div
              style={{
                marginTop: 10,
                padding: 9,
                borderRadius: 10,
                background: P.blueSoft,
                color: P.blue,
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              <I icon={CalendarCheckIcon} size={16} /> Aug {date}, 2026 · {time}
              {URGENT_TIMES.has(time) ? " · Urgent same-day + SGD 40" : ""}
            </div>
          )}
        </section>
      </div>
    )
  }
  if (step === 4)
    content = (
      <div style={{ padding: "16px 12px" }}>
        <Title
          title="Add-on charges"
          sub="Only pay for the extras you select"
        />
        {ADDONS.map((a) => {
          const quantity = quantityFor(a.id)
          const selected = quantity > 0
          return (
            <div
              key={a.id}
              style={{
                width: "100%",
                minHeight: 68,
                marginBottom: 8,
                padding: "10px 12px",
                border: `1.5px solid ${selected ? P.green : P.border}`,
                borderRadius: 13,
                background: selected ? P.greenSoft : P.white,
                display: "flex",
                alignItems: "center",
                gap: 10,
                textAlign: "left",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 11,
                  background: selected ? "#caecd7" : P.blueSoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <I
                  icon={a.icon}
                  size={21}
                  color={selected ? P.green : P.blue}
                />
              </span>
              <span style={{ flex: 1 }}>
                <b
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 800,
                    color: P.navy,
                  }}
                >
                  {a.label}
                </b>
                <span
                  style={{
                    display: "block",
                    marginTop: 3,
                    fontSize: 11,
                    color: P.gray,
                  }}
                >
                  + SGD {a.price} / {a.unit}
                </span>
              </span>
              <AddonQuantityStepper
                label={a.label}
                quantity={quantity}
                onDecrease={() => setQuantity(a.id, quantity - 1)}
                onIncrease={() => setQuantity(a.id, quantity + 1)}
              />
            </div>
          )
        })}
        <label
          style={{
            display: "block",
            padding: 12,
            border: `1px solid ${P.border}`,
            borderRadius: 13,
            background: P.white,
            color: P.navy,
          }}
        >
          <span
            style={{
              display: "block",
              marginBottom: 7,
              fontSize: 12,
              fontWeight: 800,
              color: P.navy,
            }}
          >
            Service notes
          </span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe the surface, room, current color, or access details"
            rows={3}
            style={{
              width: "100%",
              boxSizing: "border-box",
              marginTop: 7,
              padding: 9,
              border: `1px solid ${P.border}`,
              borderRadius: 9,
              background: P.surface,
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              color: P.navy,
              outline: "none",
              resize: "none",
            }}
          />
        </label>
      </div>
    )
  if (step === 5)
    content = (
      <div style={{ padding: "16px 12px" }}>
        <Title
          title="Confirm your booking"
          sub="Check your services, schedule, and final price"
        />
        <section
          style={{
            overflow: "hidden",
            border: `1px solid ${P.border}`,
            borderRadius: 15,
            background: P.white,
          }}
        >
          <div style={{ padding: 14, background: P.blueSoft }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <I icon={category.icon} size={21} />
              <div>
                <b
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 900,
                    color: P.navy,
                  }}
                >
                  {category.label}
                </b>
                <div style={{ marginTop: 3, fontSize: 11, color: "#6d8798" }}>
                  {selectedItems.length === 1
                    ? `${selectedItems[0].label} · Fixed-price service`
                    : `${selectedItems.length} services · Fixed-price`}
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding: 14 }}>
            <Summary
              icon={Calendar03Icon}
              label="Date"
              value={`Aug ${date}, 2026`}
            />
            <Summary icon={Clock03Icon} label="Time" value={time} />
            <Summary
              icon={Location01Icon}
              label="Location"
              value="Unit #12-03 · Charleston"
            />
            {selectedItems.length > 0 && (
              <Summary
                icon={PaintBrush01Icon}
                label="Services"
                value={selectedItems
                  .map((x) => `${x.label} ×${itemQuantityFor(x.id)}`)
                  .join("\n")}
              />
            )}
            {extras.length > 0 && (
              <Summary
                icon={TaskDone01Icon}
                label="Add-ons"
                value={ADDONS.filter((a) => extras.includes(a.id))
                  .map((a) => `${a.label} ×${quantityFor(a.id)}`)
                  .join("\n")}
              />
            )}
            {notes && <Summary icon={Note01Icon} label="Notes" value={notes} />}
          </div>
        </section>
        <section
          style={{
            marginTop: 10,
            padding: 14,
            border: `1px solid ${P.border}`,
            borderRadius: 15,
            background: P.white,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 900,
              color: P.navy,
              marginBottom: 10,
            }}
          >
            Price breakdown
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
              fontSize: 12,
            }}
          >
            <span>Services ({selectedItems.length})</span>
            <b>SGD {itemsTotal}</b>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
              fontSize: 12,
            }}
          >
            <span>Selected add-ons</span>
            <b>SGD {extrasTotal}</b>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
              fontSize: 12,
            }}
          >
            <span>Urgent same-day service</span>
            <b style={{ color: priorityFee ? P.orange : P.gray }}>
              {priorityFee ? `+ SGD ${priorityFee}` : "Not selected"}
            </b>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
              fontSize: 12,
            }}
          >
            <span>Premium paint upgrade</span>
            <span>Charged separately</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
              paddingTop: 10,
              borderTop: `2px solid ${P.border}`,
            }}
          >
            <b style={{ fontSize: 14, fontWeight: 900, color: P.navy }}>
              Total payable
            </b>
            <b style={{ fontSize: 21, fontWeight: 900, color: P.blue }}>
              SGD {total}
            </b>
          </div>
        </section>
      </div>
    )
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: P.surface,
        fontFamily: "Inter,sans-serif",
      }}
    >
      <Header step={step} back={() => setStep(step === 1 ? 0 : step - 1)} />
      <Progress step={step - 1} />
      <main style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
        {content}
      </main>
      <Footer
        label={step === 5 ? "Confirm booking" : "Continue"}
        click={() => !disabled && setStep(step + 1)}
        disabled={disabled}
        total={step >= 2 ? total : undefined}
      />
    </div>
  )
}
