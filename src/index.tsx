import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "src/App";
import { NoMatch } from "src/NoMatch";
import { Welcome } from "src/Welcome";
import { Create } from "src/create/Create";
import { Game } from "src/game/Game";
import { Games } from "src/games/Games";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Welcome />} />
          <Route path="games">
            <Route index element={<Games />} />
            <Route path="create" element={<Create />} />
            <Route path=":gameId" element={<Game />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
