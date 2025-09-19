'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function PreloaderProvider() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [active, setActive] = useState(false);

    // Fik loader-in kur ndryshon rruga ose query string-u
    useEffect(() => {
        if (active) setActive(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams?.toString()]);

    useEffect(() => {
        const onClick = (e) => {
            // Vetëm primary-click pa modifiers
            if (
                e.defaultPrevented ||
                e.button !== 0 ||
                e.metaKey || e.altKey || e.ctrlKey || e.shiftKey
            ) return;

            // Gjej më të afërtin <a>
            let el = e.target;
            while (el && el.tagName !== 'A') el = el.parentElement;
            if (!el) return;

            const a = el;
            const href = a.getAttribute('href');
            const target = a.getAttribute('target') || '';

            // Injoro anchor pa href, hash-only, new tab, download, skema jo http(s)
            if (!href || href.startsWith('#') || target === '_blank' || a.hasAttribute('download')) return;

            let url;
            try {
                url = new URL(href, window.location.href);
            } catch {
                return;
            }
            if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

            // Injoro linke jashtë domain-it
            if (url.origin !== window.location.origin) return;

            // Normalizo trailing slashes për krahasim
            const norm = (p) => p.replace(/\/+$/, '') || '/';

            const samePath = norm(url.pathname) === norm(window.location.pathname);
            const sameSearch = url.search === window.location.search;
            const sameHash = (url.hash || '') === (window.location.hash || '');

            // ⚠️ FIX: Nëse është i njëjti URL (path+query+hash) → mos ndiz
            if (samePath && sameSearch && sameHash) return;

            // Nëse ndryshon vetëm hash-i → mos ndiz
            if (samePath && sameSearch && !sameHash) return;

            // Start loader
            setActive(true);

            // Safety: fiket automatikisht pas 8s
            const timeout = window.setTimeout(() => setActive(false), 8000);

            const stop = () => {
                window.clearTimeout(timeout);
                window.removeEventListener('popstate', stop);
                window.removeEventListener('hashchange', stop);
            };
            // Nëse ka lëvizje mbrapa/para ose ndryshim hash gjatë pritjes
            window.addEventListener('popstate', stop);
            window.addEventListener('hashchange', stop);
        };

        // Capture që të ndizet herët
        window.addEventListener('click', onClick, { capture: true });
        return () => window.removeEventListener('click', onClick, { capture: true });
    }, []);

    // Mbyllje me tastierë kur është aktiv
    useEffect(() => {
        if (!active) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setActive(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [active]);

    if (!active) return null;

    return (
        <>
            {/* Start Preloader */}
            <div className="loader-wrap" aria-live="polite" aria-busy="true">
                <div className="preloader" role="status">
                    <button
                        type="button"
                        aria-label="Mbyll ngarkuesin"
                        className="preloader-close"
                        onClick={() => setActive(false)}
                    >
                        x
                    </button>
                    <div id="handle-preloader" className="handle-preloader">
                        <div className="animation-preloader">
                            <div className="spinner" />
                            <div className="txt-loading" aria-hidden="true">
                                <span data-text-preloader="k" className="letters-loading">k</span>
                                <span data-text-preloader="l" className="letters-loading">l</span>
                                <span data-text-preloader="o" className="letters-loading">o</span>
                                <span data-text-preloader="s" className="letters-loading">s</span>
                                <span data-text-preloader="i" className="letters-loading">i</span>
                                <span data-text-preloader="s" className="letters-loading">s</span>
                                <span data-text-preloader="m" className="letters-loading">m</span>
                                <span data-text-preloader="a" className="letters-loading">a</span>
                                <span data-text-preloader="r" className="letters-loading">r</span>
                                <span data-text-preloader="t" className="letters-loading">t</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Preloader */}
        </>
    );
}
