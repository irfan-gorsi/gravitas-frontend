import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";

const BannerUploader = () => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loadingPrimary, setLoadingPrimary] = useState(false);

    const [secondaryFile, setSecondaryFile] = useState(null);
    const [secondaryImageUrl, setSecondaryImageUrl] = useState(null);
    const [loadingSecondary, setLoadingSecondary] = useState(false);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await axios.get("https://gravitas-backend.up.railway.app/banners");
            if (response.data.primaryBanner) {
                setImageUrl(`${response.data.primaryBanner}?t=${Date.now()}`);
            }
            if (response.data.secondaryBanner) {
                setSecondaryImageUrl(`${response.data.secondaryBanner}?t=${Date.now()}`);
            }
            console.log("Fetched Primary:", response.data.primaryBanner);
            console.log("Fetched Secondary:", response.data.secondaryBanner);
        } catch (error) {
            console.error("❌ Error fetching banners:", error.message);
        }
    };
    
    const handleFileChange = (event, setFileState) => {
        if (event.target.files.length > 0) {
            setFileState(event.target.files[0]);
        } else {
            console.warn("⚠️ No file selected!");
        }
    };

    const handleUpload = async (file, type, setLoading) => {
        if (!file) {
            console.error("❌ No file selected!");
            return;
        }

        const formData = new FormData();
        formData.append("bannerImage", file);
        formData.append("type", type);

        try {
            setLoading(true);
            await axios.post("https://gravitas-backend.up.railway.app/banners", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            fetchBanners();
        } catch (error) {
            console.error("❌ Upload Error:", error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (type, setImageState, setLoading) => {
        try {
            setLoading(true);
            await axios.delete("https://gravitas-backend.up.railway.app/banners", {
                data: { type },
            });

            setImageState(null);
        } catch (error) {
            console.error("❌ Delete Error:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-3">
            <h2>Upload Banners</h2>

            {/* Primary Banner */}
            <div>
                <h3>Primary Banner</h3>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFile)} />
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpload(file, "primary", setLoadingPrimary)}
                    disabled={loadingPrimary}
                >
                    {loadingPrimary ? <Spinner animation="border" size="sm" /> : "Upload"}
                </Button>
                {imageUrl && (
                    <div>
                        <img src={imageUrl} alt="Primary Banner" style={{ width: "300px", marginTop: "10px" }} />
                        <br />
                        <Button
                            className="my-4"
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete("primary", setImageUrl, setLoadingPrimary)}
                            disabled={loadingPrimary}
                        >
                            {loadingPrimary ? <Spinner animation="border" size="sm" /> : "Delete"}
                        </Button>
                    </div>
                )}
            </div>

            {/* Secondary Banner */}
            <div>
                <h3>Secondary Banner</h3>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setSecondaryFile)} />
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpload(secondaryFile, "secondary", setLoadingSecondary)}
                    disabled={loadingSecondary}
                >
                    {loadingSecondary ? <Spinner animation="border" size="sm" /> : "Upload"}
                </Button>
                {secondaryImageUrl && (
                    <div>
                        <img src={secondaryImageUrl} alt="Secondary Banner" style={{ width: "300px", marginTop: "10px" }} />
                        <br />
                        <Button
                            className="my-4"
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete("secondary", setSecondaryImageUrl, setLoadingSecondary)}
                            disabled={loadingSecondary}
                        >
                            {loadingSecondary ? <Spinner animation="border" size="sm" /> : "Delete"}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BannerUploader;
