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
import { priorities, users } from "@/components/courriers/data"
import type { MailDeliverable } from "@/components/courriers/types"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { UserCombobox } from "@/components/shared/user-combobox"
import type { Mail } from "@/components/courriers/types"

export function MailAddTaskDialog({
  mail,
  open,
  onOpenChange,
}: {
  mail: Mail
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignee, setAssignee] = useState("")
  const [supervisor, setSupervisor] = useState("")
  const [parentTask, setParentTask] = useState("")
  const [priority, setPriority] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [deliverables, setDeliverables] = useState<MailDeliverable[]>([
    { title: "" },
  ])

  function handleAdd() {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[760px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title="Ajouter une tâche"
          subtitle={mail.folder}
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
              Description <span className="text-[#dc2626]">*</span>
            </label>
            <Textarea
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="ex. Relatif à tous les courriers associés à l'immeuble Krest Bonamoussadi"
              className="min-h-[60px] rounded border border-[#e4e4e7] px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Exécutant <span className="text-[#dc2626]">*</span>
            </label>
            <UserCombobox
              users={users}
              value={assignee}
              onChange={setAssignee}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Superviseur <span className="text-[#dc2626]">*</span>
            </label>
            <UserCombobox
              users={users}
              value={supervisor}
              onChange={setSupervisor}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Tâche parent (facultatif)
            </label>
            <Select
              value={parentTask}
              onValueChange={(v) => setParentTask(v ?? "")}
            >
              <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                {mail.tasks.map((task) => (
                  <SelectItem key={task.title} value={task.title}>
                    {task.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#18181b]">
              Priorité <span className="text-[#dc2626]">*</span>
            </label>
            <Select
              value={priority}
              onValueChange={(v) => setPriority(v ?? "")}
              required
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
              Délai <span className="text-[#dc2626]">*</span>
            </label>
            <Input
              type="date"
              required
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
                  Titre <span className="text-[#dc2626]">*</span>
                </label>
                <Input
                  required
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
