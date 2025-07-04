"use client";

import * as Dialog from "@radix-ui/react-dialog";

export const Modal = Dialog.Root;
export const ModalPortal = Dialog.Portal;

export const ModalOverlay = (props: Dialog.DialogOverlayProps) => (
  <Dialog.Overlay className="fixed inset-0 bg-black/50" {...props} />
);

export const ModalContent = (props: Dialog.DialogContentProps) => (
  <Dialog.Content
    className="fixed top-1/2 left-1/2 w-full max-w-lg max-h-[90vh] flex flex-col -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-4 shadow-lg focus:outline-none"
    {...props}
  />
);

export const ModalClose = Dialog.Close;
