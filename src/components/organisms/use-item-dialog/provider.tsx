import { createContext, useContext, useState } from "react";

type ActivateItemDialogProps = {
  open: boolean;
  item?: {
    imageSource: string;
    description: string;
    itemName: string;
  };
};

type ActivateItemDialogAction = {
  setOpen: (data: ActivateItemDialogProps["item"]) => void;
  setClose: () => void;
};

const ActivateItemDialogContext = createContext<
  (ActivateItemDialogProps & ActivateItemDialogAction) | undefined
>(undefined);

const ActivateItemDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState<ActivateItemDialogProps>({ open: false });

  const setOpen = (data: ActivateItemDialogProps["item"]) => {
    setValue({
      open: true,
      item: data,
    });
  };

  const setClose = () => {
    setValue({ open: false });
  };

  return (
    <ActivateItemDialogContext.Provider
      value={{
        ...value,
        setOpen,
        setClose,
      }}
    >
      {children}
    </ActivateItemDialogContext.Provider>
  );
};

const useItemDialog = () => {
  const context = useContext(ActivateItemDialogContext);
  if (context === undefined) {
    throw new Error("useItemDialog must be used within a ActivateItemDialogProvider");
  }
  return context;
};

export { ActivateItemDialogProvider, useItemDialog };
