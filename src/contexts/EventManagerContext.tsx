import { useEventsManager } from "@hooks/useEventsManager";
import * as React from "react";

interface EventManagerContextValue
  extends ReturnType<typeof useEventsManager> {}

interface EventManagerProviderProps {
  children: React.ReactNode;
}

export const EventManagerContext = React.createContext(
  {} as EventManagerContextValue
);

export const EventManagerProvider: React.FC<EventManagerProviderProps> = ({
  children,
}) => {
  const manager = useEventsManager();

  const value = React.useMemo(() => manager, [manager]);

  return (
    <EventManagerContext.Provider value={value}>
      {children}
    </EventManagerContext.Provider>
  );
};
