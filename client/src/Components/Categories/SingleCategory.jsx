import styled from "styled-components";
import { Mobile } from "../../Responsive/Responsive";
import { Link } from "react-router-dom";
const SingleCategoryContainer = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${Mobile({ height: "30vh" })}
`;
const InfoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  text-align: center;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const SingleCategory = ({ category }) => {
  return (
    <SingleCategoryContainer>
      <Link to={`/category/${category.cat}`}>
        <Image src={category.img} />
        <InfoContainer>
          <Title>{category.title}</Title>
          <Button>SHOP NOW</Button>
        </InfoContainer>
      </Link>
    </SingleCategoryContainer>
  );
};

export default SingleCategory;
