import { LoadingButton } from "@mui/lab";
import { Subsection } from "src/common/Subsection";
import { QADictType } from "src/game/Game";
import { QAPaper } from "src/game/QAPaper";

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
