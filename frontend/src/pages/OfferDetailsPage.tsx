import { useParams } from "react-router-dom";
import { useGetOffer } from "../api/offers";
import { useGetUser } from "../api/user";

const OfferDetails = () => {
    const { offerId } = useParams();
    const { data: offerData } = useGetOffer(Number(offerId));
    const { data: userData } = useGetUser(offerData?.offer?.userId);

    // console.log(status, fetchStatus);
    return (
        <div>
            <h1>Offer Details</h1>
            <p>Offer ID: {offerId}</p>
            <p>Offer: {offerData?.offer.skill}</p>
            <p>Offer user: {offerData?.offer.userId}</p>
            <p>User: {userData?.user?.username}</p>
            <p>User Discord Username: {userData?.user?.discordUsername}</p>
        </div>
    );
};

export default OfferDetails;