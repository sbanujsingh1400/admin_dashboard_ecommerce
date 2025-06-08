import { useNewOrderMutation } from "@/redux/api/orderApi";
import { resetCart } from "@/redux/reducer/cartReducer";
import { NewOrderRequest } from "@/redux/types/api-types";
import { responseToast } from "@/utils/features";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const CheckOutForm=()=>{
const [isProcessing,setIsProcessing]= useState<boolean>(false);
const { user } = useSelector((state: any) => state.userReducer);
const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state: any) => state.cartReducer);
  const dispatch = useDispatch()
const stripe= useStripe();
const elements = useElements()
const navigate = useNavigate()
const [newOrder] = useNewOrderMutation();

const submitHandler = async(e:FormEvent<HTMLFormElement>)=>{
e.preventDefault();

if(!stripe || !elements)return;
setIsProcessing(true);

const {paymentIntent,error} =await stripe.confirmPayment({
    elements,
    confirmParams:{return_url:window.location.origin},
    redirect:"if_required"
})

if(error){
     setIsProcessing(false)
    toast.error(error.message ||'Something went Wrong');}

if(paymentIntent?.status==='succeeded'){
    // console.log("placing Order");
    // navigate('/orders');
    setIsProcessing(false)
    const orderData: NewOrderRequest = {
        shippingInfo,
        orderItems: cartItems,
        subtotal,
        tax,
        discount,
        shippingCharges,
        total,
        user: user?._id!,
      };

      const res=await newOrder(orderData);
      dispatch(resetCart());
      responseToast(res,navigate,'/orders')
}


}

    return <div className="checkout-container w-auto flex justify-center">
        <form onSubmit={submitHandler}>
            <PaymentElement/>
            <button className="w-full bg-blue-400 p-4 rounded-[5px] mt-1" >{isProcessing?"processing...":"Pay"}</button>
        </form>
    </div>
}

const stripePromise = loadStripe('pk_test_51RXP62DAli6Xc2QPUVSfzuJvGSAXELuImvOxTgfzvielZtLBnoVeTCi3LbYACGegj2X2aIznwzgSep4AVrpfmcg6000ixkKzAU');


const Checkout = () => {

    const location = useLocation();
    const clientSecret:string| undefined = location.state

  return (
    <Elements options={{clientSecret:clientSecret}} stripe={stripePromise} >
        <CheckOutForm />
    </Elements>
  )
}

export default Checkout