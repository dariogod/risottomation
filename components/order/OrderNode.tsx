import { memo, ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const NODE_WIDTH = 300;
const MIN_NODE_HEIGHT = 90;

type ContainerProps = {
  children: ReactNode;
  selected: boolean;
  hovering: boolean;
  highlightNode: boolean;
  isCompleted: boolean;
  isActive: boolean;
  className?: string;
};

function Container({
  children,
  selected,
  hovering,
  highlightNode,
  isCompleted,
  isActive,
  className,
}: ContainerProps) {
  const borderColor = isActive || isCompleted ? "border-[#0066cc]" : "border-[#e5e5e5]";
  const hoverBorder = hovering && !selected && !highlightNode && !isCompleted ? "border-[#0066cc]/40" : "";

  return (
    <div
      className={cn(
        "relative bg-white px-4 py-1 border cursor-pointer rounded-sm",
        borderColor,
        hoverBorder,
        selected && "opacity-95",
        (selected || highlightNode) && "border-[#0066cc]",
        className
      )}
      style={{ width: `${NODE_WIDTH}px`, minHeight: `${MIN_NODE_HEIGHT}px`, height: "auto" }}
    >
      {children}
      {selected && <div className="absolute -z-10 -inset-[2px] rounded-sm bg-[#0066cc]/20" />}
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
};

const Icon = memo(function Icon({ icon }: IconProps) {
  return (
    <div className="shrink-0 size-6 flex items-center justify-center rounded-sm bg-[#0066cc]/10">
      {icon}
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
};

function StatusIndicator({ isCompleted, isActive }: StatusIndicatorProps) {
  if (isCompleted) {
    return (
      <div className="flex-center relative">
        <div className="absolute flex-center rounded-full bg-[#0066cc]/20 size-5">
          <Check size={12} className="stroke-[#0066cc] stroke-[3px]" />
        </div>
      </div>
    );
  }

  if (isActive) {
    return (
      <div className="flex-center relative">
        <div className="w-5 h-5 border-2 border-[#0066cc] border-t-transparent rounded-full animate-spin" />
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

export default OrderNode;
