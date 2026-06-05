import type { Metadata } from "next"
import { TrendDashboard } from "@/components/seller/trend-dashboard"

export const metadata: Metadata = {
  title: "Trend Dashboard — FashionHero Seller Tools",
  description: "Sprawdź co będzie się sprzedawać. Panel analityczny dla sprzedawców FashionHero.",
}

export default function TrendDashboardPage() {
  return <TrendDashboard />
}
