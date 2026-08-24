import { ChevronLeft, ChevronRight } from "lucide-react"

export function ListPagination({
  total = 20,
  page = 1,
  pageCount = 2,
}: {
  total?: number
  page?: number
  pageCount?: number
}) {
  return (
    <div className="flex items-center justify-between text-xs">
      <p className="text-black">
        <span className="font-bold">{total}</span> résultats
      </p>
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-[#2f2f2f]">
          Page {page}/{pageCount}
        </p>
        <button
          disabled={page <= 1}
          className="flex size-8 items-center justify-center rounded-lg border border-[#dfdfdf] bg-white disabled:opacity-50"
          aria-label="Page précédente (début)"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          disabled={page <= 1}
          className="flex size-8 items-center justify-center rounded-lg border border-[#dfdfdf] bg-white disabled:opacity-50"
          aria-label="Page précédente"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          disabled={page >= pageCount}
          className="flex size-8 items-center justify-center rounded-lg border border-[#dfdfdf] bg-white disabled:opacity-50"
          aria-label="Page suivante"
        >
          <ChevronRight className="size-5" />
        </button>
        <button
          disabled={page >= pageCount}
          className="flex size-8 items-center justify-center rounded-lg border border-[#dfdfdf] bg-white disabled:opacity-50"
          aria-label="Page suivante (fin)"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  )
}
