import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";

const IconsContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease;
  cursor: pointer;
`;

const SingleProductContainer = styled.div`
  flex: 1;
  min-width: 300px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #f5fbfd;
  margin: 5px;

  &:hover ${IconsContainer} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  background-color: white;
`;
const Image = styled.img`
  height: 75%;
  width: 240px;
  object-fit: contain;
  z-index: 2;
`;
const SingleIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const SingleProduct = ({ product }) => {
  return (
    <SingleProductContainer>
      <Circle />
      <Image src={product.img} />
      <IconsContainer>
        <SingleIcon>
          <Link to="/cart">
            <ShoppingCartOutlinedIcon />
          </Link>
        </SingleIcon>
        <SingleIcon>
          <Link to={`/product/${product._id}`}>
            <SearchOutlinedIcon />
          </Link>
        </SingleIcon>
        <SingleIcon>
          <FavoriteBorderOutlinedIcon />
        </SingleIcon>
      </IconsContainer>
    </SingleProductContainer>
  );
};

export default SingleProduct;
