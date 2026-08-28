import {
  Archive,
  Bell,
  BriefcaseBusiness,
  Building2,
  CircleUserRound,
  House,
  Monitor,
  Settings,
  SquareUserRound,
  UserRoundKey,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon?: LucideIcon
  badge?: number
}

export type NavGroup = {
  label: string
  /** Tailwind text color class for the group label, matched to the Figma spec. */
  labelClassName: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    label: "Général",
    labelClassName: "text-[#3f3f46]",
    items: [
      { title: "Tableau de bord", href: "/", icon: House },
      { title: "Projets", href: "/projets", icon: BriefcaseBusiness },
      { title: "Dossiers", href: "/dossiers", icon: Archive },
      // badge is computed live from unread notifications in AppSidebar, not
      // set here — see the `href === "/notifications"` special-case there.
      { title: "Notifications", href: "/notifications", icon: Bell },
      { title: "Mon Profil", href: "/profil", icon: CircleUserRound },
    ],
  },
  {
    label: "Courriers",
    labelClassName: "text-[#4d7c0f]",
    items: [
      { title: "Courriers entrants", href: "/courriers/entrants" },
      { title: "Courriers sortants", href: "/courriers/sortants" },
      { title: "Approbation", href: "/courriers/approbation", badge: 9 },
      { title: "Enregistrements", href: "/courriers/enregistrements" },
      { title: "Affectations", href: "/courriers/affectations", badge: 6 },
    ],
  },
  {
    label: "Instructions",
    labelClassName: "text-[#bb4d00]",
    items: [{ title: "Tâches", href: "/instructions/taches", badge: 11 }],
  },
  {
    label: "Administration",
    labelClassName: "text-[#b91c1c]",
    items: [
      { title: "Sites", href: "/administration/sites", icon: Building2 },
      {
        title: "Correspondants",
        href: "/administration/correspondants",
        icon: SquareUserRound,
      },
      {
        title: "Rôles & permissions",
        href: "/administration/roles",
        icon: UserRoundKey,
      },
      {
        title: "Utilisateurs",
        href: "/administration/utilisateurs",
        icon: UsersRound,
      },
      {
        title: "Paramètres",
        href: "/administration/parametres",
        icon: Settings,
      },
      {
        title: "Journal d’audit",
        href: "/administration/journal-audit",
        icon: Monitor,
      },
    ],
  },
  {
    label: "Archives",
    labelClassName: "text-[#0f766e]",
    items: [
      { title: "Dossiers", href: "/archives/dossiers" },
      { title: "Courriers", href: "/archives/courriers" },
      { title: "Tâches", href: "/archives/taches" },
    ],
  },
]
