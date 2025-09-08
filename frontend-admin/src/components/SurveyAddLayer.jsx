"use client";
import React, {useEffect, useState} from "react";

const SurveyAddLayer = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [totalSteps, setTotalSteps] = useState(2);
    const [surveyData, setSurveyData] = useState({
        title: "",
        description: "",
        imageUrl: "",
        endDate: "",
        status: "DRAFT",
        questions: []
    });

    const [currentQuestion, setCurrentQuestion] = useState({
        text: "",
        type: "SINGLE_CHOICE",
        options: [{ text: "" }]
    });

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

            // Mbush array deri te indexi nëse nuk ekziston
            while (updatedQuestions.length <= questionIndex) updatedQuestions.push(null);

            updatedQuestions[questionIndex] = questionToSave;

            return { ...prev, questions: updatedQuestions };
        });
    };

    // ----------- Add New Question ------------
    const addNewQuestion = () => {
        saveCurrentQuestion();

        // vendosim pyetjen e re bosh
        const newQuestion = {
            text: "",
            type: "SINGLE_CHOICE",
            options: [{ text: "" }]
        };

        setSurveyData(prev => {
            const updatedQuestions = [...prev.questions];
            const insertIndex = currentStep - 1; // e vendosim pyetjen e re pas pyetjes aktuale
            updatedQuestions.splice(insertIndex, 0, newQuestion);
            return { ...prev, questions: updatedQuestions };
        });

        // Mos e shtojmë currentStep në fund, thjesht shfaqim pyetjen bosh në hapin e ri
        setCurrentQuestion({
            text: "",
            type: "SINGLE_CHOICE",
            options: [{ text: "" }]
        });

        setTotalSteps(prev => prev + 1);
        setCurrentStep(prev => prev + 1); // kalojmë te pyetja bosh e re
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

    // ----------- Publish / Save Survey ------------
    const publishSurvey = (publish = false) => {
        const finalSurvey = {
            ...surveyData,
            status: publish ? "ACTIVE" : "DRAFT",
            questions: surveyData.questions.filter(q => q && q.text && q.text.trim())
        };

        console.log("Survey to save:", finalSurvey);
        alert(publish ? "Pyetësori u publikua!" : "Pyetësori u ruajt si draft!");

        setSurveyData(finalSurvey);
    };

    return (
        <div className="col-md-8 mx-auto">
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-4 text-xl">Krijo Pyetësor të Ri</h6>
                    <p className="text-neutral-500">
                        Plotëso të dhënat dhe shto pyetjet për pyetësorin tënd.
                    </p>

                    {/* Wizard Steps */}
                    <div className="form-wizard">
                        <div className="form-wizard-header overflow-x-auto scroll-sm pb-8 my-32">
                            <ul className="list-unstyled form-wizard-list">
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
                                            onChange={(e) => setSurveyData({...surveyData, description: e.target.value})}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">URL e Imazhit</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            placeholder="https://example.com/image.png"
                                            value={surveyData.imageUrl}
                                            onChange={(e) => setSurveyData({...surveyData, imageUrl: e.target.value})}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Data e Përfundimit*</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            value={surveyData.endDate}
                                            onChange={(e) => setSurveyData({...surveyData, endDate: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group text-end">
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
                                                    className="btn btn-outline-secondary px-32"
                                                    onClick={() => {
                                                        saveCurrentQuestion(); // ruaj pyetjen aktuale

                                                        const nextStep = currentStep + 1; // hapi tjetër
                                                        const nextQuestionIndex = nextStep - 2; // array pyetjeve fillon nga 0

                                                        if (surveyData.questions[nextQuestionIndex]) {
                                                            setCurrentQuestion(surveyData.questions[nextQuestionIndex]);
                                                            setCurrentStep(nextStep);
                                                        } else {
                                                            // Në rast se nuk ka pyetje në atë index, thjesht shkojmë tek nextStep dhe pastrojmë
                                                            setCurrentQuestion({
                                                                text: "",
                                                                type: "SINGLE_CHOICE",
                                                                options: [{ text: "" }]
                                                            });
                                                            setCurrentStep(nextStep);
                                                        }
                                                    }}
                                                >
                                                    Pyetja Pasardhëse
                                                </button>
                                            )}

                                            <button
                                                type="button"
                                                className="btn btn-outline-primary px-32"
                                                onClick={addNewQuestion}
                                                disabled={!currentQuestion.text.trim()}
                                            >
                                                Shto Pyetje Tjetër
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-primary-600 px-32"
                                                onClick={nextStep} // përfundon wizard
                                                disabled={!currentQuestion.text.trim()}
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
                                    <div className="mb-24">
                                        <div style={{fontSize: "4rem", color: "#22c55e"}}>✅</div>
                                    </div>
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
    );
};

export default SurveyAddLayer;