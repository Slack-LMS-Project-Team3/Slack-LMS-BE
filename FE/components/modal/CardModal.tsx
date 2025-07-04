"use client";

import { ReactNode } from "react";
import { ModalTrigger } from "./ModalTrigger";
import { ModalClose } from "./Modal";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CardModalProps {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean; // open prop 추가
  onOpenChange?: (open: boolean) => void;
}

export function CardModal({ trigger, title, children, defaultOpen = false, open, onOpenChange }: CardModalProps) {
  return (
    <ModalTrigger trigger={trigger} defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
      <Card className="flex flex-col h-full overflow-hidden">
        <CardHeader className="flex items-center justify-between flex-none">
          <h3 className="text-xl font-semibold">{title}</h3>
          <ModalClose asChild>
            <button aria-label="Close">
              <X size={20} />
            </button>
          </ModalClose>
        </CardHeader>
        <CardContent className="flex-1 min-h-0">{children}</CardContent>
        {/* <CardFooter className="flex flex-row items-center justify-end flex-none gap-4">
          <Button variant="secondary">Cancel</Button>
          <Button variant="default">Save Changes</Button>
        </CardFooter> */}
      </Card>
    </ModalTrigger>
  );
}
