import React, { useState, useEffect, useLayoutEffect } from 'react';
import Base from './Base';
import Card from './Card';
import { getProducts } from "./helper/coreapicalls"

import "../styles.css";



export default function Home() {


    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getProducts()
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    console.log(error);
                } else {
                    setProducts(data);
                }
            });
    };

    useEffect(() => {
        loadAllProducts();
    }, []);


    return (
        <Base title="Home Page" description="wlm tshirt">
            <h1>Home component</h1>
            <div className="row">
                {products.map((product, index) => {
                    return (
                        <div key={index} className="col-4 mb-4">
                            <Card product={product} />
                        </div>
                    );

                })}
            </div>
        </Base>
    );
}

