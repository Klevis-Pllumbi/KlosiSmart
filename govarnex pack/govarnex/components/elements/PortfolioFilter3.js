
'use client'
import Isotope from "isotope-layout"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

export default function PortfolioFilter3() {
    // Isotope
    const isotope = useRef()
    const [filterKey, setFilterKey] = useState("*")
    useEffect(() => {
        setTimeout(() => {
            isotope.current = new Isotope(".items-container", {
                itemSelector: ".masonry-item",
                // layoutMode: "fitRows",
                percentPosition: true,
                masonry: {
                    columnWidth: ".masonry-item",
                },
                animationOptions: {
                    duration: 750,
                    easing: "linear",
                    queue: false,
                },
            })
        }, 1000)
    }, [])
    useEffect(() => {
        if (isotope.current) {
            filterKey === "*"
                ? isotope.current.arrange({ filter: `*` })
                : isotope.current.arrange({ filter: `.${filterKey}` })
        }
    }, [filterKey])
    const handleFilterKeyChange = useCallback((key) => () => {
        setFilterKey(key)
    },
        []
    )

    const activeBtn = (value) => (value === filterKey ? "filter active" : "filter")



    return (
        <>

            <div className="portfolio-style1--grid__menu-box clearfix">
                <ul className="filter-tabs filter-btns clearfix">
                    <li className={activeBtn("*")} onClick={handleFilterKeyChange("*")}>VIEW ALL <span className="count">0</span></li>
                    <li className={activeBtn("cat-1")} onClick={handleFilterKeyChange("cat-1")}>CONFERENCE <span className="count">0</span></li>
                    <li className={activeBtn("cat-2")} onClick={handleFilterKeyChange("cat-2")}>CELEBRATION <span className="count">0</span></li>
                    <li className={activeBtn("cat-3")} onClick={handleFilterKeyChange("cat-3")}>TURIST <span className="count">0</span></li>
                    <li className={activeBtn("cat-4")} onClick={handleFilterKeyChange("cat-4")}>GOVERNMENT <span className="count">0</span></li>
                </ul>
            </div>
            <div className="items-container row clearfix">
                {/* Case Block */}
                <div className="case-block-one masonry-item all cat-1 col-lg-4 col-md-6 col-sm-12">
                    <div className="portfolio-style1__single">
                        <div className="portfolio-style1__single-img">
                            <div className="inner">
                                <img src="assets/images/resources/portfolio-masonry-img1.jpg" alt="#" />
                                
                                <div className="portfolio-style1__link">
                                    <Link className="img-popup"
                                        href="assets/images/resources/portfolio-masonry-img1.jpg"><span
                                            className="icon-plus"></span></Link>
                                <div className="text-box">
                                    <p>Metro Train</p>
                                    <h2 className="portfoliy"><Link href="#">City Metro Train</Link></h2>
                                </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Case Block */}
                <div className="case-block-one masonry-item all cat-2 col-lg-4 col-md-6 col-sm-12">
                    <div className="portfolio-style1__single">
                        <div className="portfolio-style1__single-img">
                            <div className="inner">
                                <img src="assets/images/resources/portfolio-masonry-img2.jpg" alt="#" />
                                
                                <div className="portfolio-style1__link">
                                    <Link className="img-popup"
                                        href="assets/images/resources/portfolio-masonry-img2.jpg"><span
                                            className="icon-plus"></span></Link>
                                <div className="text-box">
                                    <p>Tourist Guide</p>
                                    <h2 className="portfoliy"><Link href="#">Main Tourist Spots</Link></h2>
                                </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Case Block */}
                <div className="case-block-one masonry-item all cat-1 cat-2 cat-4 col-lg-4 col-md-6 col-sm-12">
                    <div className="portfolio-style1__single">
                        <div className="portfolio-style1__single-img">
                            <div className="inner">
                                <img src="assets/images/resources/portfolio-masonry-img3.jpg" alt="#" />
                                
                                <div className="portfolio-style1__link">
                                    <Link className="img-popup"
                                        href="assets/images/resources/portfolio-masonry-img3.jpg"><span
                                            className="icon-plus"></span></Link>
                                <div className="text-box">
                                    <p>Golf day</p>
                                    <h2 className="portfoliy"><Link href="#">Mayor Golf Day</Link></h2>
                                </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Case Block */}
                <div className="case-block-one masonry-item all cat-2 cat-3 col-lg-4 col-md-6 col-sm-12">
                    <div className="portfolio-style1__single">
                        <div className="portfolio-style1__single-img">
                            <div className="inner">
                                <img src="assets/images/resources/portfolio-masonry-img4.jpg" alt="#" />
                                
                                <div className="portfolio-style1__link">
                                    <Link className="img-popup"
                                        href="assets/images/resources/portfolio-masonry-img4.jpg"><span
                                            className="icon-plus"></span></Link>
                                <div className="text-box">
                                    <p>Visit Museum</p>
                                    <h2 className="portfoliy"><Link href="#">City Great Museum</Link></h2>
                                </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Case Block */}
                <div className="case-block-one masonry-item all cat-2 cat-1 col-lg-4 col-md-6 col-sm-12">
                    <div className="portfolio-style1__single">
                        <div className="portfolio-style1__single-img">
                            <div className="inner">
                                <img src="assets/images/resources/portfolio-masonry-img6.jpg" alt="#" />
                                
                                <div className="portfolio-style1__link">
                                    <Link className="img-popup"
                                        href="assets/images/resources/portfolio-masonry-img6.jpg"><span
                                            className="icon-plus"></span></Link>
                                <div className="text-box">
                                    <p>Visit Museum</p>
                                    <h2 className="portfoliy"><Link href="#">Ancient Roman Sculpture</Link></h2>
                                </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Case Block */}
                <div className="case-block-one masonry-item all cat-3  col-lg-4 col-md-6 col-sm-12">
                <div className="portfolio-style1__single">
                        <div className="portfolio-style1__single-img">
                            <div className="inner">
                                <img src="assets/images/resources/portfolio-masonry-img5.jpg" alt="#" />
                                
                                <div className="portfolio-style1__link">
                                    <Link className="img-popup"
                                        href="assets/images/resources/portfolio-masonry-img5.jpg"><span
                                            className="icon-plus"></span></Link>
                                <div className="text-box">
                                    <p>Visit Museum</p>
                                    <h2 className="portfoliy"><Link href="#">Town of Maximonia</Link></h2>
                                </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
