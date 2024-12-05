import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { RiCloseLine } from "@remixicon/react";
import { forwardRef, useImperativeHandle, useState } from "react";

type DeleteModalProps = {
  onDelete: () => void;
  title: string;
  desc: React.ReactNode;
  isDelete?: boolean;
  confirmText?: string;
};

export type DeleteModalRef = {
  open: () => void;
  close: () => void;
};

const DeleteModal = forwardRef<DeleteModalRef, DeleteModalProps>(
  ({ onDelete, title, desc, isDelete = true, confirmText = "Remove" }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
    }));

    return (
      <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
        <AlertDialogContent className="p-0">
          <AlertDialogHeader className="px-6 py-4">
            <AlertDialogTitle className="flex items-center justify-between">
              {title}
              <AlertDialogCancel className="border-none text-gray-8">
                <RiCloseLine />
              </AlertDialogCancel>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base font-light text-black">
              {desc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter
            className={cn("px-6 py-4 shadow-sm shadow-black", {
              "flex-row-reverse": isDelete,
            })}
          >
            <AlertDialogAction
              className={cn("bg-primary text-white", {
                "bg-destructive": isDelete,
              })}
              onClick={onDelete}
            >
              {confirmText}
            </AlertDialogAction>
            <AlertDialogCancel className="border-gray-4 text-gray-8">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

DeleteModal.displayName = "DeleteModal";

export default DeleteModal;
