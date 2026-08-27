import { Route } from "lucide-react"

// Placeholder pending the Circuits phase: Circuit/CircuitStep exist as bare
// CRUD templates on the backend, but there's no CircuitInstance engine yet
// (nothing advances an instance through steps or tracks a "current step").
// This panel is here so every detail page has the section the design calls
// for, without pretending a circuit is actually running.
export function CircuitStubPanel() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#dfdfdf] p-4">
      <div className="flex items-center gap-2">
        <Route className="size-5 text-[#52525b]" />
        <p className="text-base font-semibold text-[#18181b]">
          Circuit en cours
        </p>
      </div>
      <p className="text-sm text-[#71717a]">
        Aucun circuit de validation actif — le suivi d&apos;étapes n&apos;est
        pas encore disponible.
      </p>
    </div>
  )
}
