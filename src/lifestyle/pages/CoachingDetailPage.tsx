import "./coaching-detail.css"
import { useNavigate, useParams } from "react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  Award01Icon,
  Call02Icon,
  CatalogueIcon,
  CheckmarkCircle01Icon,
  Clock03Icon,
  HeartIcon,
  Location01Icon,
  Store01Icon,
  Dumbbell01Icon,
  SwimmingIcon,
  Yoga01Icon,
  TennisRacketIcon,
  Basketball01Icon,
  FootballIcon,
  DiscountTag01Icon,
  MapPinIcon,
  Navigation03Icon,
  Tag01Icon,
} from "@hugeicons/core-free-icons"
import { directoryMerchants, isDiscountBadge } from "./merchantDirectory"

const merchantDetails: Record<string, {
  description: string
  address: string
  phone: string
  email: string
}> = {
  "AquaKids Swimming": {
    description:
      "AquaKids Swimming provides confidence-building lessons for children and beginners. Certified coaches make every session safe, supportive and fun.",
    address: "123 Tampines Central 1, #04-05, Singapore 520123",
    phone: "+65 9123 4567",
    email: "hello@aquakids.com",
  },
  "The Yoga Room": {
    description:
      "A welcoming neighbourhood studio for small-group yoga classes, mindful movement and steady progress at every level.",
    address: "18 Orchard Boulevard, #02-18, Singapore 238841",
    phone: "+65 6388 0188",
    email: "hello@theyogaroom.sg",
  },
  "Baseline Tennis Club": {
    description:
      "Technique-led tennis coaching for beginners and improvers, with small groups and friendly coaches who build confidence on court.",
    address: "4 Stadium Walk, Singapore 397689",
    phone: "+65 6123 8210",
    email: "play@baselinetennis.sg",
  },
}

export default function CoachingDetailPage() {
  const navigate = useNavigate()
  const { merchantName } = useParams()
  const merchant =
    directoryMerchants.find(
      (item) => item.group === "Coaching" && item.name === merchantName,
    ) ?? directoryMerchants.find((item) => item.group === "Coaching")!
  const detail = merchantDetails[merchant.name] ?? {
    description: `${merchant.provider} offers approachable coaching with experienced instructors, flexible sessions and clear guidance for every level.`,
    address: "55 Sports Hub Way, #02-12, Singapore 397718",
    phone: "+65 6888 2050",
    email: "hello@coachingsg.com",
  }
  const serviceDetails = getServiceDetails(merchant.name)

  return (
    <main className="coaching-detail">
      <div className="coaching-detail__topbar">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back to services"
        >
          <HugeiconsIcon
            icon={ArrowLeft01Icon}
            size={20}
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>
        <div>
          <strong>Coaching &amp; sports</strong>
          <span>{merchant.name}</span>
        </div>
      </div>
      <div className="coaching-detail__scroll">
        <section className="coaching-detail__hero">
          <img src={merchant.image} alt={`${merchant.name} coaching`} />
          <div className="coaching-detail__hero-overlay">
            <span>TRUSTED LOCAL COACHING</span>
            <strong>{merchant.name}</strong>
            <small>
              <HugeiconsIcon
                icon={CheckmarkCircle01Icon}
                size={14}
                strokeWidth={2}
                aria-hidden="true"
              />{" "}
              {merchant.openNow ? "Open today" : "Book a session"}
            </small>
          </div>
        </section>

        <section className="coaching-detail__identity">
          <span className="coaching-detail__provider-mark" aria-hidden="true">
            <HugeiconsIcon icon={Store01Icon} size={25} strokeWidth={1.7} />
          </span>
          <div className="coaching-detail__identity-copy">
            <h1>{merchant.name}</h1>
            <span>{merchant.provider}</span>
          </div>
          <div className="coaching-detail__list-meta">
            <div className="coaching-detail__list-tags">
              {isDiscountBadge(merchant.badge) && (
                <span className="coaching-detail__discount-badge">
                  <HugeiconsIcon
                    icon={DiscountTag01Icon}
                    size={12}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  {merchant.badge}
                </span>
              )}
              <span className="coaching-detail__list-tag is-category">
                <HugeiconsIcon
                  icon={Tag01Icon}
                  size={12}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                {merchant.category}
              </span>
              <span className="coaching-detail__list-tag is-offer">
                <HugeiconsIcon
                  icon={DiscountTag01Icon}
                  size={12}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                {merchant.offer}
              </span>
            </div>
            <div className="coaching-detail__list-summary">
              <strong>From ${merchant.price} / {merchant.unit}</strong>
              <span>
                <HugeiconsIcon
                  icon={MapPinIcon}
                  size={12}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                {merchant.distance} km away
              </span>
            </div>
          </div>
        </section>

        <div className="coaching-detail__content">
          <section className="coaching-detail__section coaching-detail__intro-card">
            <div className="coaching-detail__section-title">
              <span className="coaching-detail__section-title-icon" aria-hidden="true">
                <HugeiconsIcon icon={Award01Icon} size={17} strokeWidth={1.8} />
              </span>
              <h2>About this service</h2>
            </div>
            <p>{detail.description}</p>
          </section>

          <section className="coaching-detail__section">
            <div className="coaching-detail__section-title">
              <span className="coaching-detail__section-title-icon" aria-hidden="true">
                <HugeiconsIcon icon={CatalogueIcon} size={17} strokeWidth={1.8} />
              </span>
              <h2>Services</h2>
            </div>
            <div className="coaching-detail__service-list">
              {serviceDetails.items.map((service, index) => (
                <article className="coaching-detail__service-row" key={service.title}>
                  <div className="coaching-detail__service-copy">
                    <strong>{service.title}</strong>
                    <span>{service.description}</span>
                  </div>
                  <small>
                    From ${merchant.price + index * 5}
                    <span>/{merchant.unit}</span>
                  </small>
                </article>
              ))}
            </div>
          </section>

          <section className="coaching-detail__section coaching-detail__highlight-card">
            <h2>Highlights</h2>
            <div className="coaching-detail__highlights">
              <div>
                <HugeiconsIcon
                  icon={Award01Icon}
                  size={22}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <span>
                  Kids &amp;
                  <br />
                  beginners
                </span>
              </div>
              <div>
                <HugeiconsIcon
                  icon={CheckmarkCircle01Icon}
                  size={22}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <span>
                  Certified
                  <br />
                  coaches
                </span>
              </div>
              <div>
                <HugeiconsIcon
                  icon={HeartIcon}
                  size={22}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <span>
                  Trial lesson
                  <br />
                  available
                </span>
              </div>
            </div>
          </section>

          <section className="coaching-detail__section coaching-detail__info-section">
            <div className="coaching-detail__section-title">
              <span className="coaching-detail__section-title-icon" aria-hidden="true">
                <HugeiconsIcon icon={Clock03Icon} size={17} strokeWidth={1.8} />
              </span>
              <h2>Opening hours</h2>
            </div>
            <dl className="coaching-detail__hours">
              <div>
                <dt>Monday - Friday</dt>
                <dd>9:00 AM - 8:00 PM</dd>
              </div>
              <div>
                <dt>Saturday - Sunday</dt>
                <dd>9:00 AM - 6:00 PM</dd>
              </div>
            </dl>
          </section>

          <section className="coaching-detail__section coaching-detail__info-section">
            <div className="coaching-detail__section-title">
              <span className="coaching-detail__section-title-icon" aria-hidden="true">
                <HugeiconsIcon icon={Location01Icon} size={17} strokeWidth={1.8} />
              </span>
              <h2>Location</h2>
            </div>
            <div className="coaching-detail__location">
              <address>{detail.address}</address>
              <a
                className="coaching-detail__directions"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(detail.address)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Get directions"
              >
                <HugeiconsIcon
                  icon={Navigation03Icon}
                  size={19}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </a>
            </div>
          </section>

        </div>
      </div>

      <div className="coaching-detail__bottom-bar">
        <a
          className="coaching-detail__bottom-action"
          href={`tel:${detail.phone.replace(/\s/g, "")}`}
        >
          <span>Questions about this service?</span>
          <strong>Contact merchant</strong>
          <HugeiconsIcon
            icon={Call02Icon}
            size={20}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </a>
      </div>
    </main>
  )
}

function getServiceDetails(name: string) {
  const generic = {
    icon: Dumbbell01Icon,
    items: [
      { title: "Small-group coaching", description: "Guided practice for every level" },
      { title: "Private coaching", description: "One-to-one focused support" },
      { title: "Weekend class", description: "Flexible sessions for busy schedules" },
    ],
  }

  const services = {
    "AquaKids Swimming": {
      icon: SwimmingIcon,
      items: [
        { title: "Learn to Swim", description: "Water confidence for beginners" },
        { title: "Kids Confidence", description: "Safe, playful skill building" },
        { title: "Adult Beginner", description: "Start at your own pace" },
        { title: "Private Coaching", description: "Individual technique support" },
      ],
    },
    "The Yoga Room": {
      icon: Yoga01Icon,
      items: [
        { title: "Beginner Flow", description: "Foundations and simple movement" },
        { title: "Gentle Hatha", description: "Steady poses and mindful breath" },
        { title: "Slow Vinyasa", description: "A calm, strength-building flow" },
        { title: "Private Yoga", description: "Practice shaped around your goals" },
      ],
    },
    "Baseline Tennis Club": {
      icon: TennisRacketIcon,
      items: [
        { title: "Beginner Tennis", description: "Learn the core strokes" },
        { title: "Skills Clinic", description: "Improve movement and technique" },
        { title: "Match Play", description: "Build confidence on court" },
        { title: "Private Lesson", description: "Personal coaching feedback" },
      ],
    },
    "Peak Performance PT": {
      icon: Dumbbell01Icon,
      items: [
        { title: "Fitness Assessment", description: "Set a clear starting point" },
        { title: "1-to-1 Training", description: "Personalised workout sessions" },
        { title: "Strength Conditioning", description: "Build lasting capability" },
        { title: "Small-group PT", description: "Train with a focused group" },
      ],
    },
    "HoopLab Academy": {
      icon: Basketball01Icon,
      items: [
        { title: "Basketball Basics", description: "Core passing, shooting and movement" },
        { title: "Skills Lab", description: "Technique-led drills and practice" },
        { title: "Weekend League", description: "Game time with guided coaching" },
      ],
    },
    "Kickoff Football School": {
      icon: FootballIcon,
      items: [
        { title: "Junior Football", description: "A fun start for young players" },
        { title: "Ball Mastery", description: "Control, dribbling and confidence" },
        { title: "Term Programme", description: "Progress across a full season" },
      ],
    },
  } as const

  return services[name as keyof typeof services] ?? generic
}
