import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Create } from "./create/Create";
import { Game } from "./game/Game";
import { Games } from "./games/Games";
import { NoMatch } from "./NoMatch";
import { Welcome } from "./Welcome";

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
