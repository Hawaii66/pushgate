import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

const NewApiContext = createContext<{
  newApiKey: string | undefined;
  setNewApiKey: (key: string | undefined) => void;
}>({
  newApiKey: undefined,
  setNewApiKey: () => {},
});

export const useNewApiContext = () => useContext(NewApiContext);

export function NewApiKeyWrapper({ children }: PropsWithChildren) {
  const [newApiKey, setNewApiKey] = useState<string | undefined>(undefined);

  return (
    <NewApiContext.Provider
      value={{
        newApiKey,
        setNewApiKey,
      }}
    >
      {children}
    </NewApiContext.Provider>
  );
}
