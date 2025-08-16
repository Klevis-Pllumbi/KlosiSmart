
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Home() {

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Blog Details">
                <div>
                {/*Start Blog Details */}
                <section className="blog-details">
                    <div className="auto-container">
                        <div className="row">
                            {/*Start Blog Details Content */}
                            <div className="col-xl-8 col-lg-7">
                                <div className="blog-details__content">
                                    <div className="blog-details-text-box1">
                                        <p className="text1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget velit
                                            consequat eget ac pulvinar quam isue enim. Feugiat odio suscipit facilisi eget non
                                            et amet cum congue at pulvinar. Euproin ac diam ut congue suspendisse nec ipsum
                                            enim. Lectus odio gravida vulputate tellus. Turpis sit magna netus faucibus lacus.
                                            Vitae lectus eget elementum ipsum sed euismod. Sed duis dictumst amet dolor.</p>

                                        <p className="text2">Fames in senectus cras odio. Dui tincidunt erat augue pharetra eu diam
                                            consequat
                                            curabitur at. Sed tincidunt dignissim velit, a risus. Rhoncus posuere erat aliquam
                                            tortor aliquet odio. Sed mauris lorem augue ac diam, sit dolor. Enim quis maecenas
                                            dolor mi adipiscing dui purus. Urna nisl amet faucibus vitae dignissim. Quam
                                            consectetur vitae phasellus condimentum mattis.</p>
                                    </div>

                                    <div className="blog-details-img-box1">
                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6">
                                                <div className="blog-details-img-box1__single">
                                                    <img src="assets/images/blog/blog-details-img1.jpg" alt="/blog-grid" />
                                                </div>
                                            </div>

                                            <div className="col-xl-6 col-lg-6 col-md-6">
                                                <div className="blog-details-img-box1__single">
                                                    <img src="assets/images/blog/blog-details-img2.jpg" alt="/blog-grid" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="blog-details-text-box2">
                                        <div className="title">
                                            <h2>Tours Walk Of Greater City</h2>
                                        </div>
                                        <p className="text1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget velit
                                            consequat eget ac pulvinar quam isue enim. Feugiat odio suscipit facilisi eget non
                                            et amet cum congue at pulvinar. Euproin ac diam ut congue suspendisse nec ipsum
                                            enim. Lectus odio gravida vulputate tellus. Turpis sit magna netus faucibus lacus.
                                            Vitae lectus eget elementum ipsum sed euismod. Sed duis dictumst amet dolor.</p>

                                        <p className="text2">Fames in senectus cras odio. Dui tincidunt erat augue pharetra eu diam
                                            consequat
                                            curabitur at. Sed tincidunt dignissim velit, a risus. Rhoncus posuere erat aliquam
                                            tortor aliquet odio. Sed mauris lorem augue ac diam, sit dolor. Enim quis maecenas
                                            dolor mi adipiscing dui purus. Urna nisl amet faucibus vitae dignissim. Quam
                                            consectetur vitae phasellus condimentum mattis.</p>
                                    </div>

                                    <div className="blog-details__quote-box">
                                        <div className="inner">
                                            <div className="img-box">
                                                <div className="inner-box">
                                                    <img src="assets/images/blog/blog-details-img3.jpg" alt="/blog-grid" />
                                                </div>
                                                <div className="icon-box">
                                                    <span className="icon-right-quotes-symbol"></span>
                                                </div>
                                            </div>
                                            <div className="content-box">
                                                <div className="text-box">
                                                    <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit amet sit purus
                                                        tempor dui pharetra consequat nibh elit urna interdum viera quam a arcu
                                                        duis
                                                        quis lectus donec nulla.”</p>
                                                </div>

                                                <div className="client-info">
                                                    <h3>Sandra Bullock</h3>
                                                    <p>City Mayor</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="blog-details-text-box3">
                                        <div className="title">
                                            <h2>Rundown on Restrictions</h2>
                                        </div>
                                        <p className="text1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget velit
                                            consequat eget ac pulvinar quam isue enim. Feugiat odio suscipit facilisi eget non
                                            et amet cum congue at pulvinar. Euproin ac diam ut congue suspendisse nec ipsum
                                            enim. Lectus odio gravida vulputate tellus. Turpis sit magna netus faucibus lacus.
                                            Vitae lectus eget elementum ipsum sed euismod. Sed duis dictumst amet dolor.</p>

                                        <p className="text2">Fames in senectus cras odio. Dui tincidunt erat augue pharetra eu diam
                                            consequat
                                            curabitur at. Sed tincidunt dignissim velit, a risus. Rhoncus posuere erat aliquam
                                            tortor aliquet odio. Sed mauris lorem augue ac diam, sit dolor. Enim quis maecenas
                                            dolor mi adipiscing dui purus. Urna nisl amet faucibus vitae dignissim. Quam
                                            consectetur vitae phasellus condimentum mattis.</p>
                                    </div>

                                    <div className="blog-details__tag">
                                        <div className="title">
                                            <h4>Tags:</h4>
                                        </div>

                                        <ul>
                                            <li><Link href="/blog-grid">Depertment,</Link></li>
                                            <li><Link href="/blog-grid">City,</Link></li>
                                            <li><Link href="/blog-grid">Mayor</Link></li>
                                        </ul>
                                    </div>

                                    <div className="blog-details__author-box">
                                        <div className="inner">
                                            <div className="img-box">
                                                <img src="assets/images/blog/blog-details-img4.jpg" alt="/blog-grid" />
                                            </div>
                                            <div className="content-box">
                                                <div className="client-info">
                                                    <h3>Sandra Bullock</h3>
                                                    <p>About Author</p>
                                                </div>
                                                <div className="text-box">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit amet sit purus
                                                        tempor dui pharetra consequat nibh elit urna interdum viera quam.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="add-comment-box">
                                        <div className="inner-title">
                                            <h2>Leave A Comments</h2>
                                        </div>

                                        <form id="add-comment-form" action="/blog-grid">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="input-box">
                                                        <input type="text" name="fname" placeholder="Your name"
                                                            required="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="input-box">
                                                        <input type="email" name="femail" placeholder="Your email"
                                                            required="" />
                                                    </div>
                                                </div>

                                                <div className="col-xl-12">
                                                    <div className="row">
                                                        <div className="col-xl-12">
                                                            <div className="input-box">
                                                                <textarea name="fcomments" placeholder="Type message"
                                                                    required=""></textarea>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="button-box">
                                                                <button className="btn-one" type="submit">
                                                                    <span className="txt">Post Comments</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/*End Blog Details Content */}


                            {/*Start Thm Sidebar Box */}
                            <div className="col-xl-4 col-lg-5">
                                <div className="thm-sidebar-box">
                                    {/*Start Single Sidebar Box */}
                                    <div className="single-sidebar-box">
                                        <div className="sidebar-title">
                                            <h3>Search</h3>
                                        </div>
                                        <div className="sidebar-search-box">
                                            <form className="search-form" action="/blog-grid">
                                                <input placeholder="Search..." type="text" />
                                                <button type="submit">
                                                    <i className="fa fa-search" aria-hidden="true"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    {/*End Single Sidebar Box */}

                                    {/*Start Single Sidebar Box */}
                                    <div className="single-sidebar-box">
                                        <div className="sidebar-title">
                                            <h3>Categories</h3>
                                        </div>
                                        <ul className="sidebar-categories-box">
                                            <li><Link href="/blog-grid">City News</Link></li>
                                            <li><Link href="/blog-grid">Government</Link></li>
                                            <li><Link href="/blog-grid">Development</Link></li>
                                            <li><Link href="/blog-grid">Tourism</Link></li>
                                            <li><Link href="/blog-grid">Culture</Link></li>
                                            <li><Link href="/blog-grid">Community</Link></li>
                                        </ul>
                                    </div>
                                    {/*End Single Sidebar Box */}

                                    {/*Start Single Sidebar Box */}
                                    <div className="single-sidebar-box">
                                        <div className="sidebar-title">
                                            <h3>Latest News</h3>
                                        </div>
                                        <div className="sidebar-blog-post">
                                            <ul className="blog-post">
                                                <li>
                                                    <div className="inner">
                                                        <div className="img-box">
                                                            <img src="assets/images/sidebar/blog-post-img1.jpg"
                                                                alt="Awesome Image" />
                                                            <div className="overlay-content">
                                                                <Link href="/blog-grid"><i className="fa fa-link" aria-hidden="true"></i></Link>
                                                            </div>
                                                        </div>
                                                        <div className="title-box">
                                                            <h4><Link href="/blog-grid">Self-Guided Driving <br /> & Tours Walk</Link>
                                                            </h4>
                                                            <p><span className="icon-calendar-1"></span> Apr 17, 2023</p>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="inner">
                                                        <div className="img-box">
                                                            <img src="assets/images/sidebar/blog-post-img2.jpg"
                                                                alt="Awesome Image" />
                                                            <div className="overlay-content">
                                                                <Link href="/blog-grid"><i className="fa fa-link" aria-hidden="true"></i></Link>
                                                            </div>
                                                        </div>
                                                        <div className="title-box">
                                                            <h4><Link href="/blog-grid">Self-Guided Driving <br /> & Tours Walk</Link>
                                                            </h4>
                                                            <p><span className="icon-calendar-1"></span> Apr 17, 2023</p>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="inner">
                                                        <div className="img-box">
                                                            <img src="assets/images/sidebar/blog-post-img3.jpg"
                                                                alt="Awesome Image" />
                                                            <div className="overlay-content">
                                                                <Link href="/blog-grid"><i className="fa fa-link" aria-hidden="true"></i></Link>
                                                            </div>
                                                        </div>
                                                        <div className="title-box">
                                                            <h4><Link href="/blog-grid">Self-Guided Driving <br /> & Tours Walk</Link>
                                                            </h4>
                                                            <p><span className="icon-calendar-1"></span> Apr 17, 2023</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/*End Single Sidebar Box */}

                                    {/*Start Single Sidebar Box */}
                                    <div className="single-sidebar-box">
                                        <div className="sidebar-title">
                                            <h3>Photo Gallery</h3>
                                        </div>
                                        <div className="photo-gallery-box">
                                            <ul className="gallery">
                                                <li>
                                                    <div className="inner">
                                                        <div className="img-box">
                                                            <img src="assets/images/sidebar/photo-gallery-img1.jpg"
                                                                alt="Awesome Image" />
                                                            <div className="overlay-content">
                                                                <Link className="img-popup" data-fancybox="gallery"
                                                                    href="assets/images/sidebar/photo-gallery-img1.jpg">
                                                                    <span className="icon-search"></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="inner">
                                                        <div className="img-box">
                                                            <img src="assets/images/sidebar/photo-gallery-img2.jpg"
                                                                alt="Awesome Image" />
                                                            <div className="overlay-content">
                                                                <Link className="img-popup" data-fancybox="gallery"
                                                                    href="assets/images/sidebar/photo-gallery-img2.jpg">
                                                                    <span className="icon-search"></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="inner">
                                                        <div className="img-box">
                                                            <img src="assets/images/sidebar/photo-gallery-img3.jpg"
                                                                alt="Awesome Image" />
                                                            <div className="overlay-content">
                                                                <Link className="img-popup" data-fancybox="gallery"
                                                                    href="assets/images/sidebar/photo-gallery-img3.jpg">
                                                                    <span className="icon-search"></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="inner">
                                                        <div className="img-box">
                                                            <img src="assets/images/sidebar/photo-gallery-img4.jpg"
                                                                alt="Awesome Image" />
                                                            <div className="overlay-content">
                                                                <Link className="img-popup" data-fancybox="gallery"
                                                                    href="assets/images/sidebar/photo-gallery-img4.jpg">
                                                                    <span className="icon-search"></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="inner">
                                                        <div className="img-box">
                                                            <img src="assets/images/sidebar/photo-gallery-img5.jpg"
                                                                alt="Awesome Image" />
                                                            <div className="overlay-content">
                                                                <Link className="img-popup" data-fancybox="gallery"
                                                                    href="assets/images/sidebar/photo-gallery-img5.jpg">
                                                                    <span className="icon-search"></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="inner">
                                                        <div className="img-box">
                                                            <img src="assets/images/sidebar/photo-gallery-img6.jpg"
                                                                alt="Awesome Image" />
                                                            <div className="overlay-content">
                                                                <Link className="img-popup" data-fancybox="gallery"
                                                                    href="assets/images/sidebar/photo-gallery-img6.jpg">
                                                                    <span className="icon-search"></span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/*End Single Sidebar Box */}

                                    {/*Start Single Sidebar Box */}
                                    <div className="single-sidebar-box">
                                        <div className="sidebar-title">
                                            <h3>Archives</h3>
                                        </div>
                                        <ul className="sidebar-archives-box">
                                            <li><Link href="/blog-grid">July 2023</Link></li>
                                            <li><Link href="/blog-grid">June 2023</Link></li>
                                            <li><Link href="/blog-grid">May 2023</Link></li>
                                            <li><Link href="/blog-grid">March 2023</Link></li>
                                            <li><Link href="/blog-grid">February 2023</Link></li>
                                        </ul>
                                    </div>
                                    {/*End Single Sidebar Box */}

                                    {/*Start Single Sidebar Box */}
                                    <div className="single-sidebar-box">
                                        <div className="sidebar-title">
                                            <h3>Popular Tags</h3>
                                        </div>
                                        <div className="popular-tag-box">
                                            <ul className="popular-tag">
                                                <li><Link href="/blog-grid">Activities</Link></li>
                                                <li><Link href="/blog-grid">Depertment</Link></li>
                                                <li><Link href="/blog-grid">City</Link></li>
                                                <li><Link href="/blog-grid">Certificate</Link></li>
                                                <li><Link href="/blog-grid">Transport</Link></li>
                                                <li><Link href="/blog-grid">Mayor</Link></li>
                                                <li><Link href="/blog-grid">Taxes & Bills</Link></li>
                                                <li><Link href="/blog-grid">Food</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/*End Single Sidebar Box */}


                                </div>
                            </div>
                            {/*End Thm Sidebar Box */}
                        </div>
                    </div>
                </section>
                {/*End Blog Details */}

                {/*Start Newsletter Style1 */}
                <section className="newsletter-style1">
                    <div className="auto-container">
                        <div className="row">
                            {/*Start Newsletter Style1 Title*/}
                            <div className="col-xl-4">
                                <div className="newsletter-style1__title">
                                    <h2>Subscribe To Our <br /> Newsletter</h2>
                                </div>
                            </div>
                            {/*End Newsletter Style1 Title */}

                            {/*Start Newsletter Style1 Form */}
                            <div className="col-xl-8">
                                <div className="newsletter-style1__form">
                                    <form action="/" className="comment-one__form contact-form-validated">
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