import { memo, ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const NODE_WIDTH = 300;
const MIN_NODE_HEIGHT = 90;

type NodeType = "trigger" | "condition" | "action";

type ContainerProps = {
  children: ReactNode;
  selected: boolean;
  hovering: boolean;
  highlightNode: boolean;
  isCompleted: boolean;
  isActive: boolean;
  nodeType?: NodeType;
  className?: string;
};

function Container({
  children,
  selected,
  hovering,
  highlightNode,
  isCompleted,
  isActive,
  nodeType = "action",
  className,
}: ContainerProps) {
  const getBorderColor = () => {
    if (nodeType === "trigger") {
      return isActive || isCompleted ? "border-red-600" : "border-[#e5e5e5]";
    }
    if (nodeType === "condition") {
      return isActive || isCompleted ? "border-orange-600" : "border-[#e5e5e5]";
    }
    return isActive || isCompleted ? "border-[#0066cc]" : "border-[#e5e5e5]";
  };

  const getHoverBorder = () => {
    if (hovering && !selected && !highlightNode && !isCompleted) {
      if (nodeType === "trigger") return "border-red-600/40";
      if (nodeType === "condition") return "border-orange-600/40";
      return "border-[#0066cc]/40";
    }
    return "";
  };

  const getSelectedGradient = () => {
    if (selected) {
      if (nodeType === "trigger") return "bg-red-300";
      if (nodeType === "condition") return "bg-orange-300";
      return "bg-[#0066cc]/20";
    }
    return "";
  };

  const borderColor = getBorderColor();
  const hoverBorder = getHoverBorder();
  const selectedGradient = getSelectedGradient();

  return (
    <div
      className={cn(
        "relative bg-white px-4 py-1 border cursor-pointer rounded-sm",
        borderColor,
        hoverBorder,
        selected && "opacity-95",
        (selected || highlightNode) && borderColor,
        className
      )}
      style={{ width: `${NODE_WIDTH}px`, minHeight: `${MIN_NODE_HEIGHT}px`, height: "auto" }}
    >
      {children}
      {selected && <div className={cn("absolute -z-10 -inset-[2px] rounded-sm", selectedGradient)} />}
    </div>
  );
}

type HeaderProps = {
  children: ReactNode;
};

function Header({ children }: HeaderProps) {
  return <div className="flex w-full items-center gap-1.5">{children}</div>;
}

type IconProps = {
  icon: ReactNode;
  nodeType?: NodeType;
};

const Icon = memo(function Icon({ icon, nodeType = "action" }: IconProps) {
  const getBgColor = () => {
    if (nodeType === "trigger") return "bg-red-600/10";
    if (nodeType === "condition") return "bg-orange-600/10";
    return "bg-[#0066cc]/10";
  };

  const getIconColor = () => {
    if (nodeType === "trigger") return "text-red-600";
    if (nodeType === "condition") return "text-orange-600";
    return "text-[#0066cc]";
  };

  return (
    <div className={cn("shrink-0 size-6 flex items-center justify-center rounded-sm", getBgColor())}>
      <div className={getIconColor()}>{icon}</div>
    </div>
  );
});

type TitleProps = {
  name: string;
};

const Title = memo(function Title({ name }: TitleProps) {
  return <p className="text-sm font-bold leading-[14px]">{name}</p>;
});

type StatusIndicatorProps = {
  isCompleted: boolean;
  isActive: boolean;
  nodeType?: NodeType;
};

function StatusIndicator({ isCompleted, isActive, nodeType = "action" }: StatusIndicatorProps) {
  if (isCompleted) {
    const bgColor =
      nodeType === "trigger"
        ? "bg-red-600/20"
        : nodeType === "condition"
          ? "bg-orange-600/20"
          : "bg-[#0066cc]/20";
    const strokeColor =
      nodeType === "trigger"
        ? "stroke-red-600"
        : nodeType === "condition"
          ? "stroke-orange-600"
          : "stroke-[#0066cc]";

    return (
      <div className="flex items-center justify-center relative w-5 h-5">
        <div className={cn("flex items-center justify-center rounded-full size-5", bgColor)}>
          <Check size={12} className={cn("stroke-[3px]", strokeColor)} />
        </div>
      </div>
    );
  }

  if (isActive) {
    const borderColor =
      nodeType === "trigger"
        ? "border-red-600"
        : nodeType === "condition"
          ? "border-orange-600"
          : "border-[#0066cc]";

    return (
      <div className="flex items-center justify-center w-5 h-5">
        <div className={cn("w-5 h-5 border-2 border-t-transparent rounded-full animate-spin", borderColor)} />
      </div>
    );
  }

  return null;
}

function NodeSeparator() {
  return <div className="h-px bg-[#e5e5e5] mb-1" />;
}

type ContentProps = {
  children: ReactNode;
};

function Content({ children }: ContentProps) {
  return (
    <div className="min-h-[32px] flex flex-col text-xs gap-1 pt-1 pb-1.5 justify-center max-w-full overflow-hidden">
      {children}
    </div>
  );
}

type WrapperProps = {
  children: ReactNode;
};

function Wrapper({ children }: WrapperProps) {
  return <div className="group">{children}</div>;
}

const OrderNode = {
  Wrapper: memo(Wrapper),
  Container: memo(Container),
  Header: memo(Header),
  Icon: memo(Icon),
  Title: memo(Title),
  StatusIndicator: memo(StatusIndicator),
  Separator: memo(NodeSeparator),
  Content: memo(Content),
};

export type { NodeType };
export default OrderNode;
