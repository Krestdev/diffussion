import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { sites } from "@/components/sites/data"
import { SiteRowActions } from "@/components/sites/site-row-actions"
import { SiteStatusBadge } from "@/components/sites/site-status-badge"

export function SitesTable() {
  return (
    <Table className="border border-[#dfdfdf]">
      <TableHeader>
        <TableRow className="bg-[#f4f4f5] hover:bg-[#f4f4f5]">
          <TableHead className="border border-[#dfdfdf] normal-case">
            Référence
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Nom du site
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Ville
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Responsable de site
          </TableHead>
          <TableHead className="border border-[#dfdfdf] normal-case">
            Statut
          </TableHead>
          <TableHead className="border border-[#dfdfdf] text-right normal-case">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sites.map((site) => (
          <TableRow key={site.id}>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {site.code}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {site.name}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {site.city}
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-[#2f2f2f]">
              {site.manager}
            </TableCell>
            <TableCell className="border border-[#dfdfdf]">
              <SiteStatusBadge status={site.status} />
            </TableCell>
            <TableCell className="border border-[#dfdfdf] text-right">
              <SiteRowActions site={site} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
