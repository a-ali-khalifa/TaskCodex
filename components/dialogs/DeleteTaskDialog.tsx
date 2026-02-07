import Dialog from "@/components/dialogs/Dialog";
import { Button } from "@/components/Button";

type DeleteTaskDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
};

const DeleteTaskDialog = ({ isOpen, onClose, onDelete }: any) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Delete Task">
      <div className="space-y-4">
        <p className="text-lg font-rubik pb-4">
          Are you sure you would like to delete this task?
        </p>
        <div className="flex gap-2 justify-between items-center">
          <Button
            label="Cancel"
            variant="outline"
            color="secondary"
            onClick={onClose}
            className="flex-1"
          />
          <Button
            label="Delete"
            onClick={onDelete}
            className="flex-1"
            color="secondary"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteTaskDialog;
