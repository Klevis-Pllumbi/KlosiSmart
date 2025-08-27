import Link from "next/link"

export default function SearchPopup({ isPopup, handlePopup }) {
    return (
        <>
            
            <div id="search-popup" className={`search-popup ${isPopup ? "popup-visible" : ""}`}>
                <div className="search-popup__overlay search-toggler" onClick={handlePopup}></div>
                <div className="search-popup__content">
                    <form action="#">
                    <label htmlFor="search" className="sr-only">
                        search here
                    </label>
                    <input type="text" id="search" placeholder="Search Here..." />
                    <button type="submit" aria-label="search submit" className="thm-btn">
                        <i className="icon-search-1"></i>
                    </button>
                    </form>
                </div>
            </div>

        </>
    )
}
