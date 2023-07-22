import styled from "styled-components";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useState } from "react";
import { sliderItems } from "../../data/Data";
import SingleSlider from "./SingleSlider";
import { Mobile } from "../../Responsive/Responsive";


const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  ${Mobile({display:"none"})}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  opacity: 0.5;
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${(props) => props.sliderIndex * -100}%);
  transition: all 1.5s ease;
`;
const Slider = () => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const moveSlider = (direction) => {
    if (direction === "left") {
      setSliderIndex(sliderIndex > 0 ? sliderIndex - 1 : 2);
    } else {
      setSliderIndex(sliderIndex < 2 ? sliderIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => moveSlider("left")}>
        <ArrowLeftIcon />
      </Arrow>
      <Wrapper sliderIndex={sliderIndex}>
        {sliderItems.map((item) => (
          <SingleSlider item={item} key={item.id} />
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => moveSlider("right")}>
        <ArrowRightIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
