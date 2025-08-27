'use client'
import Link from "next/link"
import { useState } from 'react'
import ReactCurvedText from 'react-curved-text'
import ModalVideo from 'react-modal-video'


export default function About() {
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            

        {/*Start About Style2 */}
        <section className="about-style2" id="about">
            <div className="auto-container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="about-style2__img">
                            <div className="shape1 rotate-me"><img src="assets/images/shapes/thm-shape1.png" alt="#" /></div>
                            <div className="shape2 float-bob-y"><img src="assets/images/shapes/thm-shape1.png" alt="#" />
                            </div>
                            <div className="about-style2__img-video-box text-center">
                                <a onClick={() => setOpen(true)} className="video-popup"><div className="about-style2__img-video-box-icon">
                                        <span className="icon-play-1"></span>
                                        <i className="ripple"></i>
                                    </div>
                                </a>
                                <div className="title">
                                    <h3>Watch Leader <br /> Talk</h3>
                                </div>
                            </div>
                            <div className="inner">
                                <img src="assets/images/about/about-v2-img1.jpg" alt="#" />
                            </div>
                            <div className="about-style2__experience-box">
                                <h2>
                                    <span className="odometer" data-count="20">20</span>
                                </h2>
                                <div className="title">
                                    <h3> Years <br /> Of Experience</h3>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-xl-6">
                        <div className="about-style2__content">
                            <div className="sec-title">
                                <div className="sub-title">
                                    <h6>About Govarnex</h6>
                                </div>
                                <h2>Welcome & Support <br /> To Govarnex City <br /> Municipal</h2>
                            </div>
                            <div className="about-style2__content-text">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis, suscipit mi
                                    urna nulla at tincidunt feugiat vulputate. Ante facilisis face pellentesque quis
                                    egestas metus, mauris dictum sollicitudin hendrerit quis in magna cras adipiscing
                                    posuere augue imperdiet arcu.</p>
                            </div>

                            <div className="about-style2__content-bottom">
                                <div className="inner">
                                    <ul>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-check"></span>
                                            </div>
                                            <div className="text">
                                                <p>Improving all types of opportunities</p>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="icon">
                                                <span className="icon-check"></span>
                                            </div>
                                            <div className="text">
                                                <p>Quick solutions for daily problems</p>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="icon">
                                                <span className="icon-check"></span>
                                            </div>
                                            <div className="text">
                                                <p>Community that grows larger</p>
                                            </div>
                                        </li>
                                    </ul>

                                    <div className="about-style2__content-bottom-img">
                                        <img src="assets/images/about/about-v2-img2.jpg" alt="#" />
                                    </div>
                                </div>
                                <div className="btn-box">
                                    <Link className="btn-one" href="/about">
                                        <span className="txt">Report an Issues</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*End About Style2 */}


            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="vfhzo499OeA" onClose={() => setOpen(false)} />

        </>
    )
}
