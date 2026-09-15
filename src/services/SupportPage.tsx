import { useMemo, useState, type FormEvent, type ReactNode } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  BadgeQuestionMarkIcon,
  BubbleChatQuestionIcon,
  Calendar03Icon,
  CallIcon,
  CheckmarkCircle01Icon,
  CreditCardIcon,
  CustomerService01Icon,
  File02Icon,
  HeadphonesIcon,
  Search01Icon,
  Ticket01Icon,
  UserAccountIcon,
} from "@hugeicons/core-free-icons"
import StyleTwoPageHeader from "./StyleTwoPageHeader"
import ResidentBottomNav from "../components/ResidentBottomNav"

type View = "home" | "category" | "order" | "contact" | "chat"

type CategoryId = "booking" | "payment" | "service" | "account"

interface Props {
  onBack: () => void
  onOpenBookings: () => void
}

interface Category {
  id: CategoryId
  title: string
  description: string
  icon: IconSvgElement
  color: string
  surface: string
}

interface Article {
  id: string
  category: CategoryId
  title: string
  body: string
}

interface Message {
  id: number
  from: "support" | "customer"
  text: string
  time: string
}

const C = {
  primary: "#1c9dd7",
  primarySoft: "#eaf8fe",
  navy: "#16324f",
  text: "#314b62",
  muted: "#6b7f91",
  line: "#dcebf3",
  surface: "#f6fbfe",
  white: "#ffffff",
  success: "#16835c",
  successSoft: "#eaf8f2",
  orange: "#d98217",
  orangeSoft: "#fff5e6",
}

const CATEGORIES: Category[] = [
  {
    id: "booking",
    title: "Bookings & arrival",
    description: "Schedules, merchants, and arrivals",
    icon: Calendar03Icon,
    color: C.primary,
    surface: C.primarySoft,
  },
  {
    id: "payment",
    title: "Payment & pricing",
    description: "Prices, payments, and receipts",
    icon: CreditCardIcon,
    color: "#7c60b8",
    surface: "#f2effd",
  },
  {
    id: "service",
    title: "Service issue",
    description: "Help with an ongoing service",
    icon: CustomerService01Icon,
    color: C.orange,
    surface: C.orangeSoft,
  },
  {
    id: "account",
    title: "Account & safety",
    description: "Profile, privacy, and account access",
    icon: UserAccountIcon,
    color: C.success,
    surface: C.successSoft,
  },
]

const ARTICLES: Article[] = [
  {
    id: "merchant",
    category: "booking",
    title: "When will a merchant be assigned?",
    body: "After payment is secured, the platform starts matching a verified merchant. You can follow assignment and confirmation updates in Bookings.",
  },
  {
    id: "arrival",
    category: "booking",
    title: "How do priority arrival bookings work?",
    body: "A booking is marked as priority when its selected arrival window is within the service's configured urgent period. The priority arrival fee is shown before confirmation.",
  },
  {
    id: "reschedule",
    category: "booking",
    title: "Can I change my arrival time?",
    body: "Select the related booking and contact support. Changes depend on the merchant's confirmation status and the selected service window.",
  },
  {
    id: "price",
    category: "payment",
    title: "What is included in the final price?",
    body: "The confirmation screen shows the base service and all selected add-ons. A priority arrival fee is listed separately when it applies.",
  },
  {
    id: "receipt",
    category: "payment",
    title: "Where can I find my receipt?",
    body: "Completed bookings keep their payment summary and receipt in Bookings. Select the completed service to view the final details.",
  },
  {
    id: "quality",
    category: "service",
    title: "I need help during a service",
    body: "Open the related booking to check its latest status, then start a support message. Include the booking reference so the team can review the service context.",
  },
  {
    id: "provider",
    category: "service",
    title: "Who is coming to my home?",
    body: "Once the merchant assigns a professional, their arrival stage appears in your booking timeline. Merchant and professional updates are kept together in Bookings.",
  },
  {
    id: "account",
    category: "account",
    title: "How is my booking information protected?",
    body: "Your booking details are only used to manage the requested service, assignment, payment record, and support request.",
  },
  {
    id: "address",
    category: "booking",
    title: "Can I update my service address?",
    body: "Contact support before the merchant confirms your booking. Changes after confirmation may require the service to be reassigned.",
  },
  {
    id: "extras",
    category: "booking",
    title: "Can I add extras after I place a booking?",
    body: "Extra services can be reviewed with the assigned merchant. Any approved change is shown in the booking summary before work begins.",
  },
  {
    id: "merchant-cancel",
    category: "booking",
    title: "What happens if a merchant cannot take my booking?",
    body: "The platform will continue matching another verified merchant and your booking status will update in Bookings.",
  },
  {
    id: "payment-method",
    category: "payment",
    title: "Which payment methods can I use?",
    body: "Available payment methods are shown securely during checkout. Your selected method is charged only after you confirm the booking.",
  },
  {
    id: "refund",
    category: "payment",
    title: "When will I receive a refund?",
    body: "Eligible refunds are returned to the original payment method. Processing times can vary depending on your bank or payment provider.",
  },
  {
    id: "priority-refund",
    category: "payment",
    title: "Is the priority arrival fee refundable?",
    body: "The priority arrival fee is listed separately in your booking total. Support can review it when an eligible booking is changed or cancelled.",
  },
  {
    id: "preparation",
    category: "service",
    title: "How should I prepare before the professional arrives?",
    body: "Keep the service area accessible and share any relevant entry details. You can add special notes when you place the booking.",
  },
  {
    id: "different-professional",
    category: "service",
    title: "Can I request a different professional?",
    body: "If you have a concern before the visit starts, contact support with the booking reference. The team will review available options with the merchant.",
  },
  {
    id: "damage",
    category: "service",
    title: "How do I report a service issue or damage?",
    body: "Open a support request as soon as possible and include clear details and photos where relevant. The support team will review the booking context.",
  },
  {
    id: "notifications",
    category: "account",
    title: "How do I manage booking notifications?",
    body: "Booking updates are sent when the merchant or professional status changes. Notification preferences can be adjusted from your account settings.",
  },
  {
    id: "delete-account",
    category: "account",
    title: "How can I request account deletion?",
    body: "Contact support from your registered account. We will explain which booking and payment records must be retained before the request is completed.",
  },
]

const RECENT_BOOKING = {
  id: "IFM-260815-104",
  service: "Deep Cleaning",
  date: "Today, 15 Aug",
  arrival: "Within 120 minutes",
  status: "Finding merchant",
}

function topicForCategory(category: Category) {
  return category.id === "booking" ? "Booking & arrival" : category.title
}

function Icon({
  icon,
  size = 20,
  color = C.primary,
}: {
  icon: IconSvgElement
  size?: number
  color?: string
}) {
  return (
    <HugeiconsIcon icon={icon} size={size} color={color} strokeWidth={1.8} />
  )
}

function BackHeader({
  title,
  onBack,
  trailing,
}: {
  title: string
  onBack: () => void
  trailing?: ReactNode
}) {
  return (
    <StyleTwoPageHeader title={title} onBack={onBack} trailing={trailing} />
  )
}

function BottomNav({
  onHome,
  onBookings,
}: {
  onHome: () => void
  onBookings: () => void
}) {
  return (
    <ResidentBottomNav
      active="support"
      onHome={onHome}
      onBookings={onBookings}
    />
  )
}

function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string
  action?: string
  onAction?: () => void
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 9,
      }}
    >
      <h2 style={{ margin: 0, color: C.navy, fontSize: 14, fontWeight: 900 }}>
        {title}
      </h2>
      {action && (
        <button
          type="button"
          onClick={onAction}
          style={{
            border: "none",
            padding: "4px 0",
            background: "transparent",
            color: C.primary,
            fontSize: 9,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          {action}
        </button>
      )}
    </div>
  )
}

function RecentBookingCard({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Get help with your Deep Cleaning booking"
      style={{
        width: "100%",
        padding: 12,
        border: `1px solid ${C.line}`,
        borderRadius: 14,
        background: C.white,
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        boxShadow: "0 4px 13px rgba(34, 78, 110, 0.06)",
      }}
    >
      <span
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          display: "grid",
          placeItems: "center",
          background: C.primarySoft,
          flexShrink: 0,
        }}
      >
        <Icon icon={Ticket01Icon} size={20} />
      </span>
      <span style={{ minWidth: 0, flex: 1 }}>
        <span
          style={{
            display: "block",
            color: C.navy,
            fontSize: 12,
            fontWeight: 900,
          }}
        >
          {RECENT_BOOKING.service}
        </span>
        <span
          style={{
            display: "block",
            marginTop: 3,
            color: C.muted,
            fontSize: 10,
            fontWeight: 700,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {RECENT_BOOKING.date} | {RECENT_BOOKING.arrival}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            marginTop: 6,
            color: C.orange,
            fontSize: 10,
            fontWeight: 800,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: C.orange,
            }}
          />
          {RECENT_BOOKING.status}
        </span>
      </span>
    </button>
  )
}

function ArticleRow({
  article,
  open,
  onToggle,
}: {
  article: Article
  open: boolean
  onToggle: () => void
}) {
  return (
    <article
      style={{
        overflow: "hidden",
        border: `1px solid ${C.line}`,
        borderRadius: 12,
        background: C.white,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: "100%",
          minHeight: 50,
          padding: "11px",
          border: "none",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          gap: 9,
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            width: 25,
            height: 25,
            borderRadius: 8,
            display: "grid",
            placeItems: "center",
            background: C.primarySoft,
            flexShrink: 0,
          }}
        >
          <Icon icon={BadgeQuestionMarkIcon} size={15} />
        </span>
        <span
          style={{
            flex: 1,
            color: C.text,
            fontSize: 11,
            fontWeight: 800,
            lineHeight: 1.35,
          }}
        >
          {article.title}
        </span>
        <span
          style={{
            color: C.primary,
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {open ? "-" : "+"}
        </span>
      </button>
      {open && (
        <p
          style={{
            margin: "0 11px 12px 45px",
            color: C.muted,
            fontSize: 11,
            fontWeight: 600,
            lineHeight: 1.55,
          }}
        >
          {article.body}
        </p>
      )}
    </article>
  )
}

function SupportTwoHome({
  onBack,
  onHome,
  onBookings,
}: {
  onBack: () => void
  onHome: () => void
  onBookings: () => void
}) {
  const [query, setQuery] = useState("")
  const [openArticle, setOpenArticle] = useState<string | null>(null)
  const normalizedQuery = query.trim().toLowerCase()
  const displayedArticles = useMemo(
    () =>
      normalizedQuery
        ? ARTICLES.filter((article) =>
            `${article.title} ${article.body}`
              .toLowerCase()
              .includes(normalizedQuery),
          )
        : ARTICLES,
    [normalizedQuery],
  )

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <BackHeader title="Support" onBack={onBack} />
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 12px 22px",
          scrollbarWidth: "none",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            minHeight: 43,
            padding: "0 11px",
            border: `1px solid ${C.line}`,
            borderRadius: 11,
            background: C.white,
            boxShadow: "0 3px 10px rgba(34, 78, 110, 0.04)",
          }}
        >
          <Icon icon={Search01Icon} size={18} color={C.muted} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search popular questions"
            placeholder="Search popular questions"
            style={{
              width: "100%",
              minWidth: 0,
              border: "none",
              outline: "none",
              background: "transparent",
              color: C.navy,
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "inherit",
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear popular question search"
              style={{
                border: "none",
                background: "transparent",
                color: C.primary,
                fontSize: 10,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          )}
        </label>

        <section style={{ marginTop: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <h1
              style={{
                margin: 0,
                color: C.navy,
                fontSize: 15,
                fontWeight: 900,
              }}
            >
              Popular questions
            </h1>
            <span style={{ color: C.muted, fontSize: 10, fontWeight: 800 }}>
              {normalizedQuery
                ? `${displayedArticles.length} found`
                : `${ARTICLES.length} questions`}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {displayedArticles.length > 0 ? (
              displayedArticles.map((article) => (
                <ArticleRow
                  key={article.id}
                  article={article}
                  open={openArticle === article.id}
                  onToggle={() =>
                    setOpenArticle((current) =>
                      current === article.id ? null : article.id,
                    )
                  }
                />
              ))
            ) : (
              <div
                style={{
                  padding: "20px 12px",
                  border: `1px solid ${C.line}`,
                  borderRadius: 13,
                  background: C.white,
                  textAlign: "center",
                  color: C.muted,
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                No popular questions matched your search.
              </div>
            )}
          </div>
        </section>
      </main>
      <BottomNav onHome={onHome} onBookings={onBookings} />
    </div>
  )
}

function CategoryPage({
  category,
  onBack,
  onContact,
}: {
  category: Category
  onBack: () => void
  onContact: () => void
}) {
  const [openArticle, setOpenArticle] = useState<string | null>(null)
  const articles = ARTICLES.filter(
    (article) => article.category === category.id,
  )
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <BackHeader title={category.title} onBack={onBack} />
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "4px 12px 22px",
          scrollbarWidth: "none",
        }}
      >
        <section
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            padding: 13,
            borderRadius: 15,
            border: `1px solid ${C.line}`,
            background: C.white,
          }}
        >
          <span
            style={{
              width: 42,
              height: 42,
              borderRadius: 13,
              background: category.surface,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <Icon icon={category.icon} size={22} color={category.color} />
          </span>
          <div>
            <div style={{ color: C.navy, fontSize: 14, fontWeight: 900 }}>
              {category.title}
            </div>
            <div
              style={{
                marginTop: 4,
                color: C.muted,
                fontSize: 10,
                fontWeight: 700,
                lineHeight: 1.4,
              }}
            >
              {category.description}
            </div>
          </div>
        </section>
        <section style={{ marginTop: 17 }}>
          <SectionTitle title="Common answers" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {articles.map((article) => (
              <ArticleRow
                key={article.id}
                article={article}
                open={openArticle === article.id}
                onToggle={() =>
                  setOpenArticle((current) =>
                    current === article.id ? null : article.id,
                  )
                }
              />
            ))}
          </div>
        </section>
        <section
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 18,
            padding: 13,
            borderRadius: 14,
            background: C.primarySoft,
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 11,
              display: "grid",
              placeItems: "center",
              background: C.white,
            }}
          >
            <Icon icon={HeadphonesIcon} size={18} />
          </span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ color: C.navy, fontSize: 12, fontWeight: 900 }}>
              Still need help?
            </div>
            <div
              style={{
                marginTop: 3,
                color: C.text,
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              Send the team the details of your issue.
            </div>
          </div>
          <button
            type="button"
            onClick={onContact}
            style={{
              minHeight: 36,
              padding: "0 11px",
              border: "none",
              borderRadius: 9,
              background: C.primary,
              color: C.white,
              fontSize: 10,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Contact us
          </button>
        </section>
      </main>
    </div>
  )
}

function OrderHelp({
  onBack,
  onContact,
  onBookings,
}: {
  onBack: () => void
  onContact: (topic: string) => void
  onBookings: () => void
}) {
  const [issue, setIssue] = useState("Where is my merchant?")
  const issues = [
    "Where is my merchant?",
    "Change my arrival time",
    "Cancel this booking",
    "Something else",
  ]
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <BackHeader title="Booking help" onBack={onBack} />
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "4px 12px 22px",
          scrollbarWidth: "none",
        }}
      >
        <section
          style={{
            padding: 13,
            border: `1px solid ${C.line}`,
            borderRadius: 15,
            background: C.white,
            boxShadow: "0 4px 13px rgba(34, 78, 110, 0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: 11,
                display: "grid",
                placeItems: "center",
                background: C.primarySoft,
              }}
            >
              <Icon icon={Ticket01Icon} size={18} />
            </span>
            <div>
              <div style={{ color: C.navy, fontSize: 14, fontWeight: 900 }}>
                {RECENT_BOOKING.service}
              </div>
              <div
                style={{
                  marginTop: 3,
                  color: C.muted,
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                {RECENT_BOOKING.status}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginTop: 13,
              paddingTop: 12,
              borderTop: `1px solid ${C.line}`,
            }}
          >
            <div>
              <div style={{ color: C.muted, fontSize: 9, fontWeight: 800 }}>
                SCHEDULE
              </div>
              <div
                style={{
                  marginTop: 4,
                  color: C.text,
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                {RECENT_BOOKING.date}
              </div>
            </div>
            <div>
              <div style={{ color: C.muted, fontSize: 9, fontWeight: 800 }}>
                ARRIVAL
              </div>
              <div
                style={{
                  marginTop: 4,
                  color: C.text,
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                {RECENT_BOOKING.arrival}
              </div>
            </div>
          </div>
        </section>
        <section style={{ marginTop: 18 }}>
          <SectionTitle title="What do you need help with?" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {issues.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setIssue(item)}
                style={{
                  minHeight: 48,
                  padding: "0 12px",
                  border: `1px solid ${issue === item ? C.primary : C.line}`,
                  borderRadius: 12,
                  background: issue === item ? C.primarySoft : C.white,
                  color: issue === item ? C.navy : C.text,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 800 }}>{item}</span>
                {issue === item && (
                  <Icon icon={CheckmarkCircle01Icon} size={18} />
                )}
              </button>
            ))}
          </div>
        </section>
        <button
          type="button"
          onClick={() => onContact(issue)}
          style={{
            width: "100%",
            minHeight: 46,
            marginTop: 18,
            border: "none",
            borderRadius: 12,
            background: C.primary,
            color: C.white,
            fontSize: 11,
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          Continue to support
        </button>
        <button
          type="button"
          onClick={onBookings}
          style={{
            width: "100%",
            minHeight: 38,
            marginTop: 8,
            border: "none",
            background: "transparent",
            color: C.primary,
            fontSize: 10,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          View booking status
        </button>
      </main>
    </div>
  )
}

function ContactPage({
  topic,
  onBack,
  onChat,
}: {
  topic: string
  onBack: () => void
  onChat: () => void
}) {
  const [selectedTopic, setSelectedTopic] = useState(topic)
  const [details, setDetails] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const topics = [
    "Booking & arrival",
    "Payment & pricing",
    "Service issue",
    "Account & safety",
  ]
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <BackHeader title="Contact support" onBack={onBack} />
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "4px 12px 22px",
          scrollbarWidth: "none",
        }}
      >
        {submitted ? (
          <section
            style={{
              padding: 18,
              border: `1px solid #c9eedf`,
              borderRadius: 15,
              background: C.successSoft,
              textAlign: "center",
            }}
          >
            <span
              style={{
                width: 48,
                height: 48,
                margin: "0 auto",
                borderRadius: 16,
                display: "grid",
                placeItems: "center",
                background: C.white,
              }}
            >
              <Icon icon={CheckmarkCircle01Icon} size={25} color={C.success} />
            </span>
            <h1
              style={{
                margin: "12px 0 0",
                color: C.navy,
                fontSize: 15,
                fontWeight: 900,
              }}
            >
              Support request created
            </h1>
            <p
              style={{
                margin: "6px 0 0",
                color: C.text,
                fontSize: 11,
                fontWeight: 700,
                lineHeight: 1.5,
              }}
            >
              Reference SPT-260815-12. The team will post any updates in this
              support thread.
            </p>
            <button
              type="button"
              onClick={onChat}
              style={{
                width: "100%",
                minHeight: 44,
                marginTop: 14,
                border: "none",
                borderRadius: 11,
                background: C.primary,
                color: C.white,
                fontSize: 11,
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Open live message
            </button>
          </section>
        ) : (
          <form onSubmit={submit}>
            <section
              style={{
                padding: 13,
                border: `1px solid ${C.line}`,
                borderRadius: 15,
                background: C.white,
              }}
            >
              <div style={{ color: C.navy, fontSize: 13, fontWeight: 900 }}>
                Tell us what happened
              </div>
              <p
                style={{
                  margin: "5px 0 0",
                  color: C.muted,
                  fontSize: 10,
                  fontWeight: 700,
                  lineHeight: 1.45,
                }}
              >
                Include enough detail for the team to review your service
                context.
              </p>
              <label
                style={{
                  display: "block",
                  marginTop: 15,
                  color: C.text,
                  fontSize: 10,
                  fontWeight: 900,
                }}
              >
                Related booking
                <select
                  defaultValue={RECENT_BOOKING.id}
                  aria-label="Related booking"
                  style={{
                    width: "100%",
                    minHeight: 44,
                    marginTop: 6,
                    padding: "0 10px",
                    border: `1px solid ${C.line}`,
                    borderRadius: 10,
                    background: C.surface,
                    color: C.text,
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "inherit",
                  }}
                >
                  <option value={RECENT_BOOKING.id}>
                    Deep Cleaning | {RECENT_BOOKING.id}
                  </option>
                  <option value="IFM-260815-088">
                    General Pest Treatment | IFM-260815-088
                  </option>
                  <option value="general">No related booking</option>
                </select>
              </label>
              <div
                style={{
                  marginTop: 15,
                  color: C.text,
                  fontSize: 9,
                  fontWeight: 900,
                }}
              >
                Topic
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 7,
                  marginTop: 7,
                }}
              >
                {topics.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedTopic(item)}
                    style={{
                      minHeight: 30,
                      padding: "0 9px",
                      border: `1px solid ${
                        selectedTopic === item ? C.primary : C.line
                      }`,
                      borderRadius: 9,
                      background:
                        selectedTopic === item ? C.primarySoft : C.white,
                      color: selectedTopic === item ? C.primary : C.text,
                      fontSize: 9,
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <label
                style={{
                  display: "block",
                  marginTop: 15,
                  color: C.text,
                  fontSize: 9,
                  fontWeight: 900,
                }}
              >
                Details
                <textarea
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  required
                  placeholder="Describe the issue or question"
                  aria-label="Support request details"
                  style={{
                    width: "100%",
                    minHeight: 100,
                    resize: "vertical",
                    marginTop: 6,
                    padding: 10,
                    boxSizing: "border-box",
                    border: `1px solid ${C.line}`,
                    borderRadius: 10,
                    outlineColor: C.primary,
                    background: C.surface,
                    color: C.navy,
                    fontSize: 10,
                    fontWeight: 600,
                    lineHeight: 1.45,
                    fontFamily: "inherit",
                  }}
                />
              </label>
            </section>
            <button
              type="submit"
              style={{
                width: "100%",
                minHeight: 46,
                marginTop: 14,
                border: "none",
                borderRadius: 12,
                background: C.primary,
                color: C.white,
                fontSize: 11,
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Submit support request
            </button>
            <button
              type="button"
              onClick={onChat}
              style={{
                width: "100%",
                minHeight: 40,
                marginTop: 8,
                border: "none",
                background: "transparent",
                color: C.primary,
                fontSize: 10,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Prefer a quicker reply? Start a live message
            </button>
          </form>
        )}
      </main>
    </div>
  )
}

function ChatPage({
  onBack,
  onContact,
}: {
  onBack: () => void
  onContact: () => void
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "support",
      text: "Hi, I am the service support assistant. What can I help you with today?",
      time: "Now",
    },
  ])
  const [draft, setDraft] = useState("")
  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages((current) => [
      ...current,
      { id: Date.now(), from: "customer", text, time: "Now" },
      {
        id: Date.now() + 1,
        from: "support",
        text: "Thanks. I have added this to your support context. A team member can review the related booking next.",
        time: "Now",
      },
    ])
    setDraft("")
  }
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.surface,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <BackHeader title="Live message" onBack={onBack} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          margin: "0 12px 10px",
          padding: "8px 10px",
          borderRadius: 11,
          background: C.successSoft,
          color: C.success,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: C.success,
          }}
        />
        <span style={{ fontSize: 9, fontWeight: 800 }}>
          Support assistant is online
        </span>
      </div>
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "4px 12px 15px",
          display: "flex",
          flexDirection: "column",
          gap: 9,
          scrollbarWidth: "none",
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: "flex",
              justifyContent:
                message.from === "customer" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "81%",
                padding: "10px 11px",
                borderRadius:
                  message.from === "customer"
                    ? "12px 12px 3px 12px"
                    : "12px 12px 12px 3px",
                background: message.from === "customer" ? C.primary : C.white,
                border:
                  message.from === "customer" ? "none" : `1px solid ${C.line}`,
                color: message.from === "customer" ? C.white : C.text,
                fontSize: 10,
                fontWeight: 700,
                lineHeight: 1.45,
                boxShadow:
                  message.from === "customer"
                    ? "none"
                    : "0 3px 8px rgba(34, 78, 110, 0.04)",
              }}
            >
              <div>{message.text}</div>
              <div
                style={{
                  marginTop: 4,
                  color: message.from === "customer" ? "#d8f3ff" : C.muted,
                  fontSize: 8,
                  fontWeight: 700,
                }}
              >
                {message.time}
              </div>
            </div>
          </div>
        ))}
      </main>
      <div
        style={{
          flexShrink: 0,
          padding: "10px 12px 12px",
          borderTop: `1px solid ${C.line}`,
          background: C.white,
        }}
      >
        <form
          onSubmit={send}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label="Message support"
            placeholder="Write a message"
            style={{
              minWidth: 0,
              flex: 1,
              minHeight: 40,
              padding: "0 11px",
              border: `1px solid ${C.line}`,
              borderRadius: 11,
              outlineColor: C.primary,
              background: C.surface,
              color: C.navy,
              fontSize: 10,
              fontWeight: 700,
              fontFamily: "inherit",
            }}
          />
          <button
            type="submit"
            aria-label="Send message"
            style={{
              minWidth: 52,
              height: 40,
              padding: "0 11px",
              border: "none",
              borderRadius: 11,
              background: C.primary,
              color: C.white,
              fontSize: 10,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </form>
        <button
          type="button"
          onClick={onContact}
          style={{
            width: "100%",
            minHeight: 30,
            marginTop: 6,
            border: "none",
            background: "transparent",
            color: C.primary,
            fontSize: 9,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Leave a detailed support request
        </button>
      </div>
    </div>
  )
}

export default function SupportPage({ onBack, onOpenBookings }: Props) {
  const [view, setView] = useState<View>("home")
  const [category, setCategory] = useState<Category>(CATEGORIES[0])
  const [requestTopic, setRequestTopic] = useState("Booking & arrival")

  const openCategory = (nextCategory: Category) => {
    setCategory(nextCategory)
    setRequestTopic(topicForCategory(nextCategory))
    setView("category")
  }

  if (view === "category")
    return (
      <CategoryPage
        category={category}
        onBack={() => setView("home")}
        onContact={() => setView("contact")}
      />
    )
  if (view === "order")
    return (
      <OrderHelp
        onBack={() => setView("home")}
        onContact={(topic) => {
          setRequestTopic(topic)
          setView("contact")
        }}
        onBookings={onOpenBookings}
      />
    )
  if (view === "contact")
    return (
      <ContactPage
        topic={requestTopic}
        onBack={() => setView("home")}
        onChat={() => setView("chat")}
      />
    )
  if (view === "chat")
    return (
      <ChatPage
        onBack={() => setView("home")}
        onContact={() => setView("contact")}
      />
    )

  return (
    <SupportTwoHome
      onBack={onBack}
      onHome={onBack}
      onBookings={onOpenBookings}
    />
  )
}
