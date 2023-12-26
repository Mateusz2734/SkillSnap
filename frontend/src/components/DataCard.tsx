import {
  Card,
  CardContent,
  CircularProgress,
  Typography,
  SvgIcon,
} from "@mui/joy";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type DataCardProps = {
  variant?: "solid" | "outlined" | "plain" | "soft";
  color?: "primary" | "danger" | "success" | "warning" | "neutral";
  progress?: number;
  label: string;
  value: number;
  icon: IconDefinition;
};

export const DataCard = (props: DataCardProps) => {
  return (
    <Card
      variant={props.variant ? props.variant : "solid"}
      color={props.color ? props.color : "primary"}
      invertedColors
    >
      <CardContent orientation="horizontal">
        <CircularProgress
          size="lg"
          determinate
          value={props.progress ? props.progress : 0}
        >
          <SvgIcon>
            <FontAwesomeIcon icon={props.icon} />
          </SvgIcon>
        </CircularProgress>
        <CardContent>
          <Typography level="body-md">{props.label}</Typography>
          <Typography level="h2">{props.value}</Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
};
