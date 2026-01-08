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
import { Zap, GitBranch, Wine, ChefHat, Carrot, Beef, Baby, ShoppingCart, User } from "lucide-react";
import OrderNode, { type NodeType } from "./OrderNode";
import type { Order, SpritzOption, RisottoBase, Veggie, Protein } from "@/lib/types";
import { spritzes, risottoBases, veggies, proteins } from "@/lib/data";
import { nodeHeights, NODE_GAP } from "@/lib/nodeConfig";

const NODE_WIDTH = 300;

interface OrderNodeData extends Record<string, unknown> {
  type: "trigger" | "condition" | "spritz" | "base" | "veggies" | "proteins" | "kids" | "name" | "submit";
  order: Order;
  onMealTypeSelect?: (type: "grown-ups" | "kids") => void;
  onSpritzSelect?: (spritz: SpritzOption) => void;
  onBaseSelect?: (base: RisottoBase) => void;
  onVeggieToggle?: (veggie: Veggie) => void;
  onProteinToggle?: (protein: Protein) => void;
  onKidsMealSelect?: (selected: boolean) => void;
  onNameChange?: (name: string) => void;
  onSubmitOrder?: () => void;
  canOrder?: boolean;
}

function TriggerNodeContent() {
  return (
    <div className="rounded-sm space-y-1 bg-neutral-100 px-2 py-1 text-black">
      <div className="flex items-center gap-2">
        <span className="text-xs">Create your bowl</span>
      </div>
    </div>
  );
}

function ConditionNodeContent({
  order,
  onMealTypeSelect,
}: {
  order: Order;
  onMealTypeSelect: (type: "grown-ups" | "kids") => void;
}) {
  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => onMealTypeSelect("grown-ups")}
        className={`w-full text-left p-2 rounded-sm border transition-all ${
          order.mealType === "grown-ups"
            ? "border-blue-600 bg-blue-50"
            : "border-[#e5e5e5] hover:border-blue-600"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Grown-ups</span>
          {order.mealType === "grown-ups" && (
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </button>
      <button
        type="button"
        onClick={() => onMealTypeSelect("kids")}
        className={`w-full text-left p-2 rounded-sm border transition-all ${
          order.mealType === "kids"
            ? "border-blue-600 bg-blue-50"
            : "border-[#e5e5e5] hover:border-blue-600"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Kids</span>
          {order.mealType === "kids" && (
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}

function SpritzNodeContent({
  order,
  onSpritzSelect,
}: {
  order: Order;
  onSpritzSelect: (spritz: SpritzOption) => void;
}) {
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
                ? "border-orange-600 bg-orange-50"
                : "border-[#e5e5e5] hover:border-orange-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{spritz.name}</span>
              {isSelected && (
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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

function BaseNodeContent({
  order,
  onBaseSelect,
}: {
  order: Order;
  onBaseSelect: (base: RisottoBase) => void;
}) {
  return (
    <div className="space-y-2">
      {risottoBases.map((base) => {
        const isSelected = order.base?.id === base.id;
        return (
          <button
            key={base.id}
            type="button"
            onClick={() => onBaseSelect(base)}
            className={`w-full text-left p-2 rounded-sm border transition-all ${
              isSelected
                ? "border-cyan-600 bg-cyan-50"
                : "border-[#e5e5e5] hover:border-cyan-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{base.name}</span>
              {isSelected && (
                <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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

function VeggiesNodeContent({
  order,
  onVeggieToggle,
}: {
  order: Order;
  onVeggieToggle: (veggie: Veggie) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {veggies.map((veggie) => {
        const isSelected = order.veggies.some((v) => v.id === veggie.id);
        const isNoneOption = veggie.id === "no-veggies";
        return (
          <button
            key={veggie.id}
            type="button"
            onClick={() => onVeggieToggle(veggie)}
            className={`px-3 py-1.5 rounded-sm border text-xs transition-all ${
              isNoneOption
                ? isSelected
                  ? "border-neutral-500 bg-neutral-100 text-neutral-600 border-dashed"
                  : "border-dashed border-neutral-300 text-neutral-400 hover:border-neutral-400 hover:text-neutral-500"
                : isSelected
                  ? "border-green-600 bg-green-50 text-green-600"
                  : "border-[#e5e5e5] hover:border-green-600"
            }`}
          >
            {veggie.name}
          </button>
        );
      })}
    </div>
  );
}

function ProteinsNodeContent({
  order,
  onProteinToggle,
}: {
  order: Order;
  onProteinToggle: (protein: Protein) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {proteins.map((protein) => {
        const isSelected = order.proteins.some((p) => p.id === protein.id);
        const isNoneOption = protein.id === "no-protein";
        return (
          <button
            key={protein.id}
            type="button"
            onClick={() => onProteinToggle(protein)}
            className={`px-3 py-1.5 rounded-sm border text-xs transition-all ${
              isNoneOption
                ? isSelected
                  ? "border-neutral-500 bg-neutral-100 text-neutral-600 border-dashed"
                  : "border-dashed border-neutral-300 text-neutral-400 hover:border-neutral-400 hover:text-neutral-500"
                : isSelected
                  ? "border-orange-600 bg-orange-50 text-orange-600"
                  : "border-[#e5e5e5] hover:border-orange-600"
            }`}
          >
            {protein.name}
          </button>
        );
      })}
    </div>
  );
}

function KidsNodeContent({
  order,
  onKidsMealSelect,
}: {
  order: Order;
  onKidsMealSelect: (selected: boolean) => void;
}) {
  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => onKidsMealSelect(!order.kidsMeal)}
        className={`w-full text-left p-2 rounded-sm border transition-all ${
          order.kidsMeal
            ? "border-green-600 bg-green-50"
            : "border-[#e5e5e5] hover:border-green-600"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Risotto with frikandel & andalouse</span>
          {order.kidsMeal && (
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}

function NameNodeContent({
  order,
  onNameChange,
}: {
  order: Order;
  onNameChange: (name: string) => void;
}) {
  return (
    <div className="space-y-2">
      <input
        type="text"
        value={order.name || ""}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Enter your name"
        className="w-full px-3 py-2 rounded-sm border border-[#e5e5e5] text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
      />
    </div>
  );
}

function SubmitNodeContent({
  canOrder,
  onSubmitOrder,
}: {
  canOrder: boolean;
  onSubmitOrder: () => void;
}) {
  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={onSubmitOrder}
        disabled={!canOrder}
        className={`w-full text-center p-3 rounded-sm border transition-all font-medium ${
          canOrder
            ? "border-[#0066cc] bg-[#0066cc] text-white hover:bg-[#0052a3]"
            : "border-[#e5e5e5] bg-[#f5f5f5] text-[#999999] cursor-not-allowed"
        }`}
      >
        {canOrder ? "Place Order" : "Complete all steps first"}
      </button>
    </div>
  );
}

function OrderNodeComponent({ data }: { data: OrderNodeData }) {
  const getNodeType = (): NodeType => {
    return data.type;
  };

  const nodeType = getNodeType();
  const isCompleted =
    (data.type === "trigger") ||
    (data.type === "condition" && !!data.order.mealType) ||
    (data.type === "spritz" && !!data.order.spritz) ||
    (data.type === "base" && !!data.order.base) ||
    (data.type === "veggies" && data.order.veggies.length > 0) ||
    (data.type === "proteins" && data.order.proteins.length > 0) ||
    (data.type === "kids" && !!data.order.kidsMeal) ||
    (data.type === "name" && !!data.order.name?.trim()) ||
    (data.type === "submit" && false); // Submit never shows as completed

  const isActive =
    (data.type === "trigger") ||
    (data.type === "condition" && !data.order.mealType) ||
    (data.type === "spritz" && data.order.mealType === "grown-ups" && !data.order.spritz) ||
    (data.type === "base" && data.order.mealType === "grown-ups" && !!data.order.spritz && !data.order.base) ||
    (data.type === "veggies" && data.order.mealType === "grown-ups" && !!data.order.base && data.order.veggies.length === 0) ||
    (data.type === "proteins" && data.order.mealType === "grown-ups" && !!data.order.base && data.order.veggies.length > 0 && data.order.proteins.length === 0) ||
    (data.type === "kids" && data.order.mealType === "kids" && !data.order.kidsMeal) ||
    (data.type === "name" && !data.order.name?.trim()) ||
    (data.type === "submit" && !!data.canOrder);

  const getIcon = () => {
    switch (data.type) {
      case "trigger":
        return <Zap size={15} className="text-red-600" />;
      case "condition":
        return <GitBranch size={15} className="text-blue-600" />;
      case "spritz":
        return <Wine size={15} className="text-orange-600" />;
      case "base":
        return <ChefHat size={15} className="text-cyan-600" />;
      case "veggies":
        return <Carrot size={15} className="text-green-600" />;
      case "proteins":
        return <Beef size={15} className="text-orange-600" />;
      case "kids":
        return <Baby size={15} className="text-green-600" />;
      case "name":
        return <User size={15} className="text-purple-600" />;
      case "submit":
        return <ShoppingCart size={15} className="text-[#0066cc]" />;
    }
  };

  const getTitle = () => {
    switch (data.type) {
      case "trigger":
        return "Trigger";
      case "condition":
        return "Grown-ups or Kids";
      case "spritz":
        return "Choose your spritz";
      case "base":
        return "Choose your risotto base";
      case "veggies":
        return "Choose your veggies";
      case "proteins":
        return "Choose your proteins";
      case "kids":
        return "Kid's meal";
      case "name":
        return "Your name";
      case "submit":
        return "Place your order";
    }
  };

  const renderContent = () => {
    switch (data.type) {
      case "trigger":
        return <TriggerNodeContent />;
      case "condition":
        return <ConditionNodeContent order={data.order} onMealTypeSelect={data.onMealTypeSelect!} />;
      case "spritz":
        return <SpritzNodeContent order={data.order} onSpritzSelect={data.onSpritzSelect!} />;
      case "base":
        return <BaseNodeContent order={data.order} onBaseSelect={data.onBaseSelect!} />;
      case "veggies":
        return <VeggiesNodeContent order={data.order} onVeggieToggle={data.onVeggieToggle!} />;
      case "proteins":
        return <ProteinsNodeContent order={data.order} onProteinToggle={data.onProteinToggle!} />;
      case "kids":
        return <KidsNodeContent order={data.order} onKidsMealSelect={data.onKidsMealSelect!} />;
      case "name":
        return <NameNodeContent order={data.order} onNameChange={data.onNameChange!} />;
      case "submit":
        return <SubmitNodeContent canOrder={!!data.canOrder} onSubmitOrder={data.onSubmitOrder!} />;
    }
  };

  const showTargetHandle = data.type !== "trigger";
  // All nodes except submit (which is always last) need a source handle
  const showSourceHandle = data.type !== "submit";

  return (
    <div className="relative">
      {showTargetHandle && (
        <Handle 
          type="target" 
          position={Position.Top} 
          className="w-3 h-3 rounded-full border-2 border-white bg-[#0066cc]"
          isConnectable={false}
        />
      )}
      <OrderNode.Container
        selected={false}
        hovering={false}
        highlightNode={isActive}
        isCompleted={isCompleted}
        isActive={isActive}
        nodeType={nodeType}
      >
        <OrderNode.Header>
          <OrderNode.Icon icon={getIcon()} nodeType={nodeType} />
          <div className="flex items-center justify-between h-10 w-full">
            <OrderNode.Title name={getTitle()} />
            <OrderNode.StatusIndicator isCompleted={isCompleted} isActive={isActive} nodeType={nodeType} />
          </div>
        </OrderNode.Header>
        <OrderNode.Separator />
        <OrderNode.Content>{renderContent()}</OrderNode.Content>
      </OrderNode.Container>
      {showSourceHandle && (
        <Handle 
          type="source" 
          position={Position.Bottom} 
          className="w-3 h-3 rounded-full border-2 border-white bg-[#0066cc]"
          isConnectable={false}
        />
      )}
    </div>
  );
}

const nodeTypes = {
  orderNode: OrderNodeComponent,
};

export default function OrderFlow() {
  const router = useRouter();
  const [order, setOrder] = useState<Order>({
    veggies: [],
    proteins: [],
  });

  const handleMealTypeSelect = useCallback((type: "grown-ups" | "kids") => {
    setOrder((prev) => ({ ...prev, mealType: type }));
  }, []);

  const handleSpritzSelect = useCallback((spritz: SpritzOption) => {
    setOrder((prev) => ({ ...prev, spritz }));
  }, []);

  const handleBaseSelect = useCallback((base: RisottoBase) => {
    setOrder((prev) => ({ ...prev, base }));
  }, []);

  const handleVeggieToggle = useCallback((veggie: Veggie) => {
    setOrder((prev) => {
      const isSelected = prev.veggies.some((v) => v.id === veggie.id);
      
      // If already selected, just deselect it
      if (isSelected) {
        return {
          ...prev,
          veggies: prev.veggies.filter((v) => v.id !== veggie.id),
        };
      }
      
      // If selecting "no veggies", clear all others
      if (veggie.id === "no-veggies") {
        return {
          ...prev,
          veggies: [veggie],
        };
      }
      
      // If selecting a regular veggie, remove "no veggies" if present and add the new one
      return {
        ...prev,
        veggies: [...prev.veggies.filter((v) => v.id !== "no-veggies"), veggie],
      };
    });
  }, []);

  const handleProteinToggle = useCallback((protein: Protein) => {
    setOrder((prev) => {
      const isSelected = prev.proteins.some((p) => p.id === protein.id);
      
      // If already selected, just deselect it
      if (isSelected) {
        return {
          ...prev,
          proteins: prev.proteins.filter((p) => p.id !== protein.id),
        };
      }
      
      // If selecting "no protein", clear all others
      if (protein.id === "no-protein") {
        return {
          ...prev,
          proteins: [protein],
        };
      }
      
      // If selecting a regular protein, remove "no protein" if present and add the new one
      return {
        ...prev,
        proteins: [...prev.proteins.filter((p) => p.id !== "no-protein"), protein],
      };
    });
  }, []);

  const handleKidsMealSelect = useCallback((selected: boolean) => {
    setOrder((prev) => ({ ...prev, kidsMeal: selected }));
  }, []);

  const handleNameChange = useCallback((name: string) => {
    setOrder((prev) => ({ ...prev, name }));
  }, []);

  const handleOrder = useCallback(() => {
    const orderData = JSON.stringify(order);
    sessionStorage.setItem("order", orderData);
    router.push("/order/confirmation");
  }, [order, router]);

  // Helper function to determine if a node should be shown
  const shouldShowNode = useCallback((nodeId: string): boolean => {
    switch (nodeId) {
      case "trigger":
        return true; // Always shown
      case "condition":
        return true; // Trigger is always completed
      case "spritz":
        return order.mealType === "grown-ups";
      case "base":
        return order.mealType === "grown-ups" && !!order.spritz;
      case "veggies":
        return order.mealType === "grown-ups" && !!order.base;
      case "proteins":
        return order.mealType === "grown-ups" && order.veggies.length > 0;
      case "kids":
        return order.mealType === "kids";
      case "name":
        if (order.mealType === "grown-ups") {
          return order.proteins.length > 0;
        } else if (order.mealType === "kids") {
          return !!order.kidsMeal;
        }
        return false;
      case "submit":
        if (order.mealType === "grown-ups") {
          return order.proteins.length > 0 && !!order.name?.trim();
        } else if (order.mealType === "kids") {
          return !!order.kidsMeal && !!order.name?.trim();
        }
        return false;
      default:
        return false;
    }
  }, [order]);

  // Calculate node positions using configured heights from nodeConfig.ts
  const calculateNodePositions = useCallback(() => {
    const positions: Record<string, number> = {};
    let currentY = 0;
    
    // Build list of nodes that will exist
    const nodeOrder: string[] = [];
    
    if (shouldShowNode("trigger")) nodeOrder.push("trigger");
    if (shouldShowNode("condition")) nodeOrder.push("condition");
    
    if (order.mealType === "grown-ups") {
      if (shouldShowNode("spritz")) nodeOrder.push("spritz");
      if (shouldShowNode("base")) nodeOrder.push("base");
      if (shouldShowNode("veggies")) nodeOrder.push("veggies");
      if (shouldShowNode("proteins")) nodeOrder.push("proteins");
      if (shouldShowNode("name")) nodeOrder.push("name");
      if (shouldShowNode("submit")) nodeOrder.push("submit");
    } else if (order.mealType === "kids") {
      if (shouldShowNode("kids")) nodeOrder.push("kids");
      if (shouldShowNode("name")) nodeOrder.push("name");
      if (shouldShowNode("submit")) nodeOrder.push("submit");
    }

    // Use heights from nodeConfig.ts
    nodeOrder.forEach((nodeId) => {
      positions[nodeId] = currentY;
      currentY += (nodeHeights[nodeId] || 100) + NODE_GAP;
    });
    
    return positions;
  }, [order, shouldShowNode]);

  const nodePositions = calculateNodePositions();

  const initialNodes: Node<OrderNodeData>[] = useMemo(() => {
    const nodes: Node<OrderNodeData>[] = [];
    const baseNodeData = {
      order,
      onMealTypeSelect: handleMealTypeSelect,
      onSpritzSelect: handleSpritzSelect,
      onBaseSelect: handleBaseSelect,
      onVeggieToggle: handleVeggieToggle,
      onProteinToggle: handleProteinToggle,
      onKidsMealSelect: handleKidsMealSelect,
      onNameChange: handleNameChange,
    };

    // Trigger - always shown
    if (shouldShowNode("trigger")) {
      nodes.push({
        id: "trigger",
        type: "orderNode",
        position: { x: 0, y: nodePositions.trigger ?? 0 },
        data: {
          type: "trigger",
          ...baseNodeData,
        },
      });
    }

    // Condition - always shown (trigger is always completed)
    if (shouldShowNode("condition")) {
      nodes.push({
        id: "condition",
        type: "orderNode",
        position: { x: 0, y: nodePositions.condition ?? 0 },
        data: {
          type: "condition",
          ...baseNodeData,
        },
      });
    }

    // Grown-ups path
    if (order.mealType === "grown-ups") {
      if (shouldShowNode("spritz")) {
        nodes.push({
          id: "spritz",
          type: "orderNode",
          position: { x: 0, y: nodePositions.spritz ?? 0 },
          data: {
            type: "spritz",
            ...baseNodeData,
          },
        });
      }

      if (shouldShowNode("base")) {
        nodes.push({
          id: "base",
          type: "orderNode",
          position: { x: 0, y: nodePositions.base ?? 0 },
          data: {
            type: "base",
            ...baseNodeData,
          },
        });
      }

      if (shouldShowNode("veggies")) {
        nodes.push({
          id: "veggies",
          type: "orderNode",
          position: { x: 0, y: nodePositions.veggies ?? 0 },
          data: {
            type: "veggies",
            ...baseNodeData,
          },
        });
      }

      if (shouldShowNode("proteins")) {
        nodes.push({
          id: "proteins",
          type: "orderNode",
          position: { x: 0, y: nodePositions.proteins ?? 0 },
          data: {
            type: "proteins",
            ...baseNodeData,
          },
        });
      }

      if (shouldShowNode("name")) {
        nodes.push({
          id: "name",
          type: "orderNode",
          position: { x: 0, y: nodePositions.name ?? 0 },
          data: {
            type: "name",
            ...baseNodeData,
          },
        });
      }

      if (shouldShowNode("submit")) {
        nodes.push({
          id: "submit",
          type: "orderNode",
          position: { x: 0, y: nodePositions.submit ?? 0 },
          data: {
            type: "submit",
            order,
            canOrder: !!order.spritz && !!order.base && order.veggies.length > 0 && order.proteins.length > 0 && !!order.name?.trim(),
            onSubmitOrder: handleOrder,
          },
        });
      }
    } 
    // Kids path
    else if (order.mealType === "kids") {
      if (shouldShowNode("kids")) {
        nodes.push({
          id: "kids",
          type: "orderNode",
          position: { x: 0, y: nodePositions.kids ?? 0 },
          data: {
            type: "kids",
            ...baseNodeData,
          },
        });
      }

      if (shouldShowNode("name")) {
        nodes.push({
          id: "name",
          type: "orderNode",
          position: { x: 0, y: nodePositions.name ?? 0 },
          data: {
            type: "name",
            ...baseNodeData,
          },
        });
      }

      if (shouldShowNode("submit")) {
        nodes.push({
          id: "submit",
          type: "orderNode",
          position: { x: 0, y: nodePositions.submit ?? 0 },
          data: {
            type: "submit",
            order,
            canOrder: !!order.name?.trim(),
            onSubmitOrder: handleOrder,
          },
        });
      }
    }

    return nodes;
  }, [order, handleMealTypeSelect, handleSpritzSelect, handleBaseSelect, handleVeggieToggle, handleProteinToggle, handleKidsMealSelect, handleNameChange, handleOrder, nodePositions, shouldShowNode]);

  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];

    // Only create edges between nodes that exist
    if (shouldShowNode("trigger") && shouldShowNode("condition")) {
      edges.push({ id: "e-trigger-condition", source: "trigger", target: "condition", type: "smoothstep" });
    }

    if (order.mealType === "grown-ups") {
      if (shouldShowNode("condition") && shouldShowNode("spritz")) {
        edges.push({ id: "e-condition-spritz", source: "condition", target: "spritz", type: "smoothstep" });
      }
      if (shouldShowNode("spritz") && shouldShowNode("base")) {
        edges.push({ id: "e-spritz-base", source: "spritz", target: "base", type: "smoothstep" });
      }
      if (shouldShowNode("base") && shouldShowNode("veggies")) {
        edges.push({ id: "e-base-veggies", source: "base", target: "veggies", type: "smoothstep" });
      }
      if (shouldShowNode("veggies") && shouldShowNode("proteins")) {
        edges.push({ id: "e-veggies-proteins", source: "veggies", target: "proteins", type: "smoothstep" });
      }
      if (shouldShowNode("proteins") && shouldShowNode("name")) {
        edges.push({ id: "e-proteins-name", source: "proteins", target: "name", type: "smoothstep" });
      }
      if (shouldShowNode("name") && shouldShowNode("submit")) {
        edges.push({ id: "e-name-submit", source: "name", target: "submit", type: "smoothstep" });
      }
    } else if (order.mealType === "kids") {
      if (shouldShowNode("condition") && shouldShowNode("kids")) {
        edges.push({ id: "e-condition-kids", source: "condition", target: "kids", type: "smoothstep" });
      }
      if (shouldShowNode("kids") && shouldShowNode("name")) {
        edges.push({ id: "e-kids-name", source: "kids", target: "name", type: "smoothstep" });
      }
      if (shouldShowNode("name") && shouldShowNode("submit")) {
        edges.push({ id: "e-name-submit", source: "name", target: "submit", type: "smoothstep" });
      }
    }

    return edges;
  }, [order, shouldShowNode]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Handle node changes and trigger position updates
  const handleNodesChange = useCallback(
    (changes: any[]) => {
      onNodesChange(changes);
    },
    [onNodesChange]
  );

  // Update nodes when order changes - rebuild nodes array based on conditional logic
  React.useEffect(() => {
    const positions = calculateNodePositions();
    const baseNodeData = {
      order,
      onMealTypeSelect: handleMealTypeSelect,
      onSpritzSelect: handleSpritzSelect,
      onBaseSelect: handleBaseSelect,
      onVeggieToggle: handleVeggieToggle,
      onProteinToggle: handleProteinToggle,
      onKidsMealSelect: handleKidsMealSelect,
      onNameChange: handleNameChange,
    };

    const newNodes: Node<OrderNodeData>[] = [];

    // Trigger - always shown
    if (shouldShowNode("trigger")) {
      newNodes.push({
        id: "trigger",
        type: "orderNode",
        position: { x: 0, y: positions.trigger ?? 0 },
        data: {
          type: "trigger",
          ...baseNodeData,
        },
      });
    }

    // Condition - always shown
    if (shouldShowNode("condition")) {
      newNodes.push({
        id: "condition",
        type: "orderNode",
        position: { x: 0, y: positions.condition ?? 0 },
        data: {
          type: "condition",
          ...baseNodeData,
        },
      });
    }

    // Grown-ups path
    if (order.mealType === "grown-ups") {
      if (shouldShowNode("spritz")) {
        newNodes.push({
          id: "spritz",
          type: "orderNode",
          position: { x: 0, y: positions.spritz ?? 0 },
          data: {
            type: "spritz",
            ...baseNodeData,
          },
        });
      }

      if (shouldShowNode("base")) {
        newNodes.push({
          id: "base",
          type: "orderNode",
          position: { x: 0, y: positions.base ?? 0 },
          data: {
            type: "base",
            ...baseNodeData,
          },
        });
      }

      if (shouldShowNode("veggies")) {
        newNodes.push({
          id: "veggies",
          type: "orderNode",
          position: { x: 0, y: positions.veggies ?? 0 },
          data: {
            type: "veggies",
            ...baseNodeData,
          },
        });
      }

      if (shouldShowNode("proteins")) {
        newNodes.push({
          id: "proteins",
          type: "orderNode",
          position: { x: 0, y: positions.proteins ?? 0 },
          data: {
            type: "proteins",
            ...baseNodeData,
          },
        });
      }

      if (shouldShowNode("name")) {
        newNodes.push({
          id: "name",
          type: "orderNode",
          position: { x: 0, y: positions.name ?? 0 },
          data: {
            type: "name",
            ...baseNodeData,
          },
        });
      }

      if (shouldShowNode("submit")) {
        newNodes.push({
          id: "submit",
          type: "orderNode",
          position: { x: 0, y: positions.submit ?? 0 },
          data: {
            type: "submit",
            order,
            canOrder: !!order.spritz && !!order.base && order.veggies.length > 0 && order.proteins.length > 0 && !!order.name?.trim(),
            onSubmitOrder: handleOrder,
          },
        });
      }
    } 
    // Kids path
    else if (order.mealType === "kids") {
      if (shouldShowNode("kids")) {
        newNodes.push({
          id: "kids",
          type: "orderNode",
          position: { x: 0, y: positions.kids ?? 0 },
          data: {
            type: "kids",
            ...baseNodeData,
          },
        });
      }

      if (shouldShowNode("name")) {
        newNodes.push({
          id: "name",
          type: "orderNode",
          position: { x: 0, y: positions.name ?? 0 },
          data: {
            type: "name",
            ...baseNodeData,
          },
        });
      }

      if (shouldShowNode("submit")) {
        newNodes.push({
          id: "submit",
          type: "orderNode",
          position: { x: 0, y: positions.submit ?? 0 },
          data: {
            type: "submit",
            order,
            canOrder: !!order.name?.trim(),
            onSubmitOrder: handleOrder,
          },
        });
      }
    }

    setNodes(newNodes);
  }, [order, setNodes, calculateNodePositions, shouldShowNode, handleMealTypeSelect, handleSpritzSelect, handleBaseSelect, handleVeggieToggle, handleProteinToggle, handleKidsMealSelect, handleNameChange, handleOrder]);

  // Update edges when order changes - only create edges for nodes that exist
  React.useEffect(() => {
    const newEdges: Edge[] = [];

    // Only create edges between nodes that exist
    if (shouldShowNode("trigger") && shouldShowNode("condition")) {
      newEdges.push({ id: "e-trigger-condition", source: "trigger", target: "condition", type: "smoothstep" });
    }

    if (order.mealType === "grown-ups") {
      if (shouldShowNode("condition") && shouldShowNode("spritz")) {
        newEdges.push({ id: "e-condition-spritz", source: "condition", target: "spritz", type: "smoothstep" });
      }
      if (shouldShowNode("spritz") && shouldShowNode("base")) {
        newEdges.push({ id: "e-spritz-base", source: "spritz", target: "base", type: "smoothstep" });
      }
      if (shouldShowNode("base") && shouldShowNode("veggies")) {
        newEdges.push({ id: "e-base-veggies", source: "base", target: "veggies", type: "smoothstep" });
      }
      if (shouldShowNode("veggies") && shouldShowNode("proteins")) {
        newEdges.push({ id: "e-veggies-proteins", source: "veggies", target: "proteins", type: "smoothstep" });
      }
      if (shouldShowNode("proteins") && shouldShowNode("name")) {
        newEdges.push({ id: "e-proteins-name", source: "proteins", target: "name", type: "smoothstep" });
      }
      if (shouldShowNode("name") && shouldShowNode("submit")) {
        newEdges.push({ id: "e-name-submit", source: "name", target: "submit", type: "smoothstep" });
      }
    } else if (order.mealType === "kids") {
      if (shouldShowNode("condition") && shouldShowNode("kids")) {
        newEdges.push({ id: "e-condition-kids", source: "condition", target: "kids", type: "smoothstep" });
      }
      if (shouldShowNode("kids") && shouldShowNode("name")) {
        newEdges.push({ id: "e-kids-name", source: "kids", target: "name", type: "smoothstep" });
      }
      if (shouldShowNode("name") && shouldShowNode("submit")) {
        newEdges.push({ id: "e-name-submit", source: "name", target: "submit", type: "smoothstep" });
      }
    }

    setEdges(newEdges);
  }, [order, shouldShowNode, setEdges]);

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
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
  );
}
