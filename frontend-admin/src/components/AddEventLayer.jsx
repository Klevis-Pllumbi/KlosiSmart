"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { Icon } from "@iconify/react";
import AlertContainer from "@/components/AlertContainer";
import "highlight.js/styles/github.css";

// Quill (client-only)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// Helpers
const FILES_BASE_EVENTS = "/api/guest/files/events/";

const asAbs = (u) => {
    if (!u) return "";
    if (u.startsWith("http")) return u;

    const rel = u.includes("/") ? u : `${FILES_BASE_EVENTS}${u}`;

    const withSlash = rel.startsWith("/") ? rel : `/${rel}`;
    return `http://localhost:8080${withSlash}`;
};
const fmtDateTimeLocal = (iso) => (iso ? new Date(iso).toISOString().slice(0, 16) : "");
const normalizeLocalDateTime = (val) => {
    if (!val) return "";
    // format i input-it datetime-local: "YYYY-MM-DDTHH:mm" ose "YYYY-MM-DDTHH:mm:ss"
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(val)) {
        return val.length === 16 ? `${val}:00` : val; // shto sekondat nëse mungojnë
    }
    // nëse na vjen ISO me Z ose me millisekonda, pastroje:
    // p.sh. 2025-09-16T10:05:00.000Z -> 2025-09-16T10:05:00
    const noMs = val.split(".")[0];
    return noMs.replace(/Z$/, "");
};
function extractLatLngFromUrl(url) {
    if (!url) return null;
    try {
        // shembull: https://www.google.com/maps/@41.5057686,20.0866601,168m/...
        const matchAt = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (matchAt) {
            return { lat: parseFloat(matchAt[1]), lng: parseFloat(matchAt[2]) };
        }

        // shembull: https://www.google.com/maps?q=41.5057686,20.0866601
        const u = new URL(url);
        const q = u.searchParams.get("q");
        if (q && q.includes(",")) {
            const [lat, lng] = q.split(",");
            return { lat: parseFloat(lat), lng: parseFloat(lng) };
        }
    } catch (e) {
        console.warn("Nuk u lexua URL e Google Maps:", e);
    }
    return null;
}

export default function AddEventLayer({ slug }) {

    // Base fields
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");

    // Date/Time
    const [startAt, setStartAt] = useState("");
    const [endAt, setEndAt] = useState("");

    // Location
    const [locationName, setLocationName] = useState("");
    const [locationAddress, setLocationAddress] = useState("");
    const [locationUrl, setLocationUrl] = useState("");
    const [mapLat, setMapLat] = useState("");
    const [mapLng, setMapLng] = useState("");

    // Files
    const [mainImageFile, setMainImageFile] = useState(null);
    const [mainImagePreview, setMainImagePreview] = useState(null);
    const [removeMainImage, setRemoveMainImage] = useState(false);

    const [imagesFiles, setImagesFiles] = useState([]); // new uploads
    const [imagesPreviews, setImagesPreviews] = useState([]); // existing + new (absolute URLs)
    const [existingImages, setExistingImages] = useState([]); // existing relative URLs
    const [deleteImages, setDeleteImages] = useState([]); // relative URLs to delete

    const [documentsFiles, setDocumentsFiles] = useState([]);
    const [documentsPreviews, setDocumentsPreviews] = useState([]); // names (existing + new)
    const [existingDocuments, setExistingDocuments] = useState([]); // existing relative URLs
    const [deleteDocuments, setDeleteDocuments] = useState([]);

    // Agenda (actions)
    const [actions, setActions] = useState([]);

    // Persons (optional)
    const [persons, setPersons] = useState([]);

    // Alerts
    const [alerts, setAlerts] = useState([]);
    const addAlert = (type, title, description) => {
        const id = crypto.randomUUID();
        setAlerts((prev) => [...prev, { id, type, title, description }]);
    };
    const removeAlert = (id) => setAlerts((prev) => prev.filter((a) => a.id !== id));

    const quillRef = useRef(null);

    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: [1, 2, 3, 4, false] }],
                ["bold", { background: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
            ],
        }),
        []
    );
    const formats = ["header", "bold", "background", "list", "link"];

    // Fetch for edit
    useEffect(() => {
        if (!slug) return;
        (async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/api/guest/events/${slug}`);
                setTitle(data.title || "");
                setSummary(data.summary || "");
                setContent(data.content || "");
                setStartAt(fmtDateTimeLocal(data.startAt));
                setEndAt(fmtDateTimeLocal(data.endAt));

                setLocationName(data.locationName || "");
                setLocationAddress(data.locationAddress || "");
                setLocationUrl(data.locationUrl || "");
                setMapLat(data.mapLat ?? "");
                setMapLng(data.mapLng ?? "");

                if (data.mainImageUrl) setMainImagePreview(asAbs(data.mainImageUrl));

                const imgs = Array.isArray(data.imageUrls) ? data.imageUrls : [];
                setExistingImages(imgs);
                setImagesPreviews(imgs.map(asAbs));

                const docs = Array.isArray(data.documentUrls) ? data.documentUrls : [];
                setExistingDocuments(docs);
                setDocumentsPreviews(docs.map((u) => u.split("/").pop()));

                setActions(Array.isArray(data.actions) ? data.actions : []);
                setPersons(Array.isArray(data.persons) ? data.persons : []);
            } catch (e) {
                addAlert("error", "Gabim", e?.response?.data?.message || "Ndodhi një gabim gjatë marrjes së eventit.");
            }
        })();
    }, [slug]);

    // Handlers — main image
    const onMainChange = (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setMainImageFile(f);
        setMainImagePreview(URL.createObjectURL(f));
        setRemoveMainImage(false);
    };
    const onRemoveMain = () => {
        if (mainImagePreview && !mainImageFile) {
            // po heqim një ekzistues (jo të ri)
            setRemoveMainImage(true);
        }
        setMainImageFile(null);
        setMainImagePreview(null);
    };

    // Images (gallery)
    const onAddImages = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        setImagesFiles((prev) => [...prev, ...files]);
        setImagesPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    };
    const onRemoveImage = (idx) => {
        // nëse indeksi i takon imazheve ekzistuese apo të reja
        if (idx < existingImages.length) {
            const url = existingImages[idx];
            setDeleteImages((prev) => [...prev, url]);
            setExistingImages((prev) => prev.filter((_, i) => i !== idx));
            setImagesPreviews((prev) => prev.filter((_, i) => i !== idx));
        } else {
            const newIdx = idx - existingImages.length;
            setImagesFiles((prev) => prev.filter((_, i) => i !== newIdx));
            setImagesPreviews((prev) => prev.filter((_, i) => i !== idx));
        }
    };

    // Documents
    const onAddDocs = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        setDocumentsFiles((prev) => [...prev, ...files]);
        setDocumentsPreviews((prev) => [...prev, ...files.map((f) => f.name)]);
    };
    const onRemoveDoc = (idx) => {
        if (idx < existingDocuments.length) {
            const url = existingDocuments[idx];
            setDeleteDocuments((prev) => [...prev, url]);
            setExistingDocuments((prev) => prev.filter((_, i) => i !== idx));
            setDocumentsPreviews((prev) => prev.filter((_, i) => i !== idx));
        } else {
            const newIdx = idx - existingDocuments.length;
            setDocumentsFiles((prev) => prev.filter((_, i) => i !== newIdx));
            setDocumentsPreviews((prev) => prev.filter((_, i) => i !== idx));
        }
    };

    // Actions (Agenda)
    const addAction = () =>
        setActions((prev) => [...prev, { orderIndex: prev.length + 1, title: "", description: "", scheduledAt: "" }]);
    const removeAction = (i) => setActions((prev) => prev.filter((_, idx) => idx !== i));
    const setActionField = (i, key, val) =>
        setActions((prev) => prev.map((a, idx) => (idx === i ? { ...a, [key]: val } : a)));

    // Persons
    const addPerson = () =>
        setPersons((prev) => [...prev, { orderIndex: prev.length + 1, name: "", role: "", type: "SPEAKER", photoUrl: "" }]);
    const removePerson = (i) => setPersons((prev) => prev.filter((_, idx) => idx !== i));
    const setPersonField = (i, key, val) =>
        setPersons((prev) => prev.map((p, idx) => (idx === i ? { ...p, [key]: val } : p)));

    // Submit
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const fd = new FormData();
            fd.append("title", title);
            fd.append("summary", summary);
            fd.append("content", content);

            // datetime-local value → ISO
            if (startAt) fd.append("startAt", normalizeLocalDateTime(startAt));
            if (endAt) fd.append("endAt", normalizeLocalDateTime(endAt));

            fd.append("locationName", locationName || "");
            fd.append("locationAddress", locationAddress || "");
            fd.append("locationUrl", locationUrl || "");
            if (mapLat !== "") fd.append("mapLat", mapLat);
            if (mapLng !== "") fd.append("mapLng", mapLng);

            if (mainImageFile) fd.append("mainImage", mainImageFile);
            imagesFiles.forEach((f) => fd.append("images", f));
            documentsFiles.forEach((f) => fd.append("documents", f));

            // delete flags
            if (removeMainImage) fd.append("removeMainImage", "true");
            deleteImages.forEach((u) => fd.append("deleteImages", u));
            deleteDocuments.forEach((u) => fd.append("deleteDocuments", u));

            // Indexed lists (ModelAttribute binding)
            actions.forEach((a, i) => {
                if (a.orderIndex !== undefined) fd.append(`actions[${i}].orderIndex`, a.orderIndex);
                if (a.title !== undefined) fd.append(`actions[${i}].title`, a.title);
                if (a.description !== undefined) fd.append(`actions[${i}].description`, a.description);
                if (a.scheduledAt) fd.append(`actions[${i}].scheduledAt`, normalizeLocalDateTime(a.scheduledAt));
            });
            persons.forEach((p, i) => {
                if (p.orderIndex !== undefined) fd.append(`persons[${i}].orderIndex`, p.orderIndex);
                if (p.name !== undefined) fd.append(`persons[${i}].name`, p.name);
                if (p.role !== undefined) fd.append(`persons[${i}].role`, p.role);
                if (p.type !== undefined) fd.append(`persons[${i}].type`, p.type);
                if (p.photoUrl !== undefined) fd.append(`persons[${i}].photoUrl`, p.photoUrl);
            });

            if (slug) {
                await axios.put(`http://localhost:8080/api/admin/events/${slug}`, fd, {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                });
                addAlert("success", "Sukses", "Eventi u përditësua me sukses!");
            } else {
                await axios.post(`http://localhost:8080/api/admin/events`, fd, {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                });
                addAlert("success", "Sukses", "Eventi u krijua me sukses!");

                // reset
                setTitle(""); setSummary(""); setContent("");
                setStartAt(""); setEndAt("");
                setLocationName(""); setLocationAddress(""); setLocationUrl(""); setMapLat(""); setMapLng("");
                setMainImageFile(null); setMainImagePreview(null); setRemoveMainImage(false);
                setImagesFiles([]); setImagesPreviews([]); setExistingImages([]); setDeleteImages([]);
                setDocumentsFiles([]); setDocumentsPreviews([]); setExistingDocuments([]); setDeleteDocuments([]);
                setActions([]); setPersons([]);
            }
        } catch (e) {
            const data = e?.response?.data;
            if (Array.isArray(data)) data.forEach((msg) => addAlert("error", "Gabim", msg));
            else if (Array.isArray(data?.errors)) data.errors.forEach((msg) => addAlert("error", "Gabim", msg));
            else if (data?.message) addAlert("error", "Gabim", data.message);
            else addAlert("error", "Gabim", "Ndodhi një gabim gjatë ruajtjes së eventit.");
        }
    };

    const getFileIcon = (filename) => {
        const ext = filename.split(".").pop()?.toLowerCase();
        if (ext === "pdf") return <Icon icon="mdi:file-pdf-outline" className="me-2" />;
        if (["doc", "docx"].includes(ext)) return <Icon icon="mdi:file-word-outline" className="me-2" />;
        return <Icon icon="mdi:file-outline" className="me-2" />;
    };

    const handleLocationUrlChange = (e) => {
        const url = e.target.value;
        setLocationUrl(url);

        const coords = extractLatLngFromUrl(url);
        if (coords) {
            setMapLat(coords.lat);
            setMapLng(coords.lng);
        }
    };

    return (
        <div className="row gy-4">
            <div className="col-lg-10 mx-auto">
                <div className="card mt-24">
                    <div className="card-header border-bottom">
                        <h6 className="text-xl mb-0">{slug ? "Ndrysho Eventin" : "Shto Event"}</h6>
                    </div>
                    <div className="card-body p-24">
                        <form className="d-flex flex-column gap-20" onSubmit={onSubmit}>
                            {/* Titulli */}
                            <div>
                                <label className="form-label fw-bold text-neutral-900">Titulli</label>
                                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>

                            {/* Datat */}
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-neutral-900">Nga (Data & Ora)</label>
                                    <input type="datetime-local" className="form-control" value={startAt} onChange={(e) => setStartAt(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-neutral-900">Deri (Data & Ora)</label>
                                    <input type="datetime-local" className="form-control" value={endAt} onChange={(e) => setEndAt(e.target.value)} />
                                </div>
                            </div>

                            {/* Vendndodhja */}
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-neutral-900">Emri i vendit</label>
                                    <input type="text" className="form-control" value={locationName} onChange={(e) => setLocationName(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-neutral-900">Adresa</label>
                                    <input type="text" className="form-control" value={locationAddress} onChange={(e) => setLocationAddress(e.target.value)} />
                                </div>
                                <div className="col-md-8">
                                    <label className="form-label fw-bold text-neutral-900">Link i hartës (ops.)</label>
                                    <input type="url" className="form-control" value={locationUrl} onChange={handleLocationUrlChange} />
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label fw-bold text-neutral-900">Lat (ops.)</label>
                                    <input type="number" step="any" className="form-control" value={mapLat} onChange={(e) => setMapLat(e.target.value)} />
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label fw-bold text-neutral-900">Lng (ops.)</label>
                                    <input type="number" step="any" className="form-control" value={mapLng} onChange={(e) => setMapLng(e.target.value)} />
                                </div>
                            </div>

                            {/* Përmbledhja */}
                            <div>
                                <label className="form-label fw-bold text-neutral-900">Përmbledhja</label>
                                <textarea className="form-control" value={summary} onChange={(e) => setSummary(e.target.value)} />
                            </div>

                            {/* Përmbajtja */}
                            <div>
                                <label className="form-label fw-bold text-neutral-900">Përmbajtja</label>
                                <ReactQuill value={content} onChange={setContent} modules={modules} formats={formats} />
                            </div>

                            {/* Main image */}
                            <div>
                                <label className="form-label fw-bold text-neutral-900">Ngarko Fotografi Kryesore</label>
                                <div className="upload-image-wrapper">
                                    {mainImagePreview ? (
                                        <div className="uploaded-img position-relative w-100 border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50">
                                            <button
                                                type="button"
                                                onClick={onRemoveMain}
                                                className="uploaded-img__remove position-absolute top-0 end-0 z-1 text-2xxl line-height-1 me-8 mt-8 d-flex"
                                                aria-label="Hiq fotografinë"
                                            >
                                                <Icon icon="radix-icons:cross-2" className="text-xl text-danger-600" />
                                            </button>
                                            <img className="w-100 h-100 object-fit-cover" src={mainImagePreview} alt="Pamje" />
                                        </div>
                                    ) : (
                                        <label
                                            className="upload-file h-160-px w-100 border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50 bg-hover-neutral-200 d-flex align-items-center flex-column justify-content-center gap-1"
                                            htmlFor="main-image-file"
                                        >
                                            <iconify-icon icon="solar:camera-outline" className="text-xl text-secondary-light"></iconify-icon>
                                            <span className="fw-semibold text-secondary-light">Ngarko</span>
                                            <input id="main-image-file" type="file" hidden onChange={onMainChange} accept="image/*" />
                                        </label>
                                    )}
                                </div>
                                {removeMainImage && <small className="text-danger">Imazhi kryesor do fshihet pas ruajtjes.</small>}
                            </div>

                            {/* Gallery Images */}
                            <div className="mb-4">
                                <label className="form-label fw-bold text-neutral-900 d-block mb-2">Imazhe</label>
                                <div className="mb-3">
                                    <label className="btn btn-outline-primary-500">
                                        + Shto Imazhe
                                        <input type="file" multiple accept="image/*" hidden onChange={onAddImages} />
                                    </label>
                                </div>
                                <div className="d-flex flex-wrap gap-3">
                                    {imagesPreviews.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className="position-relative rounded overflow-hidden"
                                            style={{ width: 200, height: 200, border: "1px solid #e0e0e0", padding: 2 }}
                                        >
                                            <img src={img} alt={`img-${idx}`} className="w-100 h-100 object-fit-cover rounded" />
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger position-absolute top-0 end-0"
                                                onClick={() => onRemoveImage(idx)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Documents */}
                            <div className="mb-4">
                                <label className="form-label fw-bold text-neutral-900 d-block mb-2">Dokumente</label>
                                <div className="mb-3">
                                    <label className="btn btn-outline-primary-500">
                                        + Shto Dokumente
                                        <input type="file" multiple hidden onChange={onAddDocs} />
                                    </label>
                                </div>
                                <div className="documents d-flex flex-column gap-2">
                                    {documentsPreviews.map((doc, idx) => (
                                        <div
                                            key={idx}
                                            className="d-flex justify-content-between align-items-center p-3 mb-2 border rounded shadow-sm bg-light"
                                        >
                                            <div className="d-flex align-items-center gap-2" style={{ flex: 1, minWidth: 0 }}>
                                                {getFileIcon(doc)}
                                                <span className="text-truncate" style={{ maxWidth: "70%" }}>
                          {doc}
                        </span>
                                            </div>
                                            <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => onRemoveDoc(idx)}>
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Agenda */}
                            <div className="mb-4">
                                <label className="form-label fw-bold text-neutral-900 d-block mb-2">Agjenda</label>
                                <div className="d-flex flex-column gap-2">
                                    {actions.map((a, i) => (
                                        <div key={i} className="border rounded p-3 d-flex flex-column gap-2">
                                            <div className="d-flex gap-2">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Rendi"
                                                    value={a.orderIndex ?? ""}
                                                    onChange={(e) => setActionField(i, "orderIndex", Number(e.target.value))}
                                                    style={{ maxWidth: 120 }}
                                                />
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Titulli"
                                                    value={a.title ?? ""}
                                                    onChange={(e) => setActionField(i, "title", e.target.value)}
                                                />
                                            </div>
                                            <textarea
                                                className="form-control"
                                                placeholder="Përshkrimi (ops.)"
                                                value={a.description ?? ""}
                                                onChange={(e) => setActionField(i, "description", e.target.value)}
                                            />
                                            <div>
                                                <label className="form-label">Ora e caktuar (ops.)</label>
                                                <input
                                                    type="datetime-local"
                                                    className="form-control"
                                                    value={a.scheduledAt ? fmtDateTimeLocal(a.scheduledAt) : ""}
                                                    onChange={(e) => setActionField(i, "scheduledAt", e.target.value)}
                                                />
                                            </div>
                                            <div className="text-end">
                                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeAction(i)}>
                                                    Hiq
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-outline-primary-500" onClick={addAction}>
                                        + Shto rresht
                                    </button>
                                </div>
                            </div>

                            {/* Persons */}
                            <div className="mb-4">
                                <label className="form-label fw-bold text-neutral-900 d-block mb-2">Personat (ops.)</label>
                                <div className="d-flex flex-column gap-2">
                                    {persons.map((p, i) => (
                                        <div key={i} className="border rounded p-3 d-flex flex-column gap-2">
                                            <div className="row g-2">
                                                <div className="col-md-2">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Rendi"
                                                        value={p.orderIndex ?? ""}
                                                        onChange={(e) => setPersonField(i, "orderIndex", Number(e.target.value))}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Emri"
                                                        value={p.name ?? ""}
                                                        onChange={(e) => setPersonField(i, "name", e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Roli"
                                                        value={p.role ?? ""}
                                                        onChange={(e) => setPersonField(i, "role", e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-2">
                                                    <select
                                                        className="form-select"
                                                        value={p.type ?? "SPEAKER"}
                                                        onChange={(e) => setPersonField(i, "type", e.target.value)}
                                                    >
                                                        <option value="SPEAKER">Speaker</option>
                                                        <option value="GUEST">Guest</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Foto URL (ops.)"
                                                value={p.photoUrl ?? ""}
                                                onChange={(e) => setPersonField(i, "photoUrl", e.target.value)}
                                            />
                                            <div className="text-end">
                                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removePerson(i)}>
                                                    Hiq
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-outline-primary-500" onClick={addPerson}>
                                        + Shto person
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary-500">Publiko</button>
                        </form>
                    </div>
                </div>

                {/* ALERTS */}
                <AlertContainer alerts={alerts} onClose={removeAlert} />
            </div>

            {/* Right side can hold live preview or anything else in the future */}
            <div className="col-lg-4"></div>
        </div>
    );
}
