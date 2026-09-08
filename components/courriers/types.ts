// UI-local shape collected across the two-step registration wizard, before
// being turned into a real CourrierPayload on final submit.
export type MailDraft = {
  subject: string
  dossierId: string
  correspondentId: string
  natureId: string
  reference: string
  // Circuit owner (10.6), settable at creation only — see CourrierPayload.
  ownerId: string
  // Self-reference: this courrier written in response to another one.
  respondsToId: string
}

export function emptyMailDraft(): MailDraft {
  return {
    subject: "",
    dossierId: "",
    correspondentId: "",
    natureId: "",
    reference: "",
    ownerId: "",
    respondsToId: "",
  }
}
