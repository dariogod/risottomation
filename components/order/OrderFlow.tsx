"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StepIndicator from "@/components/StepIndicator";
import StepContent from "./StepContent";
import SpritzSelector from "./SpritzSelector";
import AppetizerSelector from "./AppetizerSelector";
import RisottoComposer from "./RisottoComposer";
import Button from "@/components/Button";
import { Order, SpritzOption, AppetizerOption, RisottoBase, Topping } from "@/lib/types";
import { orderSteps } from "@/lib/data";

export default function OrderFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
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

  const handleNext = () => {
    if (currentStep < orderSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOrder = () => {
    // Store order in sessionStorage or pass as query params
    const orderData = JSON.stringify(order);
    sessionStorage.setItem("order", orderData);
    router.push("/order/confirmation");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!order.spritz;
      case 1:
        return !!order.appetizer;
      case 2:
        return !!order.risottoBase;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepContent title="Choose your spritz">
            <SpritzSelector
              selectedSpritz={order.spritz}
              onSelect={handleSpritzSelect}
            />
          </StepContent>
        );
      case 1:
        return (
          <StepContent title="Choose your appetizer">
            <AppetizerSelector
              selectedAppetizer={order.appetizer}
              onSelect={handleAppetizerSelect}
            />
          </StepContent>
        );
      case 2:
        return (
          <StepContent title="Compose your risotto">
            <RisottoComposer
              selectedBase={order.risottoBase}
              selectedToppings={order.toppings}
              onBaseSelect={handleBaseSelect}
              onToppingToggle={handleToppingToggle}
            />
          </StepContent>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <StepIndicator steps={orderSteps} currentStep={currentStep} />
        {renderStepContent()}
        <div className="flex justify-between items-center mt-12 max-w-4xl mx-auto px-4">
          <Button
            variant="secondary"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          {currentStep < orderSteps.length - 1 ? (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleOrder}
              disabled={!canProceed()}
            >
              Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
