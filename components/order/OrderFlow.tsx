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
import { Zap, GitBranch, ChefHat, Carrot, Beef, Baby } from "lucide-react";
import Button from "@/components/Button";
import OrderNode, { type NodeType } from "./OrderNode";
import type { Order, RisottoBase, Veggie, Protein } from "@/lib/types";
import { risottoBases, veggies, proteins } from "@/lib/data";

const NODE_WIDTH = 300;
const NODE_SPACING = 50;

interface OrderNodeData extends Record<string, unknown> {
  type: "trigger" | "condition" | "base" | "veggies" | "proteins" | "kids";
  order: Order;
  onMealTypeSelect?: (type: "grown-ups" | "kids") => void;
  onBaseSelect?: (base: RisottoBase) => void;
  onVeggieToggle?: (veggie: Veggie) => void;
  onProteinToggle?: (protein: Protein) => void;
  onKidsMealSelect?: (selected: boolean) => void;
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
            ? "border-orange-600 bg-orange-50"
            : "border-[#e5e5e5] hover:border-orange-600"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Grown-ups</span>
          {order.mealType === "grown-ups" && (
            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
            ? "border-orange-600 bg-orange-50"
            : "border-[#e5e5e5] hover:border-orange-600"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Kids</span>
          {order.mealType === "kids" && (
            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </button>
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
  if (order.mealType !== "grown-ups") {
    return <p className="text-[#999999] text-xs">Complete previous step first</p>;
  }

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
                ? "border-[#0066cc] bg-[#f0f7ff]"
                : "border-[#e5e5e5] hover:border-[#0066cc]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{base.name}</span>
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

function VeggiesNodeContent({
  order,
  onVeggieToggle,
}: {
  order: Order;
  onVeggieToggle: (veggie: Veggie) => void;
}) {
  if (order.mealType !== "grown-ups" || !order.base) {
    return <p className="text-[#999999] text-xs">Complete previous step first</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {veggies.map((veggie) => {
        const isSelected = order.veggies.some((v) => v.id === veggie.id);
        return (
          <button
            key={veggie.id}
            type="button"
            onClick={() => onVeggieToggle(veggie)}
            className={`px-3 py-1.5 rounded-sm border text-xs transition-all ${
              isSelected
                ? "border-[#0066cc] bg-[#f0f7ff] text-[#0066cc]"
                : "border-[#e5e5e5] hover:border-[#0066cc]"
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
  if (order.mealType !== "grown-ups" || !order.base) {
    return <p className="text-[#999999] text-xs">Complete previous step first</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {proteins.map((protein) => {
        const isSelected = order.proteins.some((p) => p.id === protein.id);
        return (
          <button
            key={protein.id}
            type="button"
            onClick={() => onProteinToggle(protein)}
            className={`px-3 py-1.5 rounded-sm border text-xs transition-all ${
              isSelected
                ? "border-[#0066cc] bg-[#f0f7ff] text-[#0066cc]"
                : "border-[#e5e5e5] hover:border-[#0066cc]"
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
  if (order.mealType !== "kids") {
    return <p className="text-[#999999] text-xs">Complete previous step first</p>;
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => onKidsMealSelect(!order.kidsMeal)}
        className={`w-full text-left p-2 rounded-sm border transition-all ${
          order.kidsMeal
            ? "border-[#0066cc] bg-[#f0f7ff]"
            : "border-[#e5e5e5] hover:border-[#0066cc]"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Frikandel with andalouse</span>
          {order.kidsMeal && (
            <svg className="w-4 h-4 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}

function OrderNodeComponent({ data }: { data: OrderNodeData }) {
  const getNodeType = (): NodeType => {
    if (data.type === "trigger") return "trigger";
    if (data.type === "condition") return "condition";
    return "action";
  };

  const nodeType = getNodeType();
  const isCompleted =
    (data.type === "trigger") ||
    (data.type === "condition" && !!data.order.mealType) ||
    (data.type === "base" && !!data.order.base) ||
    (data.type === "veggies" && data.order.veggies.length > 0) ||
    (data.type === "proteins" && data.order.proteins.length > 0) ||
    (data.type === "kids" && !!data.order.kidsMeal);

  const isActive =
    (data.type === "trigger") ||
    (data.type === "condition" && !data.order.mealType) ||
    (data.type === "base" && data.order.mealType === "grown-ups" && !data.order.base) ||
    (data.type === "veggies" && data.order.mealType === "grown-ups" && !!data.order.base && data.order.veggies.length === 0) ||
    (data.type === "proteins" && data.order.mealType === "grown-ups" && !!data.order.base && data.order.proteins.length === 0) ||
    (data.type === "kids" && data.order.mealType === "kids" && !data.order.kidsMeal);

  const getIcon = () => {
    switch (data.type) {
      case "trigger":
        return <Zap size={15} className="text-red-600" />;
      case "condition":
        return <GitBranch size={15} className="text-orange-600" />;
      case "base":
        return <ChefHat size={15} className="text-[#0066cc]" />;
      case "veggies":
        return <Carrot size={15} className="text-[#0066cc]" />;
      case "proteins":
        return <Beef size={15} className="text-[#0066cc]" />;
      case "kids":
        return <Baby size={15} className="text-[#0066cc]" />;
    }
  };

  const getTitle = () => {
    switch (data.type) {
      case "trigger":
        return "Trigger";
      case "condition":
        return "Grown-ups or Kids";
      case "base":
        return "Step 1: Choose your base";
      case "veggies":
        return "Step 2: Choose your veggies";
      case "proteins":
        return "Step 3: Choose your proteins";
      case "kids":
        return "Step 1: Kid's meal";
    }
  };

  const renderContent = () => {
    switch (data.type) {
      case "trigger":
        return <TriggerNodeContent />;
      case "condition":
        return <ConditionNodeContent order={data.order} onMealTypeSelect={data.onMealTypeSelect!} />;
      case "base":
        return <BaseNodeContent order={data.order} onBaseSelect={data.onBaseSelect!} />;
      case "veggies":
        return <VeggiesNodeContent order={data.order} onVeggieToggle={data.onVeggieToggle!} />;
      case "proteins":
        return <ProteinsNodeContent order={data.order} onProteinToggle={data.onProteinToggle!} />;
      case "kids":
        return <KidsNodeContent order={data.order} onKidsMealSelect={data.onKidsMealSelect!} />;
    }
  };

  const showTargetHandle = data.type !== "trigger";
  const showSourceHandle = data.type !== "kids" && data.type !== "proteins";

  return (
    <>
      {showTargetHandle && (
        <Handle type="target" position={Position.Top} className="!bg-[#0066cc] !w-1 !h-1" />
      )}
      <OrderNode.Wrapper>
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
      </OrderNode.Wrapper>
      {showSourceHandle && (
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
    veggies: [],
    proteins: [],
  });

  const handleMealTypeSelect = useCallback((type: "grown-ups" | "kids") => {
    setOrder((prev) => ({ ...prev, mealType: type }));
  }, []);

  const handleBaseSelect = useCallback((base: RisottoBase) => {
    setOrder((prev) => ({ ...prev, base }));
  }, []);

  const handleVeggieToggle = useCallback((veggie: Veggie) => {
    setOrder((prev) => {
      const isSelected = prev.veggies.some((v) => v.id === veggie.id);
      return {
        ...prev,
        veggies: isSelected
          ? prev.veggies.filter((v) => v.id !== veggie.id)
          : [...prev.veggies, veggie],
      };
    });
  }, []);

  const handleProteinToggle = useCallback((protein: Protein) => {
    setOrder((prev) => {
      const isSelected = prev.proteins.some((p) => p.id === protein.id);
      return {
        ...prev,
        proteins: isSelected
          ? prev.proteins.filter((p) => p.id !== protein.id)
          : [...prev.proteins, protein],
      };
    });
  }, []);

  const handleKidsMealSelect = useCallback((selected: boolean) => {
    setOrder((prev) => ({ ...prev, kidsMeal: selected }));
  }, []);

  // Calculate node positions dynamically
  const calculateNodePositions = useCallback(() => {
    let currentY = 0;
    const positions: Record<string, number> = {};

    // Trigger
    positions.trigger = currentY;
    currentY += 120 + NODE_SPACING;

    // Condition
    positions.condition = currentY;
    currentY += 120 + NODE_SPACING;

    if (order.mealType === "grown-ups") {
      // Base
      positions.base = currentY;
      currentY += 150 + NODE_SPACING;
      // Veggies
      positions.veggies = currentY;
      currentY += 120 + NODE_SPACING;
      // Proteins
      positions.proteins = currentY;
    } else if (order.mealType === "kids") {
      // Kids meal
      positions.kids = currentY;
    }

    return positions;
  }, [order]);

  const nodePositions = calculateNodePositions();

  const initialNodes: Node<OrderNodeData>[] = useMemo(() => {
    const nodes: Node<OrderNodeData>[] = [
      {
        id: "trigger",
        type: "orderNode",
        position: { x: 0, y: nodePositions.trigger },
        data: {
          type: "trigger",
          order,
          onMealTypeSelect: handleMealTypeSelect,
          onBaseSelect: handleBaseSelect,
          onVeggieToggle: handleVeggieToggle,
          onProteinToggle: handleProteinToggle,
          onKidsMealSelect: handleKidsMealSelect,
        },
      },
      {
        id: "condition",
        type: "orderNode",
        position: { x: 0, y: nodePositions.condition },
        data: {
          type: "condition",
          order,
          onMealTypeSelect: handleMealTypeSelect,
          onBaseSelect: handleBaseSelect,
          onVeggieToggle: handleVeggieToggle,
          onProteinToggle: handleProteinToggle,
          onKidsMealSelect: handleKidsMealSelect,
        },
      },
    ];

    if (order.mealType === "grown-ups") {
      nodes.push(
        {
          id: "base",
          type: "orderNode",
          position: { x: 0, y: nodePositions.base },
          data: {
            type: "base",
            order,
            onMealTypeSelect: handleMealTypeSelect,
            onBaseSelect: handleBaseSelect,
            onVeggieToggle: handleVeggieToggle,
            onProteinToggle: handleProteinToggle,
            onKidsMealSelect: handleKidsMealSelect,
          },
        },
        {
          id: "veggies",
          type: "orderNode",
          position: { x: 0, y: nodePositions.veggies },
          data: {
            type: "veggies",
            order,
            onMealTypeSelect: handleMealTypeSelect,
            onBaseSelect: handleBaseSelect,
            onVeggieToggle: handleVeggieToggle,
            onProteinToggle: handleProteinToggle,
            onKidsMealSelect: handleKidsMealSelect,
          },
        },
        {
          id: "proteins",
          type: "orderNode",
          position: { x: 0, y: nodePositions.proteins },
          data: {
            type: "proteins",
            order,
            onMealTypeSelect: handleMealTypeSelect,
            onBaseSelect: handleBaseSelect,
            onVeggieToggle: handleVeggieToggle,
            onProteinToggle: handleProteinToggle,
            onKidsMealSelect: handleKidsMealSelect,
          },
        }
      );
    } else if (order.mealType === "kids") {
      nodes.push({
        id: "kids",
        type: "orderNode",
        position: { x: 0, y: nodePositions.kids },
        data: {
          type: "kids",
          order,
          onMealTypeSelect: handleMealTypeSelect,
          onBaseSelect: handleBaseSelect,
          onVeggieToggle: handleVeggieToggle,
          onProteinToggle: handleProteinToggle,
          onKidsMealSelect: handleKidsMealSelect,
        },
      });
    }

    return nodes;
  }, [order, handleMealTypeSelect, handleBaseSelect, handleVeggieToggle, handleProteinToggle, handleKidsMealSelect, nodePositions]);

  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [
      { id: "e-trigger-condition", source: "trigger", target: "condition", type: "smoothstep" },
    ];

    if (order.mealType === "grown-ups") {
      edges.push(
        { id: "e-condition-base", source: "condition", target: "base", type: "smoothstep" },
        { id: "e-base-veggies", source: "base", target: "veggies", type: "smoothstep" },
        { id: "e-veggies-proteins", source: "veggies", target: "proteins", type: "smoothstep" }
      );
    } else if (order.mealType === "kids") {
      edges.push({ id: "e-condition-kids", source: "condition", target: "kids", type: "smoothstep" });
    }

    return edges;
  }, [order]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when order changes
  React.useEffect(() => {
    const positions = calculateNodePositions();
    setNodes((nds: Node<OrderNodeData>[]) => {
      const nodeMap = new Map(nds.map((n) => [n.id, n]));
      const newNodes: Node<OrderNodeData>[] = [];

      // Always include trigger and condition
      if (nodeMap.has("trigger")) {
        newNodes.push({
          ...nodeMap.get("trigger")!,
          position: { x: 0, y: positions.trigger },
          data: { ...nodeMap.get("trigger")!.data, order },
        });
      }
      if (nodeMap.has("condition")) {
        newNodes.push({
          ...nodeMap.get("condition")!,
          position: { x: 0, y: positions.condition },
          data: { ...nodeMap.get("condition")!.data, order },
        });
      }

      // Add grown-ups nodes
      if (order.mealType === "grown-ups") {
        ["base", "veggies", "proteins"].forEach((id) => {
          if (nodeMap.has(id)) {
            newNodes.push({
              ...nodeMap.get(id)!,
              position: { x: 0, y: positions[id as keyof typeof positions] },
              data: { ...nodeMap.get(id)!.data, order },
            });
          } else {
            // Create new node
            const nodeData: OrderNodeData = {
              type: id as "base" | "veggies" | "proteins",
              order,
              onMealTypeSelect: handleMealTypeSelect,
              onBaseSelect: handleBaseSelect,
              onVeggieToggle: handleVeggieToggle,
              onProteinToggle: handleProteinToggle,
              onKidsMealSelect: handleKidsMealSelect,
            };
            newNodes.push({
              id,
              type: "orderNode",
              position: { x: 0, y: positions[id as keyof typeof positions] },
              data: nodeData,
            });
          }
        });
      } else if (order.mealType === "kids") {
        if (nodeMap.has("kids")) {
          newNodes.push({
            ...nodeMap.get("kids")!,
            position: { x: 0, y: positions.kids },
            data: { ...nodeMap.get("kids")!.data, order },
          });
        } else {
          const nodeData: OrderNodeData = {
            type: "kids",
            order,
            onMealTypeSelect: handleMealTypeSelect,
            onBaseSelect: handleBaseSelect,
            onVeggieToggle: handleVeggieToggle,
            onProteinToggle: handleProteinToggle,
            onKidsMealSelect: handleKidsMealSelect,
          };
          newNodes.push({
            id: "kids",
            type: "orderNode",
            position: { x: 0, y: positions.kids },
            data: nodeData,
          });
        }
      }

      return newNodes;
    });
  }, [order, setNodes, calculateNodePositions, handleMealTypeSelect, handleBaseSelect, handleVeggieToggle, handleProteinToggle, handleKidsMealSelect]);

  // Update edges when order changes
  React.useEffect(() => {
    const newEdges: Edge[] = [
      { id: "e-trigger-condition", source: "trigger", target: "condition", type: "smoothstep" },
    ];

    if (order.mealType === "grown-ups") {
      newEdges.push(
        { id: "e-condition-base", source: "condition", target: "base", type: "smoothstep" },
        { id: "e-base-veggies", source: "base", target: "veggies", type: "smoothstep" },
        { id: "e-veggies-proteins", source: "veggies", target: "proteins", type: "smoothstep" }
      );
    } else if (order.mealType === "kids") {
      newEdges.push({ id: "e-condition-kids", source: "condition", target: "kids", type: "smoothstep" });
    }

    setEdges(newEdges);
  }, [order, setEdges]);

  const handleOrder = () => {
    const orderData = JSON.stringify(order);
    sessionStorage.setItem("order", orderData);
    router.push("/order/confirmation");
  };

  const canOrder =
    order.mealType === "grown-ups"
      ? !!order.base && order.veggies.length > 0 && order.proteins.length > 0
      : order.mealType === "kids" && !!order.kidsMeal;

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
