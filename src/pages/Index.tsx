import { Hero } from "../components/ui/Hero"
import { Navbar } from "../components/ui/Navbar"
import { Footer } from "../layouts/sections/Footer"
import { SectionServices } from "../layouts/sections/SectionServices"
import { SectionStep } from "../layouts/sections/SectionStep"

export const Index = () => {

  return( 
    <>
    <main>
      <header>
        <Navbar/>
        <Hero/>
      </header>
      <SectionServices/>
      <SectionStep/>
    </main>
    <Footer/>
    </>
  )
}
