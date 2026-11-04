import { HelpCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'

export type Filter =
  | { id: string; type: 'range'; label: string; min: number; max: number; tooltip: string}
  | { id: string; type: 'toggle'; label: string; tooltip: string}

type RangeConfig  = Extract<Filter, { type: "range" }>   // just the range member(s)
type ToggleConfig = Extract<Filter, { type: "toggle" }>

type RangeFilterProps = Omit<RangeConfig, "type"> & {
  value: number[]
  onValueChange: (v: number[]) => void
}

type ToggleFilterProps = Omit<ToggleConfig, "type"> & {
  checked: boolean
  onCheckedChange: (c: boolean) => void
}

function FilterRow({ label, tooltip, children }: {
  label: string
  tooltip: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <p>{label}</p>
        <Tooltip>
          <TooltipTrigger><HelpCircle className="text-gray-500 h-4 aspect-square" /></TooltipTrigger>
          <TooltipContent side="right"><p>{tooltip}</p></TooltipContent>
        </Tooltip>
      </div>
      {children}
    </div>
  )
}

export function RangeFilter({ label, tooltip, min, max, value, onValueChange }: RangeFilterProps) {
  return (
    <FilterRow label={label} tooltip={tooltip}>
      <span className="text-sm text-muted-foreground">{value.join(", ")}</span>
      <div className="w-1/2">
        <Slider value={value} onValueChange={onValueChange} min={min} max={max} step={1} />
      </div>
    </FilterRow>
  )
}


export function ToggleFilter({ label, tooltip, checked, onCheckedChange}: ToggleFilterProps) {
  return (
    <FilterRow label={label} tooltip={tooltip}>
      <div className="w-1/2">
        <Checkbox className="size-6" checked={checked} onCheckedChange={onCheckedChange} />
      </div>
    </FilterRow>
  )
}
