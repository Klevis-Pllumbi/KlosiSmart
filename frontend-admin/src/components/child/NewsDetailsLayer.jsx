"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

function asAbs(url) {
  if (!url) return "";
  // në DB vjen si "/api/guest/files/news/..." → shto host-in
  if (url.startsWith("http")) return url;
  return `http://localhost:8080${url}`;
}

const NewsDetailsLayer = ({ slug }) => {
  const [news, setNews] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        const [detailRes, latestRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/guest/news/${slug}`),
          axios.get(`http://localhost:8080/api/guest/news?page=0&size=4`),
        ]);
        if (!mounted) return;
        setNews(detailRes.data);
        setLatestNews(latestRes.data?.content || []);
      } catch (e) {
        if (!mounted) return;
        setError(e?.response?.data?.message || "Ndodhi një gabim gjatë marrjes së lajmit.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    if (slug) fetchAll();
    return () => { mounted = false; };
  }, [slug]);

  if (loading) {
    return <div className='alert alert-info mb-0'>Duke ngarkuar…</div>;
  }
  if (error) {
    return <div className='alert alert-danger mb-0'>{error}</div>;
  }
  if (!news) {
    return <div className='alert alert-warning mb-0'>Lajmi nuk u gjet.</div>;
  }

  const title = news.title || "";
  const summary = news.summary || "";
  const contentHtml = news.content || ""; // i besuar sepse vjen nga admini juaj
  const mainImageUrl = asAbs(news.mainImageUrl);
  const imageUrls = Array.isArray(news.imageUrls) ? news.imageUrls.map(asAbs) : [];
  const documentUrls = Array.isArray(news.documentUrls) ? news.documentUrls.map(asAbs) : [];
  const tags = Array.isArray(news.tags) ? news.tags : [];

  return (
      <div className='row gy-4'>
        <div className='col-lg-8'>
          <div className='card p-0 radius-12 overflow-hidden'>
            <div className='card-body p-0'>
              {/* Main image */}
              {mainImageUrl ? (
                  <img src={mainImageUrl} alt={title} className='w-100 h-100 object-fit-cover' />
              ) : (
                  <img src='/assets/images/placeholder/16x9.png' alt={title} className='w-100 h-100 object-fit-cover' />
              )}

              <div className='p-32'>
                {/* Header info (mund ta personalizosh me author/date nëse i ke) */}
                <h3 className='mb-16'>{title}</h3>

                {/* Summary */}
                {summary && (
                    <p className='text-neutral-500 mb-16'>{summary}</p>
                )}

                {/* Gallery images */}
                {imageUrls && imageUrls.length > 0 && (
                    <div className='row g-3 mb-24'>
                      {imageUrls.map((img, i) => (
                          <div key={i} className='col-md-6'>
                            <div className='radius-12 overflow-hidden border'>
                              <img src={img} alt={`img-${i}`} className='w-100 h-100 object-fit-cover' />
                            </div>
                          </div>
                      ))}
                    </div>
                )}

                {/* Content (nga Quill) */}
                {contentHtml && (
                    <div className='mb-24' dangerouslySetInnerHTML={{ __html: contentHtml }} />
                )}

                {/* Documents – me "Shkarko" */}
                {documentUrls && documentUrls.length > 0 && (
                    <div className='mb-8'>
                      <h6 className='mb-12'>Dokumente</h6>
                      <div className='d-flex flex-column gap-2'>
                        {documentUrls.map((doc, idx) => {
                          const fileName = doc.split("/").pop();
                          return (
                              <div key={idx} className='d-flex justify-content-between align-items-center p-3 border rounded bg-light'>
                                <div className='d-flex align-items-center gap-2' style={{flex: 1, minWidth: 0}}>
                                  <i className='ri-file-line' />
                                  <span className='text-truncate' style={{maxWidth: "70%"}}>{fileName}</span>
                                </div>
                                <a
                                    href={doc}
                                    className='btn btn-sm btn-outline-primary-600 ms-2'
                                    download
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                  Shkarko
                                </a>
                              </div>
                          );
                        })}
                      </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Start */}
        <div className='col-lg-4'>
          <div className='d-flex flex-column gap-24'>
            {/* Latest Blog */}
            <div className='card'>
              <div className='card-header border-bottom'>
                <h6 className='text-xl mb-0'>Lajmet e fundit</h6>
              </div>
              <div className='card-body d-flex flex-column gap-24 p-24'>
                {latestNews.map((n) => (
                    <div key={n.id} className='d-flex flex-wrap'>
                      <Link href={`/news/${n.slug}`} className='blog__thumb w-100 radius-12 overflow-hidden'>
                        <img
                            src={n.mainImageUrl ? asAbs(n.mainImageUrl) : "/assets/images/placeholder/4x3.png"}
                            alt={n.title}
                            className='w-100 h-100 object-fit-cover'
                        />
                      </Link>
                      <div className='blog__content'>
                        <h6 className='mb-8'>
                          <Link href={`/news/${n.slug}`} className='text-line-2 text-hover-primary-600 text-md transition-2'>
                            {n.title}
                          </Link>
                        </h6>
                        <p className='text-line-2 text-sm text-neutral-500 mb-0'>{n.summary}</p>
                      </div>
                    </div>
                ))}
              </div>
            </div>

            {/* Tags - tagët e lidhur me këtë lajm */}
            {tags && tags.length > 0 && (
                <div className='card'>
                  <div className='card-header border-bottom'>
                    <h6 className='text-xl mb-0'>Etiketa</h6>
                  </div>
                  <div className='card-body p-24'>
                    <div className='d-flex align-items-center flex-wrap gap-8'>
                      {tags.map((t, i) => {
                        const label = typeof t === 'string' ? t : (t?.name || "");
                        return (
                            <Link key={i} href={`#`} className='btn btn-sm btn-primary-600 bg-primary-50 bg-hover-primary-600 text-primary-600 border-0 d-inline-flex align-items-center gap-1 text-sm px-16 py-6'>
                              {label}
                            </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default NewsDetailsLayer;
