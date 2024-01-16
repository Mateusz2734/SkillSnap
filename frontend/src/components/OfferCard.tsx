import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import FlagIcon from "@mui/icons-material/OutlinedFlag";
import MoreIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import MenuButton from "@mui/joy/MenuButton";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import IconButton from "@mui/joy/IconButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import { SxProps } from "@mui/joy/styles/types";

import { Offer } from "../types/types";
import { useAuth } from "../hooks/useAuth";
import { useDeleteOffer } from "../api/offers";
import { ReportForm } from "./ReportForm";

export type OfferCardProps = {
  offer: Offer;
  editable?: boolean;
};

export const OfferCard = (props: OfferCardProps) => {
  const { user } = useAuth();
  const { mutate } = useDeleteOffer(props.offer.offerId);
  const [open, setOpen] = useState<boolean>(false);

  const buttonSection = props.editable ? (
    <IconButton variant="plain" color="danger" onClick={() => mutate()}>
      <DeleteIcon />
    </IconButton>
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

  const reportDropdown = (
    <Dropdown>
      <MenuButton
        sx={{ position: "absolute", right: 0, top: 0 }}
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral" } }}
        size="sm"
      >
        <MoreIcon sx={{ color: "var(--joy-palette-background-level1)" }} />
      </MenuButton>
      <Menu size="sm">
        {user?.userId !== props.offer.userId && (
          <MenuItem onClick={() => setOpen(true)}>
            <ListItemDecorator>
              <FlagIcon />
            </ListItemDecorator>
            Report offer
          </MenuItem>
        )}

        {(user?.role === "admin" || props.offer.userId === user?.userId) && (
          <MenuItem onClick={() => mutate()} color="danger">
            <ListItemDecorator>
              <DeleteIcon />
            </ListItemDecorator>
            Delete offer
          </MenuItem>
        )}
      </Menu>
    </Dropdown>
  );

  const overflow = !props.editable ? (
    <CardOverflow variant="solid" color="primary">
      {reportDropdown}
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

  const reportModal = (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <DialogTitle>Create new report</DialogTitle>
        <DialogContent>Fill in the information of the report.</DialogContent>
        <ReportForm offerId={props.offer.offerId} />
      </ModalDialog>
    </Modal>
  );

  return (
    <>
      {reportModal}
      <Card data-resizable sx={cardSXProps}>
        {overflow}
        <Typography level="title-lg" sx={{ mt: "calc(var(--icon-size) / 2)" }}>
          {props.offer.skill}
        </Typography>
        <CardContent sx={{ maxWidth: "330px" }}>
          <Typography noWrap={!props.editable}>
            {props.offer.description}
          </Typography>
        </CardContent>
        <CardActions
          orientation={buttonOrientation}
          buttonFlex={1}
          sx={{
            "--Button-radius": "40px",
          }}
        >
          {buttonSection}
        </CardActions>
      </Card>
    </>
  );
};

const apiUrl = "https://api.dicebear.com/7.x/identicon/svg";
