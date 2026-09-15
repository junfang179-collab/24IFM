import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

const services = [
  { id: "aquakids", name: "AquaKids Swimming", provider: "AquaKids Academy", type: "Kids & beginner", rating: 4.8, reviews: 120, distance: 1.2, price: 45, saves: 482, image: "https://images.unsplash.com/photo-1562271613-c3a4be2cc883?auto=format&fit=crop&w=760&h=460&q=85", tag: "Top Rated" },
  { id: "bluewave", name: "Bluewave Swim Academy", provider: "Bluewave Coaching", type: "Adult freestyle", rating: 4.9, reviews: 86, distance: 2.4, price: 58, saves: 318, image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=760&h=460&q=85", tag: "Popular" },
  { id: "tide", name: "Tide Swim Studio", provider: "Tide Sports", type: "Private coaching", rating: 4.7, reviews: 54, distance: 3.1, price: 72, saves: 207, image: "https://images.unsplash.com/photo-1530631673369-bc20fdb32288?auto=format&fit=crop&w=760&h=460&q=85", tag: "1-on-1" },
  { id: "lane", name: "Lane Eight Aquatics", provider: "Lane Eight", type: "Technique clinic", rating: 4.6, reviews: 41, distance: 4.0, price: 48, saves: 164, image: "https://images.unsplash.com/photo-1461567933755-6c82be2197da?auto=format&fit=crop&w=760&h=460&q=85", tag: "New" },
];

export default function SwimmingListPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [saved, setSaved] = useState<string[]>([]);
  const filtered = useMemo(() => services.filter((service) => (filter === "All" || (filter === "Top rated" && service.rating >= 4.8) || (filter === "Nearby" && service.distance <= 2.5) || (filter === "Private" && service.type.includes("Private"))) && service.name.toLowerCase().includes(query.toLowerCase())), [filter, query]);
  const toggleSaved = (id: string) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return <main className="service-page"><header className="service-header"><button onClick={() => navigate(-1)} aria-label="Back">‹</button><div><span>COACHING &amp; SPORTS</span><h1>Swimming</h1></div></header><section className="service-content"><label className="service-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search swimming services" /></label><div className="filter-row">{["All", "Top rated", "Nearby", "Private"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="result-copy"><span>{filtered.length} services near Charleston</span><button onClick={() => setFilter("Top rated")}>Sort: Recommended⌄</button></div><div className="service-list">{filtered.map((service) => { const isSaved = saved.includes(service.id); return <article className="service-card" key={service.id} onClick={() => navigate(`/swimming/${service.id}`)}><div className="service-card-image"><img src={service.image} alt={service.name} /><span>{service.tag}</span></div><div className="service-card-body"><p className="service-provider">{service.provider}</p><h2>{service.name}</h2><p>{service.type}</p><div><b>★ {service.rating}</b><span>({service.reviews})</span><i>•</i><span>{service.distance} km</span></div><strong>From <em>${service.price}</em> / session</strong></div><button className={isSaved ? "favorite-button saved" : "favorite-button"} onClick={(event) => { event.stopPropagation(); toggleSaved(service.id); }} aria-label={isSaved ? "Remove from saved" : "Save service"}>♥<small>{service.saves + (isSaved ? 1 : 0)}</small></button><span className="card-arrow">›</span></article>; })}</div></section></main>;
}
