import { ColorPaletteProp } from '@mui/joy/styles';
import Chip from '@mui/joy/Chip';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';

import { Report } from '../types/types';
import { Link } from '@mui/joy';

export const ReportTable = (props: { reports: Report[]; }) =>
(
  <Sheet
    variant="outlined"
    sx={{
      width: '80%',
      borderRadius: 'sm',
      overflow: 'auto',
      minHeight: 0,
    }}
  >
    <Table
      stickyHeader
      hoverRow
      sx={{
        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
        '--Table-headerUnderlineThickness': '1px',
        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
        '--TableCell-paddingY': '4px',
        '--TableCell-paddingX': '8px',
      }}
    >
      <thead>
        <tr>
          <th style={{ textAlign: 'center' }}>Date</th>
          <th style={{ textAlign: 'center' }}>
            Reason
          </th>
          <th style={{ textAlign: 'center' }}>Status</th>
          <th style={{ textAlign: 'center' }}>Description</th>
          <th style={{ textAlign: 'center' }}>Link</th>
        </tr>
      </thead>
      <tbody>
        {props.reports.map((report) => (
          <tr key={report.reportId}>
            <td>
              <Typography level="body-xs">{new Date(report.createdAt).toLocaleString()}</Typography>
            </td>
            <td>
              <Typography>
                <Chip
                  size="sm"
                  color="danger"
                >
                  {report.reason}
                </Chip>
              </Typography>
            </td>
            <td>
              <Chip
                variant="soft"
                size="sm"
                startDecorator={
                  {
                    Resolved: <CheckRoundedIcon />,
                    Pending: <AutorenewRoundedIcon />,
                  }[report.status]
                }
                color={
                  {
                    Resolved: 'success',
                    Pending: 'warning',
                  }[report.status] as ColorPaletteProp
                }
              >
                {report.status}
              </Chip>
            </td>
            <td>
              <div>
                <Typography level="body-xs">{report.description}</Typography>
              </div>
            </td>
            <td>
              <Link level="body-xs" href={`/offer/${report.reportedOfferId}`} >
                Go to offer
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Sheet>);
