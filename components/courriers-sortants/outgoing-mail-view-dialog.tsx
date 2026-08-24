import {
  Archive,
  Asterisk,
  Calendar,
  CircleHelp,
  FileText,
  Hash,
  Map,
  SquareUserRound,
  UserRound,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { StatusBadge } from "@/components/courriers-sortants/status-badge"
import type { OutgoingMail } from "@/components/courriers-sortants/types"

function InfoRow({
  icon: Icon,
  label,
  value,
  span,
}: {
  icon: LucideIcon
  label: string
  value: React.ReactNode
  span?: boolean
}) {
  return (
    <div className={span ? "col-span-2 flex gap-3" : "flex gap-3"}>
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f4f4f5]">
        <Icon className="size-6 text-[#52525b]" />
      </div>
      <div>
        <p className="text-sm text-[#52525b]">{label}</p>
        <div className="text-sm font-medium text-[#18181b]">{value}</div>
      </div>
    </div>
  )
}

export function OutgoingMailViewDialog({
  mail,
  open,
  onOpenChange,
}: {
  mail: OutgoingMail
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[760px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={mail.subject}
          subtitle="Courrier sortant"
        />
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-4">
          <InfoRow
            icon={Hash}
            label="Référence"
            value={
              <span className="rounded bg-[#f2cfde] px-1.5 py-0.5 text-[#2f2f2f]">
                {mail.referenceNumber}
              </span>
            }
          />
          <InfoRow
            icon={SquareUserRound}
            label="Correspondant"
            value={mail.correspondent}
          />
          <InfoRow icon={Asterisk} label="Nature" value={mail.nature} />
          <InfoRow icon={Archive} label="Dossier" value={mail.folder} />
          <InfoRow icon={Map} label="Site" value={mail.site} />
          <InfoRow
            icon={CircleHelp}
            label="Statut"
            value={<StatusBadge status={mail.status} />}
          />
          <InfoRow icon={UserRound} label="Créé par" value={mail.createdBy} />
          <InfoRow icon={Calendar} label="Créé le" value={mail.registeredAt} />
          <InfoRow icon={Calendar} label="Modifié le" value={mail.updatedAt} />
          <InfoRow
            icon={FileText}
            label="Documents joints"
            value={
              <ul className="flex flex-col gap-2">
                {mail.documents.map((document) => (
                  <li key={document.name} className="flex items-center gap-2">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded bg-[#dc2626] text-[10px] font-bold text-white">
                      PDF
                    </span>
                    <span>
                      <p className="font-medium text-[#18181b]">
                        {document.name}
                      </p>
                      <p className="text-xs font-normal text-[#a1a1aa]">
                        {document.type}
                      </p>
                    </span>
                  </li>
                ))}
              </ul>
            }
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="text-sm font-medium tracking-normal normal-case"
            onClick={() => onOpenChange(false)}
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
