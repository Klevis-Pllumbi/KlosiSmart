import Link from "next/link"
import TestimonialSlider03 from "@/components/slider/TestimonialSlider03"

export default function Government() {
    return (
        <>
            {/*Start Government Voice */}
            <section className="government-voice clearfix">
                <div className="shape1 rotate-me"><img src="assets/images/shapes/thm-shape1.png" alt="#" /></div>
                <div className="auto-container">
                    <div className="row">
                        {/*Start Government Voice Content */} 
                        <div className="col-xl-6 col-lg-6">
                            <div className="government-voice__content">
                                <div className="sec-title">
                                    <div className="sub-title">
                                        <h6>Mayor of govarnex</h6>
                                    </div>
                                    <h2>Major Voice of City <br /> Government</h2>
                                </div>
                                <div className="government-voice__content-inner">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis, suscipit mi
                                        urna nulla at tincidunt feugiat vulputate. Ante facilisis face pellentesque quis
                                        egestas metus, mauris dictum sollicitudin hendrerit quis in magna cras adipiscing
                                        posuere augue imperdiet arcu.</p>
                                    <ul>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-check-mark"></span>
                                            </div>
                                            <div className="text">
                                                <p>Develop the Municipaity</p>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="icon">
                                                <span className="icon-check-mark"></span>
                                            </div>
                                            <div className="text">
                                                <p>Maintain Financial Integrity</p>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="icon">
                                                <span className="icon-check-mark"></span>
                                            </div>
                                            <div className="text">
                                                <p>Represent the Public</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/*End Government Voice Content */}

                        {/*Start Government Voice Img */}
                        <div className="col-xl-6 col-lg-6">
                            <div className="government-voice__img">
                                <div className="shape2 float-bob-y"><img src="assets/images/shapes/thm-shape1.png" alt="#" />
                                </div>
                                <div className="inner wow slideInRight" data-wow-delay="500ms" data-wow-duration="2500ms">
                                    <img src="assets/images/resources/government-voice-img1.png" alt="#" />
                                </div>
                            </div>
                        </div>
                        {/*End Government Voice Img */}
                    </div>
                </div>

                {/*Start Government Voice Bottom */}
                <div className="government-voice__bottom">
                    <div className="auto-container">
                        <div className="row">
                            {/*Start Government Voice Bottom Content */}
                            <div className="col-xl-7 col-lg-9">
                                <div className="government-voice__bottom-content">

                                    <TestimonialSlider03/>
                                </div>
                            </div>
                            {/*End Government Voice Bottom Content */}
                        </div>
                    </div>
                </div>
                {/*End Government Voice Bottom */}
            </section>
            {/*End Government Voice */}
        </>
    )
}
