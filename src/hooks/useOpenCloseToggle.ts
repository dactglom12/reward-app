import * as React from "react";

export const useOpenCloseToggle = (defaultOpenState?: boolean) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpenState ?? false);

  const handleOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggle = React.useCallback(() => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  }, []);

  return React.useMemo(() => {
    return {
      handleClose,
      handleOpen,
      handleToggle,
      isOpen,
    };
  }, [handleOpen, handleClose, handleToggle, isOpen]);
};
