import { OutgoingMailForm } from "@/components/courriers-sortants/outgoing-mail-form"
import { OutgoingMailFormHeader } from "@/components/courriers-sortants/outgoing-mail-form-header"

export default function Page() {
  return (
    <>
      <OutgoingMailFormHeader mode="create" />
      <OutgoingMailForm mode="create" />
    </>
  )
}
