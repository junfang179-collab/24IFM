import "./coaching-detail.css"
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { useNavigate, useParams } from "react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  FavouriteIcon,
  GlobeIcon,
  MoreHorizontalIcon,
  TelephoneIcon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons"
import { directoryMerchants, type DirectoryGroup } from "./merchantDirectory"

type CoachingDetail = {
  area: string
  address: string
  phone: string
  closingTime: string
  description: string
  gallery: string[]
  rates: { title: string; duration: string; price: string }[]
  timetable: {
    days: string
    openingHours: string
    sessions: { title: string }[]
  }[]
}

type GalleryPointer = { id: number; startX: number; width: number }

type DetailGroup = Exclude<DirectoryGroup, "All">

const enquiryLabelByGroup: Record<DetailGroup, string> = {
  Coaching: "coaching sessions",
  Education: "classes",
  "Pet care": "grooming and care services",
  "Beauty & wellness": "treatments",
  Health: "appointments",
}

function formatRateRange(
  rates: CoachingDetail["rates"],
  fallbackPrice: number,
) {
  const prices = rates
    .map((rate) => Number(rate.price.replace(/[^0-9.]/g, "")))
    .filter(Number.isFinite)
  const lowest = prices.length > 0 ? Math.min(...prices) : fallbackPrice
  const highest = prices.length > 0 ? Math.max(...prices) : fallbackPrice

  return lowest === highest ? `$${lowest}` : `$${lowest}-${highest}`
}

const defaultDetail: CoachingDetail = {
  area: "Singapore Sports Hub",
  address: "55 Sports Hub Way, #02-12, Singapore 397718",
  phone: "+65 6888 2050",
  closingTime: "8:00 PM",
  description:
    "Friendly coaching in a focused small-group setting. Build confidence, improve technique and enjoy steady progress at your own pace. Sessions are planned around each learner’s starting point, with practical guidance and time to ask questions. Contact the coach before your first visit to discuss suitable class times and the best programme for your goals.",
  gallery: [
    "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=960&h=680&q=88",
    "https://images.unsplash.com/photo-1530137073520-20c7b2bb92f6?auto=format&fit=crop&w=960&h=680&q=88",
    "https://images.unsplash.com/photo-1600965962102-9d260a71890d?auto=format&fit=crop&w=960&h=680&q=88",
  ],
  rates: [
    { title: "Small-group coaching", duration: "60 min", price: "$45" },
    { title: "Private coaching", duration: "60 min", price: "$70" },
    { title: "Weekend skills class", duration: "75 min", price: "$52" },
  ],
  timetable: [
    {
      days: "Mon-Fri",
      openingHours: "10:00 AM - 8:00 PM",
      sessions: [
        { title: "Beginner coaching" },
        { title: "Skills practice" },
      ],
    },
    {
      days: "Sat-Sun",
      openingHours: "9:00 AM - 6:00 PM",
      sessions: [
        { title: "Small-group coaching" },
        { title: "Private coaching" },
      ],
    },
  ],
}

const detailsByMerchant: Record<string, Partial<CoachingDetail>> = {
  "AquaKids Swimming": {
    area: "Tampines",
    address: "123 Tampines Central 1, #04-05, Singapore 520123",
    phone: "+65 9123 4567",
    closingTime: "8:00 PM",
    description:
      "AquaKids Swimming builds water confidence for children and adult beginners. Certified coaches keep every session safe, supportive and fun. Lessons are kept in small groups so each swimmer gets clear feedback on breathing, floating, kicking and stroke technique. Choose a weekday class, weekend session or private coaching based on your child’s pace and goals. Parents can start with a trial lesson before selecting an ongoing programme.",
    gallery: [
      "https://images.unsplash.com/photo-1562271613-c3a4be2cc883?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1600965962102-9d260a71890d?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Learn to Swim", duration: "45 min", price: "$45" },
      { title: "Kids Confidence", duration: "60 min", price: "$52" },
      { title: "Adult Beginner", duration: "60 min", price: "$55" },
      { title: "Private coaching", duration: "45 min", price: "$75" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        openingHours: "4:00 PM - 8:00 PM",
        sessions: [
          { title: "Kids Confidence" },
          { title: "Adult Beginner" },
        ],
      },
      {
        days: "Sat-Sun",
        openingHours: "9:00 AM - 6:00 PM",
        sessions: [
          { title: "Learn to Swim" },
          { title: "Private coaching" },
        ],
      },
    ],
  },
  "The Yoga Room": {
    area: "Tanjong Pagar",
    address: "18 Orchard Boulevard, #02-18, Singapore 238841",
    phone: "+65 6388 0188",
    closingTime: "9:30 PM",
    description:
      "A welcoming neighbourhood studio for small-group yoga classes, mindful movement and steady progress at every level. Teachers offer clear variations for beginners while helping regular practitioners deepen their strength, balance and mobility. Bring a mat if you prefer your own, or borrow one at the studio. Message the team before class if you are new to yoga, pregnant or returning after an injury.",
    gallery: [
      "https://images.unsplash.com/photo-1593811167565-4672e6c8ce4c?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Vinyasa flow", duration: "60 min", price: "$32" },
      { title: "Hatha", duration: "60 min", price: "$28" },
      { title: "Yin & restorative", duration: "75 min", price: "$35" },
      { title: "10-class pass", duration: "Flexible", price: "$260" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        openingHours: "7:00 AM - 9:30 PM",
        sessions: [
          { title: "Vinyasa flow" },
          { title: "Hatha" },
          { title: "Yin & restorative" },
        ],
      },
      {
        days: "Sat",
        openingHours: "8:30 AM - 1:00 PM",
        sessions: [
          { title: "Vinyasa · Prenatal" },
        ],
      },
    ],
  },
  "Baseline Tennis Club": {
    area: "Kallang",
    address: "4 Stadium Walk, Singapore 397689",
    phone: "+65 6123 8210",
    closingTime: "9:00 PM",
    description:
      "Technique-led tennis coaching for beginners and improvers, with small groups and friendly coaches who build confidence on court. Each session combines footwork, core strokes and game-based practice so players can apply new skills straight away. Rackets can be provided for trial lessons, and coaches will recommend the right group after a short chat about your experience and goals.",
    gallery: [
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=960&h=680&q=88",
    ],
  },
  "Peak Performance PT": {
    description:
      "Peak Performance PT offers practical, personalised training for people who want to move better and feel stronger. Coaches begin with a simple assessment, then tailor sessions around strength, mobility and everyday fitness goals. New clients can discuss preferred training times, past injuries and confidence levels before choosing a one-to-one or small-group plan.",
    gallery: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=960&h=680&q=88",
    ],
  },
  "HoopLab Academy": {
    description:
      "HoopLab Academy runs energetic basketball sessions for young players developing their fundamentals. Classes focus on ball handling, passing, shooting and decision-making through small-sided games. Coaches group players by confidence and age where possible, and parents can message the academy to find the right starting class or arrange a trial.",
    gallery: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1518065896235-a4c93e088e7a?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=960&h=680&q=88",
    ],
  },
  "Kickoff Football School": {
    description:
      "Kickoff Football School gives children a positive, structured introduction to the game. Sessions build control, movement, teamwork and match confidence through age-appropriate drills and guided play. Coaches welcome complete beginners as well as returning players, and can advise on suitable groups, term dates and what to bring for the first session.",
    gallery: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=960&h=680&q=88",
    ],
  },
  "BrightMinds Tutoring": {
    area: "Novena",
    address: "8 Sinaran Drive, #03-12, Singapore 307470",
    phone: "+65 6777 0122",
    closingTime: "9:00 PM",
    description:
      "BrightMinds Tutoring builds confidence in maths and science through small-group lessons and clear, structured teaching. Tutors begin with a short assessment of the student's current level, then plan weekly lessons around the topics and question types they find hardest. Parents receive a simple progress update each month and can reschedule lesson times by messaging the centre.",
    gallery: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Primary maths", duration: "60 min", price: "$55" },
      { title: "Secondary science", duration: "90 min", price: "$75" },
      { title: "Exam preparation", duration: "90 min", price: "$85" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        openingHours: "2:00 PM - 9:00 PM",
        sessions: [{ title: "Primary maths" }, { title: "Secondary science" }],
      },
      {
        days: "Sat",
        openingHours: "9:00 AM - 1:00 PM",
        sessions: [{ title: "Exam preparation" }],
      },
    ],
  },
  "Little Scholars School": {
    area: "Bukit Timah",
    address: "21 Bukit Timah Road, #02-05, Singapore 229899",
    phone: "+65 6333 4188",
    closingTime: "6:00 PM",
    description:
      "Little Scholars School is a warm, play-based preschool where children learn through guided activities, stories and time outdoors. Small classes let teachers notice how each child is progressing and share simple updates with parents. Families are welcome to visit on open house Saturdays, meet the teachers and see a typical morning before enrolling.",
    gallery: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Playgroup", duration: "90 min", price: "$48" },
      { title: "Nursery programme", duration: "3 hours", price: "$65" },
      { title: "Kindergarten", duration: "4 hours", price: "$78" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        openingHours: "8:30 AM - 3:30 PM",
        sessions: [{ title: "Nursery programme" }, { title: "Kindergarten" }],
      },
      {
        days: "Sat",
        openingHours: "9:00 AM - 12:30 PM",
        sessions: [{ title: "Open house & play session" }],
      },
    ],
  },
  "Maths Mastery": {
    area: "Bishan",
    address: "9 Bishan Place, #05-02, Singapore 579837",
    phone: "+65 6555 9021",
    closingTime: "9:30 PM",
    description:
      "Maths Mastery focuses on problem-solving rather than memorising methods. Lessons break each topic into small steps, then give students plenty of guided practice with past-paper questions. Every new student starts with a free assessment so the centre can recommend the right class, and parents can request a progress review at any time.",
    gallery: [
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1635372722656-389f87a941b7?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Primary maths", duration: "60 min", price: "$60" },
      { title: "Secondary maths", duration: "90 min", price: "$80" },
      { title: "O-Level intensive", duration: "90 min", price: "$95" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        openingHours: "3:00 PM - 9:30 PM",
        sessions: [{ title: "Secondary maths" }, { title: "Primary maths" }],
      },
      {
        days: "Sat-Sun",
        openingHours: "9:00 AM - 6:00 PM",
        sessions: [{ title: "O-Level intensive" }],
      },
    ],
  },
  "CodeCraft Junior Lab": {
    area: "one-north",
    address: "1 Fusionopolis Way, #03-08, Singapore 138632",
    phone: "+65 6100 3421",
    closingTime: "8:30 PM",
    description:
      "CodeCraft Junior Lab introduces children to coding through games, animation and simple robotics. Classes are hands-on from the first session, with students sharing a screen so they learn to explain their ideas to each other. Coaches keep groups small and finish each term with a project the children can show at home.",
    gallery: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Scratch coding", duration: "60 min", price: "$42" },
      { title: "Robotics lab", duration: "90 min", price: "$58" },
      { title: "Python starters", duration: "90 min", price: "$65" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        openingHours: "3:30 PM - 8:30 PM",
        sessions: [{ title: "Scratch coding" }, { title: "Python starters" }],
      },
      {
        days: "Sat-Sun",
        openingHours: "10:00 AM - 6:00 PM",
        sessions: [{ title: "Robotics lab" }],
      },
    ],
  },
  "Little Steps Music": {
    area: "Tiong Bahru",
    address: "18 Kim Tian Road, #02-11, Singapore 169247",
    phone: "+65 6222 7719",
    closingTime: "7:30 PM",
    description:
      "Little Steps Music makes first musical experiences playful and relaxed. Babies and toddlers sing, move and try simple percussion with a parent beside them, while older children begin keyboard and rhythm reading. Teachers keep classes small so every child gets attention, and a trial class is available before you commit to a term.",
    gallery: [
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1614963326505-843868e1d83a?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Baby music", duration: "45 min", price: "$35" },
      { title: "Toddler group", duration: "50 min", price: "$42" },
      { title: "Junior piano", duration: "45 min", price: "$55" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        openingHours: "3:00 PM - 7:30 PM",
        sessions: [{ title: "Junior piano" }, { title: "Toddler group" }],
      },
      {
        days: "Sat",
        openingHours: "9:00 AM - 5:00 PM",
        sessions: [{ title: "Baby music" }, { title: "Trial class" }],
      },
    ],
  },
  "Paws & Bubbles": {
    area: "Katong",
    address: "112 East Coast Road, #01-08, Singapore 428802",
    phone: "+65 6344 7712",
    closingTime: "7:00 PM",
    description:
      "Paws & Bubbles is a calm, pet-only grooming studio for dogs and cats. Groomers start with a short temperament check, then work at the animal's pace with quiet equipment and breaks when needed. Prices are confirmed before any work begins, and you can message the studio for coat, skin or matting advice between visits.",
    gallery: [
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Bath & brush", duration: "45 min", price: "$48" },
      { title: "Cat grooming", duration: "60 min", price: "$62" },
      { title: "Full groom", duration: "90 min", price: "$78" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        openingHours: "10:00 AM - 7:00 PM",
        sessions: [{ title: "Bath & brush" }, { title: "Full groom" }],
      },
      {
        days: "Sat-Sun",
        openingHours: "9:00 AM - 6:00 PM",
        sessions: [{ title: "Full groom" }, { title: "Cat grooming" }],
      },
    ],
  },
  "The Cat Parlour": {
    area: "Serangoon",
    address: "23 Serangoon Central, #02-14, Singapore 556083",
    phone: "+65 6288 4507",
    closingTime: "6:30 PM",
    description:
      "The Cat Parlour grooms cats only, in a quiet room with no dogs on the premises. Sessions are booked one cat at a time so there is no waiting in a busy queue, and handling is gentle and break-led. The team can advise on coat care, matting and stress-free travel before your first appointment.",
    gallery: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Cat bath & dry", duration: "60 min", price: "$52" },
      { title: "Mat removal", duration: "45 min", price: "$65" },
      { title: "Lion cut", duration: "90 min", price: "$88" },
    ],
    timetable: [
      {
        days: "Mon, Tue & Thu",
        openingHours: "11:00 AM - 6:30 PM",
        sessions: [{ title: "Cat bath & dry" }, { title: "Mat removal" }],
      },
      {
        days: "Wed & Fri",
        openingHours: "11:00 AM - 8:00 PM",
        sessions: [{ title: "Lion cut" }],
      },
    ],
  },
  "Wag & Go Mobile Grooming": {
    area: "Islandwide",
    address: "Mobile grooming van - we come to your home",
    phone: "+65 8100 2261",
    closingTime: "7:30 PM",
    description:
      "Wag & Go brings a fully equipped grooming van to your block, so pets are groomed without a car ride or a busy salon. The van carries its own water and power, and the groomer will confirm parking and a suitable spot before the visit. Message the team with your pet's breed, coat condition and preferred timing for a slot.",
    gallery: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Mobile bath & brush", duration: "60 min", price: "$60" },
      { title: "Mobile full groom", duration: "90 min", price: "$95" },
      { title: "Two-pet visit", duration: "120 min", price: "$110" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        openingHours: "9:00 AM - 7:30 PM",
        sessions: [{ title: "Mobile bath & brush" }, { title: "Mobile full groom" }],
      },
      {
        days: "Sat-Sun",
        openingHours: "9:00 AM - 6:00 PM",
        sessions: [{ title: "Mobile full groom" }],
      },
    ],
  },
  "Happy Tails Veterinary": {
    area: "Clementi",
    address: "3155 Commonwealth Avenue West, #03-22, Singapore 129588",
    phone: "+65 6778 3390",
    closingTime: "8:00 PM",
    description:
      "Happy Tails Veterinary is a small neighbourhood clinic for dogs, cats and small pets. Consultations are unhurried, with the vet explaining findings and options before any treatment is recommended. New patients get a free first wellness check, and the clinic can advise on vaccinations, diet and senior-pet screening over WhatsApp.",
    gallery: [
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Wellness check", duration: "30 min", price: "$65" },
      { title: "Vaccination package", duration: "45 min", price: "$120" },
      { title: "Senior pet screening", duration: "60 min", price: "$185" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        openingHours: "9:00 AM - 8:00 PM",
        sessions: [{ title: "Wellness check" }, { title: "Senior pet screening" }],
      },
      {
        days: "Tue & Thu",
        openingHours: "9:00 AM - 9:00 PM",
        sessions: [{ title: "Vaccination package" }],
      },
    ],
  },
  "Glow Beauty Studio": {
    area: "Orchard",
    address: "277 Orchard Road, #04-11, Singapore 238858",
    phone: "+65 6733 6612",
    closingTime: "9:00 PM",
    description:
      "Glow Beauty Studio focuses on facials and skin treatments in a quiet, unhurried setting. Every first visit starts with a skin reading so the therapist can match products and intensity to your skin rather than a fixed package. Treatment plans are explained upfront, and the studio is happy to advise on home care between visits.",
    gallery: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Signature facial", duration: "60 min", price: "$68" },
      { title: "Hydrating facial", duration: "75 min", price: "$98" },
      { title: "Brightening treatment", duration: "90 min", price: "$135" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        openingHours: "11:00 AM - 9:00 PM",
        sessions: [{ title: "Signature facial" }, { title: "Hydrating facial" }],
      },
      {
        days: "Sat-Sun",
        openingHours: "10:00 AM - 7:00 PM",
        sessions: [{ title: "Brightening treatment" }],
      },
    ],
  },
  "Lumiere Aesthetic Clinic": {
    area: "Dhoby Ghaut",
    address: "10 Penang Road, #05-03, Singapore 238469",
    phone: "+65 6883 1290",
    closingTime: "8:00 PM",
    description:
      "Lumiere Aesthetic Clinic handles skin concerns such as acne, pigmentation and scarring. A doctor reviews your skin history and goals first, then explains which treatments are realistic and what each involves. The clinic offers a free initial consultation and will share a written plan with pricing before you commit to anything.",
    gallery: [
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Skin consultation", duration: "30 min", price: "$120" },
      { title: "Medical facial", duration: "60 min", price: "$220" },
      { title: "Pigmentation programme", duration: "75 min", price: "$340" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        openingHours: "10:00 AM - 8:00 PM",
        sessions: [{ title: "Skin consultation" }, { title: "Medical facial" }],
      },
      {
        days: "Wed",
        openingHours: "10:00 AM - 3:00 PM",
        sessions: [{ title: "Pigmentation programme" }],
      },
    ],
  },
  "Calm Body Massage": {
    area: "Tanjong Pagar",
    address: "38 Tanjong Pagar Road, #02-01, Singapore 088461",
    phone: "+65 6221 4478",
    closingTime: "10:00 PM",
    description:
      "Calm Body Massage is a small studio offering relaxation, deep tissue and aromatherapy sessions. Therapists ask about pressure preference and any areas to avoid before starting, and adjust through the session rather than following a fixed routine. Evening and weekend slots are popular, so messaging ahead is the quickest way to secure a time.",
    gallery: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Relaxation massage", duration: "60 min", price: "$72" },
      { title: "Deep tissue", duration: "60 min", price: "$88" },
      { title: "Aromatherapy", duration: "90 min", price: "$128" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        openingHours: "11:00 AM - 10:00 PM",
        sessions: [{ title: "Relaxation massage" }, { title: "Deep tissue" }],
      },
      {
        days: "Sat-Sun",
        openingHours: "10:00 AM - 9:00 PM",
        sessions: [{ title: "Aromatherapy" }],
      },
    ],
  },
  "BrightSmile Dental": {
    area: "Toa Payoh",
    address: "480 Lorong 6 Toa Payoh, #05-08, Singapore 310480",
    phone: "+65 6255 3088",
    closingTime: "9:00 PM",
    description:
      "BrightSmile Dental is a family clinic that treats adults and children, with evening and weekend slots for working parents. New patients get a free first check-up and scaling, and the dentist talks through any recommended work with a clear estimate before booking it in. Reminders and simple follow-up questions can be handled over WhatsApp.",
    gallery: [
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Check-up & scaling", duration: "45 min", price: "$80" },
      { title: "Tooth filling", duration: "45 min", price: "$120" },
      { title: "Root canal treatment", duration: "90 min", price: "$420" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        openingHours: "9:00 AM - 9:00 PM",
        sessions: [{ title: "Check-up & scaling" }, { title: "Tooth filling" }],
      },
      {
        days: "Sat-Sun",
        openingHours: "9:00 AM - 4:00 PM",
        sessions: [{ title: "Check-up & scaling" }],
      },
    ],
  },
  "Orchard Dental Studio": {
    area: "Somerset",
    address: "111 Somerset Road, #03-18, Singapore 238164",
    phone: "+65 6735 9910",
    closingTime: "7:00 PM",
    description:
      "Orchard Dental Studio concentrates on hygiene and whitening for busy professionals. Appointments are kept to time, with scaling, polishing and whitening options explained before treatment so you know the cost upfront. The studio also offers a take-home whitening kit with a short fitting appointment for patients who prefer to whiten gradually.",
    gallery: [
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "Scaling & polishing", duration: "45 min", price: "$95" },
      { title: "Take-home whitening kit", duration: "30 min", price: "$180" },
      { title: "In-chair whitening", duration: "60 min", price: "$350" },
    ],
    timetable: [
      {
        days: "Mon, Wed & Fri",
        openingHours: "10:00 AM - 7:00 PM",
        sessions: [{ title: "Scaling & polishing" }],
      },
      {
        days: "Tue & Thu",
        openingHours: "10:00 AM - 8:00 PM",
        sessions: [{ title: "In-chair whitening" }, { title: "Take-home whitening kit" }],
      },
    ],
  },
  "Little Teeth Clinic": {
    area: "Novena",
    address: "8 Sinaran Drive, #02-16, Singapore 307470",
    phone: "+65 6397 7255",
    closingTime: "8:30 PM",
    description:
      "Little Teeth Clinic is set up for children, from first check-ups to fillings and sealants. Dentists use a tell-show-do approach so young patients know what to expect, and appointments are longer than usual to keep the visit relaxed. Parents can message the clinic about teething, thumb-sucking or nervous first visits before booking.",
    gallery: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=960&h=680&q=88",
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=960&h=680&q=88",
    ],
    rates: [
      { title: "First check-up", duration: "30 min", price: "$68" },
      { title: "Fluoride & sealant", duration: "45 min", price: "$110" },
      { title: "Kids filling", duration: "45 min", price: "$140" },
    ],
    timetable: [
      {
        days: "Mon-Fri",
        openingHours: "9:30 AM - 8:30 PM",
        sessions: [{ title: "First check-up" }, { title: "Kids filling" }],
      },
      {
        days: "Sat-Sun",
        openingHours: "9:00 AM - 3:00 PM",
        sessions: [{ title: "Fluoride & sealant" }],
      },
    ],
  },
}

export default function CoachingDetailPage({
  group = "Coaching",
}: {
  group?: DetailGroup
}) {
  const navigate = useNavigate()
  const { merchantName } = useParams()
  const merchant =
    directoryMerchants.find(
      (item) => item.group === group && item.name === merchantName,
    ) ?? directoryMerchants.find((item) => item.group === group)!
  const detail = { ...defaultDetail, ...detailsByMerchant[merchant.name] }
  const rateRange = formatRateRange(detail.rates, merchant.price)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [isGalleryPaused, setIsGalleryPaused] = useState(false)
  const [isGalleryDragging, setIsGalleryDragging] = useState(false)
  const [galleryDrag, setGalleryDrag] = useState(0)
  const galleryPointerRef = useRef<GalleryPointer | null>(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const phoneDigits = detail.phone.replace(/\D/g, "")
  const enquiryLabel = enquiryLabelByGroup[group]
  const ratesHeading =
    group === "Coaching" || group === "Education"
      ? "Classes & rates"
      : "Services & rates"
  const whatsappHref = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(`Hello ${merchant.name}, I would like to ask about your ${enquiryLabel}.`)}`

  useEffect(() => {
    setGalleryIndex(0)
  }, [merchant.name])

  useEffect(() => {
    if (
      isGalleryPaused ||
      detail.gallery.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }
    const interval = window.setInterval(() => {
      setGalleryIndex((current) => (current + 1) % detail.gallery.length)
    }, 4000)
    return () => window.clearInterval(interval)
  }, [detail.gallery.length, isGalleryPaused])

  const shareMerchant = async () => {
    const shareData = {
      title: merchant.name,
      text: `View ${merchant.name} on 24iFM`,
    }
    if (navigator.share) {
      await navigator.share(shareData)
      return
    }
    await navigator.clipboard?.writeText(window.location.href)
  }

  const finishGalleryDrag = (
    event: ReactPointerEvent<HTMLElement>,
  ) => {
    const pointer = galleryPointerRef.current
    if (!pointer || pointer.id !== event.pointerId) return
    const distance = event.clientX - pointer.startX
    if (Math.abs(distance) >= Math.min(48, pointer.width * 0.15)) {
      setGalleryIndex((current) =>
        distance < 0
          ? (current + 1) % detail.gallery.length
          : (current - 1 + detail.gallery.length) % detail.gallery.length,
      )
    }
    galleryPointerRef.current = null
    setGalleryDrag(0)
    setIsGalleryDragging(false)
    setIsGalleryPaused(false)
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  return (
    <main className="coaching-detail">
      <div
        className={`coaching-detail__floating-header${
          hasScrolled ? " is-solid" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back to services"
        >
          <HugeiconsIcon
            icon={ArrowLeft01Icon}
            size={21}
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>
        <span>
          <button
            type="button"
            aria-label={
              isSaved ? "Remove from saved services" : "Save service"
            }
            aria-pressed={isSaved}
            onClick={() => setIsSaved((saved) => !saved)}
          >
            <HugeiconsIcon
              icon={FavouriteIcon}
              size={20}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={shareMerchant}
            aria-label="Share service"
          >
            <HugeiconsIcon
              icon={MoreHorizontalIcon}
              size={21}
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
        </span>
      </div>
      <div
        className="coaching-detail__scroll"
        onScroll={(event) => setHasScrolled(event.currentTarget.scrollTop > 12)}
      >
        <section
          className="coaching-detail__gallery"
          aria-label={`${merchant.name} photo gallery`}
          onMouseEnter={() => setIsGalleryPaused(true)}
          onMouseLeave={() => setIsGalleryPaused(false)}
          onFocusCapture={() => setIsGalleryPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsGalleryPaused(false)
            }
          }}
          onPointerDown={(event) => {
            if (
              event.button !== 0 ||
              (event.target as HTMLElement).closest("button")
            ) {
              return
            }
            galleryPointerRef.current = {
              id: event.pointerId,
              startX: event.clientX,
              width: event.currentTarget.clientWidth,
            }
            setIsGalleryPaused(true)
            setIsGalleryDragging(true)
            event.currentTarget.setPointerCapture?.(event.pointerId)
          }}
          onPointerMove={(event) => {
            const pointer = galleryPointerRef.current
            if (!pointer || pointer.id !== event.pointerId) return
            setGalleryDrag(
              Math.max(
                -pointer.width,
                Math.min(pointer.width, event.clientX - pointer.startX),
              ),
            )
          }}
          onPointerUp={finishGalleryDrag}
          onPointerCancel={finishGalleryDrag}
        >
          <div
            className={`coaching-detail__gallery-track${
              isGalleryDragging ? " is-dragging" : ""
            }`}
            style={{
              transform: `translateX(calc(${-galleryIndex * 100}% + ${galleryDrag}px))`,
            }}
          >
            {detail.gallery.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={index === galleryIndex ? `${merchant.name} coaching` : ""}
                aria-hidden={index !== galleryIndex}
                draggable={false}
              />
            ))}
          </div>
          <div className="coaching-detail__gallery-shade" aria-hidden="true" />
          <button
            type="button"
            className="coaching-detail__gallery-count"
            onClick={() =>
              setGalleryIndex(
                (current) => (current + 1) % detail.gallery.length,
              )
            }
            aria-label={`Show next photo, ${galleryIndex + 1} of ${detail.gallery.length}`}
          >
            {galleryIndex + 1} / {detail.gallery.length}
          </button>
        </section>

        <div className="coaching-detail__body">
          <section
            className="coaching-detail__identity"
            aria-labelledby="coaching-detail-name"
          >
            <h1 id="coaching-detail-name">{merchant.name}</h1>
            <p>
              {merchant.category} · {detail.area} · {rateRange} per {merchant.unit}
            </p>
            <strong className={merchant.openNow ? "is-open" : ""}>
              {merchant.openNow ? "Open now" : "Closed now"} ·{" "}
              {merchant.openNow
                ? `closes ${detail.closingTime}`
                : "opens tomorrow"}
            </strong>
          </section>

          <section className="coaching-detail__actions" aria-label="Contact options">
            <a
              className="coaching-detail__whatsapp"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              <HugeiconsIcon
                icon={WhatsappIcon}
                size={18}
                strokeWidth={1.8}
                aria-hidden="true"
              />
              WhatsApp
            </a>
            <a
              className="coaching-detail__round-action"
              href={`tel:${phoneDigits}`}
              aria-label={`Call ${merchant.name}`}
            >
              <HugeiconsIcon
                icon={TelephoneIcon}
                size={18}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
            <a
              className="coaching-detail__round-action"
              href={`https://www.google.com/search?q=${encodeURIComponent(merchant.name)}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${merchant.name} website`}
            >
              <HugeiconsIcon
                icon={GlobeIcon}
                size={18}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
          </section>

          <section
            className="coaching-detail__section"
            aria-labelledby="coaching-detail-about"
          >
            <h2 id="coaching-detail-about">About {merchant.name}</h2>
            <p className={isExpanded ? "is-expanded" : undefined}>
              {detail.description}
            </p>
            <button
              type="button"
              onClick={() => setIsExpanded((expanded) => !expanded)}
            >
              {isExpanded ? "See less" : "See more"}
            </button>
          </section>

          <section
            className="coaching-detail__section coaching-detail__rates-section"
            aria-labelledby="coaching-detail-rates"
          >
            <h2 id="coaching-detail-rates">{ratesHeading}</h2>
            <div className="coaching-detail__rates">
              {detail.rates.map((rate) => (
                <div key={rate.title}>
                  <span>
                    {rate.title} · {rate.duration}
                  </span>
                  <strong>{rate.price}</strong>
                </div>
              ))}
            </div>
          </section>

          <section
            className="coaching-detail__section"
            aria-labelledby="coaching-detail-timetable"
          >
            <h2 id="coaching-detail-timetable">Weekly timetable</h2>
            <div className="coaching-detail__timetable">
              {detail.timetable.map((day) => (
                <div className="coaching-detail__timetable-day" key={day.days}>
                  <span>{day.days}</span>
                  <div>
                    {day.sessions.map((session, index) => (
                      <p key={`${day.days}-${session.title}`}>
                        <strong>{session.title}</strong>
                        {index === 0 && <time>{day.openingHours}</time>}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="coaching-detail__notice">
              Opening hours may vary. Message the{" "}
              {group === "Coaching" ? "coach" : "team"} to confirm a spot -
              booking is not handled here.
            </p>
          </section>

          <section
            className="coaching-detail__section coaching-detail__location-section"
            aria-labelledby="coaching-detail-location"
          >
            <h2 id="coaching-detail-location">Where they&apos;re based</h2>
            <div
              className="coaching-detail__map"
            >
              <iframe
                title={`Map for ${merchant.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(detail.address)}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <address>{detail.address}</address>
          </section>
        </div>
      </div>

      <footer className="coaching-detail__bottom-bar">
        <a href={whatsappHref} target="_blank" rel="noreferrer">
          <HugeiconsIcon
            icon={WhatsappIcon}
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
          />
          WhatsApp {merchant.name}
        </a>
      </footer>
    </main>
  )
}
