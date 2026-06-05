"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type WtpSurveyProps = {
  onClose: () => void
}

type FormState = {
  price: string
  priority: string
  email: string
}

const PRICE_OPTIONS = ["49 PLN", "99 PLN", "199 PLN", "299+ PLN"]
const PRIORITY_OPTIONS = ["Prognoza trendów", "Benchmark cen", "Alerty cenowe"]

export function WtpSurvey({ onClose }: WtpSurveyProps) {
  const [form, setForm] = useState<FormState>({ price: "", priority: "", email: "" })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormState>>({})

  function validate(): boolean {
    const next: Partial<FormState> = {}
    if (!form.price) next.price = "Wybierz kwotę"
    if (!form.priority) next.priority = "Wybierz opcję"
    if (!form.email) next.email = "Podaj email"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <p className="text-lg font-medium text-[#1A1A1A]">
          Dziękujemy — damy znać gdy Pro będzie dostępne.
        </p>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Zamknij
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-6 py-8">
      <div>
        <p className="mb-1 text-sm font-medium text-[#1A1A1A]">
          Ile maksymalnie zapłacisz miesięcznie?
        </p>
        <select
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          className={cn(
            "w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A1A1A]/20",
            errors.price ? "border-red-400" : "border-gray-200"
          )}
        >
          <option value="">Wybierz...</option>
          {PRICE_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-[#1A1A1A]">
          Co jest dla ciebie najważniejsze?
        </p>
        <div className="space-y-2">
          {PRIORITY_OPTIONS.map((o) => (
            <label key={o} className="flex cursor-pointer items-center gap-2.5">
              <input
                type="radio"
                name="priority"
                value={o}
                checked={form.priority === o}
                onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
                className="accent-[#1A1A1A]"
              />
              <span className="text-sm text-gray-700">{o}</span>
            </label>
          ))}
        </div>
        {errors.priority && <p className="mt-1 text-xs text-red-500">{errors.priority}</p>}
      </div>

      <div>
        <p className="mb-1 text-sm font-medium text-[#1A1A1A]">
          Email — powiadomimy gdy Pro będzie dostępne
        </p>
        <input
          type="email"
          placeholder="twoj@email.pl"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className={cn(
            "w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A1A1A]/20",
            errors.email ? "border-red-400" : "border-gray-200"
          )}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      <Button type="submit" className="w-full">
        Wyślij
      </Button>
    </form>
  )
}
