# What is it
Project motivated by trying to create the lethologica state (on the tip of your tongue feeling) in a person when reading a sentence.

Basic Idea: Take a sentence and using some distance metric replace each word with the closest matching psudo-word

# Distance Metrics
## Orthographic
- Levenshtein distance
- Damerau-Levenshtein
- Jaccard Similarity
- Sørensen-Dice Coefficient

## Phonological (to explore)
- CMUdict (to explore)
- IPA converter (to explore)
use IPA to convert then distance metric on CMUdict but need to specify alphabet to run over

## Filters
- Same number of syllables
- Same first phoneme
- Same last phoneme
- Only important words (i.e., not 'it' 'and' 'or' 'I')
- Same stress pattern
- Closest match / random k-distance away

## Lexical Filters
- same affix


# Implementation
- Dictionary not big eough for a trie to be worth it atm



# NEXT:
You have the distances.ts file and now just wire up putting the words through and calling the functions from app.tsx
