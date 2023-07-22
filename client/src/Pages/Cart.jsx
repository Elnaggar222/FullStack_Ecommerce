import styled from "styled-components";
import Announcement from "../Components/Announcement";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Mobile } from "../Responsive/Responsive";
import { Medium } from "../Responsive/Responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import { userRequest } from "../axiosRequests/RequestMethods";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../Store/Cart/CartActions";
import { toast } from "react-toastify";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${Mobile({ padding: "10px" })}
`;
const MainTitle = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  ${Mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const ButtomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${Mobile({ flexDirection: "column" })}
  ${Medium({ flexDirection: "column" })}
`;
const InfoContainer = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  ${Mobile({ flexDirection: "column" })}
`;
const ProductDetailContainer = styled.div`
  flex: 2;
  display: flex;
  gap: 20px;
`;
const Image = styled.img`
  width: 200px;
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.bg};
`;
const ProductSize = styled.span``;
const PriceDetailContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const Amount = styled.span`
  font-size: 24px;
  margin: 5px;
  ${Mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${Mobile({ marginBottom: "20px" })}
`;
const HR = styled.hr`
  border: none;
  background-color: #eee;
  height: 1px;
`;
const SummaryContainer = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  margin-left: 9px;
  ${Medium({
    marginLeft: "50%",
    width: "65%",
    transform: "translateX(-50%)",
    marginTop: "20px",
  })}
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
  font-weight: ${(props) => props.type === "total" && 500};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;
const ClearChart = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #e51d1de6;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border: none;
  margin-top: 30px;
  cursor: pointer;
`;

const KEY =
  "pk_test_51N7fvkDCmwRA9i55z12y2bQ9mOzx8MND3xcnsAfuhqj7M2M2rNMTaLdsVxLQ9YbSq4tSs6CaxFEph6Ux3V1aDr2W00I6iQIaS7";

const Cart = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  let cart = useSelector((state) => state.cartState);
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total_price,
        });
        if (res.status === 200) {
          navigate("/success", {
            state: {
              stripeData: res.data,
              cart: cart,
            },
          });
          dispatch(clearCart());
        }
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart, navigate,dispatch]);

  const handleClick = () => {
    dispatch(clearCart());
    toast.success("Cart Cleared");
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <MainTitle>YOUR BAG</MainTitle>
        <TopContainer>
          <TopButton onClick={() => navigate("/")}>CONTINUE SHIPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag ({cart.products_count})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </TopContainer>
        <ButtomContainer>
          <InfoContainer>
            {cart.products.map((product) => (
              <>
                <Product key={product._id}>
                  <ProductDetailContainer>
                    <Image src={product.img} />
                    <DetailsContainer>
                      <ProductName>
                        <b>Product:</b>
                        {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor bg={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </DetailsContainer>
                  </ProductDetailContainer>
                  <PriceDetailContainer>
                    <AmountContainer>
                      <Amount> {product.quantity} </Amount>
                    </AmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetailContainer>
                </Product>
                <HR />
              </>
            ))}
          </InfoContainer>
          <SummaryContainer>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total_price}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total_price}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Clothing Shop"
              image="https://img.freepik.com/premium-vector/tshirt-online-shop-symbol-icon-phone-shop-logo-symbol-icon_657888-6.jpg?w=2000"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total_price}`}
              amount={cart.total_price * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <SummaryButton disabled={!cart.total_price}>
                CHECKOUT NOW
              </SummaryButton>
            </StripeCheckout>
            <ClearChart onClick={handleClick}> Clear Chart</ClearChart>
          </SummaryContainer>
        </ButtomContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
