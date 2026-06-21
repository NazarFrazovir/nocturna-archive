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

function App() {
  useLenis()
  const [loaded, setLoaded] = useState(false)
  const onLoadComplete = useCallback(() => setLoaded(true), [])

  return (
    <>
      {!loaded && <LoadingScreen onComplete={onLoadComplete} />}
      <FilmGrain />
      <ScrollProgress />
      <CursorGlow />
      <Header />
      <main className={loaded ? '' : 'invisible'}>
        <HeroPortal />
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
    </>
  )
}

export default App