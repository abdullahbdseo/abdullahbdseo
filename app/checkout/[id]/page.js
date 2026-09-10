"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/contact");
  }, [router]);

  return (
    <div className="container text-center py-24">
      <h1 className="text-2xl font-bold mb-4">Redirecting to Contact &amp; Inquiry...</h1>
      <p className="text-slate-500 mb-6">Online checkout has been replaced with direct project inquiry and strategy consulting.</p>
      <Link href="/contact" className="btn btn-primary">
        Go to Contact Page
      </Link>
    </div>
  );
}
