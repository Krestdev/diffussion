"use client"

import { useState } from "react"
import { CirclePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { getApiErrorMessage } from "@/lib/apiError"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { UserCombobox } from "@/components/shared/user-combobox"
import { useAdminUsers } from "@/hooks/adminUser/useAdminUser"
import { useCreateDeliverable } from "@/hooks/deliverable/useDeliverable"
import {
  useCreateInstruction,
  useInstructions,
} from "@/hooks/instruction/useInstruction"
import type { InstructionPriority } from "@/hooks/instruction/type"

type DeliverableDraft = { title: string }

const priorities: { value: InstructionPriority; label: string }[] = [
  { value: "URGENT", label: "Urgent" },
  { value: "NORMAL", label: "Normal" },
  { value: "LOW", label: "Faible" },
]

// Generic enough to raise a task from any context that has a dossier — a
// courrier (pass courrierId too) or, when raised straight from a document
// (which has no task relation of its own in the schema), the document's
// parent dossier alone.
export function AddTaskDialog({
  dossierId,
  courrierId,
  contextLabel,
  open,
  onOpenChange,
}: {
  dossierId: string
  courrierId?: string
  contextLabel: string
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { data: users } = useAdminUsers()
  const userNames = users?.map((user) => user.name) ?? []
  // Candidate parent tasks: other tasks already in this dossier — a task
  // can't depend on itself, and it doesn't exist yet at this point anyway.
  const { data: dossierTasks } = useInstructions({ dossierId, take: 100 })
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignee, setAssignee] = useState("")
  const [supervisor, setSupervisor] = useState("")
  const [priority, setPriority] = useState<InstructionPriority | "">("")
  const [dueDate, setDueDate] = useState("")
  const [parentTaskId, setParentTaskId] = useState("")
  const [deliverables, setDeliverables] = useState<DeliverableDraft[]>([
    { title: "" },
  ])

  const createInstruction = useCreateInstruction()
  const createDeliverable = useCreateDeliverable()
  const isPending = createInstruction.isPending || createDeliverable.isPending

  function reset() {
    setTitle("")
    setDescription("")
    setAssignee("")
    setSupervisor("")
    setPriority("")
    setDueDate("")
    setParentTaskId("")
    setDeliverables([{ title: "" }])
  }

  async function handleAdd() {
    const executantId = users?.find((user) => user.name === assignee)?.id
    const superviseurId = users?.find((user) => user.name === supervisor)?.id

    try {
      const instruction = await createInstruction.mutateAsync({
        dossierId,
        courrierId,
        title,
        description: description || undefined,
        priority: priority || undefined,
        dueDate: dueDate || undefined,
        executantIds: executantId ? [executantId] : undefined,
        superviseurId,
        dependsOnId: parentTaskId || undefined,
      })

      const titles = deliverables
        .map((deliverable) => deliverable.title.trim())
        .filter(Boolean)
      if (titles.length > 0) {
        const results = await Promise.allSettled(
          titles.map((deliverableTitle) =>
            createDeliverable.mutateAsync({
              instructionId: instruction.id,
              title: deliverableTitle,
            })
          )
        )
        const failed = results.filter((r) => r.status === "rejected").length
        if (failed > 0) {
          toast.add({
            title: `${failed} livrable(s) n'ont pas pu être créés`,
            description: "Vous pourrez les ajouter depuis la tâche.",
            type: "error",
          })
        }
      }

      toast.add({ title: "Tâche créée", type: "success" })
      reset()
      onOpenChange(false)
    } catch (error) {
      toast.add({
        title: "Échec de la création",
        description: getApiErrorMessage(error, "Veuillez réessayer."),
        type: "error",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[760px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title="Ajouter une tâche"
          subtitle={contextLabel}
          variant="secondary"
        />
        <div className="grid grid-cols-2 gap-3 py-3">
          <div className="col-span-2 flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Titre <span className="text-[#dc2626]">*</span>
            </label>
            <Input
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="ex. Générer le rapport de mission"
              className="min-h-10 rounded border border-[#e4e4e7] px-3 py-2"
            />
          </div>

          <div className="col-span-2 flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="ex. Relatif à tous les courriers associés à l'immeuble Krest Bonamoussadi"
              className="min-h-[60px] rounded border border-[#e4e4e7] px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Exécutant
            </label>
            <UserCombobox
              users={userNames}
              value={assignee}
              onChange={setAssignee}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Superviseur
            </label>
            <UserCombobox
              users={userNames}
              value={supervisor}
              onChange={setSupervisor}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Tâche parent (facultatif)
            </label>
            <Select
              value={parentTaskId}
              onValueChange={(v) => setParentTaskId(v ?? "")}
            >
              <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                {dossierTasks?.data.map((task) => (
                  <SelectItem key={task.id} value={task.id}>
                    {task.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Priorité
            </label>
            <Select
              value={priority}
              onValueChange={(v) => setPriority((v as InstructionPriority) ?? "")}
            >
              <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Délai
            </label>
            <Input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="h-9 rounded border border-[#e4e4e7] px-4"
            />
          </div>

          <div className="col-span-2 flex flex-col gap-2 rounded-md border border-[#dfdfdf] p-3">
            {deliverables.map((deliverable, index) => (
              <div key={index} className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-black">
                  Livrable {index + 1}
                </p>
                <label className="text-sm font-medium text-[#18181b]">
                  Titre
                </label>
                <Input
                  value={deliverable.title}
                  onChange={(event) =>
                    setDeliverables((current) =>
                      current.map((item, i) =>
                        i === index ? { title: event.target.value } : item
                      )
                    )
                  }
                  placeholder="ex. Générer le rapport de mission"
                  className="h-10 rounded border border-[#e4e4e7] px-3"
                />
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-fit text-sm font-medium tracking-normal normal-case"
              onClick={() =>
                setDeliverables((current) => [...current, { title: "" }])
              }
            >
              Ajouter un livrable
              <CirclePlus className="size-5" />
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-[#700032] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
            disabled={isPending || !title}
            onClick={handleAdd}
          >
            Ajouter
          </Button>
          <Button
            variant="outline"
            className="text-sm font-medium tracking-normal normal-case"
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
