import { useEffect, useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

export default function Home() {
    const [productData, setProductData] = useState([]);
    const [inputCategory, setInputCategory] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://dummyjson.com/products');
                const data1 = await res.json();
                setProductData(data1.products);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const filterData = inputCategory
        ? productData.filter((item) => item.category === inputCategory)
        : productData;

    return (
        <div className="container mt-4">
            {/* Category Filter */}
            <div className="mb-4">
                <select
                    className="form-select"
                    value={inputCategory}
                    onChange={(e) => setInputCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {Array.from(new Set(productData.map((item) => item.category))).map(
                        (category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        )
                    )}
                </select>
            </div>

            {/* Product Grid */}
            <div className="row">
                {filterData.map((item) => (
                    <div key={item.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img 
                                src={item.thumbnail} 
                                alt={item.title} 
                                className="card-img-top"
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text text-muted">{item.description}</p>
                                <span className="badge bg-primary">{item.category}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
