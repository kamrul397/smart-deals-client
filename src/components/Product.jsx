import React from "react";
import { Link } from "react-router";

const Product = ({ product }) => {
  const { _id, image, title, email, price_max, price_min, description } =
    product;
  console.log(product);
  return (
    <div className="card bg-base-100  shadow-sm">
      <figure className="px-10 pt-10">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>
          Price: ${price_max} - {price_min}
        </p>
        <div className="card-actions w-full justify-center">
          <Link
            to={`/productDetails/${_id}`}
            className="btn btn-primary btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
