import LoadingButton from "@mui/lab/LoadingButton";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../common/axios-config";
import { Section } from "../common/Section";
import { CLASSIC_PARAMS, GameParamType } from "./gameParams";
import { TextFieldParam } from "./TextFieldParam";

export const Create = (): JSX.Element => {
  const navigate = useNavigate();
  const [gameType, setGameType] = React.useState<string>("");
  const [gameParams, setGameParams] = React.useState<GameParamType[] | null>(
    null
  );
  const [helpers, setHelpers] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!gameParams)
      throw new Error(
        "Error while handling submission: State `gameParams` is null."
      );
    if (!gameParams.map((param) => param.valid).every((value) => value)) {
      setHelpers(true);
      return;
    }
    setLoading(true);
    axiosClient
      .post("/games", {
        mm_type: gameType,
        mm_params: Object.fromEntries(
          gameParams.map((param) => [param.name, param.value])
        ),
      })
      .then((response) => navigate(`/games/${response.data.game_id}`))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    switch (gameType) {
      case "classic":
        setGameParams(CLASSIC_PARAMS);
        break;
      default:
        setGameParams(null);
    }
  }, [gameType]);

  return (
    <Section
      title="New Game"
      component="form"
      onSubmit={handleSubmit}
      error={error}
    >
      <FormControl size="small">
        <InputLabel id={"game-type"}>Type</InputLabel>
        <Select
          label="Type"
          labelId="game-type"
          value={gameType}
          onChange={(event) => setGameType(event.target.value)}
          variant="outlined"
          fullWidth
        >
          <MenuItem value="classic">Classic</MenuItem>
        </Select>
      </FormControl>
      {gameParams
        ? gameParams.map((param) => (
            <TextFieldParam key={param.name} param={param} helpers={helpers} />
          ))
        : null}
      <LoadingButton
        type="submit"
        loading={loading}
        disabled={!gameType}
        variant="outlined"
        fullWidth
      >
        Create
      </LoadingButton>
    </Section>
  );
};
