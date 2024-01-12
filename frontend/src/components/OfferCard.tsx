import { useState } from "react";
import { DeleteOutlined, OutlinedFlag, MoreVert, EditOutlined } from "@mui/icons-material";
import {
  Typography,
  CardOverflow,
  AspectRatio,
  Button,
  Card,
  CardActions,
  CardContent,
  MenuButton,
  Dropdown,
  Menu,
  MenuItem,
  IconButton,
  ListItemDecorator,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
} from "@mui/joy";
import { Link } from "react-router-dom";
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
    <>
      <IconButton variant="plain" color="danger" onClick={() => mutate()}>
        <DeleteOutlined />
      </IconButton>
      <IconButton variant="plain" >
        <EditOutlined />
      </IconButton>
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

  const reportDropdown = (
    <Dropdown>
      <MenuButton
        sx={{ position: "absolute", right: 0, top: 0 }}
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral" } }}
        size="sm"
      >
        <MoreVert sx={{ color: "var(--joy-palette-background-level1)" }} />
      </MenuButton>
      <Menu size="sm">
        {user?.userId !== props.offer.userId && (
          <MenuItem onClick={() => setOpen(true)}>
            <ListItemDecorator>
              <OutlinedFlag />
            </ListItemDecorator>
            Report offer
          </MenuItem>
        )}

        {(user?.role === "admin" || props.offer.userId === user?.userId) && (
          <MenuItem onClick={() => mutate()} color="danger">
            <ListItemDecorator>
              <DeleteOutlined />
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
        <CardContent sx={{ maxWidth: "40ch" }}>
          {props.offer.description}
        </CardContent>
        <CardActions
          orientation={buttonOrientation}
          buttonFlex={1}
          sx={{
            "--Button-radius": "40px",
            // width: "clamp(min(100%, 200px), 50%, min(100%, 200px))",
          }}
        >
          {buttonSection}
        </CardActions>
      </Card>
    </>
  );
};

const apiUrl = "https://api.dicebear.com/7.x/identicon/svg";
