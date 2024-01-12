import { faUser, faTags } from "@fortawesome/free-solid-svg-icons";

import { useGetGeneralStats } from "../api/stats";
import { useGetReports } from "../api/report";
import { DataCard } from "../components/DataCard";
import { ReportTable } from "../components/ReportTable";

const Admin = () => {
  const { data } = useGetGeneralStats();
  const { data: reports } = useGetReports();

  return (
    <>
      {data?.userCount && (
        <DataCard label="User Count" value={data.userCount} icon={faUser} />
      )}
      <br />
      {data?.offerCount && (
        <DataCard label="Offer Count" value={data.offerCount} icon={faTags} />
      )}
      <br />
      {reports && <ReportTable reports={reports.reports} />}
    </>
  );
};

export default Admin;
