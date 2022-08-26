import { LoadingButton } from "@mui/lab";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "src/common/Section";
import { axiosClient } from "src/common/axios-config";
import { TextFieldParam } from "src/create/TextFieldParam";
import { GameParamType, CLASSIC_PARAMS } from "src/create/gameParams";

export const Create = (): JSX.Element => {
  const navigate = useNavigate();
  const [gameType, setGameType] = useState<string>("");
  const [gameParams, setGameParams] = useState<GameParamType[] | null>(null);
  const [helpers, setHelpers] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

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

  useEffect(() => {
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
