import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { type FC } from "react";

interface ErrorAlertAlertProps {
  message: string;
  variant?: "default" | "destructive";
}

export const ErrorAlert: FC<ErrorAlertAlertProps> = ({ message, variant }) => {
  return (
    <Alert variant={variant}>
      <AlertCircleIcon />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
};
