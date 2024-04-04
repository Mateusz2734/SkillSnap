import { useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";

import { useGetOffers } from "../api/offers";
import { OfferCard } from "../components/OfferCard";
import { OfferForm } from "../components/OfferForm";

const Offers = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data } = useGetOffers();

  return (
    <>
      <Stack direction="row" justifyContent="center" sx={{ marginBottom: "2em" }}>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
        >
          New Offer
        </Button>

        <Modal keepMounted open={open} onClose={() => setOpen(false)}>
          <ModalDialog>
            <DialogTitle>Create new offer</DialogTitle>
            <DialogContent>Fill in the information of the offer.</DialogContent>
            <OfferForm />
          </ModalDialog>
        </Modal>
      </Stack>

      <Grid container>
        {data?.offers.map((offer) => (
          <Grid key={offer.offerId} sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }} >
            <OfferCard offer={offer} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Offers;
