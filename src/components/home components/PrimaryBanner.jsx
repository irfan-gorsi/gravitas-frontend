import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/PrimaryBanner.css"; 

const PrimaryBanner = () => {
  const [bannerUrl, setBannerUrl] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get("https://gravitas-backend.up.railway.app/banners");
        if (response.data.primaryBanner) {
          setBannerUrl(`${response.data.primaryBanner}?t=${Date.now()}`); // Prevent cache issues
        }
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };
    fetchBanner();
  }, []);

  return (
    <div className="banner-container">
      {bannerUrl ? (
        <img src={bannerUrl} alt="Primary Banner" className="banner-image" />
      ) : (
        <p className="no-banner">No banner available</p>
      )}
    </div>
  );
};

export default PrimaryBanner;
