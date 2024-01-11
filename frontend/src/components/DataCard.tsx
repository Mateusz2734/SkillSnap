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
  label: string;
  value: number;
  icon: IconDefinition;
};

export const DataCard = (props: DataCardProps) => {
  return (
    <Card
      sx={{
        backgroundColor: "var(--joy-palette-background-level1)",
      }}
    >
      <CardContent orientation="horizontal">
        <CircularProgress determinate size="lg">
          <SvgIcon
            sx={{
              color: "var(--joy-palette-text-icon)",
              backgroundColor: "var(--joy-palette-background-level1)",
            }}
          >
            <FontAwesomeIcon icon={props.icon} />
          </SvgIcon>
        </CircularProgress>
        <CardContent>
          <Typography
            level="body-md"
            sx={{ color: "var(--joy-palette-text-primary)" }}
          >
            {props.label}
          </Typography>
          <Typography
            level="h2"
            sx={{ color: "var(--joy-palette-text-primary)" }}
          >
            {props.value}
          </Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
};
