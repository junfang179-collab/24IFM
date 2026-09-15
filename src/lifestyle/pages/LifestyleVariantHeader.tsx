import { type CSSProperties } from "react"
import { LifestyleGeneratedHeader } from "../imports/Container"
import StyleSwitcher from "./StyleSwitcher"

interface LifestyleVariantHeaderProps {
  onBack?: () => void
  selectedStyle: string
  onStyleChange: (style: string) => void
  styleScale: number
}

export default function LifestyleVariantHeader({
  onBack,
  selectedStyle,
  onStyleChange,
  styleScale,
}: LifestyleVariantHeaderProps) {
  const headerHeight = 200 * styleScale
  const headerStyle = {
    height: `${headerHeight}px`,
    flex: `0 0 ${headerHeight}px`,
  } as CSSProperties

  return (
    <header className="lifestyle-variant-header" style={headerStyle}>
      <div
        className="lifestyle-variant-header__artboard"
        style={{ transform: `scale(${styleScale})` }}
      >
        <LifestyleGeneratedHeader />
        <button
          type="button"
          className="lifestyle-variant-header__back"
          onClick={onBack}
          aria-label="Back to resident home"
        />
        <StyleSwitcher value={selectedStyle} onChange={onStyleChange} />
      </div>
    </header>
  )
}
