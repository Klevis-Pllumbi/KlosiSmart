"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import axios from "axios";

const API_BASE = "http://localhost:8080";
const GUEST_EVENTS = `${API_BASE}/api/guest/events`;
const FILES_BASE_EVENTS = "/api/guest/files/events/";

// ===== Helpers =====
const asAbs = (u) => {
    if (!u) return "";
    if (u.startsWith("http://") || u.startsWith("https://")) return u;
    const rel = u.includes("/") ? u : `${FILES_BASE_EVENTS}${u}`;
    const withSlash = rel.startsWith("/") ? rel : `/${rel}`;
    return `${API_BASE}${withSlash}`;
};

const toDate = (iso) => (iso ? new Date(iso) : null);

const isSameDay = (a, b) =>
    !!a &&
    !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

const fmtDate = (d) =>
    new Intl.DateTimeFormat("sq-AL", {
        timeZone: "Europe/Tirane",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(d);

const fmtTime = (d) =>
    new Intl.DateTimeFormat("sq-AL", {
        timeZone: "Europe/Tirane",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,   // <-- kjo e bën 24-orësh
    }).format(d);

/** etiketa për kutinë e datës */
const dateBadgeLabel = (startIso, endIso) => {
    const s = toDate(startIso);
    const e = toDate(endIso);
    if (s && e && !isSameDay(s, e)) return `${fmtDate(s)} - ${fmtDate(e)}`;
    if (s) return fmtDate(s);
    if (e) return fmtDate(e);
    return "";
};

/** orari poshtë titullit */
const timeRange = (startIso, endIso) => {
    const s = toDate(startIso);
    const e = toDate(endIso);
    const st = s ? fmtTime(s) : "";
    const et = e ? fmtTime(e) : "";
    if (st && et) return `${st} - ${et}`;
    return st || et || "";
};

const range = (start, end) => Array.from({ length: Math.max(end - start + 1, 0) }, (_, i) => i + start);

const buildPagination = (current, total, sibling = 1, boundary = 1) => {
    if (total <= 0) return [];
    const cur = current + 1;

    const maxNoDots = boundary * 2 + sibling * 2 + 3;
    if (total <= maxNoDots) return range(1, total);

    const startPages = range(1, boundary);
    const endPages = range(total - boundary + 1, total);

    const siblingsStart = Math.max(
        Math.min(cur - sibling, total - boundary - sibling * 2 - 1),
        boundary + 2
    );
    const siblingsEnd = Math.min(
        Math.max(cur + sibling, boundary + sibling * 2 + 2),
        total - boundary - 1
    );

    const items = [...startPages];

    if (siblingsStart > boundary + 2) {
        items.push("dots");
    } else if (boundary + 1 < siblingsStart) {
        items.push(boundary + 1);
    }

    items.push(...range(siblingsStart, siblingsEnd));

    if (siblingsEnd < total - boundary - 1) {
        items.push("dots");
    } else if (siblingsEnd + 1 < total - boundary + 1) {
        items.push(total - boundary);
    }

    items.push(...endPages);
    return items;
};

// ===== Komponenti =====
export default function EventsPage() {
    // Page<EventDto> (0-based)
    const [page, setPage] = useState(0);
    const [size] = useState(6); // 3 karta për rresht
    const [data, setData] = useState({
        content: [],
        number: 0,
        totalPages: 1,
        totalElements: 0,
        size: 6,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError("");
                const { data: resp } = await axios.get(GUEST_EVENTS, {
                    params: { page, size },
                });
                setData(resp);
            } catch (e) {
                setError(
                    e?.response?.data?.message ||
                    "Ndodhi një gabim gjatë marrjes së eventeve."
                );
            } finally {
                setLoading(false);
            }
        })();
    }, [page, size]);

    const canPrev = data.number > 0;
    const canNext = data.number < data.totalPages - 1;

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Evente">
            <div>
                {/*Start Events-style2 */}
                <section className="events-style2 events-style2--events2">
                    <div className="auto-container">
                        <div className="sec-title text-center">
                            <div className="sub-title">
                                <h6>EVENTE</h6>
                            </div>
                            <h2>
                                Eksploroni eventet në qytetin tonë <br />
                                Lista e plotë e eventeve
                            </h2>
                        </div>

                        {/* Ngarkimi / Gabimi */}
                        {loading && (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status" />
                            </div>
                        )}
                        {error && !loading && (
                            <div className="alert alert-danger text-center">{error}</div>
                        )}

                        {/* Grida */}
                        {!loading && !error && (
                            <div className="row">
                                {data.content.length === 0 && (
                                    <div className="col-12 text-center py-5 text-muted">
                                        Nuk ka evente për t’u shfaqur.
                                    </div>
                                )}

                                {data.content.map((ev, idx) => {
                                    const cover = ev.mainImageUrl
                                        ? asAbs(ev.mainImageUrl)
                                        : "/assets/images/resources/events-v2-img1.jpg";
                                    const slug = ev.slug || "";
                                    const dateLabel = dateBadgeLabel(ev.startAt, ev.endAt);
                                    const hours = timeRange(ev.startAt, ev.endAt);
                                    const location = ev.locationName || ev.locationAddress || "";

                                    return (
                                        <div
                                            key={slug || idx}
                                            className="col-xl-4 col-lg-4 wow animated fadeInUp"
                                            data-wow-delay={`${0.1 + (idx % 3) * 0.1}s`}
                                        >
                                            <div className="events-style2__single">
                                                <div className="events-style2__single-img">
                                                    <div
                                                        className="inner"
                                                        style={{
                                                            width: 330,
                                                            height: 250,
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        <img
                                                            src={cover}
                                                            alt={ev.title || "Event"}
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        className="date-box"
                                                        style={{
                                                            minWidth: 140,
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        <p style={{whiteSpace: "wrap"}}>
                                                            <span className="icon-calendar-1"></span>
                                                            {dateLabel}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="events-style2__single-content text-center">
                                                    <h2
                                                        title={ev.title}
                                                        style={{
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: "vertical",
                                                            overflow: "hidden",
                                                            minHeight: "2.8em",
                                                            lineHeight: "1.4em",
                                                        }}
                                                    >
                                                        <Link href={`/events/${slug}`}>{ev.title}</Link>
                                                    </h2>

                                                    <ul className="contact-info">
                                                        <li>
                                                            <div className="icon">
                                                                <span className="icon-wall-clock"></span>
                                                            </div>
                                                            <div className="text">
                                                                <p>{hours || "—"}</p>
                                                            </div>
                                                        </li>

                                                        {!!location && (
                                                            <li>
                                                                <div className="icon">
                                                                    <span className="icon-pin"></span>
                                                                </div>
                                                                <div className="text">
                                                                    <p>{location}</p>
                                                                </div>
                                                            </li>
                                                        )}
                                                    </ul>

                                                    <div className="events-style2__single-btn">
                                                        <Link className="btn-one" href={`/events/${slug}`}>
                                                            <span className="txt">Lexo më shumë</span>
                                                        </Link>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Paginimi me elipsa */}
                        {!loading && !error && data.totalPages > 1 && (
                            <div className="row">
                                <div className="col-xl-12">
                                    <ul className="styled-pagination text-center clearfix">
                                        {/* Prev */}
                                        <li className={`arrow prev ${data.number === 0 ? "disabled" : ""}`}>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (data.number > 0) {
                                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                                        setPage(data.number - 1);
                                                    }
                                                }}
                                                aria-label="Faqja e mëparshme"
                                            >
                                                <span className="icon-left-arrow-1"></span>
                                            </a>
                                        </li>

                                        {/* Numrat + elipsat */}
                                        {buildPagination(data.number, data.totalPages, 1, 1).map((t, idx) =>
                                            t === "dots" ? (
                                                <li key={`dots-${idx}`} className="disabled">
                                                    <span style={{ cursor: "default" }}>…</span>
                                                </li>
                                            ) : (
                                                <li key={t} className={t === data.number + 1 ? "active" : ""}>
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            window.scrollTo({ top: 0, behavior: "smooth" });
                                                            setPage(t - 1); // kthehu në 0-based
                                                        }}
                                                    >
                                                        {t}
                                                    </a>
                                                </li>
                                            )
                                        )}

                                        {/* Next */}
                                        <li
                                            className={`arrow next ${
                                                data.number >= data.totalPages - 1 ? "disabled" : ""
                                            }`}
                                        >
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (data.number < data.totalPages - 1) {
                                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                                        setPage(data.number + 1);
                                                    }
                                                }}
                                                aria-label="Faqja tjetër"
                                            >
                                                <span className="icon-next"></span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
                {/*End Events-style2 */}

                {/* Newsletter (në shqip) */}
                <section className="newsletter-style1">
                    <div className="auto-container">
                        <div className="row">
                            <div className="col-xl-4">
                                <div className="newsletter-style1__title">
                                    <h2>
                                        Abonohu në <br /> Buletinin tonë
                                    </h2>
                                </div>
                            </div>

                            <div className="col-xl-8">
                                <div className="newsletter-style1__form">
                                    <form
                                        action=""
                                        className="comment-one__form contact-form-validated"
                                    >
                                        <div className="newsletter-style1__form-inner">
                                            <ul>
                                                <li>
                                                    <div className="comment-form__input-box">
                                                        <input
                                                            type="text"
                                                            placeholder="Emri juaj"
                                                            name="name"
                                                        />
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="comment-form__input-box">
                                                        <input
                                                            type="email"
                                                            placeholder="Email-i juaj"
                                                            name="email"
                                                        />
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="newsletter-style1__form-btn">
                                                <button
                                                    type="submit"
                                                    className="btn-one newsletter-style1__form-btn"
                                                >
                                                    <span className="txt">Abonohu tani</span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/*End Newsletter Style1 Form */}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
