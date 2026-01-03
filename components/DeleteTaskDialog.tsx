import Dialog from "./Dialog";
import { Button } from "./Button";

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
          <Button label="Confirm" onClick={onDelete} className="flex-1" />
          <Button
            label="Cancel"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteTaskDialog;
