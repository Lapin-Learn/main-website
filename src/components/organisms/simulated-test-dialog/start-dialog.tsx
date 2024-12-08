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
import { Button } from "@/components/ui/button";

type StartDialogProps = {
  onClose: () => void;
};
const StartDialog = ({ onClose }: StartDialogProps) => {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Bắt đầu làm bài</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Bài thi gồm <strong>3 phần</strong> và bạn sẽ có <span>40 phút</span> để hoàn thành bài
            thi. Bạn <strong>không thể dừng giữa chừng</strong> và bài thi sẽ tự động nộp sau 40
            phút.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild className="w-full" onClick={onClose}>
            <Button size="xl" className="w-full">
              Bắt đầu làm bài
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default StartDialog;
