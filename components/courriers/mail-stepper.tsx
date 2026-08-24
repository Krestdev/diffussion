import { cn } from "@/lib/utils"

const steps = ["Informations générales", "Documents"] as const

export function MailStepper({ currentStep }: { currentStep: 1 | 2 }) {
  return (
    <div className="flex w-70 shrink-0 flex-col gap-4">
      <div>
        <p className="text-xl font-semibold text-black">
          Enregistrement d’un courrier
        </p>
        <p className="text-sm text-[#2f2f2f]">
          Étape {currentStep} sur {steps.length}
        </p>
      </div>
      <div className="h-1 w-full rounded-full bg-[#f4f4f5]">
        <div
          className="h-1 rounded-full bg-[#700032] transition-all"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isDone = stepNumber < currentStep

          return (
            <div key={step} className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-medium",
                  isActive || isDone
                    ? "border-[#700032] bg-[#700032] text-white"
                    : "border-[#e4e4e7] text-[#a1a1aa]"
                )}
              >
                {stepNumber}
              </div>
              <p
                className={cn(
                  "text-sm",
                  isActive ? "font-medium text-[#18181b]" : "text-[#71717a]"
                )}
              >
                {step}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
