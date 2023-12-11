"use client";
import { useState, useEffect, useContext } from "react";
import { formatter } from "../utils/helpers";
import ProductOptions from "./ProductOptions";
import { CartContext } from "../context/shopContext";
import axios from "axios";
import useSWR from "swr";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

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

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const itemToAdd = {
      ...selectedVariant,
      variantQuantity: quantity, // Use the local quantity state
    };

    addToCart(itemToAdd);
  };

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
      const checkAvailable = productInventory?.variants?.edges?.filter(
        (item) => item.node.id === selectedVariant.id
      );

      if (checkAvailable && checkAvailable[0]?.node.availableForSale) {
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
              {/* {product.title.split("-")[0]} */}
              {product.title}
            </h2>
          </div>
          <div className="bg-white/90 flex justify-center items-center border-l border-gray-800 border-b text-sm lg:text-base">
            <span className="tracking-tight px-4 py-1 md:py-2">
              {formatter.format(product.variants.edges[0].node.priceV2.amount)}
            </span>
          </div>
        </div>
        <div className="pt-3 pb-4 md:pb-8 px-4 lg:h-auto text-xs md:text-base">
          {/* <div className="hidden md:block"> */}
          {/* <Disclosure defaultOpen>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                    <span className="uppercase">Info</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-black`}
                    />
                  </Disclosure.Button> */}
          {/* {product.descriptionHtml ? (
              <div
                className="text-xs md:text-sm font-extralight lg:text-md tracking-tighter mb-6 leading-snug md:leading-normal"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              ></div>
            ) : null} */}

          {/* </>
              )}
            </Disclosure> */}
          {/* </div> */}
          <div className="">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                    <span className="uppercase">Details</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-black`}
                    />
                  </Disclosure.Button>

                  {product.descriptionHtml ? (
                    <Disclosure.Panel
                      className="text-xs md:text-sm font-extralight lg:text-md tracking-tighter mb-4 leading-snug md:leading-normal border-t-[0.5px] border-gray-300 pt-2"
                      dangerouslySetInnerHTML={{
                        __html: product.descriptionHtml,
                      }}
                    ></Disclosure.Panel>
                  ) : null}
                </>
              )}
            </Disclosure>
          </div>

          {/* <p className="text-xs md:text-sm font-extralight lg:text-md tracking-tighter mb-6 leading-snug md:leading-normal">
            {product.description}
          </p> */}
          <div className="flex items-center border border-gray-800">
            <button
              className="px-2 py-1 md:px-4 md:py-2 bg-white/90"
              onClick={handleDecrementQuantity}
            >
              -
            </button>
            <span className="px-2 py-1 md:px-4 md:py-2 border-gray-800 border-l border-r bg-white/90">
              {quantity}
            </span>
            <button
              className="px-2 py-1  md:px-4 md:py-2 bg-white/90"
              onClick={handleIncrementQuantity}
            >
              +
            </button>
            <button
              onClick={handleAddToCart}
              disabled={!available}
              className="flex-grow px-2 py-1 md:py-2 text-black uppercase font-light tracking-tight bg-white/90 border-l border-gray-800 text-xs md:text-base"
            >
              {available ? (
                <>
                  <span>Add To Cart</span>
                </>
              ) : (
                <span className="cursor-not-allowed">Sold out</span>
              )}
            </button>
          </div>
          {/* {!available && (
            <button className="px-2 py-1 md:py-3 mt-3 text-white bg-gray-800 rounded-lg cursor-not-allowed mb-4">
              Sold out!
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}
