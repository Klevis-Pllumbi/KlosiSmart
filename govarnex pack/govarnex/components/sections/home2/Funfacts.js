import CounterUp from "@/components/elements/CounterUp"


export default function Funfacts() {
    return (
        <>
            {/*Start Fact Counter Style1 */}
        <section className="fact-counter-style1 fact-counter-style1--style2">
            <div className="auto-container">
                <div className="fact-counter-style1--style2__inner">
                    <div className="fact-counter-style1__bg"
                        style={{ backgroundImage: 'url(assets/images/backgrounds/fact-counter-v2-bg.png)'}}></div>
                    <div className="row">
                        {/*Start Fact Counter Style1 Title */}
                        <div className="col-xl-5">
                            <div className="fact-counter-style1__title">
                                <div className="sec-title">
                                    <div className="sub-title">
                                        <h6>Instant Services</h6>
                                    </div>
                                    <h2>Large Scale of City <br /> Numbers</h2>
                                </div>
                            </div>
                        </div>
                        {/*End Fact Counter Style1 Title */}

                        {/*Start Fact Counter Style1 Right */}
                        <div className="col-xl-7">
                            <div className="fact-counter-style1__right">
                                <ul className="fact-counter-style1__counter-box">
                                    {/*Start Fact Counter Style1 Counter Box Single */}
                                    <li className="fact-counter-style1__counter-box-single text-center">
                                        <div className="counter-box">
                                            <h2><CounterUp end={4.2} /><span>M</span></h2>
                                        </div>
                                        <div className="title">
                                            <p>Total People Lived <br />in Our City</p>
                                        </div>
                                    </li>
                                    {/*End Fact Counter Style1 Counter Box Single */}

                                    {/*Start Fact Counter Style1 Counter Box Single */}
                                    <li className="fact-counter-style1__counter-box-single text-center">
                                        <div className="counter-box">
                                            <h2><CounterUp end={7} /><span>Km2</span></h2>
                                        </div>
                                        <div className="title">
                                            <p>Square Kilometres <br /> Region Covers</p>
                                        </div>
                                    </li>
                                    {/*End Fact Counter Style1 Counter Box Single */}

                                    {/*Start Fact Counter Style1 Counter Box Single */}
                                    <li className="fact-counter-style1__counter-box-single text-center">
                                        <div className="counter-box">
                                            <h2><CounterUp end={3} /><span>rd</span></h2>
                                        </div>
                                        <div className="title">
                                            <p>Largesty City in our <br />Country</p>
                                        </div>
                                    </li>
                                     {/*End Fact Counter Style1 Counter Box Single */}
                                </ul>
                            </div>
                        </div>
                        {/*End Fact Counter Style1 Right */}
                    </div> 
                </div>
            </div>
        </section>
        {/*End Fact Counter Style1 */}
           
        </>
    )
}
