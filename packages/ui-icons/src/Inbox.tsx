import type { SVGProps } from 'react';
const Inbox = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <mask
      id="prefix__mask0_9556_31444"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={20}
      height={20}
    >
      <rect width={20} height={20} fill="currentColor" />
    </mask>
    <g mask="url(#prefix__mask0_9556_31444)">
      <path
        d="M4.16667 17.5C3.70833 17.5 3.31597 17.3368 2.98958 17.0104C2.66319 16.684 2.5 16.2917 2.5 15.8333V4.16667C2.5 3.70833 2.66319 3.31597 2.98958 2.98958C3.31597 2.66319 3.70833 2.5 4.16667 2.5H15.8333C16.2917 2.5 16.684 2.66319 17.0104 2.98958C17.3368 3.31597 17.5 3.70833 17.5 4.16667V15.8333C17.5 16.2917 17.3368 16.684 17.0104 17.0104C16.684 17.3368 16.2917 17.5 15.8333 17.5H4.16667ZM10 13.3333C10.5278 13.3333 11.0069 13.1806 11.4375 12.875C11.8681 12.5694 12.1667 12.1667 12.3333 11.6667H15.8333V4.16667H4.16667V11.6667H7.66667C7.83333 12.1667 8.13194 12.5694 8.5625 12.875C8.99306 13.1806 9.47222 13.3333 10 13.3333Z"
        fill="currentColor"
      />
    </g>
  </svg>
);
export default Inbox;