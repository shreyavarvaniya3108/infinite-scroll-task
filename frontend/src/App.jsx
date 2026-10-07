import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const pageRef = useRef(0);
    const loadingRef = useRef(false);

    const loadMore = async () => {
        if (loadingRef.current) return;

        loadingRef.current = true;
        setLoading(true);
        setError("");

        const nextPage = pageRef.current + 1;

        try {
            const response = await fetch(
                `http://localhost:5000/api/data?page=${nextPage}&limit=10`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();

            setItems((prevItems) => [...prevItems, ...data.items]);
            pageRef.current = nextPage;
        } catch (error) {
            setError("Unable to load data. Please try again.");
            console.error(error);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMore();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            {
                threshold: 1,
            }
        );

        const loader = document.querySelector(".loader");

        if (loader) {
            observer.observe(loader);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="app">
            <header className="header">
                <div className="badge">REACT + EXPRESS</div>

                <h1>Infinite Scroll</h1>

                <p>
                    Dynamic data loading using the native Intersection Observer API.
                </p>

                <div className="stats">
                    <div className="stat">
                        <span>{items.length}</span>
                        <small>Items Loaded</small>
                    </div>

                    <div className="stat">
                        <span>{pageRef.current}</span>
                        <small>Pages Loaded</small>
                    </div>
                </div>
            </header>

            <main className="items">
                {items.map((item) => (
                    <article className="item" key={item.id}>
                        <div className="item-number">
                            #{String(item.id).padStart(2, "0")}
                        </div>

                        <div>
                            <h2>{item.name}</h2>
                            <p>Dynamic item loaded from the backend.</p>
                        </div>
                    </article>
                ))}
            </main>

            <div className="loader">
                {loading && (
                    <>
                        <div className="spinner"></div>
                        <span>Loading more items...</span>
                    </>
                )}

                {!loading && !error && <span>Scroll down to load more</span>}
            </div>

            {error && (
                <div className="error-box">
                    <p>{error}</p>
                    <button onClick={loadMore}>Try Again</button>
                </div>
            )}
        </div>
    );
}

export default App;