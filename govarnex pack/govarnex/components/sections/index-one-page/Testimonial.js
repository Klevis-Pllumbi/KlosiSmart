import TestimonialSlider01 from '@/components/slider/TestimonialSlider01'

export default function Testimonial() {
    return (
        <>

        
            {/* Start Testimonials Style1*/}
            <section className="testimonials-style1">
                <div className="shape1"></div>
                <div className="shape2 rotate-me"><img src="assets/images/shapes/services-v1-shape1.png" alt="" /></div>
                <div className="shape3 wow slideInRight" data-wow-delay="500ms" data-wow-duration="2500ms"><img
                        className="float-bob-y" src="assets/images/shapes/testimonials-v1-shape2.png" alt="" /></div>
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
                                <TestimonialSlider01/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*End Testimonials Style1 */}
        </>
    )
}
