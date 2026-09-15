import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  Calendar03Icon,
  HeadphonesIcon,
  Home01Icon,
} from "@hugeicons/core-free-icons"

type ResidentNavItem = "home" | "bookings" | "support"

interface ResidentBottomNavProps {
  active: ResidentNavItem
  onHome?: () => void
  onBookings?: () => void
  onSupport?: () => void
}

const ITEMS: {
  id: ResidentNavItem
  label: string
  icon: IconSvgElement
}[] = [
  { id: "home", label: "Home", icon: Home01Icon },
  { id: "bookings", label: "Bookings", icon: Calendar03Icon },
  { id: "support", label: "Support", icon: HeadphonesIcon },
]

export default function ResidentBottomNav({
  active,
  onHome,
  onBookings,
  onSupport,
}: ResidentBottomNavProps) {
  const actions: Record<ResidentNavItem, (() => void) | undefined> = {
    home: onHome,
    bookings: onBookings,
    support: onSupport,
  }

  return (
    <nav
      aria-label="Resident navigation"
      style={{
        height: 62,
        flex: "0 0 62px",
        display: "flex",
        alignItems: "stretch",
        borderTop: "1px solid #eaf0f5",
        background: "rgba(255, 255, 255, 0.97)",
        boxShadow: "0 -4px 10px rgba(20, 40, 70, 0.06)",
      }}
    >
      {ITEMS.map((item) => {
        const isActive = item.id === active
        const onClick = actions[item.id]
        const color = isActive ? "#1c9dd7" : "#9aa6b2"

        return (
          <button
            key={item.id}
            type="button"
            onClick={onClick}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            style={{
              minWidth: 0,
              flex: 1,
              padding: 4,
              border: 0,
              background: "transparent",
              color,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              cursor: onClick ? "pointer" : "default",
              fontFamily: "Inter, sans-serif",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
            }}
          >
            <HugeiconsIcon
              icon={item.icon}
              size={20}
              color="currentColor"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <span style={{ fontSize: 10, lineHeight: 1, fontWeight: 700 }}>
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
