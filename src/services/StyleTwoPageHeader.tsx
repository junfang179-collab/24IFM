import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import type { ReactNode } from "react"

interface Props {
  title: string
  onBack: () => void
  subtitle?: string
  backLabel?: string
  trailing?: ReactNode
}

export default function StyleTwoPageHeader({
  title,
  onBack,
  subtitle,
  backLabel = "Back",
  trailing,
}: Props) {
  return (
    <>
      <div style={{ height: 44, flexShrink: 0, background: "#ffffff" }} />
      <header
        style={{
          minHeight: 56,
          padding: "0 16px 12px",
          background: "#ffffff",
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
          onClick={onBack}
          aria-label={backLabel}
          style={{
            width: 44,
            height: 44,
            minWidth: 44,
            border: "none",
            borderRadius: "50%",
            background: "#EFF8FD",
            color: "#1c9dd7",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            boxShadow: "none",
          }}
        >
          <HugeiconsIcon
            icon={ArrowLeft01Icon}
            size={20}
            color="#1C9DD7"
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
              color: "#16324f",
              fontSize: 17,
              fontWeight: 900,
              lineHeight: 1.2,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                marginTop: 3,
                color: "#6d8798",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
        {trailing ? (
          <div
            style={{
              minWidth: 44,
              height: 44,
              display: "grid",
              placeItems: "center",
            }}
          >
            {trailing}
          </div>
        ) : null}
      </header>
    </>
  )
}
