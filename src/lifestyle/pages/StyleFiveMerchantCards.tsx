import {
  CheckmarkBadge01Icon,
  DiscountTag01Icon,
  MapPinIcon,
  Tag01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import type { LifestyleService } from "./lifestyleServices"

interface StyleFiveMerchantCardsProps {
  services: LifestyleService[]
  emptyMessage: string
  ariaLabel?: string
  showTrust?: boolean
  useAllServiceCard?: boolean
}

type DragPointer = { id: number startX: number startScroll: number }

export default function StyleFiveMerchantCards({
  services,
  emptyMessage,
  ariaLabel = "Popular merchants carousel",
  showTrust = true,
  useAllServiceCard = false,
}: StyleFiveMerchantCardsProps) {
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
      className={`lifestyle-style-five__service-list${
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
        <article
          className={`lifestyle-style-five__service${
            useAllServiceCard ? " is-all-services" : ""
          }`}
          key={service.name}
        >
          <div className="lifestyle-style-five__service-visual">
            <img src={service.image} alt={service.name} loading="lazy" />
            {/^(?:[0-9]+%|\$[0-9]+)\s*OFF\b/i.test(service.badge.trim()) && (
              <span className="lifestyle-style-five__service-badge">
                {service.badge}
              </span>
            )}
            {!useAllServiceCard && (
              <span
                className="lifestyle-style-five__service-mode"
                data-mode={service.distance}
              >
                {service.distance}
              </span>
            )}
          </div>
          <div className="lifestyle-style-five__service-content">
            <div className="lifestyle-style-five__service-title">
              <h3 title={service.name}>{service.name}</h3>
            </div>
            <p className="lifestyle-style-five__service-summary">
              {service.provider}
            </p>
            {useAllServiceCard ? (
              <>
                <p className="lifestyle-style-five__service-line is-category">
                  <HugeiconsIcon
                    icon={Tag01Icon}
                    size={12}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span>{service.category}</span>
                </p>
                <p className="lifestyle-style-five__service-line is-offer">
                  <HugeiconsIcon
                    icon={DiscountTag01Icon}
                    size={12}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span>{service.offer}</span>
                </p>
                <div className="lifestyle-style-five__service-footer">
                  <strong>{service.price}</strong>
                  <span className="lifestyle-style-five__service-distance">
                    <HugeiconsIcon
                      icon={MapPinIcon}
                      size={12}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    {service.distance}
                  </span>
                </div>
              </>
            ) : (
              showTrust && (
              <div className="lifestyle-style-five__trust">
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
              )
            )}
          </div>
        </article>
      ))}
      {services.length === 0 && (
        <p className="lifestyle-style-five__empty">{emptyMessage}</p>
      )}
    </div>
  )
}
