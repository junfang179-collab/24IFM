import { MemoryRouter, Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import CoachingListPage from "./pages/CoachingListPage"
import CoachingDetailPage from "./pages/CoachingDetailPage"
import SwimmingDetailPage from "./pages/SwimmingDetailPage"
import SwimmingListPage from "./pages/SwimmingListPage"
import EducationListPage from "./pages/EducationListPage"
import "./life-style-flow.css"

interface LifeStylePageProps {
  onBack?: () => void
  initialPath?: string
  initialStyle?: string
}

export default function LifeStylePage({ onBack, initialPath, initialStyle }: LifeStylePageProps) {
  const entry = initialPath?.startsWith("/") ? initialPath : "/"
  return (
    <div className="life-style-flow">
      <MemoryRouter initialEntries={[entry]}>
        <Routes>
          <Route path="/" element={<HomePage onBack={onBack} initialStyle={initialStyle} />} />
          <Route path="/coaching" element={<CoachingListPage />} />
          <Route
            path="/coaching/:merchantName"
            element={<CoachingDetailPage group="Coaching" />}
          />
          <Route path="/swimming" element={<SwimmingListPage />} />
          <Route path="/swimming/:serviceId" element={<SwimmingDetailPage />} />
          <Route path="/education" element={<EducationListPage />} />
          <Route
            path="/education/:merchantName"
            element={<CoachingDetailPage group="Education" />}
          />
          <Route
            path="/pet-care/:merchantName"
            element={<CoachingDetailPage group="Pet care" />}
          />
          <Route
            path="/beauty-wellness/:merchantName"
            element={<CoachingDetailPage group="Beauty & wellness" />}
          />
          <Route
            path="/health/:merchantName"
            element={<CoachingDetailPage group="Health" />}
          />
        </Routes>
      </MemoryRouter>
    </div>
  )
}
