"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import AlertContainer from "@/components/AlertContainer";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {Icon} from "@iconify/react";

const SurveyAddLayer = ({ initialData }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [totalSteps, setTotalSteps] = useState(2);
    const [surveyData, setSurveyData] = useState({
        title: "",
        description: "",
        endDate: "",
        status: "DRAFT",
        questions: []
    });

    const [currentQuestion, setCurrentQuestion] = useState({
        text: "",
        type: "SINGLE_CHOICE",
        options: [{ text: "" }]
    });

    const [imageFile, setImageFile] = useState(null);

    // ---------- Populate from initialData for edit ----------
    useEffect(() => {
        if (initialData) {
            setSurveyData({
                title: initialData.title || "",
                description: initialData.description || "",
                endDate: initialData.endDate || "",
                status: initialData.status || "DRAFT",
                questions: initialData.questions || []
            });

            // Vendosim pyetjen e pare në currentQuestion nëse ekziston
            if (initialData.questions && initialData.questions.length > 0) {
                setCurrentQuestion(initialData.questions[0]);
                setTotalSteps(initialData.questions.length + 1); // pyetjet + 1 për step-in bazë
            }
        }
    }, [initialData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        if (!validTypes.includes(file.type)) {
            addAlert("error", "Gabim", "Ju lutemi ngarkoni vetëm një imazh (jpg, png, gif, webp).");
            e.target.value = "";
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            addAlert("error", "Gabim", "Imazhi është shumë i madh. Maksimumi 5MB.");
            e.target.value = "";
            return;
        }

        setImageFile(file);
    };

    // ----------- Navigation Functions ------------
    const goToStep = (step) => {
        if (currentStep >= 2 && currentStep <= totalSteps) {
            saveCurrentQuestion();
        }
        setCurrentStep(step);
    };

    const nextStep = () => {
        if (currentStep === 1) {
            goToStep(2);
        } else if (currentStep < totalSteps) {
            goToStep(currentStep + 1);
        } else {
            goToStep(totalSteps + 1); // final step
        }
    };

    const prevStep = () => {
        if (currentStep > 1) goToStep(currentStep - 1);
    };

    // ----------- Save Question ------------
    const saveCurrentQuestion = () => {
        if (!currentQuestion.text.trim()) return;

        const questionToSave = {
            ...currentQuestion,
            options: currentQuestion.type === "OPEN_TEXT"
                ? []
                : currentQuestion.options.filter(opt => opt.text.trim())
        };

        setSurveyData(prev => {
            const updatedQuestions = [...prev.questions];
            const questionIndex = currentStep - 2; // pyetjet fillojnë nga step 2

            while (updatedQuestions.length <= questionIndex) updatedQuestions.push(null);

            updatedQuestions[questionIndex] = questionToSave;

            return { ...prev, questions: updatedQuestions };
        });
    };

    // ----------- Add New Question ------------
    const addNewQuestion = () => {
        saveCurrentQuestion();

        const newQuestion = {
            text: "",
            type: "SINGLE_CHOICE",
            options: [{ text: "" }]
        };

        setSurveyData(prev => {
            const updatedQuestions = [...prev.questions];
            const insertIndex = currentStep - 1;
            updatedQuestions.splice(insertIndex, 0, newQuestion);
            return { ...prev, questions: updatedQuestions };
        });

        setCurrentQuestion(newQuestion);

        setTotalSteps(prev => prev + 1);
        setCurrentStep(prev => prev + 1);
    };

    // ----------- Delete Question ------------
    const deleteCurrentQuestion = async () => {
        if (currentStep < 2 || currentStep > totalSteps) return;

        const idx = currentStep - 2; // indeksi i pyetjes në array
        const blank = { text: "", type: "SINGLE_CHOICE", options: [{ text: "" }] };

        const { isConfirmed } = await Swal.fire({
            title: "Fshi këtë pyetje?",
            text: "Ky veprim nuk mund të zhbëhet.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Po, fshije",
            cancelButtonText: "Anulo",
        });
        if (!isConfirmed) return;

        const existsAtIndex = !!surveyData.questions[idx];

        const updated = existsAtIndex
            ? surveyData.questions.filter((_, i) => i !== idx)
            : [...surveyData.questions];

        setSurveyData(prev => ({ ...prev, questions: updated }));

        if (existsAtIndex) {
            setTotalSteps(ts => Math.max(2, ts - 1));
            const newIdx = Math.min(idx, updated.length - 1);

            if (updated.length > 0) {
                setCurrentQuestion(updated[newIdx]);
                setCurrentStep(newIdx + 2);
            } else {
                setCurrentQuestion(blank);
                setCurrentStep(2);
            }
            addAlert("success", "U fshi", "Pyetja u fshi me sukses.");
        } else {
            setCurrentQuestion(blank);
        }
    };

    // ----------- Load Question for currentStep ------------
    useEffect(() => {
        if (currentStep >= 2 && currentStep <= totalSteps) {
            const idx = currentStep - 2;
            const existingQuestion = surveyData.questions[idx];
            if (existingQuestion) {
                setCurrentQuestion(existingQuestion);
            } else {
                setCurrentQuestion({ text: "", type: "SINGLE_CHOICE", options: [{ text: "" }] });
            }
        }
    }, [currentStep, totalSteps, surveyData.questions]);

    // ----------- Options Management ------------
    const addOption = () => {
        setCurrentQuestion(prev => ({ ...prev, options: [...prev.options, { text: "" }] }));
    };

    const removeOption = index => {
        setCurrentQuestion(prev => {
            if (prev.options.length <= 1) return prev;
            return { ...prev, options: prev.options.filter((_, i) => i !== index) };
        });
    };

    const updateOption = (index, text) => {
        setCurrentQuestion(prev => {
            const newOptions = [...prev.options];
            newOptions[index] = { text };
            return { ...prev, options: newOptions };
        });
    };

    // ------------ Alerts ---------------
    const [alerts, setAlerts] = useState([]);

    const addAlert = (type, title, description) => {
        const id = crypto.randomUUID();
        setAlerts((prev) => [
            ...prev,
            { id, type, title, description }
        ]);
    };

    const removeAlert = (id) => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
    };

    // ----------- Publish / Save Survey ------------
    const publishSurvey = async (publish = false) => {
        const finalSurvey = {
            ...surveyData,
            status: publish ? "ACTIVE" : "DRAFT",
            questions: surveyData.questions.filter(q => q && q.text && q.text.trim())
        };

        try {

            const formData = new FormData();
            formData.append(
                "survey",
                new Blob([JSON.stringify(finalSurvey)], { type: "application/json" })
            );
            if (imageFile) formData.append("file", imageFile);

            if (initialData?.id) {

                await axios.put(
                    `http://localhost:8080/api/admin/surveys/${initialData.id}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
                );

                addAlert("success", publish ? "Publikim i suksesshëm" : "Draft i ruajtur", "Pyetësori u përditësua me sukses!");
            } else {
                // CREATE: POST

                const res = await axios.post(
                    "http://localhost:8080/api/admin/surveys",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
                );

                addAlert("success", publish ? "Publikim i suksesshëm" : "Draft i ruajtur", res.data.message);
            }

            // reset state
            setSurveyData({ title: "", description: "", endDate: "", status: "DRAFT", questions: [] });
            setCurrentQuestion({ text: "", type: "SINGLE_CHOICE", options: [{ text: "" }] });
            setImageFile(null);
            setCurrentStep(1);
            setTotalSteps(2);
        } catch (err) {
            const data = err.response?.data;
            if (Array.isArray(data)) data.forEach(msg => addAlert("error", "Gabim", msg));
            else if (Array.isArray(data?.errors)) data.errors.forEach(msg => addAlert("error", "Gabim", msg));
            else if (data?.message) addAlert("error", "Gabim", data.message);
            else if (data?.error) addAlert("warning", "Kujdes", data.error);
            else addAlert("error", "Gabim", "Ndodhi një gabim gjatë ruajtjes së pyetësorit.");
        }
    };

    // === AI modal state ===
    const [aiOpen, setAiOpen] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiForm, setAiForm] = useState({
        brief: "",
        maxQuestions: 8,
        allowOpenText: true,
        allowMultipleChoice: true,
        allowSingleChoice: true,
    });

// Fut draft-in në formë
    const applyDraftToForm = (draft) => {
        setSurveyData(prev => ({
            ...prev,
            title: draft.title || prev.title,
            description: draft.description || prev.description,
            status: "DRAFT",
            questions: (draft.questions || []).map(q => ({
                text: q.text,
                type: q.type, // SINGLE_CHOICE | MULTIPLE_CHOICE | OPEN_TEXT
                options: (q.options || []).map(o => ({ text: o.text }))
            }))
        }));

        const qs = draft.questions || [];
        setTotalSteps(qs.length + 1);
        setCurrentStep(qs.length ? 1 : 1);
        setCurrentQuestion(qs.length
            ? { ...qs[0], options: (qs[0].options || []).map(o => ({ text: o.text })) }
            : { text: "", type: "SINGLE_CHOICE", options: [{ text: "" }] }
        );

        addAlert("success", "Gati!", "Pyetjet u gjeneruan me sukses.");
    };

// Thirr backend-in
    const submitAiGenerate = async () => {
        if (!aiForm.brief.trim()) {
            addAlert("error", "Përshkrim i munguar", "Shkruaj një përshkrim të shkurtër.");
            return;
        }
        setAiLoading(true);
        try {
            const res = await axios.post(
                "http://localhost:8080/api/admin/surveys/ai-generate",
                {
                    brief: aiForm.brief,
                    maxQuestions: aiForm.maxQuestions,
                    allowOpenText: aiForm.allowOpenText,
                    allowMultipleChoice: aiForm.allowMultipleChoice,
                    allowSingleChoice: aiForm.allowSingleChoice
                },
                { withCredentials: true }
            );
            applyDraftToForm(res.data);   // SurveyDto
            setAiOpen(false);
        } catch (err) {
            const msg = err?.response?.data?.error || "Gabim gjatë gjenerimit. Provo sërish.";
            addAlert("error", "Gabim", msg);
        } finally {
            setAiLoading(false);
        }
    };

// stile minimale për modal-in
    const aiModalStyles = {
        overlay: {
            position: "fixed", inset: 0, background: "rgba(0,0,0,.35)",
            zIndex: 1050, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
        },
        panel: { width: "100%", maxWidth: 720 }
    };

    const isChoiceQuestionInvalid =
        (currentQuestion.type === "SINGLE_CHOICE" || currentQuestion.type === "MULTIPLE_CHOICE") &&
        currentQuestion.options.filter(opt => opt.text.trim() !== "").length < 2;

    const iconBtnStyle = {
        width: 40, height: 40, padding: 0,
        display: "inline-flex", alignItems: "center", justifyContent: "center"
    };


    // ----------- JSX ------------
    return (
        <>
            <AlertContainer alerts={alerts} onClose={removeAlert} />
            <div className="col-md-8 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <h6 className="mb-4 text-xl">{initialData ? "Edito Pyetësor" : "Krijo Pyetësor të Ri"}</h6>
                        <p className="text-neutral-500">
                            Plotëso të dhënat dhe shto pyetjet për pyetësorin tënd.
                        </p>

                        {/* Wizard Steps */}
                        <div className="form-wizard">
                            <div className="form-wizard-header overflow-x-auto scroll-sm pb-8 my-32">
                                <ul className="list-unstyled form-wizard-list style-two">
                                    {/* Basic Info Step */}
                                    <li className={`form-wizard-list__item ${currentStep > 1 ? "activated" : ""} ${currentStep === 1 ? "active" : ""}`}>
                                        <div className="form-wizard-list__line">
                                            <span className="count">1</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Informacioni Bazë</span>
                                    </li>

                                    {/* Question Steps */}
                                    {Array.from({ length: totalSteps - 1 }, (_, i) => {
                                        const stepNumber = i + 2; // step 2 = pyetja 1
                                        const questionNumber = i + 1; // pyetja 1, pyetja 2 ...
                                        return (
                                            <li key={i} className={`form-wizard-list__item ${currentStep > stepNumber ? "activated" : ""} ${currentStep === stepNumber ? "active" : ""}`}>
                                                <div className="form-wizard-list__line">
                                                    <span className="count">{stepNumber}</span>
                                                </div>
                                                <span className="text text-xs fw-semibold">Pyetja {questionNumber}</span>
                                            </li>
                                        );
                                    })}

                                    {/* Completion Step */}
                                    <li className={`form-wizard-list__item ${currentStep === totalSteps + 1 ? "active" : ""}`}>
                                        <div className="form-wizard-list__line">
                                            <span className="count">{totalSteps + 1}</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Përfundimi</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Step 1: Basic Information */}
                            {currentStep === 1 && (
                                <fieldset className="wizard-fieldset show">
                                    <h6 className="text-md text-neutral-500">Informacioni Bazë i Pyetësorit</h6>
                                    <div className="row gy-3">
                                        <div className="col-12">
                                            <label className="form-label">Titulli i Pyetësorit*</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Shkruaj titullin e pyetësorit"
                                                value={surveyData.title}
                                                onChange={(e) => setSurveyData({...surveyData, title: e.target.value})}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Përshkrimi</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                placeholder="Shkruaj një përshkrim të shkurtër për pyetësorin"
                                                value={surveyData.description}
                                                onChange={(e) => setSurveyData({
                                                    ...surveyData,
                                                    description: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <label className="form-label">Imazh</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                // value={surveyData.imageUrl}
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <label className="form-label">Data e Përfundimit*</label>
                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                value={surveyData.endDate}
                                                onChange={(e) => setSurveyData({
                                                    ...surveyData,
                                                    endDate: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="form-group d-flex justify-content-between">
                                            {!initialData && (
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary-500 px-32"
                                                    onClick={() => setAiOpen(true)}
                                                >
                                                    Gjenero me IA
                                                </button>
                                            )}

                                            <button
                                                onClick={nextStep}
                                                type="button"
                                                className="btn btn-primary-600 px-32"
                                                disabled={!surveyData.title.trim() || !surveyData.endDate.trim()}
                                            >
                                                Vazhdo
                                            </button>
                                        </div>
                                    </div>
                                </fieldset>
                            )}

                            {/* Question Steps */}
                            {currentStep > 1 && currentStep <= totalSteps && (
                                <fieldset className="wizard-fieldset show">
                                    <h6 className="text-md text-neutral-500">
                                    Pyetja {currentStep - 1}
                                    </h6>
                                    <div className="row gy-3">
                                        <div className="col-12">
                                            <label className="form-label">Teksti i Pyetjes*</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Shkruaj pyetjen"
                                                value={currentQuestion.text}
                                                onChange={(e) => setCurrentQuestion({...currentQuestion, text: e.target.value})}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Lloji i Pyetjes*</label>
                                            <select
                                                className="form-control form-select"
                                                value={currentQuestion.type}
                                                onChange={(e) => setCurrentQuestion({
                                                    ...currentQuestion,
                                                    type: e.target.value,
                                                    options: e.target.value === "OPEN_TEXT" ? [] : [{ text: "" }]
                                                })}
                                            >
                                                <option value="SINGLE_CHOICE">Zgjedhje e Vetme</option>
                                                <option value="MULTIPLE_CHOICE">Zgjedhje të Shumta</option>
                                                <option value="OPEN_TEXT">Tekst i Hapur</option>
                                            </select>
                                        </div>

                                        {/* Options for choice questions */}
                                        {currentQuestion.type !== "OPEN_TEXT" && (
                                            <div className="col-12">
                                                <label className="form-label">Opsionet</label>
                                                {currentQuestion.options.map((option, index) => (
                                                    <div key={index} className="d-flex gap-2 mb-2">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={`Opsioni ${index + 1}`}
                                                            value={option.text}
                                                            onChange={(e) => updateOption(index, e.target.value)}
                                                        />
                                                        {currentQuestion.options.length > 1 && (
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-danger"
                                                                onClick={() => removeOption(index)}
                                                            >
                                                                ×
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary btn-sm"
                                                    onClick={addOption}
                                                >
                                                    + Shto Opsion
                                                </button>
                                            </div>
                                        )}

                                        <div className="form-group d-flex align-items-center justify-content-between">
                                            <button
                                                onClick={prevStep}
                                                type="button"
                                                className="btn btn-neutral-500 border-neutral-100 px-32"
                                            >
                                                Kthehu
                                            </button>
                                            <div className="d-flex gap-2">
                                                {currentStep > 1 && currentStep < totalSteps && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary rounded-circle"
                                                        style={iconBtnStyle}
                                                        title="Pyetja Pasardhëse"
                                                        aria-label="Pyetja Pasardhëse"
                                                        onClick={() => {
                                                            saveCurrentQuestion();

                                                            const nextStepVal = currentStep + 1;
                                                            const nextQuestionIndex = nextStepVal - 2;

                                                            if (surveyData.questions[nextQuestionIndex]) {
                                                                setCurrentQuestion(surveyData.questions[nextQuestionIndex]);
                                                                setCurrentStep(nextStepVal);
                                                            } else {
                                                                setCurrentQuestion({ text: "", type: "SINGLE_CHOICE", options: [{ text: "" }] });
                                                                setCurrentStep(nextStepVal);
                                                            }
                                                        }}
                                                    >
                                                        <Icon icon="lucide:chevron-right" width={18} height={18} />
                                                    </button>
                                                )}

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger rounded-circle"
                                                    style={iconBtnStyle}
                                                    title="Fshi këtë pyetje"
                                                    aria-label="Fshi këtë pyetje"
                                                    onClick={deleteCurrentQuestion}
                                                    disabled={currentStep < 2 || currentStep > totalSteps || !surveyData.questions[currentStep-2]}
                                                >
                                                    <Icon icon="lucide:trash-2" width={18} height={18}/>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary rounded-circle"
                                                    style={iconBtnStyle}
                                                    title="Shto Pyetje Tjetër"
                                                    aria-label="Shto Pyetje Tjetër"
                                                    onClick={addNewQuestion}
                                                    disabled={!currentQuestion.text.trim() || isChoiceQuestionInvalid}
                                                >
                                                    <Icon icon="lucide:plus" width={18} height={18} />
                                                </button>


                                                <button
                                                    type="button"
                                                    className="btn btn-primary-600 px-32"
                                                    onClick={nextStep} // përfundon wizard
                                                    disabled={!currentQuestion.text.trim() || isChoiceQuestionInvalid}
                                                >
                                                    Përfundo
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            )}

                            {/* Final Step */}
                            {currentStep === totalSteps + 1 && (
                                <fieldset className="wizard-fieldset show">
                                    <div className="text-center mb-40">
                                        <img
                                            src='/assets/images/gif/success-img3.gif'
                                            alt=''
                                            className='gif-image mb-30'
                                        />
                                        <h6 className="text-md text-neutral-600">Pyetësori është Gati!</h6>
                                        <p className="text-neutral-400 text-sm mb-0">
                                            Zgjedh nëse dëshiron ta publikosh tani apo ta ruash si draft.
                                        </p>
                                    </div>

                                    {/* Survey Preview */}
                                    <div className="card bg-light mb-4">
                                        <div className="card-body">
                                            <h6 className="card-title">{surveyData.title}</h6>
                                            <p className="card-text text-muted">{surveyData.description}</p>
                                            <small className="text-muted">
                                                Pyetje të shtuara: {surveyData.questions.length}
                                            </small>
                                        </div>
                                    </div>

                                    <div className="form-group d-flex align-items-center justify-content-center gap-3">
                                        <button
                                            onClick={prevStep}
                                            type="button"
                                            className="btn btn-neutral-500 border-neutral-100 px-32"
                                        >
                                            Kthehu
                                        </button>
                                        <button
                                            onClick={() => publishSurvey(false)}
                                            type="button"
                                            className="btn btn-outline-primary px-32"
                                        >
                                            Ruaj si Draft
                                        </button>
                                        <button
                                            onClick={() => publishSurvey(true)}
                                            type="button"
                                            className="btn btn-primary-600 px-32"
                                        >
                                            Publiko Tani
                                        </button>
                                    </div>
                                </fieldset>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {aiOpen && (
                <div style={aiModalStyles.overlay} role="dialog" aria-modal="true">
                    <div className="card shadow-lg" style={aiModalStyles.panel}>
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">Gjenero pyetësorin me IA</h6>
                            <button
                                className="btn btn-sm btn-neutral-500 border-neutral-100"
                                onClick={() => !aiLoading && setAiOpen(false)}
                                disabled={aiLoading}
                            >
                                Mbyll
                            </button>
                        </div>

                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Përshkrim*</label>
                                <textarea
                                    className="form-control"
                                    rows={4}
                                    placeholder="Përshkruaj qëllimin, audiencën dhe çfarë do të matësh…"
                                    value={aiForm.brief}
                                    onChange={(e) => setAiForm(f => ({ ...f, brief: e.target.value }))}
                                    disabled={aiLoading}
                                />
                            </div>

                            <div className="row gy-3">
                                <div className="col-sm-4">
                                    <label className="form-label"># Pyetje (1–15)</label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={15}
                                        className="form-control"
                                        value={aiForm.maxQuestions}
                                        onChange={(e) => setAiForm(f => ({
                                            ...f,
                                            maxQuestions: Math.max(1, Math.min(15, Number(e.target.value || 8)))
                                        }))}
                                        disabled={aiLoading}
                                    />
                                </div>
                                <div className="col-sm-8 d-flex align-items-end gap-3 flex-wrap">
                                    <div className="form-check form-check-inline d-flex align-items-center">
                                        <input
                                            id="ai-allow-open"
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={aiForm.allowOpenText}
                                            onChange={(e) => setAiForm(f => ({...f, allowOpenText: e.target.checked}))}
                                            disabled={aiLoading}
                                        />
                                        <label className="form-check-label ms-2 mb-0" htmlFor="ai-allow-open">
                                            Lejo pyetje të hapura
                                        </label>
                                    </div>

                                    <div className="form-check form-check-inline d-flex align-items-center">
                                        <input
                                            id="ai-allow-multi"
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={aiForm.allowMultipleChoice}
                                            onChange={(e) => setAiForm(f => ({
                                                ...f,
                                                allowMultipleChoice: e.target.checked
                                            }))}
                                            disabled={aiLoading}
                                        />
                                        <label className="form-check-label ms-2 mb-0" htmlFor="ai-allow-multi">
                                            Lejo pyetje me shumë zgjedhje
                                        </label>
                                    </div>

                                    <div className="form-check form-check-inline d-flex align-items-center">
                                        <input
                                            id="ai-allow-single"
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={aiForm.allowSingleChoice}
                                            onChange={(e) => setAiForm(f => ({
                                                ...f,
                                                allowSingleChoice: e.target.checked
                                            }))}
                                            disabled={aiLoading}
                                        />
                                        <label className="form-check-label ms-2 mb-0" htmlFor="ai-allow-single">
                                            Lejo pyetje me një zgjedhje
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="card-footer d-flex justify-content-end gap-2">
                            <button
                                className="btn btn-neutral-500 border-neutral-100"
                                onClick={() => setAiOpen(false)}
                                disabled={aiLoading}
                            >
                                Anulo
                            </button>
                            <button
                                className="btn btn-primary-600 px-32"
                                onClick={submitAiGenerate}
                                disabled={aiLoading}
                            >
                                {aiLoading ? (
                                    <span className="d-inline-flex align-items-center gap-2">
                                      <span className="spinner-border spinner-border-sm" role="status"
                                            aria-hidden="true"></span>
                                      Duke gjeneruar…
                                    </span>
                                ) : "Gjenero"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default SurveyAddLayer;