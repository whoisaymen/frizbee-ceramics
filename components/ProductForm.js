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
    // <div className='bg-[#F0FFFD] from-[#B0AAEF]/30'>
    <div className="from-[#B0AAEF]/30 w-1/2 fixed top-[65%] left-[45%] border border-black">
      <div className=" border-t border-b border-black lg:border-none flex justify-between items-stretch">
        <div className="bg-gray-100 text-black flex-grow flex justify-start items-center">
          {/* <div className='bg-gradient-to-b from-[#AAEFB1] text-black flex-grow flex justify-center items-center'> */}
          <h2 className="p-2 px-4 leading-tight text-lg lg:text-2xl tracking-tighter font-bold">
            {product.title}
          </h2>
        </div>
        <div className="bg-white flex justify-center items-center border-l border-black lg:border-b">
          <span className="tracking-tight px-4 py-2">
            {formatter.format(product.variants.edges[0].node.priceV2.amount)}
          </span>
        </div>
      </div>

      <div className="py-8 px-4 bg-white">
        <p className="text-sm font-extralight lg:text-md tracking-tight mb-4">
          {product.description}
        </p>
        {available ? (
          <button
            onClick={() => {
              addToCart(selectedVariant);
            }}
            className="px-2 py-3 mt-3 text-black border-[1px] border-black uppercase font-light tracking-tight bg-white"
          >
            Add To Card
          </button>
        ) : (
          <button className="px-2 py-3 mt-3 text-white bg-gray-800 rounded-lg cursor-not-allowed mb-4">
            Sold out!
          </button>
        )}
      </div>
    </div>
  );
}
