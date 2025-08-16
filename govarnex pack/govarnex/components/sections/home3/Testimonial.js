import TestimonialSlider04 from "@/components/slider/TestimonialSlider04"


export default function Testimonial() {
    return (
        <>
            {/*Start Testimonials Style3 */}
            <section className="testimonials-style3">
                <div className="auto-container">
                    <div className="row">
                        {/*Start Testimonials Style3 Img */}
                        <div className="col-xl-6 col-lg-6 order-22">
                            <div className="testimonials-style3__img wow slideInLeft" data-wow-delay="100ms"
                                data-wow-duration="2500ms">
                                <div className="shape1 float-bob-y"><img src="assets/images/shapes/thm-shape1.png" alt="#" />
                                </div>
                                <div className="inner">
                                    <img src="assets/images/testimonial/testimonial-v3-img1.png" alt="#" />
                                </div>
                            </div>
                        </div>
                        {/* End Testimonials Style3 Img*/}

                        {/*Start Testimonials Style3 Content */}
                        <div className="col-xl-6 col-lg-6 order-11">
                            <div className="testimonials-style3__content">
                                <div className="sec-title">
                                    <div className="sub-title">
                                        <h6>Testimonials</h6>
                                    </div>
                                    <h2>We are Very Glad to Get <br /> People Review</h2>
                                </div>

                                <div className="testimonials-style3__content-inner">
                                    <div className="shape2 rotate-me"><img src="assets/images/shapes/thm-shape1.png" alt="#" />
                                    </div>
                                    <TestimonialSlider04/>
                                </div>
                            </div>
                        </div>
                        {/*End Testimonials Style3 Content */}
                    </div>
                </div>
            </section>
            {/*End Testimonials Style3 */}
        </>
    )
}
