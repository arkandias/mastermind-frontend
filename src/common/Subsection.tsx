import { Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import { SectionProps } from "src/common/Section";
import { SnackError } from "src/common/SnackError";

export const Subsection: <C extends React.ElementType>(
  props: SectionProps<C>
) => JSX.Element = ({ title, error, ...rest }) => (
  <Paper elevation={6} sx={{ p: 1 }}>
    <Typography textAlign="center" variant="h6" sx={{ mb: 1 }}>
      {title}
    </Typography>
    <Stack
      {...rest}
      direction="column"
      alignItems="stretch"
      justifyContent="flex-start"
      spacing={1}
    />
    {error ? <SnackError error={error} /> : null}
  </Paper>
);
