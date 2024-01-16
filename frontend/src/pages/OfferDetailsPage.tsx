import { useParams, useNavigate } from "react-router-dom";

import { OfferDetailsCard } from "../components/OfferDetailsCard";
import { useGetOffer } from "../api/offers";
import { useGetUser } from "../api/user";
import SpinnerPage from "./SpinnerPage";
import { Stack } from "@mui/joy";

const OfferDetails = () => {
    const navigate = useNavigate();
    const { offerId } = useParams();

    const { data: offerData, isLoading: offerLoading } = useGetOffer(Number(offerId));
    const { data: userData, isLoading: userLoading } = useGetUser(offerData?.offer?.userId);

    if (offerLoading || userLoading) {
        return <SpinnerPage />;
    }

    if (!offerData || !userData) {
        navigate("/404", { replace: true });
        return;
    }

    return (
        <Stack justifyContent="center" alignItems="center" sx={{ minHeight: "60vh" }}>
            <OfferDetailsCard user={userData.user} offer={offerData.offer} />
        </Stack>
    );
};

export default OfferDetails;