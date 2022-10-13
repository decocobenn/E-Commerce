import { useState, useEffect } from 'react'
import styled from "styled-components"
import Product from "./Product"
import axios from 'axios';
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({ category, filters, sort }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(category ? process.env.REACT_APP_API_URL + `/api/products?category=${category}` : process.env.REACT_APP_API_URL + '/api/products')
                setProducts(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [category])

    useEffect(() => {
        if (filters) {
            if ("color" in filters) {
                if (filters["color"] === "Color") {
                    delete filters["color"]
                }
            }
            if ("size" in filters) {
                if (filters["size"] === "Size") {
                    delete filters["size"]
                }
            }
        }
        category && setFilteredProducts(
            products.filter(item => Object.entries(filters).every(([key, value]) => item[key].includes(value)))
        )

    }, [products, category, filters])

    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts(
                prev => [...prev].sort((a, b) => a.createdAt - b.createdAt)
            )
        }
        if (sort === "asc") {
            setFilteredProducts(
                prev => [...prev].sort((a, b) => a.price - b.price)
            )
        } else {
            setFilteredProducts(
                prev => [...prev].sort((a, b) => b.price - a.price)
            )
        }

    }, [sort])

    return (
        <Container>
            {category ? filteredProducts.map(product => (
                <Product
                    item={product}
                    key={product.id}
                />
            )) : products.slice(0, 8).map(product => (
                <Product
                    item={product}
                    key={product.id}
                />
            ))}
        </Container>
    )
}

export default Products
