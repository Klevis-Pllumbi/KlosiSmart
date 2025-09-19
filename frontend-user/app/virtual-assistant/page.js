'use client'
import Layout from "@/components/layout/Layout";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Icon } from "@iconify/react";
import ReactMarkdown from "react-markdown";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function ChatbotPage() {
    // Session ID për ruajtjen e historikut në backend

    const [sessionId, setSessionId] = useState("");

    useEffect(() => {
        // ky kod ekzekutohet vetëm në browser
        let storedId = localStorage.getItem("chatSessionId");
        if (!storedId) {
            storedId = uuidv4();
            localStorage.setItem("chatSessionId", storedId);
        }
        setSessionId(storedId);
    }, []);

    const [messages, setMessages] = useState([
        { sender: "bot", text: "Përshëndetje! Unë jam asistenti juaj virtual. Ju mund të më pyesni për çdo çështje që lidhet me administratën publike, shërbimet shtetërore dhe qeverisjen vendore. Si mund t’ju ndihmoj sot?" },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const containerRef = useRef(null);
    const autoScrollRef = useRef(true);

    // Scroll automatik kur vijnë mesazhe
    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        if (!autoScrollRef.current) return;

        const rafId = requestAnimationFrame(() => {
            try {
                el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
            } catch {
                el.scrollTop = el.scrollHeight;
            }
        });

        return () => cancelAnimationFrame(rafId);
    }, [messages]);

    // Kontroll scroll kur përdoruesi lëviz lart
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const onScroll = () => {
            const threshold = 150;
            autoScrollRef.current =
                el.scrollHeight - (el.scrollTop + el.clientHeight) < threshold;
        };
        el.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => el.removeEventListener("scroll", onScroll);
    }, []);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);

        const messageToSend = input;
        setInput("");

        setIsTyping(true);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/user/chat",
                { message: input, sessionId: sessionId },
                { withCredentials: true }
            );

            setMessages(prev => [...prev, { sender: "bot", text: response.data.response }]);
            setIsTyping(false);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Gabim gjatë marrjes së përgjigjes nga serveri." }
            ]);
            setIsTyping(false);
        }
    };

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Asisteni Virtual">
            <section className="chatbot-page page-with-bg">
                <div className="auto-container">
                    <div className="chat-container">
                        <div className="chat-messages" ref={containerRef}>
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
                                >
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="chat-message bot typing">
                                    <span></span><span></span><span></span>
                                </div>
                            )}
                        </div>

                        <form className="chat-input-area" onSubmit={handleSend}>
                            <input
                                type="text"
                                placeholder="Shkruani mesazhin tuaj..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend(e)}
                            />
                            <button type="submit" className="btn-one">
                                <Icon icon="mdi:send" width="20" height="20" className="txt" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
