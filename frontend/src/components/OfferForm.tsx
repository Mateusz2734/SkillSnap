import { Option, Select, Textarea, Button } from "@mui/joy";
import { useFormik } from "formik";

import { PostOfferPayload } from "../types/types";
import { skills } from "../data/skills";
import { usePostOffer } from "../api/offers";
import { toast } from "react-toastify";

type FormValues = PostOfferPayload;

export const OfferForm = () => {
  const { mutate } = usePostOffer();

  const formik = useFormik<FormValues>({
    initialValues: {
      skill: "",
      description: "",
    },
    onSubmit: (values) => {
      mutate(values);
      toast.success("Offer posted!");
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

  const skillError = formik.touched.skill && formik.errors.skill;
  const descriptionError = formik.touched.description && formik.errors.description;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Select
        sx={{
          width: 343,
          marginBottom: "1em",
        }}
        id="skill"
        name="skill"
        placeholder="Select a skill (required)"
        onChange={(_: unknown, value: string | null) =>
          formik.setFieldValue("skill", value || "")
        }
        onBlur={formik.handleBlur}
        value={formik.values.skill}
        color={skillError ? "danger" : "neutral"}
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
        }}
        id="description"
        name="description"
        minRows={3}
        placeholder="Description of your offer (required)"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        color={descriptionError ? "danger" : "neutral"}
      />
      <Button type="submit" fullWidth>Submit</Button>
    </form>
  );
};
