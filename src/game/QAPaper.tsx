import DeleteRoundedIcon from "@mui/icons-material/Delete";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";

type QAPaperProps = {
  question: string;
  answer: string;
  deleteQuestion: (question: string) => void;
  loading: boolean;
};

export const QAPaper: (props: QAPaperProps) => JSX.Element = ({
  question,
  answer,
  deleteQuestion,
  loading,
}) => (
  <Paper variant="outlined">
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={1}
    >
      <Box width="34px"></Box>
      <Typography fontFamily="monospace">{question}</Typography>
      <QuestionMarkIcon fontSize="small" />
      <Typography fontFamily="monospace">{answer}</Typography>
      <IconButton
        onClick={() => deleteQuestion(question)}
        color="primary"
        size="small"
        disabled={loading}
      >
        <DeleteRoundedIcon />
      </IconButton>
    </Stack>
  </Paper>
);
