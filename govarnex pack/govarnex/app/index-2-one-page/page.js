
import Layout from "@/components/layout/Layout"
import Services2 from "@/components/sections/index-2-one-page/Services2"
import About from "@/components/sections/index-2-one-page/About"
import Banner from "@/components/sections/index-2-one-page/Banner"
import Newsletter from "@/components/sections/index-2-one-page/Newsletter"
import Events from "@/components/sections/index-2-one-page/Events"
import Features from "@/components/sections/index-2-one-page/Features"
import Funfacts from "@/components/sections/index-2-one-page/Funfacts"
import News from "@/components/sections/index-2-one-page/News"
import Government from "@/components/sections/index-2-one-page/Government"
import Portfolio from "@/components/sections/index-2-one-page/Portfolio"
import Services from "@/components/sections/index-2-one-page/Services1"
import Team from "@/components/sections/index-2-one-page/Team"
import Testimonial from "@/components/sections/index-2-one-page/Testimonial"
export default function Home() {

    return (
        <>
            <Layout headerStyle={5} footerStyle={1}>
                <Banner />
                <Features />
                <About />
                <Services />
                <Services2 />
                <Portfolio />
                <Testimonial />
                <Government />
                <Events />
                <Funfacts />
                <Team />
                <News />
                <Newsletter />
            </Layout>
        </>
    )
}