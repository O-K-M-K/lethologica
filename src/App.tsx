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
import {closest} from 'fastest-levenshtein'
import {useState} from 'react'
import { byLength } from '@/lib/pseudowords'


// - Levenshtein distance
// - Damerau-Levenshtein
// - Jaccard Similarity
// - Sørensen-Dice Coefficient

function App() {
  const distances = ["Levenshtein", "Damerau-Levenshtein", "Jaccard Index", "Sorensen-Dice"]
  const [userInput, setUserInput] = useState("Hello World!")

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
      <Button onClick={()=>{console.log(userInput)}}>Calculate</Button>
    </div>
  )
}

export default App
