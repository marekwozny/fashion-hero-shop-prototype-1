"use client"

import { useState } from "react"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WtpSurvey } from "@/components/seller/wtp-survey"
import { basicTrends } from "@/data/trend-dashboard"
import { cn } from "@/lib/utils"

type Tab = "basic" | "pro"
type ProView = "widgets" | "survey"

const FORECAST_ITEMS = [
  { name: "Mini skirt pleated", growth: "+31%" },
  { name: "Mokasyny loafers", growth: "+22%" },
  { name: "Oversized blazer", growth: "+14%" },
]

const BENCHMARK_ITEMS = [
  { name: "Cargo pants", yours: "189 PLN", median: "229 PLN", diff: "-40 PLN" },
  { name: "Mokasyny", yours: "299 PLN", median: "279 PLN", diff: "+20 PLN" },
  { name: "Boxy tee", yours: "89 PLN", median: "99 PLN", diff: "-10 PLN" },
]

const ALERT_ITEMS = [
  "Rywal obniżył cenę Mini skirt o 15% — Twoja cena jest teraz 18% wyższa.",
  "Ceny Mokasyn w kategorii wzrosły o 8% w ciągu 7 dni.",
]

const BAR_DATA = [
  { week: "T1", height: 30 },
  { week: "T2", height: 45 },
  { week: "T3", height: 50 },
  { week: "T4", height: 60 },
  { week: "T5", height: 85, peak: true },
  { week: "T6", height: 90, peak: true },
  { week: "T7", height: 65 },
  { week: "T8", height: 40 },
]

function LockedOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 backdrop-blur-sm bg-white/60 z-10">
      <Lock className="size-5 text-[#1A1A1A]" />
      <span className="text-xs font-semibold tracking-wide text-[#1A1A1A] uppercase">Pro</span>
    </div>
  )
}

function ForecastWidget() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-[#1A1A1A]">Prognoza 6-tygodniowa</p>
      <ul className="space-y-2">
        {FORECAST_ITEMS.map((item) => (
          <li key={item.name} className="flex items-center justify-between text-sm">
            <span className="text-gray-700">{item.name}</span>
            <span className="font-medium text-emerald-600">↑ szacowany wzrost {item.growth}</span>
          </li>
        ))}
      </ul>
      <LockedOverlay />
    </div>
  )
}

function BenchmarkWidget() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-[#1A1A1A]">Benchmark cen</p>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-gray-400 text-left">
            <th className="pb-2 font-medium">Produkt</th>
            <th className="pb-2 font-medium">Twoja cena</th>
            <th className="pb-2 font-medium">Mediana</th>
            <th className="pb-2 font-medium">Różnica</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {BENCHMARK_ITEMS.map((row) => (
            <tr key={row.name}>
              <td className="py-1.5 text-gray-700">{row.name}</td>
              <td className="py-1.5 text-gray-700">{row.yours}</td>
              <td className="py-1.5 text-gray-500">{row.median}</td>
              <td className={cn("py-1.5 font-medium", row.diff.startsWith("+") ? "text-emerald-600" : "text-red-500")}>
                {row.diff}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LockedOverlay />
    </div>
  )
}

function AlertsWidget() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-[#1A1A1A]">Alerty cenowe</p>
      <ul className="space-y-2.5">
        {ALERT_ITEMS.map((alert, i) => (
          <li key={i} className="flex gap-2 text-sm text-gray-700">
            <span className="mt-0.5 shrink-0 text-amber-500">●</span>
            {alert}
          </li>
        ))}
      </ul>
      <LockedOverlay />
    </div>
  )
}

function WindowWidget() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-[#1A1A1A]">Okno zakupowe</p>
      <div className="flex items-end gap-1 h-20">
        {BAR_DATA.map((bar) => (
          <div key={bar.week} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={cn("w-full rounded-t", bar.peak ? "bg-[#1A1A1A]" : "bg-gray-200")}
              style={{ height: `${bar.height}%` }}
            />
            <span className="text-[9px] text-gray-400">{bar.week}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-gray-400">Zaznaczono: szczyt sezonu</p>
      <LockedOverlay />
    </div>
  )
}

function BasicTab() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs font-semibold tracking-wider text-gray-400 uppercase">
            <th className="pb-3 pr-4">Produkt</th>
            <th className="pb-3 pr-4">Zmiana wolumenu</th>
            <th className="pb-3 pr-4">Kategoria</th>
            <th className="pb-3">Pozycja w kat.</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {basicTrends.map((trend) => (
            <tr key={trend.id} className="hover:bg-gray-50/60">
              <td className="py-3 pr-4 font-medium text-[#1A1A1A]">{trend.name}</td>
              <td className={cn("py-3 pr-4 font-semibold", trend.volumeChange >= 0 ? "text-emerald-600" : "text-red-500")}>
                {trend.volumeChange >= 0 ? "+" : ""}{trend.volumeChange}%
              </td>
              <td className="py-3 pr-4 text-gray-600">{trend.category}</td>
              <td className="py-3 text-gray-400">{trend.categoryRank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ProTab() {
  const [proView, setProView] = useState<ProView>("widgets")

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4 rounded-xl bg-[#1A1A1A] px-6 py-4">
        <p className="text-sm font-medium text-white">
          Odblokuj Pro od 99 PLN/mies — prognozy, benchmarki i alerty cenowe
        </p>
        <Button
          size="sm"
          className="shrink-0 bg-white text-[#1A1A1A] hover:bg-gray-100"
          onClick={() => setProView("survey")}
        >
          Odblokuj Pro
        </Button>
      </div>

      {proView === "survey" ? (
        <WtpSurvey onClose={() => setProView("widgets")} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ForecastWidget />
          <BenchmarkWidget />
          <AlertsWidget />
          <WindowWidget />
        </div>
      )}
    </div>
  )
}

export function TrendDashboard() {
  const [tab, setTab] = useState<Tab>("basic")

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-[#1A1A1A]">Trend Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Sprawdź co będzie się sprzedawać — dane odświeżane co tydzień.
          </p>
        </div>

        <div className="mb-6 inline-flex rounded-lg bg-gray-100 p-1">
          {(["basic", "pro"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                tab === t
                  ? "bg-white text-[#1A1A1A] shadow-sm border border-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {t === "basic" ? "Basic" : "Pro 🔒"}
            </button>
          ))}
        </div>

        <div>
          {tab === "basic" ? <BasicTab /> : <ProTab />}
        </div>

        <p className="mt-10 text-center text-xs text-gray-400">dane demonstracyjne</p>
      </div>
    </div>
  )
}
