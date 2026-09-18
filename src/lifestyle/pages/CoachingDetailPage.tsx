import "./coaching-detail.css"
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { useNavigate, useParams } from "react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  FavouriteIcon,
  GlobeIcon,
  MoreHorizontalIcon,
  TelephoneIcon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons"
import { directoryMerchants } from "./merchantDirectory"

type CoachingDetail = {
  area: string
  address: string
  phone: string
  closingTime: string
  description: string
  gallery: string[]
  rates: { title: string; duration: string; price: string }[]
  timetable: { days: string; sessions: { title: string; time: string }[] }[]
}

type GalleryPointer = { id: number; startX: number; width: number }

const defaultDetail: CoachingDetail = {
  area: "Singapore Sports Hub",
  address: "55 Sports Hub Way, #02-12, Singapore 397718",
  phone: "+65 6888 2050",
  closingTime: "8:00 PM",
  description:
    "Friendly coaching in a focused small-group setting. Build confidence, improve technique and enjoy steady progress at your own pace. Sessions are planned around each learner’s starting point, with practical guidance and time to ask questions. Contact the coach before your first visit to discuss suitable class times and the best programme for your goals.",
  gallery: [
    "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=960&h=680&q=88",
    "https://images.unsplash.com/photo-1530137073520-20c7b2bb92f6?auto=format&fit=crop&w=960&h=680&q=88",
    "https://images.unsplash.com/photo-1600965962102-9d260a71890d?auto=format&fit=crop&w=960&h=680&q=88",
  ],
  rates: [
    { title: "Small-group coaching", duration: "60 min", price: "$45" },
    { title: "Private coaching", duration: "60 min", price: "$70" },
    { title: "Weekend skills class", duration: "75 min", price: "$52" },
  ],
  timetable: [
    {
      days: "Mon-Fri",
      sessions: [
        { title: "Beginner coaching", time: "4:30 PM" },
        { title: "Skills practice", time: "6:00 PM" },
      ],
    },
    {
      days: "Sat-Sun",
      sessions: [
        { title: "Small-group coaching", time: "9:00 AM" },
        { title: "Private coaching", time: "11:30 AM" },
      ],
    },
  ],
}

const detailsByMerchant: Record<string, Partial<CoachingDetail>> = {
  "AquaKids Swimming": {
    area: "Tampines",
    address: "123 Tampines Central 1, #04-05, Singapore 520123",
    phone: "+65 9123 4567",
    closingTime: "8:00 PM",
    description:
      "AquaKids Swimming builds water confidence for children and adult beginners. Certified coaches keep every session safe, supportive and fun. Lessons are kept in small groups so each swimmer gets clear feedback on breathing, floating, kicking and stroke technique. Choose a weekday class, weekend session or private coaching based on your child’s pace and goals. Parents can start with a trial lesson before selecting an ongoing programme.",
    gallery: [
      "https://images.unsplash.com/photo-1562271613-c3a4be2cc883?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1600965962102-9d260a71890d?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Learn to Swim", duration: "45 min", price: "$45" },
      { title: "Kids Confidence", duration: "60 min", price: "$52" },
      { title: "Adult Beginner", duration: "60 min", price: "$55" },
      { title: "Private coaching", duration: "45 min", price: "$75" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        sessions: [
          { title: "Kids Confidence", time: "4:30 PM" },
          { title: "Adult Beginner", time: "7:00 PM" },
        ],
      },
      {
        days: "Sat-Sun",
        sessions: [
          { title: "Learn to Swim", time: "9:00 AM" },
          { title: "Private coaching", time: "11:30 AM" },
        ],
      },
    ],
  },
  "The Yoga Room": {
    area: "Tanjong Pagar",
    address: "18 Orchard Boulevard, #02-18, Singapore 238841",
    phone: "+65 6388 0188",
    closingTime: "9:30 PM",
    description:
      "A welcoming neighbourhood studio for small-group yoga classes, mindful movement and steady progress at every level. Teachers offer clear variations for beginners while helping regular practitioners deepen their strength, balance and mobility. Bring a mat if you prefer your own, or borrow one at the studio. Message the team before class if you are new to yoga, pregnant or returning after an injury.",
    gallery: [
      "https://images.unsplash.com/photo-1593811167565-4672e6c8ce4c?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Vinyasa flow", duration: "60 min", price: "$32" },
      { title: "Hatha", duration: "60 min", price: "$28" },
      { title: "Yin & restorative", duration: "75 min", price: "$35" },
      { title: "10-class pass", duration: "Flexible", price: "$260" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        sessions: [
          { title: "Vinyasa flow", time: "7:00 AM" },
          { title: "Hatha", time: "12:15 PM" },
          { title: "Yin & restorative", time: "7:30 PM" },
        ],
      },
      {
        days: "Sat",
        sessions: [
          { title: "Vinyasa · Prenatal", time: "9:00 AM · 11:00 AM" },
        ],
      },
    ],
  },
  "Baseline Tennis Club": {
    area: "Kallang",
    address: "4 Stadium Walk, Singapore 397689",
    phone: "+65 6123 8210",
    closingTime: "9:00 PM",
    description:
      "Technique-led tennis coaching for beginners and improvers, with small groups and friendly coaches who build confidence on court. Each session combines footwork, core strokes and game-based practice so players can apply new skills straight away. Rackets can be provided for trial lessons, and coaches will recommend the right group after a short chat about your experience and goals.",
    gallery: [
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=960&h=680&q=88",
    ],
  },
  "Peak Performance PT": {
    description:
      "Peak Performance PT offers practical, personalised training for people who want to move better and feel stronger. Coaches begin with a simple assessment, then tailor sessions around strength, mobility and everyday fitness goals. New clients can discuss preferred training times, past injuries and confidence levels before choosing a one-to-one or small-group plan.",
    gallery: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=960&h=680&q=88",
    ],
  },
  "HoopLab Academy": {
    description:
      "HoopLab Academy runs energetic basketball sessions for young players developing their fundamentals. Classes focus on ball handling, passing, shooting and decision-making through small-sided games. Coaches group players by confidence and age where possible, and parents can message the academy to find the right starting class or arrange a trial.",
    gallery: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1518065896235-a4c93e088e7a?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=960&h=680&q=88",
    ],
  },
  "Kickoff Football School": {
    description:
      "Kickoff Football School gives children a positive, structured introduction to the game. Sessions build control, movement, teamwork and match confidence through age-appropriate drills and guided play. Coaches welcome complete beginners as well as returning players, and can advise on suitable groups, term dates and what to bring for the first session.",
    gallery: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=960&h=680&q=88",
    ],
  },
}

export default function CoachingDetailPage() {
  const navigate = useNavigate()
  const { merchantName } = useParams()
  const merchant =
    directoryMerchants.find(
      (item) => item.group === "Coaching" && item.name === merchantName,
    ) ?? directoryMerchants.find((item) => item.group === "Coaching")!
  const detail = { ...defaultDetail, ...detailsByMerchant[merchant.name] }
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [isGalleryPaused, setIsGalleryPaused] = useState(false)
  const [isGalleryDragging, setIsGalleryDragging] = useState(false)
  const [galleryDrag, setGalleryDrag] = useState(0)
  const galleryPointerRef = useRef<GalleryPointer | null>(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const phoneDigits = detail.phone.replace(/\D/g, "")
  const whatsappHref = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(`Hello ${merchant.name}, I would like to ask about your coaching sessions.`)}`

  useEffect(() => {
    setGalleryIndex(0)
  }, [merchant.name])

  useEffect(() => {
    if (
      isGalleryPaused ||
      detail.gallery.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }
    const interval = window.setInterval(() => {
      setGalleryIndex((current) => (current + 1) % detail.gallery.length)
    }, 4000)
    return () => window.clearInterval(interval)
  }, [detail.gallery.length, isGalleryPaused])

  const shareMerchant = async () => {
    const shareData = {
      title: merchant.name,
      text: `View ${merchant.name} on 24iFM`,
    }
    if (navigator.share) {
      await navigator.share(shareData)
      return
    }
    await navigator.clipboard?.writeText(window.location.href)
  }

  const finishGalleryDrag = (
    event: ReactPointerEvent<HTMLElement>,
  ) => {
    const pointer = galleryPointerRef.current
    if (!pointer || pointer.id !== event.pointerId) return
    const distance = event.clientX - pointer.startX
    if (Math.abs(distance) >= Math.min(48, pointer.width * 0.15)) {
      setGalleryIndex((current) =>
        distance < 0
          ? (current + 1) % detail.gallery.length
          : (current - 1 + detail.gallery.length) % detail.gallery.length,
      )
    }
    galleryPointerRef.current = null
    setGalleryDrag(0)
    setIsGalleryDragging(false)
    setIsGalleryPaused(false)
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  return (
    <main className="coaching-detail">
      <div
        className={`coaching-detail__floating-header${
          hasScrolled ? " is-solid" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back to services"
        >
          <HugeiconsIcon
            icon={ArrowLeft01Icon}
            size={21}
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>
        <span>
          <button
            type="button"
            aria-label={
              isSaved ? "Remove from saved services" : "Save service"
            }
            aria-pressed={isSaved}
            onClick={() => setIsSaved((saved) => !saved)}
          >
            <HugeiconsIcon
              icon={FavouriteIcon}
              size={20}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={shareMerchant}
            aria-label="Share service"
          >
            <HugeiconsIcon
              icon={MoreHorizontalIcon}
              size={21}
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
        </span>
      </div>
      <div
        className="coaching-detail__scroll"
        onScroll={(event) => setHasScrolled(event.currentTarget.scrollTop > 12)}
      >
        <section
          className="coaching-detail__gallery"
          aria-label={`${merchant.name} photo gallery`}
          onMouseEnter={() => setIsGalleryPaused(true)}
          onMouseLeave={() => setIsGalleryPaused(false)}
          onFocusCapture={() => setIsGalleryPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsGalleryPaused(false)
            }
          }}
          onPointerDown={(event) => {
            if (
              event.button !== 0 ||
              (event.target as HTMLElement).closest("button")
            ) {
              return
            }
            galleryPointerRef.current = {
              id: event.pointerId,
              startX: event.clientX,
              width: event.currentTarget.clientWidth,
            }
            setIsGalleryPaused(true)
            setIsGalleryDragging(true)
            event.currentTarget.setPointerCapture?.(event.pointerId)
          }}
          onPointerMove={(event) => {
            const pointer = galleryPointerRef.current
            if (!pointer || pointer.id !== event.pointerId) return
            setGalleryDrag(
              Math.max(
                -pointer.width,
                Math.min(pointer.width, event.clientX - pointer.startX),
              ),
            )
          }}
          onPointerUp={finishGalleryDrag}
          onPointerCancel={finishGalleryDrag}
        >
          <div
            className={`coaching-detail__gallery-track${
              isGalleryDragging ? " is-dragging" : ""
            }`}
            style={{
              transform: `translateX(calc(${-galleryIndex * 100}% + ${galleryDrag}px))`,
            }}
          >
            {detail.gallery.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={index === galleryIndex ? `${merchant.name} coaching` : ""}
                aria-hidden={index !== galleryIndex}
                draggable={false}
              />
            ))}
          </div>
          <div className="coaching-detail__gallery-shade" aria-hidden="true" />
          <button
            type="button"
            className="coaching-detail__gallery-count"
            onClick={() =>
              setGalleryIndex(
                (current) => (current + 1) % detail.gallery.length,
              )
            }
            aria-label={`Show next photo, ${galleryIndex + 1} of ${detail.gallery.length}`}
          >
            {galleryIndex + 1} / {detail.gallery.length}
          </button>
        </section>

        <div className="coaching-detail__body">
          <section
            className="coaching-detail__identity"
            aria-labelledby="coaching-detail-name"
          >
            <h1 id="coaching-detail-name">{merchant.name}</h1>
            <p>
              {merchant.category} · {detail.area} · ${merchant.price}-
              {merchant.price + 20} per {merchant.unit}
            </p>
            <strong className={merchant.openNow ? "is-open" : ""}>
              {merchant.openNow ? "Open now" : "Closed now"} ·{" "}
              {merchant.openNow
                ? `closes ${detail.closingTime}`
                : "opens tomorrow"}
            </strong>
          </section>

          <section className="coaching-detail__actions" aria-label="Contact options">
            <a
              className="coaching-detail__whatsapp"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              <HugeiconsIcon
                icon={WhatsappIcon}
                size={18}
                strokeWidth={1.8}
                aria-hidden="true"
              />
              WhatsApp
            </a>
            <a
              className="coaching-detail__round-action"
              href={`tel:${phoneDigits}`}
              aria-label={`Call ${merchant.name}`}
            >
              <HugeiconsIcon
                icon={TelephoneIcon}
                size={18}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
            <a
              className="coaching-detail__round-action"
              href={`https://www.google.com/search?q=${encodeURIComponent(merchant.name)}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${merchant.name} website`}
            >
              <HugeiconsIcon
                icon={GlobeIcon}
                size={18}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
          </section>

          <section
            className="coaching-detail__section"
            aria-labelledby="coaching-detail-about"
          >
            <h2 id="coaching-detail-about">About {merchant.name}</h2>
            <p className={isExpanded ? "is-expanded" : undefined}>
              {detail.description}
            </p>
            <button
              type="button"
              onClick={() => setIsExpanded((expanded) => !expanded)}
            >
              {isExpanded ? "See less" : "See more"}
            </button>
          </section>

          <section
            className="coaching-detail__section coaching-detail__rates-section"
            aria-labelledby="coaching-detail-rates"
          >
            <h2 id="coaching-detail-rates">Classes &amp; rates</h2>
            <div className="coaching-detail__rates">
              {detail.rates.map((rate) => (
                <div key={rate.title}>
                  <span>
                    {rate.title} · {rate.duration}
                  </span>
                  <strong>{rate.price}</strong>
                </div>
              ))}
            </div>
          </section>

          <section
            className="coaching-detail__section"
            aria-labelledby="coaching-detail-timetable"
          >
            <h2 id="coaching-detail-timetable">Weekly timetable</h2>
            <div className="coaching-detail__timetable">
              {detail.timetable.map((day) => (
                <div className="coaching-detail__timetable-day" key={day.days}>
                  <span>{day.days}</span>
                  <div>
                    {day.sessions.map((session) => (
                      <p key={`${day.days}-${session.title}`}>
                        <strong>{session.title}</strong>
                        <time>{session.time}</time>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="coaching-detail__notice">
              Times are indicative. Message the coach to confirm a spot -
              booking is not handled here.
            </p>
          </section>

          <section
            className="coaching-detail__section coaching-detail__location-section"
            aria-labelledby="coaching-detail-location"
          >
            <h2 id="coaching-detail-location">Where they&apos;re based</h2>
            <div
              className="coaching-detail__map"
            >
              <iframe
                title={`Map for ${merchant.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(detail.address)}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <address>{detail.address}</address>
          </section>
        </div>
      </div>

      <footer className="coaching-detail__bottom-bar">
        <a href={whatsappHref} target="_blank" rel="noreferrer">
          <HugeiconsIcon
            icon={WhatsappIcon}
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
          />
          WhatsApp {merchant.name}
        </a>
      </footer>
    </main>
  )
}
