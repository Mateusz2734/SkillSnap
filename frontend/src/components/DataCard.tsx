import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";
import { SvgIconComponent } from "@mui/icons-material";

export type DataCardProps = {
  label: string;
  value: number;
  icon: SvgIconComponent;
};

export const DataCard = (props: DataCardProps) => {
  return (
    <Card
      sx={{
        backgroundColor: "var(--joy-palette-background-level1)",
        maxWidth: "300px",
      }}
    >
      <CardContent orientation="horizontal">
        <CircularProgress determinate size="lg">
          <SvgIcon
            size="lg"
            sx={{
              color: "var(--joy-palette-text-icon)",
              backgroundColor: "var(--joy-palette-background-level1)",
            }}
          >
            <props.icon />
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
