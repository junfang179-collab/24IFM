import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, MinusSignIcon } from "@hugeicons/core-free-icons"

interface Props {
  label: string
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
  max?: number
}

export default function AddonQuantityStepper({
  label,
  quantity,
  onDecrease,
  onIncrease,
  max = 99,
}: Props) {
  const active = quantity > 0
  const atMax = quantity >= max

  return (
    <span
      role="group"
      aria-label={`${label} quantity`}
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
        aria-label={`Remove one ${label}`}
        onClick={onDecrease}
        disabled={!active}
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          border: `1.5px solid ${active ? "#dbeaf2" : "#e5edf1"}`,
          background: active ? "white" : "#f5f8fa",
          color: active ? "#31536f" : "#b8c6cf",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: active ? "pointer" : "not-allowed",
          opacity: active ? 1 : 0.7,
        }}
      >
        <HugeiconsIcon icon={MinusSignIcon} size={15} color="currentColor" />
      </button>
      <span
        aria-live="polite"
        style={{
          minWidth: 22,
          textAlign: "center",
          fontSize: 14,
          fontWeight: 900,
          color: active ? "#16834f" : "#6b7787",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {quantity}
      </span>
      <button
        type="button"
        aria-label={`Add one ${label}`}
        onClick={onIncrease}
        disabled={atMax}
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          border: "1.5px solid #1c9dd7",
          background: "#1c9dd7",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: atMax ? "not-allowed" : "pointer",
          boxShadow: "0 4px 10px rgba(28,157,215,0.18)",
          opacity: atMax ? 0.55 : 1,
        }}
      >
        <HugeiconsIcon icon={Add01Icon} size={15} color="white" />
      </button>
    </span>
  )
}
