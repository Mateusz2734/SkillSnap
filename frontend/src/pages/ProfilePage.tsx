import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";

import { useGetUserOffers } from "../api/offers";
import { OfferCard } from "../components/OfferCard";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const { data } = useGetUserOffers(user?.userId ? user.userId : 0);

  return (
    <Stack justifyContent="center" alignItems="center">
      <Grid container spacing={4} sx={{ maxWidth: "80%" }}>
        {data?.offers?.map((offer) => (
          <Grid key={offer.offerId} sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <OfferCard offer={offer} editable />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Profile;
