import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, onValueChange, ...props }, ref) => {
  // Initialize state with the default value (or [0] if not provided)
  const [currentValue, setCurrentValue] = React.useState(props.defaultValue || [0]);

  // Handler to update state and notify parent components
  const handleValueChange = (val: number[]) => {
    setCurrentValue(val);
    if (onValueChange) {
      onValueChange(val);
    }
  };

  return (
    <div className={cn("flex flex-row", className)}>
      <SliderPrimitive.Root
        ref={ref}
        className="relative flex w-full touch-none select-none items-center"
        {...props}
        onValueChange={handleValueChange}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/30">
          <SliderPrimitive.Range className="absolute h-full bg-white/80" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>

      <span className="text-sm font-bold ml-4">
        {currentValue[0]}
      </span>
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };