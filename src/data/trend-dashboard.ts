export type BasicTrend = {
  id: string
  name: string
  volumeChange: number
  category: string
  categoryRank: string
}

export type ProWidget = "forecast" | "benchmark" | "alerts" | "window"

export const basicTrends: BasicTrend[] = [
  { id: "t1", name: "Mokasyny loafers", volumeChange: +18, category: "Buty casual", categoryRank: "top 8%" },
  { id: "t2", name: "Oversized blazer", volumeChange: +11, category: "Kurtki", categoryRank: "top 22%" },
  { id: "t3", name: "Cargo pants wide leg", volumeChange: +9, category: "Spodnie", categoryRank: "top 15%" },
  { id: "t4", name: "Boxy tee vintage wash", volumeChange: -4, category: "T-shirty", categoryRank: "top 34%" },
  { id: "t5", name: "Mini skirt pleated", volumeChange: +24, category: "Spódnice", categoryRank: "top 5%" },
]
