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
                                <span data-text-preloader="k" className="letters-loading">
                                    k
                                </span>
                                <span data-text-preloader="l" className="letters-loading">
                                    l
                                </span>
                                <span data-text-preloader="o" className="letters-loading">
                                    o
                                </span>
                                <span data-text-preloader="s" className="letters-loading">
                                    s
                                </span>
                                <span data-text-preloader="i" className="letters-loading">
                                    i
                                </span>
                                <span data-text-preloader="s" className="letters-loading">
                                    s
                                </span>
                                <span data-text-preloader="m" className="letters-loading">
                                    m
                                </span>
                                <span data-text-preloader="a" className="letters-loading">
                                    a
                                </span>
                                <span data-text-preloader="r" className="letters-loading">
                                    r
                                </span>
                                <span data-text-preloader="t" className="letters-loading">
                                    t
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
