import React, { useEffect, useState } from "react";
import { PRODUCTS } from "./product";
import cart from "./assets/products/carts.png";
import top from "./assets/products/6.jpg.webp";

const fromLocalStorage = JSON.parse(localStorage.getItem('products'))

function Home() {
    if(!localStorage.getItem('products')){
        localStorage.setItem('products', JSON.stringify({1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0}))
    }
     
    const [cartItems, setCartItems] = useState(fromLocalStorage)
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(cartItems))
    }, [cartItems])
    
    const addToCart = (id) => {
        setCartItems(cartItems => ({...cartItems, [id]: cartItems[id] + 1}))
    }
    const delFromCart = (id) => {
        setCartItems(cartItems => ({...cartItems, [id]: cartItems[id] - 1}))
    }
    const removeFromCart = (id) => {
        setCartItems(cartItems => ({...cartItems, [id]: cartItems[id] = 0}))
    }
    const totalAmount = () => {
        let amount = 0;
        for (const key in cartItems){
            if(cartItems[key] > 0){
                let productInfo = PRODUCTS.find(product => product.id === Number(key))
                amount += Math.floor(cartItems[key] * productInfo.price)
            }
        }
        return amount;
    }

    return (
        <div className="bg-[#1E1F23] p-10 pt-20 pb-60">
            <div className="flex items-center pb-20 pl-5">
                <div>
                    <img className="w-3/4" src={top} alt="" />
                </div>
                <div className="text-white w-3/4 ml-[-7rem] bg-[#151618] px-20 py-20 sm:py-[2rem] md:py-[4rem] lg:py-[6.8rem] xl:py-[7.5rem]">
                    <div className="flex flex-col">
                        <span className="text-[#F2CD4A]">COMPACT CAMERAS</span>
                        <span className="text-2xl">Olympus OM-D E-M1</span>
                        <p className="text-sm pb-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta earum asperiores adipisci neque placeat pariatur</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text-[#F2CD4A] text-xl pr-8">Rp. 27899000</p>
                        <button onClick={() => addToCart(8)} className="bg-[#F2CD4A] text-black text-xs font-bold px-6 py-3 rounded hover:bg-yellow-200">ADD TO CART</button>

                    </div>
                </div>
            </div>

            <div className="bg-[#1E1F23] flex flex-wrap justify-center items-center gap-20">
                {PRODUCTS.map(product => (
                    <div key={product.id} className="ml-10 mr-10 text-white w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/5">
                        <img className="w-40 h-40 object-contain" src={product.productImage} alt={product.productName} />
                        <p>{product.productName}</p>
                        <p className="text-[#F2CD4A] pb-3">Rp. {product.price}</p>
                        <button onClick={() => addToCart(product.id)} className="bg-[#F2CD4A] text-black text-xs font-bold px-4 py-2 rounded hover:bg-yellow-200">ADD TO CART</button>
                    </div>
                ))}

                <div className="absolute right-10 top-2 cursor-pointer">
                    <img className="w-12 h-12" onClick={() => setIsCartOpen(!isCartOpen)} src={cart} alt="cart" />
                </div>

                {isCartOpen && (
                    <div className="fixed p-4 right-0 top-0 bg-yellow-100 h-screen w-80 overflow-y-scroll">
                        <span onClick={() => setIsCartOpen(!isCartOpen)} className="fixed right-0 top-0 p-5 font-bold text-xl cursor-pointer">X</span>
                        <span className="font-bold text-2xl">Your Cart</span><br />
                        <span className="text-2xl font-bold">Total : Rp.{totalAmount()}</span>
                        {PRODUCTS.map(product => {
                            if(cartItems[product.id] > 0){
                                return <>
                                    <div className="pt-5 flex justify-between items-center">
                                        <div className="flex items-center pt-3">
                                            <img className="w-20 h-20 my-4" src={product.productImage} alt="" />
                                            X <p className="text-2xl font-bold pl-2">{cartItems[product.id]}</p>
                                        </div>
                                        <div className="flex flex-row gap-2 font-bold">
                                            <button onClick={() => removeFromCart(product.id)} className="text-red-400 bg-black hover:bg-red-500 hover:text-white py-2 px-4 rounded text-xs">Remove</button>
                                            <button onClick={() => addToCart(product.id)} className="text-blacktext-2xl hover:text-green-700">+</button>
                                            <button onClick={() => delFromCart(product.id)} className="text-red-500 text-2xl hover:text-red-700">-</button>
                                        </div>
                                    </div>
                                    <div className="flex item-center space-x-4 italic">
                                        <p>{product.productName}</p>
                                        <p>-</p>
                                        <p>Rp.{product.price}</p>
                                    </div>
                                </>
                            }
                        })}
                    </div>
                )} 
            </div>

        </div>
    )
}

export default Home;