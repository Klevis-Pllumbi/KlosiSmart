"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestMapLayer from "@/components/RequestMapLayer";
import Preloader from "@/components/child/Preloader";
import {Icon} from "@iconify/react";

const RequestViewLayer = ({ requestId }) => {
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/admin/requests/${requestId}`,
                    { withCredentials: true }
                );
                setRequest(response.data);
            } catch (error) {
                console.error("Gabim gjatë marrjes së të dhënave:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequest();
    }, [requestId]);

    const handleDownload = (url) => {
        axios.get("http://localhost:8080" + url, {
            responseType: 'blob',
            withCredentials: true
        }).then(res => {
            const blob = new Blob([res.data]);
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            const filename = url.split('/').pop();
            link.download = filename;
            link.click();
        }).catch(err => {
            console.error("Gabim gjatë shkarkimit:", err);
        });
    };

    const getFileIcon = (filename) => {
        const ext = filename.split('.').pop().toLowerCase();
        if (ext === "pdf") return <Icon icon="mdi:file-pdf-outline" className="me-2" />;
        if (ext === "docx" || ext === "doc") return <Icon icon="mdi:file-word-outline" className="me-2" />;
        return <Icon icon="mdi:file-outline" className="me-2" />;
    };

    if (loading) return <Preloader />;

    if (!request) return <p>Kërkesa nuk u gjet.</p>;

    return (
        <div className="request-view">
            <h3 className="fw-bold mb-3">{request.title}</h3>

            <p className="mb-24">{request.description}</p>

            {request.latitude && request.longitude && (
                <div className="mb-4">
                    <RequestMapLayer singleLocation={[request.latitude, request.longitude]} />
                </div>
            )}

            {(request.documentUrls.length > 0 || request.imageUrls.length > 0) && (
                <div className="attachments mb-20 mt-32">
                    <h5 className="mb-10">Dokumente dhe Fotot</h5>

                    {request.documentUrls.length > 0 && (
                        <div className="documents mb-3 d-flex flex-column gap-2">
                            {request.documentUrls.map((doc, idx) => {
                                const filename = doc.split('/').pop();
                                return (
                                    <div
                                        key={idx}
                                        className="d-flex justify-content-between align-items-center p-3 mb-2 border rounded shadow-sm bg-light"
                                        style={{transition: "background-color 0.2s", cursor: "pointer"}}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
                                    >
                                        <div className="d-flex align-items-center gap-2" style={{flex: 1, minWidth: 0}}>
                                            {getFileIcon(filename)}
                                            <span className="text-truncate" style={{maxWidth: "70%"}}>
                                              {filename}
                                            </span>
                                        </div>
                                        <button
                                            className="btn btn-sm btn-outline-primary ms-2"
                                            onClick={() => handleDownload(doc)}
                                        >
                                            Shkarko
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {request.imageUrls.length > 0 && (
                        <div className="mb-4">
                            <h6>Fotot:</h6>
                            <div className="d-flex flex-wrap gap-3">
                                {request.imageUrls.map((imgUrl, idx) => (
                                    <div
                                        key={idx}
                                        className=" border rounded shadow-sm bg-light"
                                        style={{
                                            width: 300,
                                            height: 300,
                                            overflow: "hidden",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <img
                                            src={`http://localhost:8080${imgUrl}`}
                                            alt={`Foto ${idx + 1}`}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                objectPosition: "center"
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RequestViewLayer;
