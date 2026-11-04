import './App.css'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import {distance} from 'fastest-levenshtein'
import {useState} from 'react'
import { byLength } from '@/lib/pseudowords'
import { bucketByDistance, select  } from './lib/distances'
import { type SelectionMode, type Metric} from './lib/distances'
import { HelpCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { type Filter, ToggleFilter, RangeFilter } from './lib/filters'

type Settings = { selection: SelectionMode; metric: Metric; lengthRange: number[]/* …future filters */ }


function getPsudoSentence(sentence: string, settings: Settings ): string{
  // split on each word and non-word, filter out empty strings, process only words
  const tokens = sentence.split(/([_\W])/).filter(n=>n)
  const result = tokens.map(token => {
    if (!token.match(/(\W+)/) && token.length >= settings.lengthRange[0] && token.length <= settings.lengthRange[1]){
      const buckets = bucketByDistance(token, byLength.get(token.length) ?? [token], distance)
      return select(buckets, settings.selection)
    }
    return token
  })
  return result.join("")
}

function App() {
  const distances = ["Levenshtein", "Damerau-Levenshtein", "Jaccard Index", "Sorensen-Dice"]
  const [userInput, setUserInput] = useState("Hello World!")
  const [result, setResult] = useState("")
  const FILTERS : Filter[] = [
    {id: "lengthRange", type: "range", label: "Effected Word Length", min: 3, max:14, tooltip: "Restrict the length of words that are made into psudowords"},
    {id: "distanceRange", type: "range", label: "Distance to match", min: 1, max:100, tooltip: "Match only words where the distance function returns a value within this range"},
    {id: "importantWordsOnly", type: "toggle", label: "Exchange content words only", tooltip: "Function words like 'and' 'then', 'him' will not be exchanged with psudowords"}
  ]
  const initValue = (f: Filter) => f.type === "range" ? [f.min, f.max] : false
  const [filterState, setFilterState] = useState(() =>
    Object.fromEntries(FILTERS.map(f => [f.id, initValue(f)]))
  )
  function update(id: string, value: boolean | number[]) {
    setFilterState(prev => ({ ...prev, [id]: value }))
  }
  const filterNodes = FILTERS.map((f)=> {
    switch (f.type) {
      case "range":
        const v = filterState[f.id]
        return(
        <RangeFilter
            id={f.id}
            key={f.id}
            label={f.label}
            tooltip={f.tooltip}
            min={f.min}
            max={f.max}
            value={Array.isArray(v) ? v : [f.min, f.max]}
            onValueChange={(v)=> update(f.id, v)}
          />
        )
      case "toggle":
       return <ToggleFilter id={f.id} key={f.id} label={f.label} tooltip={f.tooltip} checked={filterState[f.id]=== true} onCheckedChange={(v) => update(f.id, v)}/>
    }
  })
  // const derivedResult = getPsudoSentence(userInput, { mode: "closest" })

  return (
    <div className='flex flex-col p-5 gap-5'>
      <Textarea placeholder='Type a sentence here...' value={userInput} onChange={(e) => setUserInput(e.target.value)}></Textarea>
        <Combobox items={distances}>
          <ComboboxInput placeholder="Select a distance metric">
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item)=>(
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </ComboboxInput>
        </Combobox>
      <Button onClick={()=>{setResult(getPsudoSentence(userInput, { selection: { mode: "closest" },
                                                                    metric : distance,
                                                                    lengthRange: filterState["lengthRange"] as number[]}))}}>Calculate</Button>
      <p>{result}</p>
      <h1 className='text-xl'>Filters</h1>
      <div className='flex flex-col gap-2'>
        {filterNodes}
      </div>
    </div>
  )
}

export default App
