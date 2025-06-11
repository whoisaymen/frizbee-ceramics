"use client";
import { useState, useEffect, useContext } from "react";
import { formatter } from "../utils/helpers";
// import ProductOptions from "./ProductOptions";
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
      compareAtPrice: variant.node.compareAtPriceV2?.amount,
      isAvailableForSale: variant.node.availableForSale,
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

  const price = parseFloat(product.variants.edges[0].node.priceV2?.amount);
  const compareAtPrice = parseFloat(
    product.variants.edges[0].node.compareAtPriceV2?.amount
  );
  const isAvailableForSale = product.variants.edges[0].node.availableForSale;

  // const [detailsOpen, setDetailsOpen] = useState(true);

  const capacity = product.metafields.find((m) => m?.key === "capacity")?.value;
  const height = product.metafields.find((m) => m?.key === "height")?.value;
  const diameter = product.metafields.find((m) => m?.key === "diameter")?.value;

  return (
    <>
      <div className="from-[#B0AAEF]/30 bg-[#fff]/80 md:w-full">
        {/* Title and Price */}
        <div className="flex justify-between items-start">
          <div className="font-bold text-md md:text-[18px] leading-[1.25] p-2 tracking-tighter">
            <h2>{product.title}</h2>
          </div>
          <div className="font-medium text-sm lg:text-base border-l border-black border-b py-4 px-2">
            {formatter.format(price)}
          </div>
        </div>

        {/* Specs */}
        {/* <div className="space-y-1 mb-4"> */}
        <div className="p-2">
          {capacity && (
            <div className="flex font-medium text-[10px] md:text-[12px]">
              <span className="min-w-[90px]">CAPACITY:</span>
              <span>{capacity}</span>
            </div>
          )}
          {height && (
            <div className="flex font-medium text-[10px] md:text-[12px]">
              <span className="min-w-[90px] font-medium">HEIGHT:</span>
              <span>{height}</span>
            </div>
          )}
          {diameter && (
            <div className="flex font-medium text-[10px] md:text-[12px]">
              <span className="min-w-[90px] font-medium">DIAMETER:</span>
              <span>{diameter}</span>
            </div>
          )}
          <div className="flex font-medium text-[10px] md:text-[12px]">
            <span className="min-w-[90px] font-medium">DETAILS:</span>
            <div className="text-[10px] md:text-[12px] max-h-[120px] overflow-y-auto ">
              {product.descriptionHtml && (
                <div
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              )}
            </div>
          </div>
        </div>

        {/* cart and quantity desktop */}
        <div className="hidden lg:block p-4">
          {/* Quantity + Add to Cart */}
          <div className="flex border border-black divide-x divide-black text-center h-[30px] md:h-[42px] text-[12px]">
            <button
              onClick={handleDecrementQuantity}
              className="w-10 font-bold"
            >
              –
            </button>
            <div className="w-10 flex items-center justify-center">
              {quantity}
            </div>
            <button
              onClick={handleIncrementQuantity}
              className="w-10 font-bold"
            >
              +
            </button>
            <button
              onClick={handleAddToCart}
              disabled={!isAvailableForSale}
              className={`flex-1 uppercase tracking-wide font-medium ${
                isAvailableForSale
                  ? "bg-white"
                  : "bg-white text-gray-400 cursor-not-allowed"
              }`}
            >
              {isAvailableForSale ? "Add to Cart" : "Sold Out"}
            </button>
          </div>
        </div>
        {/* cart and quantity mobile */}
        <div className="lg:hidden pt-2 pb-2 md:pb-8 px-4 lg:h-auto text-xs md:text-base">
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
              disabled={!isAvailableForSale}
              className="flex-grow px-2 py-1 md:py-2 text-black uppercase font-light tracking-tight bg-white/90 border-l border-gray-800 text-xs md:text-base"
            >
              {isAvailableForSale ? (
                <>
                  <span>Add To Cart</span>
                </>
              ) : (
                <span className="cursor-not-allowed">Sold out</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
