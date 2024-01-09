import { useTheme } from "@mui/joy";
import { useFormik } from "formik";
import { Select, Textarea, Button, Option } from "@mui/joy";

import { usePostReport } from "../api/report";
import { PostReportPayload } from "../types/types";
import { reportReasons } from "../data/reportReasons";

export type ReportFormProps = {
  offerId: number;
};

type FormValues = PostReportPayload;

export const ReportForm = (props: ReportFormProps) => {
  const { mutate } = usePostReport();
  const theme = useTheme();

  const formik = useFormik<FormValues>({
    initialValues: {
      reason: "",
      description: "",
      status: "Pending",
      reportedOfferId: props.offerId
    },
    onSubmit: (values) => {
      mutate(values);
    },
    validate(values) {
      const errors: Partial<FormValues> = {};
      if (!values.reason) {
        errors.reason = "Required";
      }
      if (!values.description) {
        errors.description = "Required";
      }
      return errors;
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Select
        sx={{
          width: 343,
          marginBottom: "1em",
          backgroundColor:
            formik.touched.reason && formik.errors.reason
              ? theme.vars.palette.danger[200]
              : null,
        }}
        id="reason"
        name="reason"
        placeholder="Select a reason (required)"
        onChange={(_: unknown, value: string | null) =>
          formik.setFieldValue("reason", value || "")
        }
        onBlur={formik.handleBlur}
        value={formik.values.reason}
      >
        {reportReasons.map((reason) => (
          <Option key={reason} value={reason}>
            {reason}
          </Option>
        ))}
      </Select>

      <Textarea
        sx={{
          width: 343,
          marginBottom: "1em",
          backgroundColor:
            formik.touched.description && formik.errors.description
              ? theme.vars.palette.danger[200]
              : null,
        }}
        id="description"
        name="description"
        minRows={3}
        placeholder="Description of your report (required)"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
      />
      <Button type="submit" fullWidth>Submit</Button>
    </form>
  );
};
