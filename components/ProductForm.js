"use client";
import { useState, useEffect, useContext } from "react";
import { formatter } from "../utils/helpers";
import ProductOptions from "./ProductOptions";
import { CartContext } from "../context/shopContext";
import axios from "axios";
import useSWR from "swr";

// setup inventory fetcher
const fetchInventory = (url, id) =>
  axios
    .get(url, {
      params: {
        id: id,
      },
    })
    .then((res) => res.data);

export default function ProductForm({ product }) {
  const { data: productInventory } = useSWR(
    `/api/available/${product.handle}`,
    (url, id) => fetchInventory(url, id),
    {
      errorRetryCount: 3,
    }
  );

  const [available, setAvailable] = useState(true);
  const [quantity, setQuantity] = useState(1); // Add a state to manage quantity

  const handleIncrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      ...selectedVariant,
      variantQuantity: quantity, // Use the local quantity state
    };
    addToCart(itemToAdd);
  };

  const { addToCart } = useContext(CartContext);

  const allVariantOptions = product.variants.edges?.map((variant) => {
    const allOptions = {};

    variant.node.selectedOptions.map((item) => {
      allOptions[item.name] = item.value;
    });

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.url,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: 1,
    };
  });

  const defaultValues = {};
  product.options.map((item) => {
    defaultValues[item.name] = item.values[0];
  });

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0]);
  const [selectedOptions, setSelectedOptions] = useState(defaultValues);

  function setOptions(name, value) {
    setSelectedOptions((prevState) => {
      return { ...prevState, [name]: value };
    });

    const selection = {
      ...selectedOptions,
      [name]: value,
    };

    allVariantOptions.map((item) => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item);
      }
    });
  }

  useEffect(() => {
    if (productInventory) {
      const checkAvailable = productInventory?.variants.edges.filter(
        (item) => item.node.id === selectedVariant.id
      );

      if (checkAvailable[0]?.node.availableForSale) {
        setAvailable(true);
      } else {
        setAvailable(false);
      }
    }
  }, [productInventory, selectedVariant]);

  return (
    <div className="from-[#B0AAEF]/30 bg-[#fff]/80 w-[69vw] left-14 lg:left-auto bottom-[70px] lg:min-w-[450px]  lg:w-1/4  fixed md:bottom-[29px] md:right-1/4 border border-gray-800">
      <div className="relative">
        <button className="swiper-button-prev"></button>
        <button className="swiper-button-next"></button>
        <div className="lg:border-none flex justify-between items-stretch">
          <div className="text-black flex-grow flex justify-start items-center">
            {/* <div className='bg-gradient-to-b from-[#AAEFB1] text-black flex-grow flex justify-center items-center'> */}
            <h2 className="p-1 md:p-2 px-4 leading-tight text-md md:text-lg lg:text-2xl tracking-tighter font-bold">
              {product.title.split("-")[0]}
            </h2>
          </div>
          <div className="bg-white flex justify-center items-center border-l border-gray-800 border-b text-sm lg:text-base">
            <span className="tracking-tight px-4 py-1 md:py-2">
              {formatter.format(product.variants.edges[0].node.priceV2.amount)}
            </span>
          </div>
        </div>
        <div className="pt-3 pb-4 md:pb-8 px-4 lg:h-auto text-xs md:text-base">
          <p className="text-xs md:text-sm font-extralight lg:text-md tracking-tighter mb-6 leading-snug md:leading-normal">
            {product.description}
          </p>
          <div className="flex items-center border border-gray-800">
            <button
              className="px-2 py-1 md:px-4 md:py-2 bg-white"
              onClick={handleDecrementQuantity}
            >
              -
            </button>
            <span className="px-2 py-1 md:px-4 md:py-2 border-gray-800 border-l border-r">
              {quantity}
            </span>
            <button
              className="px-2 py-1  md:px-4 md:py-2 bg-white"
              onClick={handleIncrementQuantity}
            >
              +
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-grow px-2 py-1 md:py-2 text-black uppercase font-light tracking-tight bg-white border-l border-gray-800 text-xs md:text-base"
            >
              <span className="hidden md:inline-block">Add To Cart</span>

              <span className="md:hidden">Add</span>
            </button>
          </div>
          {!available && (
            <button className="px-2 py-1 md:py-3 mt-3 text-white bg-gray-800 rounded-lg cursor-not-allowed mb-4">
              Sold out!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
