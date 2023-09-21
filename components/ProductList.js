"use client";
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { CartContext } from "@/context/shopContext";

const ProductList = ({ products }) => {
  const { sortOption, sortProducts } = useContext(CartContext);
  const sortedProducts = sortProducts(products, sortOption);

  return (
    <motion.div className="bg-white pt-1">
      <div className="mx-auto max-w-7xl">
        <AnimatePresence>
          <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={product.node.id}
                product={product}
                noRightBorder={(index + 1) % 4 === 0}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProductList;
