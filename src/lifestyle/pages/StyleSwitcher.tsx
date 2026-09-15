import { useEffect, useRef, useState } from "react"

export const styleOptions = [
  "Style 1",
  "Style 2",
  "Style 3",
  "Style 4",
  "Style 5",
] as const

interface StyleSwitcherProps {
  value: string
  onChange: (style: string) => void
}

export default function StyleSwitcher({ value, onChange }: StyleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const switcherRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeWhenOutside = (event: PointerEvent) => {
      if (!switcherRef.current?.contains(event.target as Node)) setIsOpen(false)
    }
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }

    document.addEventListener("pointerdown", closeWhenOutside)
    document.addEventListener("keydown", closeWithEscape)
    return () => {
      document.removeEventListener("pointerdown", closeWhenOutside)
      document.removeEventListener("keydown", closeWithEscape)
    }
  }, [])

  return (
    <div className="lifestyle-style-switcher" ref={switcherRef}>
      <button
        aria-controls="lifestyle-style-menu"
        aria-expanded={isOpen}
        aria-label={`Switch page style, currently ${value}`}
        className="lifestyle-style-trigger"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <strong>{value}</strong>
        <svg aria-hidden="true" viewBox="0 0 16 16">
          <path d="m3 6 5 5 5-5" />
        </svg>
      </button>
      {isOpen && (
        <div
          className="lifestyle-style-menu"
          id="lifestyle-style-menu"
          role="menu"
          aria-label="Switch page style"
        >
          {styleOptions.map((style) => (
            <button
              aria-checked={style === value}
              className={style === value ? "is-selected" : undefined}
              key={style}
              onClick={() => {
                onChange(style)
                setIsOpen(false)
              }}
              role="menuitemradio"
              type="button"
            >
              {style === value && <span aria-hidden="true">✓</span>}
              {style}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
