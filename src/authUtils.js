import { jwtDecode } from "jwt-decode"; // ✅ Correct

// Function to get user role from token
export const getUserRole = () => {
    const token = document.cookie
        .split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1];

    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.role; // Assuming JWT contains { role: "admin" }
    } catch (error) {
        console.error("Failed to decode token", error);
        return null;
    }
};
