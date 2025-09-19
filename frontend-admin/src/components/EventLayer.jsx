"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";
import AlertContainer from "@/components/AlertContainer";

const IMG_HEIGHT = 266;

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

const range = (start, end) => Array.from({ length: Math.max(end - start + 1, 0) }, (_, i) => i + start);

const buildPagination = (current, total, sibling = 1, boundary = 1) => {
    if (total <= 0) return [];
    const cur = current + 1; // 1-based për thjeshtësi

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

export default function EventLayer() {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [content, setContent] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(false);

    // alerts
    const [alerts, setAlerts] = useState([]);
    const addAlert = (type, title, description) => {
        const id = crypto.randomUUID();
        setAlerts((prev) => [...prev, { id, type, title, description }]);
    };
    const removeAlert = (id) => setAlerts((prev) => prev.filter((a) => a.id !== id));

    const fetchPage = async (p = 0) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:8080/api/guest/events?page=${p}&size=${size}`);
            const items = Array.isArray(data.content) ? data.content : [];
            setContent(items);
            setPage(data.number ?? p);
            setTotalPages(data.totalPages ?? 0);
            setTotalElements(data.totalElements ?? items.length);
        } catch (e) {
            addAlert("error", "Gabim", e?.response?.data?.message || "Ndodhi një gabim gjatë marrjes së eventeve.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPage(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size]);

    const handleDelete = async (slug) => {
        const res = await Swal.fire({
            title: "Je i sigurt?",
            text: "Ky veprim do fshijë eventin dhe skedarët e tij.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Po, fshije",
            cancelButtonText: "Anulo",
            confirmButtonColor: "#d33",
        });
        if (!res.isConfirmed) return;

        try {
            await axios.delete(`http://localhost:8080/api/admin/events/${slug}`, { withCredentials: true });
            addAlert("success", "Sukses", "Eventi u fshi me sukses.");
            // nëse ishte i fundit në faqe, paso në faqen paraardhëse
            const wasLastOnPage = content.length === 1;
            if (wasLastOnPage && page > 0) {
                await fetchPage(page - 1);
            } else {
                await fetchPage(page);
            }
        } catch (e) {
            addAlert("error", "Gabim", e?.response?.data?.message || "Ndodhi një gabim gjatë fshirjes së eventit.");
        }
    };

    const pagesToShow = useMemo(() => {
        // i thjeshtë: tregojmë disa fq përreth faqes aktuale
        const max = 5;
        const start = Math.max(0, Math.min(page - 2, (totalPages - 1) - (max - 1)));
        const end = Math.min(totalPages - 1, start + (max - 1));
        const arr = [];
        for (let i = start; i <= end; i++) arr.push(i);
        return arr;
    }, [page, totalPages]);

    return (
        <div className="row gy-4">
            {/* Alerts */}
            <div className="col-12">
                <AlertContainer alerts={alerts} onClose={removeAlert}/>
            </div>
            {/* Grid e eventeve */}
            {loading && (
                <div className="col-12">
                    <div className="alert alert-info">Duke ngarkuar…</div>
                </div>
            )}

            {!loading && content.length === 0 && (
                <div className="col-12">
                    <div className="alert alert-secondary">Nuk u gjet asnjë event.</div>
                </div>
            )}

            {!loading &&
                content.map((ev) => (
                    <div className="col-xxl-4 col-lg-4 col-sm-6" key={ev.id ?? ev.slug}>
                        <div className="card h-100 p-0 radius-12 overflow-hidden">
                            <div className="card-body p-0">
                                <Link
                                    href={`/events/details?slug=${ev.slug}`}
                                    className="w-100 radius-0 overflow-hidden d-block"
                                    style={{height: IMG_HEIGHT}}
                                >
                                    <img
                                        src={asAbs(ev.mainImageUrl)}
                                        alt={ev.title}
                                        className="w-100 h-100 object-fit-cover"
                                        onError={(e) => (e.currentTarget.src = "/assets/images/placeholder/placeholder-16x9.png")}
                                    />
                                </Link>

                                <div className="p-20 d-flex flex-column h-100">
                                    <h6 className="mb-12 text-line-2">
                                        <Link
                                            href={`/events/details?slug=${ev.slug}`}
                                            className="text-hover-primary-600 text-xl transition-2"
                                            title={ev.title}
                                        >
                                            {ev.title}
                                        </Link>
                                    </h6>

                                    <p
                                        className="text-neutral-500 mb-0"
                                        style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 4,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            minHeight: "4.8em",
                                        }}
                                        title={ev.summary}
                                    >
                                        {ev.summary}
                                    </p>

                                    <span className="d-block border-bottom border-neutral-300 border-dashed my-20"/>

                                    <div className="mt-16 d-flex align-items-center gap-8 flex-wrap">
                                        <Link
                                            href={`/edit-event/${ev.slug}`}
                                            className="btn btn-sm btn-primary-500 text-white border-0 d-flex align-items-center gap-1 text-xs px-10 py-6"
                                            role="button"
                                        >
                                            <Icon icon="mdi:pencil-outline" className="text-lg"/>
                                            Ndrysho
                                        </Link>

                                        <Link
                                            href={`/event-details/${ev.slug}`}
                                            className="btn btn-sm btn-outline-primary-600 text-white d-flex align-items-center gap-1 text-xs px-10 py-6"
                                            role="button"
                                        >
                                            <Icon icon="mdi:open-in-new" className="text-lg"/>
                                            Lexo më shumë
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(ev.slug)}
                                            className="btn btn-sm btn-primary-500 text-white border-0 d-flex align-items-center gap-1 text-xs px-10 py-6"
                                        >
                                            <Icon icon="mdi:trash-can-outline" className="text-lg"/>
                                            Fshi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="col-12">
                    <nav className="d-flex justify-content-center">
                        <ul className="pagination mb-0">
                            {/* First */}
                            <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => fetchPage(0)} aria-label="E para">«</button>
                            </li>
                            {/* Prev */}
                            <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => fetchPage(page - 1)} aria-label="Më parë">‹</button>
                            </li>

                            {buildPagination(page, totalPages, 1, 1).map((t, idx) =>
                                t === "dots" ? (
                                    <li key={`dots-${idx}`} className="page-item disabled">
                                        <span className="page-link">…</span>
                                    </li>
                                ) : (
                                    <li key={t} className={`page-item ${t - 1 === page ? "active" : ""}`}>
                                        <button className="page-link" onClick={() => fetchPage(t - 1)}>{t}</button>
                                    </li>
                                )
                            )}

                            {/* Next */}
                            <li className={`page-item ${page >= totalPages - 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => fetchPage(page + 1)} aria-label="Më pas">›</button>
                            </li>
                            {/* Last */}
                            <li className={`page-item ${page >= totalPages - 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => fetchPage(totalPages - 1)} aria-label="E fundit">»</button>
                            </li>
                        </ul>
                    </nav>
                    <div className="text-center mt-2 text-neutral-600 text-sm">
                        Faqja {page + 1} nga {totalPages} • {totalElements} gjithsej
                    </div>
                </div>
            )}

        </div>
    );
}
