import { ArrowLeft } from '@marble-front/ui/icons';
import clsx from 'clsx';

function PageContainer({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return <div className={clsx('flex flex-1 flex-col', className)} {...props} />;
}

function PageHeader({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={clsx(
        'border-b-grey-10 bg-grey-00 text-display-l-bold text-grey-100 sticky top-0 flex h-20 flex-row items-center border-b pr-8 pl-8',
        className
      )}
      {...props}
    />
  );
}

function PageContent({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div className={clsx('flex flex-1 flex-col p-8', className)} {...props} />
  );
}

function PageBackButton({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={clsx(
        'border-grey-10 flex items-center justify-center rounded-md border p-2',
        className
      )}
      {...props}
    >
      <ArrowLeft />
    </div>
  );
}

export const Page = {
  Container: PageContainer,
  Header: PageHeader,
  BackButton: PageBackButton,
  Content: PageContent,
};