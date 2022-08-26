import { Button, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { BoxedCircularProgress } from "src/common/BoxedCircularProgress";
import { Section } from "src/common/Section";
import { axiosClient } from "src/common/axios-config";

export const Welcome = (): JSX.Element => {
  const [welcome, setWelcome] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
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
