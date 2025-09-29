"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Newsletter from "@/components/sections/home2/Newsletter";

// Helper: absolute URL for media served as /api/guest/files/news/<file>
function asAbs(url) {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `http://localhost:8080${url}`;
}

// Build a compact pagination window: always show 1, last, current±N with ellipses
function buildPageWindow(current, total, windowSize = 2) {
    if (!total || total <= 1) return [0];
    const pages = new Set([0, total - 1]);
    for (let i = current - windowSize; i <= current + windowSize; i++) {
        if (i >= 0 && i < total) pages.add(i);
    }
    const sorted = Array.from(pages).sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < sorted.length; i++) {
        result.push(sorted[i]);
        if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) result.push("...");
    }
    return result;
}

export default function NewsListPage() {
    const [page, setPage] = useState(0);
    const [size] = useState(5); // 5 items/page
    const [content, setContent] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // filters
    const [search, setSearch] = useState("");
    const [activeTag, setActiveTag] = useState("");
    const [availableTags, setAvailableTags] = useState([]);

    // sidebar latest
    const [latestNews, setLatestNews] = useState([]);

    const pageWindow = useMemo(() => buildPageWindow(page, totalPages, 2), [page, totalPages]);

    async function fetchNews(p = 0, opts = {}) {
        const { q = search, tag = activeTag } = opts;
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            params.set("page", String(p));
            params.set("size", String(size));
            if (q && q.trim()) params.set("q", q.trim());
            if (tag && tag.trim()) params.set("tag", tag.trim());

            const url = `http://localhost:8080/api/guest/news?${params.toString()}`;
            const res = await axios.get(url);
            const data = res.data;
            setContent(data.content || []);
            setTotalPages(data.totalPages ?? 0);
            setTotalElements(data.totalElements ?? 0);
            setPage(data.number ?? p);
        } catch (e) {
            setError(e?.response?.data?.message || "Ndodhi një gabim gjatë marrjes së lajmeve.");
        } finally {
            setLoading(false);
        }
    }

    async function fetchSidebar() {
        try {
            const [tagsRes, latestRes] = await Promise.all([
                axios.get("http://localhost:8080/api/guest/news/tags"),
                axios.get("http://localhost:8080/api/guest/news?page=0&size=3"),
            ]);
            setAvailableTags(tagsRes.data || []);
            setLatestNews(latestRes.data?.content || []);
        } catch (e) {
            // silent
        }
    }

    useEffect(() => {
        fetchNews(0);
        fetchSidebar();
    }, []);

    function onSubmitSearch(e) {
        e.preventDefault();
        fetchNews(0, { q: search, tag: activeTag });
    }

    function onClickTag(tag, e) {
        if (e) e.preventDefault();
        const next = tag === activeTag ? "" : tag;
        setActiveTag(next);
        fetchNews(0, { q: search, tag: next });
    }

    function clearSearch(e) {
        if (e) e.preventDefault();
        setSearch("");
        fetchNews(0, { q: "", tag: activeTag });
    }

    function goTo(p, e) {
        if (e) e.preventDefault();
        if (p < 0 || p >= totalPages) return;
        fetchNews(p);
    }

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Lajme">
            <div>
                <section className="blog-standard">
                    <div className="auto-container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-7">
                                <div className="blog-standard__content">
                                    {loading && (<div className="alert alert-info">Duke ngarkuar…</div>)}
                                    {error && (<div className="alert alert-danger">{error}</div>)}
                                    {!loading && !error && content.length === 0 && (
                                        <div className="alert alert-warning">Nuk u gjet asnjë lajm.</div>
                                    )}

                                    {!loading && !error && content.map((n) => (
                                        <div key={n.id} className="blog-style1__single">
                                            <div className="blog-style1__single-img">
                                                <Link href={`/news/${n.slug}`}>
                                                    <img
                                                        src={n.mainImageUrl ? asAbs(n.mainImageUrl) : "assets/images/blog/blog-standard-img1.jpg"}
                                                        alt={n.title}
                                                        style={{ width: "100%", height: "480px", objectFit: "cover" }}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="blog-style1__single-content">
                                                <div className="date-box">
                                                    <p><span className="icon-calendar"></span> {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : ""}</p>
                                                </div>
                                                <h2><Link href={`/news/${n.slug}`}>{n.title}</Link></h2>
                                                <div className="text">
                                                    <p style={{
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 4,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden"
                                                    }}>{n.summary}</p>
                                                </div>
                                                <div className="blog-style1__single-conten-btn">
                                                    <Link className="btn-one" href={`/news/${n.slug}`}>
                                                        <span className="txt">Lexo më shumë</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {totalPages > 1 && (
                                        <ul className="styled-pagination clearfix">
                                            <li className={`arrow prev ${page === 0 ? "disabled" : ""}`}>
                                                <Link href="#" onClick={(e) => goTo(page - 1, e)}>
                                                    <span className="icon-left-arrow-1"></span>
                                                </Link>
                                            </li>
                                            {pageWindow.map((item, idx) =>
                                                item === "..." ? (
                                                    <li key={`ellipsis-${idx}`} className="disabled"><span>…</span></li>
                                                ) : (
                                                    <li key={item} className={item === page ? "active" : ""}>
                                                        <Link href="#" onClick={(e) => goTo(item, e)}>{item + 1}</Link>
                                                    </li>
                                                )
                                            )}
                                            <li className={`arrow next ${page >= totalPages - 1 ? "disabled" : ""}`}>
                                                <Link href="#" onClick={(e) => goTo(page + 1, e)}>
                                                    <span className="icon-next"></span>
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-5">
                                <div className="thm-sidebar-box">
                                    <div className="single-sidebar-box">
                                        <div className="sidebar-title"><h3>Kërko</h3></div>
                                        <div className="sidebar-search-box">
                                            <form className="search-form" onSubmit={onSubmitSearch}>
                                                <input
                                                    placeholder="Kërko…"
                                                    type="text"
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                />
                                                {search && (
                                                    <button type="button" onClick={clearSearch} style={{ position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", cursor: "pointer" }}>
                                                        <i className="fa fa-times" aria-hidden="true"></i>
                                                    </button>
                                                )}
                                                <button type="submit">
                                                    <i className="fa fa-search" aria-hidden="true"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="single-sidebar-box">
                                        <div className="sidebar-title"><h3>Etiketat</h3></div>
                                        <div className="popular-tag-box">
                                            <ul className="popular-tag">
                                                {availableTags.map((t) => (
                                                    <li key={t} className={activeTag === t ? "active" : ""}>
                                                        <Link href="#" onClick={(e) => onClickTag(t, e)}>{t}</Link>
                                                    </li>
                                                ))}
                                                {activeTag && (
                                                    <li>
                                                        <Link href="#" onClick={(e) => onClickTag(activeTag, e)}>Hiq filtrin</Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="single-sidebar-box">
                                        <div className="sidebar-title"><h3>Lajmet e fundit</h3></div>
                                        <div className="sidebar-blog-post">
                                            <ul className="blog-post">
                                                {latestNews.map((n) => (
                                                    <li key={n.id}>
                                                        <div className="inner">
                                                            <div className="img-box">
                                                                <img
                                                                    src={n.mainImageUrl ? asAbs(n.mainImageUrl) : "assets/images/sidebar/blog-post-img1.jpg"}
                                                                    alt={n.title}
                                                                    style={{ width: "100%", height: "90px", objectFit: "cover" }}
                                                                />
                                                                <div className="overlay-content">
                                                                    <Link href={`/news/${n.slug}`}><i className="fa fa-link" aria-hidden="true"></i></Link>
                                                                </div>
                                                            </div>
                                                            <div className="title-box">
                                                                <h4><Link href={`/news/${n.slug}`}>{n.title}</Link></h4>
                                                                <p><span className="icon-calendar-1"></span> {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : ""}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Newsletter />
            </div>
        </Layout>
    );
}
