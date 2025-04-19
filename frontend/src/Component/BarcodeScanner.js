import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BarcodeScanner = ({ onProductAdded, products }) => {
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef(null);
  const timeoutRef = useRef(null);

  const startScanner = async () => {
    const config = {
      fps: 10,
      qrbox: { width: 300, height: 150 },
      formatsToSupport: ["EAN_13", "CODE_128"],
    };

    const html5QrCode = new Html5Qrcode("scanner");
    scannerRef.current = html5QrCode;

    try {
      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        async (decodedText) => {
          console.log("✅ Scanned barcode:", decodedText);
          stopScanner();

          try {
            const res = await fetch(
              `http://localhost:3000/api/products/scan/${decodedText}`
            );
            if (!res.ok) throw new Error("Product not found");

            const alreadyExists = products.some(
              (p) => p.barcode === decodedText
            );

            if (alreadyExists) {
              toast.warning("Product already in inventory");
            } else {
              const product = await res.json();
              onProductAdded(product);
              toast.success(`Product added: ${product.name}`);
            }
          } catch (err) {
            console.error("Error fetching product:", err.message);
            toast.error("Failed to fetch product details");
          }
        }
      );

      timeoutRef.current = setTimeout(() => {
        stopScanner();
        console.log("⏱️ Auto-stopped after 2 minutes");
      }, 2 * 60 * 1000);
    } catch (err) {
      console.error("❌ Scanner failed to start:", err.message);
      toast.error("Scanner failed to start");
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      } catch (err) {
        console.warn("⚠️ Scanner stop error:", err.message);
      }
      scannerRef.current = null;
    }
    clearTimeout(timeoutRef.current);
    setScanning(false);
  };

  useEffect(() => {
    if (scanning) {
      const timeout = setTimeout(() => {
        if (document.getElementById("scanner")) {
          startScanner();
        } else {
          console.error("❌ Scanner element not found");
          toast.error("Scanner container not found");
          setScanning(false);
        }
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [scanning]);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          if (!scanning) {
            setScanning(true);
          } else {
            stopScanner();
          }
        }}
      >
        {scanning ? "Stop Scanning" : "Start Scanning"}
      </button>

      {scanning && (
        <div
          id="scanner"
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "300px",
            margin: "0 auto",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#000",
          }}
        />
      )}
    </div>
  );
};
