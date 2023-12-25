import { useGetUserOffers } from "../api/offers";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const { data } = useGetUserOffers(user?.userId ? user.userId : 0);

  return (
    <div>
      <h1>Profile</h1>
      <h2>My Offers</h2>
      <ul>
        {data?.offers?.map((offer) => (
          <li key={offer.offerId}>{offer.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
