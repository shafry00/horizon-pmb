"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "@/i18n/navigation";
import { Trash2 } from "lucide-react";
import React from "react";

interface IFormModalProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerModal?: boolean;
  dialogContentClassName?: string;
}

const FormModal: React.FC<IFormModalProps> = (props) => {
  const {
    title,
    description,
    children,
    open = true,
    onOpenChange = () => router.back(),
    triggerModal = false,
    dialogContentClassName,
  } = props;
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {triggerModal ? (
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="destructive"
            className="flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent className={` rounded-xl ${dialogContentClassName}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
