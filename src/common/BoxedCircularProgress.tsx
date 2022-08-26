import { Box, BoxProps, CircularProgress } from "@mui/material";
import { CircularProgressProps } from "@mui/material/CircularProgress/CircularProgress";
import * as React from "react";

type BoxedCircularProgressProps = {
  boxProps?: BoxProps;
  iconProps?: CircularProgressProps;
};

export const BoxedCircularProgress: (
  props: BoxedCircularProgressProps
) => JSX.Element = ({ boxProps, iconProps }) => (
  <Box {...boxProps} display="flex" alignItems="center" justifyContent="center">
    <CircularProgress {...iconProps} />
  </Box>
);
