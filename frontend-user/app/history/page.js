import Layout from "@/components/layout/Layout"
import Link from "next/link"
import Newsletter from "@/components/sections/home2/Newsletter";

export default function Home() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Histori">
                <div>
                    {/*Start History Timeline */}
                    <section className="history-timeline">
                        <div className="auto-container">
                            <div className="sec-title text-center">
                                <div className="sub-title">
                                    <h6>Histori</h6>
                                </div>
                                <h2>Kronologji e shkurtër historike</h2>
                            </div>

                            <div className="history-timeline__inner">
                                <div className="top-round"></div>
                                <div className="top-bottom"></div>

                                {/* Mesjeta – Petralbë */}
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 order-22">
                                        <div className="history-timeline__content style2">
                                            <div className="line"></div>
                                            <h3>Mesjeta</h3>
                                            <h2><Link href="#">Kalaja e Petralbës dhe rrugët tregtare</Link></h2>
                                            <p>Në mesjetë, kalatë rreth Klosit (si Petralba) mbronin nyjet rrugore dhe vendbanimet përreth. Kalaja shërbente si pikë vrojtimi mbi luginë, duke lidhur zonat e Matit me qendrat përtej maleve.</p>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 order-11">
                                        <div className="history-timeline__img style2">
                                            <div className="shape1 rotate-me">
                                                <img src="assets/images/shapes/thm-shape1.png" alt="#" />
                                            </div>
                                            <div className="inner">
                                                <img className="timeline-img" src="/assets/images/resources/petralba.png" alt="#" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shek. XIX–XX */}
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6">
                                        <div className="history-timeline__img">
                                            <div className="shape1 rotate-me">
                                                <img src="assets/images/shapes/thm-shape1.png" alt="#" />
                                            </div>
                                            <div className="inner">
                                                <img className="timeline-img" src="/assets/images/resources/img.png" alt="#" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6">
                                        <div className="history-timeline__content">
                                            <div className="line"></div>
                                            <h3>Shek. XIX–XX</h3>
                                            <h2><Link href="#">Formësimi i qytezës dhe jetës lokale</Link></h2>
                                            <p>Me zhvillimet ekonomike e shoqërore të Matit, Klosi u konsolidua si qendër shërbimesh për fshatrat përreth. Pozita pranë rrugëve të brendshme e bëri qytezën pikë furnizimi, tregtie dhe arsimimi për komunitetin lokal.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 2015 – Bashkia Klos */}
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 order-22">
                                        <div className="history-timeline__content style2">
                                            <div className="line"></div>
                                            <h3>2015</h3>
                                            <h2><Link href="#">Krijimi i Bashkisë Klos</Link></h2>
                                            <p>Me reformën territoriale të vitit 2015, njësitë administrative Klos, Suç, Gurrë dhe Xibër u bashkuan në njësi të vetme vendore — Bashkia Klos — me qendër qytezën e Klosit.</p>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 order-11">
                                        <div className="history-timeline__img style2">
                                            <div className="shape1 rotate-me">
                                                <img src="assets/images/shapes/thm-shape1.png" alt="#" />
                                            </div>
                                            <div className="inner">
                                                <img className="timeline-img" src="/assets/images/resources/bashkia.png" alt="#" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 2024 – Muzeu Historik-Kulturor */}
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6">
                                        <div className="history-timeline__img">
                                            <div className="shape1 rotate-me">
                                                <img src="assets/images/shapes/thm-shape1.png" alt="#" />
                                            </div>
                                            <div className="inner">
                                                <img className="timeline-img" src="/assets/images/resources/muzeu.png" alt="#" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6">
                                        <div className="history-timeline__content">
                                            <div className="line"></div>
                                            <h3>2024</h3>
                                            <h2><Link href="#">Muzeu Historik-Kulturor i Klosit</Link></h2>
                                            <p>U përurua Muzeu Historik-Kulturor i Klosit, si pjesë e projekteve të bashkëpunimit ndërkufitar, me mision ruajtjen dhe promovimin e trashëgimisë së trevës. Muzeu pasuron ofertën kulturore dhe edukative të zonës.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                    {/*End History Timeline */}

                    <Newsletter />
                </div>
            </Layout>
        </>
    )
}
