import { Typography } from "@mui/material";
import * as React from "react";

type GameDetailsProps = {
  gameType: string;
  gameParams: object;
  numQA: number;
};

export const GameDetails: (props: GameDetailsProps) => JSX.Element = ({
  gameType,
  gameParams,
  numQA,
}) => (
  <Typography>
    Type: {gameType}
    <br />
    Parameters:{" "}
    {gameParams
      ? Object.entries(gameParams)
          .map(([name, value]) => {
            return value ? `${name}=${value}` : null;
          })
          .filter((item) => item !== null)
          .join(", ")
      : null}
    <br />
    Number of questions: {numQA}
  </Typography>
);
