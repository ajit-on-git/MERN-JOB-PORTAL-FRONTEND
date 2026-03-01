import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-3", className)} // Slightly larger gap for LinkedIn style
      {...props}
      ref={ref}
    />
  )
})

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "flex items-center justify-center aspect-square h-5 w-5 rounded-full border-2 border-gray-400 text-gray-600 transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100 active:bg-gray-200", // Styling for LinkedIn-like radio buttons
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3 w-3 fill-blue-500" /> {/* LinkedIn-like blue color for indicator */}
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
