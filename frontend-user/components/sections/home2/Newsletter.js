'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import Link from "next/link";

export default function Newsletter() {
    const { user, refresh } = useAuth?.() || { user: null, refresh: async () => {} };

    const [isSubscribed, setIsSubscribed] = useState(null); // null = unknown, true/false = known
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);
    const [error, setError] = useState('');

    // Fetch profile (and subscription) from the backend once we know auth state
    const loadProfile = async () => {
        if (!user) { setIsSubscribed(null); return; }
        try {
            setChecking(true);
            const res = await axios.get('http://localhost:8080/api/user/profile', { withCredentials: true });
            setIsSubscribed(!!res.data?.isSubscribed);
            setError('');
        } catch (e) {
            // If unauthorized or any error, treat as unknown state (UI will prompt login)
            setIsSubscribed(null);
        } finally {
            setChecking(false);
        }
    };

    useEffect(() => {
        loadProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.email]);

    const toggleSubscription = async () => {
        if (!user) return; // Guard; UI already handles this state
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8080/api/user/subscription/toggle', {}, { withCredentials: true });
            // Backend returns boolean per your controller
            const active = !!res.data;
            setIsSubscribed(active);
            setError('');
            // Optionally refresh auth context if it mirrors profile
            if (typeof refresh === 'function') {
                try { await refresh(); } catch {}
            }
        } catch (e) {
            setError('Diçka shkoi keq. Ju lutem, provoni përsëri.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="subscribe" className="newsletter-style1">
            <div className="auto-container">
                <div className="row">
                    {/* Title */}
                    <div className="col-xl-4">
                        <div className="newsletter-style1__title">
                            <h2>
                                Abonohuni për të <br />
                                mos humbur asgjë
                            </h2>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="col-xl-8">
                        <div className="newsletter-style1__form">
                            {/* Not logged in */}
                            {!user && (
                                <div className="newsletter-style1__form-inner">
                                    <p className="mb-3 pe-3 text-white">
                                        Për t'u abonuar duhet të jeni të kyçur në llogarinë tuaj.
                                        Krijoni një llogari ose hyni me llogarinë ekzistuese për të marrë njoftime për
                                        <strong> lajme</strong>, <strong>evente</strong> dhe <strong>pyetësorë</strong> të
                                        rinj.
                                        Ju mund të hiqni abonimin tuaj kurdo që dëshironi.
                                    </p>
                                    <Link href="/login" className="newsletter-style1__form-btn">
                                        <div className="btn-one newsletter-style1__form-btn">
                                            <span className="txt">Login</span>
                                        </div>
                                    </Link>
                                </div>
                                )}

                            {/* Logged in */}
                            {user && (
                                <div className="newsletter-style1__form-inner">
                                    {isSubscribed === true && (
                                        <>
                                            <p className="mb-3 pe-3 text-white">
                                                <strong>Faleminderit për abonimin
                                                    tuaj, {user?.fullName || user?.name || ''}.</strong><br/>
                                                Do të merrni njoftime sa herë që publikojmë të reja. Mund të
                                                ç'aktivizoni njoftimet kur të dëshironi.
                                            </p>
                                            <div className="newsletter-style1__form-btn">
                                                <button
                                                    type="button"
                                                    className="btn-one newsletter-style1__form-btn"
                                                    onClick={toggleSubscription}
                                                    disabled={loading}
                                                >
                                                    <span
                                                        className="txt">{loading ? 'Duke procesuar...' : 'Hiq abonimin'}</span>
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {isSubscribed === false && (
                                        <>
                                            <p className="mb-3 pe-3 text-white">
                                                Abonohuni për të mos humbur asnjë publikim të ri dhe për të
                                                marrë njoftime në kohë reale për
                                                <strong> lajme</strong>, <strong>evente</strong> dhe <strong>pyetësorë</strong> të
                                                rinj.
                                            </p>
                                            <div className="newsletter-style1__form-btn">
                                                <button
                                                    type="button"
                                                    className="btn-one newsletter-style1__form-btn"
                                                    onClick={toggleSubscription}
                                                    disabled={loading}
                                                >
                                                    <span
                                                        className="txt">{loading ? 'Duke procesuar...' : 'Abonohu tani'}</span>
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {(isSubscribed === null || checking) && (
                                        <p className="opacity-80">Duke kontrolluar statusin e abonimit…</p>
                                    )}

                                    {error && (
                                        <p className="text-danger mt-2" role="alert">{error}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
