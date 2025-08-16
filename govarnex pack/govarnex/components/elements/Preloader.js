export default function Preloader() {
    return (
        <>
            {/*Start Preloader */}
            <div className="loader-wrap">
                <div className="preloader">
                    <div className="preloader-close">x</div>
                    <div id="handle-preloader" className="handle-preloader">
                        <div className="animation-preloader">
                            <div className="spinner"></div>
                            <div className="txt-loading">
                                <span data-text-preloader="g" className="letters-loading">
                                    g
                                </span>
                                <span data-text-preloader="o" className="letters-loading">
                                    o
                                </span>
                                <span data-text-preloader="v" className="letters-loading">
                                    v
                                </span>
                                <span data-text-preloader="a" className="letters-loading">
                                    a
                                </span>
                                <span data-text-preloader="r" className="letters-loading">
                                    r
                                </span>
                                <span data-text-preloader="n" className="letters-loading">
                                    n
                                </span>
                                <span data-text-preloader="e" className="letters-loading">
                                    e
                                </span>
                                <span data-text-preloader="x" className="letters-loading">
                                    x
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*End Preloader */} 


        </>
    )
}
