import React, { use } from "react";
import Product from "./Product";

const LatestProducts = ({ latestProductsPromise }) => {
  const latestProducts = use(latestProductsPromise);
  console.log(latestProducts);
  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">
          Latest <span className="text-primary">Products</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestProducts;
