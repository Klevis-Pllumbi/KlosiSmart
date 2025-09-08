"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Alert({ id, type = "info", title, description, onClose, delay = 0 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, 5000);
        return () => clearTimeout(timer);
    }, [id, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5, delay } }}
            exit={{ opacity: 0, x: 50, transition: { duration: 0.5, delay } }}
            className={`alert-box ${type}`}
        >
            <button className="alert-close" onClick={() => onClose(id)}>
                ×
            </button>
            <h4 className="alert-title">{title}</h4>
            {description && <p className="alert-desc">{description}</p>}
        </motion.div>
    );
}