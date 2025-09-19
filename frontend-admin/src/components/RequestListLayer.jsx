"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "@/components/child/Loading";
import AlertContainer from "@/components/AlertContainer";

const RequestListLayer = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const tableRef = useRef(null);
    const dataTableInstance = useRef(null);
    const jQueryRef = useRef(null);

    // Alerts
    const [alerts, setAlerts] = useState([]);
    const addAlert = (type, title, description) => {
        const id = crypto.randomUUID();
        setAlerts((prev) => [...prev, { id, type, title, description }]);
    };
    const removeAlert = (id) => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
    };

    const formatDate = (dateString) => {
        const d = new Date(dateString);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const truncateText = (text, length = 50) => {
        if (!text) return "";
        return text.length > length ? text.substring(0, length) + "..." : text;
    };

    const createRowHtml = (req) => {
        const statusColors = {
            E_RE: "bg-danger-focus text-danger-main",
            NE_PROCES: "bg-warning-focus text-warning-main",
            E_ZGJIDHUR: "bg-success-focus text-success-main",
        };
        const statusBadge = `<span class="${statusColors[req.status] || ""} px-24 py-4 rounded-pill fw-medium text-sm">${req.status}</span>`;

        return [
            req.id,
            req.title,
            `<div title="${req.description}" style="max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        ${truncateText(req.description, 50)}
      </div>`,
            statusBadge,
            req.userName,
            `<a href="mailto:${req.userEmail}" class="text-primary-600">${req.userEmail}</a>`,
            formatDate(req.createdAt),
            `<div class="d-flex gap-2">
        <a href="/request-view/${req.id}" class="w-32-px h-32-px bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center view-btn" title="Shiko më shumë">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"/>
          </svg>
        </a>
        <button class="w-32-px h-32-px me-8 bg-success-focus text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center change-status-btn border-0" data-id="${req.id}" title="Ndrysho Status">
          <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
        </button>
      </div>`
        ];
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/admin/requests", {
                    withCredentials: true
                });

                setRequests(res.data);
            } catch (error) {
                console.error("Gabim gjatë marrjes së të dhënave:", error);
                addAlert("error", "Gabim", "Nuk u morën të dhënat!");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const MySwal = withReactContent(Swal);

    const handleChangeStatus = (id) => {
        MySwal.fire({
            title: "Ndrysho Statusin",
            text: "Zgjidh statusin e ri:",
            icon: "question",
            showConfirmButton: true,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Në proces",
            denyButtonText: "E zgjidhur",
            cancelButtonText: "Anulo",
            buttonsStyling: false, // përdor klasat e tua CSS/Bootstrap
            customClass: {
                confirmButton: "btn btn-warning me-2",
                denyButton: "btn btn-success me-2",
                cancelButton: "btn btn-secondary"
            }
        }).then(async (result) => {
            let newStatus = null;
            if (result.isConfirmed) newStatus = "NE_PROCES";
            else if (result.isDenied) newStatus = "E_ZGJIDHUR";
            else return; // u anulua

            try {
                await axios.patch(
                    `http://localhost:8080/api/admin/requests/${id}/status`,
                    { status: newStatus },
                    { withCredentials: true }
                );
                setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
                addAlert("success", "Sukses", `Statusi u ndryshua në ${newStatus}`);
            } catch (error) {
                addAlert("error", "Gabim", "Nuk mund të ndryshohet statusi!");
            }
        });
    };


    // Initialize DataTable
    useEffect(() => {
        const initDataTable = async () => {
            if (loading || requests.length === 0) return;

            try {
                const $ = (await import("jquery")).default;
                await import("datatables.net-dt/js/dataTables.dataTables.js");
                jQueryRef.current = $;

                // Destroy previous instance
                if (dataTableInstance.current) {
                    dataTableInstance.current.destroy();
                    dataTableInstance.current = null;
                }

                $(tableRef.current).find("tbody").empty();

                dataTableInstance.current = $(tableRef.current).DataTable({
                    data: requests.map(req => createRowHtml(req)),
                    pageLength: 5,
                    destroy: true,
                    scrollX: true,
                    language: {
                        search: "Kërko:",
                        lengthMenu: "Shfaq _MENU_ rreshta",
                        info: "Duke treguar _START_ deri _END_ nga _TOTAL_ rreshta",
                        zeroRecords: "Asnjë rezultat i gjetur",
                        infoEmpty: "Nuk ka të dhëna për t'u shfaqur",
                        infoFiltered: "(filtruar nga gjithsej _MAX_ rreshta)"
                    },
                    columnDefs: [
                        { targets: [4, 5, 6], orderable: false }
                    ]
                });

                // Event listener për ndryshimin e statusit
                $(tableRef.current).off("click", ".change-status-btn").on("click", ".change-status-btn", function() {
                    const id = parseInt($(this).data("id"));
                    handleChangeStatus(id);
                });

            } catch (error) {
                console.error("Error initializing DataTable:", error);
            }
        };
        initDataTable();

        return () => {
            if (dataTableInstance.current) {
                dataTableInstance.current.destroy();
                dataTableInstance.current = null;
            }
        };
    }, [requests, loading]);

    return (
        <>
            <AlertContainer alerts={alerts} onClose={removeAlert} />
            <div className="card basic-data-table">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">Lista e Kërkesave</h5>
                </div>
                <div className="card-body">
                    {loading ? (
                        <div className="text-center py-4"><Loading /></div>
                    ) : (
                        <table className="table bordered-table mb-0" ref={tableRef}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Titulli</th>
                                <th>Përshkrimi</th>
                                <th>Statusi</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Data Krijimit</th>
                                <th>Veprime</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* DataTables do të mbush këtë */}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default RequestListLayer;
