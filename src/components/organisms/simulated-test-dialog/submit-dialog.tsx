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
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useNavigate } from "@tanstack/react-router";
import React from "react";

type SubmitDialogProps = {
  triggerButton: React.ReactNode;
  time: React.ReactNode;
};
const SubmitDialog = ({ triggerButton, time }: SubmitDialogProps) => {
  const navigate = useNavigate();
  const onClose = () => {
    navigate({ to: "/practice" });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn chắc chắn nộp bài không?</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Bạn chưa hoàn thành tất cả câu hỏi trong bài thi và còn {time}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={onClose} className="w-full">
            Nộp bài
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default SubmitDialog;
