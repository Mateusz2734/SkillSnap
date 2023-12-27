import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faHome,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Divider } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";

export type ProblemProps = {
  heading: string;
};

export const Problem = (props: ProblemProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        size="10x"
        color={theme.vars.palette.danger[500]}
      />
      <h1>{props.heading}</h1>
      <Button
        startDecorator={<FontAwesomeIcon icon={faArrowLeft} />}
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
      <Divider>or</Divider>
      <Button
        startDecorator={<FontAwesomeIcon icon={faHome} />}
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </div>
  );
};
