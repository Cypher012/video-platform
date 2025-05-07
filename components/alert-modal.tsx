import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, X, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function ErrorAlert({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Alert
        variant="destructive"
        className="animate-in fade-in relative my-4 flex items-center gap-3 rounded-md border border-red-400 bg-slate-900 p-4 text-sm text-red-900 shadow-sm"
      >
        <AlertTriangle className="h-6 w-6 text-red-600" />
        <AlertDescription className="font-semibold pr-6">
          {message}
        </AlertDescription>

        <button
          onClick={onClose}
          className="ml-auto text-red-800 transition hover:text-red-950"
          aria-label="Dismiss error"
        >
          <X className="h-4 w-4" />
        </button>
      </Alert>
    </motion.div>
  );
}

export function SuccessAlert({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Alert
        variant="default"
        className="animate-in fade-in relative my-4 flex items-center gap-3 rounded-md border border-green-400 bg-green-200 p-4 text-sm text-green-900 shadow-sm"
      >
        <CheckCircle className="h-6 w-6 text-green-600" />
        <AlertDescription className="font-semibold pr-6">
          {message}
        </AlertDescription>

        <button
          onClick={onClose}
          className="ml-auto text-green-800 transition hover:text-green-950"
          aria-label="Dismiss success"
        >
          <X className="h-4 w-4" />
        </button>
      </Alert>
    </motion.div>
  );
}
