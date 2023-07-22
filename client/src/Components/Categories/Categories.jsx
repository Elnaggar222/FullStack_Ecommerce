import styled from "styled-components";
import { AllCategories } from "../../data/Data";
import SingleCategory from "./SingleCategory";
import { Mobile } from "../../Responsive/Responsive";
import { Medium } from "../../Responsive/Responsive";

const CategoriesContainer = styled.div`
    display: flex;
    padding: 20px;
    ${Mobile({padding:"0px",flexDirection:"column"})}
    ${Medium({flexDirection:"column"})}
`;
const Categories = () => {
  return (
    <CategoriesContainer>
      {AllCategories.map((category) => (
        <SingleCategory category={category} key={category.id} />
      ))}
    </CategoriesContainer>
  );
};

export default Categories;
