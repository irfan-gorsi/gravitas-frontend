import React, { useContext } from "react";
import { CartContext } from "../context/CartContext"; 
import { Table, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext); 

  // Calculate Total Price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Size</th>
                <th>Color</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>

                  {/*  Display Product Image */}
                  <td>
                    <Image
                      src={`https://gravitas-backend.up.railway.app/uploads/${item.image}`}
                      alt={item.name}
                      thumbnail
                      className="cart-item-image"
                    />
                  </td>

                  <td>{item.size}</td>
                  <td>{item.color}</td>
                  <td>${item.price.toFixed(2)}</td>

                  {/*  Quantity Controls */}
                  <td>
                    <div className="quantity-controls d-flex align-items-center">
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() =>
                          updateCartQuantity(
                            item.id,
                            item.size,
                            item.color,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1} // Prevents going below 1
                      >
                        −
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() =>
                          updateCartQuantity(
                            item.id,
                            item.size,
                            item.color,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </Button>
                    </div>
                  </td>

                  <td>
                    <Button className="remove-btn"
                      variant="danger"
                      onClick={() =>
                        removeFromCart(item.id, item.size, item.color)
                      }
                    >
                      X
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/*  Display Total Price */}
          <div className="total-price">
            <h4>
              Total Price:{" "}
              <span className="text-success">${totalPrice.toFixed(2)}</span>
            </h4>
          </div>

          {/* Checkout Button */}
          <Link to="/checkout">
            <Button variant="primary" className="mt-3 mx-2">Proceed to Checkout</Button>
          </Link>
        </>
      )}

      {/* Back to Shopping */}
      <Link to="/home">
        <Button variant="outline-dark" className="mt-3">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};

export default CartPage;
