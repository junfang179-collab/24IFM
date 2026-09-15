import { useEffect, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router";
import LifeStyleScreen from "../imports/Container";
import yogaPhoto from "../imports/12.png";

const ARTBOARD_WIDTH = 750;
const ARTBOARD_HEIGHT = 2018;

const sportsPhotos = [
  { alt: "Swimmer underwater in a pool", src: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=264&h=304&q=88" },
  { alt: "Personal training session in a gym", src: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=264&h=304&q=88" },
  { alt: "Tennis player on court", src: "https://images.unsplash.com/photo-1758314810718-0d312d498210?auto=format&fit=crop&w=264&h=304&q=88" },
  { alt: "Yoga practice in a studio", src: yogaPhoto },
  { alt: "Basketball player reaching for the hoop", src: "https://images.unsplash.com/photo-1672332582733-9895c6d6428c?auto=format&fit=crop&w=264&h=304&q=88" },
  { alt: "Soccer player in action on a field", src: "https://images.unsplash.com/photo-1764239810824-00fa6f61dbbc?auto=format&fit=crop&w=264&h=304&q=88" },
];

const popularPhotos = [
  { alt: "Swimmer moving through clear blue water", badge: "Top Rated", src: "https://images.unsplash.com/photo-1562271613-c3a4be2cc883?auto=format&fit=crop&w=636&h=272&q=85" },
  { alt: "Woman enjoying a bright facial treatment", badge: "20% OFF", src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=636&h=272&q=85" },
  { alt: "Yoga pose in a light-filled studio", badge: "Popular", src: "https://images.unsplash.com/photo-1593811167565-4672e6c8ce4c?auto=format&fit=crop&w=636&h=272&q=85" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [scale, setScale] = useState(() => Math.min(window.innerWidth / ARTBOARD_WIDTH, 1));

  useEffect(() => {
    const updateScale = () => setScale(Math.min(window.innerWidth / ARTBOARD_WIDTH, 1));
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const frameStyle = { "--screen-scale": scale, height: `${ARTBOARD_HEIGHT * scale}px`, width: `${ARTBOARD_WIDTH * scale}px` } as CSSProperties;

  return <main className="figma-screen" style={frameStyle} aria-label="Lifestyle services"><div className="figma-screen__artboard">
    <LifeStyleScreen />
    <button className="swimming-home-hit" onClick={() => navigate("/swimming")} aria-label="Browse swimming services" />
    <div className="sports-photo-replacements">{sportsPhotos.map((photo) => <div className="sports-photo-replacement" key={photo.alt}><img src={photo.src} alt={photo.alt} /></div>)}</div>
    <div className="popular-photo-replacements">{popularPhotos.map((photo) => <div className="popular-photo-replacement" key={photo.badge}><img src={photo.src} alt={photo.alt} /><span>{photo.badge}</span></div>)}</div>
    <section className="lifestyle-banner-replacement" aria-label="Lifestyle services promotion"><img src="https://images.unsplash.com/photo-1562271613-c3a4be2cc883?auto=format&fit=crop&w=1404&h=504&q=85" alt="Swimmer in bright blue water" /><div className="lifestyle-banner-copy"><h1>Move more,<br />live better.</h1><p>Find the best coaches,<br />studios &amp; services near you.</p><span className="lifestyle-banner-button">Explore now <b>›</b></span></div><div className="lifestyle-banner-dots"><i /><i /><i /></div></section>
  </div></main>;
}
