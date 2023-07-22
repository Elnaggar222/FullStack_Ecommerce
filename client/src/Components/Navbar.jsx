import { Search } from "@mui/icons-material";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Mobile } from "../Responsive/Responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DeleteUser } from "../Store/User/UserActions";
import { toast } from "react-toastify";

const Container = styled.div`
  height: 60px;
  width: 100%;
  ${Mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  ${Mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
  ${Mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 0.5px solid lightgray;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  ${Mobile({ width: "50px" })}
`;
const Center = styled.div`
  flex: 1;
`;
const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  ${Mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${Mobile({ justifyContent: "center" })}
`;

const RightItem = styled.div`
  white-space: nowrap;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${Mobile({ marginLeft: "0px", marginRight: "25px", fontSize: "12px" })}
`;
const Button = styled.button`
  cursor: pointer;
  border: none;
  padding: 10px 20px;
  margin-left: 10px;
  color: white;
  background-color: #e51d1de6;
  border-radius: 8px;

  &:hover {
    background-color: #f50404e6;
  }
`;

const Navbar = () => {
  let products_count = useSelector((state) => state.cartState.products_count);
  const user = useSelector((state) => state.userState.currentUser);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(DeleteUser());
    toast.success("logout successful");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>LOGO</Logo>
        </Center>
        <Right>
          {!user && (
            <>
              <Link to="/login">
                <RightItem>LOG IN</RightItem>
              </Link>
              <Link to="/register">
                <RightItem>REGISTER</RightItem>
              </Link>
            </>
          )}
          {user && (
            <>
              <Link to="/cart">
                <RightItem>
                  <Badge
                    badgeContent={products_count.toString()}
                    color="primary"
                  >
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </RightItem>
              </Link>
              <Button onClick={handleClick}>logout</Button>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
