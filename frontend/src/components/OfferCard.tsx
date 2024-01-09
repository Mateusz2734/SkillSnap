import {
  Typography,
  CardOverflow,
  AspectRatio,
  Button,
  IconButton,
  Card,
  CardActions,
  CardContent,
} from "@mui/joy";
import { Offer } from "../types/types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { useDeleteOffer } from "../api/offers";
import { SxProps } from "@mui/joy/styles/types";

export type CongratCardProps = {
  offer: Offer;
  editable?: boolean;
};

export const OfferCard = (props: CongratCardProps) => {
  const { mutate } = useDeleteOffer(props.offer.offerId);

  const buttonSection = props.editable ? (
    <>
      <Button variant="solid" color="danger" onClick={() => mutate()}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <Button variant="solid" color="primary">
        <FontAwesomeIcon icon={faPenToSquare} />
      </Button>
    </>
  ) : (
    <Link to={`/offers/${props.offer.offerId}`}>
      <Button variant="solid" color="primary">
        Learn more
      </Button>
    </Link>
  );

  const cardSXProps: SxProps = !props.editable
    ? {
        textAlign: "center",
        alignItems: "center",
        width: 343,
        marginBottom: "1em",
        "--icon-size": "100px",
      }
    : {
        textAlign: "center",
        alignItems: "center",
        width: 343,
        marginBottom: "1em",
      };

  const overflow = !props.editable ? (
    <CardOverflow variant="solid" color="primary">
      <IconButton
        sx={{ position: "absolute", right: 0, top: 0 }}
        variant="plain"
        color="neutral"
        // style={{ paddingTop: 10, transform: "translateX(50%)" }}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </IconButton>
      <AspectRatio
        variant="outlined"
        color="primary"
        ratio="1"
        sx={{
          m: "auto",
          transform: "translateY(50%)",
          borderRadius: "50%",
          width: "var(--icon-size)",
          bgcolor: "background.surface",
          position: "relative",
        }}
      >
        <div>
          <img
            alt={`user (id: ${props.offer.userId})`}
            src={`${apiUrl}?seed=${props.offer.userId}`}
          />
        </div>
      </AspectRatio>
    </CardOverflow>
  ) : (
    <></>
  );

  const buttonOrientation = !props.editable ? "vertical" : "horizontal";

  return (
    <Card data-resizable sx={cardSXProps}>
      {overflow}
      <Typography level="title-lg" sx={{ mt: "calc(var(--icon-size) / 2)" }}>
        {props.offer.skill}
      </Typography>
      <CardContent sx={{ maxWidth: "40ch" }}>
        {props.offer.description}
      </CardContent>
      <CardActions
        orientation={buttonOrientation}
        buttonFlex={1}
        sx={{
          "--Button-radius": "40px",
          width: "clamp(min(100%, 200px), 50%, min(100%, 200px))",
        }}
      >
        {buttonSection}
      </CardActions>
    </Card>
  );
};

const apiUrl = "https://api.dicebear.com/7.x/identicon/svg";
