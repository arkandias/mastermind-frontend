import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BoxedCircularProgress } from "src/common/BoxedCircularProgress";
import { Section } from "src/common/Section";
import { axiosClient } from "src/common/axios-config";
import { QAForm } from "src/game/QAForm";
import { QAndA } from "src/game/QAndA";
import { Solutions } from "src/game/Solutions";

type QAType = {
  question: string;
  answer: string;
};

export type QADictType = Record<string, string>;

export type ScoredLabelType = {
  label: string;
  score: number;
};

const fromList = (qaList: QAType[]): QADictType => {
  const qAndA: QADictType = {};
  for (const qa of qaList) {
    qAndA[qa.question] = qa.answer;
  }
  return qAndA;
};

export const Game = (): JSX.Element => {
  const { gameId } = useParams();
  const [qAndA, setQAndA] = useState<QADictType | null>(null);
  const [bestQuestions, setBestQuestions] = useState<ScoredLabelType[] | null>(
    null
  );
  const [bestSolutions, setBestSolutions] = useState<ScoredLabelType[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const play = (question: string, answer: string): void => {
    setLoading(true);
    axiosClient
      .post(`/games/${gameId}/questions`, { question, answer })
      .then(() => {
        setQAndA({ ...qAndA, [question]: answer });
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const reset = (): void => {
    setLoading(true);
    axiosClient
      .delete(`/games/${gameId}/questions`)
      .then(() => setQAndA({}))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const deleteQuestion = (question: string): void => {
    if (!qAndA)
      throw new Error("Error while deleting question: State `qAndA` is null.");
    setLoading(true);
    axiosClient
      .delete(`/games/${gameId}/questions/${question}`)
      .then(() => {
        const { [question]: _, ...newQAndA } = qAndA;
        setQAndA(newQAndA);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/games/${gameId}/questions`)
      .then((response) => setQAndA(fromList(response.data)))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [gameId]);

  useEffect(() => {
    if (qAndA === null) return;
    setLoading(true);
    axiosClient
      .get(`/games/${gameId}`, {
        params: { questions: true, solutions: true },
      })
      .then((response) => {
        setBestQuestions(response.data.best_questions);
        setBestSolutions(response.data.best_solutions);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [gameId, qAndA]);

  return (
    <Section title={`Game #${gameId}`} spacing={3} error={error}>
      {qAndA ? (
        <>
          <QAndA
            qAndA={qAndA}
            reset={reset}
            deleteQuestion={deleteQuestion}
            loading={loading}
          />
          <QAForm
            qAndA={qAndA}
            bestQuestions={bestQuestions}
            play={play}
            loading={loading}
          />
          <Solutions bestSolutions={bestSolutions} loading={loading} />
        </>
      ) : (
        <BoxedCircularProgress />
      )}
    </Section>
  );
};
