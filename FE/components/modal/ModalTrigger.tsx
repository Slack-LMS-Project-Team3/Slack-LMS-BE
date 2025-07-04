"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { ModalOverlay, ModalContent } from "./Modal";

interface ModalTriggerProps {
  trigger: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean; // open prop 추가
  onOpenChange?: (open: boolean) => void;
}

export function ModalTrigger({ trigger, children, defaultOpen = false, open, onOpenChange }: ModalTriggerProps) {
  return (
    <Dialog.Root defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <ModalOverlay />
        <ModalContent>{children}</ModalContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
