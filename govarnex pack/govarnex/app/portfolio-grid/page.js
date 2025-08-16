
// import PortfolioFilter1 from ""
import dynamic from 'next/dynamic'
const PortfolioFilter1 = dynamic(() => import('@/components/elements/PortfolioFilter1'), {
    ssr: false,
})
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Home() {

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Portfolio Grid">
                
                {/*Start Portfolio Style1 */}
                <section className="portfolio-style1 portfolio-style1--grid">
                    <div className="auto-container">
                        <div className="sec-title text-center">
                            <div className="sub-title">
                                <h6>portfolio</h6>
                            </div>
                            <h2>What We Have Done In Our <br /> City Council</h2>
                        </div>
                        <PortfolioFilter1/>
                    </div>
                </section>
                {/*End Portfolio Style1 */}

            </Layout>
        </>
    )
}