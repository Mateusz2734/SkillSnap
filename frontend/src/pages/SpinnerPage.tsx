import Stack from "@mui/material/Stack";

import { RotatingLines } from "react-loader-spinner";

const SpinnerPage = () => (
    <Stack alignItems="center" justifyContent="center" minHeight="80vh">
        <RotatingLines
            strokeColor="gray"
            width="96"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
        />
    </Stack>
);

export default SpinnerPage;