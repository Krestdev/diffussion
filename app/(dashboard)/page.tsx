import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MailTrendChart } from "@/components/dashboard/mail-trend-chart"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { NotificationsPanel } from "@/components/dashboard/notifications-panel"

export default function Page() {
  return (
    <>
      <DashboardHeader />
      <MetricCards />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_275px]">
        <MailTrendChart />
        <NotificationsPanel />
      </div>
    </>
  )
}
