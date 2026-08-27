import { OutgoingMailsBrowser } from "@/components/courriers-sortants/outgoing-mails-browser"
import { OutgoingMailsMetrics } from "@/components/courriers-sortants/outgoing-mails-metrics"
import { OutgoingMailsPageHeader } from "@/components/courriers-sortants/outgoing-mails-page-header"

export default function Page() {
  return (
    <>
      <OutgoingMailsPageHeader />
      <OutgoingMailsMetrics />
      <OutgoingMailsBrowser />
    </>
  )
}
