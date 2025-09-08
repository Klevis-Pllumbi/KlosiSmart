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
        <section className="about-style2">
            <div className="auto-container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="about-style2__img">
                            <div className="shape1 rotate-me"><img src="assets/images/shapes/thm-shape1.png" alt="#" /></div>
                            <div className="shape2 float-bob-y"><img src="assets/images/shapes/thm-shape1.png" alt="#" />
                            </div>
                            <div className="about-style2__img-video-box text-center">
                                {/*<a onClick={() => setOpen(true)} className="video-popup"><div className="about-style2__img-video-box-icon">*/}
                                {/*        <span className="icon-play-1"></span>*/}
                                {/*        <i className="ripple"></i>*/}
                                {/*    </div>*/}
                                {/*</a>*/}
                                <div className="title">
                                    <h3>Kryetarja e <br /> Bashkisë</h3>
                                </div>
                            </div>
                            <div className="inner">
                                <img src="assets/images/about/about-v2-img1.jpg" alt="#" />
                            </div>
                            <div className="about-style2__experience-box">
                                <h2>
                                    <span className="odometer" data-count="20">10</span>
                                </h2>
                                <div className="title">
                                    <h3> Vite <br /> Eksperiencë</h3>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-xl-6">
                        <div className="about-style2__content">
                            <div className="sec-title">
                                <div className="sub-title">
                                    <h6>Hyrje</h6>
                                </div>
                                <h2>Mirësevini në <br /> Bashkinë e Qytetit <br /> Klos</h2>
                            </div>
                            <div className="about-style2__content-text">
                                <p>Ne besojmë në krijimin e një mjedisi më të mirë për qytetarët, duke ofruar shërbime
                                    të thjeshta, të shpejta dhe të aksesueshme për të gjithë. Qëllimi ynë është të
                                    lehtësojmë jetën e përditshme dhe të ndërtojmë një komunitet më të fortë.</p>
                            </div>

                            <div className="about-style2__content-bottom">
                                <div className="inner">
                                    <ul>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-check"></span>
                                            </div>
                                            <div className="text">
                                                <p>Përmirësim i çdo mundësie dhe shërbimi</p>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="icon">
                                                <span className="icon-check"></span>
                                            </div>
                                            <div className="text">
                                                <p>Zgjidhje të shpejta për problemet e përditshme</p>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="icon">
                                                <span className="icon-check"></span>
                                            </div>
                                            <div className="text">
                                                <p>Një komunitet që rritet dhe forcohet çdo ditë</p>
                                            </div>
                                        </li>
                                    </ul>

                                    <div className="about-style2__content-bottom-img">
                                        <img src="assets/images/about/about-v2-img2.jpg" alt="#"/>
                                    </div>
                                </div>
                                <div className="btn-box">
                                    <Link className="btn-one" href="/report">
                                        <span className="txt">Raporto një problem</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            {/*End About Style2 */}


            {/*<ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="vfhzo499OeA"*/}
            {/*            onClose={() => setOpen(false)}/>*/}

        </>
    )
}
