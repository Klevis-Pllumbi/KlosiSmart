
import Layout from "@/components/layout/Layout"
import Banner from "@/components/sections/index-3-one-page/Banner"
import Features from "@/components/sections/index-3-one-page/Features"
import About from "@/components/sections/index-3-one-page/About"
import Services from "@/components/sections/index-3-one-page/Services1"
import Portfolio from "@/components/sections/index-3-one-page/Portfolio"
import Services2 from "@/components/sections/index-3-one-page/Services2"
import Events from "@/components/sections/index-3-one-page/Events"
import Testimonial from "@/components/sections/index-3-one-page/Testimonial"
import Counter from "@/components/sections/index-3-one-page/Counter"
import Team from "@/components/sections/index-3-one-page/Team"
import News from "@/components/sections/index-3-one-page/News"
import Newsletter from "@/components/sections/index-3-one-page/Newsletter"
export default function Home() {

    return (
        <>
            <Layout headerStyle={6} footerStyle={1}>
                <Banner />
                <Features />
                <About />
                <Services />
                <Portfolio />
                <Services2 />
                <Events />
                <Testimonial />
                <Counter />
                <Team />
                <News />
                <Newsletter />
            </Layout>
        </>
    )
}