import Layout from "@/components/layout/Layout"
import About from "@/components/sections/index-one-page/About"
import Banner from "@/components/sections/index-one-page/Banner"
import Services1 from "@/components/sections/index-one-page/Services1"
import Services2 from "@/components/sections/index-one-page/Services2"
import Cta from "@/components/sections/index-one-page/Cta"
import Team from "@/components/sections/index-one-page/Team"
import Features from "@/components/sections/index-one-page/Features"
import Video from "@/components/sections/index-one-page/Video"
import News from "@/components/sections/index-one-page/News"
import Events from "@/components/sections/index-one-page/Events"
import Testimonial from "@/components/sections/index-one-page/Testimonial"
import Counter from "@/components/sections/index-one-page/Counter"
export default function Home() {

    return (
        <>
            <Layout headerStyle={4} footerStyle={1}>
                <Banner />
                <Features />
                <About />
                <Services1 />
                <Services2 />
                <Testimonial />
                <Counter />
                <Events />
                <Video />
                <Team />
                <Cta />
                <News />
            </Layout>
        </>
    )
}