"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { folderTypes, projects, sites, users } from "@/components/dossiers/data"
import { FolderAuthorizationsDialog } from "@/components/dossiers/folder-authorizations-dialog"
import { FolderDocumentsField } from "@/components/dossiers/folder-documents-field"
import type { Folder, FolderPermission } from "@/components/dossiers/types"
import { UserCombobox } from "@/components/shared/user-combobox"

function emptyPermissions(): FolderPermission[] {
  return users.map((user) => ({ user, canView: false, canEdit: false }))
}

export function FolderForm({
  mode,
  folder,
}: {
  mode: "create" | "edit"
  folder?: Folder
}) {
  const router = useRouter()

  const [title, setTitle] = useState(folder?.title ?? "")
  const [description, setDescription] = useState(folder?.description ?? "")
  const [type, setType] = useState(folder?.type ?? "")
  const [project, setProject] = useState(folder?.project ?? "")
  const [site, setSite] = useState(folder?.site ?? "")
  const [responsible, setResponsible] = useState(folder?.responsible ?? "")
  const [permissions, setPermissions] = useState<FolderPermission[]>(
    folder?.permissions ?? emptyPermissions()
  )
  const [files, setFiles] = useState(folder?.files ?? [])
  const [authorizationsOpen, setAuthorizationsOpen] = useState(false)

  const authorizedCount =
    mode === "edit"
      ? (folder?.authorizedCount ?? 0)
      : permissions.filter((permission) => permission.canView).length

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    router.push("/dossiers")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2"
    >
      <div className="flex flex-col gap-1.5 md:col-span-2">
        <label className="text-sm font-medium text-[#18181b]">
          Intitulé <span className="text-[#dc2626]">*</span>
        </label>
        <Textarea
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="ex. Immeuble Krest"
          className="min-h-[60px] rounded border border-[#e4e4e7] px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1.5 md:col-span-2">
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
          Type <span className="text-[#dc2626]">*</span>
        </label>
        <Select
          value={type}
          onValueChange={(value) => setType(value ?? "")}
          required
        >
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {folderTypes.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Projet <span className="text-[#dc2626]">*</span>
        </label>
        <Select
          value={project}
          onValueChange={(value) => setProject(value ?? "")}
          required
        >
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Site <span className="text-[#dc2626]">*</span>
        </label>
        <Select
          value={site}
          onValueChange={(value) => setSite(value ?? "")}
          required
        >
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {sites.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Responsable du dossier <span className="text-[#dc2626]">*</span>
        </label>
        <UserCombobox
          users={users}
          value={responsible}
          onChange={setResponsible}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">
          Autorisations <span className="text-[#dc2626]">*</span>
        </label>
        <button
          type="button"
          onClick={() => setAuthorizationsOpen(true)}
          className="flex h-9 items-center justify-between rounded border border-[#e4e4e7] px-4 text-sm text-[#2f2f2f]"
        >
          {mode === "edit" ? "Modifier" : "Définir"}
          {mode === "edit" ? (
            <ChevronDown className="size-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="size-5 text-muted-foreground" />
          )}
        </button>
        {mode === "edit" && authorizedCount > 0 && (
          <span className="w-fit rounded bg-[#f2cfde] px-1.5 py-1 text-xs font-medium text-[#2f2f2f]">
            {authorizedCount} Autorisés
          </span>
        )}
      </div>

      <FolderDocumentsField
        files={files}
        onRemove={(name) =>
          setFiles((current) => current.filter((file) => file.name !== name))
        }
      />

      <div className="md:col-span-2">
        <Button
          type="submit"
          className="h-11 rounded-lg bg-[#700032] px-5 text-base font-medium tracking-normal text-white normal-case hover:bg-[#700032]/90"
        >
          {mode === "edit"
            ? "Enregistrer les modifications"
            : "Créer le dossier"}
        </Button>
      </div>

      <FolderAuthorizationsDialog
        permissions={permissions}
        onPermissionsChange={setPermissions}
        open={authorizationsOpen}
        onOpenChange={setAuthorizationsOpen}
      />
    </form>
  )
}
