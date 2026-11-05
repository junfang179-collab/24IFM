import { HugeiconsIcon } from "@hugeicons/react"
import StyleTwoPageHeader from "./StyleTwoPageHeader"
import { SERVICE_ICON_GROUPS } from "./serviceIconCatalog"

const C = {
  surface: "#f7fbfd",
  navy: "#31536f",
  text: "#364b5d",
  blue: "#1c9dd7",
  blueSoft: "#e5f4fb",
  border: "#dbeaf2",
  gray: "#6b7787",
  white: "#ffffff",
}

const TOTAL_ICONS = SERVICE_ICON_GROUPS.reduce(
  (sum, group) => sum + group.items.length,
  0,
)

export default function ServiceIconsPage({ onBack }: { onBack: () => void }) {
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
      <StyleTwoPageHeader
        title="Service Icons"
        subtitle={`${TOTAL_ICONS} icons · ${SERVICE_ICON_GROUPS.length} categories`}
        onBack={onBack}
        backLabel="Back to Cleaning Service"
      />

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 12px 20px",
          scrollbarWidth: "none",
        }}
      >
        {SERVICE_ICON_GROUPS.map((group) => (
          <section
            key={group.service}
            style={{
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 15,
              padding: "12px 12px 13px",
              marginBottom: 10,
              boxShadow: "0 4px 13px rgba(34, 78, 110, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 16,
                  borderRadius: 2,
                  background: C.blue,
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontSize: 13,
                  fontWeight: 900,
                  color: C.navy,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {group.service}
              </div>
              <div
                style={{
                  flexShrink: 0,
                  padding: "2px 7px",
                  borderRadius: 999,
                  background: C.blueSoft,
                  color: C.blue,
                  fontSize: 9,
                  fontWeight: 900,
                }}
              >
                {group.items.length}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "9px 10px",
              }}
            >
              {group.items.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      width: 30,
                      height: 30,
                      minWidth: 30,
                      borderRadius: "50%",
                      background: C.blueSoft,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <HugeiconsIcon
                      icon={item.icon}
                      size={16}
                      color={C.blue}
                      strokeWidth={1.8}
                    />
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      lineHeight: 1.25,
                      fontWeight: 700,
                      color: C.text,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 2,
            color: C.gray,
            fontSize: 9,
          }}
        >
          Icons from the Hugeicons library
        </div>
      </main>
    </div>
  )
}
