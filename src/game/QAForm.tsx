import LoadingButton from "@mui/lab/LoadingButton";
import * as React from "react";
import { useParams } from "react-router-dom";
import { axiosClient } from "../common/axios-config";
import { Subsection } from "../common/Subsection";
import { QADictType, ScoredLabelType } from "./Game";
import { QAField } from "./QAField";

type QAFormProps = {
  qAndA: QADictType;
  bestQuestions: ScoredLabelType[] | null;
  play: (question: string, answer: string) => void;
  loading: boolean;
};

export const QAForm: (props: QAFormProps) => JSX.Element = ({
  qAndA,
  bestQuestions,
  play,
  loading,
}) => {
  const { gameId } = useParams();
  const [bestAnswers, setBestAnswers] = React.useState<
    ScoredLabelType[] | null
  >(null);
  const [question, setQuestion] = React.useState<ScoredLabelType | null>(null);
  const [answer, setAnswer] = React.useState<ScoredLabelType | null>(null);
  const [inputQuestion, setInputQuestion] = React.useState<string>("");
  const [inputAnswer, setInputAnswer] = React.useState<string>("");
  const [loadingA, setLoadingA] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    setLoadingA(true);
    setAnswer(null);
    setInputAnswer("");
    if (!question) return;
    axiosClient
      .get(`/games/${gameId}`, {
        params: { answers: true, question: question.label },
      })
      .then((response) => setBestAnswers(response.data.best_answers))
      .catch((error) => setError(error))
      .finally(() => setLoadingA(false));
  }, [gameId, question]);

  React.useEffect(() => {
    setQuestion(null);
    setAnswer(null);
    setInputQuestion("");
    setInputAnswer("");
  }, [qAndA]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!question)
      throw new Error(
        "Error while handling submission: State `question` is null."
      );
    if (!answer)
      throw new Error(
        "Error while handling submission: State `answer` is null."
      );
    play(question.label, answer.label);
  };

  return (
    <Subsection
      title="Play"
      component="form"
      onSubmit={handleSubmit}
      error={error}
    >
      <QAField
        label={"Question"}
        options={bestQuestions}
        value={question}
        setValue={setQuestion}
        inputValue={inputQuestion}
        setInputValue={setInputQuestion}
        formatter={(option: ScoredLabelType) =>
          `${option.label} (${option.score.toFixed(2)} bits)`
        }
        getOptionDisabled={(option: ScoredLabelType) => option.label in qAndA}
        loading={loading}
      />
      <QAField
        label={"Answer"}
        options={bestAnswers}
        value={answer}
        setValue={setAnswer}
        inputValue={inputAnswer}
        setInputValue={setInputAnswer}
        formatter={(option: ScoredLabelType) =>
          `${option.label} (p=${option.score.toFixed(6)})`
        }
        getOptionDisabled={(option: ScoredLabelType) => option.score === 0}
        loading={loadingA}
        disabled={!question}
      />
      <LoadingButton
        type="submit"
        loading={loading}
        disabled={!question || !answer}
        variant="outlined"
        fullWidth
      >
        Submit
      </LoadingButton>
    </Subsection>
  );
};
