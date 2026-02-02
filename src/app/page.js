import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Popular from '@/components/Popular'
import Package from '@/components/Package'
import VisaServices from '@/components/VisaServices'
import Gallery from '@/components/Gallery'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import GoTop from '@/components/GoTop'
import visaData from '../../data/data.json'

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <article>
          <Hero />
          <Popular />
          <Package />
          <VisaServices visaData={visaData} />
          <Gallery />
          <CTA />
        </article>
      </main>

      <Footer />
      <GoTop />
    </>
  )
}
