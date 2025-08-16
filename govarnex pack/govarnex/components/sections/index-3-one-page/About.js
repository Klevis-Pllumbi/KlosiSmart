'use client'
import Link from "next/link"
import { useState } from 'react'
import ReactCurvedText from 'react-curved-text'
import ModalVideo from 'react-modal-video'


export default function About() {
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            {/*Start About Style3 */}
            
            <section className="about-style3" id="about">
                <div className="about-style3__img" style={{backgroundImage: 'url(assets/images/about/about-v3-img1.jpg)'}}>
                    <div className="about-style3__img-video-box text-center">
                        <a onClick={() => setOpen(true)} className="video-popup"><div className="about-style3__img-video-box-icon">
                            <span className="icon-play-1"></span>
                            <i className="ripple"></i>
                        </div>
                        </a>
                    </div>
                </div>
                <div className="auto-container">
                    <div className="row">
                        {/*Start About Style3 Content */}
                        <div className="col-xl-12">
                            <div className="about-style3__content">
                                <div className="sec-title">
                                    <div className="sub-title">
                                        <h6>About Govarnex</h6>
                                    </div>
                                    <h2>Welcome &amp; Support <br /> To Govarnex City <br /> Municipal</h2>
                                </div>
                                <div className="about-style3__content-text">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis, suscipit mi
                                        urna nulla at tincidunt feugiat vulputate. Ante facilisis face pellentesque quis
                                        egestas metus, mauris dictum sollicitudin hendrerit quis in magna cras adipiscing
                                        posuere augue imperdiet arcu.</p>
                                </div>

                                <ul className="about-style3__content-list">
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

                                <div className="about-style3__content-btn">
                                    <Link className="btn-one" href="/about">
                                        <span className="txt">Report an Issues</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/*End About Style3 Content */}
                        
                    </div>
                </div>
            </section>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="vfhzo499OeA" onClose={() => setOpen(false)} />
            {/*End About Style3 */}
            
        </>
    )
}
