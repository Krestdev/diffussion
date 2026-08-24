"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { PageHeader } from "@/components/shared/page-header"
import { MailDocumentsStep } from "@/components/courriers/mail-documents-step"
import { MailInfoStep } from "@/components/courriers/mail-info-step"
import { MailStepper } from "@/components/courriers/mail-stepper"
import type { Mail } from "@/components/courriers/types"

export function MailWizard({
  mode,
  mail,
}: {
  mode: "create" | "edit"
  mail?: Mail
}) {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)

  return (
    <>
      <PageHeader
        variant="secondary"
        backHref="/courriers/entrants"
        title={
          mode === "edit" ? "Modifier un courrier" : "Enregistrer un courrier"
        }
        subtitle={
          mode === "edit"
            ? "Mettre à jour les informations relatives à un courrier"
            : "Complétez le formulaire pour enregistrer un nouveau courrier"
        }
      />
      <div className="flex flex-col gap-8 sm:flex-row">
        <MailStepper currentStep={step} />
        {step === 1 ? (
          <MailInfoStep mail={mail} onNext={() => setStep(2)} />
        ) : (
          <MailDocumentsStep
            onPrevious={() => setStep(1)}
            onSubmit={() => router.push("/courriers/entrants")}
          />
        )}
      </div>
    </>
  )
}
