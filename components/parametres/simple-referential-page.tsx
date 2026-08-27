"use client"

import { useMemo, useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query"
import { Ellipsis } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { DataTable } from "@/components/shared/data-table"
import { DialogGradientHeader } from "@/components/shared/dialog-gradient-header"
import { ListPagination } from "@/components/shared/list-pagination"
import { ListToolbar } from "@/components/shared/list-toolbar"
import { PageHeader } from "@/components/shared/page-header"
import { getApiErrorMessage } from "@/lib/apiError"

// Shared admin CRUD screen for the referentials that are just a "name" —
// Type de dossier, Nature de courrier, Type de correspondant. Category has
// extra fields (code, description, retentionMonths) and gets its own page.
export type SimpleReferential = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

type CreateMutation<T extends SimpleReferential> = UseMutationResult<
  T,
  unknown,
  { name: string }
>
type UpdateMutation<T extends SimpleReferential> = UseMutationResult<
  T,
  unknown,
  { id: string; body: { name?: string } }
>
type DeleteMutation = UseMutationResult<void, unknown, string>

function ReferentialFormDialog<T extends SimpleReferential>({
  item,
  singularLabel,
  open,
  onOpenChange,
  useCreate,
  useUpdate,
}: {
  item?: T
  singularLabel: string
  open: boolean
  onOpenChange: (open: boolean) => void
  useCreate: () => CreateMutation<T>
  useUpdate: () => UpdateMutation<T>
}) {
  const [name, setName] = useState(item?.name ?? "")
  const create = useCreate()
  const update = useUpdate()
  const isPending = create.isPending || update.isPending

  function handleOpenChange(next: boolean) {
    if (next) setName(item?.name ?? "")
    onOpenChange(next)
  }

  function handleSubmit() {
    const onSuccess = () => {
      toast.add({
        title: item ? `${singularLabel} modifié` : `${singularLabel} créé`,
        type: "success",
      })
      onOpenChange(false)
    }
    const onError = (error: unknown) =>
      toast.add({
        title: "Échec de l’enregistrement",
        description: getApiErrorMessage(error, "Veuillez réessayer."),
        type: "error",
      })

    if (item) {
      update.mutate({ id: item.id, body: { name } }, { onSuccess, onError })
    } else {
      create.mutate({ name }, { onSuccess, onError })
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[440px] gap-0 rounded-2xl p-4"
      >
        <DialogGradientHeader
          title={item ? `Modifier : ${item.name}` : `Nouveau ${singularLabel.toLowerCase()}`}
          subtitle={singularLabel}
          variant="secondary"
        />
        <div className="flex flex-col gap-1.5 py-4">
          <label className="text-sm font-medium text-[#18181b]">
            Nom <span className="text-[#dc2626]">*</span>
          </label>
          <Input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="ex. Étude technique"
            className="h-10 rounded border border-[#e4e4e7] px-3"
          />
        </div>
        <DialogFooter>
          <Button
            className="bg-[#0f5499] text-sm font-medium tracking-normal text-white normal-case hover:bg-[#0f5499]/90"
            disabled={isPending || !name.trim()}
            onClick={handleSubmit}
          >
            {item ? "Enregistrer" : "Créer"}
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

function ReferentialDeleteDialog({
  item,
  open,
  onOpenChange,
  useDelete,
}: {
  item: SimpleReferential
  open: boolean
  onOpenChange: (open: boolean) => void
  useDelete: () => DeleteMutation
}) {
  const deleteItem = useDelete()

  function handleConfirm() {
    deleteItem.mutate(item.id, {
      onSuccess: () => {
        toast.add({ title: "Supprimé", type: "success" })
        onOpenChange(false)
      },
      onError: (error) =>
        toast.add({
          title: "Échec de la suppression",
          description: getApiErrorMessage(error, "Veuillez réessayer."),
          type: "error",
        }),
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left text-xl font-semibold tracking-tight normal-case">
            {item.name}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Êtes-vous sûr de vouloir supprimer « {item.name} » ? Cette action
            est irréversible et échouera si l’élément est encore utilisé
            ailleurs.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-sm font-medium tracking-normal normal-case">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteItem.isPending}
            className="bg-destructive text-sm font-medium tracking-normal text-white normal-case hover:bg-destructive/90"
            onClick={(event) => {
              event.preventDefault()
              handleConfirm()
            }}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function ReferentialRowActions<T extends SimpleReferential>({
  item,
  singularLabel,
  useCreate,
  useUpdate,
  useDelete,
}: {
  item: T
  singularLabel: string
  useCreate: () => CreateMutation<T>
  useUpdate: () => UpdateMutation<T>
  useDelete: () => DeleteMutation
}) {
  const [openDialog, setOpenDialog] = useState<"edit" | "delete" | null>(null)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon-sm" className="rounded" />
          }
        >
          <Ellipsis className="size-4" />
          <span className="sr-only">Actions</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpenDialog("edit")}>
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenDialog("delete")}
          >
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ReferentialFormDialog
        item={item}
        singularLabel={singularLabel}
        open={openDialog === "edit"}
        onOpenChange={(open) => setOpenDialog(open ? "edit" : null)}
        useCreate={useCreate}
        useUpdate={useUpdate}
      />
      <ReferentialDeleteDialog
        item={item}
        open={openDialog === "delete"}
        onOpenChange={(open) => setOpenDialog(open ? "delete" : null)}
        useDelete={useDelete}
      />
    </>
  )
}

export function SimpleReferentialPage<T extends SimpleReferential>({
  title,
  subtitle,
  singularLabel,
  emptyMessage,
  useList,
  useCreate,
  useUpdate,
  useDelete,
}: {
  title: string
  subtitle: string
  singularLabel: string
  emptyMessage: string
  useList: () => UseQueryResult<T[]>
  useCreate: () => CreateMutation<T>
  useUpdate: () => UpdateMutation<T>
  useDelete: () => DeleteMutation
}) {
  const { data, isLoading } = useList()
  const [createOpen, setCreateOpen] = useState(false)

  const columns = useMemo<ColumnDef<T>[]>(
    () => [
      { accessorKey: "name", header: "Nom" },
      {
        accessorKey: "createdAt",
        header: "Créé le",
        cell: ({ row }) =>
          new Date(row.original.createdAt).toLocaleDateString("fr-FR"),
      },
      {
        id: "actions",
        header: "Actions",
        meta: { align: "right" },
        cell: ({ row }) => (
          <ReferentialRowActions
            item={row.original}
            singularLabel={singularLabel}
            useCreate={useCreate}
            useUpdate={useUpdate}
            useDelete={useDelete}
          />
        ),
      },
    ],
    [singularLabel, useCreate, useUpdate, useDelete]
  )

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        backHref="/administration/parametres"
        variant="secondary"
        action={
          <Button
            className="h-11 w-fit rounded-lg bg-white px-5 text-base font-medium text-[#2f2f2f] normal-case tracking-normal hover:bg-white/90"
            onClick={() => setCreateOpen(true)}
          >
            {`Nouveau ${singularLabel.toLowerCase()}`}
          </Button>
        }
      />
      <ListToolbar showFilters={false} />
      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        emptyMessage={emptyMessage}
      />
      <ListPagination total={data?.length ?? 0} page={1} pageCount={1} />

      <ReferentialFormDialog
        singularLabel={singularLabel}
        open={createOpen}
        onOpenChange={setCreateOpen}
        useCreate={useCreate}
        useUpdate={useUpdate}
      />
    </>
  )
}
