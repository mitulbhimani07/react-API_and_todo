import { useEffect, useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

export default function Home() {
    const [productData, setProductData] = useState([]);
    const [inputCategory, setInputCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState(""); // Sorting
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Number of products per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://dummyjson.com/products");
                const data1 = await res.json();
                setProductData(data1.products);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Filter by category
    const filteredByCategory = inputCategory
        ? productData.filter((item) => item.category === inputCategory)
        : productData;

    // Filter by search term
    const filteredData = filteredByCategory.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting Logic
    const sortedData = [...filteredData].sort((a, b) => {
        if (sortBy === "priceLow") return a.price - b.price;
        if (sortBy === "priceHigh") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container mt-4">
            {/* Search, Filter, and Sort Section */}
            <div className="d-flex flex-wrap gap-3 justify-content-between mb-4">
                {/* Search Input */}
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Category Filter */}
                <select
                    className="form-select w-25"
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

                {/* Sorting Dropdown */}
                <select
                    className="form-select w-25"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="rating">Rating: High to Low</option>
                </select>

                {/* Clear Filters Button */}
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        setInputCategory("");
                        setSearchTerm("");
                        setSortBy("");
                        setCurrentPage(1);
                    }}
                >
                    Clear Filters
                </button>
            </div>

            {/* Product Grid */}
            <div className="row">
                {currentItems.length > 0 ? (
                    currentItems.map((item) => (
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
                                    <div className="mt-2">
                                        <strong>Price: </strong> ${item.price.toFixed(2)}
                                    </div>
                                    <div>
                                        <strong>Rating: </strong> ⭐{item.rating.toFixed(1)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No products found</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <button
                        className="btn btn-outline-primary mx-2"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Previous
                    </button>
                    <span className="align-self-center">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="btn btn-outline-primary mx-2"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
