import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Call02Icon,
  Clock03Icon,
  HeartIcon,
  Location01Icon,
  Store01Icon,
} from "@hugeicons/core-free-icons"

const profile = {
  name: "AquaKids Swimming",
  saves: 482,
  image:
    "https://images.unsplash.com/photo-1562271613-c3a4be2cc883?auto=format&fit=crop&w=1200&h=640&q=85",
}

export default function SwimmingDetailPage() {
  const navigate = useNavigate()
  const { serviceId } = useParams()
  const [saved, setSaved] = useState(false)

  return (
    <main className="detail-page">
      <div className="detail-scroll">
        <div className="detail-hero">
          <img src={profile.image} alt="Children swimming in a pool" />
          <button onClick={() => navigate(-1)} aria-label="Back" type="button">
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={20}
              color="currentColor"
              strokeWidth={2}
            />
          </button>
        </div>
        <section className="detail-content">
          <p className="eyebrow">
            SWIMMING LESSONS ·{" "}
            {serviceId === "aquakids" ? "CHARLESTON" : "NEAR CHARLESTON"}
          </p>
          <h1>{profile.name}</h1>
          <div className="detail-meta">
            <span>1.2 km away</span>
          </div>
          <div className="detail-status">
            <span>
              <HugeiconsIcon
                icon={Clock03Icon}
                size={14}
                color="currentColor"
                strokeWidth={1.8}
              />
              Open today · until 8:00 pm
            </span>
          </div>
          <div className="about">
            <h2>A supportive swim practice for every level.</h2>
            <p>
              Small, confidence-building lessons for children and adults.
              Coaches focus on calm progression, safe technique and a genuinely
              welcoming poolside atmosphere.
            </p>
          </div>
          <section className="merchant-info" aria-label="Service details">
            <div>
              <span className="merchant-info-icon">
                <HugeiconsIcon
                  icon={Store01Icon}
                  size={18}
                  color="currentColor"
                  strokeWidth={1.8}
                />
              </span>
              <p>
                <span>Service provider</span>
                <strong>AquaKids Academy</strong>
              </p>
            </div>
            <div>
              <span className="merchant-info-icon">
                <HugeiconsIcon
                  icon={Location01Icon}
                  size={18}
                  color="currentColor"
                  strokeWidth={1.8}
                />
              </span>
              <p>
                <span>Address</span>
                <strong>
                  4A Keppel Bay Drive, #02-10
                  <br />
                  Singapore 098418
                </strong>
              </p>
            </div>
            <div>
              <span className="merchant-info-icon">
                <HugeiconsIcon
                  icon={Clock03Icon}
                  size={18}
                  color="currentColor"
                  strokeWidth={1.8}
                />
              </span>
              <p>
                <span>Opening hours</span>
                <strong>
                  Mon–Fri 9:00 am–8:00 pm
                  <br />
                  Sat–Sun 8:00 am–6:00 pm
                </strong>
              </p>
            </div>
          </section>
        </section>
      </div>
      <div className="detail-bottom-bar">
        <button
          className={saved ? "bottom-favorite saved" : "bottom-favorite"}
          onClick={() => setSaved(!saved)}
          aria-label={saved ? "Remove from saved" : "Save service"}
          type="button"
        >
          <HugeiconsIcon
            className={saved ? "icon-filled" : ""}
            icon={HeartIcon}
            size={22}
            color="currentColor"
            strokeWidth={1.8}
          />
          <small>{profile.saves + (saved ? 1 : 0)}</small>
        </button>
        <a className="detail-call-bar" href="tel:+6561234567">
          <div className="detail-call-bar-text">
            <span>Questions about this service?</span>
            <strong>Call merchant</strong>
          </div>
          <HugeiconsIcon
            icon={Call02Icon}
            size={21}
            color="currentColor"
            strokeWidth={1.8}
          />
        </a>
      </div>
    </main>
  )
}
