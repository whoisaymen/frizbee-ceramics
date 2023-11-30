"use client";
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { CartContext } from "@/context/shopContext";

const ProductList = ({ products }) => {
  const { sortOption, sortProducts } = useContext(CartContext);
  const sortedProducts = sortProducts(products, sortOption);
  console.log(products);

  return (
    <motion.div
      className="mb-[30px] md:mb-[29px] md:mx-0 -mt-[2px]"
      style={{ backgroundImage: "url(/images/bgHomeGradient.svg)" }}
    >
      <div className="mx-auto">
        <AnimatePresence>
          <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 -mt-3">
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={product.node.id}
                product={product}
                // noRightBorder={(index + 1) % 4 === 0}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProductList;
