import styled from "styled-components";
import SingleProduct from "./SingleProduct";
import axios from "axios";
import { useState, useEffect } from "react";
const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products/getAllProducts?category=${cat}`
            : "http://localhost:5000/api/products/getAllProducts"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <ProductsContainer>
      {cat
        ? filteredProducts.map((product) => (
            <SingleProduct key={product._id} product={product} />
          ))
        : products.map((product) => (
            <SingleProduct key={product._id} product={product} />
          ))}
    </ProductsContainer>
  );
};

export default Products;
