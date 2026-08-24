export type MailPriority = "urgent" | "normal" | "faible"

export type MailDeliverable = {
  title: string
}

export type MailTask = {
  title: string
  description: string
  assignee: string
  supervisor: string
  parentTask?: string
  priority: MailPriority
  dueDate: string
  deliverables: MailDeliverable[]
}

export type MailDocument = {
  name: string
  category: string
}

export type Mail = {
  id: string
  /** Table code, e.g. "M-01". */
  code: string
  subject: string
  folder: string
  priority: MailPriority
  registeredAt: string
  correspondent: string
  nature: string
  type: string
  originMail?: string
  completed: boolean
  documents: MailDocument[]
  tasks: MailTask[]
}
