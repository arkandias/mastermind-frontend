import { LoadingButton } from "@mui/lab";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Subsection } from "src/common/Subsection";
import { axiosClient } from "src/common/axios-config";
import { QADictType, ScoredLabelType } from "src/game/Game";
import { QAField } from "src/game/QAField";

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
  const [bestAnswers, setBestAnswers] = useState<ScoredLabelType[] | null>(
    null
  );
  const [question, setQuestion] = useState<ScoredLabelType | null>(null);
  const [answer, setAnswer] = useState<ScoredLabelType | null>(null);
  const [inputQuestion, setInputQuestion] = useState<string>("");
  const [inputAnswer, setInputAnswer] = useState<string>("");
  const [loadingA, setLoadingA] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
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

  useEffect(() => {
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
