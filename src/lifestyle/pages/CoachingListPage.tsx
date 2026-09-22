import "./coaching-list.css"
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { useNavigate, useSearchParams } from "react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Cancel01Icon,
  DiscountTag01Icon,
  MapPinIcon,
  Tag01Icon,
} from "@hugeicons/core-free-icons"
import StyleTwoPageHeader from "../../services/StyleTwoPageHeader"
import {
  directoryGroups,
  directoryGroupTitles,
  directoryMerchants,
  parseSectionGroup,
  type DirectoryMerchant,
} from "./merchantDirectory"

const sortOptions = [
  "Recommended",
  "Nearest",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
]
const locationOptions = ["Near Me", "Within 2 km", "Within 5 km", "Islandwide"]
const availabilityOptions = ["Open Now", "Weekend Available"]
const offerOptions = ["Promotion", "Free Trial"]
const PRICE_MIN = 0
const PRICE_MAX = 150
const PRICE_STEP = 5
const searchSuggestions = [
  "Swimming lessons",
  "Yoga classes",
  "Personal training",
  "Tennis coaching",
]

interface DirectoryFilters {
  sort: string
  location: string | null
  priceRange: [number, number]
  availability: string[]
  offers: string[]
}

const emptyFilters = (): DirectoryFilters => ({
  sort: sortOptions[0],
  location: null,
  priceRange: [PRICE_MIN, PRICE_MAX],
  availability: [],
  offers: [],
})

function matchesLocation(merchant: DirectoryMerchant, location: string | null) {
  if (!location || location === "Islandwide") return true
  if (location === "Near Me") return merchant.distance <= 1.5
  if (location === "Within 2 km") return merchant.distance <= 2
  return merchant.distance <= 5
}

function matchesPrice(
  merchant: DirectoryMerchant,
  priceRange: DirectoryFilters["priceRange"],
) {
  return merchant.price >= priceRange[0] && merchant.price <= priceRange[1]
}

function matchesFilters(
  merchant: DirectoryMerchant,
  filters: DirectoryFilters,
) {
  if (!matchesLocation(merchant, filters.location)) return false
  if (!matchesPrice(merchant, filters.priceRange)) return false
  if (filters.availability.includes("Open Now") && !merchant.openNow)
    return false
  if (filters.availability.includes("Weekend Available") && !merchant.weekend)
    return false
  if (filters.offers.includes("Promotion") && !merchant.promotion) return false
  if (filters.offers.includes("Free Trial") && !merchant.freeTrial) return false
  return true
}

function sortMerchants(list: DirectoryMerchant[], sort: string) {
  const sorted = [...list]
  if (sort === "Nearest") sorted.sort((a, b) => a.distance - b.distance)
  else if (sort === "Price: Low to High")
    sorted.sort((a, b) => a.price - b.price)
  else if (sort === "Price: High to Low")
    sorted.sort((a, b) => b.price - a.price)
  else if (sort === "Newest")
    sorted.sort(
      (a, b) => Number(b.isNew) - Number(a.isNew) || b.likes - a.likes,
    )
  else sorted.sort((a, b) => b.likes - a.likes)
  return sorted
}

function SearchGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  )
}

function FilterPanel({
  open,
  pending,
  onClose,
  onPatch,
  onReset,
  onApply,
}: {
  open: boolean
  pending: DirectoryFilters
  onClose: () => void
  onPatch: (patch: Partial<DirectoryFilters>) => void
  onReset: () => void
  onApply: () => void
}) {
  const groups: {
    title: string
    options: string[]
    kind: "radio" | "checkbox"
    isOn: (option: string) => boolean
    toggle: (option: string) => void
  }[] = [
    {
      title: "Sort by",
      options: sortOptions,
      kind: "radio",
      isOn: (option) => pending.sort === option,
      toggle: (option) => onPatch({ sort: option }),
    },
    {
      title: "Location",
      options: locationOptions,
      kind: "radio",
      isOn: (option) => pending.location === option,
      toggle: (option) =>
        onPatch({ location: pending.location === option ? null : option }),
    },
    {
      title: "Availability",
      options: availabilityOptions,
      kind: "checkbox",
      isOn: (option) => pending.availability.includes(option),
      toggle: (option) =>
        onPatch({
          availability: pending.availability.includes(option)
            ? pending.availability.filter((item) => item !== option)
            : [...pending.availability, option],
        }),
    },
    {
      title: "Offers",
      options: offerOptions,
      kind: "checkbox",
      isOn: (option) => pending.offers.includes(option),
      toggle: (option) =>
        onPatch({
          offers: pending.offers.includes(option)
            ? pending.offers.filter((item) => item !== option)
            : [...pending.offers, option],
        }),
    },
  ]
  const [minimumPrice, maximumPrice] = pending.priceRange
  const priceRangeStyle = {
    "--price-range-start": `${
      ((minimumPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100
    }%`,
    "--price-range-end": `${
      ((maximumPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100
    }%`,
  } as CSSProperties
  const renderGroup = (group: (typeof groups)[number]) => (
    <div className="lifestyle-sheet__group" key={group.title}>
      <h3 className="lifestyle-sheet__group-title">{group.title}</h3>
      <div className="lifestyle-sheet__options">
        {group.options.map((option) => (
          <button
            type="button"
            key={option}
            data-kind={group.kind}
            className={`lifestyle-sheet__option${
              group.isOn(option) ? " is-selected" : ""
            }`}
            aria-pressed={group.isOn(option)}
            onClick={() => group.toggle(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div
      className={`lifestyle-sheet${open ? " is-open" : ""}`}
      aria-hidden={!open}
    >
      <div className="lifestyle-sheet__backdrop" onClick={onClose} />
      <div
        className="lifestyle-sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Filter services"
      >
        <div className="lifestyle-sheet__grabber" />
        <div className="lifestyle-sheet__header">
          <h2>Filters</h2>
          <button
            type="button"
            className="lifestyle-sheet__close"
            aria-label="Close filters"
            onClick={onClose}
          >
            <HugeiconsIcon
              icon={Cancel01Icon}
              size={14}
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="lifestyle-sheet__body">
          {groups.slice(0, 2).map(renderGroup)}
          <div className="lifestyle-sheet__group lifestyle-sheet__price-group">
            <h3 className="lifestyle-sheet__group-title">Price</h3>
            <div className="lifestyle-sheet__price-values" aria-live="polite">
              <strong>${minimumPrice}</strong>
              <span>to</span>
              <strong>${maximumPrice}</strong>
            </div>
            <div
              className="lifestyle-sheet__price-sliders"
              style={priceRangeStyle}
            >
              <div className="lifestyle-sheet__price-track" aria-hidden="true" />
              <input
                type="range"
                min={PRICE_MIN}
                max={maximumPrice - PRICE_STEP}
                step={PRICE_STEP}
                value={minimumPrice}
                aria-label="Minimum price"
                onChange={(event) =>
                  onPatch({
                    priceRange: [Number(event.target.value), maximumPrice],
                  })
                }
              />
              <input
                type="range"
                min={minimumPrice + PRICE_STEP}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={maximumPrice}
                aria-label="Maximum price"
                onChange={(event) =>
                  onPatch({
                    priceRange: [minimumPrice, Number(event.target.value)],
                  })
                }
              />
            </div>
            <div className="lifestyle-sheet__price-limits" aria-hidden="true">
              <span>$0</span>
              <span>$150+</span>
            </div>
          </div>
          {groups.slice(2).map(renderGroup)}
        </div>
        <div className="lifestyle-sheet__actions">
          <button
            type="button"
            className="lifestyle-sheet__reset"
            onClick={onReset}
          >
            Reset
          </button>
          <button
            type="button"
            className="lifestyle-sheet__apply"
            onClick={onApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CoachingListPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const contentRef = useRef<HTMLElement>(null)
  const [group, setGroup] = useState(() =>
    parseSectionGroup(searchParams.get("section") ?? "All"),
  )
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState(emptyFilters)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [pending, setPending] = useState(emptyFilters)
  const [searchSuggestionIndex, setSearchSuggestionIndex] = useState(0)
  const [searchSuggestionVisible, setSearchSuggestionVisible] = useState(true)

  useLayoutEffect(() => {
    contentRef.current?.scrollTo({ top: 0 })
    document
      .querySelector<HTMLElement>(".life-style-flow")
      ?.scrollTo({ top: 0 })
    window.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    if (!sheetOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSheetOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [sheetOpen])

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

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    const matched = directoryMerchants.filter(
      (merchant) =>
        (group === "All" || merchant.group === group) &&
        (!keyword ||
          [merchant.name, merchant.provider, merchant.category].some((value) =>
            value.toLowerCase().includes(keyword),
          )),
    )
    return sortMerchants(
      matched.filter((merchant) => matchesFilters(merchant, filters)),
      filters.sort,
    )
  }, [group, query, filters])

  const closeSheet = () => setSheetOpen(false)
  const patchPending = (patch: Partial<DirectoryFilters>) =>
    setPending((current) => ({ ...current, ...patch }))
  const resetPending = () => {
    setPending(emptyFilters())
    setQuery("")
  }

  return (
    <main className="service-page coaching-list">
      <StyleTwoPageHeader
        title={directoryGroupTitles[group] ?? "All services"}
        onBack={() => navigate(-1)}
      />
      <section
        className="service-content coaching-list__content"
        ref={contentRef}
      >
        <label className="service-search">
          <span className="service-search-icon" aria-hidden="true">
            <SearchGlyph />
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search services"
            autoComplete="off"
          />
          {!query && (
            <span className="service-search-placeholder" aria-hidden="true">
              <span>Search&nbsp;</span>
              <span
                className={`service-search-term${
                  searchSuggestionVisible ? " is-visible" : ""
                }`}
              >{`\u201c${searchSuggestions[searchSuggestionIndex]}\u201d`}</span>
            </span>
          )}
          {query && (
            <button
              type="button"
              className="service-search-clear"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <svg viewBox="0 0 24 24">
                <path d="m7 7 10 10M17 7 7 17" />
              </svg>
            </button>
          )}
        </label>
        <div
          className="lifestyle-list__tabs"
          role="tablist"
          aria-label="Service categories"
        >
          {directoryGroups.map((item) => (
            <button
              type="button"
              key={item}
              role="tab"
              aria-selected={group === item}
              className={`lifestyle-list__tab${
                group === item ? " is-active" : ""
              }`}
              onClick={() => setGroup(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div className="lifestyle-list__empty">
            <strong>No matching services</strong>
            <span>Try adjusting your search or filters.</span>
            <button
              type="button"
              onClick={() => {
                setFilters(emptyFilters())
                setQuery("")
              }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="lifestyle-list__grid">
            {filtered.map((merchant) => (
              <MerchantCard
                key={merchant.name}
                merchant={merchant}
                onOpen={
                  merchant.group === "Coaching"
                    ? () =>
                        navigate(
                          `/coaching/${encodeURIComponent(merchant.name)}`,
                        )
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </section>
      <FilterPanel
        open={sheetOpen}
        pending={pending}
        onClose={closeSheet}
        onPatch={patchPending}
        onReset={resetPending}
        onApply={() => {
          setFilters(pending)
          setSheetOpen(false)
        }}
      />
    </main>
  )
}

function MerchantCard({
  merchant,
  onOpen,
}: {
  merchant: DirectoryMerchant
  onOpen?: () => void
}): ReactNode {
  const content = (
    <>
      <img src={merchant.image} alt={merchant.name} loading="lazy" />
      <div className="lifestyle-list__card-body">
        <h2 className="lifestyle-list__card-name">{merchant.name}</h2>
        <span className="lifestyle-list__card-provider">
          {merchant.provider}
        </span>
        <span className="lifestyle-list__card-line lifestyle-list__card-line--category">
          <HugeiconsIcon
            icon={Tag01Icon}
            size={12}
            color="#1c9dd7"
            strokeWidth={1.8}
            aria-hidden="true"
          />
          <span>{merchant.category}</span>
        </span>
        <span className="lifestyle-list__card-line lifestyle-list__card-line--offer">
          <HugeiconsIcon
            icon={DiscountTag01Icon}
            size={12}
            color="#ed8a47"
            strokeWidth={1.8}
            aria-hidden="true"
          />
          <span>{merchant.offer}</span>
        </span>
        <div className="lifestyle-list__card-footer">
          <strong className="lifestyle-list__card-price">
            From ${merchant.price} / {merchant.unit}
          </strong>
          <span className="lifestyle-list__card-distance">
            <HugeiconsIcon
              icon={MapPinIcon}
              size={12}
              color="#1c9dd7"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <span>{merchant.distance} km</span>
          </span>
        </div>
      </div>
    </>
  )

  if (onOpen) {
    return (
      <button
        type="button"
        className="lifestyle-list__card is-actionable"
        onClick={onOpen}
        aria-label={`Open ${merchant.name}`}
      >
        {content}
      </button>
    )
  }

  return <article className="lifestyle-list__card">{content}</article>
}
