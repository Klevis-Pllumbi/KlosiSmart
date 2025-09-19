"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import SurveyForm from "@/components/elements/SurveyForm";
import axios from "axios";
import Preloader from "@/components/elements/Preloader";

export default function SurveyPage() {
    const { id } = useParams();
    const [survey, setSurvey] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:8080/api/user/surveys/${id}`, { withCredentials: true })
                .then((res) => {
                    if (!res.data) {
                        notFound();
                    }
                    setSurvey(res.data);
                })
                .catch((err) => {
                    console.error("Gabim:", err);
                    if (err.response && err.response.status === 404) {
                        notFound();
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <Preloader />;

    return <SurveyForm survey={survey} />;
}

