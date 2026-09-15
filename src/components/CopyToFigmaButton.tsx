import { useEffect, useRef, useState } from "react"

const CAPTURE_SCRIPT_SRC = "/capture.js"
const CAPTURE_SELECTOR = ".figma-capture-root"

type CaptureResult = {
  success?: boolean
  error?: string
}

type FigmaCaptureApi = {
  captureForDesign?: (options: {
    selector: string
    extractSourceData?: boolean
    verbose?: boolean
  }) => Promise<CaptureResult>
}

declare global {
  interface Window {
    figma?: FigmaCaptureApi
  }
}

let captureScriptPromise: Promise<void> | null = null

function copyHtmlWithExecCommand(html: string) {
  return new Promise<void>((resolve, reject) => {
    const onCopy = (event: ClipboardEvent) => {
      if (!event.clipboardData) {
        reject(new Error("Clipboard data is unavailable."))
        return
      }

      event.preventDefault()
      event.clipboardData.setData("text/html", html)
      event.clipboardData.setData("text/plain", "24iFM Figma payload")
    }

    document.addEventListener("copy", onCopy)

    try {
      const copied = document.execCommand("copy")
      if (!copied) {
        reject(new Error("Browser blocked the copy command."))
      } else {
        resolve()
      }
    } catch (error) {
      reject(error)
    } finally {
      document.removeEventListener("copy", onCopy)
    }
  })
}

function installClipboardBridge() {
  if (!navigator.clipboard) {
    throw new Error("Clipboard access is unavailable.")
  }

  let resolveCopied: (() => void) | null = null
  let rejectCopied: ((error: unknown) => void) | null = null
  const copied = new Promise<void>((resolve, reject) => {
    resolveCopied = resolve
    rejectCopied = reject
  })

  const clipboard = navigator.clipboard as Clipboard & {
    write: (items: ClipboardItems) => Promise<void>
    writeText: (text: string) => Promise<void>
  }
  const originalWrite = clipboard.write.bind(clipboard)
  const originalWriteText = clipboard.writeText.bind(clipboard)

  clipboard.write = async (items: ClipboardItems) => {
    let html = ""
    let plain = ""

    for (const item of items) {
      if (item.types.includes("text/html")) {
        html = await (await item.getType("text/html")).text()
      }
      if (item.types.includes("text/plain")) {
        plain = await (await item.getType("text/plain")).text()
      }
    }

    try {
      await copyHtmlWithExecCommand(html || plain)
      resolveCopied?.()
    } catch (error) {
      rejectCopied?.(error)
      throw error
    }
  }

  clipboard.writeText = async (text: string) => {
    try {
      await copyHtmlWithExecCommand(text)
      resolveCopied?.()
    } catch (error) {
      rejectCopied?.(error)
      throw error
    }
  }

  return {
    copied,
    restore: () => {
      clipboard.write = originalWrite
      clipboard.writeText = originalWriteText
    },
  }
}

function ensureCaptureScript() {
  if (window.figma?.captureForDesign) {
    return Promise.resolve()
  }

  if (captureScriptPromise) {
    return captureScriptPromise
  }

  captureScriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.src = `${CAPTURE_SCRIPT_SRC}?v=${Date.now()}`
    script.async = true
    script.addEventListener("load", () => {
      if (window.figma?.captureForDesign) {
        resolve()
      } else {
        reject(new Error("Figma capture is not available on this page."))
      }
    })
    script.addEventListener("error", () => {
      reject(new Error("Failed to load the Figma capture script."))
    })
    document.head.appendChild(script)
  })

  return captureScriptPromise
}

export default function CopyToFigmaButton() {
  const [status, setStatus] =
    useState<"idle" | "copying" | "copied" | "failed">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const resetTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current)
      }
    }
  }, [])

  const showIdleAfterDelay = () => {
    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current)
    }
    resetTimer.current = window.setTimeout(() => {
      setStatus("idle")
      setErrorMessage("")
    }, 1800)
  }

  const handleCopy = async () => {
    if (status === "copying") return

    setStatus("copying")
    setErrorMessage("")

    let restoreClipboardBridge: (() => void) | null = null

    try {
      await ensureCaptureScript()
      if (!window.figma?.captureForDesign) {
        throw new Error("Figma capture is not available on this page.")
      }

      const clipboardBridge = installClipboardBridge()
      restoreClipboardBridge = clipboardBridge.restore
      const captureResultPromise = window.figma.captureForDesign({
        selector: CAPTURE_SELECTOR,
        extractSourceData: false,
        verbose: true,
      })

      void captureResultPromise.catch(() => undefined)

      await Promise.race([
        clipboardBridge.copied,
        captureResultPromise.then((result) => {
          if (result?.success === false) {
            throw new Error(result.error || "Figma copy failed.")
          }
        }),
      ])

      setStatus("copied")
      showIdleAfterDelay()
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      setStatus("failed")
      setErrorMessage(message)
      showIdleAfterDelay()
    } finally {
      restoreClipboardBridge?.()
    }
  }

  const label =
    status === "copying"
      ? "Copying..."
      : status === "copied"
        ? "Copied"
        : status === "failed"
          ? "Copy failed"
          : "Copy"

  return (
    <button
      className="copy-float"
      type="button"
      onClick={handleCopy}
      disabled={status === "copying"}
      aria-label="Copy current screen to Figma"
      title={
        errorMessage || "Copy the current screen and paste it into Figma Design"
      }
    >
      {status === "copied" ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12l4.5 4.5L19 7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="8" y="8" width="11" height="11" rx="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
      )}
      <span>{label}</span>
    </button>
  )
}
