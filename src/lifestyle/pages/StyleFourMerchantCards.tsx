import { CheckmarkBadge01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react"
import type { LifestyleService } from "./lifestyleServices"

interface StyleFourMerchantCardsProps {
  services: LifestyleService[]
  emptyMessage: string
  ariaLabel?: string
}

type DragPointer = { id: number; startX: number; startScroll: number }

export default function StyleFourMerchantCards({
  services,
  emptyMessage,
  ariaLabel = "Popular merchants carousel",
}: StyleFourMerchantCardsProps) {
  const pointerRef = useRef<DragPointer | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current
    if (!pointer || pointer.id !== event.pointerId) return
    pointerRef.current = null
    setIsDragging(false)
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  return (
    <div
      className={`lifestyle-style-four__service-list${
        isDragging ? " is-dragging" : ""
      }`}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onPointerDown={(event) => {
        if (event.button !== 0 || pointerRef.current) return
        pointerRef.current = {
          id: event.pointerId,
          startX: event.clientX,
          startScroll: event.currentTarget.scrollLeft,
        }
        setIsDragging(true)
        event.currentTarget.setPointerCapture?.(event.pointerId)
      }}
      onPointerMove={(event) => {
        const pointer = pointerRef.current
        if (!pointer || pointer.id !== event.pointerId) return
        event.currentTarget.scrollLeft =
          pointer.startScroll - (event.clientX - pointer.startX)
      }}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
    >
      {services.map((service) => (
        <article className="lifestyle-style-four__service" key={service.name}>
          <div className="lifestyle-style-four__service-visual">
            <img src={service.image} alt={service.name} loading="lazy" />
            {/^[0-9]+%\s*OFF\b/i.test(service.badge.trim()) && (
              <span className="lifestyle-style-four__service-badge">
                {service.badge}
              </span>
            )}
            <span
              className="lifestyle-style-four__service-mode"
              data-mode={service.distance}
            >
              {service.distance}
            </span>
          </div>
          <div className="lifestyle-style-four__service-content">
            <div className="lifestyle-style-four__service-title">
              <h3 title={service.name}>{service.name}</h3>
            </div>
            <p className="lifestyle-style-four__service-summary">
              {service.provider}
            </p>
            <div className="lifestyle-style-four__trust">
              <HugeiconsIcon
                icon={CheckmarkBadge01Icon}
                size={11}
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <strong>Vetted</strong>
              <span aria-hidden="true">·</span>
              <span title={service.offer}>
                {service.offer.replace(/^Vetted\s*·\s*/i, "")}
              </span>
            </div>
          </div>
        </article>
      ))}
      {services.length === 0 && (
        <p className="lifestyle-style-four__empty">{emptyMessage}</p>
      )}
    </div>
  )
}
