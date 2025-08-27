
import VideoPopup from "@/components/elements/VideoPopup"
export default function Video() {
    return (
        <>
            {/*Start Video Style1 */}
            <section className="video-style1">
                <div className="video-style1__bg jarallax" style={{backgroundImage: 'url(assets/images/backgrounds/video-v1-bg.jpg)'}}> </div>
                <div className="auto-container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="video-style1__inner">
                                <div className="sec-title text-center">
                                    <div className="sub-title">
                                        <h6>EFFICIENCY - OPPORTUNITY</h6>
                                    </div>
                                    <h2>City Municipality Services <br /> And Departments</h2>
                                </div>
                                <div className="video-box">
                                    <VideoPopup />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*End Video Style1 */}
        </>
    )
}
