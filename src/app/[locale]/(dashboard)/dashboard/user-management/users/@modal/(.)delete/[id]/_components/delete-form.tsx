"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React, { useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { Spinner } from "@/components/ui/spinner";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { deleteUserById } from "../../../../actions";
import FormModal from "@/app/[locale]/(dashboard)/dashboard/_components/form-modal";
type DeleteState = {
  success: boolean;
  message: string;
};

interface IDeleteFormProps {
  id: string;
  locale: string;
}

const DeleteForm: React.FC<IDeleteFormProps> = ({ id, locale }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [, setOpen] = React.useState(false);
  const [state, formAction] = React.useActionState(
    async (_: DeleteState, formData: FormData): Promise<DeleteState> => {
      const rawId = formData.get("id");

      if (typeof rawId !== "string" || !rawId) {
        return { success: false, message: "ID tidak valid" };
      }

      const res = await deleteUserById(rawId);

      if (res.success) {
        toast.success(
          locale === "id"
            ? "Data berhasil dihapus"
            : "Data deleted successfully",
          {
            style: {
              backgroundColor: "#34D399",
              border: "1px solid #34D399",
              color: "#ffffff",
              fontWeight: "bold",
              width: "100%",
              height: "80px",
            },
          }
        );
        startTransition(() => {
          router.refresh();
        });
        setOpen(false);
      } else {
        toast.error(
          res.message ||
            (locale === "id"
              ? "Gagal menghapus data"
              : "Failed to delete data"),
          {
            style: {
              backgroundColor: "#FECACA",
              border: "1px solid #FCA5A5",
              color: "#7F1D1D",
              fontWeight: "bold",
            },
          }
        );
      }

      return {
        success: res.success,
        message: res.message,
      };
    },
    {
      success: false,
      message: "",
    }
  );

  return (
    <FormModal
      open={state.success === true ? false : true}
      title={locale === "en" ? "Confirm Delete" : "Konfirmasi Hapus"}
      description={
        locale === "en"
          ? "Are you sure you want to delete this data? This action cannot be undone."
          : "Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan."
      }
      dialogContentClassName="max-w-[80%] md:max-w-[60%] lg:max-w-[40%] 2xl:max-w-[30%]"
    >
      <form action={formAction}>
        <input type="hidden" name="id" value={id} />
        <DialogFooter className="flex flex-col gap-1 md:flex-row-reverse md:items-center md:justify-start">
          <Button
            size="sm"
            variant="destructive"
            type="submit"
            disabled={isPending}
            className="flex items-center gap-1 cursor-pointer"
          >
            {isPending ? (
              <Spinner />
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                {locale === "en" ? "Delete" : "Hapus"}
              </>
            )}
          </Button>

          <DialogClose asChild>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              {locale === "en" ? "Cancel" : "Batal"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </FormModal>
  );
};

export default DeleteForm;
