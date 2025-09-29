'use client';
import { useEffect, useMemo, useState } from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Icon } from '@iconify/react';
import Newsletter from "@/components/sections/home2/Newsletter";

const API_BASE = 'http://localhost:8080';
const FILES_BASE_EVENTS = '/api/guest/files/events/';

const asAbs = (u) => {
    if (!u) return '';
    if (u.startsWith('http://') || u.startsWith('https://')) return u;
    const rel = u.includes('/') ? u : `${FILES_BASE_EVENTS}${u}`;
    const withSlash = rel.startsWith('/') ? rel : `/${rel}`;
    return `${API_BASE}${withSlash}`;
};

// ---- formate kohësh/datash
const toDate = (iso) => (iso ? new Date(iso) : null);
const fmtDate = (iso) =>
    iso
        ? new Intl.DateTimeFormat('sq-AL', {
            timeZone: 'Europe/Tirane',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(new Date(iso))
        : '';
const fmtTime = (iso) =>
    iso
        ? new Intl.DateTimeFormat('sq-AL', {
            timeZone: 'Europe/Tirane',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(new Date(iso))
        : '';
const isSameDay = (a, b) => {
    const da = toDate(a), db = toDate(b);
    if (!da || !db) return false;
    return (
        da.getFullYear() === db.getFullYear() &&
        da.getMonth() === db.getMonth() &&
        da.getDate() === db.getDate()
    );
};
const dateBadge = (startAt, endAt) => {
    if (startAt && endAt && !isSameDay(startAt, endAt)) {
        return `${fmtDate(startAt)} - ${fmtDate(endAt)}`;
    }
    return fmtDate(startAt || endAt);
};
const timeRange = (startAt, endAt) => {
    const s = fmtTime(startAt);
    const e = fmtTime(endAt);
    if (s && e) return `${s} - ${e}`;
    return s || e || '';
};

export default function EventDetailsPage() {
    // merr slug-un nga rruga /events/[slug]
    const params = useParams();
    const slug = params?.slug;

    const [ev, setEv] = useState(null);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const gallery = useMemo(() => (Array.isArray(ev?.imageUrls) ? ev.imageUrls : []), [ev]);
    const docs = useMemo(() => (Array.isArray(ev?.documentUrls) ? ev.documentUrls : []), [ev]);
    const actions = useMemo(
        () =>
            Array.isArray(ev?.actions)
                ? [...ev.actions].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
                : [],
        [ev]
    );
    const persons = useMemo(
        () =>
            Array.isArray(ev?.persons)
                ? [...ev.persons].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
                : [],
        [ev]
    );

    const buildMapEmbed = ({ lat, lng, address }) => {
        const hasLat = lat !== null && lat !== undefined && `${lat}` !== "";
        const hasLng = lng !== null && lng !== undefined && `${lng}` !== "";

        // 1) Kur kemi koordinata → embed me pin
        if (hasLat && hasLng) {
            const loc = `${lat},${lng}`;
            return `https://www.google.com/maps?output=embed&hl=sq&z=15&q=${encodeURIComponent(loc)}`;
        }

        // 2) Kur kemi adresë tekstuale
        if (address && address.trim()) {
            return `https://www.google.com/maps?output=embed&hl=sq&z=15&q=${encodeURIComponent(address.trim())}`;
        }

        return null;
    };

    const mapSrc = buildMapEmbed({
        lat: ev?.mapLat,
        lng: ev?.mapLng,
        address: ev?.locationAddress || ev?.locationName,
    });

    useEffect(() => {
        if (!slug) return;
        (async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${API_BASE}/api/guest/events/${slug}`);
                setEv(data);
                setError(""); // pastro në rast suksesi
            } catch (e) {
                const msg =
                    e?.response?.data?.message ||
                    (e?.response?.status === 404
                        ? "Eventi nuk u gjet."
                        : "Ndodhi një gabim gjatë marrjes së eventit.");
                setError(msg);
            } finally {
                setLoading(false);
            }
        })();
    }, [slug]);


    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={ev?.title ?? 'Detajet e eventit'}>
            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}
            <div>
                {/* Event Details */}
                <section className="event-details">
                    <div className="auto-container">
                        {/* Top: imazh kryesor + një imazh sekondar nëse do (opsionale) */}
                        <div className="event-details__top">
                            <div className="row">
                                {/* Imazhi kryesor */}
                                {ev?.mainImageUrl && (
                                    <div className="col-xl-12">
                                        <div className="event-details__top-single">
                                            <div
                                                className="event-details__top-single-img"
                                                style={{ width: '100%', maxHeight: 480, overflow: 'hidden', borderRadius: 8 }}
                                            >
                                                <img
                                                    src={asAbs(ev.mainImageUrl)}
                                                    alt={ev?.title || 'Event'}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bottom */}
                        <div className="event-details__bottom">
                            <div className="row">
                                {/* Content */}
                                <div className="col-xl-8 col-lg-7">
                                    <div className="event-details__content">
                                        {/* Titulli */}
                                        <div className="mb-3">
                                            <h1 className="mb-2">{ev?.title || (loading ? 'Duke ngarkuar…' : '—')}</h1>
                                            {/* badge me datat */}
                                            {(ev?.startAt || ev?.endAt) && (
                                                <div
                                                    className="d-inline-block"
                                                    style={{ padding: '6px 10px', background: '#f5f7fb', borderRadius: 8, minWidth: 160 }}
                                                    title={dateBadge(ev?.startAt, ev?.endAt)}
                                                >
                                                    <span className="icon-calendar-1" />{' '}
                                                    <strong>{dateBadge(ev?.startAt, ev?.endAt)}</strong>
                                                    {timeRange(ev?.startAt, ev?.endAt) ? (
                                                        <span style={{ marginLeft: 8 }}>• {timeRange(ev?.startAt, ev?.endAt)}</span>
                                                    ) : null}
                                                </div>
                                            )}
                                        </div>

                                        {/* Përmbledhja */}
                                        {ev?.summary && (
                                            <p
                                                className="text-muted"
                                                style={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 4,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}
                                                title={ev.summary}
                                            >
                                                {ev.summary}
                                            </p>
                                        )}

                                        {/* Galeria (nëse ka) */}
                                        {gallery.length > 0 && (
                                            <div className="mt-4">
                                                <h3 className="mb-3">Foto</h3>
                                                <div className="row">
                                                    {gallery.map((u, i) => (
                                                        <div className="col-xl-6 col-lg-12 col-md-6 mb-3" key={i}>
                                                            <div className="img-box" style={{ height: 260, overflow: 'hidden', borderRadius: 8 }}>
                                                                <img
                                                                    src={asAbs(u)}
                                                                    alt={`img-${i}`}
                                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Content (HTML) */}
                                        {ev?.content && (
                                            <div className="mt-4">
                                                <h3 className="mb-3">Përmbajtja</h3>
                                                <div className="prose" dangerouslySetInnerHTML={{ __html: ev.content }} />
                                            </div>
                                        )}

                                        {/* Agjenda + një foto nga galeria si në template */}
                                        <div className="event-details__content-text2">
                                            <div className="row">
                                                {/* Kolona majtas: një imazh (merret i pari nga galeria ose fallback) */}
                                                {/*<div className="col-xl-6 col-lg-12 col-md-6">*/}
                                                {/*    <div className="img-box" style={{ height: 260, overflow: "hidden", borderRadius: 8 }}>*/}
                                                {/*        <img*/}
                                                {/*            src={asAbs(gallery[0] || ev?.mainImageUrl || "/assets/images/resources/event-details-img3.jpg")}*/}
                                                {/*            alt="event-img"*/}
                                                {/*            style={{ width: "100%", height: "100%", objectFit: "cover" }}*/}
                                                {/*        />*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}

                                                {/* Kolona djathtas: Agjenda me ikonat e template-it */}
                                                <div className="col-xl-6 col-lg-12 col-md-6">
                                                    <div className="content-box">
                                                        <h2>Agjenda</h2>
                                                        {actions.length === 0 ? (
                                                            <p>Nuk ka agjendë të publikuar.</p>
                                                        ) : (
                                                            <ul>
                                                                {actions.map((a, i) => (
                                                                    <li key={i}>
                                                                        <div className="icon">
                                                                            <span className="icon-check-mark"></span>
                                                                        </div>
                                                                        <div className="text">
                                                                            <p>
                                                                                <strong>{a.title}</strong>
                                                                                {a.scheduledAt && (
                                                                                    <> — {fmtDate(a.scheduledAt)} • {fmtTime(a.scheduledAt)}</>
                                                                                )}
                                                                                {a.description ? <> — {a.description}</> : null}
                                                                            </p>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/* Speakers & Chief Guests (template grid) */}
                                        {persons.length > 0 && (
                                            <div className="event-details__content-text4">
                                                <div className="title">
                                                    <h2>Të ftuarit</h2>
                                                </div>
                                                <div className="row">
                                                    {persons.map((p, idx) => (
                                                        <div className="col-xl-4" key={idx}>
                                                            <div className="event-details__content-text4-single">
                                                                <div
                                                                    className="img-box d-flex align-items-center justify-content-center"
                                                                    style={{
                                                                        height: 220,
                                                                        borderRadius: 8,
                                                                        background: "#e5e7eb", // gri e lehtë
                                                                        overflow: "hidden",
                                                                    }}
                                                                >
                                                                    {p.photoUrl ? (
                                                                        <img
                                                                            src={asAbs(p.photoUrl)}
                                                                            alt={p.name || "Person"}
                                                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                                        />
                                                                    ) : (
                                                                        <Icon
                                                                            icon="mdi:account"
                                                                            className="text-neutral-600"
                                                                            width="64"
                                                                            height="64"
                                                                        />
                                                                    )}
                                                                </div>
                                                                <div className="content-box text-center">
                                                                    <h3>
                                                                        <Link href="#">{p.name || "—"}</Link>
                                                                    </h3>
                                                                    <p>
                                                                        {p.role ||
                                                                            (p.type === "SPEAKER"
                                                                                ? "Speaker"
                                                                                : p.type === "GUEST"
                                                                                    ? "Guest"
                                                                                    : "")}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}


                                        {/* Download Resources (template list) */}
                                        {docs.length > 0 && (
                                            <div className="departments-details__content-button">
                                                <div className="title">
                                                    <h2>Shkarko Dokumentet</h2>
                                                </div>

                                                {docs.map((u, idx) => {
                                                    const abs = asAbs(u);
                                                    const name = (u || "").split("/").pop() || "Dokument";
                                                    const ext = name.split(".").pop()?.toLowerCase();
                                                    const isPdf = ext === "pdf";
                                                    return (
                                                        <div
                                                            className="departments-details__content-button-single"
                                                            key={idx}
                                                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                                                        >
                                                            <div className="left" style={{ flex: 1, minWidth: 0 }}>
                                                                <div className="icon-box">
                                                                    <span className={isPdf ? "icon-pdf" : "icon-pdf"}></span>
                                                                </div>
                                                                <div className="text-box" style={{ overflow: "hidden" }}>
                                                                    <h4
                                                                        style={{
                                                                            whiteSpace: "nowrap",
                                                                            overflow: "hidden",
                                                                            textOverflow: "ellipsis",
                                                                        }}
                                                                        title={name} // tooltip kur është shumë i gjatë
                                                                    >
                                                                        {name}
                                                                    </h4>
                                                                    <p>{ext ? ext.toUpperCase() : "Skedar"}</p>
                                                                </div>
                                                            </div>
                                                            <div className="right">
                                                                <div className="button-box">
                                                                    <Link href={abs} target="_blank">
                                                                        Shkarko
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}

                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="col-xl-4 col-lg-5">
                                    <div className="event-details__sidebar">
                                        <div className="event-details__sidebar-single info-box">
                                            <div className="title">
                                                <h2>Detajet e eventit</h2>
                                            </div>
                                            <ul className="event-details__sidebar-single-list">
                                                {(ev?.startAt || ev?.endAt) && (
                                                    <>
                                                        <li>
                                                            <div className="icon-box">
                                                                <span className="icon-calendar-1"></span>
                                                            </div>
                                                            <div className="text-box">
                                                                <h4>Data e fillimit:</h4>
                                                                <p>
                                                                    {fmtDate(ev?.startAt)} {fmtTime(ev?.startAt) && `• ${fmtTime(ev?.startAt)}`}
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="icon-box">
                                                                <span className="icon-calendar-1"></span>
                                                            </div>
                                                            <div className="text-box">
                                                                <h4>Data e mbarimit:</h4>
                                                                <p>
                                                                    {fmtDate(ev?.endAt)} {fmtTime(ev?.endAt) && `• ${fmtTime(ev?.endAt)}`}
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="icon-box">
                                                                <span className="icon-wall-clock"></span>
                                                            </div>
                                                            <div className="text-box">
                                                                <h4>Ora:</h4>
                                                                <p>{timeRange(ev?.startAt, ev?.endAt) || '—'}</p>
                                                            </div>
                                                        </li>
                                                    </>
                                                )}

                                                {(ev?.locationName || ev?.locationAddress) && (
                                                    <li>
                                                        <div className="icon-box">
                                                            <span className="icon-pin"></span>
                                                        </div>
                                                        <div className="text-box">
                                                            <h4>Vendi:</h4>
                                                            <p>
                                                                {ev?.locationName}
                                                                {ev?.locationName && ev?.locationAddress ? ' — ' : ''}
                                                                {ev?.locationAddress}
                                                            </p>
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>

                                        {/* Harta */}
                                        {/* Sidebar Map & Venue */}
                                        {(ev?.mapLat && ev?.mapLng) || ev?.locationUrl ? (
                                            <div>
                                                {/* Harta */}
                                                <div className="event-details__sidebar-map">
                                                    <iframe
                                                        src={mapSrc}
                                                        className="event-details__map"
                                                        style={{ width: "100%", height: 300, border: 0 }}
                                                        loading="lazy"
                                                        allowFullScreen
                                                        referrerPolicy="no-referrer-when-downgrade"
                                                        title="Harta e vendit"
                                                    />
                                                </div>

                                                {/* Venue Info */}
                                                <div className="event-details__sidebar-single contact-info">
                                                    <div className="title">
                                                        <h2>Vendndodhja</h2>
                                                    </div>

                                                    <div className="text-box">
                                                        <p>
                                                            {ev?.locationName && ev?.locationAddress
                                                                ? `${ev.locationName}, ${ev.locationAddress}`
                                                                : ev?.locationName || ev?.locationAddress || "—"}
                                                        </p>
                                                    </div>

                                                    <ul className="event-details__sidebar-single-contact-list">
                                                        {ev?.locationAddress && (
                                                            <li>
                                                                <div className="icon-box">
                                                                    <span className="icon-pin"></span>
                                                                </div>
                                                                <div className="text">
                                                                    <p>{ev.locationAddress}</p>
                                                                </div>
                                                            </li>
                                                        )}
                                                        {ev?.locationUrl && (
                                                            <li>
                                                                <div className="icon-box">
                                                                    <Icon icon="mdi:map-outline"
                                                                          className="text-xl text-white"/>
                                                                </div>
                                                                <div className="text">
                                                                <p>
                                                                        <Link href={ev.locationUrl} target="_blank" rel="noreferrer">
                                                                            Shiko në hartë
                                                                        </Link>
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : null}

                                    </div>
                                </div>
                                {/* End Sidebar */}
                            </div>
                        </div>
                    </div>
                </section>

                <Newsletter />
            </div>
        </Layout>
    );
}
