import {
  type AvatarProps as RootAvatarProps,
  Fallback,
  Image,
  Root,
} from '@radix-ui/react-avatar';
import clsx from 'clsx';

export type AvatarProps = RootAvatarProps & {
  firstName: string;
  lastName: string;
  src?: string;
};

export function Avatar({
  firstName,
  lastName,
  src,
  className,
  ...props
}: AvatarProps) {
  return (
    <Root
      className={clsx(
        'inline-flex h-16 w-16 select-none items-center justify-center overflow-hidden rounded-full bg-purple-100 text-center uppercase',
        className
      )}
      {...props}
    >
      <Image
        referrerPolicy="no-referrer"
        className="h-full w-full object-cover"
        src={src}
        alt={`${firstName} ${lastName}`}
      />
      <Fallback
        className="text-l text-grey-00 flex h-full w-full items-center justify-center font-semibold"
        delayMs={src ? 400 : 0}
      >
        {`${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`}
      </Fallback>
    </Root>
  );
}