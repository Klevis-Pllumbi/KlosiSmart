"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import Loading from "@/components/child/Loading";
import AlertContainer from "@/components/AlertContainer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SurveyListLayer = () => {
    const [surveys, setSurveys] = useState([]);
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

    // Create table row HTML
    const createRowHtml = (survey) => {
        const statusBadge = survey.status === "ACTIVE"
            ? `<span class="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">Aktiv</span>`
            : `<span class="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm">Joaktiv</span>`;

        return [
            survey.id,
            survey.title,
            `<div style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${survey.description}">
        ${survey.description}
    </div>`,
            formatDate(survey.endDate),
            statusBadge,
            `<div class="d-flex">
                <a href="/survey-results/${survey.id}" class="w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center">
                    <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"/></svg>
                </a>
                <a href="/survey-edit/${survey.id}" class="w-32-px h-32-px me-8 bg-success-focus text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center">
                    <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                </a>
                <button class="delete-btn w-32-px h-32-px me-8 bg-danger-focus text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center border-0" data-id="${survey.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zM7 6h10v13H7V6zm2 2v9h2V8H9zm4 0v9h2V8h-2z"/></svg>
                </button>
            </div>`
        ];
    };

    // Merr të dhënat
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/admin/surveys/all",
                    { withCredentials: true }
                );
                setSurveys(response.data);
            } catch (error) {
                console.error("Gabim gjatë marrjes së të dhënave:", error);
                addAlert("error", "Gabim", "Nuk u morën të dhënat!");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Initialize DataTable
    useEffect(() => {
        const initDataTable = async () => {
            if (loading || surveys.length === 0) return;

            try {
                const $ = (await import("jquery")).default;
                await import("datatables.net-dt/js/dataTables.dataTables.js");
                jQueryRef.current = $;

                // Destroy existing instance
                if (dataTableInstance.current) {
                    dataTableInstance.current.destroy();
                    dataTableInstance.current = null;
                }

                // Clear and prepare table
                $(tableRef.current).find('tbody').empty();

                // Initialize DataTable with data
                dataTableInstance.current = $(tableRef.current).DataTable({
                    data: surveys.map(survey => createRowHtml(survey)),
                    pageLength: 10,
                    destroy: true,
                    language: {
                        search: "Kërko:",
                        lengthMenu: "Shfaq _MENU_ rreshta",
                        info: "Duke treguar _START_ deri _END_ nga _TOTAL_ rreshta",
                        infoEmpty: "Nuk ka të dhëna për t'u shfaqur",
                        infoFiltered: "(filtruar nga gjithsej _MAX_ rreshta)",
                        zeroRecords: "Asnjë rezultat i gjetur",
                    },
                    columnDefs: [
                        { targets: [4, 5], orderable: false }
                    ]
                });

                // Add event listener for delete buttons
                $(tableRef.current).off('click', '.delete-btn').on('click', '.delete-btn', function(e) {
                    e.preventDefault();
                    const surveyId = parseInt($(this).data('id'));
                    handleDeleteClick(surveyId);
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
    }, [surveys, loading]);

    const MySwal = withReactContent(Swal);

    const handleDeleteClick = (id) => {
        MySwal.fire({
            title: "Jeni i sigurt?",
            text: "Ky veprim do të fshijë pyetësorin përgjithmonë!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Po, fshije!",
            cancelButtonText: "Jo, anulo",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(
                        `http://localhost:8080/api/admin/surveys/${id}`,
                        {
                            withCredentials: true,
                        }
                    );

                    // Update surveys state - this will trigger DataTable reinitialization
                    setSurveys((prev) => prev.filter((s) => s.id !== id));
                    addAlert("success", "Sukses", "Pyetësori u fshi me sukses!");
                } catch (error) {
                    console.error("Gabim gjatë fshirjes:", error);
                    addAlert("error", "Gabim", "Nuk u fshi dot pyetësori!");
                }
            }
        });
    };

    return (
        <>
            <AlertContainer alerts={alerts} onClose={removeAlert} />

            <div className="card basic-data-table">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">Lista e Pyetësorëve</h5>
                    <Link
                        href="/survey-add"
                        className="btn btn-primary-500"
                    >
                        + Shto Pyetësor
                    </Link>
                </div>
                <div className="card-body">
                    {loading ? (
                        <div className="text-center py-4">
                            <Loading/>
                        </div>
                    ) : (
                        <table
                            className="table bordered-table mb-0"
                            id="dataTable"
                            ref={tableRef}
                        >
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Titulli</th>
                                <th>Përshkrimi</th>
                                <th>Data e mbarimit</th>
                                <th>Statusi</th>
                                <th>Veprime</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* DataTables will populate this */}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default SurveyListLayer;