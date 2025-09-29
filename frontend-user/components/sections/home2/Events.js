"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const API_BASE = "http://localhost:8080";
const EVENTS_API = `${API_BASE}/api/guest/events`;

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

const fmtDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return new Intl.DateTimeFormat("sq-AL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(d);
};
const fmtTime = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return new Intl.DateTimeFormat("sq-AL", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(d);
};

export default function Events() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(EVENTS_API, {
                    params: { page: 0, size: 3, sort: "startAt,asc", upcoming: true },
                });
                setItems(data.content || []);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <section className="events-style2">
            <div className="auto-container">
                <div className="sec-title text-center">
                    <div className="sub-title">
                        <h6>Evente</h6>
                    </div>
                    <h2>
                        Eksploroni eventet e ardhshme <br/>
                        Katalogu i Eventeve
                    </h2>
                </div>

                <div className="row">
                    {loading && <p className="text-center">Duke ngarkuar…</p>}

                    {!loading && items.length === 0 && (
                        <p className="text-center text-muted">Nuk ka evente të ardhshme.</p>
                    )}

                    {items.map((ev, idx) => (
                        <div
                            className="col-xl-4 col-lg-4 wow animated fadeInUp"
                            data-wow-delay={`${0.1 * (idx + 1)}s`}
                            key={ev.id || ev.slug}
                        >
                            <div className="events-style2__single">
                                <div className="events-style2__single-img">
                                    <div
                                        className="inner"
                                        style={{width: 330, height: 250, overflow: "hidden"}}
                                    >
                                        <img
                                            src={asAbs(ev.mainImageUrl) || "/assets/images/resources/events-v2-img1.jpg"}
                                            alt={ev.title}
                                            style={{width: "100%", height: "100%", objectFit: "cover"}}
                                        />
                                    </div>
                                    <div className="date-box" style={{minWidth: 140}}>
                                        <p>
                                            <span className="icon-calendar-1"></span>
                                            {fmtDate(ev.startAt)}
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
                                        <Link href={`/events/${ev.slug}`}>{ev.title}</Link>
                                    </h2>

                                    <ul className="contact-info">
                                        <li>
                                            <div className="icon">
                                                <span className="icon-wall-clock"></span>
                                            </div>
                                            <div className="text">
                                                <p>
                                                    {fmtTime(ev.startAt)} - {fmtTime(ev.endAt)}
                                                </p>
                                            </div>
                                        </li>

                                        {ev.locationName && (
                                            <li>
                                                <div className="icon">
                                                    <span className="icon-pin"></span>
                                                </div>
                                                <div className="text">
                                                    <p>{ev.locationName}</p>
                                                </div>
                                            </li>
                                        )}
                                    </ul>

                                    <div className="events-style2__single-btn">
                                        <Link className="btn-one" href={`/events/${ev.slug}`}>
                                            <span className="txt">Lexo më shumë</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center" style={{marginTop: 24}}>
                    <Link className="btn-one" href="/events">
                        <span className="txt">Shiko të gjitha eventet</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
