'use client'
import { useState } from 'react'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
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
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="The Youth Event – Things  To Remember">
                <div>
                {/*Start Event Details */}
                <section className="event-details">
                    <div className="auto-container">
                        {/*Start Event Details Top */}
                        <div className="event-details__top">
                            <div className="row">
                                {/*Start Event Details Top Single */}
                                <div className="col-xl-6 col-lg-6 col-md-6">
                                    <div className="event-details__top-single">
                                        <div className="event-details__top-single-img">
                                            <img src="assets/images/resources/event-details-img1.jpg" alt="#" />
                                        </div>
                                    </div>
                                </div>
                               {/*End Event Details Top Single */}

                                {/*Start Event Details Top Single */}
                                <div className="col-xl-6 col-lg-6 col-md-6">
                                    <div className="event-details__top-single">
                                        <div className="event-details__top-single-img">
                                            <img src="assets/images/resources/event-details-img2.jpg" alt="#" />
                                        </div>
                                    </div>
                                </div>
                                {/*End Event Details Top Single*/}
                            </div>
                        </div>
                        {/*End Event Details Top */}

                        {/*Start Event Details Bottom */}
                        <div className="event-details__bottom">
                            <div className="row">
                                {/*Start Event Details Content */}
                                <div className="col-xl-8 col-lg-7">
                                    <div className="event-details__content">
                                        <div className="event-details__content-text1">
                                            <h2>Event Overview</h2>
                                            <p className="text1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et
                                                enim justo, in
                                                mauris posuere dolor. Dolor felis sapien sit egestas. Ut venenatis faucibus non
                                                sed faucibus mauris ultricies. Cras varius proin amet vehicula magna. Ultricies
                                                gravida vel volutpat sed. Platea sed fames at egestas amet feugiat laoreet
                                                potenti integer. Viverra at maecenas convallis condimentum egestas nunc sagittis
                                                eu. Semper faucibus facilisis vitae sollicitudin.</p>

                                            <p className="text2">Fringilla mauris magna sit elementum elit. Facilisi lacus, pharetra
                                                quam eu urna
                                                amet aenean. Nunc mattis vitae tellus bibendum a eu, nunc. Consequat commodo ac
                                                cursus in donec orci tempus. Massa sed sit faucibus neque ac. Nibh nisl nisl id
                                                fermentum habitant consequat. A ornare in dis sit cras natoque morbi. Phasellus
                                                senectus tortor sed magnis. Egestas nunc pellentesque egestas gravida amet.</p>
                                        </div>

                                        <div className="event-details__content-text2">
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-12 col-md-6">
                                                    <div className="img-box">
                                                        <img src="/assets/images/resources/event-details-img3.jpg" alt="#" />
                                                    </div>
                                                </div>

                                                <div className="col-xl-6 col-lg-12 col-md-6">
                                                    <div className="content-box">
                                                        <h2>Change the World</h2>
                                                        <p>Mauris magna sit elementum elit. Facilis lacusacphar etra quam eu
                                                            urna amet aenean Nunc mattis vitae tellus bibendum.</p>
                                                        <ul>
                                                            <li>
                                                                <div className="icon">
                                                                    <span className="icon-check-mark"></span>
                                                                </div>

                                                                <div className="text">
                                                                    <p>Holiday Trash & Recycling</p>
                                                                </div>
                                                            </li>

                                                            <li>
                                                                <div className="icon">
                                                                    <span className="icon-check-mark"></span>
                                                                </div>

                                                                <div className="text">
                                                                    <p>Things To Do In Govarnex</p>
                                                                </div>
                                                            </li>

                                                            <li>
                                                                <div className="icon">
                                                                    <span className="icon-check-mark"></span>
                                                                </div>

                                                                <div className="text">
                                                                    <p>Rent a Picnic Shelter</p>
                                                                </div>
                                                            </li>

                                                            <li>
                                                                <div className="icon">
                                                                    <span className="icon-check-mark"></span>
                                                                </div>

                                                                <div className="text">
                                                                    <p>Contact City Action Center</p>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="event-details__content-text3">
                                            <p className="text1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et
                                                enim justo, in mauris posuere dolor. Dolor felis sapien sit egestas. Ut
                                                venenatis faucibus non sed faucibus mauris ultricies. Cras varius proin amet
                                                vehicula magna. Ultricies gravida vel volutpat sed. Platea sed fames at egestas
                                                amet feugiat laoreet potenti integer. Viverra at maecenas convallis condimentum
                                                egestas nunc sagittis eu. Semper faucibus facilisis vitae sollicitudin.</p>

                                            <p className="text2">Fringilla mauris magna sit elementum elit. Facilisi lacus, pharetra
                                                quam eu urna amet aenean. Nunc mattis vitae tellus bibendum a eu, nunc.
                                                Consequat commodo ac cursus in donec orci tempus. Massa sed sit faucibus neque
                                                ac. Nibh nisl nisl id fermentum habitant consequat. A ornare in dis sit cras
                                                natoque morbi. Phasellus senectus tortor sed magnis. Egestas nunc pellentesque
                                                egestas gravida amet.</p>

                                            <div className="btn-box">
                                                <div className="btn-box-single">
                                                    <Link className="btn-one" href="#">
                                                        <span className="txt">+ Add To Google Calendar</span>
                                                    </Link>
                                                </div>
                                                <div className="btn-box-single ml">
                                                    <Link className="btn-one" href="#">
                                                        <span className="txt">+ Ical Export</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="event-details__content-text4">
                                            <div className="title">
                                                <h2>Speakers & Chief Guests</h2>
                                            </div>
                                            <div className="row">
                                                {/*Start Event Details Content Text4 */}
                                                <div className="col-xl-4">
                                                    <div className="event-details__content-text4-single">
                                                        <div className="img-box">
                                                            <img src="assets/images/resources/event-details-img4.jpg" alt="#" />
                                                        </div>
                                                        <div className="content-box text-center">
                                                            <h3><Link href="#">Robert Gates</Link></h3>
                                                            <p>Ambassador</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*End Event Details Content Text4 */}

                                                {/*Start Event Details Content Text4 */}
                                                <div className="col-xl-4">
                                                    <div className="event-details__content-text4-single">
                                                        <div className="img-box">
                                                            <img src="assets/images/resources/event-details-img5.jpg" alt="#" />
                                                        </div>
                                                        <div className="content-box text-center">
                                                            <h3><Link href="#">Nicholas Cage</Link></h3>
                                                            <p>Director</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*End Event Details Content Text4 */}

                                                {/*Start Event Details Content Text4 */}
                                                <div className="col-xl-4">
                                                    <div className="event-details__content-text4-single">
                                                        <div className="img-box">
                                                            <img src="assets/images/resources/event-details-img6.jpg" alt="#" />
                                                        </div>
                                                        <div className="content-box text-center">
                                                            <h3><Link href="#">Keanu Reeves</Link></h3>
                                                            <p>Mayor Assistant</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*End Event Details Content Text4 */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*End Event Details Content */}


                                {/*Start Event Details Sidebar */}
                                <div className="col-xl-4 col-lg-5">
                                    <div className="event-details__sidebar">
                                        <div className="event-details__sidebar-single info-box">
                                            <div className="title">
                                                <h2>Event details</h2>
                                            </div>
                                            <ul className="event-details__sidebar-single-list">
                                                <li>
                                                    <div className="icon-box">
                                                        <span className="icon-calendar-1"></span>
                                                    </div>

                                                    <div className="text-box">
                                                        <h4>Start Date:</h4>
                                                        <p>May 10, 2023: 10:00AM</p>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="icon-box">
                                                        <span className="icon-calendar-1"></span>
                                                    </div>

                                                    <div className="text-box">
                                                        <h4>End Date:</h4>
                                                        <p>May 13, 2023: 02:30PM</p>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="icon-box">
                                                        <span className="icon-wall-clock"></span>
                                                    </div>

                                                    <div className="text-box">
                                                        <h4>Time:</h4>
                                                        <p>10:00AM - 02:30PM</p>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="icon-box">
                                                        <span className="icon-Group-19"></span>
                                                    </div>

                                                    <div className="text-box">
                                                        <h4>Category:</h4>
                                                        <p><span>Design, The Youth Event</span></p>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="icon-box">
                                                        <span className="icon-label"></span>
                                                    </div>

                                                    <div className="text-box">
                                                        <h4>Tags:</h4>
                                                        <p><span>Covernment,</span> Meeting, City</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>


                                        <div className="event-details__sidebar-map">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4562.753041141002!2d-118.80123790098536!3d34.152323469614075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e82469c2162619%3A0xba03efb7998eef6d!2sCostco+Wholesale!5e0!3m2!1sbn!2sbd!4v1562518641290!5m2!1sbn!2sbd"
                                                className="event-details__map"></iframe>
                                        </div>

                                        <div className="event-details__sidebar-single contact-info">
                                            <div className="title">
                                                <h2>Event Venue</h2>
                                            </div>
                                            <div className="text-box">
                                                <p>Mauris magna sit elementum elit facilis lacusacphar.</p>
                                            </div>

                                            <ul className="event-details__sidebar-single-contact-list">
                                                <li>
                                                    <div className="icon-box">
                                                        <span className="icon-pin"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p>New Hyde Park, NY 11040</p>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="icon-box">
                                                        <span className="icon-telephone"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p><Link href="tel:913336660021">(+91) 333 666 0021</Link></p>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="icon-box">
                                                        <span className="icon-mail-1"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p><Link href="mailto:yourmail@email.com">example@govarnex.com</Link></p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/*End Event Details Sidebar */}
                            </div>
                        </div>
                        {/*End Event Details Bottom */}

                    </div>
                </section>
                {/*End Event Details */}



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
                            {/*Start Newsletter Style1 Title */}

                            {/*Start Newsletter Style1 Form */}
                            <div className="col-xl-8">
                                <div className="newsletter-style1__form">
                                    <form action="/" className="comment-one__form contact-form-validated" >
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