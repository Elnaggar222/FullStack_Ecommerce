import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import Products from "../Components/Products/Products";
import styled from "styled-components";
import { Mobile } from "../Responsive/Responsive";
import { Medium } from "../Responsive/Responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${Mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })}
  white-space: nowrap;
  /* ${Medium({ display: "flex", flexDirection: "column" })} */
`;
const FilterText = styled.span`
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${Mobile({ marginRight: "0px" })}
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border: 0.5px solid lightgray;
  ${Mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const CategoryProducts = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option defaultValue disabled>
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>green</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option defaultValue disabled>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest" defaultValue>
              Newest
            </Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default CategoryProducts;
