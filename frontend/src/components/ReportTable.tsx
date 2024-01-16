import { useState } from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import { IconButton, Link, Chip, Table, Sheet, Typography } from "@mui/joy";
import { CheckRounded, AutorenewRounded, DeleteOutlined } from "@mui/icons-material";

import { Report } from "../types/types";

type ReportTableProps = {
  reports: Report[];
};

type Status = "Resolved" | "Pending";

type StatusChipProps = {
  status: string;
  updateStatus: (newState: Status) => void;
};

export const ReportTable = (props: ReportTableProps) => {
  const [reports, setReports] = useState(props.reports);

  const removeReport = (reportId: number) => {
    setReports(reports.filter((report) => report.reportId !== reportId));
  };
  return (
    <Sheet
      variant="outlined"
      sx={{
        width: "90%",
        borderRadius: "md",
        overflow: "auto",
        minHeight: 0,
        maxHeight: "50vh",
      }}
    >
      <Table
        stickyHeader
        hoverRow
        sx={{
          "--TableCell-headBackground": "var(--joy-palette-background-level1)",
          "--Table-headerUnderlineThickness": "1px",
          "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
          "--TableCell-paddingY": "8px",
          "--TableCell-paddingX": "8px",
        }}
      >
        <thead>
          <tr >
            <th style={{ textAlign: "center" }}>
              <Typography level="title-lg">
                Status
              </Typography>
            </th>
            <th style={{ textAlign: "center" }}>
              <Typography level="title-lg">
                Date
              </Typography>
            </th>
            <th style={{ textAlign: "center" }}>
              <Typography level="title-lg">
                Reason
              </Typography>
            </th>
            <th style={{ textAlign: "center" }}>
              <Typography level="title-lg">
                Description
              </Typography>
            </th>
            <th style={{ textAlign: "center" }}>
              <Typography level="title-lg">
                Link
              </Typography>
            </th>
            <th style={{ textAlign: "center", width: "80px" }}>
              <Typography level="title-lg">
                Actions
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <ReportRow report={report} key={report.reportId} removeReport={removeReport} />
          ))}
        </tbody>
      </Table>
    </Sheet>);
};

type ReportRowProps = {
  report: Report;
  removeReport: (reportId: number) => void;
};

const ReportRow = ({ report, removeReport }: ReportRowProps) => {
  const [status, setStatus] = useState(report.status);

  const simulateDeletion = () => {
    removeReport(report.reportId);
  };

  return (
    <tr>
      <td style={{ textAlign: "center" }}>
        <StatusChip status={status} updateStatus={setStatus} />
      </td>
      <td style={{ textAlign: "center" }}>
        <Typography>{new Date(report.createdAt).toLocaleString()}</Typography>
      </td>
      <td style={{ textAlign: "center" }}>
        <Chip color="danger">
          {report.reason}
        </Chip>
      </td>
      <td style={{ textAlign: "center" }}>
        <div>
          <Typography>{report.description}</Typography>
        </div>
      </td>
      <td style={{ textAlign: "center" }}>
        <Link href={`/offers/${report.reportedOfferId}`} >
          Go to offer
        </Link>
      </td>
      <td style={{ textAlign: "center" }}>
        <IconButton variant="plain" color="danger" onClick={simulateDeletion}>
          <DeleteOutlined />
        </IconButton>
      </td>
    </tr>);
};

const StatusChip = (props: StatusChipProps) => {
  const color = {
    Resolved: "success",
    Pending: "warning",
  }[props.status] as ColorPaletteProp;

  const decorator = {
    Resolved: <CheckRounded />,
    Pending: <AutorenewRounded />,
  }[props.status];

  return <Chip
    variant="soft"
    startDecorator={decorator}
    color={color}
    onClick={() => {
      const newState = {
        Resolved: "Pending",
        Pending: "Resolved",
      }[props.status] as Status;
      props.updateStatus(newState);
    }}
  >
    {props.status}
  </Chip>;
}

