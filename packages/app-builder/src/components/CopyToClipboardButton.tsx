import { useGetCopyToClipboard } from '@app-builder/utils/use-get-copy-to-clipboard';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { Duplicate } from 'ui-icons';

export const CopyToClipboardButton = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'> & {
    toCopy: string;
  }
>(function CopyToClipboardButton({ children, toCopy, ...props }, ref) {
  const getCopyToClipboardProps = useGetCopyToClipboard();
  return (
    <div
      ref={ref}
      className="border-grey-10 text-grey-100 flex h-8 cursor-pointer select-none items-center gap-3 rounded border px-2 font-normal"
      {...getCopyToClipboardProps(toCopy)}
      {...props}
    >
      {children}
      <Duplicate className="text-m" />
    </div>
  );
});