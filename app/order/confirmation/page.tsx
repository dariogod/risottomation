"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { Order } from "@/lib/types";

export default function ConfirmationPage() {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const orderData = sessionStorage.getItem("order");
      if (orderData) {
        setOrder(JSON.parse(orderData));
      } else {
        router.push("/order");
      }
    }
  }, [router]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[#333333]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <div className="w-20 h-20 rounded-full bg-[#0066cc] flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-[#333333]">
            Thank you for your order. We'll prepare it right away.
          </p>
        </div>

        <div className="bg-white border border-[#e5e5e5] rounded-xl p-8 shadow-sm mb-8 fade-in">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-6">
            Order Summary
          </h2>

          <div className="space-y-6">
            {order.spritz && (
              <div className="border-b border-[#e5e5e5] pb-4">
                <h3 className="text-sm font-medium text-[#999999] mb-1">
                  Spritz
                </h3>
                <p className="text-lg text-[#1a1a1a]">{order.spritz.name}</p>
              </div>
            )}

            {order.appetizer && (
              <div className="border-b border-[#e5e5e5] pb-4">
                <h3 className="text-sm font-medium text-[#999999] mb-1">
                  Appetizer
                </h3>
                <p className="text-lg text-[#1a1a1a]">
                  {order.appetizer.name}
                </p>
              </div>
            )}

            {order.risottoBase && (
              <div className="border-b border-[#e5e5e5] pb-4">
                <h3 className="text-sm font-medium text-[#999999] mb-1">
                  Risotto Base
                </h3>
                <p className="text-lg text-[#1a1a1a]">
                  {order.risottoBase.name}
                </p>
              </div>
            )}

            {order.toppings.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-[#999999] mb-2">
                  Toppings
                </h3>
                <div className="flex flex-wrap gap-2">
                  {order.toppings.map((topping) => (
                    <span
                      key={topping.id}
                      className="px-3 py-1 bg-[#f0f7ff] text-[#0066cc] rounded-full text-sm"
                    >
                      {topping.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
          <Button href="/order" variant="secondary">
            Place Another Order
          </Button>
        </div>
      </div>
    </div>
  );
}
