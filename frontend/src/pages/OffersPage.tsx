import { useState } from "react";
import {
  Button,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  Grid
} from "@mui/joy";

import { useGetOffers } from "../api/offers";
import { Spinner } from "../components/Spinner";
import { OfferCard } from "../components/OfferCard";
import { OfferForm } from "../components/OfferForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Offers = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, error, isLoading } = useGetOffers();

  if (isLoading) return <Spinner />;

  if (error)
    return (
      <>
        <p>There was an error fetching the offers</p>
        {error.message && <p>The error message: {error.message}</p>}
      </>
    );

  if (!data || data.offers.length === 0) return <p>No offers found</p>;

  return (
    <>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<FontAwesomeIcon icon={faPlus} />}
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

      <Grid container spacing={4} >
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
