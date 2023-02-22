import { Button } from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { axiosClient } from "../common/axios-config";
import { BoxedCircularProgress } from "../common/BoxedCircularProgress";
import { Section } from "../common/Section";
import { GamePaper } from "./GamePaper";

type GameType = {
  game_id: number;
  mm_type: string;
  mm_params: object;
  num_qa: number;
};

export const Games = (): JSX.Element => {
  const [games, setGames] = React.useState<GameType[] | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  const deleteGame = (gameId: number): void => {
    if (!games)
      throw new Error("Error while deleting game: State `games` is null.");
    axiosClient
      .delete(`/games/${gameId}`)
      .then(() => {
        setGames(games.filter((game) => game.game_id !== gameId));
      })
      .catch((error) => setError(error));
  };

  React.useEffect(() => {
    axiosClient
      .get("/games")
      .then((response) => setGames(response.data))
      .catch((error) => setError(error));
  }, []);

  return (
    <Section title="Games" error={error}>
      {games?.map((game) => (
        <GamePaper
          key={game.game_id}
          gameId={game.game_id}
          gameType={game.mm_type}
          gameParams={game.mm_params}
          numQA={game.num_qa}
          deleteGame={deleteGame}
        />
      )) ?? <BoxedCircularProgress />}
      <Button
        component={RouterLink}
        to="/games/create"
        variant="outlined"
        fullWidth
      >
        New Game
      </Button>
    </Section>
  );
};
