import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Success = () => {
    const location = useLocation()
    console.log(location.state)
    const data = location.state.stripeData
    const cart = location.state.products
    const [orderId, setOrderId] = useState(null)
    const currentUser = useSelector((state) => state.user.currentUser)


    const history = useNavigate()
    useEffect(() => {
        const createOrder = async () => {
            console.log(userRequest)

                try {
                    const res = await userRequest.post("/orders", {
                        userId: currentUser._id,
                        products: cart.products.map((item) => ({
                            productId: item._id,
                            quantity: item._quantity,
                        })),
                        amount: cart.total,
                        address: data.billing_details.address,
                        cart: cart.products,
                    })
                    setOrderId(res.data._id)
                } catch (error) {
                    console.log(error)
                }
        }
        data && createOrder();
    }, [cart, data, currentUser])
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
            {orderId ? `Order Has Been Created Successfully. your order number is ${orderId}`: `Login Or Creat and account First`}
            <button onClick={() => history('/')} style={{ padding: 10, marginTop: 20 }}>Go HomePage</button>
        </div>
    );
};

export default Success
