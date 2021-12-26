import React, {useState} from "react";
import ImageHelper from "./helper/imageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper";




const Card = ({
  product,
  addtoCart = true,
  removeFromCart = true,
  reload = undefined,
  setReload = f =>f,
  //function(f) {returnf}
}) => {
  const [redirect, setRedirect] = useState(false)

  const cartTitle = product ? product.name : "a photo from pexels"
  const cartDescription = product ? product.description : "default description"
  const cartPrice = product ? product.price : "default price"

  const addToCart = () => {
    if (isAuthenticated()) {
      addItemToCart(product, ()=> setRedirect(true));
      console.log("Added to cart");
    } else { 
      console.log("login please!");
      }
  };

  const getAredirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return(
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2">
          Add to Cart
          </button>
      )
    );
  };


  const showRemoveFromCaart = removeFromCart => {
    return(
      removeFromCart && (
        <button
          onClick={() => {
            //todo
            removeItemFromCart(product.id)
            setReload(!reload)
            console.log("product removed from cart")
          }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
      )
    )
  }


  return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">
        {getAredirect(redirect)}
          <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {cartDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">{cartPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(addToCart)}
            </div>
            <div className="col-12">
            {showRemoveFromCaart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };


  export default Card;