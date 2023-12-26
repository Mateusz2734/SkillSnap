import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { useGetGeneralStats } from "../api/stats";
import { DataCard } from "../components/DataCard";

const Admin = () => {
  const { data } = useGetGeneralStats();

  return (
    <>
      <h1>Admin Dashboard</h1>

      {data?.userCount && (
        <DataCard label="User Count" value={data?.userCount} icon={faUser} />
      )}
      <br />
      {data?.offerCount && (
        <DataCard
          label="Offer Count"
          value={data?.offerCount}
          icon={faEnvelope}
        />
      )}
    </>
  );
};

export default Admin;
