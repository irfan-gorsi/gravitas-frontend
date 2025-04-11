import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/SecondaryBanner.css"; 

const SecondaryBanner = () => {
  const [bannerUrl, setBannerUrl] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get("https://gravitas-backend.up.railway.app/banners");
        if (response.data.secondaryBanner) {
          setBannerUrl(`${response.data.secondaryBanner}?t=${Date.now()}`);
        }
      } catch (error) {
        console.error("Error fetching secondary banner:", error);
      }
    };
    fetchBanner();
  }, []);

  return (
    <div className="secondary-banner">
      {bannerUrl ? (
        <img src={bannerUrl} alt="Secondary Banner" className="secondary-banner-img " />
        
      ) : (
        <p className="no-banner">No secondary banner available</p>
      )}
    </div>
  );
};

export default SecondaryBanner;
