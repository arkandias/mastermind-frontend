import { Button, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { axiosClient } from "./common/axios-config";
import { BoxedCircularProgress } from "./common/BoxedCircularProgress";
import { Section } from "./common/Section";

export const Welcome = (): JSX.Element => {
  const [welcome, setWelcome] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    axiosClient
      .get("/")
      .then((response: AxiosResponse<string>) => setWelcome(response.data))
      .catch((error) => setError(error));
  }, []);

  return (
    <Section title="Welcome" error={error}>
      {welcome ? (
        <Typography textAlign="center">{welcome}</Typography>
      ) : (
        <BoxedCircularProgress />
      )}
      <Button component={RouterLink} to="/games" variant="outlined" fullWidth>
        Continue
      </Button>
    </Section>
  );
};
