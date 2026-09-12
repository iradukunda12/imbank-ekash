interface FormMessageProps {
  message?: string | null;
}

/** Same rose/sky tones as the app's Badge "danger"/"info" tones — an error
 * or notice banner should read as part of the same color system. */
export const FormError = ({ message }: FormMessageProps) => {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-[12.5px] font-medium text-rose-600 ring-1 ring-inset ring-rose-600/15">
      {message}
    </p>
  );
};

export const FormNotice = ({ message }: FormMessageProps) => {
  if (!message) return null;
  return (
    <p className="rounded-lg bg-sky-50 px-3 py-2 text-[12.5px] font-medium text-sky-600 ring-1 ring-inset ring-sky-600/15">
      {message}
    </p>
  );
};
