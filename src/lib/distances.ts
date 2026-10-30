// distance metric is always smaller is better match

import { distance } from "fastest-levenshtein";

type Metric = (a: string, b: string) => number
type Selection =
  | { mode: 'closest'}
  | { mode: 'range'; min: number; max: number }
type DistanceBuckets = Map<number, string[]>

function bucketByDistance(word: string, candidates: string[], metric: Metric): DistanceBuckets {
  return Map.groupBy(candidates, (candidate : string) => metric(word, candidate))
}

function select(buckets: DistanceBuckets, selection: Selection) : string {
  buckets.delete(0)
  if (selection.mode === 'closest'){
    const minKey = Math.min(...buckets.keys())
    const minMatch = buckets.get(minKey)
    return minMatch[Math.floor(Math.random() * minMatch.length)]

  } else{
    // need to account for empty range
    const arr = []
    for (const [d, bucket] of buckets) {
      if (d >= selection.min && d <= selection.max) {
        arr.concat(bucket)
      }
    }
    return arr[Math.floor(Math.random() * arr.length)]
  }
}
