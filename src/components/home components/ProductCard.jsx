import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/ProductCard.css"; 

const ProductCard = ({ product }) => {
  return (
    <div className="product-card-container">
      <Link to={`/product/${product._id}`} className="card-link">
        <Card className="product-card">
          <Card.Img
            className="product-card-img"
            src={`https://gravitas-backend.up.railway.app/uploads/${product.images?.[0]}`}
            style={{
              width: '100%',           // Ensures the image takes up the full width of the card
              height: '100%',          // Ensures the image takes up the full height of the card
              objectFit: 'cover',      // Ensures the image covers the full space without stretching
              objectPosition: 'center',// Ensures the center of the image is focused when cropped
            }}            alt={product.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder.png";
            }}
          />
        </Card>
        <div className="product-info">
          <h3 className="product-name">{product.name.toUpperCase()}</h3>
          <span className="card-product-price">${product.price.toFixed(2)}</span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;