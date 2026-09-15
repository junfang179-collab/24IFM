export interface LifestyleService {
  name: string
  provider: string
  category: string
  distance: string
  offer: string
  price: string
  description: string
  image: string
  badge: string
  likes: number
  clicks: number
  distanceKm: number
}

export const lifestyleServices: LifestyleService[] = [
  {
    name: "AquaKids Swimming",
    provider: "AquaKids Academy",
    category: "Swimming lessons · Kids & beginner",
    distance: "1.2 km away",
    offer: "Featured · Trial lesson available",
    price: "From $45 / session",
    description: "Confidence-building lessons for every level.",
    image:
      "https://images.unsplash.com/photo-1562271613-c3a4be2cc883?auto=format&fit=crop&w=420&h=420&q=85",
    badge: "Featured",
    likes: 482,
    clicks: 1180,
    distanceKm: 1.2,
  },
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
    name: "The Yoga Room",
    provider: "The Yoga Room",
    category: "Yoga · Coaching & sports",
    distance: "2.1 km away",
    offer: "Popular · Small group classes",
    price: "From $25 / class",
    description: "A welcoming practice for a stronger daily routine.",
    image:
      "https://images.unsplash.com/photo-1593811167565-4672e6c8ce4c?auto=format&fit=crop&w=420&h=420&q=85",
    badge: "Popular",
    likes: 321,
    clicks: 764,
    distanceKm: 2.1,
  },
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
    badge: "New",
    likes: 280,
    clicks: 980,
    distanceKm: 0.8,
  },
]
