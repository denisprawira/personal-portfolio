import { IMenu } from "@/app/types/types";
import {
  DropdownMenu as ShadcnDropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import React from "react";

type DropDownProps = {
  children: React.ReactNode;
  handleChange?: (arg: boolean) => void;
  menu: IMenu[];
  labelProps?: { text: string; className: string };
  itemProps?: { className: string };
  footer?: React.ReactNode;
};

const DropdownMenu = ({
  children,
  handleChange,
  menu,
  labelProps,
  itemProps,
  footer,
}: DropDownProps) => {
  return (
    <>
      <ShadcnDropdownMenu
        onOpenChange={(e) => {
          if (handleChange) {
            handleChange(e);
          }
        }}
      >
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="border border-muted-foreground/20">
          {labelProps?.text && (
            <>
              <DropdownMenuLabel className={cn(labelProps?.className)}>
                {labelProps.text}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
            </>
          )}
          {menu.map((item) => (
            <DropdownMenuItem
              key={item.id}
              className={cn(itemProps?.className)}
            >
              {item.title}
            </DropdownMenuItem>
          ))}
          {footer && footer}
        </DropdownMenuContent>
      </ShadcnDropdownMenu>
    </>
  );
};

export default DropdownMenu;
