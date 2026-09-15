import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { useNavigate } from "react-router"
import aestheticClinicIcon from "../images/category-icons/aesthetic-clinic.png"
import basketballIcon from "../images/category-icons/basketball.png"
import beautyFacialIcon from "../images/category-icons/beauty-facial.png"
import dentistIcon from "../images/category-icons/dentist.png"
import enrichmentClassesIcon from "../images/category-icons/enrichment-classes.png"
import massageIcon from "../images/category-icons/massage.png"
import petGroomingIcon from "../images/category-icons/pet-grooming.png"
import ptIcon from "../images/category-icons/pt.png"
import schoolsIcon from "../images/category-icons/schools.png"
import soccerIcon from "../images/category-icons/soccer.png"
import swimmingIcon from "../images/category-icons/swimming.png"
import tennisIcon from "../images/category-icons/tennis.png"
import yogaIcon from "../images/category-icons/yoga.png"
import LifestyleServiceCards from "./LifestyleServiceCards"
import LifestyleVariantHeader from "./LifestyleVariantHeader"
import { lifestyleServices } from "./lifestyleServices"

const categoryItems: { label: string image: string }[] = [
  { label: "Swimming", image: swimmingIcon },
  { label: "PT", image: ptIcon },
  { label: "Tennis", image: tennisIcon },
  { label: "Yoga", image: yogaIcon },
  { label: "Basketball", image: basketballIcon },
  { label: "Soccer", image: soccerIcon },
  { label: "Enrichment classes", image: enrichmentClassesIcon },
  { label: "Schools", image: schoolsIcon },
  { label: "Pet grooming", image: petGroomingIcon },
  { label: "Beauty/facial", image: beautyFacialIcon },
  { label: "Aesthetic clinic", image: aestheticClinicIcon },
  { label: "Massage", image: massageIcon },
  { label: "Dentist", image: dentistIcon },
]

const heroSlides = [
  {
    title: "Move more, live better.",
    subtitle: "Find coaches, studios and services near you.",
    image:
      "https://images.unsplash.com/photo-1562271613-c3a4be2cc883?auto=format&fit=crop&w=1404&h=504&q=85",
  },
  {
    title: "Make time for yourself.",
    subtitle: "Wellness services for your everyday routine.",
    image:
      "https://images.unsplash.com/photo-1593811167565-4672e6c8ce4c?auto=format&fit=crop&w=1404&h=504&q=85",
  },
  {
    title: "Feel good, look your best.",
    subtitle: "Discover trusted wellness experts nearby.",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1404&h=504&q=85",
  },
]

const searchSuggestions = [
  "Swimming",
  "Yoga",
  "Facial treatment",
  "Personal training",
]
type DragPointer = { id: number startX: number startScroll: number }

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  )
}

interface StyleTwoHomePageProps {
  onBack?: () => void
  selectedStyle: string
  onStyleChange: (style: string) => void
  styleScale: number
  legacyBackup?: boolean
}

export default function StyleTwoHomePage({
  onBack,
  selectedStyle,
  onStyleChange,
  styleScale,
  legacyBackup = false,
}: StyleTwoHomePageProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [heroIndex, setHeroIndex] = useState(0)
  const [heroDrag, setHeroDrag] = useState(0)
  const [heroDragging, setHeroDragging] = useState(false)
  const [heroPaused, setHeroPaused] = useState(false)
  const [categoryDragging, setCategoryDragging] = useState(false)
  const [searchSuggestionIndex, setSearchSuggestionIndex] = useState(0)
  const [searchSuggestionVisible, setSearchSuggestionVisible] = useState(true)
  const heroPointer = useRef<{
    id: number
    startX: number
    width: number
  } | null>(null)
  const categoryPointer = useRef<DragPointer | null>(null)
  const normalizedQuery = query.trim().toLowerCase()

  useEffect(() => {
    let revealTimeout: number | undefined
    const interval = window.setInterval(() => {
      setSearchSuggestionVisible(false)
      revealTimeout = window.setTimeout(() => {
        setSearchSuggestionIndex(
          (current) => (current + 1) % searchSuggestions.length,
        )
        setSearchSuggestionVisible(true)
      }, 420)
    }, 3200)

    return () => {
      window.clearInterval(interval)
      if (revealTimeout !== undefined) window.clearTimeout(revealTimeout)
    }
  }, [])

  useEffect(() => {
    if (heroPaused) return
    const interval = window.setInterval(
      () => setHeroIndex((current) => (current + 1) % heroSlides.length),
      4200,
    )
    return () => window.clearInterval(interval)
  }, [heroPaused])

  const visibleCategories = useMemo(
    () =>
      categoryItems.filter(
        (item) =>
          !normalizedQuery ||
          item.label.toLowerCase().includes(normalizedQuery),
      ),
    [normalizedQuery],
  )
  const visibleMerchants = useMemo(
    () =>
      lifestyleServices.filter(
        (merchant) =>
          !normalizedQuery ||
          [
            merchant.name,
            merchant.provider,
            merchant.category,
            merchant.distance,
            merchant.offer,
            merchant.price,
          ].some((item) => item.toLowerCase().includes(normalizedQuery)),
      ),
    [normalizedQuery],
  )

  const finishHeroDrag = (event: ReactPointerEvent<HTMLElement>) => {
    const pointer = heroPointer.current
    if (!pointer || pointer.id !== event.pointerId) return
    const distance = event.clientX - pointer.startX
    if (Math.abs(distance) >= Math.min(54, pointer.width * 0.16)) {
      setHeroIndex((current) =>
        distance < 0
          ? (current + 1) % heroSlides.length
          : (current - 1 + heroSlides.length) % heroSlides.length,
      )
    }
    heroPointer.current = null
    setHeroDrag(0)
    setHeroDragging(false)
    setHeroPaused(false)
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  const finishScrollDrag = (
    event: ReactPointerEvent<HTMLDivElement>,
    pointerRef: MutableRefObject<DragPointer | null>,
    setDragging: (dragging: boolean) => void,
  ) => {
    const pointer = pointerRef.current
    if (!pointer || pointer.id !== event.pointerId) return
    pointerRef.current = null
    setDragging(false)
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  return (
    <div className="lifestyle-style-two">
      <LifestyleVariantHeader
        onBack={onBack}
        selectedStyle={selectedStyle}
        onStyleChange={onStyleChange}
        styleScale={styleScale}
      />

      <main className="lifestyle-style-two__main">
        <label className="lifestyle-style-two__search">
          <SearchIcon />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search lifestyle services"
            autoComplete="off"
          />
          {!query && (
            <span className="lifestyle-search-placeholder" aria-hidden="true">
              <span>Search&nbsp;</span>
              <span
                className={`lifestyle-search-term${
                  searchSuggestionVisible ? " is-visible" : ""
                }`}
              >{`\u201c${searchSuggestions[searchSuggestionIndex]}\u201d`}</span>
            </span>
          )}
          {query && (
            <button
              type="button"
              className="lifestyle-search-clear"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m7 7 10 10M17 7 7 17" />
              </svg>
            </button>
          )}
        </label>

        <section
          className="lifestyle-style-two__hero"
          aria-label="Featured lifestyle services"
          role="region"
          aria-roledescription="carousel"
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => {
            if (!heroPointer.current) setHeroPaused(false)
          }}
          onFocusCapture={() => setHeroPaused(true)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget as Node | null)
            ) {
              setHeroPaused(false)
            }
          }}
          onPointerDown={(event) => {
            if (event.button !== 0) return
            heroPointer.current = {
              id: event.pointerId,
              startX: event.clientX,
              width: event.currentTarget.clientWidth,
            }
            setHeroDragging(true)
            setHeroPaused(true)
            event.currentTarget.setPointerCapture?.(event.pointerId)
          }}
          onPointerMove={(event) => {
            const pointer = heroPointer.current
            if (!pointer || pointer.id !== event.pointerId) return
            setHeroDrag(
              Math.max(
                -pointer.width,
                Math.min(pointer.width, event.clientX - pointer.startX),
              ),
            )
          }}
          onPointerUp={finishHeroDrag}
          onPointerCancel={finishHeroDrag}
        >
          <div
            className={`lifestyle-style-two__hero-track${
              heroDragging ? " is-dragging" : ""
            }`}
            style={{
              transform: `translateX(calc(${-heroIndex * 100}% + ${heroDrag}px))`,
            }}
          >
            {heroSlides.map((slide, index) => (
              <article key={slide.title} aria-hidden={index !== heroIndex}>
                <img src={slide.image} alt="" draggable={false} />
                <div>
                  <strong>{slide.title}</strong>
                  <small>{slide.subtitle}</small>
                  <span>Explore lifestyle</span>
                </div>
              </article>
            ))}
          </div>
          <div
            className="lifestyle-style-two__hero-dots"
            aria-label="Choose banner"
          >
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                className={index === heroIndex ? "is-active" : ""}
                key={slide.title}
                onClick={() => setHeroIndex(index)}
                aria-label={`Show ${slide.title}`}
                aria-current={index === heroIndex ? "true" : undefined}
              />
            ))}
          </div>
        </section>

        <section
          className="lifestyle-style-two__section"
          aria-labelledby="lifestyle-style-two-categories"
        >
          <h1 id="lifestyle-style-two-categories">Categories</h1>
          <div
            className={`lifestyle-style-two__category-scroll${
              categoryDragging ? " is-dragging" : ""
            }`}
            onPointerDown={(event) => {
              if (event.button !== 0 || categoryPointer.current) return
              categoryPointer.current = {
                id: event.pointerId,
                startX: event.clientX,
                startScroll: event.currentTarget.scrollLeft,
              }
              setCategoryDragging(true)
              event.currentTarget.setPointerCapture?.(event.pointerId)
            }}
            onPointerMove={(event) => {
              const pointer = categoryPointer.current
              if (!pointer || pointer.id !== event.pointerId) return
              event.currentTarget.scrollLeft =
                pointer.startScroll - (event.clientX - pointer.startX)
            }}
            onPointerUp={(event) =>
              finishScrollDrag(event, categoryPointer, setCategoryDragging)
            }
            onPointerCancel={(event) =>
              finishScrollDrag(event, categoryPointer, setCategoryDragging)
            }
          >
            <div className="lifestyle-style-two__category-grid">
              {visibleCategories.map((category) => (
                <article
                  className="lifestyle-style-two__category"
                  key={category.label}
                  aria-label={`${category.label} category`}
                >
                  <img src={category.image} alt="" aria-hidden="true" />
                  <strong>{category.label}</strong>
                </article>
              ))}
              {visibleCategories.length === 0 && (
                <p className="lifestyle-style-two__empty">
                  No matching categories
                </p>
              )}
            </div>
          </div>
        </section>

        <section
          className="lifestyle-style-two__popular"
          aria-labelledby="lifestyle-style-two-popular"
        >
          <div className="lifestyle-style-two__heading">
            <h2 id="lifestyle-style-two-popular">
              {legacyBackup ? "Popular Merchants" : "Coaching & sports"}
            </h2>
            {legacyBackup ? (
              <span>View all &gt;</span>
            ) : (
              <button
                type="button"
                className="lifestyle-style-two__view-all"
                onClick={() => navigate("/coaching")}
              >
                View all &gt;
              </button>
            )}
          </div>
          <LifestyleServiceCards
            services={visibleMerchants}
            emptyMessage="No matching merchants"
            onlyDiscountBadge
          />
        </section>
      </main>
    </div>
  )
}
