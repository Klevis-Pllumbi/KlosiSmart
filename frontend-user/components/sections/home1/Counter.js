import Link from "next/link"
import CounterUp from "@/components/elements/CounterUp"


export default function Counter() {
    return (
        <>
        {/*Start Fact Counter Style1 */}
        <section className="fact-counter-style1">
            <div className="fact-counter-style1__bg"
                style={{backgroundImage: 'url(assets/images/backgrounds/fact-counter-v1-bg.png)'}}></div>
            <div className="auto-container">
                <div className="row">
                    {/*Start Fact Counter Style1 Title */}
                    <div className="col-xl-4">
                        <div className="fact-counter-style1__title">
                            <div className="sec-title">
                                <div className="sub-title">
                                    <h6>Statistika</h6>
                                </div>
                                <h2>Të dhënat mbi qytetin & banorët</h2>
                            </div>
                        </div>
                    </div>
                    {/*End Fact Counter Style1 Title */}

                    {/*Start Fact Counter Style1 Right */}
                    <div className="col-xl-8">
                        <div className="fact-counter-style1__right">
                            <ul className="fact-counter-style1__counter-box">
                                {/*Start Fact Counter Style1 Counter Box Single */}
                                <li className="fact-counter-style1__counter-box-single text-center">
                                    <div className="counter-box">
                                        <h2><CounterUp end={12.2} /><span>K</span></h2>
                                    </div>
                                    <div className="title">
                                        <p>Banorë gjithsej <br />sipas INSTAT</p>
                                    </div>
                                </li>
                                {/*End Fact Counter Style1 Counter Box Single */}

                                {/*Start Fact Counter Style1 Counter Box Single */}
                                <li className="fact-counter-style1__counter-box-single text-center">
                                    <div className="counter-box">
                                        <h2><CounterUp end={357.48} /><span>Km2</span></h2>
                                    </div>
                                    <div className="title">
                                        <p>Shtrirje <br/> gjeografike</p>
                                    </div>
                                </li>
                                {/*End Fact Counter Style1 Counter Box Single */}

                                {/*Start Fact Counter Style1 Counter Box Single */}
                                <li className="fact-counter-style1__counter-box-single text-center">
                                    <div className="counter-box">
                                        <h2><CounterUp end={4} /><span></span></h2>
                                    </div>
                                    <div className="title">
                                        <p>Njësi <br />Administrative</p>
                                    </div>
                                </li>
                                {/*End Fact Counter Style1 Counter Box Single */}
                            </ul>
                        </div>
                    </div>
                    {/*End Fact Counter Style1 Right */}
                </div>
            </div>
        </section>
        {/*End Fact Counter Style1 */}
           
        </>
    )
}
