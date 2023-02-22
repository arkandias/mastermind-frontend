import { Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import { GameDetails } from "./GameDetails";
import { GameDropdownMenu } from "./GameDropdownMenu";

type GamePaperProps = {
  gameId: number;
  gameType: string;
  gameParams: object;
  numQA: number;
  deleteGame: (gameId: number) => void;
};

export const GamePaper: (props: GamePaperProps) => JSX.Element = ({
  gameId,
  gameType,
  gameParams,
  numQA,
  deleteGame,
}) => (
  <Paper variant="outlined">
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={1}
    >
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="flex-start"
        spacing={1}
      >
        <Typography>#{gameId}</Typography>
        <GameDetails
          gameType={gameType}
          gameParams={gameParams}
          numQA={numQA}
        />
      </Stack>
      <GameDropdownMenu gameId={gameId} deleteGame={deleteGame} />
    </Stack>
  </Paper>
);
