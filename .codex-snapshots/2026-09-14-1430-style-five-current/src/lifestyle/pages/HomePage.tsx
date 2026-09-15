import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { useNavigate } from "react-router"
import LifeStyleScreen from "../imports/Container"
import StyleFiveHomePage from "./StyleFiveHomePage"
import StyleFourHomePage from "./StyleFourHomePage"
import StyleThreeHomePage from "./StyleThreeHomePage"
import StyleTwoHomePage from "./StyleTwoHomePage"
import StyleSwitcher from "./StyleSwitcher"

const ARTBOARD_WIDTH = 750
const ARTBOARD_HEIGHT = 2018

const sportsPhotos = [
  {
    label: "Swimming",
    alt: "Swimmer underwater in a pool",
    src: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=264&h=304&q=88",
  },
  {
    label: "PT",
    alt: "Personal training workout in an indoor gym",
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=264&h=304&q=88",
  },
  {
    label: "Tennis",
    alt: "Tennis player on court",
    src: "https://images.unsplash.com/photo-1758314810718-0d312d498210?auto=format&fit=crop&w=264&h=304&q=88",
  },
  {
    label: "Yoga",
    alt: "Yoga class practicing in an indoor studio",
    src: "https://images.unsplash.com/photo-1651077837628-52b3247550ae?auto=format&fit=crop&w=264&h=304&q=88",
  },
  {
    label: "Basketball",
    alt: "Basketball player reaching for the hoop",
    src: "https://images.unsplash.com/photo-1672332582733-9895c6d6428c?auto=format&fit=crop&w=264&h=304&q=88",
  },
  {
    label: "Soccer",
    alt: "Soccer player in action on a field",
    src: "https://images.unsplash.com/photo-1764239810824-00fa6f61dbbc?auto=format&fit=crop&w=264&h=304&q=88",
  },
]

const popularServices = [
  {
    name: "Swimming Lessons",
    provider: "AquaKids Swimming",
    type: "Coaching & sports",
    badge: "Featured",
    price: "$45 / session",
    alt: "Swimmer practicing in a bright pool",
    src: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=636&h=272&q=85",
    target: "swimming",
  },
  {
    name: "Facial Treatment",
    provider: "Glow Beauty Studio",
    type: "Beauty & wellness",
    badge: "20% OFF",
    price: "$68 / treatment",
    alt: "Woman receiving a professional facial treatment",
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=636&h=272&q=85",
    target: "",
  },
  {
    name: "Yoga Class",
    provider: "The Yoga Room",
    type: "Coaching & sports",
    badge: "Popular",
    price: "$25 / class",
    alt: "Yoga pose in a light-filled studio",
    src: "https://images.unsplash.com/photo-1593811167565-4672e6c8ce4c?auto=format&fit=crop&w=636&h=272&q=85",
    target: "",
  },
]

const bannerSlides = [
  {
    title: "Move more,\nlive better.",
    subtitle: "Find the best coaches,\nstudios & services near you.",
    image:
      "https://images.unsplash.com/photo-1562271613-c3a4be2cc883?auto=format&fit=crop&w=1404&h=504&q=85",
    alt: "Swimmer in bright blue water",
  },
  {
    title: "Make time\nfor yourself.",
    subtitle: "Wellness services that fit\nyour everyday routine.",
    image:
      "https://images.unsplash.com/photo-1593811167565-4672e6c8ce4c?auto=format&fit=crop&w=1404&h=504&q=85",
    alt: "Yoga class in a bright studio",
  },
  {
    title: "Feel good,\nlook your best.",
    subtitle: "Discover trusted local\nbeauty and wellness experts.",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1404&h=504&q=85",
    alt: "Facial treatment at a wellness studio",
  },
]

const searchSuggestions = [
  "Swimming",
  "Yoga",
  "Facial treatment",
  "Personal training",
]

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  )
}

type DragPointer = { id: number startX: number startScroll: number }

function DraggableScrollRow({
  className,
  children,
  ariaLabel,
}: {
  className: string
  children: React.ReactNode
  ariaLabel: string
}) {
  const pointerRef = useRef<DragPointer | null>(null)
  const suppressClick = useRef(false)
  const [dragging, setDragging] = useState(false)

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current
    if (!pointer || pointer.id !== event.pointerId) return
    suppressClick.current = Math.abs(event.clientX - pointer.startX) > 8
    pointerRef.current = null
    setDragging(false)
  }

  return (
    <div
      className={`${className}${dragging ? " is-dragging" : ""}`}
      role="region"
      aria-label={ariaLabel}
      onPointerDown={(event) => {
        if (event.button !== 0) return
        pointerRef.current = {
          id: event.pointerId,
          startX: event.clientX,
          startScroll: event.currentTarget.scrollLeft,
        }
        suppressClick.current = false
        setDragging(true)
      }}
      onPointerMove={(event) => {
        const pointer = pointerRef.current
        if (!pointer || pointer.id !== event.pointerId) return
        event.currentTarget.scrollLeft =
          pointer.startScroll - (event.clientX - pointer.startX)
      }}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      onClickCapture={(event) => {
        if (!suppressClick.current) return
        event.preventDefault()
        event.stopPropagation()
        suppressClick.current = false
      }}
    >
      {children}
    </div>
  )
}

function LifestyleSearchPage({
  query,
  setQuery,
  onClose,
}: {
  query: string
  setQuery: (value: string) => void
  onClose: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [suggestionIndex, setSuggestionIndex] = useState(0)
  const [suggestionVisible, setSuggestionVisible] = useState(true)
  const navigate = useNavigate()
  const normalizedQuery = query.trim().toLowerCase()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    let revealTimeout: number | undefined
    const interval = window.setInterval(() => {
      setSuggestionVisible(false)
      revealTimeout = window.setTimeout(() => {
        setSuggestionIndex(
          (current) => (current + 1) % searchSuggestions.length,
        )
        setSuggestionVisible(true)
      }, 420)
    }, 3200)
    return () => {
      window.clearInterval(interval)
      if (revealTimeout !== undefined) window.clearTimeout(revealTimeout)
    }
  }, [])

  const results = popularServices.filter((service) => {
    if (!normalizedQuery) return true
    return [service.name, service.provider, service.type].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    )
  })

  return (
    <div className="lifestyle-search-page">
      <header className="lifestyle-search-header">
        <div className="lifestyle-search-field">
          <span className="lifestyle-search-icon" aria-hidden="true">
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
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
                  suggestionVisible ? " is-visible" : ""
                }`}
              >{`\u201c${searchSuggestions[suggestionIndex]}\u201d`}</span>
            </span>
          )}
          {query && (
            <button
              type="button"
              className="lifestyle-search-clear"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        <button
          type="button"
          className="lifestyle-search-close"
          onClick={onClose}
          aria-label="Close search"
        >
          ×
        </button>
      </header>
      <main className="lifestyle-search-main">
        <div className="lifestyle-search-intro">
          <h1>
            {normalizedQuery
              ? `Results for “${query.trim()}”`
              : "Find a service"}
          </h1>
          <p>
            {normalizedQuery
              ? `${results.length} services available`
              : "Trusted coaches, studios and wellness experts"}
          </p>
        </div>
        {!normalizedQuery && (
          <div className="lifestyle-popular-searches">
            <span>Popular searches</span>
            <div>
              {searchSuggestions.slice(0, 3).map((term) => (
                <button type="button" key={term} onClick={() => setQuery(term)}>
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="lifestyle-search-results-heading">
          <h2>{normalizedQuery ? "Services" : "Popular services"}</h2>
          {normalizedQuery && <span>{results.length} matches</span>}
        </div>
        {results.length > 0 ? (
          <div className="lifestyle-search-grid">
            {results.map((service) => (
              <button
                type="button"
                className="lifestyle-search-card"
                key={service.name}
                onClick={() => service.target && navigate(`/${service.target}`)}
              >
                <img src={service.src} alt={service.alt} />
                <span className="lifestyle-search-card-body">
                  <strong>{service.name}</strong>
                  <small>{service.provider}</small>
                  <em>{service.price}</em>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="lifestyle-search-empty">
            <strong>No services found</strong>
            <span>Try a different service name or category.</span>
            <button type="button" onClick={() => setQuery("")}>
              Clear search
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

interface HomePageProps {
  onBack?: () => void
}

// The labels in the switcher are the source of truth. Component filenames
// reflect earlier explorations and intentionally do not define their order.
const stylePageByOption = {
  "Style 2": StyleTwoHomePage,
  "Style 3": StyleThreeHomePage,
  "Style 4": StyleFourHomePage,
  "Style 5": StyleFiveHomePage,
} as const

type VariantStyleOption = keyof typeof stylePageByOption

export default function HomePage({ onBack }: HomePageProps) {
  const navigate = useNavigate()
  const hostRef = useRef<HTMLDivElement>(null)
  const heroPointer = useRef<{
    id: number
    startX: number
    width: number
  } | null>(null)
  const suppressHeroClick = useRef(false)
  const [scale, setScale] = useState(1)
  const [query, setQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchSuggestionIndex, setSearchSuggestionIndex] = useState(0)
  const [searchSuggestionVisible, setSearchSuggestionVisible] = useState(true)
  const [heroIndex, setHeroIndex] = useState(0)
  const [heroDrag, setHeroDrag] = useState(0)
  const [heroPaused, setHeroPaused] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState("Style 5")

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

  useLayoutEffect(() => {
    if (!hostRef.current) return
    const updateScale = () => {
      const availableWidth = hostRef.current.clientWidth
      setScale(Math.min(availableWidth / ARTBOARD_WIDTH, 1))
    }
    updateScale()
    const observer = new ResizeObserver(updateScale)
    if (hostRef.current) observer.observe(hostRef.current)
    return () => observer.disconnect()
  }, [selectedStyle])

  useEffect(() => {
    if (heroPaused || isSearchOpen) return
    const interval = window.setInterval(
      () => setHeroIndex((current) => (current + 1) % bannerSlides.length),
      4200,
    )
    return () => window.clearInterval(interval)
  }, [heroPaused, isSearchOpen])

  useEffect(() => {
    if (isSearchOpen || selectedStyle !== "Style 2") return
    const row = document.querySelector<HTMLElement>(
      '[data-name="Main Content"] > [data-name="Section"]:nth-child(3) > [data-name="Container:margin"] > [data-name="Container"]',
    )
    if (!row) return

    let pointer: { id: number startX: number startScroll: number } | null = null
    let suppressClick = false
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      pointer = {
        id: event.pointerId,
        startX: event.clientX,
        startScroll: row.scrollLeft,
      }
      suppressClick = false
      row.classList.add("is-dragging")
      row.setPointerCapture?.(event.pointerId)
    }
    const onPointerMove = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return
      row.scrollLeft = pointer.startScroll - (event.clientX - pointer.startX)
    }
    const finishPointer = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return
      suppressClick = Math.abs(event.clientX - pointer.startX) > 8
      pointer = null
      row.classList.remove("is-dragging")
    }
    const onClickCapture = (event: MouseEvent) => {
      if (!suppressClick) return
      event.preventDefault()
      event.stopPropagation()
      suppressClick = false
    }

    row.addEventListener("pointerdown", onPointerDown)
    row.addEventListener("pointermove", onPointerMove)
    row.addEventListener("pointerup", finishPointer)
    row.addEventListener("pointercancel", finishPointer)
    row.addEventListener("click", onClickCapture, true)
    return () => {
      row.removeEventListener("pointerdown", onPointerDown)
      row.removeEventListener("pointermove", onPointerMove)
      row.removeEventListener("pointerup", finishPointer)
      row.removeEventListener("pointercancel", finishPointer)
      row.removeEventListener("click", onClickCapture, true)
    }
  }, [isSearchOpen, selectedStyle])

  const frameStyle = {
    "--screen-scale": scale,
    height: `${ARTBOARD_HEIGHT * scale}px`,
    width: `${ARTBOARD_WIDTH * scale}px`,
  } as CSSProperties

  const finishHeroDrag = (clientX: number) => {
    const pointer = heroPointer.current
    if (!pointer) return
    const distance = clientX - pointer.startX
    if (Math.abs(distance) >= Math.min(54, pointer.width * 0.16)) {
      setHeroIndex((current) =>
        distance < 0
          ? (current + 1) % bannerSlides.length
          : (current - 1 + bannerSlides.length) % bannerSlides.length,
      )
    }
    suppressHeroClick.current = Math.abs(distance) > 8
    heroPointer.current = null
    setHeroDrag(0)
    setHeroPaused(false)
  }

  const VariantPage = stylePageByOption[(selectedStyle as VariantStyleOption)]

  if (VariantPage) {
    return (
      <div ref={hostRef} className="figma-screen-host">
        <VariantPage
          onBack={onBack}
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
          styleScale={scale}
        />
      </div>
    )
  }

  if (isSearchOpen) {
    return (
      <div ref={hostRef} className="figma-screen-host">
        <LifestyleSearchPage
          query={query}
          setQuery={setQuery}
          onClose={() => {
            setQuery("")
            setIsSearchOpen(false)
          }}
        />
      </div>
    )
  }

  return (
    <div ref={hostRef} className="figma-screen-host">
      <main
        className="figma-screen"
        style={frameStyle}
        aria-label="Lifestyle services"
      >
        <div className="figma-screen__artboard" data-style={selectedStyle}>
          <LifeStyleScreen
            onEducationClick={() => navigate("/education")}
            onCoachingClick={() => navigate("/coaching")}
          />
          {onBack && (
            <button
              className="lifestyle-back-hit"
              onClick={onBack}
              aria-label="Back to resident home"
              type="button"
            />
          )}
          <StyleSwitcher value={selectedStyle} onChange={setSelectedStyle} />
          <label className="lifestyle-search-overlay">
            <span className="lifestyle-search-icon" aria-hidden="true">
              <SearchIcon />
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              aria-label="Search lifestyle services"
            />
            {!query && (
              <span
                className="lifestyle-search-overlay-placeholder"
                aria-hidden="true"
              >
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
                onClick={(event) => {
                  event.preventDefault()
                  setQuery("")
                }}
                aria-label="Clear search"
              >
                <svg viewBox="0 0 24 24">
                  <path d="m7 7 10 10M17 7 7 17" />
                </svg>
              </button>
            )}
          </label>

          <DraggableScrollRow
            className="lifestyle-sports-carousel"
            ariaLabel="Coaching and sports categories"
          >
            {sportsPhotos.map((photo, index) => (
              <button
                type="button"
                className="lifestyle-sports-card"
                key={photo.label}
                onClick={() => index === 0 && navigate("/swimming")}
              >
                <img src={photo.src} alt={photo.alt} draggable={false} />
                <span>{photo.label}</span>
              </button>
            ))}
          </DraggableScrollRow>

          <section
            className="lifestyle-banner-carousel"
            aria-label="Featured lifestyle services"
            onMouseEnter={() => setHeroPaused(true)}
            onMouseLeave={() => {
              if (!heroPointer.current) setHeroPaused(false)
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
              className={`lifestyle-banner-track${
                heroPointer.current ? " is-dragging" : ""
              }`}
              style={{
                transform: `translateX(calc(${-heroIndex * 100}% + ${heroDrag}px))`,
              }}
            >
              {bannerSlides.map((slide, index) => (
                <button
                  type="button"
                  className="lifestyle-banner-slide"
                  key={slide.title}
                  aria-label={`Open ${slide.title.replace("\n", " ")} services`}
                  aria-hidden={index !== heroIndex}
                  tabIndex={index === heroIndex ? 0 : -1}
                >
                  <img src={slide.image} alt={slide.alt} draggable={false} />
                  <span className="lifestyle-banner-copy">
                    <strong>
                      {slide.title.split("\n").map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </strong>
                    <small>
                      {slide.subtitle.split("\n").map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </small>
                    <span className="lifestyle-banner-button">
                      Explore now <b aria-hidden="true">›</b>
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div className="lifestyle-banner-dots" aria-label="Choose banner">
              {bannerSlides.map((slide, index) => (
                <button
                  type="button"
                  className={index === heroIndex ? "active" : ""}
                  key={slide.title}
                  onClick={() => setHeroIndex(index)}
                  aria-label={`Show ${slide.title.replace("\n", " ")}`}
                  aria-current={index === heroIndex ? "true" : undefined}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
