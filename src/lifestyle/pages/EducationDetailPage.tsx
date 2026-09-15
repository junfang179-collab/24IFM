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
  name: "BrightMinds Tutoring",
  saves: 320,
  image:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&h=640&q=85",
}

export default function EducationDetailPage() {
  const navigate = useNavigate()
  const { serviceId } = useParams()
  const [saved, setSaved] = useState(false)

  return (
    <main className="detail-page">
      <div className="detail-scroll">
        <div className="detail-hero">
          <img src={profile.image} alt="Education tutoring session" />
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
            EDUCATION ·{" "}
            {serviceId === "brightminds" ? "CHARLESTON" : "NEAR CHARLESTON"}
          </p>
          <h1>{profile.name}</h1>
          <div className="detail-meta">
            <span>0.8 km away</span>
          </div>
          <div className="detail-status">
            <span>
              <HugeiconsIcon
                icon={Clock03Icon}
                size={14}
                color="currentColor"
                strokeWidth={1.8}
              />
              Open today · until 9:00 pm
            </span>
          </div>
          <div className="about">
            <h2>Expert tutoring for academic success.</h2>
            <p>
              Personalized learning plans tailored to each student's needs. Our
              experienced tutors focus on building strong foundations and
              boosting confidence in math, science, and more.
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
                <strong>BrightMinds Academy</strong>
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
                  12 Education Drive, #03-15
                  <br />
                  Singapore 098765
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
                  Mon–Fri 2:00 pm–9:00 pm
                  <br />
                  Sat–Sun 9:00 am–6:00 pm
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
