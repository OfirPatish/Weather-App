import { motion, AnimatePresence } from "motion/react";
import { IoCheckmarkCircle, IoCloseCircle, IoClose } from "react-icons/io5";
import { fadeInDownSmall, transitions } from "../../utils/animations";
import { useEffect } from "react";

interface NotificationBannerProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  autoHide?: boolean;
  duration?: number;
}

export function NotificationBanner({
  message,
  type,
  onClose,
  autoHide = true,
  duration = 4000,
}: NotificationBannerProps) {
  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, onClose]);

  const isSuccess = type === "success";
  const bgColor = isSuccess
    ? "bg-success/10 border-success/30 text-success"
    : "bg-error/10 border-error/30 text-error";
  const iconBgColor = isSuccess
    ? "bg-success/20"
    : "bg-error/20";

  return (
    <AnimatePresence>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInDownSmall}
        transition={transitions.fast}
        className={`${bgColor} border rounded-lg p-4 flex items-center gap-3 shadow-lg`}
      >
        <div
          className={`${iconBgColor} rounded-full p-2 flex items-center justify-center flex-shrink-0`}
        >
          {isSuccess ? (
            <IoCheckmarkCircle className="h-5 w-5" />
          ) : (
            <IoCloseCircle className="h-5 w-5" />
          )}
        </div>
        <p className="flex-1 text-sm font-medium leading-tight">{message}</p>
        <button
          onClick={onClose}
          aria-label="Close notification"
          className="btn btn-ghost btn-sm btn-circle h-6 w-6 min-h-0 p-0 hover:bg-base-content/10 flex-shrink-0"
        >
          <IoClose className="h-4 w-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

