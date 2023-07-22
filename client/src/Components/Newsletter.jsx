import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { Mobile } from "../Responsive/Responsive";

const NewsletterContainer = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fcf5f5;
`;
const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
`;
const Desc = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${Mobile({textAlign:"center"})}
`;
const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    ${Mobile({width:"80%"})}
`;
const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;

`;
const Button = styled.button`
    flex: 1;
    background-color: teal;
    color: white;
    border: none;
    cursor: pointer;
`;

const Newsletter = () => {
  return (
    <NewsletterContainer>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from favourite products</Desc>
      <InputContainer>
        <Input placeholder="Your Email" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </NewsletterContainer>
  );
};

export default Newsletter;
