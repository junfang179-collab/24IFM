import "./style-five.css"
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react"
import beautyFacialIcon from "../images/category-icons/beauty-facial.png"

import dentistIcon from "../images/category-icons/dentist.png"
import petGroomingIcon from "../images/category-icons/pet-grooming.png"
import schoolsIcon from "../images/category-icons/schools.png"
import swimmingIcon from "../images/category-icons/swimming.png"
import { styleOneMerchantSections } from "./StyleFourHomePage"
import StyleFiveMerchantCards from "./StyleFiveMerchantCards"
import LifestyleVariantHeader from "./LifestyleVariantHeader"
import type { LifestyleService } from "./lifestyleServices"

const categoryItems: {
  label: string
  image: string
  isComingSoon?: boolean
}[] = [
  {
    label: "Coaching",
    image: swimmingIcon,
  },
  { label: "Education", image: schoolsIcon },
  {
    label: "Beauty",
    image: beautyFacialIcon,
  },
  { label: "Health", image: dentistIcon },
  { label: "Pet care", image: petGroomingIcon },
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

const merchantSections: { title: string services: LifestyleService[] }[] = [
  {
    title: "Featured this month",
    services: [
      {
        name: "AquaStart Coaching",
        provider: "Kids & adults",
        category: "Swimming",
        distance: "On-site",
        offer: "Vetted · 8 yrs · SwimSafe",
        price: "From $45 / session",
        description: "Private and group swimming coaching.",
        image:
          "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=520&h=330&q=88",
        badge: "Swimming",
        likes: 482,
        clicks: 1180,
        distanceKm: 1.2,
      },
      {
        name: "Knead at Home",
        provider: "60 / 90 min sessions",
        category: "Massage",
        distance: "Home visit",
        offer: "Vetted · Certified therapists",
        price: "From $78 / session",
        description: "Certified massage therapy at home.",
        image:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=520&h=330&q=88",
        badge: "Massage",
        likes: 268,
        clicks: 702,
        distanceKm: 1.6,
      },
      {
        name: "Baseline Tennis Club",
        provider: "Weekend coaching groups",
        category: "Tennis",
        distance: "On-site",
        offer: "Vetted · Coach-led",
        price: "From $38 / class",
        description: "Coaching for beginners and improvers.",
        image:
          "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "Tennis",
        likes: 194,
        clicks: 538,
        distanceKm: 2.4,
      },
      {
        name: "The Yoga Room",
        provider: "Small group yoga classes",
        category: "Yoga",
        distance: "On-site",
        offer: "Vetted · 5 yrs",
        price: "From $25 / class",
        description: "A welcoming practice for a stronger daily routine.",
        image:
          "https://images.unsplash.com/photo-1593811167565-4672e6c8ce4c?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "Yoga",
        likes: 321,
        clicks: 764,
        distanceKm: 2.1,
      },
      {
        name: "HoopLab Academy",
        provider: "HoopLab Sports Academy",
        category: "Basketball · Youth training",
        distance: "1.9 km away",
        offer: "Open slots · Weekday evenings",
        price: "From $30 / class",
        description: "Skill-based basketball groups for kids.",
        image:
          "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "Open slots",
        likes: 226,
        clicks: 611,
        distanceKm: 1.9,
      },
      {
        name: "Kickoff Football School",
        provider: "Kickoff Football Academy",
        category: "Soccer · Junior coaching",
        distance: "2.8 km away",
        offer: "New term · Ages 5 to 12",
        price: "From $32 / class",
        description: "Positive, small-group football coaching.",
        image:
          "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "New term",
        likes: 207,
        clicks: 594,
        distanceKm: 2.8,
      },
    ],
  },
  {
    title: "New partners",
    services: [
      {
        name: "Paws & Polish",
        provider: "Mobile grooming van",
        category: "Grooming",
        distance: "Home visit",
        offer: "Vetted · 3 yrs",
        price: "From $48 / visit",
        description: "Gentle pet grooming at your doorstep.",
        image:
          "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=520&h=330&q=88",
        badge: "Grooming",
        likes: 280,
        clicks: 980,
        distanceKm: 0.8,
      },
      {
        name: "SmileWorks Dental",
        provider: "Family dentistry",
        category: "Dentist",
        distance: "Their venue",
        offer: "Vetted · SDC-registered",
        price: "From $80 / visit",
        description: "Friendly dental care for the whole family.",
        image:
          "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=520&h=330&q=88",
        badge: "Dentist",
        likes: 236,
        clicks: 830,
        distanceKm: 1.5,
      },
      {
        name: "CodeCraft Junior Lab",
        provider: "Coding & robotics classes",
        category: "Coding",
        distance: "Their venue",
        offer: "Vetted · Weekend lab",
        price: "From $42 / class",
        description:
          "Hands-on coding projects that turn ideas into working creations.",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "Coding",
        likes: 312,
        clicks: 756,
        distanceKm: 2.0,
      },
      {
        name: "Little Steps Music",
        provider: "Early music classes",
        category: "Music",
        distance: "Their venue",
        offer: "Vetted · Trial class",
        price: "From $35 / class",
        description: "Creative music sessions for young learners.",
        image:
          "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=520&h=330&q=88",
        badge: "Music",
        likes: 241,
        clicks: 698,
        distanceKm: 1.7,
      },
    ],
  },
  {
    title: "Popular merchants",
    services: [
      {
        name: "Paws & Bubbles",
        provider: "Pet grooming studio",
        category: "Grooming",
        distance: "Their venue",
        offer: "Vetted · 4 yrs",
        price: "From $48 / visit",
        description: "Gentle grooming with pick-up options.",
        image:
          "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "Grooming",
        likes: 349,
        clicks: 946,
        distanceKm: 1.1,
      },
      {
        name: "The Cat Parlour",
        provider: "Cat specialist grooming",
        category: "Cat care",
        distance: "Their venue",
        offer: "Vetted · Gentle care",
        price: "From $52 / visit",
        description:
          "Quiet, patient grooming designed around your cat's comfort.",
        image:
          "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "Cat care",
        likes: 284,
        clicks: 691,
        distanceKm: 2.2,
      },
      {
        name: "Wag & Go Mobile Grooming",
        provider: "Mobile grooming van",
        category: "Grooming",
        distance: "Home visit",
        offer: "Vetted · Doorstep care",
        price: "From $60 / visit",
        description:
          "Professional pet grooming brought right to your doorstep.",
        image:
          "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "Grooming",
        likes: 327,
        clicks: 814,
        distanceKm: 1.7,
      },
      {
        name: "Glow Beauty Studio",
        provider: "Facial & wellness care",
        category: "Beauty",
        distance: "Their venue",
        offer: "Vetted · Skin specialists",
        price: "From $68 / treatment",
        description: "Restorative treatments in a quiet studio.",
        image:
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=520&h=330&q=88",
        badge: "Beauty",
        likes: 356,
        clicks: 890,
        distanceKm: 1.8,
      },
    ],
  },
  {
    title: "Education",
    services: [
      {
        name: "BrightMinds Tutoring",
        provider: "BrightMinds Academy",
        category: "Enrichment classes · Math & science",
        distance: "0.8 km away",
        offer: "New · Small group tutoring",
        price: "From $55 / lesson",
        description: "Supportive learning plans for curious young minds.",
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "$80 OFF",
        likes: 280,
        clicks: 980,
        distanceKm: 0.8,
      },
      {
        name: "Little Scholars School",
        provider: "Little Scholars Preschool",
        category: "Schools · Early learning",
        distance: "1.5 km away",
        offer: "Open house · This Saturday",
        price: "From $680 / month",
        description: "Playful, structured learning for growing minds.",
        image:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "Open house",
        likes: 264,
        clicks: 742,
        distanceKm: 1.5,
      },
      {
        name: "CodeCraft Junior Lab",
        provider: "CodeCraft Learning Studio",
        category: "Enrichment classes · Coding & robotics",
        distance: "2.0 km away",
        offer: "Weekend lab · Ages 7 to 12",
        price: "From $42 / class",
        description:
          "Hands-on coding projects that turn ideas into working creations.",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "Weekend lab",
        likes: 312,
        clicks: 756,
        distanceKm: 2.0,
      },
    ],
  },
  {
    title: "Beauty",
    services: [
      {
        name: "Glow Beauty Studio",
        provider: "Glow Beauty & Wellness",
        category: "Beauty/facial · Wellness care",
        distance: "1.8 km away",
        offer: "20% OFF · First treatment",
        price: "From $68 / treatment",
        description: "Restorative facial treatments in a quiet studio.",
        image:
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "20% OFF",
        likes: 356,
        clicks: 890,
        distanceKm: 1.8,
      },
      {
        name: "Lumiere Aesthetic Clinic",
        provider: "Lumiere Medical Aesthetics",
        category: "Aesthetic clinic · Skin care",
        distance: "2.3 km away",
        offer: "Consultation · Complimentary",
        price: "From $120 / visit",
        description: "Doctor-led care tailored to your skin.",
        image:
          "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "Consultation",
        likes: 297,
        clicks: 755,
        distanceKm: 2.3,
      },
      {
        name: "Calm Body Massage",
        provider: "Calm Body Wellness",
        category: "Massage · Relaxation therapy",
        distance: "0.9 km away",
        offer: "Weekday special · 60 min",
        price: "From $72 / session",
        description: "Restorative massage in a calm setting.",
        image:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "Weekday special",
        likes: 315,
        clicks: 808,
        distanceKm: 0.9,
      },
    ],
  },
  {
    title: "Health",
    services: [
      {
        name: "BrightSmile Dental",
        provider: "BrightSmile Family Dental",
        category: "Dentist · Family dental care",
        distance: "1.4 km away",
        offer: "New patient · Check-up package",
        price: "From $80 / visit",
        description: "Friendly preventive dental care for families.",
        image:
          "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "New patient",
        likes: 261,
        clicks: 689,
        distanceKm: 1.4,
      },
      {
        name: "Orchard Dental Studio",
        provider: "Orchard Dental Studio",
        category: "Dentist · Hygiene & whitening",
        distance: "2.1 km away",
        offer: "Smile refresh · Hygiene package",
        price: "From $95 / visit",
        description:
          "Comfortable preventive care for a fresher, brighter smile.",
        image:
          "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "Smile refresh",
        likes: 229,
        clicks: 604,
        distanceKm: 2.1,
      },
      {
        name: "Little Teeth Clinic",
        provider: "Little Teeth Family Dentistry",
        category: "Dentist · Pediatric dental care",
        distance: "0.9 km away",
        offer: "Kids welcome · First check-up",
        price: "From $68 / visit",
        description: "A warm, child-friendly dental visit for growing smiles.",
        image:
          "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=420&h=420&q=85",
        badge: "Kids welcome",
        likes: 338,
        clicks: 872,
        distanceKm: 0.9,
      },
    ],
  },
]

const merchantDetailSections = styleOneMerchantSections.map((section) => ({
  ...section,
  services:
    section.title === "Education"
      ? section.services.map((service, index) =>
          index === 0 ? { ...service, badge: "$80 OFF" } : service,
        )
      : section.services,
}))

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

interface StyleFiveHomePageProps {
  onBack?: () => void
  selectedStyle: string
  onStyleChange: (style: string) => void
  styleScale: number
}

export default function StyleFiveHomePage({
  onBack,
  selectedStyle,
  onStyleChange,
  styleScale,
}: StyleFiveHomePageProps) {
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
  const categoryPointer = useRef<{
    id: number
    startX: number
    startScroll: number
  } | null>(null)
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
  const visibleMerchantSections = useMemo(
    () =>
      [...merchantSections.slice(0, 2), ...merchantDetailSections].map(
        (section) => ({
          ...section,
          services: section.services
            .slice(0, 4)
            .filter(
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
        }),
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

  const finishCategoryDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = categoryPointer.current
    if (!pointer || pointer.id !== event.pointerId) return
    categoryPointer.current = null
    setCategoryDragging(false)
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  return (
    <div className="lifestyle-style-five">
      <LifestyleVariantHeader
        onBack={onBack}
        selectedStyle={selectedStyle}
        onStyleChange={onStyleChange}
        styleScale={styleScale}
      />

      <main className="lifestyle-style-five__main">
        <label className="lifestyle-style-five__search">
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
          className="lifestyle-style-five__section"
          aria-label="Lifestyle categories"
        >
          <div
            className={`lifestyle-style-five__category-scroll${
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
            onPointerUp={finishCategoryDrag}
            onPointerCancel={finishCategoryDrag}
          >
            <div className="lifestyle-style-five__category-grid">
              {visibleCategories.map((category) => (
                <article
                  className={`lifestyle-style-five__category${
                    category.isComingSoon ? " is-coming-soon" : ""
                  }`}
                  key={category.label}
                  aria-disabled={category.isComingSoon || undefined}
                  aria-label={
                    category.isComingSoon
                      ? "Coming soon category, unavailable"
                      : `${category.label} category`
                  }
                >
                  <img src={category.image} alt="" aria-hidden="true" />
                  <strong>{category.label}</strong>
                </article>
              ))}
              {visibleCategories.length === 0 && (
                <p className="lifestyle-style-five__empty">
                  No matching categories
                </p>
              )}
            </div>
          </div>
        </section>

        <section
          className="lifestyle-style-five__hero"
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
            className={`lifestyle-style-five__hero-track${
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
            className="lifestyle-style-five__hero-dots"
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

        <div className="lifestyle-style-five__merchant-sections">
          {visibleMerchantSections.map((section) => {
            const sectionId = `lifestyle-style-five-${section.title
              .toLowerCase()
              .replace(/[^a-z]+/g, "-")}`
            const isPromotionalSection =
              section.title === "Featured this month" ||
              section.title === "New partners"

            return (
              <section
                className="lifestyle-style-five__merchant-section"
                key={section.title}
                aria-labelledby={sectionId}
              >
                <div className="lifestyle-style-five__heading">
                  <h2 id={sectionId}>{section.title}</h2>
                  {!isPromotionalSection && <span>View all &gt;</span>}
                </div>
                <StyleFiveMerchantCards
                  services={section.services}
                  emptyMessage="No matching merchants"
                  ariaLabel={`${section.title} merchants`}
                  showTrust={!isPromotionalSection}
                />
              </section>
            )
          })}
        </div>
      </main>
    </div>
  )
}
