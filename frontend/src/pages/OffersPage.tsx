import { useGetOffers } from "../api/offers";
import { Spinner } from "../components/Spinner";

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

  return (
    <>
      <section>
        <h1>Offers</h1>
        <br />
        {data?.offers.map((offer) => (
          <>
            <div key={offer.offerID}>
              <p>Description: {offer.description}</p>
              <p>Skill: {offer.skill}</p>
            </div>
            <br />
          </>
        ))}
      </section>
    </>
  );
};

export default Offers;
