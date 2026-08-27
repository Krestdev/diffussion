import { Search, Settings2 } from "lucide-react"

export function ListToolbar({
  showFilters = true,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Rechercher",
}: {
  showFilters?: boolean
  /** Pass with onSearchChange to make the search box actually filter — otherwise it's decorative. */
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-2">
        <div className="flex h-9 w-60 items-center gap-2 rounded border border-[#e4e4e7] px-3">
          <Search className="size-5 text-muted-foreground" />
          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-[#a1a1aa]"
          />
        </div>
        <button className="flex h-9 items-center justify-center rounded bg-[#27272a] px-5 text-sm font-medium text-white">
          Rechercher
        </button>
      </div>
      {showFilters && (
        <button className="flex h-9 items-center gap-2 rounded border border-[#dfdfdf] bg-white px-3 text-sm font-medium text-[#2f2f2f]">
          <Settings2 className="size-5" />
          Filtres
        </button>
      )}
    </div>
  )
}
