import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import { Add, Remove } from "@mui/icons-material";
import { Medium, Mobile, MedLarge } from "../Responsive/Responsive";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { publicRequest } from "../axiosRequests/RequestMethods";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../Store/Cart/CartActions";
import { toast } from "react-toastify";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${Mobile({ padding: "10px", flexDirection: "column" })}
  ${Medium({ padding: "15px" })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${Mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${Mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-size: 40px;
  font-weight: 100;
`;
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  margin: 30px 0px;
  ${Mobile({ width: "100%" })}
  ${Medium({ width: "100%" })}
  ${MedLarge({ width: "70%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.bg};
  margin: 0px 5px;
  cursor: pointer;
`;
const SizeSelector = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const SizeOption = styled.option``;
const AddContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  align-items: center;
  ${Mobile({ width: "100%" })}
  ${Medium({ width: "100%" })}
  ${MedLarge({ width: "70%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const SingleProductPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/findProduct/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const addToCart = () => {
    dispatch(addProduct({...product,quantity,size,color}));
    toast.success("Added To Cart");
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor bg={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <SizeSelector onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <SizeOption key={s}>{s}</SizeOption>
                ))}
              </SizeSelector>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                style={{ cursor: "pointer" }}
                onClick={() => handleQuantity("dec")}
              />
              <Amount>{quantity}</Amount>
              <Add
                style={{ cursor: "pointer" }}
                onClick={() => handleQuantity("inc")}
              />
            </AmountContainer>
            <Button onClick={addToCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default SingleProductPage;
