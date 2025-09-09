import Layout from "@/components/layout/Layout"
import About from "@/components/sections/home2/About"
import Banner from "@/components/sections/home1/Banner"
import Services from "@/components/sections/home2/Services"
import Services2 from "@/components/sections/home1/Services2"
import Cta from "@/components/sections/home1/Cta"
import Team from "@/components/sections/home2/Team"
import Features from "@/components/sections/home2/Features"
import Portfolio from "@/components/sections/home2/Portfolio"
import News from "@/components/sections/home1/News"
import Events from "@/components/sections/home2/Events"
import Testimonial from "@/components/sections/home2/Testimonial"
import Counter from "@/components/sections/home1/Counter"
import Newsletter from "@/components/sections/home2/Newsletter";

export default function Home() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <Banner />
                <Features />
                <About />
                <Services />
                <Services2 />
                {/*<Testimonial />*/}
                <Counter />
                <Events />
                <Portfolio />
                {/*<Team />*/}
                {/*<Cta />*/}
                <News />
                <Newsletter />
            </Layout>
        </>
    )
}