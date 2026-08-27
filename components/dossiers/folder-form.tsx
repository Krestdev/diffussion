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
import { toast } from "@/components/ui/toast"
import { getApiErrorMessage } from "@/lib/apiError"
import { FolderAuthorizationsDialog } from "@/components/dossiers/folder-authorizations-dialog"
import { DocumentUploadField } from "@/components/shared/document-upload-field"
import type { FolderPermissionEntry } from "@/components/dossiers/types"
import { UserCombobox } from "@/components/shared/user-combobox"
import { useAdminUsers } from "@/hooks/adminUser/useAdminUser"
import type { AppUser } from "@/hooks/adminUser/type"
import { useDossierTypes } from "@/hooks/dossierType/useDossierType"
import type { DossierType } from "@/hooks/dossierType/type"
import { useUploadDocument } from "@/hooks/document/useDocument"
import { useProjects } from "@/hooks/project/useProject"
import type { Project } from "@/hooks/project/type"
import { useSites } from "@/hooks/site/useSite"
import type { Site } from "@/hooks/site/type"
import {
  useCreateDossier,
  useDossierAccess,
  useSetDossierAccess,
  useUpdateDossier,
} from "@/hooks/dossier/useDossier"
import type { Dossier, DossierAccessEntry } from "@/hooks/dossier/type"

export function FolderForm({
  mode,
  folder,
}: {
  mode: "create" | "edit"
  folder?: Dossier
}) {
  const { data: types } = useDossierTypes()
  const { data: projects } = useProjects()
  const { data: sites } = useSites()
  const { data: users } = useAdminUsers()
  const { data: existingAccess } = useDossierAccess(
    mode === "edit" && folder ? folder.id : ""
  )

  // Gate the actual form on every reference list it needs so the fields
  // below (and the permissions grid's initial state) can be computed once,
  // synchronously, from complete data — no effect-driven state sync.
  const ready = Boolean(users) && (mode === "create" || Boolean(existingAccess))
  if (!ready) {
    return <p className="text-sm text-[#71717a]">Chargement…</p>
  }

  return (
    <FolderFormFields
      mode={mode}
      folder={folder}
      types={types ?? []}
      projects={projects ?? []}
      sites={sites ?? []}
      users={users!}
      existingAccess={existingAccess ?? []}
    />
  )
}

function FolderFormFields({
  mode,
  folder,
  types,
  projects,
  sites,
  users,
  existingAccess,
}: {
  mode: "create" | "edit"
  folder?: Dossier
  types: DossierType[]
  projects: Project[]
  sites: Site[]
  users: AppUser[]
  existingAccess: DossierAccessEntry[]
}) {
  const router = useRouter()

  const [title, setTitle] = useState(folder?.title ?? "")
  const [description, setDescription] = useState(folder?.description ?? "")
  const [typeId, setTypeId] = useState(folder?.typeId ?? "")
  const [projectId, setProjectId] = useState(folder?.projectId ?? "")
  const [siteId, setSiteId] = useState(folder?.siteId ?? "")
  const [responsibleName, setResponsibleName] = useState(
    folder?.responsible?.name ?? ""
  )
  const [permissions, setPermissions] = useState<FolderPermissionEntry[]>(
    () => {
      const grants = new Map(
        existingAccess.map((entry) => [entry.userId, entry])
      )
      return users.map((user) => {
        const grant = grants.get(user.id)
        return {
          userId: user.id,
          userName: user.name,
          canView: grant?.canView ?? false,
          canEdit: grant?.canEdit ?? false,
        }
      })
    }
  )
  const [files, setFiles] = useState<File[]>([])
  const [authorizationsOpen, setAuthorizationsOpen] = useState(false)

  const createDossier = useCreateDossier()
  const updateDossier = useUpdateDossier()
  const setAccess = useSetDossierAccess()
  const uploadDocument = useUploadDocument()

  const authorizedCount = permissions.filter((p) => p.canView).length

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const responsible = users.find((user) => user.name === responsibleName)
    const payload = {
      title,
      description,
      typeId: typeId || undefined,
      projectId: projectId || undefined,
      siteId,
      responsibleId: responsible?.id,
    }

    const entries = permissions
      .filter((p) => p.canView || p.canEdit)
      .map(({ userId, canView, canEdit }) => ({ userId, canView, canEdit }))

    try {
      const dossier =
        mode === "edit" && folder
          ? await updateDossier.mutateAsync({ id: folder.id, body: payload })
          : await createDossier.mutateAsync(payload)

      await setAccess.mutateAsync({ id: dossier.id, body: { entries } })

      if (files.length > 0) {
        const results = await Promise.allSettled(
          files.map((file) =>
            uploadDocument.mutateAsync({ file, dossierId: dossier.id })
          )
        )
        const failed = results.filter((r) => r.status === "rejected").length
        if (failed > 0) {
          toast.add({
            title: `${failed} document(s) n'ont pas pu être téléversés`,
            description: "Vous pourrez réessayer depuis le dossier.",
            type: "error",
          })
        }
      }

      toast.add({
        title: mode === "edit" ? "Dossier modifié" : "Dossier créé",
        type: "success",
      })
      router.push(mode === "edit" ? `/dossiers/${dossier.id}` : "/dossiers")
    } catch (error) {
      toast.add({
        title: "Échec de l'enregistrement",
        description: getApiErrorMessage(error, "Veuillez réessayer."),
        type: "error",
      })
    }
  }

  const isPending =
    createDossier.isPending ||
    updateDossier.isPending ||
    setAccess.isPending ||
    uploadDocument.isPending

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
          value={typeId}
          onValueChange={(value) => setTypeId(value ?? "")}
          required
        >
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {types.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#18181b]">Projet</label>
        <Select
          value={projectId}
          onValueChange={(value) => setProjectId(value ?? "")}
        >
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
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
          value={siteId}
          onValueChange={(value) => setSiteId(value ?? "")}
          required
        >
          <SelectTrigger className="h-9 w-full rounded border border-[#e4e4e7] px-4">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            {sites.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
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
          users={users.map((user) => user.name)}
          value={responsibleName}
          onChange={setResponsibleName}
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
        {authorizedCount > 0 && (
          <span className="w-fit rounded bg-[#f2cfde] px-1.5 py-1 text-xs font-medium text-[#2f2f2f]">
            {authorizedCount} Autorisés
          </span>
        )}
      </div>

      <div className="md:col-span-2">
        <DocumentUploadField
          files={files}
          onFilesAdded={(added) =>
            setFiles((current) => [...current, ...added])
          }
          onRemove={(file) =>
            setFiles((current) => current.filter((item) => item !== file))
          }
        />
      </div>

      <div className="md:col-span-2">
        <Button
          type="submit"
          disabled={isPending}
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
