"use client";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import useReactApexChart from "../hook/useReactApexChart";
import Preloader from "@/components/child/Preloader";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SurveyResultLayer = ({ surveyId }) => {
    const [surveyResults, setSurveyResults] = useState(null);
    const [loading, setLoading] = useState(true);

    const { basicDonutChartOptions, columnChartOptionsTwo } = useReactApexChart();

    const tableRef = useRef(null);
    const dataTableInstance = useRef(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/admin/surveys/${surveyId}/results`, {
                    withCredentials: true,
                });
                setSurveyResults(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [surveyId]);

    // DataTable për open-text
    useEffect(() => {
        if (!surveyResults) return;

        const openTextQuestions = surveyResults.questions
            .filter(q => q.type === "OPEN_TEXT")
            .map(q => ({
                ...q,
                openAnswers: q.openAnswers.filter(a => a && a.trim() !== "")
            }))
            .filter(q => q.openAnswers.length > 0);

        if (openTextQuestions.length > 0) {
            openTextQuestions.forEach(q => {
                const tableId = `#table-open-${q.questionId}`;
                if (dataTableInstance.current?.[q.questionId]) {
                    dataTableInstance.current[q.questionId].destroy();
                } else {
                    dataTableInstance.current = dataTableInstance.current || {};
                }

                setTimeout(() => {
                    dataTableInstance.current[q.questionId] = $(tableId).DataTable({
                        data: q.openAnswers.map(a => [a]),
                        columns: [{ title: q.text }],
                        pageLength: 10,
                        language: {
                            search: "Kërko:",
                            lengthMenu: "Shfaq _MENU_ rreshta",
                            info: "Duke treguar _START_ deri _END_ nga _TOTAL_ rreshta",
                            zeroRecords: "Asnjë rezultat i gjetur",
                        }
                    });
                }, 100);
            });
        }
    }, [surveyResults]);

    if (loading) return <Preloader />;

    // FUNKSIONI PDF
    const handleExportPDF = async () => {
        if (!surveyResults) return;
        const pdf = new jsPDF("p", "mm", "a4");
        let y = 25;

        const date = new Date().toLocaleDateString();

        pdf.setFontSize(18);
        pdf.setFont("helvetica", "bold");
        pdf.text("Rezultate Anketimi/Pyetësori", 105, y, { align: "center" });
        y += 20;

        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");
        pdf.text(`Këto janë rezultatet e pyetësorit me titull: `, 10, y);
        pdf.setFont("helvetica", "bold");
        pdf.text(`${surveyResults.surveyTitle}`, 88, y);
        y += 7;
        pdf.setFont("helvetica", "normal");
        pdf.text(`Të gjeneruara nga aplikacioni KlosiSmart me datë: `, 10, y);
        pdf.setFont("helvetica", "bold");
        pdf.text(`${date}`, 107, y);
        y += 20;

// LISTA E OPEN-TEXT
        surveyResults.questions
            .filter(q => q.type === "OPEN_TEXT" && q.openAnswers.length > 0)
            .forEach(q => {
                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(12);
                pdf.text(`Pyetja: ${q.text}`, 10, y);
                y += 5;
                pdf.setDrawColor(0);
                pdf.setLineWidth(0.3);
                pdf.line(10, y, 200, y); // <hr> vizual
                y += 5;

                q.openAnswers.filter(a => a && a.trim() !== "").forEach((a, index) => {
                    pdf.setFont("helvetica", "normal");
                    pdf.setFontSize(10);
                    pdf.text(`• ${a}`, 12, y); // bullet list me padding-left
                    y += 6;
                    if (y > 280) { pdf.addPage(); y = 15; }
                });
                y += 8;
            });

// GRAFIKET
        for (const q of surveyResults.questions.filter(q => q.type === "SINGLE_CHOICE" || q.type === "MULTIPLE_CHOICE")) {
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(12);
            pdf.text(`Pyetja: ${q.text}`, 10, y);
            y += 5;
            pdf.setDrawColor(0);
            pdf.setLineWidth(0.3);
            pdf.line(10, y, 200, y);
            y += 5;

            const chartDiv = document.getElementById(`chart-${q.questionId}`);
            if (!chartDiv) continue;

            const canvas = await html2canvas(chartDiv, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");

            const pageWidth = pdf.internal.pageSize.getWidth() - 20;
            const pageHeight = (canvas.height * pageWidth) / canvas.width;

            if (y + pageHeight > 280) { pdf.addPage(); y = 15; }
            pdf.addImage(imgData, "PNG", 10, y, pageWidth, pageHeight);
            y += pageHeight + 10;
        }

        pdf.save(`${surveyResults.surveyTitle}_Rezultate.pdf`);
    };

    return (
        <div className="row gy-3">
            <div className="d-flex justify-content-sm-between align-items-center">
                <h5>{surveyResults.surveyTitle}</h5>
                <button className="btn btn-primary-500" onClick={handleExportPDF}>
                    Export PDF
                </button>
            </div>

            {/* OPEN_TEXT */}
            {surveyResults.questions
                .filter(q => q.type === "OPEN_TEXT" && q.openAnswers.length > 0)
                .map(q => (
                    <div key={q.questionId} className="col-md-12">
                        <div className="card basic-data-table">
                            <div className="card-header">
                                <h6 className="fw-semibold mb-0">{q.text}</h6>
                            </div>
                            <div className="card-body">
                                <table className="table bordered-table mb-0" id={`table-open-${q.questionId}`}>
                                    <thead>
                                    <tr><th>Përgjigja</th></tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}

            {/* SINGLE_CHOICE / MULTIPLE_CHOICE */}
            {surveyResults.questions
                .filter(q => q.type === "SINGLE_CHOICE" || q.type === "MULTIPLE_CHOICE")
                .map(q => {
                    const total = q.options.reduce((acc, o) => acc + o.count, 0);
                    const donutSeries = q.options.map(o => o.count);
                    const donutOptions = {
                        ...basicDonutChartOptions,
                        labels: q.options.map(o => o.text),
                        legend: { show: true, position: "bottom" },
                    };
                    const columnSeries = [{ name: q.text, data: q.options.map(o => o.count) }];
                    const columnOptions = {
                        ...columnChartOptionsTwo,
                        xaxis: { categories: q.options.map(o => o.text) },
                    };

                    return (
                        <div key={q.questionId} className="col-md-12">
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="fw-semibold mb-0">{q.text}</h6>
                                </div>
                                <div className="card-body d-flex flex-wrap gap-5 justify-content-center"
                                     id={`chart-${q.questionId}`}>
                                    {/* Donut Chart */}
                                    <div className="position-relative text-center">
                                        <ReactApexChart
                                            options={donutOptions}
                                            series={donutSeries}
                                            type="donut"
                                            height={264}
                                        />
                                        <div className="position-absolute start-50 top-50 translate-middle">
                                            <span className="text-lg text-secondary-light fw-medium">Total</span>
                                            <h4 className="mb-0">{total}</h4>
                                        </div>
                                    </div>

                                    {/* Column Chart */}
                                    <div className="w-50">
                                        <ReactApexChart
                                            options={columnOptions}
                                            series={columnSeries}
                                            type="bar"
                                            height={264}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default SurveyResultLayer;
