import { Hero } from "../components/ui/Hero"
import { Navbar } from "../components/ui/Navbar"
import { Footer } from "../layouts/sections/Footer"
import { SectionServices } from "../layouts/sections/SectionServices"
import { SectionStep } from "../layouts/sections/SectionStep"

export const Index = () => {

  return( 
    <>
    <header>
        <Navbar/>
    </header>
    <main className="mt-6 px-8 pt-4 max-w-[1800px] mx-auto">
    <Hero/>
      <SectionServices/>
      <SectionStep/>
    </main>
    <Footer/>
    </>
  )
}
