
import Layout from "@/components/layout/Layout"
import Banner from "@/components/sections/home3/Banner"
import Features from "@/components/sections/home3/Features"
import About from "@/components/sections/home3/About"
import Services from "@/components/sections/home3/Services"
import Portfolio from "@/components/sections/home3/Portfolio"
import Services2 from "@/components/sections/home3/Services2"
import Events from "@/components/sections/home3/Events"
import Testimonial from "@/components/sections/home3/Testimonial"
import Counter from "@/components/sections/home3/Counter"
import Team from "@/components/sections/home3/Team"
import News from "@/components/sections/home3/News"
import Newsletter from "@/components/sections/home3/Newsletter"
export default function Home() {

    return (
        <>
            <Layout headerStyle={3} footerStyle={1}>
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