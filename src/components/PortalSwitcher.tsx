import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BankIcon,
  Building01Icon,
  Exchange01Icon,
  Store01Icon,
} from "@hugeicons/core-free-icons"

type Portal = "property-dashboard" | "merchant-dashboard" | "finance-dashboard"

const options: { id: Portal; label: string; icon: typeof Building01Icon }[] = [
  { id: "property-dashboard", label: "物业端", icon: Building01Icon },
  { id: "merchant-dashboard", label: "商家端", icon: Store01Icon },
  { id: "finance-dashboard", label: "财务端", icon: BankIcon },
]

export default function PortalSwitcher({
  current,
  onSwitch,
}: {
  current: Portal
  onSwitch: (portal: Portal) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="portal-switcher">
      {open && (
        <div className="portal-switcher__menu" role="menu" aria-label="切换端口">
          {options.map((option) => (
            <button
              type="button"
              role="menuitemradio"
              key={option.id}
              aria-checked={current === option.id}
              className={current === option.id ? "is-active" : ""}
              onClick={() => {
                setOpen(false)
                if (current !== option.id) onSwitch(option.id)
              }}
            >
              <HugeiconsIcon icon={option.icon} size={16} strokeWidth={1.8} aria-hidden="true" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        className="portal-switcher__trigger"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        <HugeiconsIcon icon={Exchange01Icon} size={15} strokeWidth={1.8} aria-hidden="true" />
        <span>切换端口</span>
      </button>
    </div>
  )
}
