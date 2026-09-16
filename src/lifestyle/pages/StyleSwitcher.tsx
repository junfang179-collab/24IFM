export const styleOptions = ["Style 5"] as const

interface StyleSwitcherProps {
  value: string
  onChange: (style: string) => void
}

export default function StyleSwitcher({ value, onChange }: StyleSwitcherProps) {
  void onChange

  return (
    <div className="lifestyle-style-switcher">
      <div
        aria-label={`Page style: ${value}`}
        className="lifestyle-style-trigger lifestyle-style-trigger--static"
      >
        <strong>{value}</strong>
      </div>
    </div>
  )
}
