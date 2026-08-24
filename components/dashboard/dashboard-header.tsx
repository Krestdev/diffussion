export function DashboardHeader({
  userFirstName = "Jason",
}: {
  userFirstName?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[40px] leading-none font-semibold tracking-tight text-foreground">
        Tableau de bord
      </h1>
      <p className="text-base text-muted-foreground">
        Bon retour {userFirstName},
      </p>
    </div>
  )
}
