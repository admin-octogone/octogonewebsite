"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Route } from "@/types/routes";
import { DesktopNavProps } from "./types";
// import { Button } from "@/components/ui/button"; // Non utilisé
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  navigationTriggerVariants,
  // navigationContentVariants, // Non utilisé
  navigationLinkVariants,
} from "@/components/ui/navigation-menu/variants";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    href: string;
  }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        href={href}
        className={cn(
          "inline-block select-none rounded-lg p-4 leading-none no-underline outline-none transition-colors hover:bg-marine-50/80 hover:text-marine-900 focus:bg-marine-50",
          className,
        )}
        {...props}
      >
        <div className="text-lg font-semibold leading-tight text-marine-900">
          {title}
        </div>
        {children && (
          <p className="text-sm leading-relaxed text-marine-500 mt-2">
            {children}
          </p>
        )}
      </Link>
    </NavigationMenuLink>
  );
});
ListItem.displayName = "ListItem";

export const DesktopNav: React.FC<DesktopNavProps> = ({
  routes,
  activeRoute,
  locale = "fr", // Paramètre conservé pour compatibilité avec l'interface
}) => {
  const pathname = usePathname();

  const isItemActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="flex justify-center w-full">
      <NavigationMenu className="w-full max-w-screen-lg">
        <NavigationMenuList className="flex items-center gap-6 justify-center">
          {routes.map((route) => {
            const isActive =
              activeRoute === route.path || pathname === route.path;
            const hasChildren = route.children && route.children.length > 0;

            return (
              <NavigationMenuItem key={route.path}>
                {hasChildren ? (
                  <>
                    <NavigationMenuTrigger
                      className={`${navigationTriggerVariants({ active: isActive })} nav-item ${isActive ? "active-nav-item" : ""} rounded-md px-3 py-2`}
                    >
                      {route.label}
                      <ChevronDown className="h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg flex justify-center items-center absolute left-1/2 transform -translate-x-1/2 mt-8">
                      {(() => {
                        const itemCount = route.children?.length || 0;
                        const itemWidth = 220; // Largeur d'un item en pixels
                        const columnCount = Math.min(Math.max(1, itemCount), 7); // Max 7 colonnes
                        const containerWidth = columnCount * itemWidth;

                        return (
                          <div
                            className="grid gap-4"
                            style={{
                              width: `${containerWidth}px`,
                              gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
                            }}
                          >
                            {route.children?.map((item: Route) => (
                              <Link
                                key={item.path}
                                href={item.path}
                                className={`block p-4 rounded-md transition-colors nav-item ${isItemActive(item.path) ? "active-nav-item" : ""}`}
                              >
                                <div className="text-lg font-medium text-marine-900 mb-2">
                                  {item.label}
                                </div>
                                {item.description && (
                                  <p className="text-sm text-marine-500">
                                    {item.description}
                                  </p>
                                )}
                              </Link>
                            ))}
                          </div>
                        );
                      })()}
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={route.path}
                      className={`
                      ${navigationLinkVariants({ active: isActive })} 
                      nav-item ${isActive ? "active-nav-item" : ""} 
                      rounded-md px-3 py-2
                      ${route.label === "Connexion" ? "ml-2" : ""}
                    `}
                    >
                      {route.label}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>
    </div>
  );
};
