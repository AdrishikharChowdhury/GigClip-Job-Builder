"use client";

import { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  message: string;
};

export default function ProfileErrorToast({ message }: Props) {
  useEffect(() => {
    toast.error(message, { id: message });
  }, [message]);

  return null;
}
