import { JSX } from "react";
import clsx from "clsx";

interface LoaderProps {
  "aria-busy": boolean;
  "aria-hidden": boolean;
  className?: string;
  animationClassName?: string;
}

function Loader(props: LoaderProps): JSX.Element {
  return (
    <div
      className={clsx(
        "fixed top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center w-full h-full opacity-50 bg-[#00050080]",
        props.className
      )}
    >
      <svg
        aria-busy={props["aria-busy"]}
        aria-hidden={props["aria-hidden"]}
        focusable="false"
        role="progressbar"
        viewBox="0 0 20 20"
        className={clsx(
          "block w-12 h-12 m-auto animate-spin fill-white",
          props.animationClassName
        )}
      >
        <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
      </svg>
    </div>
  );
}

export default Loader;
