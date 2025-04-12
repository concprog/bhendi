import { cn } from "@/lib/utils";
import React from "react";

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
  offset?: number; // Add this line - offset in degrees
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  offset = 0, // Add this line
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  return (
    <div className="relative h-full w-full">
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-full w-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {React.Children.map(children, (child, index) => {
          const totalChildren = React.Children.count(children);
          // Calculate angle based on index if no rotation is provided
          const defaultAngle = (360 / totalChildren) * index;
          // Use provided rotation or default
          const rotation =
            child.props?.rotate !== undefined
              ? child.props.rotate
              : defaultAngle;

          return (
            <div
              style={{
                "--duration": `${calculatedDuration}s`,
                "--radius": `${radius}px`,
                "--angle": `${rotation}deg`,
                "--icon-size": `${iconSize}px`,
              } as React.CSSProperties}
              className={cn(
                "absolute flex h-[var(--icon-size)] w-[var(--icon-size)] items-center justify-center rounded-full",
                "animate-orbit",
                { "[animation-direction:reverse]": reverse },
                className
              )}
              {...props}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
