"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import Loading from "@/components/child/Loading";
import AlertContainer from "@/components/AlertContainer";

const UnitCountOne = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalSubscribed: 0, totalEnabled: 0 });
    const [loading, setLoading] = useState(true);
    const [alerts, setAlerts] = useState([]);

    const addAlert = (type, title, description) => {
        const id = crypto.randomUUID();
        setAlerts((prev) => [...prev, { id, type, title, description }]);
    };
    const removeAlert = (id) => setAlerts((prev) => prev.filter((a) => a.id !== id));

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/admin/users/stats", {
                    withCredentials: true,
                });
                setStats(res.data);
            } catch (e) {
                addAlert("error", "Gabim", "Nuk u morën statistikat e user-ëve.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // konfigurimi i kartave
    const cards = [
        {
            title: "Përdorues Total",
            value: stats.totalUsers,
            cardClass: "bg-gradient-start-1",
            circleClass: "bg-cyan",
            icon: "gridicons:multiple-users",
        },
        {
            title: "Përdorues Të Abonuar",
            value: stats.totalSubscribed,
            cardClass: "bg-gradient-start-2",
            circleClass: "bg-purple",
            icon: "fa-solid:award",
        },
        {
            title: "Përdorues Aktiv",
            value: stats.totalEnabled,
            cardClass: "bg-gradient-start-5",
            circleClass: "bg-danger",
            icon: "mdi:account-check-outline",
        },
    ];

    if (loading) {
        return (
            <>
                <AlertContainer alerts={alerts} onClose={removeAlert} />
                <div className="text-center py-4">
                    <Loading />
                </div>
            </>
        );
    }

    return (
        <>
            <AlertContainer alerts={alerts} onClose={removeAlert} />
            <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
                {cards.map((c, i) => (
                    <div className="col" key={i}>
                        <div className={`card shadow-none border ${c.cardClass} h-80`}>
                            <div className="card-body p-20">
                                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                    <div>
                                        <p className="fw-medium text-primary-light mb-1">{c.title}</p>
                                        <h6 className="mb-0">{c.value}</h6>
                                    </div>
                                    <div
                                        className={`w-50-px h-50-px ${c.circleClass} rounded-circle d-flex justify-content-center align-items-center`}
                                    >
                                        <Icon icon={c.icon} className="text-white text-2xl mb-0" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default UnitCountOne;
