import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./config/routes";
import { useState } from "react";
import {
  ReferenceDataContext,
  ReferenceDataContextProvider,
} from "./providers/ReferenceDataContext";

function App() {
  return (
    // <AuthProvider>
    //<ReferenceDataContextProvider>
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          // index={route.index}
          path={route.path}
          // exact={route.exact}
          element={<route.component />}
        />
      ))}
    </Routes>
    //</ReferenceDataContextProvider>
    // </AuthProvider>
  );
}

export default App;
