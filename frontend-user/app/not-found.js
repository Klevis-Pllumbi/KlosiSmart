import Link from "next/link"

export default function Error404() {
    return (
        <>
            <div className="page-wrapper">
                <div className="error-section">
                    <div className="auto-container">
                        <div className="text-center">
                            <div className="image"><img src="assets/images/resources/404.png" alt="" /></div>
                            <div className="content">
                                <h1>Faqja nuk u gjet</h1>
                                <div className="text">Nuk po gjendet faqja e kërkuar</div>
                                <div className="link-btn"><Link href="/" className="btn-one"><span className="txt">Kthehu në faqen kryesore</span></Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
