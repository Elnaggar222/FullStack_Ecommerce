import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../axiosRequests/RequestMethods";

const Success = () => {
  const location = useLocation();
  const stripeData = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.userState.currentUser);
  const [orderId, setOrderId] = useState(null);
  
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders/createOrder", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total_price,
          address: stripeData.billing_details.address,
        });
        // setOrderId(res.data._id);
        console.log(res.data)
      } catch {}
    };
    stripeData && createOrder();
  }, [cart, stripeData, currentUser]);

  return (
    // <div
    //   style={{
    //     height: "100vh",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >
    //   {orderId
    //     ? `Order has been created successfully. Your order number is ${orderId}`
    //     : `Successfull. Your order is being prepared...`}
    //   <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
    // </div>
    <div>success</div>
  );
};

export default Success;