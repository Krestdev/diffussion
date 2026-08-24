"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, EllipsisVertical } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Logo } from "@/components/brand/logo"
import { navGroups } from "@/components/layout/app-sidebar-data"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <Logo className="px-1 py-1" />
      </SidebarHeader>

      <SidebarContent className="gap-0 px-1">
        <SidebarGroup className="pb-2">
          <Button
            variant="outline"
            className="h-9 w-full justify-between rounded-[4px] border-[#e4e4e7] px-3 text-sm font-normal tracking-normal normal-case"
          >
            Cristal
            <ChevronDown className="size-4 text-muted-foreground" />
          </Button>
        </SidebarGroup>

        {navGroups.map((group) => (
          <SidebarGroup key={group.label} className="py-2">
            <SidebarGroupLabel
              className={`text-[11px] ${group.labelClassName}`}
            >
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={
                        item.href === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.href)
                      }
                      className="rounded-[6px] font-medium data-active:font-medium"
                    >
                      {item.icon ? <item.icon /> : null}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge ? (
                      <SidebarMenuBadge className="rounded-[4px] bg-[#ffaf06] text-[#700032]">
                        {item.badge}
                      </SidebarMenuBadge>
                    ) : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-2 p-1">
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="truncate text-sm font-medium text-[#18181b]">
              Jason Adiogo
            </p>
            <p className="truncate text-xs text-[#71717a]">Employé</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 rounded-[4px]"
                  aria-label="Menu du compte"
                />
              }
            >
              <EllipsisVertical className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top">
              <DropdownMenuItem>Mon profil</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
