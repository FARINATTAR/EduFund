import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function VerifyOtp() {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || localStorage.getItem("pendingEmail");
    const redirect = new URLSearchParams(location.search).get('redirect') || '/login';

const API_URL = "http://localhost:5000"; // 👈 Use your local MySQL+Express backend

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Please enter the OTP");

    setLoading(true);
    try {
        console.log("Sending to backend:", { email, otp }); // ✅ log to debug

        const response = await fetch(`${API_URL}/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp }),
        });

        const result = await response.json();

        if (result.success) {
            toast.success("Verification successful! Please login.");
            setTimeout(() => navigate(`/login?redirect=${redirect}`), 2000);
        } else {
            toast.error(result.message || "Invalid OTP");
        }
    } catch (err) {
        toast.error("Something went wrong. Try again.");
    } finally {
        setLoading(false);
    }
};

    const handleResendOtp = async () => {
        if (!email) return toast.error("Email not found.");
        try {
            const response = await fetch(`${API_URL}/auth/resend-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const result = await response.json();
            if (result.success) toast.info("OTP resent successfully!");
            else toast.error(result.message || "Failed to resend OTP.");
        } catch (err) {
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">🔐 Verify OTP</h2>
                <p className="text-sm text-gray-600 text-center mb-4">OTP sent to: {email}</p>

                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full mb-4 p-3 text-black border rounded focus:ring focus:ring-purple-300"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 text- p-3 rounded hover:bg-purple-700"
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <p className="mt-4 text-center text-sm">
                    Didn't get OTP?{' '}
                    <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-purple-600 font-medium hover:underline"
                    >
                        Resend OTP
                    </button>
                </p>
            </form>
        </div>
    );
}

export default VerifyOtp;
