const files = import.meta.glob('../pseudowords/*.tsv',{
  query: '?raw',
  import: 'default',
  eager: true, //load all now
})

export const byLength = new Map<number, string[]>()

for (const [path, text] of Object.entries(files)) {
  const length = Number(path.match(/\/(\d+)-/)?.[1])
  const words = text.split('\n').slice(1).map(w=>w.trim()).filter(Boolean)
  byLength.set(length, words)
}
