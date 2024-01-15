import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Divider from "@mui/joy/Divider";
import OfferIcon from '@mui/icons-material/LocalOfferOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

import { useGetGeneralStats } from "../api/stats";
import { useGetReports } from "../api/report";
import { DataCard } from "../components/DataCard";
import { ReportTable } from "../components/ReportTable";

const Admin = () => {
  const { data } = useGetGeneralStats();
  const { data: reports } = useGetReports();

  return (
    <Stack justifyContent="center" alignItems="center">
      <Sheet variant="outlined" sx={{ borderRadius: "md", p: "20px", m: "20px" }}>
        <Stack direction="row" >
          {data?.userCount && (
            <DataCard label="Count of users" value={data.userCount} icon={PersonOutlinedIcon} />
          )}

          <Divider orientation="vertical" sx={{ m: "20px" }} />

          {data?.offerCount && (
            <DataCard label="Count of offers" value={data.offerCount} icon={OfferIcon} />
          )}
        </Stack>
      </Sheet>
      {reports && <ReportTable reports={reports.reports} />}
    </Stack>
  );
};

export default Admin;
