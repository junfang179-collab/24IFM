import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import { useNavigate } from "react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { HeartIcon, Location01Icon } from "@hugeicons/core-free-icons"
import StyleTwoPageHeader from "../../services/StyleTwoPageHeader"

const searchSuggestions = ["Math tutoring", "Piano lessons", "Language class", "Art workshop"]
const educationCategories = ["All", "Enrichment classes", "Schools"]
const sortOptions = ["Most Likes", "Most Clicks Count", "Shortest Distance"]
type FilterPointer = { id: number; startX: number; startScroll: number }
const FILTER_DRAG_THRESHOLD = 8

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
}

const services = [
  { id: "brightminds", name: "BrightMinds Tutoring", provider: "BrightMinds Academy", category: "Enrichment classes", type: "Math & Science", distance: 0.8, price: 55, saves: 320, clicks: 980, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=760&h=460&q=85", tag: "Featured" },
  { id: "melody", name: "Melody Music School", provider: "Melody Arts", category: "Enrichment classes", type: "Piano & Violin", distance: 1.5, price: 48, saves: 256, clicks: 810, image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=760&h=460&q=85", tag: "Popular" },
  { id: "lingua", name: "Lingua Franca Academy", provider: "Lingua Franca", category: "Schools", type: "Mandarin & French", distance: 2.1, price: 62, saves: 198, clicks: 720, image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=760&h=460&q=85", tag: "New" },
  { id: "artspark", name: "ArtSpark Studio", provider: "ArtSpark Creative", category: "Enrichment classes", type: "Painting & Drawing", distance: 3.0, price: 40, saves: 175, clicks: 590, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=760&h=460&q=85", tag: "1-on-1" },
]

export default function EducationListPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("All")
  const [saved, setSaved] = useState<string[]>([])
  const [sortBy, setSortBy] = useState(sortOptions[0])
  const [sortOpen, setSortOpen] = useState(false)
  const [searchSuggestionIndex, setSearchSuggestionIndex] = useState(0)
  const [searchSuggestionVisible, setSearchSuggestionVisible] = useState(true)
  const filterRowRef = useRef<HTMLDivElement>(null)
  const filterPointerRef = useRef<FilterPointer | null>(null)
  const suppressFilterClickRef = useRef(false)
  const [filterDragging, setFilterDragging] = useState(false)

  useEffect(() => {
    if (!sortOpen) return
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSortOpen(false) }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [sortOpen])
  useEffect(() => {
    let revealTimeout: number | undefined
    const interval = window.setInterval(() => {
      setSearchSuggestionVisible(false)
      revealTimeout = window.setTimeout(() => { setSearchSuggestionIndex((current) => (current + 1) % searchSuggestions.length); setSearchSuggestionVisible(true) }, 420)
    }, 3200)
    return () => { window.clearInterval(interval); if (revealTimeout !== undefined) window.clearTimeout(revealTimeout) }
  }, [])

  const filtered = useMemo(() => {
    const matching = services.filter((service) => (filter === "All" || service.category === filter) && service.name.toLowerCase().includes(query.toLowerCase()))
    return [...matching].sort((a, b) => {
      if (sortBy === "Most Clicks Count") return b.clicks - a.clicks
      if (sortBy === "Shortest Distance") return a.distance - b.distance
      return b.saves - a.saves
    })
  }, [filter, query, sortBy])

  const toggleSaved = (id: string) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const startFilterDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || filterPointerRef.current) return
    filterPointerRef.current = { id: event.pointerId, startX: event.clientX, startScroll: event.currentTarget.scrollLeft }
    suppressFilterClickRef.current = false
    setFilterDragging(true)
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }
  const moveFilterDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = filterPointerRef.current
    if (!pointer || pointer.id !== event.pointerId) return
    const distance = event.clientX - pointer.startX
    if (Math.abs(distance) > FILTER_DRAG_THRESHOLD) suppressFilterClickRef.current = true
    event.currentTarget.scrollLeft = pointer.startScroll - distance
  }
  const finishFilterDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = filterPointerRef.current
    if (!pointer || pointer.id !== event.pointerId) return
    if (Math.abs(event.clientX - pointer.startX) > FILTER_DRAG_THRESHOLD) suppressFilterClickRef.current = true
    filterPointerRef.current = null
    setFilterDragging(false)
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }
  const selectFilter = (item: string, button: HTMLButtonElement) => { setFilter(item); button.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }) }

  return (
    <main className="service-page">
      <StyleTwoPageHeader title="Education" onBack={() => navigate(-1)} />
      <section className="service-content">
        <label className="service-search"><span className="service-search-icon" aria-hidden="true"><SearchIcon /></span><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search education services" />{!query && <span className="service-search-placeholder" aria-hidden="true"><span>Search&nbsp;</span><span className={`service-search-term${searchSuggestionVisible ? " is-visible" : ""}`}>{`\u201c${searchSuggestions[searchSuggestionIndex]}\u201d`}</span></span>}{query && <button type="button" className="service-search-clear" onClick={(event) => { event.preventDefault(); setQuery("") }} aria-label="Clear search"><svg viewBox="0 0 24 24"><path d="m7 7 10 10M17 7 7 17" /></svg></button>}</label>
        <div ref={filterRowRef} className={`filter-row${filterDragging ? " is-dragging" : ""}`} role="tablist" aria-label="Education categories" onPointerDown={startFilterDrag} onPointerMove={moveFilterDrag} onPointerUp={finishFilterDrag} onPointerCancel={finishFilterDrag} onClickCapture={(event) => { if (!suppressFilterClickRef.current) return; event.preventDefault(); event.stopPropagation(); suppressFilterClickRef.current = false }}>{educationCategories.map((item) => <button type="button" key={item} className={filter === item ? "active" : ""} role="tab" aria-selected={filter === item} aria-pressed={filter === item} onClick={(event) => selectFilter(item, event.currentTarget)}>{item}</button>)}</div>
        <div className="result-copy"><div className="sort-control"><button type="button" className="sort-trigger" aria-haspopup="listbox" aria-expanded={sortOpen} onClick={() => setSortOpen((open) => !open)}><span>Sort by</span><strong>{sortBy}</strong><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg></button>{sortOpen && <div className="sort-control-backdrop" onClick={() => setSortOpen(false)}><div className="sort-menu" role="listbox" aria-label="Sort services" onClick={(event) => event.stopPropagation()}>{sortOptions.map((option) => <button type="button" key={option} role="option" aria-selected={sortBy === option} className={sortBy === option ? "selected" : ""} onClick={() => { setSortBy(option); setSortOpen(false) }}>{option}</button>)}</div></div>}</div><span className="result-count"><span className="count-number">{filtered.length}</span> services</span></div>
        <div className="service-list">{filtered.map((service) => { const isSaved = saved.includes(service.id); return <article className="service-card" key={service.id} onClick={() => navigate(`/education/${service.id}`)}><div className="service-card-image"><img src={service.image} alt={service.name} /><span>{service.tag}</span></div><div className="service-card-body"><p className="service-provider">{service.provider}</p><h2>{service.name}</h2><p>{service.type}</p><div><HugeiconsIcon icon={Location01Icon} size={13} color="#9aa6b2" strokeWidth={1.8} /><span>{service.distance} km away</span></div><span className="service-price"><span className="service-price-from">From </span><strong className="service-price-value">${service.price}</strong><span className="service-price-unit"> / session</span></span></div><button className={isSaved ? "favorite-button saved" : "favorite-button"} onClick={(event) => { event.stopPropagation(); toggleSaved(service.id) }} aria-label={isSaved ? "Remove from saved" : "Save service"}><HugeiconsIcon className={isSaved ? "icon-filled" : ""} icon={HeartIcon} size={14} color="currentColor" /><small>{service.saves + (isSaved ? 1 : 0)}</small></button></article> })}</div>
      </section>
    </main>
  )
}
