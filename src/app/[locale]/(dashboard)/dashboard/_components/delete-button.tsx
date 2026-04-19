import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";

interface IDeleteButtonProps {
  type?: "submit" | "button";
}

const DeleteButton: React.FC<IDeleteButtonProps> = (props) => {
  const { type = "submit" } = props;

  return (
    <Button
      size="sm"
      variant="destructive"
      type={type}
      className="flex items-center gap-1"
    >
      <Trash2 className="w-4 h-4" />
      Delete
    </Button>
  );
};

export default DeleteButton;
