import { useFormik } from "formik";
import { Select, Textarea, Button, Option } from "@mui/joy";

import { usePostReport } from "../api/report";
import { PostReportPayload } from "../types/types";
import { reportReasons } from "../data/reportReasons";
import { toast } from "react-toastify";

export type ReportFormProps = {
  offerId: number;
};

type FormValues = PostReportPayload;

export const ReportForm = (props: ReportFormProps) => {
  const { mutate } = usePostReport();

  const formik = useFormik<FormValues>({
    initialValues: {
      reason: "",
      description: "",
      status: "Pending",
      reportedOfferId: props.offerId
    },
    onSubmit: (values) => {
      mutate(values);
      toast.success("Report submitted!");
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

  const reasonError = formik.touched.reason && formik.errors.reason;
  const descriptionError = formik.touched.description && formik.errors.description;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Select
        sx={{
          width: 343,
          marginBottom: "1em",
        }}
        id="reason"
        name="reason"
        placeholder="Select a reason (required)"
        onChange={(_: unknown, value: string | null) =>
          formik.setFieldValue("reason", value || "")
        }
        onBlur={formik.handleBlur}
        value={formik.values.reason}
        color={reasonError ? "danger" : "neutral"}
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
        }}
        id="description"
        name="description"
        minRows={3}
        placeholder="Description of your report (required)"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        color={descriptionError ? "danger" : "neutral"}
      />
      <Button type="submit" fullWidth>Submit</Button>
    </form>
  );
};
