import { Typography } from "@mui/material";
import { Section } from "src/common/Section";

export const NoMatch = (): JSX.Element => (
  <Section title="Content Not Found">
    <Typography textAlign="center">
      Sorry! The requested path does not match any route.
    </Typography>
  </Section>
);
