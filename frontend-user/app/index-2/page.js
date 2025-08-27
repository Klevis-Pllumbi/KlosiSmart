
import Layout from "@/components/layout/Layout"
import Services2 from "@/components/sections/home2/Services2"
import About from "@/components/sections/home2/About"
import Banner from "@/components/sections/home2/Banner"
import Newsletter from "@/components/sections/home2/Newsletter"
import Events from "@/components/sections/home2/Events"
import Features from "@/components/sections/home2/Features"
import Funfacts from "@/components/sections/home2/Funfacts"
import News from "@/components/sections/home2/News"
import Government from "@/components/sections/home2/Government"
import Portfolio from "@/components/sections/home2/Portfolio"
import Services from "@/components/sections/home2/Services"
import Team from "@/components/sections/home2/Team"
import Testimonial from "@/components/sections/home2/Testimonial"
export default function Home() {

    return (
        <>
            <Layout headerStyle={2} footerStyle={1}>
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