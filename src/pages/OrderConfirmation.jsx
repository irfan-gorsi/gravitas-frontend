import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`https://gravitas-backend.up.railway.app/orders/${orderId}`);
        console.log("Order Data:", response.data);  // ✅ Log the API response
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrder();
  }, [orderId]);
  
  if (loading) return <h2>Loading order details...</h2>;
  if (!order) return <h2>Order not found!</h2>;

  return (
    <div className="mx-5 my-5">
      <h1>🎉 Order Confirmed!</h1>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Total Price:</strong> ${order.totalPrice}</p>
      <p><strong>Payment Status:</strong> {order?.payment?.isPaid ? "Paid" : "Not Paid"}</p>

      <h2>Products Ordered:</h2>
      {order?.products?.length > 0 ? (
 <ul>
 {order.products.map((product) => (
   <li key={product.productId} style={{ marginTop:"15px",
   display: "flex", flexDirection: "column", alignItems: "start" }}>
     {product.images?.length > 0 ? (
       <img 
       src={`http://localhost:8000/uploads/${product.images[0]}`}
       alt={product.name} 
         onError={(e) => (e.target.src = "https://placehold.co/100")} //  Use a reliable placeholder
         style={{ width: "80px", height: "80px", objectFit: "contain", borderRadius: "8px" }}
       />
     ) : (
       <img 
         src="https://placehold.co/100" //  Show placeholder if no image exists
         alt="Placeholder"
         style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
       />
     )}
     <p>{product.name} - ${product.price} x {product.quantity}</p>
   </li>
 ))}
</ul>



) : (
  <p>No products found</p>
)}
  <Link to="/home" style={{ display: "inline-block", marginTop: "20px" }}>
        <button style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          🛒 Continue Shopping
        </button>
      </Link>

    </div>
  );
};


export default OrderConfirmation;
