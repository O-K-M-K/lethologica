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
import {distance} from 'fastest-levenshtein'


// - Levenshtein distance
// - Damerau-Levenshtein
// - Jaccard Similarity
// - Sørensen-Dice Coefficient

function App() {
  const distances = ["Levenshtein", "Damerau-Levenshtein", "Jaccard Index", "Sorensen-Dice"]

  return (
    <div className='flex flex-col p-5 gap-5'>
      <Textarea placeholder='Type a sentence here.'></Textarea>
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
      <Button>Calculate</Button>
    </div>
  )
}

export default App
