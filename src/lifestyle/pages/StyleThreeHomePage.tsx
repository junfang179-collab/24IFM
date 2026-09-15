import {
  useEffect,
  useMemo,
  useState,
} from "react"
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

const categories: { label: string image: string }[] = [
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

interface StyleThreeHomePageProps {
  onBack?: () => void
  selectedStyle: string
  onStyleChange: (style: string) => void
  styleScale: number
}

export default function StyleThreeHomePage({
  onBack,
  selectedStyle,
  onStyleChange,
  styleScale,
}: StyleThreeHomePageProps) {
  const [query, setQuery] = useState("")
  const [searchSuggestionIndex, setSearchSuggestionIndex] = useState(0)
  const [searchSuggestionVisible, setSearchSuggestionVisible] = useState(true)
  const normalizedQuery = query.trim().toLowerCase()
  const visibleMerchants = useMemo(() => {
    const matching = lifestyleServices.filter(
      (service) =>
        !normalizedQuery ||
        [service.name, service.provider, service.category].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        ),
    )
    return [...matching].sort((a, b) => b.likes - a.likes)
  }, [normalizedQuery])
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

  return (
    <div className="lifestyle-style-two lifestyle-style-three">
      <LifestyleVariantHeader
        onBack={onBack}
        selectedStyle={selectedStyle}
        onStyleChange={onStyleChange}
        styleScale={styleScale}
      />

      <main className="lifestyle-style-three__main">
        <label className="lifestyle-style-three__search">
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
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m7 7 10 10M17 7 7 17" />
              </svg>
            </button>
          )}
        </label>

        <section
          className="lifestyle-style-three__categories"
          aria-label="Lifestyle categories"
        >
          <div className="lifestyle-style-three__category-grid">
            {categories.map((category) => (
              <article
                className="lifestyle-style-three__category"
                key={category.label}
                aria-label={`${category.label} category`}
              >
                <img src={category.image} alt="" aria-hidden="true" />
                <strong>{category.label}</strong>
              </article>
            ))}
          </div>
        </section>

        <section
          className="lifestyle-style-three__results"
          aria-labelledby="style-three-results"
        >
          <div className="lifestyle-style-three__section-heading">
            <h2 id="style-three-results">Popular Merchants</h2>
            <span>View all &gt;</span>
          </div>
          <LifestyleServiceCards
            services={visibleMerchants}
            emptyMessage="No matching lifestyle services"
            onlyDiscountBadge
          />
        </section>
      </main>
    </div>
  )
}
