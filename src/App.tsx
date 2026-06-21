import { useLenis } from './hooks/useLenis'
import { CursorGlow } from './components/layout/CursorGlow'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HeroPortal } from './components/hero/HeroPortal'
import { RealmsSection } from './components/realms/RealmsSection'
import { CodexSection } from './components/codex/CodexSection'
import { ChroniclesSection } from './components/chronicles/ChroniclesSection'
import { OracleSection } from './components/oracle/OracleSection'

function App() {
  useLenis()

  return (
    <>
      <CursorGlow />
      <Header />
      <main>
        <HeroPortal />
        <RealmsSection />
        <CodexSection />
        <ChroniclesSection />
        <OracleSection />
      </main>
      <Footer />
    </>
  )
}

export default App