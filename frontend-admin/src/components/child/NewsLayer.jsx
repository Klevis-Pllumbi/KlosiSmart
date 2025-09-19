"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {Icon} from "@iconify/react";

const PAGE_SIZE = 6; // 3 x 2

function NewsLayer() {
  const [page, setPage] = useState(0);
  const [content, setContent] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchPage(p) {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
          `http://localhost:8080/api/guest/news?page=${p}&size=${PAGE_SIZE}`
      );
      const data = res.data;
      setContent(data.content || []);
      setTotalPages(data.totalPages ?? 0);
      setTotalElements(data.totalElements ?? 0);
      setPage(data.number ?? p);
    } catch (e) {
      setError(
          e?.response?.data?.message || "Ndodhi një gabim gjatë marrjes së lajmeve."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPage(0);
  }, []);

  async function handleDelete(slug) {
    const result = await Swal.fire({
      title: "Je i sigurt?",
      text: "Ky lajm do të fshihet përgjithmonë.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Po, fshi!",
      cancelButtonText: "Anulo"
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8080/api/admin/news/${slug}`, {
        withCredentials: true,
      });

      Swal.fire({
        icon: "success",
        title: "U fshi!",
        text: "Lajmi u fshi me sukses.",
        timer: 1500,
        showConfirmButton: false
      });

      const wasLastOnPage = content.length === 1;
      await fetchPage(page);
      if (wasLastOnPage && page > 0) {
        await fetchPage(page - 1);
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Gabim",
        text: e?.response?.data?.message || "Ndodhi një gabim gjatë fshirjes së lajmit."
      });
    }
  }

  function goTo(p) {
    if (p < 0 || p >= totalPages) return;
    fetchPage(p);
  }

  function buildPageWindow(current, total, windowSize = 2) {
    // kthen një listë me numra faqe dhe string "..." për elipsat
    // 'current' dhe 'total' janë zero-based (pra current=0 është faqja 1)
    if (total <= 1) return [0];

    const pages = new Set([0, total - 1]); // gjithmonë trego të parën dhe të fundit
    for (let i = current - windowSize; i <= current + windowSize; i++) {
      if (i >= 0 && i < total) pages.add(i);
    }

    const sorted = Array.from(pages).sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < sorted.length; i++) {
      result.push(sorted[i]);
      if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) {
        result.push("..."); // elipsë midis blloqeve
      }
    }
    return result;
  }

  return (
      <div className="row gy-4">
        {/* Header */}
        <div className="col-12 d-flex justify-content-between align-items-center mb-2">
          <div>
            <h5 className="mb-0">Lajmet ({totalElements})</h5>
            <small className="text-neutral-500">Faqe {page + 1} nga {Math.max(totalPages, 1)}</small>
          </div>
          <Link href="/add-news" className="btn btn-primary-600">
            + Shto Lajm
          </Link>
        </div>

        {loading && (
            <div className="col-12"><div className="alert alert-info mb-0">Duke ngarkuar…</div></div>
        )}
        {error && (
            <div className="col-12"><div className="alert alert-danger mb-0">{error}</div></div>
        )}

        {!loading && !error && content.length === 0 && (
            <div className="col-12"><div className="alert alert-warning mb-0">Nuk ka lajme për të shfaqur.</div></div>
        )}

        {!loading && !error && content.map((news) => (
            <div key={news.id} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
              <div className="card h-100 p-0 radius-12 overflow-hidden">
                <div className="card-body p-0">
                  <Link
                      href={`/news/${news.slug}`}
                      className="w-100 max-h-266-px radius-0 overflow-hidden d-block"
                  >
                    <img
                        src={news.mainImageUrl ? `http://localhost:8080${news.mainImageUrl}` : "/assets/images/placeholder/16x9.png"}
                        alt={news.title}
                        className="w-100 h-100 object-fit-cover"
                    />
                  </Link>
                  <div className="p-20">
                    <h6 className="mb-16">
                      <Link
                          href={`/news-details/${news.slug}`}
                          className="text-line-2 text-hover-primary-600 text-xl transition-2"
                      >
                        {news.title}
                      </Link>
                    </h6>
                    <p className="text-line-3 text-neutral-500 mb-0">
                      {news.summary}
                    </p>
                    <span className="d-block border-bottom border-neutral-300 border-dashed my-20" />
                    <div className='d-flex align-items-center justify-content-between flex-wrap gap-6'>
                      <Link
                          href={`/edit-news/${news.slug}`}
                          className='btn btn-sm btn-primary-600 d-flex align-items-center gap-1 text-xs px-8 py-6'
                      >
                        <Icon icon="mdi:pencil-outline" className="text-lg"/>
                        Ndrysho
                      </Link>
                      <Link
                          href={`/news-details/${news.slug}`}
                          className='btn btn-sm btn-outline-primary-600 d-flex align-items-center gap-1 text-xs px-8 py-6'
                      >
                        <Icon icon="mdi:open-in-new" className="text-lg"/>
                        Lexo më shumë
                      </Link>
                      <button
                          type="button"
                          className='btn btn-sm btn-primary-500 d-flex align-items-center gap-1 text-xs px-8 py-6'
                          onClick={() => handleDelete(news.slug)}
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

        {totalPages > 1 && (
            <div className="col-12 d-flex justify-content-center mt-2">
              <nav aria-label="Pagination">
                <ul className="pagination mb-0">
                  {/* Fillimi */}
                  <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                    <button className="page-link" type="button" onClick={() => goTo(0)} aria-label="Faqja e parë">
                      ««
                    </button>
                  </li>
                  {/* Mbrapa */}
                  <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                    <button className="page-link" type="button" onClick={() => goTo(page - 1)} aria-label="Mbrapa">
                      «
                    </button>
                  </li>

                  {/* Numrat me dritare + elipsa */}
                  {buildPageWindow(page, totalPages, 2).map((item, idx) =>
                      item === "..." ? (
                          <li key={`ellipsis-${idx}`} className="page-item disabled">
                            <span className="page-link">…</span>
                          </li>
                      ) : (
                          <li key={item} className={`page-item ${item === page ? "active" : ""}`}>
                            <button className="page-link" type="button" onClick={() => goTo(item)}>
                              {item + 1}
                            </button>
                          </li>
                      )
                  )}

                  {/* Përpara */}
                  <li className={`page-item ${page >= totalPages - 1 ? "disabled" : ""}`}>
                    <button className="page-link" type="button" onClick={() => goTo(page + 1)} aria-label="Përpara">
                      »
                    </button>
                  </li>
                  {/* Fundi */}
                  <li className={`page-item ${page >= totalPages - 1 ? "disabled" : ""}`}>
                    <button className="page-link" type="button" onClick={() => goTo(totalPages - 1)} aria-label="Faqja e fundit">
                      »»
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
        )}

      </div>
  );
}

export default NewsLayer;
