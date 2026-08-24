import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Notification = {
  title: string
  time: string
  variant?: "default" | "unread" | "urgent"
}

const notifications: Notification[] = [
  { title: "Nouveau courrier !", time: "Il y’a 20 mins", variant: "unread" },
  { title: "Nouveau courrier !", time: "Hier" },
  { title: "Courrier en retard !", time: "Hier", variant: "urgent" },
]

export function NotificationsPanel() {
  return (
    <Card className="gap-3 rounded-xl p-3 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)]">
      <p className="px-1 text-base font-medium text-[#2f2f2f]">Notifications</p>
      <ul className="flex flex-col">
        {notifications.map((notification, index) => (
          <li
            key={`${notification.title}-${index}`}
            className={cn(
              "flex flex-col gap-1 px-2 py-1.5",
              notification.variant === "unread" && "bg-[#fafafa]",
              notification.variant === "urgent" && "bg-[#fee2e2]"
            )}
          >
            <p
              className={cn(
                "text-sm font-medium",
                notification.variant === "urgent"
                  ? "text-[#b91c1c]"
                  : "text-[#2f2f2f]"
              )}
            >
              {notification.title}
            </p>
            <p className="text-xs text-[#52525b]">{notification.time}</p>
          </li>
        ))}
      </ul>
    </Card>
  )
}
