import { useState, useCallback } from 'react'
import { useLenis } from './hooks/useLenis'
import { LoadingScreen } from './components/layout/LoadingScreen'
import { FilmGrain } from './components/layout/FilmGrain'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { SectionDivider } from './components/layout/SectionDivider'
import { CursorGlow } from './components/layout/CursorGlow'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HeroPortal } from './components/hero/HeroPortal'
import { RealmsSection } from './components/realms/RealmsSection'
import { InkkeepersSection } from './components/inkkeepers/InkkeepersSection'
import { CodexSection } from './components/codex/CodexSection'
import { ChroniclesSection } from './components/chronicles/ChroniclesSection'
import { OracleSection } from './components/oracle/OracleSection'
import { SagaSection } from './components/saga/SagaSection'
import { EclipseOverlay } from './components/layout/EclipseOverlay'
import { ArchiveAudioProvider } from './context/ArchiveAudioContext'
import { ThemeNowPlaying } from './components/layout/ThemeNowPlaying'

function App() {
  useLenis()
  const [loaded, setLoaded] = useState(false)
  const onLoadComplete = useCallback(() => setLoaded(true), [])

  return (
    <ArchiveAudioProvider>
      {!loaded && <LoadingScreen onComplete={onLoadComplete} />}
      <EclipseOverlay />
      <FilmGrain />
      <ScrollProgress />
      <CursorGlow />
      <Header />
      <main className={loaded ? '' : 'invisible'}>
        <HeroPortal />
        <SectionDivider />
        <SagaSection />
        <SectionDivider />
        <RealmsSection />
        <SectionDivider />
        <InkkeepersSection />
        <SectionDivider />
        <CodexSection />
        <SectionDivider />
        <ChroniclesSection />
        <SectionDivider />
        <OracleSection />
      </main>
      <Footer />
      <ThemeNowPlaying />
    </ArchiveAudioProvider>
  )
}

export default App