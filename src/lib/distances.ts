// distance metric is always smaller is better match


export type Metric = (a: string, b: string) => number
export type SelectionMode =
  | { mode: 'closest'}
  | { mode: 'range'; min: number; max: number }


export type DistanceBuckets = Map<number, string[]>

export function bucketByDistance(word: string, candidates: string[], metric: Metric): DistanceBuckets {
  // what to do if empty candidates
  return Map.groupBy(candidates, (candidate : string) => metric(word, candidate))
}


export function select(buckets: DistanceBuckets, selection: SelectionMode) : string {
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
        //arr.concat(bucket)
        arr.push(...bucket)
      }
    }
    return arr[Math.floor(Math.random() * arr.length)]
  }
}
