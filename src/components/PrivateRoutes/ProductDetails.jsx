import React, { use, useContext, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContex";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const { _id: productId } = useLoaderData();
  const bidModalRef = useRef(null);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("bids for this", data);
        setBids(Array.isArray(data) ? data : data.bids || []);
      });
  }, [productId]);

  const handleDeleteBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been removed.",
                icon: "success",
              });

              const remainingBids = bids.filter((bid) => bid._id !== _id);
              setBids(remainingBids);
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to delete the bid.",
                icon: "error",
              });
            }
          })
          .catch((err) => console.error("Error deleting bid:", err));
      }
    });
  };

  const handleBidSOpen = () => {
    bidModalRef.current.showModal();
  };
  const handleBidSubmit = (event) => {
    event.preventDefault();
    const name = event.target.buyer_name.value;
    const email = event.target.buyer_email.value;
    const bid = event.target.bid_price.value;
    console.log(name, email, bid, productId);
    const newBid = {
      buyer_name: name,
      buyer_email: email,
      bid_price: bid,
      product: productId,
      buyer_image: user?.photoURL,
      status: "pending",
    };
    // post bid to server
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire("Bid Place Successfully!");
          bidModalRef.current.close();
          event.target.reset();
        }

        // add bid to state
        newBid._id = data.insertedId;
        const newBids = [...bids, newBid];
        newBids.sort((a, b) => b.bid_price - a.bid_price);
        setBids(newBids);
      });
  };
  return (
    <div>
      {/* product info */}
      <div>
        <div></div>
        <div>
          <button onClick={handleBidSOpen} className="btn btn-primary">
            I want to buy this
          </button>

          {/* Modal */}
          <dialog
            ref={bidModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box max-w-xl">
              <h3 className="text-2xl font-semibold text-center">
                Give Seller Your Offered Price
              </h3>

              <form className="mt-6 space-y-4" onSubmit={handleBidSubmit}>
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="form-control">
                    <span className="label-text">Buyer Name</span>
                    <input
                      name="buyer_name"
                      type="text"
                      defaultValue={user.displayName}
                      className="input input-bordered"
                      required
                      readOnly
                    />
                  </label>

                  <label className="form-control">
                    <span className="label-text">Buyer Email</span>
                    <input
                      name="buyer_email"
                      type="email"
                      defaultValue={user.email}
                      className="input input-bordered"
                      required
                      readOnly
                    />
                  </label>
                </div>

                {/* Price */}
                <label className="form-control flex items-center gap-2">
                  <span className="label-text">Place your Price</span>
                  <input
                    name="bid_price"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="e.g. 12000"
                    className="input input-bordered"
                    required
                  />
                </label>

                {/* Actions */}
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => bidModalRef.current.close()}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Bid
                  </button>
                </div>
              </form>
            </div>

            {/* Clicking outside closes the modal */}
            <button
              onClick={() => bidModalRef.current.close()}
              className="modal-backdrop"
            >
              close
            </button>
          </dialog>
        </div>
      </div>
      {/* bids for this product */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Bids for this product:
          <span className="text-primary"> {bids.length}</span>
        </h2>
        {/* bids show */}

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {bid.buyer_email}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span>
                  </td>
                  <td>{bid.bid_price}</td>
                  <td>
                    {bid.status === "pending" ? (
                      <button className="btn btn-warning btn-xs">
                        {bid.status}
                      </button>
                    ) : (
                      <button className="btn btn-success btn-xs">
                        {bid.status}
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline btn-xs"
                      onClick={() => handleDeleteBid(bid._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
