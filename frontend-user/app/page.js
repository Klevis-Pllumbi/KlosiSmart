import Layout from "@/components/layout/Layout"
import About from "@/components/sections/home1/About"
import Banner from "@/components/sections/home1/Banner"
import Services1 from "@/components/sections/home1/Services1"
import Services2 from "@/components/sections/home1/Services2"
import Cta from "@/components/sections/home1/Cta"
import Team from "@/components/sections/home1/Team"
import Features from "@/components/sections/home1/Features"
import Video from "@/components/sections/home1/Video"
import News from "@/components/sections/home1/News"
import Events from "@/components/sections/home1/Events"
import Testimonial from "@/components/sections/home1/Testimonial"
import Counter from "@/components/sections/home1/Counter"
import ProtectedRoute from "@/components/elements/ProtectedRoute";

export default function Home() {

    return (
        <>
            <ProtectedRoute role="ROLE_USER">
                <Layout headerStyle={1} footerStyle={1}>
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
            </ProtectedRoute>

        </>
    )
}