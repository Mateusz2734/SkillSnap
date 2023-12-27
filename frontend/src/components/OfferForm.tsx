import { Option, Select, Textarea, Button } from "@mui/joy";
import { useFormik } from "formik";
import { useTheme } from "@mui/joy";

import { PostOfferPayload } from "../types/types";
import { skills } from "../data/skills";

type FormValues = PostOfferPayload;

export const OfferForm = () => {
  const theme = useTheme();
  const handleSelectChange = (_: unknown, value: string | null) => {
    formik.setFieldValue("skill", value || "");
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      skill: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validate(values) {
      const errors: Partial<FormValues> = {};
      if (!values.skill) {
        errors.skill = "Required";
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
            formik.touched.skill && formik.errors.skill
              ? theme.vars.palette.danger[200]
              : null,
        }}
        id="skill"
        name="skill"
        placeholder="Select a skill (required)"
        onChange={handleSelectChange}
        onBlur={formik.handleBlur}
        value={formik.values.skill}
      >
        {skills.map((skill) => (
          <Option key={skill} value={skill}>
            {skill}
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
        placeholder="Description of your offer (required)"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
