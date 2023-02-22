import { ListItem, Typography } from "@mui/material";
import * as React from "react";
import { FixedSizeList } from "react-window";
import { BoxedCircularProgress } from "../common/BoxedCircularProgress";
import { Subsection } from "../common/Subsection";
import { ScoredLabelType } from "./Game";

type SolutionsProps = {
  bestSolutions: ScoredLabelType[] | null;
  loading: boolean;
};

type RenderSolutionProps = {
  index: number;
  style: React.CSSProperties;
};

const makeRenderSolutions =
  (bestSolutions: ScoredLabelType[]): React.FC<RenderSolutionProps> =>
  ({ index, style }) => {
    const option = bestSolutions[index];

    return (
      <ListItem style={style}>
        <Typography fontFamily="monospace">
          {`${option.label} (p=${option.score.toFixed(6)})`}
        </Typography>
      </ListItem>
    );
  };

export const Solutions: (props: SolutionsProps) => JSX.Element = ({
  bestSolutions,
  loading,
}) => (
  <Subsection title="Solutions">
    {!loading && bestSolutions ? (
      <FixedSizeList
        height={360}
        width={380}
        itemSize={36}
        itemCount={bestSolutions.length}
        overscanCount={10}
      >
        {makeRenderSolutions(bestSolutions)}
      </FixedSizeList>
    ) : (
      <BoxedCircularProgress boxProps={{ height: 360 }} />
    )}
  </Subsection>
);
