import Link from "next/link"
import {
  Archive,
  ContactRound,
  FileText,
  Mailbox,
  Route,
  type LucideIcon,
} from "lucide-react"

const cards: {
  href: string
  icon: LucideIcon
  gradient: string
  title: string
  subtitle: string
}[] = [
  {
    href: "/administration/parametres/categories-documents",
    icon: FileText,
    gradient: "from-[#f2cfde] to-[#dd6399]",
    title: "Catégories de documents",
    subtitle: "Gestion des catégories associées aux documents",
  },
  {
    href: "/administration/parametres/type-correspondant",
    icon: ContactRound,
    gradient: "from-[#f2e6cf] to-[#ddae63]",
    title: "Type de correspondant",
    subtitle: "Gestion type de correspondant des courriers",
  },
  {
    href: "/administration/parametres/type-dossier",
    icon: Archive,
    gradient: "from-[#e4cff2] to-[#9663dd]",
    title: "Type de dossier",
    subtitle: "Gestion des type de dossiers",
  },
  {
    href: "/administration/parametres/nature-courrier",
    icon: Mailbox,
    gradient: "from-[#cfecf2] to-[#63ddce]",
    title: "Nature de courrier",
    subtitle: "Gestion des natures de courrier",
  },
  {
    href: "/administration/parametres/circuits-validation",
    icon: Route,
    gradient: "from-[#cfd6f2] to-[#636ddd]",
    title: "Circuits de validation",
    subtitle: "Gestion des circuits de validation des courriers",
  },
]

export function ParametresCards() {
  return (
    <div className="grid w-full grid-cols-3 gap-5">
      {cards.map((card) => (
        <div
          key={card.href}
          className="flex flex-col items-start overflow-hidden rounded-lg border border-[#dfdfdf] bg-white"
        >
          <div
            className={`flex h-16 w-full items-center justify-center bg-gradient-to-b ${card.gradient}`}
          >
            <card.icon className="size-10 -rotate-45 text-white" />
          </div>
          <div className="flex w-full flex-col items-end gap-1 p-3">
            <p className="w-full text-xl font-semibold text-[#2f2f2f]">
              {card.title}
            </p>
            <p className="w-full text-sm font-medium text-[#b0b0b0]">
              {card.subtitle}
            </p>
            <Link
              href={card.href}
              className="flex h-9 items-center justify-center rounded-lg border border-[#dfdfdf] bg-white px-5 text-sm font-medium text-[#2f2f2f]"
            >
              Continuer
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
