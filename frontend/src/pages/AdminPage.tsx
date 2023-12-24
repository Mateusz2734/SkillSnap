import { useGetGeneralStats } from "../api/stats";

const Admin = () => {
  const { data } = useGetGeneralStats();

  return (
    <section>
      <h1>Admin Dashboard</h1>
      <div>{data?.userCount && <p>Number of users: {data.userCount}</p>}</div>
      <div>
        {data?.offerCount && <p>Number of offers: {data.offerCount}</p>}
      </div>
    </section>
  );
};

export default Admin;
