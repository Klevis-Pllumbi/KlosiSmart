"use client"
import { useState, useRef } from "react"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { Icon } from "@iconify/react"
import {AuthProvider, useAuth} from "@/context/AuthContext"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import axios from "axios"
import AlertContainer from "@/components/elements/AlertContainer"
import ProtectedRoute from "@/components/elements/ProtectedRoute";

// Fix default marker icon
const markerIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
})

function LocationMarker({ position, setPosition }) {
    useMapEvents({
        click(e) {
            setPosition(e.latlng)
        },
    })
    return position ? <Marker position={position} icon={markerIcon} /> : null
}

export default function Home() {
    const [files, setFiles] = useState([])
    const fileInputRef = useRef(null)
    const { user } = useAuth()
    const [position, setPosition] = useState(null)
    const [loading, setLoading] = useState(false)

    // --- Alerts ---
    const [alerts, setAlerts] = useState([])
    const addAlert = (type, title, description) => {
        const id = crypto.randomUUID()
        setAlerts((prev) => [...prev, { id, type, title, description }])
    }
    const removeAlert = (id) => {
        setAlerts((prev) => prev.filter((a) => a.id !== id))
    }

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files)
        setFiles((prev) => [...prev, ...selectedFiles])
    }

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const openFileDialog = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const renderIcon = (file) => {
        if (file.type.includes("pdf")) return <Icon icon="mdi:file-pdf" width={30} color="red" />
        if (file.type.includes("image")) return <Icon icon="mdi:file-image" width={30} color="blue" />
        if (file.type.includes("word") || file.name.endsWith(".docx")) return <Icon icon="mdi:file-word" width={30} color="royalblue" />
        return <Icon icon="mdi:file" width={30} color="gray" />
    }

    // --- Submit Form ---
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (!position && !e.target.form_title.value && !e.target.description.value && !files) {
                addAlert("error", "Të dhënat mungojnë", "Ju lutemi plotësoni disa nga të dhënat që kërkesa të jetë e vlefshme")
                setLoading(false)
                return
            }

            const formData = new FormData()
            formData.append("title", e.target.form_title.value)
            formData.append("description", e.target.form_description.value)

            if (position) {
                formData.append("latitude", position.lat)
                formData.append("longitude", position.lng)
            }

            if (files.length > 0) {
                files.forEach((f) => formData.append("files", f))
            }

            await axios.post("http://localhost:8080/api/user/requests", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            })

            addAlert("success", "Kërkesa u dërgua", "Raportimi u regjistrua me sukses!")
            e.target.reset()
            setFiles([])
            setPosition(null)
        } catch (err) {
            const data = err.response?.data
            if (Array.isArray(data)) data.forEach(msg => addAlert("error", "Gabim", msg))
            else if (Array.isArray(data?.errors)) data.errors.forEach(msg => addAlert("error", "Gabim", msg.message || msg))
            else if (data?.message) addAlert("error", "Gabim", data.message)
            else addAlert("error", "Gabim", "Ndodhi një gabim gjatë dërgimit të kërkesës.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Raporto një problem ose bëj një kërkesë">
            <AlertContainer alerts={alerts} onClose={removeAlert} />

            <div>
                <section className="login-page services-style1" style={{paddingTop: 40, paddingBottom: 40}}>
                    <div className="shape1"></div>
                    <div className="shape2 rotate-me">
                        <img src="/assets/images/shapes/services-v1-shape1.png" alt="#"/>
                    </div>
                    <div className="shape3 float-bob-y" style={{ bottom: "750px" }}>
                        <img src="/assets/images/shapes/services-v1-shape2.png" alt="#"/>
                    </div>
                    <div className="testimonials-style1--style2-shape1">
                        <img src="/assets/images/backgrounds/testimonials-v2-bg.png" alt="#"/>
                    </div>

                    <div className="auto-container">
                        <div className="row justify-content-center">
                            <div className="col-xl-8 col-lg-8">
                                <div className="contact-page__form">
                                    <div className="add-comment-box">
                                        <div className="inner-title">
                                            <h2>Dërgo një kërkesë apo raportim</h2>
                                        </div>

                                        <form id="contact-form" onSubmit={handleSubmit} className="default-form2">
                                            {/* Seksioni 1: Të dhëna personale */}
                                            <h4 className="mb-3">Të dhëna personale</h4>
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <div className="input-box">
                                                            <input type="text" name="form_firstname"
                                                                   placeholder="Emër"
                                                                   value={user.name} readOnly/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <div className="input-box">
                                                            <input type="text" name="form_lastname"
                                                                   placeholder="Mbiemër"
                                                                   value={user.surname} readOnly/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <div className="input-box">
                                                            <input type="email" name="form_email"
                                                                   placeholder="Email"
                                                                   value={user.email} readOnly/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group">
                                                        <div className="input-box">
                                                            <input type="text" name="form_nid" placeholder="NID"
                                                                   value={user.nid} readOnly/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Seksioni 2: Të dhëna mbi raportimin */}
                                            <h4 className="mb-3 mt-4">Të dhëna mbi kërkesën/raportimin</h4>
                                            <div className="row">
                                                <div className="col-xl-12">
                                                    <div className="form-group">
                                                        <div className="input-box">
                                                            <input type="text" name="form_title"
                                                                   placeholder="Titulli" required/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-12">
                                                    <div className="form-group">
                                                        <div className="input-box">
                                                            <textarea name="form_description"
                                                                      placeholder="Përshkrim i situatës"
                                                                      required></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Upload Section */}
                                            <div className="departments-details__content-button"
                                                 style={{marginBottom: "35px", marginTop: "0"}}>
                                                <div className="title">
                                                    <h4 className="mb-3">Materialet e ngarkuara</h4>
                                                </div>

                                                <input
                                                    type="file"
                                                    multiple
                                                    ref={fileInputRef}
                                                    style={{display: "none"}}
                                                    onChange={handleFileChange}
                                                />
                                                <button type="button" className="btn-one mb-3"
                                                        onClick={openFileDialog}>
                                                    <span className="txt">+ Shto dokument ose imazh</span>
                                                </button>

                                                {files.map((file, index) => (
                                                    <div key={index}
                                                         className="departments-details__content-button-single">
                                                        <div className="left">
                                                            <div className="icon-box">
                                                                {file.type.includes("image") ? (
                                                                    <img
                                                                        src={URL.createObjectURL(file)}
                                                                        alt={file.name}
                                                                        width={40}
                                                                        height={40}
                                                                        style={{
                                                                            objectFit: "cover",
                                                                            borderRadius: "4px"
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    renderIcon(file)
                                                                )}
                                                            </div>
                                                            <div className="text-box">
                                                                <h4>{file.name}</h4>
                                                                <p>{(file.size / 1024).toFixed(1)} KB</p>
                                                            </div>
                                                        </div>
                                                        <div className="right">
                                                            <div className="button-box">
                                                                <Link href="#" onClick={(e) => {
                                                                    e.preventDefault();
                                                                    removeFile(index)
                                                                }}>x</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Seksioni 3: Vendndodhja në hartë */}
                                            <h4 className="mb-3 mt-4">Vendndodhja në hartë</h4>
                                            <div style={{height: "400px", marginBottom: "20px"}}>
                                                <MapContainer
                                                    center={[41.5071, 20.0867]}
                                                    zoom={13}
                                                    style={{height: "100%", width: "100%", zIndex: "10"}}
                                                >
                                                    <TileLayer
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                                                    />
                                                    <LocationMarker position={position} setPosition={setPosition}/>
                                                </MapContainer>
                                            </div>

                                            <div className="button-box">
                                                <button className="btn-one" type="submit" disabled={loading}>
                                                    <span
                                                        className="txt">{loading ? "Duke dërguar..." : "Dërgo Kërkesën/Raportimin"}</span>
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
