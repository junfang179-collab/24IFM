import { HugeiconsIcon } from "@hugeicons/react"
import {
  DiscountTag01Icon,
  MapPinIcon,
  Tag01Icon,
} from "@hugeicons/core-free-icons"
import type { LifestyleService } from "./lifestyleServices"

interface LifestyleServiceCardsProps {
  services: LifestyleService[]
  emptyMessage: string
  onlyDiscountBadge?: boolean
}

export default function LifestyleServiceCards({
  services,
  emptyMessage,
  onlyDiscountBadge = false,
}: LifestyleServiceCardsProps) {
  return (
    <div className="lifestyle-style-three__service-list">
      {services.map((service) => (
        <article className="lifestyle-style-three__service" key={service.name}>
          <img src={service.image} alt={service.name} />
          {(!onlyDiscountBadge ||
          /^(?:[0-9]+%|\$[0-9]+)\s*OFF\b/i.test(service.badge.trim())) && (
            <span className="lifestyle-style-three__service-badge">
              {service.badge}
            </span>
          )}
          <div>
            <div className="lifestyle-style-three__service-title">
              <h3>{service.name}</h3>
            </div>
            <small>{service.provider}</small>
            <div className="lifestyle-style-three__service-meta">
              <span className="lifestyle-style-three__service-category">
                <HugeiconsIcon
                  icon={Tag01Icon}
                  size={12}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                {service.category}
              </span>
              <span className="lifestyle-style-three__service-distance">
                <HugeiconsIcon
                  icon={MapPinIcon}
                  size={12}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                {service.distance}
              </span>
            </div>
            <p className="lifestyle-style-three__offer">
              <HugeiconsIcon
                icon={DiscountTag01Icon}
                size={12}
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <span>{service.offer}</span>
            </p>
            <p className="lifestyle-style-three__description">
              {service.description}
            </p>
            <strong>{service.price}</strong>
          </div>
        </article>
      ))}
      {services.length === 0 && (
        <p className="lifestyle-style-three__empty">{emptyMessage}</p>
      )}
    </div>
  )
}
