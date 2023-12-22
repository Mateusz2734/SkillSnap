import { useHealth } from "../api/health";
import { Spinner } from "../components/Spinner";

const Health = () => {
  const { data, error, isLoading, isError } = useHealth();

  if (isLoading) return <Spinner />;

  if (isError && error)
    return <p>There was an error fetching the health status: {error.status}</p>;

  return (
    <section>
      <h1>Health</h1>
      <br />
      <p>{data?.status}</p>
    </section>
  );
};

export default Health;
