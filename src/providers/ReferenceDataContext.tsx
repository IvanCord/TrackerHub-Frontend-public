import { createContext, useState, ReactNode } from "react";
import { Data } from "../utils/types";
import { autos, motos, blockers } from "../utils/dataDummy";

export type ContextValue = {
  dataContext: Data;
  setDataContext: Function;
};
const ReferenceDataContext = createContext<ContextValue>({} as ContextValue);

type ReferenceDataContextProviderProps = {
  children: JSX.Element;
};

const ReferenceDataContextProvider = ({
  children,
}: ReferenceDataContextProviderProps) => {
  const initData: Data = { autos, motos, blockers };
  const [dataContext, setDataContext] = useState<Data>(initData);
  return (
    <ReferenceDataContext.Provider value={{ dataContext, setDataContext }}>
      {children}
    </ReferenceDataContext.Provider>
  );
};

export { ReferenceDataContext, ReferenceDataContextProvider };
