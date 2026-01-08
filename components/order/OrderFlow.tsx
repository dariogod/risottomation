"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Wine, UtensilsCrossed, ChefHat } from "lucide-react";
import Button from "@/components/Button";
import OrderNode from "./OrderNode";
import type { Order, SpritzOption, AppetizerOption, RisottoBase, Topping } from "@/lib/types";
import { spritzes, appetizers, risottoBases, toppings } from "@/lib/data";

interface OrderNodeData extends Record<string, unknown> {
  type: "spritz" | "appetizer" | "risotto";
  order: Order;
  onSpritzSelect: (spritz: SpritzOption) => void;
  onAppetizerSelect: (appetizer: AppetizerOption) => void;
  onBaseSelect: (base: RisottoBase) => void;
  onToppingToggle: (topping: Topping) => void;
}

function SpritzNodeContent({ order, onSpritzSelect }: { order: Order; onSpritzSelect: (spritz: SpritzOption) => void }) {
  return (
    <div className="space-y-2">
      {spritzes.map((spritz) => {
        const isSelected = order.spritz?.id === spritz.id;
        return (
          <button
            key={spritz.id}
            type="button"
            onClick={() => onSpritzSelect(spritz)}
            className={`w-full text-left p-2 rounded-sm border transition-all ${
              isSelected
                ? "border-[#0066cc] bg-[#f0f7ff]"
                : "border-[#e5e5e5] hover:border-[#0066cc]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{spritz.name}</span>
              {isSelected && (
                <svg className="w-4 h-4 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function AppetizerNodeContent({
  order,
  onAppetizerSelect,
}: {
  order: Order;
  onAppetizerSelect: (appetizer: AppetizerOption) => void;
}) {
  if (!order.spritz) {
    return <p className="text-[#999999] text-xs">Complete previous step first</p>;
  }

  return (
    <div className="space-y-2">
      {appetizers.map((appetizer) => {
        const isSelected = order.appetizer?.id === appetizer.id;
        return (
          <button
            key={appetizer.id}
            type="button"
            onClick={() => onAppetizerSelect(appetizer)}
            className={`w-full text-left p-2 rounded-sm border transition-all ${
              isSelected
                ? "border-[#0066cc] bg-[#f0f7ff]"
                : "border-[#e5e5e5] hover:border-[#0066cc]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{appetizer.name}</span>
              {isSelected && (
                <svg className="w-4 h-4 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function RisottoNodeContent({
  order,
  onBaseSelect,
  onToppingToggle,
}: {
  order: Order;
  onBaseSelect: (base: RisottoBase) => void;
  onToppingToggle: (topping: Topping) => void;
}) {
  if (!order.appetizer) {
    return <p className="text-[#999999] text-xs">Complete previous step first</p>;
  }

  return (
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
                type="button"
                onClick={() => onBaseSelect(base)}
                className={`w-full text-left p-2 rounded-sm border transition-all ${
                  isSelected
                    ? "border-[#0066cc] bg-[#f0f7ff]"
                    : "border-[#e5e5e5] hover:border-[#0066cc]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs">{base.name}</span>
                  {isSelected && (
                    <svg className="w-3 h-3 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                type="button"
                onClick={() => onToppingToggle(topping)}
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
  );
}

function OrderNodeComponent({ data }: { data: OrderNodeData }) {
  const isCompleted =
    (data.type === "spritz" && !!data.order.spritz) ||
    (data.type === "appetizer" && !!data.order.appetizer) ||
    (data.type === "risotto" && !!data.order.risottoBase);

  const isActive =
    (data.type === "spritz" && !data.order.spritz) ||
    (data.type === "appetizer" && !!data.order.spritz && !data.order.appetizer) ||
    (data.type === "risotto" && !!data.order.appetizer && !data.order.risottoBase);

  const getIcon = () => {
    switch (data.type) {
      case "spritz":
        return <Wine size={15} className="text-[#0066cc]" />;
      case "appetizer":
        return <UtensilsCrossed size={15} className="text-[#0066cc]" />;
      case "risotto":
        return <ChefHat size={15} className="text-[#0066cc]" />;
    }
  };

  const getTitle = () => {
    switch (data.type) {
      case "spritz":
        return "Choose your spritz";
      case "appetizer":
        return "Choose your appetizer";
      case "risotto":
        return "Compose your risotto";
    }
  };

  const renderContent = () => {
    switch (data.type) {
      case "spritz":
        return <SpritzNodeContent order={data.order} onSpritzSelect={data.onSpritzSelect} />;
      case "appetizer":
        return <AppetizerNodeContent order={data.order} onAppetizerSelect={data.onAppetizerSelect} />;
      case "risotto":
        return (
          <RisottoNodeContent
            order={data.order}
            onBaseSelect={data.onBaseSelect}
            onToppingToggle={data.onToppingToggle}
          />
        );
    }
  };

  return (
    <>
      {data.type !== "spritz" && (
        <Handle type="target" position={Position.Top} className="!bg-[#0066cc] !w-1 !h-1" />
      )}
      <OrderNode.Wrapper>
        <OrderNode.Container
          selected={false}
          hovering={false}
          highlightNode={isActive}
          isCompleted={isCompleted}
          isActive={isActive}
        >
          <OrderNode.Header>
            <OrderNode.Icon icon={getIcon()} />
            <div className="flex items-center justify-between h-10 w-full">
              <OrderNode.Title name={getTitle()} />
              <OrderNode.StatusIndicator isCompleted={isCompleted} isActive={isActive} />
            </div>
          </OrderNode.Header>
          <OrderNode.Separator />
          <OrderNode.Content>{renderContent()}</OrderNode.Content>
        </OrderNode.Container>
      </OrderNode.Wrapper>
      {data.type !== "risotto" && (
        <Handle type="source" position={Position.Bottom} className="!bg-[#0066cc] !w-1 !h-1" />
      )}
    </>
  );
}

const nodeTypes = {
  orderNode: OrderNodeComponent,
};

export default function OrderFlow() {
  const router = useRouter();
  const [order, setOrder] = useState<Order>({
    toppings: [],
  });

  const handleSpritzSelect = useCallback((spritz: SpritzOption) => {
    setOrder((prev) => ({ ...prev, spritz }));
  }, []);

  const handleAppetizerSelect = useCallback((appetizer: AppetizerOption) => {
    setOrder((prev) => ({ ...prev, appetizer }));
  }, []);

  const handleBaseSelect = useCallback((base: RisottoBase) => {
    setOrder((prev) => ({ ...prev, risottoBase: base }));
  }, []);

  const handleToppingToggle = useCallback((topping: Topping) => {
    setOrder((prev) => {
      const isSelected = prev.toppings.some((t) => t.id === topping.id);
      return {
        ...prev,
        toppings: isSelected
          ? prev.toppings.filter((t) => t.id !== topping.id)
          : [...prev.toppings, topping],
      };
    });
  }, []);

  // Calculate dynamic node heights and positions
  const calculateNodePositions = useCallback(() => {
    const NODE_SPACING = 50; // Space between nodes
    const BASE_HEIGHT = 90; // Minimum node height
    const HEADER_HEIGHT = 50; // Header + separator height
    const ITEM_HEIGHT = 40; // Height per item in lists
    const PADDING = 16; // Content padding

    let currentY = 0;

    // Spritz node
    const spritzItems = spritzes.length;
    const spritzHeight = BASE_HEIGHT + HEADER_HEIGHT + (spritzItems * ITEM_HEIGHT) + PADDING;
    const spritzY = currentY;
    currentY += spritzHeight + NODE_SPACING;

    // Appetizer node
    const appetizerItems = order.spritz ? appetizers.length : 0;
    const appetizerHeight = BASE_HEIGHT + HEADER_HEIGHT + (appetizerItems > 0 ? appetizerItems * ITEM_HEIGHT : 30) + PADDING;
    const appetizerY = currentY;
    currentY += appetizerHeight + NODE_SPACING;

    // Risotto node
    const risottoBaseItems = order.appetizer ? risottoBases.length : 0;
    const risottoToppingsRows = order.appetizer ? Math.ceil(toppings.length / 4) : 0;
    const risottoHeight = BASE_HEIGHT + HEADER_HEIGHT + 
      (risottoBaseItems > 0 ? risottoBaseItems * ITEM_HEIGHT + 20 : 30) + // Base section
      (risottoToppingsRows > 0 ? risottoToppingsRows * 30 + 20 : 0) + // Toppings section
      PADDING;
    const risottoY = currentY;

    return {
      spritz: { y: spritzY, height: spritzHeight },
      appetizer: { y: appetizerY, height: appetizerHeight },
      risotto: { y: risottoY, height: risottoHeight },
    };
  }, [order]);

  const nodePositions = calculateNodePositions();

  const initialNodes: Node<OrderNodeData>[] = useMemo(
    () => [
      {
        id: "spritz",
        type: "orderNode",
        position: { x: 0, y: nodePositions.spritz.y },
        data: {
          type: "spritz",
          order,
          onSpritzSelect: handleSpritzSelect,
          onAppetizerSelect: handleAppetizerSelect,
          onBaseSelect: handleBaseSelect,
          onToppingToggle: handleToppingToggle,
        },
      },
      {
        id: "appetizer",
        type: "orderNode",
        position: { x: 0, y: nodePositions.appetizer.y },
        data: {
          type: "appetizer",
          order,
          onSpritzSelect: handleSpritzSelect,
          onAppetizerSelect: handleAppetizerSelect,
          onBaseSelect: handleBaseSelect,
          onToppingToggle: handleToppingToggle,
        },
      },
      {
        id: "risotto",
        type: "orderNode",
        position: { x: 0, y: nodePositions.risotto.y },
        data: {
          type: "risotto",
          order,
          onSpritzSelect: handleSpritzSelect,
          onAppetizerSelect: handleAppetizerSelect,
          onBaseSelect: handleBaseSelect,
          onToppingToggle: handleToppingToggle,
        },
      },
    ],
    [order, handleSpritzSelect, handleAppetizerSelect, handleBaseSelect, handleToppingToggle, nodePositions]
  );

  const initialEdges: Edge[] = useMemo(
    () => [
      { id: "e1-2", source: "spritz", target: "appetizer", type: "smoothstep" },
      { id: "e2-3", source: "appetizer", target: "risotto", type: "smoothstep" },
    ],
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when order changes - recalculate positions
  React.useEffect(() => {
    const positions = calculateNodePositions();
    setNodes((nds: Node<OrderNodeData>[]) =>
      nds.map((node: Node<OrderNodeData>) => {
        let newY = node.position.y;
        if (node.id === "spritz") {
          newY = positions.spritz.y;
        } else if (node.id === "appetizer") {
          newY = positions.appetizer.y;
        } else if (node.id === "risotto") {
          newY = positions.risotto.y;
        }
        return {
          ...node,
          position: { ...node.position, y: newY },
          data: {
            ...node.data,
            order,
          },
        };
      })
    );
  }, [order, setNodes, calculateNodePositions]);

  const handleOrder = () => {
    const orderData = JSON.stringify(order);
    sessionStorage.setItem("order", orderData);
    router.push("/order/confirmation");
  };

  const canOrder = order.spritz && order.appetizer && order.risottoBase;

  return (
    <div className="min-h-screen bg-white">
      <div className="h-screen flex flex-col">
        <div className="flex-shrink-0 px-8 pt-8 pb-4">
          <h1 className="text-4xl font-bold text-[#1a1a1a] text-center mb-4">
            Create your order
          </h1>
        </div>
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            nodesDraggable={false}
            nodesConnectable={false}
            panOnDrag={true}
            zoomOnScroll={true}
            zoomOnPinch={true}
            fitView
            className="!bg-neutral-50"
          >
            <Background
              className="!bg-neutral-50"
              variant={BackgroundVariant.Dots}
              gap={12}
              size={1}
            />
          </ReactFlow>
        </div>
        <div className="flex-shrink-0 flex justify-center px-8 pb-8 pt-4">
          <Button variant="primary" onClick={handleOrder} disabled={!canOrder}>
            Order
          </Button>
        </div>
      </div>
    </div>
  );
}
