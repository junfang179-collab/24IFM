import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useDeferredValue,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Notification01Icon,
  UserShield01Icon,
} from "@hugeicons/core-free-icons"
import ResidentBottomNav from "../components/ResidentBottomNav"
import bannerAirconHomeStyle from "../imports/Services/banner-aircon-interior-home-style.jpg"
import bannerPaintingHomeStyle from "../imports/Services/banner-painting-home-style.jpg"
import bannerPestHomeStyle from "../imports/Services/banner-pest-home-style.jpg"
import cleaningIcon from "../imports/Services/category-icons/7a54268e9fb9c719e8dafeeba545472e6da9b489.png"
import pestIcon from "../imports/Services/category-icons/7d03e380dc99805671525a47408d2a4ed123e13c.png"
import plumbingIcon from "../imports/Services/category-icons/b6a7653b7242e6a39eb43b197ffe1cf077fca178.png"
import electricalIcon from "../imports/Services/category-icons/205fe3a31a04fbea62bbdbf39749b28f33a86ee8.png"
import airconIcon from "../imports/Services/category-icons/5ab869393b02a241c392bb4e3c502e3af5d9b13a.png"
import handymanIcon from "../imports/Services/category-icons/0e3e7f627044a731c2ad5dc2382d6e979e18c10c.png"
import paintingIcon from "../imports/Services/category-icons/cfc72d1884e80d4268cba16cb1875d9e616165b0.png"
import landscapeIcon from "../imports/Services/category-icons/e5e8403b7696687739d99633c8775b14f69f992b.png"
import movingIcon from "../imports/Services/category-icons/535105fadd171bb1939717349052bd7ae8cc7dfc.png"
import supportIcon from "../imports/Services/category-icons/2c2dda32b55f3274df64374d499061e95bfb76f1.png"
import cleaningPhoto from "../imports/Services/d5fe1e57e8424a711a8962d261475a2f8ec13448.png"
import pestPhoto from "../imports/Services/ae46bab4a35600cf94747f7f013659abed2764b9.png"
import plumbingPhoto from "../imports/Services/popular-plumbing-photo.jpg"
import airconPhoto from "../imports/Services/bf861330172dbe2f069f7921fbad870702e63b0d.png"
import handymanPhoto from "../imports/Services/handyman-photo.jpg"
import laundryPhoto from "../imports/Services/laundry-photo.jpg"
import "./services-page.css"

export type ServiceTarget = "cleaning" | "pest" | "plumbing" | "electrical" | "handyman" | "painting" | "landscaping" | "moving" | "aircon" | "support"

export interface ServicesAppProps {
  onBack?: () => void
  onHome?: () => void
  onSelectCleaning?: () => void
  onSelectPest?: () => void
  onSelectPlumbing?: () => void
  onSelectElectrical?: () => void
  onSelectHandyman?: () => void
  onSelectPainting?: () => void
  onSelectLandscaping?: () => void
  onSelectMoving?: () => void
  onSelectAircon?: () => void
  onSelectSupportService?: () => void
  onBookCleaning?: () => void
  onBookPest?: () => void
  onBookPlumbing?: () => void
  onOpenBookings?: () => void
  onOpenSupport?: () => void
}

interface Category {
  label: string
  image: string
  target: ServiceTarget
}

interface PopularService {
  name: string
  image: string
  price: string
  tags: string[]
  target: ServiceTarget
}

interface HeroSlide {
  title: string
  subtitle: string
  image: string
  target: ServiceTarget
}

const heroSlides: HeroSlide[] = [
  {
    title: "Pest Control",
    subtitle: "Fixed Prices. Trusted Pros.",
    image: bannerPestHomeStyle,
    target: "pest",
  },
  {
    title: "Aircon Service",
    subtitle: "Stay cool, all year round.",
    image: bannerAirconHomeStyle,
    target: "aircon",
  },
  {
    title: "Fresh New Colour",
    subtitle: "Professional painting made easy.",
    image: bannerPaintingHomeStyle,
    target: "painting",
  },
]

const categories: Category[] = [
  { label: "Cleaning", image: cleaningIcon, target: "cleaning" },
  { label: "Handyman", image: handymanIcon, target: "handyman" },
  { label: "Pest", image: pestIcon, target: "pest" },
  { label: "Painting", image: paintingIcon, target: "painting" },
  { label: "Plumbing", image: plumbingIcon, target: "plumbing" },
  { label: "Landscape", image: landscapeIcon, target: "landscaping" },
  { label: "Electrical", image: electricalIcon, target: "electrical" },
  { label: "Moving", image: movingIcon, target: "moving" },
  { label: "Aircon", image: airconIcon, target: "aircon" },
  { label: "Support", image: supportIcon, target: "support" },
]

const popularServices: PopularService[] = [
  {
    name: "House Cleaning",
    image: cleaningPhoto,
    price: "$120",
    tags: ["Studio / 1-Bedroom", "2-Bedroom"],
    target: "cleaning",
  },
  {
    name: "Mosquito Treatment",
    image: pestPhoto,
    price: "$120",
    tags: ["Apartment", "Condo common area", "Small landed"],
    target: "pest",
  },
  {
    name: "Plumbing Repair",
    image: plumbingPhoto,
    price: "$45",
    tags: ["Tap & sink", "Fixed price"],
    target: "plumbing",
  },
]

const searchCatalog: PopularService[] = [
  ...popularServices,
  {
    name: "Aircon Service",
    image: airconPhoto,
    price: "$45",
    tags: ["Split unit", "Cleaning"],
    target: "aircon",
  },
  {
    name: "Handyman Help",
    image: handymanPhoto,
    price: "$30",
    tags: ["Repairs", "Assembly"],
    target: "handyman",
  },
  {
    name: "Laundry Service",
    image: laundryPhoto,
    price: "$15",
    tags: ["Wash & fold", "Pickup"],
    target: "support",
  },
]

const searchSuggestions = popularServices.map((service) => service.name)

function actionFor(target: ServiceTarget, props: ServicesAppProps) {
  const actions: Record<ServiceTarget, (() => void) | undefined> = {
    cleaning: props.onSelectCleaning,
    pest: props.onSelectPest,
    plumbing: props.onSelectPlumbing,
    electrical: props.onSelectElectrical,
    handyman: props.onSelectHandyman,
    painting: props.onSelectPainting,
    landscaping: props.onSelectLandscaping,
    moving: props.onSelectMoving,
    aircon: props.onSelectAircon,
    support: props.onSelectSupportService,
  }
  return actions[target]
}

function popularActionFor(target: ServiceTarget, props: ServicesAppProps) {
  const actions: Record<ServiceTarget, (() => void) | undefined> = {
    cleaning: props.onBookCleaning ?? props.onSelectCleaning,
    pest: props.onBookPest ?? props.onSelectPest,
    plumbing: props.onBookPlumbing ?? props.onSelectPlumbing,
    electrical: props.onSelectElectrical,
    handyman: props.onSelectHandyman,
    painting: props.onSelectPainting,
    landscaping: props.onSelectLandscaping,
    moving: props.onSelectMoving,
    aircon: props.onSelectAircon,
    support: props.onSelectSupportService,
  }
  return actions[target]
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  )
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m7 7 10 10M17 7 7 17" />
    </svg>
  )
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <HugeiconsIcon
      icon={Notification01Icon}
      size={20}
      color="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    />
  )
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 10.5c0 4.5-7 10-7 10s-7-5.5-7-10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10.5" r="2.25" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function VerifiedIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 4 38 10v11c0 10-5.7 17.2-14 23-8.3-5.8-14-13-14-23V10l14-6Z" />
      <path className="accent" d="m17 24 5 5 10-11" />
    </svg>
  )
}

function TransparentIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M5 25s7-11 19-11 19 11 19 11-7 11-19 11S5 25 5 25Z" />
      <circle className="accent" cx="24" cy="25" r="5" />
      <path d="M24 8V3M10 12 7 8M38 12l3-4" />
    </svg>
  )
}

function ProtectionIcon() {
  return (
    <HugeiconsIcon
      icon={UserShield01Icon}
      size={20}
      color="currentColor"
      strokeWidth={0.85}
      className="rep-services__protection-icon"
      aria-hidden="true"
    />
  )
}

function ServiceCard({
  service,
  onBook,
  className = "",
}: {
  service: PopularService
  onBook?: () => void
  className?: string
}) {
  return (
    <article
      className={`rep-services__service-card${
        className ? ` ${className}` : ""
      }`}
    >
      <img src={service.image} alt={service.name} />
      <div className="rep-services__service-body">
        <h3>{service.name}</h3>
        <div className="rep-services__tags">
          {service.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <p>
          From <strong>{service.price}</strong>/visit
        </p>
        <button type="button" onClick={onBook} disabled={!onBook}>
          Book Now
        </button>
      </div>
    </article>
  )
}

export default function ServicesPage(props: ServicesAppProps = {}) {
  const [query, setQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchSuggestionIndex, setSearchSuggestionIndex] = useState(0)
  const [searchSuggestionVisible, setSearchSuggestionVisible] = useState(true)
  const [heroIndex, setHeroIndex] = useState(0)
  const [heroDrag, setHeroDrag] = useState(0)
  const [heroPaused, setHeroPaused] = useState(false)
  const [categoryDragging, setCategoryDragging] = useState(false)
  const [popularDragging, setPopularDragging] = useState(false)
  const categoryScrollRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const heroPointer = useRef<{
    id: number
    startX: number
    width: number
  } | null>(null)
  const suppressHeroClick = useRef(false)
  const categoryPointer = useRef<{
    id: number
    startX: number
    startScroll: number
  } | null>(null)
  const suppressCategoryClick = useRef(false)
  const popularPointer = useRef<{
    id: number
    startX: number
    startScroll: number
  } | null>(null)
  const suppressPopularClick = useRef(false)
  const deferredQuery = useDeferredValue(query)
  const normalizedQuery = deferredQuery.trim().toLowerCase()

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
    if (isSearchOpen) searchInputRef.current?.focus()
  }, [isSearchOpen])

  useEffect(() => {
    if (heroPaused || isSearchOpen) return

    const interval = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length)
    }, 4000)

    return () => window.clearInterval(interval)
  }, [heroPaused, isSearchOpen])

  const finishHeroDrag = (clientX: number) => {
    const pointer = heroPointer.current
    if (!pointer) return

    const distance = clientX - pointer.startX
    const threshold = Math.min(54, pointer.width * 0.16)
    if (Math.abs(distance) >= threshold) {
      setHeroIndex((current) =>
        distance < 0
          ? (current + 1) % heroSlides.length
          : (current - 1 + heroSlides.length) % heroSlides.length,
      )
    }

    suppressHeroClick.current = Math.abs(distance) > 8
    heroPointer.current = null
    setHeroDrag(0)
    setHeroPaused(false)
  }

  const finishCategoryDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = categoryPointer.current
    if (!pointer || pointer.id !== event.pointerId) return

    const distance = event.clientX - pointer.startX
    suppressCategoryClick.current = Math.abs(distance) > 8
    categoryPointer.current = null
    setCategoryDragging(false)
  }

  const finishPopularDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = popularPointer.current
    if (!pointer || pointer.id !== event.pointerId) return

    const distance = event.clientX - pointer.startX
    suppressPopularClick.current = Math.abs(distance) > 8
    popularPointer.current = null
    setPopularDragging(false)
  }

  const visibleCategories = useMemo(
    () =>
      normalizedQuery
        ? categories.filter((category) =>
            category.label.toLowerCase().includes(normalizedQuery),
          )
        : categories,
    [normalizedQuery],
  )

  const visibleServices = useMemo(
    () =>
      normalizedQuery
        ? popularServices.filter(
            (service) =>
              service.name.toLowerCase().includes(normalizedQuery) ||
              service.target.includes(normalizedQuery) ||
              service.tags.some((tag) =>
                tag.toLowerCase().includes(normalizedQuery),
              ),
          )
        : popularServices,
    [normalizedQuery],
  )

  const homeAction = props.onHome ?? props.onBack
  const closeSearch = () => {
    setQuery("")
    setIsSearchOpen(false)
  }

  if (isSearchOpen) {
    const searchResults = searchCatalog.filter(
      (service) =>
        !normalizedQuery ||
        service.name.toLowerCase().includes(normalizedQuery) ||
        service.target.includes(normalizedQuery) ||
        service.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)),
    )
    const hasQuery = Boolean(query.trim())
    const popularSearches = [
      "House Cleaning",
      "Mosquito Treatment",
      "Plumbing Repair",
    ]

    return (
      <div className="rep-services rep-services--search">
        <header className="rep-services__search-header">
          <div className="rep-services__search-field">
            <SearchIcon />
            <input
              ref={searchInputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search services"
              autoComplete="off"
            />
            {!query && (
              <span
                className="rep-services__search-placeholder"
                aria-hidden="true"
              >
                <span>Search&nbsp;</span>
                <span
                  className={`rep-services__search-term${
                    searchSuggestionVisible ? " is-visible" : ""
                  }`}
                >
                  {`\u201c${searchSuggestions[searchSuggestionIndex]}\u201d`}
                </span>
              </span>
            )}
            {query && (
              <button
                type="button"
                className="rep-services__search-clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <ClearIcon />
              </button>
            )}
          </div>
          <button
            type="button"
            className="rep-services__search-close"
            onClick={closeSearch}
            aria-label="Close search"
          >
            <ClearIcon />
          </button>
        </header>

        <main className="rep-services__search-main">
          <div className="rep-services__search-intro">
            <div>
              <h1>
                {hasQuery ? `Results for “${query.trim()}”` : "Find a service"}
              </h1>
              <p>
                {hasQuery
                  ? `${searchResults.length} service${
                      searchResults.length === 1 ? "" : "s"
                    } available`
                  : "Trusted help for your home"}
              </p>
            </div>
          </div>

          {!hasQuery && (
            <div className="rep-services__popular-searches">
              <span>Popular searches</span>
              <div>
                {popularSearches.map((term) => (
                  <button
                    type="button"
                    key={term}
                    onClick={() => setQuery(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          <section aria-labelledby="search-results-title">
            <div className="rep-services__search-results-heading">
              <h2 id="search-results-title">
                {hasQuery ? "Services" : "Popular Services"}
              </h2>
              {hasQuery && searchResults.length > 0 && (
                <span>{searchResults.length} matches</span>
              )}
            </div>

            {searchResults.length > 0 ? (
              <div className="rep-services__search-grid">
                {searchResults.map((service) => (
                  <ServiceCard
                    key={service.name}
                    service={service}
                    className="rep-services__service-card--grid"
                    onBook={popularActionFor(service.target, props)}
                  />
                ))}
              </div>
            ) : (
              <div className="rep-services__search-empty">
                <strong>No services found</strong>
                <span>Try a different service name or category.</span>
                <button type="button" onClick={() => setQuery("")}>
                  Clear search
                </button>
              </div>
            )}
          </section>
        </main>

      </div>
    )
  }

  return (
    <div className="rep-services">
      <header className="rep-services__header">
        <button
          type="button"
          className="rep-services__back"
          onClick={props.onBack}
          aria-label="Back to resident home"
        >
          <BackIcon />
        </button>
        <button
          type="button"
          className="rep-services__messages"
          aria-label="Messages"
        >
          <MessageIcon />
          <span
            className="rep-services__message-badge"
            aria-label="99 unread messages"
          >
            99
          </span>
        </button>
        <div className="rep-services__greeting" aria-label="Resident location">
          <LocationIcon />
          <div className="rep-services__greeting-copy">
            <div className="rep-services__location-line">
              <strong>Unit #12-03 . Charleston</strong>
              <ChevronDownIcon />
            </div>
            <span>Delivering to your location</span>
          </div>
        </div>
      </header>

      <main className="rep-services__main">
        <label className="rep-services__search">
          <SearchIcon />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            aria-label="Search services"
          />
          {!query && (
            <span
              className="rep-services__search-placeholder"
              aria-hidden="true"
            >
              <span>Search&nbsp;</span>
              <span
                className={`rep-services__search-term${
                  searchSuggestionVisible ? " is-visible" : ""
                }`}
              >
                {`\u201c${searchSuggestions[searchSuggestionIndex]}\u201d`}
              </span>
            </span>
          )}
        </label>

        <div
          className="rep-services__hero"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured services"
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => {
            if (!heroPointer.current) setHeroPaused(false)
          }}
          onFocusCapture={() => setHeroPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
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
            suppressHeroClick.current = false
            setHeroPaused(true)
            if (event.nativeEvent.isTrusted) {
              event.currentTarget.setPointerCapture(event.pointerId)
            }
          }}
          onPointerMove={(event) => {
            const pointer = heroPointer.current
            if (!pointer || pointer.id !== event.pointerId) return
            const distance = event.clientX - pointer.startX
            setHeroDrag(
              Math.max(-pointer.width, Math.min(pointer.width, distance)),
            )
          }}
          onPointerUp={(event) => finishHeroDrag(event.clientX)}
          onPointerCancel={(event) => finishHeroDrag(event.clientX)}
          onClickCapture={(event) => {
            if (!suppressHeroClick.current) return
            event.preventDefault()
            event.stopPropagation()
            suppressHeroClick.current = false
          }}
        >
          <div
            className={`rep-services__hero-track${
              heroPointer.current ? " is-dragging" : ""
            }`}
            style={{
              transform: `translateX(calc(${-heroIndex * 100}% + ${heroDrag}px))`,
            }}
          >
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                className="rep-services__hero-slide"
                key={slide.title}
                onClick={actionFor(slide.target, props)}
                aria-label={`Open ${slide.title} services`}
                aria-hidden={index !== heroIndex}
                tabIndex={index === heroIndex ? 0 : -1}
              >
                <img src={slide.image} alt="" draggable={false} />
                <span className="rep-services__hero-copy">
                  <strong>{slide.title}</strong>
                  <small>{slide.subtitle}</small>
                  <span className="rep-services__hero-cta">
                    Book now <span aria-hidden="true">&rarr;</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
          <div className="rep-services__hero-dots" aria-label="Choose banner">
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                className={index === heroIndex ? "active" : ""}
                key={slide.title}
                onClick={() => setHeroIndex(index)}
                aria-label={`Show ${slide.title}`}
                aria-current={index === heroIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>

        <section
          className="rep-services__section"
          aria-labelledby="services-categories"
        >
          <h2 id="services-categories">Categories</h2>
          <div
            ref={categoryScrollRef}
            className={`rep-services__category-scroll${
              categoryDragging ? " is-dragging" : ""
            }`}
            onPointerDown={(event) => {
              if (event.button !== 0) return
              categoryPointer.current = {
                id: event.pointerId,
                startX: event.clientX,
                startScroll: event.currentTarget.scrollLeft,
              }
              suppressCategoryClick.current = false
              setCategoryDragging(true)
            }}
            onPointerMove={(event) => {
              const pointer = categoryPointer.current
              if (!pointer || pointer.id !== event.pointerId) return
              const distance = event.clientX - pointer.startX
              event.currentTarget.scrollLeft = pointer.startScroll - distance
            }}
            onPointerUp={finishCategoryDrag}
            onPointerCancel={finishCategoryDrag}
            onClickCapture={(event) => {
              if (!suppressCategoryClick.current) return
              event.preventDefault()
              event.stopPropagation()
              suppressCategoryClick.current = false
            }}
          >
            <div className="rep-services__category-grid">
              {visibleCategories.map((category) => {
                const isClickable =
                  category.target === "cleaning" ||
                  category.target === "pest" ||
                  category.target === "plumbing"
                const action = actionFor(category.target, props)

                return (
                  <button
                    type="button"
                    className={`rep-services__category${
                      isClickable ? "" : " rep-services__category--disabled"
                    }`}
                    key={category.target}
                    onClick={isClickable ? action : undefined}
                  >
                    <img src={category.image} alt="" />
                    <span>{category.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <section
          className="rep-services__popular"
          aria-labelledby="popular-services"
        >
          <div className="rep-services__section-heading">
            <h2 id="popular-services">Popular Services</h2>
            <span>View all &gt;</span>
          </div>
          <div
            className={`rep-services__popular-scroll${
              popularDragging ? " is-dragging" : ""
            }`}
            onPointerDown={(event) => {
              if (event.pointerType === "touch" || event.button !== 0) return
              popularPointer.current = {
                id: event.pointerId,
                startX: event.clientX,
                startScroll: event.currentTarget.scrollLeft,
              }
              suppressPopularClick.current = false
              setPopularDragging(true)
            }}
            onPointerMove={(event) => {
              const pointer = popularPointer.current
              if (!pointer || pointer.id !== event.pointerId) return
              const distance = event.clientX - pointer.startX
              event.currentTarget.scrollLeft = pointer.startScroll - distance
            }}
            onPointerUp={finishPopularDrag}
            onPointerCancel={finishPopularDrag}
            onClickCapture={(event) => {
              if (!suppressPopularClick.current) return
              event.preventDefault()
              event.stopPropagation()
              suppressPopularClick.current = false
            }}
          >
            {visibleServices.map((service) => (
              <ServiceCard
                key={service.name}
                service={service}
                onBook={popularActionFor(service.target, props)}
              />
            ))}
            {visibleServices.length === 0 && (
              <p className="rep-services__empty">No matching services</p>
            )}
          </div>
        </section>

        <section
          className="rep-services__trust"
          aria-label="Service guarantees"
        >
          <div>
            <VerifiedIcon />
            <span>
              Verified
              <br />
              Professionals
            </span>
          </div>
          <div>
            <TransparentIcon />
            <span>
              Transparent
              <br />
              Pricing
            </span>
          </div>
          <div>
            <ProtectionIcon />
            <span>
              Buyer
              <br />
              Protection
            </span>
          </div>
        </section>
      </main>

      <ResidentBottomNav
        active="home"
        onHome={homeAction}
        onBookings={props.onOpenBookings}
        onSupport={props.onOpenSupport}
      />
    </div>
  )
}
