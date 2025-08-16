import Link from "next/link"
import CounterUp from "@/components/elements/CounterUp"


export default function Counter() {
    return (
        <>
            {/*Start Fact Counter Style3 */}
            <section className="fact-counter-style3">
                <div className="auto-container">
                    <div className="row">
                        {/*Start Fact Counter Style3 Single */}
                        <div className="col-xl-3 col-lg-3 col-md-6 wow slideInUp animated" data-wow-delay="0.1s"
                            data-wow-duration="1500ms">
                            <div className="fact-counter-style3__single text-center">
                                <div className="counter-box">
                                    <h2><CounterUp end={4.2} /><span>M</span></h2>
                                </div>
                                <div className="title">
                                    <p>Total People Lived <br /> in Our City</p>
                                </div>
                            </div>
                        </div>
                        {/*End Fact Counter Style3 Single */}

                        {/*Start Fact Counter Style3 Single */}
                        <div className="col-xl-3 col-lg-3 col-md-6 wow slideInUp animated" data-wow-delay="0.3s"
                            data-wow-duration="1500ms">
                            <div className="fact-counter-style3__single text-center">
                                <div className="counter-box">
                                    <h2><CounterUp end={7} /><span>Km2</span></h2>
                                </div>
                                <div className="title">
                                    <p>Square Kilometres <br /> Region Covers</p>
                                </div>
                            </div>
                        </div>
                        {/*End Fact Counter Style3 Single */}

                        {/*Start Fact Counter Style3 Single */}
                        <div className="col-xl-3 col-lg-3 col-md-6 wow slideInUp animated" data-wow-delay="0.5s"
                            data-wow-duration="1500ms">
                            <div className="fact-counter-style3__single text-center">
                                <div className="counter-box">
                                    <h2><CounterUp end={3} /><span>rd</span></h2>
                                </div>
                                <div className="title">
                                    <p>Largesty City in our <br /> Country</p>
                                </div>
                            </div>
                        </div>
                        {/*End Fact Counter Style3 Single */}

                        {/*Start Fact Counter Style3 Single */}
                        <div className="col-xl-3 col-lg-3 col-md-6 wow slideInUp animated" data-wow-delay="0.7s"
                            data-wow-duration="1500ms">
                            <div className="fact-counter-style3__single text-center">
                                <div className="counter-box">
                                <h2><CounterUp end={20} /><span>%</span></h2>
                                </div>
                                <div className="title">
                                    <p>Private & domestic <br /> garden land</p>
                                </div>
                            </div>
                        </div>
                        {/*End Fact Counter Style3 Single */}
                    </div>
                </div>
            </section>
            {/*End Fact Counter Style3 */}
        </>
    )
}
