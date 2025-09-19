"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// Ikona për statuset
const redIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
});

const yellowIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
});

const greenIcon = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
});

const RequestMapLayer = ({ singleLocation }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("TE_GJITHA");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const [resNew, resInProcess, resResolved] = await Promise.all([
                    axios.get("http://localhost:8080/api/admin/requests/status/E_RE", {
                        withCredentials: true,
                    }),
                    axios.get("http://localhost:8080/api/admin/requests/status/NE_PROCES", {
                        withCredentials: true,
                    }),
                    axios.get("http://localhost:8080/api/admin/requests/status/E_ZGJIDHUR", {
                        withCredentials: true,
                    }),
                ]);

                let combined = [
                    ...resNew.data.map((r) => ({ ...r, status: "E_RE" })),
                    ...resInProcess.data.map((r) => ({ ...r, status: "NE_PROCES" })),
                    ...resResolved.data.map((r) => ({ ...r, status: "E_ZGJIDHUR" })),
                ];

                if (singleLocation) {
                    combined = combined.filter(
                        (r) =>
                            r.latitude === singleLocation[0] &&
                            r.longitude === singleLocation[1]
                    );
                }

                setRequests(combined);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch requests:", error);
                setLoading(false);
            }
        };

        fetchRequests();
    }, [singleLocation]);

    const KLOS_CENTER = [41.5071, 20.0867];
    const DEFAULT_ZOOM = 13;

    const center = singleLocation || KLOS_CENTER;
    const zoom = singleLocation ? 16 : DEFAULT_ZOOM;

    if (loading) return <p>Loading map...</p>;

    const filteredRequests =
        filterStatus === "TE_GJITHA"
            ? requests
            : requests.filter((r) => r.status === filterStatus);

    const getIcon = (status) => {
        switch (status) {
            case "E_RE":
                return redIcon;
            case "NE_PROCES":
                return yellowIcon;
            case "E_ZGJIDHUR":
                return greenIcon;
            default:
                return redIcon;
        }
    };

    return (
        <div className="request-map-layer">
            <h5 className="mb-15">Harta e Raportimeve/Kërkesave</h5>

            {!singleLocation && (
                <div className="dropdown mb-4">
                    <button
                        className="btn text-primary-600 hover-text-primary px-18 py-11 dropdown-toggle toggle-icon"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {filterStatus === "TE_GJITHA"
                            ? "Të gjitha"
                            : filterStatus === "E_RE"
                                ? "Të reja"
                                : filterStatus === "NE_PROCES"
                                    ? "Në progres"
                                    : "Të zgjidhura"}
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button
                                className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                onClick={() => setFilterStatus("TE_GJITHA")}
                            >
                                Të gjitha
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                onClick={() => setFilterStatus("E_RE")}
                            >
                                Të reja
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                onClick={() => setFilterStatus("NE_PROCES")}
                            >
                                Në progres
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
                                onClick={() => setFilterStatus("E_ZGJIDHUR")}
                            >
                                Të zgjidhura
                            </button>
                        </li>
                    </ul>
                </div>
            )}

            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: "500px", width: "100%", zIndex: 0 }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                {filteredRequests
                    .filter((req) => req.latitude != null && req.longitude != null)
                    .map((req) => (
                        <Marker
                            key={req.id}
                            position={[req.latitude, req.longitude]}
                            icon={getIcon(req.status)}
                        >
                            <Tooltip
                                direction="top"
                                offset={[0, -10]}
                                opacity={1}
                                permanent={false}
                            >
                                {req.title} <br/>
                            </Tooltip>
                        </Marker>
                    ))}
            </MapContainer>
        </div>
    );
};

export default RequestMapLayer;
