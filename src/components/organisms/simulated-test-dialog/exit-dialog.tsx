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
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useNavigate } from "@tanstack/react-router";

type ExitDialogProps = {
  triggerButton: React.ReactNode;
};
const ExitDialog = ({ triggerButton }: ExitDialogProps) => {
  const navigate = useNavigate();
  const onClose = () => {
    navigate({ to: "/practice" });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn chắc chắn muốn thoát không?</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Bạn chưa hoàn thành bài thi. Tất cả câu trả lời của bạn sẽ được lưu thành bản nháp.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button onClick={onClose} variant="outline" size="xl">
              Thoát
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel asChild className="w-full">
            <Button size="xl" className="w-full">
              Tiếp tục làm bài
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ExitDialog;
