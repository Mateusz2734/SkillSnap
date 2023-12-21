import { RotatingLines } from "react-loader-spinner";

export const Spinner = () =>
    <RotatingLines
        strokeColor="gray"
        width="96"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
    />;