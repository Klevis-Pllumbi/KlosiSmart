import Link from "next/link"

export default function Breadcrumb({ breadcrumbTitle }) {
    return (
        <>

            {/*Start Breadcrumb Style1 */}
            <section className="breadcrumb-style1">
                <div className="breadcrumb-style1__bg"
                    style={{ backgroundImage: 'url(assets/images/backgrounds/breadcrumb-v1-bg.jpg)'}}></div>
                <div className="auto-container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="breadcrumb-style1__inner text-center">
                                <h2>{breadcrumbTitle}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="breadcrumb-style1__bottom">
                    <div className="auto-container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="breadcrumb-style1__bottom-menu">
                                    <ul>
                                        <li><Link href="/">Home</Link></li>
                                        <li><i className="fa fa-angle-right" aria-hidden="true"></i></li>
                                        <li>{breadcrumbTitle}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*End Breadcrumb Style1 */}

        </>
    )
}
