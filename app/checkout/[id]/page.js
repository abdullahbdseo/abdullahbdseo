"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { siteSettings } from "@/lib/data";

export default function CheckoutPage({ params }) {
  const unwrappedParams = use(params);
  const orderId = unwrappedParams.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gateway, setGateway] = useState("crypto"); // "crypto" or "bkash"
  const [selectedCoin, setSelectedCoin] = useState("USDT-TRC20");
  const [copied, setCopied] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [bkashTrx, setBkashTrx] = useState("");
  const [bkashSender, setBkashSender] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 mins in seconds

  useEffect(() => {
    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch or mock order
    async function loadOrder() {
      setLoading(true);
      try {
        // Fallback demo order if newly created or direct nav
        setOrder({
          id: orderId,
          order_number: `ORD-20260905-${orderId.substring(0, 4).toUpperCase()}`,
          service_title: "Technical SEO & Growth Deliverable",
          package_name: "Standard Audit Package",
          website_url: "https://yourwebsite.com",
          total: 650.00,
          currency: "USD",
          status: "awaiting_payment"
        });
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [orderId]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getDepositAddress = () => {
    switch (selectedCoin) {
      case "USDT-TRC20": return siteSettings.usdt_trc20_address;
      case "USDT-ERC20": return siteSettings.usdt_erc20_address;
      case "BTC": return siteSettings.btc_address;
      case "ETH": return siteSettings.eth_address;
      case "SOL": return siteSettings.sol_address;
      default: return siteSettings.usdt_trc20_address;
    }
  };

  const copyAddress = (addr) => {
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCryptoSubmit = async (e) => {
    e.preventDefault();
    if (!txHash) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout/submit-tx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, txHash, coin: selectedCoin })
      });
      if (res.ok) {
        setIsSuccess(true);
      }
    } catch (e) {
      alert("Error submitting transaction hash");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBkashSubmit = async (e) => {
    e.preventDefault();
    if (!bkashTrx) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout/submit-bkash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          orderId, 
          trxId: bkashTrx, 
          senderNumber: bkashSender,
          bdtAmount: Math.round((order?.total || 650) * siteSettings.bkash_rate)
        })
      });
      if (res.ok) {
        setIsSuccess(true);
      }
    } catch (e) {
      alert("Error submitting bKash transaction");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-24">
        <i className="fa-solid fa-spinner fa-spin text-4xl text-primary mb-4"></i>
        <p>Loading secure checkout session...</p>
      </div>
    );
  }

  const bdtTotal = Math.round((order?.total || 650) * siteSettings.bkash_rate);

  if (isSuccess) {
    return (
      <div className="container max-w-2xl py-20 text-center">
        <div className="success-confirmation-card p-10 bg-white border rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl mb-6">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <h1 className="text-3xl font-bold mb-2">Payment Confirmed!</h1>
          <p className="text-slate-600 mb-6">
            Your payment for <strong>{order?.service_title}</strong> has been received. Our engineering team has been notified and onboarding has begun.
          </p>

          <div className="bg-slate-50 p-6 rounded-xl border text-left text-sm space-y-2 mb-8">
            <div className="flex justify-between">
              <span className="text-muted">Order ID:</span>
              <span className="font-mono font-bold">{order?.order_number || `ORD-${orderId}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Target Domain:</span>
              <span className="font-bold">{order?.website_url}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Amount Paid:</span>
              <span className="font-bold text-emerald-600">${order?.total} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Status:</span>
              <span className="badge-pill bg-success-light text-success font-bold">In Progress</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn btn-primary">
              <i className="fa-solid fa-house"></i> Return to Home
            </Link>
            <Link href="/contact" className="btn btn-outline">
              <i className="fa-solid fa-comments"></i> Contact Strategy Team
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <section className="page-header-section">
        <div className="container text-center">
          <div className="sub-badge"><i className="fa-solid fa-lock text-success"></i> 256-Bit Encrypted Checkout</div>
          <h1 className="page-title">Complete Your Order</h1>
          <p className="page-subtitle max-w-xl mx-auto">
            Order Reference: <strong className="font-mono text-primary">{order?.order_number || `ORD-${orderId}`}</strong>
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ORDER SUMMARY */}
            <div className="checkout-summary-col md:col-span-1">
              <div className="bg-white border rounded-xl p-6 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold mb-4 border-b pb-3"><i className="fa-solid fa-receipt text-primary"></i> Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted text-xs uppercase block">Service</span>
                    <strong className="text-slate-800">{order?.service_title}</strong>
                  </div>
                  <div>
                    <span className="text-muted text-xs uppercase block">Package</span>
                    <span className="text-slate-700">{order?.package_name}</span>
                  </div>
                  <div>
                    <span className="text-muted text-xs uppercase block">Target Website</span>
                    <span className="text-slate-700 font-mono text-xs break-all">{order?.website_url}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center text-base">
                    <span className="font-bold">Total Due:</span>
                    <span className="text-2xl font-bold text-primary">${order?.total} USD</span>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs flex items-center justify-between">
                  <span><i className="fa-regular fa-clock"></i> Payment Session:</span>
                  <span className="font-mono font-bold text-sm">{formatTimer(timeLeft)}</span>
                </div>
              </div>
            </div>

            {/* PAYMENT GATEWAY TABS & FORM */}
            <div className="checkout-payment-col md:col-span-2">
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                {/* GATEWAY SELECTOR */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <button
                    type="button"
                    onClick={() => setGateway("crypto")}
                    className={`p-4 border rounded-xl font-bold flex items-center justify-center gap-3 transition ${gateway === "crypto" ? "border-primary bg-blue-50 text-primary shadow-sm" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
                  >
                    <i className="fa-brands fa-bitcoin text-xl text-amber-500"></i>
                    <span>Crypto (USDT / BTC / SOL)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGateway("bkash")}
                    className={`p-4 border rounded-xl font-bold flex items-center justify-center gap-3 transition ${gateway === "bkash" ? "border-pink-500 bg-pink-50 text-pink-700 shadow-sm" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
                  >
                    <i className="fa-solid fa-mobile-screen-button text-xl text-pink-600"></i>
                    <span>bKash (BDT Local)</span>
                  </button>
                </div>

                {/* CRYPTO GATEWAY VIEW */}
                {gateway === "crypto" && (
                  <div className="crypto-gateway-view space-y-6">
                    <div className="form-group">
                      <label className="form-label">Select Cryptocurrency Asset</label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {["USDT-TRC20", "USDT-ERC20", "BTC", "ETH", "SOL"].map((coin) => (
                          <button
                            key={coin}
                            type="button"
                            onClick={() => setSelectedCoin(coin)}
                            className={`p-2 border rounded-lg text-xs font-bold transition ${selectedCoin === coin ? "bg-slate-900 text-white border-slate-900" : "bg-white hover:bg-slate-50"}`}
                          >
                            {coin}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-xl border text-center space-y-3">
                      <span className="text-xs uppercase font-bold text-muted">Send Exactly ${order?.total} USD worth of {selectedCoin}</span>
                      
                      <div className="flex items-center justify-between p-3 bg-white border rounded-lg font-mono text-xs break-all">
                        <span>{getDepositAddress()}</span>
                        <button
                          type="button"
                          onClick={() => copyAddress(getDepositAddress())}
                          className="btn btn-outline btn-xs ml-2 shrink-0"
                        >
                          {copied ? <i className="fa-solid fa-check text-success"></i> : <i className="fa-regular fa-copy"></i>}
                        </button>
                      </div>

                      <p className="text-xs text-slate-500">
                        Please send only {selectedCoin} to this address. Network confirmation takes 1-3 minutes.
                      </p>
                    </div>

                    {/* SUBMIT TX HASH */}
                    <form onSubmit={handleCryptoSubmit} className="space-y-4">
                      <div className="form-group">
                        <label className="form-label">Paste Transaction Hash (TxID) to Confirm</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 0x4f8b91a... or 7e2c9..."
                          value={txHash}
                          onChange={(e) => setTxHash(e.target.value)}
                          className="form-input font-mono text-sm"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-primary btn-lg w-full"
                      >
                        {submitting ? <><i className="fa-solid fa-spinner fa-spin"></i> Verifying On-Chain...</> : <><i className="fa-solid fa-circle-check"></i> Submit Transaction Hash</>}
                      </button>
                    </form>
                  </div>
                )}

                {/* BKASH GATEWAY VIEW */}
                {gateway === "bkash" && (
                  <div className="bkash-gateway-view space-y-6">
                    <div className="bg-pink-50 p-5 rounded-xl border border-pink-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-xs text-pink-700 font-bold uppercase">Total BDT Amount</span>
                          <div className="text-3xl font-bold text-pink-700">৳ {bdtTotal.toLocaleString()} BDT</div>
                        </div>
                        <div className="text-right text-xs text-pink-600">
                          Rate: 1 USD = ৳ {siteSettings.bkash_rate} BDT
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-pink-200 flex items-center justify-between font-mono text-sm font-bold text-slate-800">
                        <span>bKash Number: {siteSettings.bkash_number}</span>
                        <button
                          type="button"
                          onClick={() => copyAddress(siteSettings.bkash_number)}
                          className="btn btn-outline btn-xs"
                        >
                          {copied ? "Copied!" : "Copy Number"}
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-4 rounded-lg border">
                      <strong className="block font-bold mb-1 text-slate-800">Instructions:</strong>
                      <p>1. Open bKash App &gt; Select Send Money</p>
                      <p>2. Enter Account Number: <strong>{siteSettings.bkash_number}</strong></p>
                      <p>3. Enter Amount: <strong>৳ {bdtTotal.toLocaleString()}</strong></p>
                      <p>4. Enter Reference: <strong>{order?.order_number || orderId}</strong></p>
                      <p>5. Copy the 10-digit TrxID and submit below.</p>
                    </div>

                    <form onSubmit={handleBkashSubmit} className="space-y-4">
                      <div className="form-row-2">
                        <div className="form-group">
                          <label className="form-label">bKash Sender Number</label>
                          <input
                            type="text"
                            required
                            placeholder="017XXXXXXXX"
                            value={bkashSender}
                            onChange={(e) => setBkashSender(e.target.value)}
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">bKash TrxID</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. BL92A8FK92"
                            value={bkashTrx}
                            onChange={(e) => setBkashTrx(e.target.value)}
                            className="form-input font-mono uppercase"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-primary btn-lg w-full bg-pink-600 hover:bg-pink-700 border-pink-600"
                      >
                        {submitting ? <><i className="fa-solid fa-spinner fa-spin"></i> Verifying TrxID...</> : <><i className="fa-solid fa-circle-check"></i> Verify & Confirm Order</>}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
