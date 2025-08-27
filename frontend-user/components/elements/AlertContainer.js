"use client";
import { AnimatePresence } from "framer-motion";
import Alert from "@/components/elements/Alert";

export default function AlertContainer({ alerts, onClose }) {
    return (
        <div className="alert-container">
            <AnimatePresence>
                {alerts.map((alert, index) => (
                    <Alert
                        key={alert.id}
                        id={alert.id}
                        type={alert.type}
                        title={alert.title}
                        description={alert.description}
                        onClose={onClose}
                        delay={index * 0.5}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
