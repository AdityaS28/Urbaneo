import React, { useEffect, useState } from 'react'
import Cartitem from '../components/Cartitem'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from 'react-redux';

const Cart = () => {
  const productData  = useSelector((state) => state.urbaneo.productData);
  const userInfo = useSelector((state) => state.urbaneo.userInfo)
  const [totalAmt, setTotalAmt] = useState("");
  const [payNow, setPayNow] = useState(false)

  useEffect(()=>{
    let price = 0;
    productData.map((item)=>{
      price += item.price * item.quantity;
      return price
    })
    setTotalAmt(price.toFixed(2)); 
    
  },[productData])
  const handleCheckout=()=>{
    if(userInfo){
      setPayNow(true)
    }else{
      toast.error("Please sign in to Checkout")
    }
  }

  return (
    <div>
      <img 
        className='w-full h-60 object-cover'
        src='https://images.unsplash.com/photo-1611794485509-701be5a5d4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2NlYW4lMjBibHVlfGVufDB8fDB8fHww&w=1000&q=80'
        alt='cartImg'
      />
      <div className='max-w-screen-xl mx-auto py-20 flex'>
        <Cartitem />
        <div className='w-1/3 bg-[#fafafa] py-6 px-4'>
          <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
            <h2 className='text-2xl font-medium'>cart totals</h2>
            <p className='flex items-center gap-4 text-base'>
              Subtotal{" "}
              <span className='font-titleFont font-bold text-lg'>
              $ {totalAmt}
              </span>
            </p>
            <p className='flex items-start gap-4 text-base'>
              Shipping{" "}
              <span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, veritatis.
              </span>
            </p>
          </div>
          <p className='font-titleFont font-semibold flex justify-between mt-6'>
            Total <span className='text-xl font-bold'>$ {totalAmt}</span>
          </p>
          <button onClick={handleCheckout} className='text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300'>proceed to checkout</button>
        </div>
      </div>
      <ToastContainer 
        position='top-left'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        />
    </div>
  )
}

export default Cart