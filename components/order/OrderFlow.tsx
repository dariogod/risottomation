"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { Order, SpritzOption, AppetizerOption, RisottoBase, Topping } from "@/lib/types";
import { spritzes, appetizers, risottoBases, toppings } from "@/lib/data";

const NODE_WIDTH = 300;
const MIN_NODE_HEIGHT = 90;

interface OrderBlockProps {
  title: string;
  icon?: React.ReactNode;
  isCompleted: boolean;
  isActive: boolean;
  children: React.ReactNode;
  stepNumber: number;
}

function OrderBlock({ title, icon, isCompleted, isActive, children, stepNumber }: OrderBlockProps) {
  const borderColor = isActive ? "border-[#0066cc]" : isCompleted ? "border-[#0066cc]" : "border-[#e5e5e5]";
  const hoverBorder = isActive ? "" : "hover:border-[#0066cc]/40";

  return (
    <div className="relative">
      {/* Connecting line from previous block */}
      {stepNumber > 0 && (
        <div className="absolute -top-4 left-[150px] w-0.5 h-4 bg-[#e5e5e5]" />
      )}
      
      <div
        className={`relative bg-white px-4 py-1 border cursor-pointer rounded-sm ${borderColor} ${hoverBorder}`}
        style={{ width: `${NODE_WIDTH}px`, minHeight: `${MIN_NODE_HEIGHT}px` }}
      >
        {/* Header */}
        <div className="flex w-full items-center gap-1.5 mb-1">
          {/* Icon */}
          {icon && (
            <div className="shrink-0 size-6 flex items-center justify-center rounded-sm bg-[#0066cc]/10">
              {icon}
            </div>
          )}
          
          {/* Title */}
          <div className="flex items-center justify-between h-10 w-full">
            <p className="text-sm font-bold leading-[14px]">{title}</p>
            
            {/* Status indicator */}
            {isCompleted && (
              <div className="flex-center relative">
                <div className="absolute flex-center rounded-full bg-[#0066cc]/20 size-5">
                  <svg
                    className="w-3 h-3 text-[#0066cc]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            )}
            {isActive && !isCompleted && (
              <div className="flex-center relative">
                <div className="w-5 h-5 border-2 border-[#0066cc] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-[#e5e5e5] mb-1" />

        {/* Content */}
        <div className="min-h-[32px] flex flex-col text-xs gap-1 pt-1 pb-1.5 justify-center max-w-full overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function OrderFlow() {
  const router = useRouter();
  const [order, setOrder] = useState<Order>({
    toppings: [],
  });

  const handleSpritzSelect = (spritz: SpritzOption) => {
    setOrder({ ...order, spritz });
  };

  const handleAppetizerSelect = (appetizer: AppetizerOption) => {
    setOrder({ ...order, appetizer });
  };

  const handleBaseSelect = (base: RisottoBase) => {
    setOrder({ ...order, risottoBase: base });
  };

  const handleToppingToggle = (topping: Topping) => {
    const isSelected = order.toppings.some((t) => t.id === topping.id);
    setOrder({
      ...order,
      toppings: isSelected
        ? order.toppings.filter((t) => t.id !== topping.id)
        : [...order.toppings, topping],
    });
  };

  const handleOrder = () => {
    const orderData = JSON.stringify(order);
    sessionStorage.setItem("order", orderData);
    router.push("/order/confirmation");
  };

  const canOrder = order.spritz && order.appetizer && order.risottoBase;

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1a1a1a] text-center mb-12">
          Create your order
        </h1>

        {/* Three blocks displayed vertically */}
        <div className="flex flex-col items-center gap-8">
          {/* Block 1: Spritz */}
          <OrderBlock
            title="Choose your spritz"
            icon={
              <svg className="w-4 h-4 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            isCompleted={!!order.spritz}
            isActive={!order.spritz}
            stepNumber={0}
          >
            <div className="space-y-2">
              {spritzes.map((spritz) => {
                const isSelected = order.spritz?.id === spritz.id;
                return (
                  <button
                    key={spritz.id}
                    onClick={() => handleSpritzSelect(spritz)}
                    className={`w-full text-left p-2 rounded-sm border transition-all ${
                      isSelected
                        ? "border-[#0066cc] bg-[#f0f7ff]"
                        : "border-[#e5e5e5] hover:border-[#0066cc]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{spritz.name}</span>
                      {isSelected && (
                        <svg className="w-4 h-4 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </OrderBlock>

          {/* Block 2: Appetizer */}
          <OrderBlock
            title="Choose your appetizer"
            icon={
              <svg className="w-4 h-4 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            }
            isCompleted={!!order.appetizer}
            isActive={!!order.spritz && !order.appetizer}
            stepNumber={1}
          >
            {order.spritz ? (
              <div className="space-y-2">
                {appetizers.map((appetizer) => {
                  const isSelected = order.appetizer?.id === appetizer.id;
                  return (
                    <button
                      key={appetizer.id}
                      onClick={() => handleAppetizerSelect(appetizer)}
                      className={`w-full text-left p-2 rounded-sm border transition-all ${
                        isSelected
                          ? "border-[#0066cc] bg-[#f0f7ff]"
                          : "border-[#e5e5e5] hover:border-[#0066cc]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{appetizer.name}</span>
                        {isSelected && (
                          <svg className="w-4 h-4 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-[#999999] text-xs">Complete previous step first</p>
            )}
          </OrderBlock>

          {/* Block 3: Risotto */}
          <OrderBlock
            title="Compose your risotto"
            icon={
              <svg className="w-4 h-4 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            }
            isCompleted={!!order.risottoBase}
            isActive={!!order.appetizer && !order.risottoBase}
            stepNumber={2}
          >
            {order.appetizer ? (
              <div className="space-y-4">
                {/* Base selection */}
                <div>
                  <p className="text-xs font-medium text-[#333333] mb-2">Base:</p>
                  <div className="space-y-1">
                    {risottoBases.map((base) => {
                      const isSelected = order.risottoBase?.id === base.id;
                      return (
                        <button
                          key={base.id}
                          onClick={() => handleBaseSelect(base)}
                          className={`w-full text-left p-2 rounded-sm border transition-all ${
                            isSelected
                              ? "border-[#0066cc] bg-[#f0f7ff]"
                              : "border-[#e5e5e5] hover:border-[#0066cc]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs">{base.name}</span>
                            {isSelected && (
                              <svg className="w-3 h-3 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Toppings selection */}
                <div>
                  <p className="text-xs font-medium text-[#333333] mb-2">Toppings:</p>
                  <div className="flex flex-wrap gap-1">
                    {toppings.map((topping) => {
                      const isSelected = order.toppings.some((t) => t.id === topping.id);
                      return (
                        <button
                          key={topping.id}
                          onClick={() => handleToppingToggle(topping)}
                          className={`px-2 py-1 rounded-sm border text-xs transition-all ${
                            isSelected
                              ? "border-[#0066cc] bg-[#f0f7ff] text-[#0066cc]"
                              : "border-[#e5e5e5] hover:border-[#0066cc]"
                          }`}
                        >
                          {topping.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-[#999999] text-xs">Complete previous step first</p>
            )}
          </OrderBlock>
        </div>

        {/* Order button */}
        <div className="flex justify-center mt-12">
          <Button
            variant="primary"
            onClick={handleOrder}
            disabled={!canOrder}
          >
            Order
          </Button>
        </div>
      </div>
    </div>
  );
}
