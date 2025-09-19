"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import AlertContainer from "@/components/AlertContainer";

// Helpers
const asAbs = (u) => {
    if (!u) return "";
    if (u.startsWith("http://") || u.startsWith("https://")) return u;
    const withSlash = u.startsWith("/") ? u : `/${u}`;
    return `http://localhost:8080${withSlash}`;
};

const fmtDateTime = (iso) => {
    if (!iso) return "-";
    try {
        const d = new Date(iso);
        return new Intl.DateTimeFormat("sq-AL", {
            timeZone: "Europe/Tirane",
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(d);
    } catch {
        return iso;
    }
};

const fileIcon = (filename = "") => {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return <Icon icon="mdi:file-pdf-box" className="text-2xl text-danger-600 me-2" />;
    if (["doc", "docx"].includes(ext)) return <Icon icon="mdi:file-word-box" className="text-2xl text-primary-600 me-2" />;
    if (["xls", "xlsx"].includes(ext)) return <Icon icon="mdi:file-excel-box" className="text-2xl text-success-600 me-2" />;
    return <Icon icon="mdi:file-outline" className="text-2xl me-2" />;
};

export default function AdminEventDetailsLayer({ slug }) {
    const [event, setEvent] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const addAlert = (type, title, description) => {
        const id = crypto.randomUUID();
        setAlerts((prev) => [...prev, { id, type, title, description }]);
    };
    const removeAlert = (id) => setAlerts((prev) => prev.filter((a) => a.id !== id));

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        (async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`http://localhost:8080/api/guest/events/${slug}`);
                setEvent(data);
            } catch (e) {
                addAlert("error", "Gabim", e?.response?.data?.message || "Ndodhi një gabim gjatë marrjes së eventit.");
            } finally {
                setLoading(false);
            }
        })();
    }, [slug]);

    const gallery = useMemo(() => (Array.isArray(event?.imageUrls) ? event.imageUrls : []), [event]);
    const docs = useMemo(() => (Array.isArray(event?.documentUrls) ? event.documentUrls : []), [event]);
    const actions = useMemo(
        () => (Array.isArray(event?.actions) ? [...event.actions].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0)) : []),
        [event]
    );
    const persons = useMemo(
        () => (Array.isArray(event?.persons) ? [...event.persons].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0)) : []),
        [event]
    );

    const mapEmbedSrc = useMemo(() => {
        const lat = event?.mapLat;
        const lng = event?.mapLng;
        if (lat !== null && lat !== undefined && lat !== "" && lng !== null && lng !== undefined && lng !== "") {
            const q = `${lat},${lng}`;
            return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`;
        }
        return null;
    }, [event]);

    return (
        <div className="row gy-4">
            {/* Kolona kryesore */}
            <div className="col-lg-8">
                <div className="card p-0 radius-12 overflow-hidden">
                    <div className="card-body p-0">
                        {/* Titulli */}
                        <div className="p-24 pb-0">
                            {loading ? (
                                <div className="placeholder-glow"><div className="placeholder col-8" style={{ height: 28 }} /></div>
                            ) : (
                                <h3 className="mb-12">{event?.title}</h3>
                            )}
                        </div>

                        {/* Imazhi kryesor */}
                        {event?.mainImageUrl && (
                            <div className="w-100 radius-0 overflow-hidden" style={{ maxHeight: 420 }}>
                                <img
                                    src={asAbs(event.mainImageUrl)}
                                    alt={event?.title || "Event"}
                                    className="w-100 h-100 object-fit-cover"
                                />
                            </div>
                        )}

                        <div className="p-24">
                            {/* Summary */}
                            {event?.summary && (
                                <p
                                    className="text-neutral-600 mb-16"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 4,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                    title={event.summary}
                                >
                                    {event.summary}
                                </p>
                            )}

                            {/* Galeria e fotove */}
                            {gallery.length > 0 && (
                                <>
                                    <h6 className="mb-12">Foto të tjera</h6>
                                    <div className="row g-3 mb-24">
                                        {gallery.map((u, i) => (
                                            <div className="col-md-6" key={i}>
                                                <div className="radius-12 overflow-hidden border" style={{ height: 260 }}>
                                                    <img
                                                        src={asAbs(u)}
                                                        alt={`img-${i}`}
                                                        className="w-100 h-100 object-fit-cover"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Content (HTML) */}
                            {event?.content && (
                                <div className="mb-24">
                                    <h6 className="mb-12">Përmbajtja</h6>
                                    <div
                                        className="prose"
                                        dangerouslySetInnerHTML={{ __html: event.content }}
                                    />
                                </div>
                            )}

                            {/* Agjenda */}
                            {actions.length > 0 && (
                                <div className="mb-24">
                                    <h6 className="mb-12">Agjenda</h6>
                                    <div className="d-flex flex-column gap-2">
                                        {actions.map((a, idx) => (
                                            <div key={idx} className="border rounded p-3">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <strong className="me-3">{a.title}</strong>
                                                    {a.scheduledAt && (
                                                        <span className="badge bg-primary-100 text-primary-700">
                                                          <Icon icon="mdi:clock-outline" className="me-1" />
                                                            {fmtDateTime(a.scheduledAt)}
                                                        </span>
                                                    )}
                                                </div>
                                                {a.description && <div className="text-neutral-700">{a.description}</div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Personat (folësit / të ftuarit) */}
                            {persons.length > 0 && (
                                <div className="mb-24">
                                    <h6 className="mb-12">Të ftuarit</h6>
                                    <div className="row g-3">
                                        {persons.map((p, idx) => (
                                            <div className="col-md-6" key={idx}>
                                                <div className="card h-100 p-16 d-flex flex-row gap-12 align-items-center">
                                                    <div
                                                        className="rounded-circle overflow-hidden flex-shrink-0 border justify-content-center"
                                                        style={{ width: 64, height: 64 }}
                                                    >
                                                        {p.photoUrl ? (
                                                            <img
                                                                src={asAbs(p.photoUrl)}
                                                                alt={p.name || "Person"}
                                                                className="w-100 h-100 object-fit-cover"
                                                            />
                                                        ) : (
                                                            <Icon icon="mdi:account-circle" className="text-4xl text-neutral-400" style={{ width: 64, height: 64 }} />
                                                        )}
                                                    </div>
                                                    <div className="d-flex flex-column">
                                                        <div className="d-flex align-items-center gap-8">
                                                            <strong>{p.name}</strong>
                                                            {p.type && (
                                                                <span className="badge bg-primary-50 text-primary-600 border-0">
                                                                  {p.type === "SPEAKER" ? "Speaker" : "Guest"}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {p.role && <span className="text-neutral-600">{p.role}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Dokumentet (download) */}
                            {docs.length > 0 && (
                                <div className="mb-8">
                                    <h6 className="mb-12">Dokumente</h6>
                                    <div className="d-flex flex-column gap-2">
                                        {docs.map((u, idx) => {
                                            const name = (u || "").split("/").pop();
                                            return (
                                                <div
                                                    key={idx}
                                                    className="d-flex justify-content-between align-items-center p-3 border rounded bg-light"
                                                >
                                                    <div className="d-flex align-items-center">
                                                        {fileIcon(name)}
                                                        <span className="text-truncate" style={{ maxWidth: 360 }} title={name}>
                              {name}
                            </span>
                                                    </div>
                                                    <a
                                                        href={asAbs(u)}
                                                        className="btn btn-sm btn-outline-primary-600"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        download
                                                    >
                                                        <Icon icon="mdi:download" className="me-1" />
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

                {/* Alerts */}
                <div className="mt-3">
                    <AlertContainer alerts={alerts} onClose={removeAlert} />
                </div>
            </div>

            {/* Sidebar – Detajet e eventit */}
            <div className="col-lg-4">
                <div className="d-flex flex-column gap-24">
                    <div className="card">
                        <div className="card-header border-bottom">
                            <h6 className="text-xl mb-0">Detajet e eventit</h6>
                        </div>
                        <div className="card-body p-24 d-flex flex-column gap-12">
                            <div className="d-flex align-items-start gap-8">
                                <Icon icon="mdi:calendar-start" className="text-xl text-primary-600" />
                                <div>
                                    <div className="text-neutral-500">Fillon</div>
                                    <strong>{fmtDateTime(event?.startAt)}</strong>
                                </div>
                            </div>
                            <div className="d-flex align-items-start gap-8">
                                <Icon icon="mdi:calendar-end" className="text-xl text-primary-600" />
                                <div>
                                    <div className="text-neutral-500">Mbaron</div>
                                    <strong>{fmtDateTime(event?.endAt)}</strong>
                                </div>
                            </div>
                            {event?.locationName && (
                                <div className="d-flex align-items-start gap-8">
                                    <Icon icon="mdi:map-marker" className="text-xl text-primary-600" />
                                    <div>
                                        <div className="text-neutral-500">Vendi</div>
                                        <strong>{event.locationName}</strong>
                                    </div>
                                </div>
                            )}
                            {event?.locationAddress && (
                                <div className="d-flex align-items-start gap-8">
                                    <Icon icon="mdi:home-map-marker" className="text-xl text-primary-600" />
                                    <div>
                                        <div className="text-neutral-500">Adresa</div>
                                        <span>{event.locationAddress}</span>
                                    </div>
                                </div>
                            )}

                            {/* Harta */}
                            {mapEmbedSrc ? (
                                <div className="mt-2">
                                    <div className="ratio ratio-16x9 radius-12 overflow-hidden">
                                        <iframe
                                            src={mapEmbedSrc}
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                </div>
                            ) : event?.locationUrl ? (
                                <a
                                    className="btn btn-sm btn-primary-600 mt-2"
                                    href={event.locationUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Icon icon="mdi:map" className="me-1" />
                                    Hap hartën
                                </a>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
