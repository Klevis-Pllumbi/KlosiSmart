"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import SurveyAddLayer from "@/components/SurveyAddLayer";
import { notFound } from "next/navigation";
import Preloader from "@/components/child/Preloader";

const SurveyEditPage = ({ surveyId }) => {

    const [surveyData, setSurveyData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!surveyId) return;

        axios.get(`http://localhost:8080/api/admin/surveys/${surveyId}`, {
            withCredentials: true
        })
            .then(res => {
                if (!res.data) {
                    notFound();
                } else {
                    setSurveyData(res.data);
                }
            })
            .catch(err => {
                console.error(err);
                notFound();
            })
            .finally(() => setLoading(false));
    }, [surveyId]);

    if (loading) {
        return (
            <Preloader />
        );
    }

    return (
        <SurveyAddLayer initialData={surveyData} />
    );
};

export default SurveyEditPage;
