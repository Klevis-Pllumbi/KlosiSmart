"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import axios from "axios";
import { Icon } from "@iconify/react";
import AlertContainer from "@/components/AlertContainer";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const AddNewsLayer = ({ slug }) => {
  // text fields
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  // alerts + sidebar
  const [alerts, setAlerts] = useState([]);
  const [latestNews, setLatestNews] = useState([]);

  // MAIN IMAGE
  const [existingMainImageUrl, setExistingMainImageUrl] = useState(null); // string | null
  const [newMainImageFile, setNewMainImageFile] = useState(null); // File | null
  const [removeMainImage, setRemoveMainImage] = useState(false); // when true, backend should delete it

  // IMAGES (gallery)
  const [existingImages, setExistingImages] = useState([]); // string[] (absolute URLs)
  const [imagesToDelete, setImagesToDelete] = useState([]); // string[] (absolute URLs)
  const [newImages, setNewImages] = useState([]); // { file: File, previewUrl: string }[]

  // DOCUMENTS
  const [existingDocuments, setExistingDocuments] = useState([]); // { url: string, filename: string }[]
  const [documentsToDelete, setDocumentsToDelete] = useState([]); // string[] (absolute URLs)
  const [newDocuments, setNewDocuments] = useState([]); // { file: File, name: string }[]

  const quillRef = useRef(null);

  const modules = useMemo(
      () => ({
        toolbar: [
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }]
        ]
      }),
      []
  );

  const formats = ["header", "bold", "background", "list"];

  // Alerts helpers
  const addAlert = (type, title, description) => {
    const id = crypto.randomUUID();
    setAlerts((prev) => [...prev, { id, type, title, description }]);
  };
  const removeAlert = (id) => setAlerts((prev) => prev.filter((a) => a.id !== id));

  // Fetch available tags & latest news (guest)
  useEffect(() => {
    (async () => {
      try {
        const [tagsRes, latestRes] = await Promise.all([
          axios.get("http://localhost:8080/api/guest/news/tags"),
          axios.get("http://localhost:8080/api/guest/news?page=0&size=5")
        ]);
        setAvailableTags(tagsRes.data || []);
        setLatestNews(latestRes.data?.content || []);
      } catch (e) {
        // non-blocking
      }
    })();

    hljs.configure({
      languages: [
        "javascript",
        "ruby",
        "python",
        "java",
        "csharp",
        "cpp",
        "go",
        "php",
        "swift"
      ]
    });
  }, []);

  // Fetch news detail when editing (guest)
  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/guest/news/${slug}`);
        const news = res.data;
        setTitle(news.title || "");
        setSummary(news.summary || "");
        setContent(news.content || "");
        setTags(news.tags || []);

        if (news.mainImageUrl) {
          setExistingMainImageUrl(`http://localhost:8080${news.mainImageUrl}`);
        } else {
          setExistingMainImageUrl(null);
        }

        setExistingImages((news.imageUrls || []).map((u) => `http://localhost:8080${u}`));

        setExistingDocuments(
            (news.documentUrls || []).map((u) => {
              const abs = `http://localhost:8080${u}`;
              const parts = abs.split("/");
              return { url: abs, filename: parts[parts.length - 1] };
            })
        );

        // reset new items & deletions
        setNewMainImageFile(null);
        setRemoveMainImage(false);
        setNewImages([]);
        setImagesToDelete([]);
        setNewDocuments([]);
        setDocumentsToDelete([]);
      } catch (err) {
        addAlert("error", "Gabim", "Ndodhi një gabim gjatë marrjes së lajmit.");
      }
    })();
  }, [slug]);

  // MAIN IMAGE handlers
  const handleMainImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewMainImageFile(e.target.files[0]);
      setRemoveMainImage(false); // we're replacing it
    }
  };
  const handleRemoveMainImage = () => {
    if (existingMainImageUrl && !newMainImageFile) {
      // mark existing for deletion
      setRemoveMainImage(true);
    }
    setNewMainImageFile(null);
    // also hide preview for UX (but keep existingMainImageUrl in state so we know it's the original)
  };

  // IMAGES handlers
  const handleAddImages = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setNewImages((prev) => [
      ...prev,
      ...files.map((file) => ({ file, previewUrl: URL.createObjectURL(file) }))
    ]);
  };
  const handleRemoveImage = (idx, kind) => {
    if (kind === "existing") {
      const url = existingImages[idx];
      setImagesToDelete((prev) => [...prev, url]);
      setExistingImages((prev) => prev.filter((_, i) => i !== idx));
    } else {
      // kind === "new"
      setNewImages((prev) => {
        const copy = [...prev];
        const removed = copy.splice(idx, 1)[0];
        try {
          if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
        } catch {}
        return copy;
      });
    }
  };

  // DOCUMENTS handlers
  const handleAddDocuments = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setNewDocuments((prev) => [
      ...prev,
      ...files.map((file) => ({ file, name: file.name }))
    ]);
  };
  const handleRemoveDocument = (idx, kind) => {
    if (kind === "existing") {
      const url = existingDocuments[idx].url;
      setDocumentsToDelete((prev) => [...prev, url]);
      setExistingDocuments((prev) => prev.filter((_, i) => i !== idx));
    } else {
      // kind === "new"
      setNewDocuments((prev) => {
        const copy = [...prev];
        copy.splice(idx, 1);
        return copy;
      });
    }
  };

  // Derived previews for UI
  const mainImagePreviewUrl = (() => {
    if (newMainImageFile) return URL.createObjectURL(newMainImageFile);
    if (existingMainImageUrl && !removeMainImage) return existingMainImageUrl;
    return null;
  })();

  // Tags
  const handleToggleTag = (tag) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("content", content);
      tags.forEach((tag) => formData.append("tags", tag));

      // MAIN IMAGE
      if (newMainImageFile) {
        formData.append("mainImage", newMainImageFile);
      }
      if (removeMainImage) {
        formData.append("removeMainImage", "true");
      }

      // NEW IMAGES
      newImages.forEach(({ file }) => formData.append("images", file));
      // DELETIONS (images)
      imagesToDelete.forEach((url) => formData.append("deleteImages", url));

      // NEW DOCUMENTS
      newDocuments.forEach(({ file }) => formData.append("documents", file));
      // DELETIONS (documents)
      documentsToDelete.forEach((url) => formData.append("deleteDocuments", url));

      if (slug) {
        await axios.put(`http://localhost:8080/api/admin/news/${slug}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
        );
        addAlert("success", "Sukses", "Lajmi u përditësua me sukses!");
      } else {
        // CREATE (admin)
        await axios.post("http://localhost:8080/api/admin/news", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        });
        addAlert("success", "Sukses", "Lajmi u krijua me sukses!");
        // reset all
        setTitle("");
        setSummary("");
        setContent("");
        setTags([]);
        setExistingMainImageUrl(null);
        setNewMainImageFile(null);
        setRemoveMainImage(false);
        setExistingImages([]);
        setNewImages([]);
        setImagesToDelete([]);
        setExistingDocuments([]);
        setNewDocuments([]);
        setDocumentsToDelete([]);
      }
      await (async () => {
        try {
          const [tagsRes, latestRes] = await Promise.all([
            axios.get("http://localhost:8080/api/guest/news/tags"),
            axios.get("http://localhost:8080/api/guest/news?page=0&size=5")
          ]);
          setAvailableTags(tagsRes.data || []);
          setLatestNews(latestRes.data?.content || []);
        } catch (e) {
          // non-blocking
        }
      })();
    } catch (err) {
      const data = err.response?.data;
      if (Array.isArray(data)) data.forEach((msg) => addAlert("error", "Gabim", msg));
      else if (Array.isArray(data?.errors)) data.errors.forEach((msg) => addAlert("error", "Gabim", msg));
      else if (data?.message) addAlert("error", "Gabim", data.message);
      else addAlert("error", "Gabim", "Ndodhi një gabim gjatë ruajtjes së lajmit.");
    } finally {
      // Revoke any object URLs created for new images (avoid leaks) AFTER submit attempt
      newImages.forEach((ni) => { try { URL.revokeObjectURL(ni.previewUrl); } catch {} });
    }
  };

  const getFileIcon = (filename) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return <Icon icon="mdi:file-pdf-outline" className="me-2" />;
    if (ext === "docx" || ext === "doc") return <Icon icon="mdi:file-word-outline" className="me-2" />;
    return <Icon icon="mdi:file-outline" className="me-2" />;
  };

  return (
      <div className="row gy-4">
        {/* Left form */}
        <div className="col-lg-8">
          <div className="card mt-24">
            <div className="card-header border-bottom">
              <h6 className="text-xl mb-0">{slug ? "Ndrysho Lajmin" : "Shto Lajm"}</h6>
            </div>
            <div className="card-body p-24">
              <form className="d-flex flex-column gap-20" onSubmit={handleSubmit}>
                {/* Title */}
                <div>
                  <label className="form-label fw-bold text-neutral-900">Titulli</label>
                  <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                {/* Summary */}
                <div>
                  <label className="form-label fw-bold text-neutral-900">Përmbledhja</label>
                  <textarea className="form-control" value={summary} onChange={(e) => setSummary(e.target.value)} />
                </div>
                {/* Tags */}
                <div>
                  <label className="form-label fw-bold text-neutral-900">Etiketat</label>
                  <div className="d-flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                        <button
                            type="button"
                            key={tag}
                            className={`btn btn-sm ${tags.includes(tag) ? "btn-primary-500" : "btn-outline-primary-500"}`}
                            onClick={() => handleToggleTag(tag)}
                        >
                          {tag}
                        </button>
                    ))}
                  </div>
                </div>
                {/* Content */}
                <div>
                  <label className="form-label fw-bold text-neutral-900">Përmbajtja</label>
                  <ReactQuill ref={quillRef} theme="snow" value={content} onChange={setContent} modules={modules} formats={formats} />
                </div>

                {/* Main image */}
                <div>
                  <label className="form-label fw-bold text-neutral-900">Ngarko Fotografi Kryesore</label>
                  <div className="upload-image-wrapper">
                    {mainImagePreviewUrl ? (
                        <div className="uploaded-img position-relative w-100 border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50">
                          <button
                              type="button"
                              onClick={handleRemoveMainImage}
                              className="uploaded-img__remove position-absolute top-0 end-0 z-1 text-2xxl line-height-1 me-8 mt-8 d-flex"
                              aria-label="Hiq fotografi të ngarkuar"
                          >
                            <Icon icon="radix-icons:cross-2" className="text-xl text-danger-600"></Icon>
                          </button>
                          <img className="w-100 h-100 object-fit-cover" src={mainImagePreviewUrl} alt="Pamje e Fotografisë Kryesore" />
                        </div>
                    ) : (
                        <label className="upload-file h-160-px w-100 border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50 bg-hover-neutral-200 d-flex align-items-center flex-column justify-content-center gap-1" htmlFor="main-image-file">
                          <iconify-icon icon="solar:camera-outline" className="text-xl text-secondary-light"></iconify-icon>
                          <span className="fw-semibold text-secondary-light">Ngarko</span>
                          <input id="main-image-file" type="file" hidden onChange={handleMainImageChange} accept="image/*" />
                        </label>
                    )}
                  </div>
                </div>

                {/* Images */}
                <div className="mb-4">
                  <label className="form-label fw-bold text-neutral-900 d-block mb-2">Imazhe</label>
                  <div className="mb-3">
                    <label className="btn btn-outline-primary-500">
                      + Shto Imazhe
                      <input type="file" multiple accept="image/*" hidden onChange={handleAddImages} />
                    </label>
                  </div>
                  <div className="d-flex flex-wrap gap-3">
                    {existingImages.map((img, idx) => (
                        <div key={`ex-${idx}`} className="position-relative rounded overflow-hidden" style={{ width: 200, height: 200, border: "1px solid #e0e0e0", padding: 2 }}>
                          <img src={img} alt={`img-${idx}`} className="w-100 h-100 object-fit-cover rounded" />
                          <button type="button" className="btn btn-sm btn-danger position-absolute top-0 end-0" onClick={() => handleRemoveImage(idx, "existing")}>X</button>
                        </div>
                    ))}
                    {newImages.map((ni, idx) => (
                        <div key={`new-${idx}`} className="position-relative rounded overflow-hidden" style={{ width: 200, height: 200, border: "1px solid #e0e0e0", padding: 2 }}>
                          <img src={ni.previewUrl} alt={`new-img-${idx}`} className="w-100 h-100 object-fit-cover rounded" />
                          <button type="button" className="btn btn-sm btn-danger position-absolute top-0 end-0" onClick={() => handleRemoveImage(idx, "new")}>X</button>
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
                      <input type="file" multiple hidden onChange={handleAddDocuments} />
                    </label>
                  </div>
                  <div className="documents d-flex flex-column gap-2">
                    {existingDocuments.map((doc, idx) => (
                        <div key={`exdoc-${idx}`} className="d-flex justify-content-between align-items-center p-3 mb-2 border rounded shadow-sm bg-light">
                          <div className="d-flex align-items-center gap-2" style={{ flex: 1, minWidth: 0 }}>
                            {getFileIcon(doc.filename)}
                            <span className="text-truncate" style={{ maxWidth: "70%" }}>{doc.filename}</span>
                          </div>
                          <button type="button" className="btn btn-sm btn-outline-danger ms-2" onClick={() => handleRemoveDocument(idx, "existing")}>X</button>
                        </div>
                    ))}
                    {newDocuments.map((doc, idx) => (
                        <div key={`newdoc-${idx}`} className="d-flex justify-content-between align-items-center p-3 mb-2 border rounded shadow-sm bg-light">
                          <div className="d-flex align-items-center gap-2" style={{ flex: 1, minWidth: 0 }}>
                            {getFileIcon(doc.name)}
                            <span className="text-truncate" style={{ maxWidth: "70%" }}>{doc.name}</span>
                          </div>
                          <button type="button" className="btn btn-sm btn-outline-danger ms-2" onClick={() => handleRemoveDocument(idx, "new")}>X</button>
                        </div>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary-500">Publiko</button>
              </form>
            </div>
          </div>
          <AlertContainer alerts={alerts} onClose={removeAlert} />
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          <div className="d-flex flex-column gap-24">
            <div className="card mt-24">
              <div className="card-header border-bottom"><h6 className="text-xl mb-0">Lajmet e fundit</h6></div>
              <div className="card-body d-flex flex-column gap-3">
                {latestNews.map((news) => (
                    <div key={news.id} className="d-flex gap-2">
                      <img src={`http://localhost:8080${news.mainImageUrl}`} alt="" className="w-100 h-100 object-fit-cover" style={{ maxWidth: 100, maxHeight: 100, borderRadius: "7px" }} />
                      <div>
                        <h6 className="text-truncate" style={{ maxWidth: "220px" }}>{news.title}</h6>
                        <p className="text-sm text-neutral-500 text-truncate" style={{ maxWidth: "220px" }}>{news.summary}</p>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AddNewsLayer;
