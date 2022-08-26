import { SnackError } from "./SnackError";
import { Box, Stack, StackProps, Typography } from "@mui/material";
import * as React from "react";

export type SectionProps<C extends React.ElementType> = Partial<
  StackProps<C, { component?: C }>
> & {
  title: string;
  error?: Error | null;
};

export const Section: <C extends React.ElementType>(
  props: SectionProps<C>
) => JSX.Element = ({ title, error, ...rest }) => (
  <Box>
    <Typography textAlign="center" variant="h5" sx={{ my: 2 }}>
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
  </Box>
);
