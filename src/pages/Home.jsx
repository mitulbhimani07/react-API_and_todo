import { useEffect, useState } from "react";
import React from "react";

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
        <div>
            <select
                value={inputCategory}
                onChange={(e) => setInputCategory(e.target.value)}
            >
                <option value="">All</option>
                {Array.from(new Set(productData.map((item) => item.category))).map(
                    (category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    )
                )}
            </select>
            <div>
                {filterData.map((item) => (
                    <div key={item.id} style={{border:'1px solid ', margin:"20px" , borderRadius : "20px"}}>
                        <img src={item.thumbnail} alt={item.title} />
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p>Category: {item.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
