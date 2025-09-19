'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
export default function Home() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
    })

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }
    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="FAQ’S">
                <div>
                    
                    {/*Start Faq Page */}
                    <section className="faq-page">
                        <div className="faq-page__bg"><img src="assets/images/backgrounds/faq-page-bg.png" alt="" /></div>
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-xl-12 col-lg-7">
                                    {/*Start Faq Page Content */}
                                    <div className="faq-page__content">
                                        <div className="sec-title">
                                            <div className="sub-title">
                                                <h6>Why Choose Us</h6>
                                            </div>
                                            <h2>Frequently Asked Question</h2>
                                        </div>
                                        <ul className="accordion-box">
                                            <li className="accordion block">
                                                <div className={isActive.key == 1 ? "acc-btn active" : "acc-btn"} onClick={() => handleToggle(1)}>
                                                    <div className="icon-outer"><i className="icon-plus"></i></div>
                                                    <h3> Will the Mayor send a congratulatory message? </h3>
                                                </div>
                                                <div className={isActive.key == 1 ? "acc-content current" : "acc-content"}>
                                                    <div className="content">
                                                    <p>Sodales posuere facilisi metus elementum ipsum egestas amet. Mi amet, mattis
                                                            commodo turpis. Nunc tempor amet massa diam mauris. Risus sodales interdum
                                                            magna felis, id nunc adipiscing consectetur. Sed consectetur consequat at
                                                            malesuada tellus.</p>
                                                    </div>
                                                </div>
                                            </li> 

                                            <li className="accordion block">
                                                <div className={isActive.key == 2 ? "acc-btn active" : "acc-btn"} onClick={() => handleToggle(2)}>
                                                    <div className="icon-outer"><i className="icon-plus"></i></div>
                                                    <h3> Who can complaint about road parking? </h3>
                                                </div>
                                                <div className={isActive.key == 2 ? "acc-content current" : "acc-content"}>
                                                    <div className="content">
                                                    <p>Sodales posuere facilisi metus elementum ipsum egestas amet. Mi amet, mattis
                                                            commodo turpis. Nunc tempor amet massa diam mauris. Risus sodales interdum
                                                            magna felis, id nunc adipiscing consectetur. Sed consectetur consequat at
                                                            malesuada tellus.</p>
                                                    </div>
                                                </div>
                                            </li>     
                                            <li className="accordion block">
                                                <div className={isActive.key == 3 ? "acc-btn active" : "acc-btn"} onClick={() => handleToggle(3)}>
                                                    <div className="icon-outer"><i className="icon-plus"></i></div>
                                                    <h3> How can i get property tax bill online? </h3>
                                                </div>
                                                <div className={isActive.key == 3 ? "acc-content current" : "acc-content"}>
                                                    <div className="content">
                                                    <p>Sodales posuere facilisi metus elementum ipsum egestas amet. Mi amet, mattis
                                                            commodo turpis. Nunc tempor amet massa diam mauris. Risus sodales interdum
                                                            magna felis, id nunc adipiscing consectetur. Sed consectetur consequat at
                                                            malesuada tellus.</p>
                                                    </div>
                                                </div>
                                            </li>     
                                            <li className="accordion block">
                                                <div className={isActive.key == 4 ? "acc-btn active" : "acc-btn"} onClick={() => handleToggle(4)}>
                                                    <div className="icon-outer"><i className="icon-plus"></i></div>
                                                    <h3> Why i make a complaint about specific incidents? </h3>
                                                </div>
                                                <div className={isActive.key == 4 ? "acc-content current" : "acc-content"}>
                                                    <div className="content">
                                                    <p>Sodales posuere facilisi metus elementum ipsum egestas amet. Mi amet, mattis
                                                            commodo turpis. Nunc tempor amet massa diam mauris. Risus sodales interdum
                                                            magna felis, id nunc adipiscing consectetur. Sed consectetur consequat at
                                                            malesuada tellus.</p>
                                                    </div>
                                                </div>
                                            </li>     
                                            <li className="accordion block">
                                                <div className={isActive.key == 5 ? "acc-btn active" : "acc-btn"} onClick={() => handleToggle(5)}>
                                                    <div className="icon-outer"><i className="icon-plus"></i></div>
                                                    <h3> How do I address the Mayor? </h3>
                                                </div>
                                                <div className={isActive.key == 5 ? "acc-content current" : "acc-content"}>
                                                    <div className="content">
                                                    <p>Sodales posuere facilisi metus elementum ipsum egestas amet. Mi amet, mattis
                                                            commodo turpis. Nunc tempor amet massa diam mauris. Risus sodales interdum
                                                            magna felis, id nunc adipiscing consectetur. Sed consectetur consequat at
                                                            malesuada tellus.</p>
                                                    </div>
                                                </div>
                                            </li>     

                                        </ul>
                                    </div>
                                    {/*End Faq Page Content */}
                                </div>

                            </div>
                        </div>
                    </section>
                    {/*End Faq Page */}


                    {/*Start Newsletter Style1 */}
                    <section className="newsletter-style1">
                        <div className="auto-container">
                            <div className="row">
                                {/*Start Newsletter Style1 Title */}
                                <div className="col-xl-4">
                                    <div className="newsletter-style1__title">
                                        <h2>Subscribe To Our <br /> Newsletter</h2>
                                    </div>
                                </div>
                                {/*End Newsletter Style1 Title */}

                                {/*Start Newsletter Style1 Form */}
                                <div className="col-xl-8">
                                    <div className="newsletter-style1__form">
                                        <form action="/">
                                            <div className="newsletter-style1__form-inner">
                                                <ul>
                                                    <li>
                                                        <div className="comment-form__input-box">
                                                            <input type="text" placeholder="Your name" name="name" />
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="comment-form__input-box">
                                                            <input type="email" placeholder="Your email" name="email" />
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div className="newsletter-style1__form-btn">
                                                    <button type="submit" className="btn-one newsletter-style1__form-btn">
                                                        <span className="txt">Subscribe Now</span></button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/*End Newsletter Style1 Form */}
                            </div>
                        </div>
                    </section>
                    {/*End Newsletter Style1 */}
                </div>

            </Layout>
        </>
    )
}