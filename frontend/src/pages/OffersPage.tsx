import { useGetOffers } from "../api/offers";
import { Spinner } from "../components/Spinner";
import { OfferCard } from "../components/OfferCard";

const Offers = () => {
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
      {data?.offers.map((offer) => (
        <OfferCard key={offer.offerId} offer={offer} />
      ))}
    </>
  );
};

export default Offers;
