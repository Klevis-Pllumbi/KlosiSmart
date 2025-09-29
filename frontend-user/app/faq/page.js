'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import Newsletter from "@/components/sections/home2/Newsletter";
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
                                                <h6>FAQ</h6>
                                            </div>
                                            <h2>Pyetjet më të shpeshta</h2>
                                        </div>
                                        <ul className="accordion-box">
                                            <li className="accordion block">
                                                <div className={isActive.key == 1 ? "acc-btn active" : "acc-btn"}
                                                     onClick={() => handleToggle(1)}>
                                                    <div className="icon-outer"><i className="icon-plus"></i></div>
                                                    <h3>Si mund të aplikoj për një certifikatë familjare?</h3>
                                                </div>
                                                <div
                                                    className={isActive.key == 1 ? "acc-content current" : "acc-content"}>
                                                    <div className="content">
                                                        <p>Aplikimi për certifikatë familjare mund të bëhet në dy
                                                            mënyra: online përmes portalit e-Albania, ku dokumenti
                                                            gjenerohet dhe shkarkohet menjëherë, ose duke u paraqitur
                                                            fizikisht në zyrën e gjendjes civile pranë bashkisë. Nëse
                                                            aplikoni online, nevojitet identifikimi me llogarinë tuaj.
                                                            Në rastin e aplikimit fizik, duhet të keni me vete një mjet
                                                            identifikimi.</p>
                                                    </div>
                                                </div>
                                            </li>

                                            <li className="accordion block">
                                                <div className={isActive.key == 2 ? "acc-btn active" : "acc-btn"}
                                                     onClick={() => handleToggle(2)}>
                                                    <div className="icon-outer"><i className="icon-plus"></i></div>
                                                    <h3>Ku paguhet taksa e pasurisë?</h3>
                                                </div>
                                                <div
                                                    className={isActive.key == 2 ? "acc-content current" : "acc-content"}>
                                                    <div className="content">
                                                        <p>Taksa e pasurisë mund të paguhet në sportelet e shërbimit
                                                            pranë bashkisë, si edhe përmes bankave dhe institucioneve
                                                            financiare të autorizuara. Pagesa mund të kryhet edhe online
                                                            përmes platformave të bankave të nivelit të dytë. Për çdo
                                                            pagesë të kryer, qytetari pajiset me mandat pagesë ose
                                                            faturë elektronike si provë zyrtare.</p>
                                                    </div>
                                                </div>
                                            </li>

                                            <li className="accordion block">
                                                <div className={isActive.key == 3 ? "acc-btn active" : "acc-btn"}
                                                     onClick={() => handleToggle(3)}>
                                                    <div className="icon-outer"><i className="icon-plus"></i></div>
                                                    <h3>Si bëhet ankesa për një problem me ndriçimin publik?</h3>
                                                </div>
                                                <div
                                                    className={isActive.key == 3 ? "acc-content current" : "acc-content"}>
                                                    <div className="content">
                                                        <p>Qytetarët mund të raportojnë probleme me ndriçimin publik
                                                            duke kontaktuar numrin e gjelbër të bashkisë, duke plotësuar
                                                            formularin online në faqen zyrtare ose përmes aplikacionit
                                                            “Bashkia Ime”. Ankesat regjistrohen menjëherë dhe i kalohen
                                                            sektorit të infrastrukturës për verifikim dhe ndërhyrje
                                                            brenda një afati të arsyeshëm kohor.</p>
                                                    </div>
                                                </div>
                                            </li>

                                            <li className="accordion block">
                                                <div className={isActive.key == 4 ? "acc-btn active" : "acc-btn"}
                                                     onClick={() => handleToggle(4)}>
                                                    <div className="icon-outer"><i className="icon-plus"></i></div>
                                                    <h3>Çfarë dokumentesh duhen për leje ndërtimi?</h3>
                                                </div>
                                                <div
                                                    className={isActive.key == 4 ? "acc-content current" : "acc-content"}>
                                                    <div className="content">
                                                        <p>Për të aplikuar për një leje ndërtimi, kërkohet paraqitja e
                                                            dokumentit të pronësisë, projekti teknik i miratuar nga një
                                                            studio e licencuar, si edhe aplikimi përmes portalit unik të
                                                            lejeve të ndërtimit. Procesi kalon në disa faza verifikimi
                                                            dhe miratimi nga zyra e urbanistikës dhe këshilli teknik i
                                                            bashkisë. Afatet e shqyrtimit varen nga kompleksiteti i
                                                            projektit.</p>
                                                    </div>
                                                </div>
                                            </li>

                                            <li className="accordion block">
                                                <div className={isActive.key == 5 ? "acc-btn active" : "acc-btn"}
                                                     onClick={() => handleToggle(5)}>
                                                    <div className="icon-outer"><i className="icon-plus"></i></div>
                                                    <h3>Si mund të marr pjesë në mbledhjet publike të Këshillit
                                                        Bashkiak?</h3>
                                                </div>
                                                <div
                                                    className={isActive.key == 5 ? "acc-content current" : "acc-content"}>
                                                    <div className="content">
                                                        <p>Këshilli Bashkiak zhvillon mbledhje periodike të cilat janë
                                                            të hapura për publikun. Datat dhe oraret publikohen në faqen
                                                            zyrtare të bashkisë dhe në tabelat e njoftimeve pranë
                                                            godinës. Qytetarët kanë të drejtë të marrin pjesë si
                                                            dëgjues, dhe në raste të caktuara të paraqesin edhe kërkesa
                                                            apo sugjerime, të cilat regjistrohen zyrtarisht në
                                                            procesverbal.</p>
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


                    <Newsletter/>
                </div>

            </Layout>
        </>
    )
}