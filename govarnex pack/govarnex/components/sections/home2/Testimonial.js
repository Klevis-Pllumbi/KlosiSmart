import TestimonialSlider02 from "@/components/slider/TestimonialSlider02"


export default function Testimonial() {
    return (
        <>
            {/*Start Testimonials Style1 */}
            <section className="testimonials-style1 testimonials-style1--style2">
                <div className="testimonials-style1--style2-shape1"><img src="assets/images/backgrounds/testimonials-v2-bg.png" alt="#" /></div>
                <div className="auto-container">
                    <div className="sec-title text-center">
                        <div className="sub-title">
                            <h6>Testimonials</h6>
                        </div>
                        <h2>We are Very Glad to Get <br />People Review</h2>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="testimonials-style1__inner">
                                <TestimonialSlider02 />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*End Testimonials Style1 */}
        </>
    )
}
