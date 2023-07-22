import styled from "styled-components";
import { Medium } from "../../Responsive/Responsive";

const Slide = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content:space-evenly;
  background-color: ${(props) => props.bg};
  flex-shrink: 0;
`;
const ImgContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  height: 80%;
`;
const InfoContainer = styled.div`
  padding: 50px;
`;
const Title = styled.h1`
  font-size: 70px;
  ${Medium({fontSize:"35px"})}
`;
const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  ${Medium({fontSize:"20px"})}
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background: transparent;
  border: 2px solid black;
  cursor: pointer;
  ${Medium({fontSize:"20px"})}
`;

const SingleSlider = ({item}) => {
  return (
    <Slide bg={item.bg}>
      <ImgContainer>
        <Image src={item.img} />
      </ImgContainer>
      <InfoContainer>
        <Title>{item.title}</Title>
        <Desc>{item.desc}</Desc>
        <Button>SHOW NOW</Button>
      </InfoContainer>
    </Slide>
  );
};

export default SingleSlider;
