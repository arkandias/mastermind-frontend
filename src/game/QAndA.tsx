import LoadingButton from "@mui/lab/LoadingButton";
import * as React from "react";
import { Subsection } from "../common/Subsection";
import { QADictType } from "./Game";
import { QAPaper } from "./QAPaper";

type QAndAProps = {
  qAndA: QADictType;
  reset: () => void;
  deleteQuestion: (question: string) => void;
  loading: boolean;
};

export const QAndA: (props: QAndAProps) => JSX.Element = ({
  qAndA,
  reset,
  deleteQuestion,
  loading,
}) => (
  <Subsection title="Q&A">
    {Object.entries(qAndA).map(([question, answer]) => (
      <QAPaper
        key={question}
        question={question}
        answer={answer}
        deleteQuestion={deleteQuestion}
        loading={loading}
      />
    ))}
    <LoadingButton
      onClick={reset}
      loading={loading}
      variant="outlined"
      fullWidth
    >
      Reset
    </LoadingButton>
  </Subsection>
);
