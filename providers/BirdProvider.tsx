import React, { createContext, useContext, useState, ReactNode } from "react";

export type TBird = {
  id: string;
  name: string;
  description: string;
};

type TBirdContext = {
  birdList: TBird[];
   addBird: (bird: TBird) => void;
  deleteBird: (id: string) => void;
  hasBird: (id: string) => boolean;
};

export const BirdContext = createContext<TBirdContext>({
  birdList: [],
  addBird: () => {},
  deleteBird: () => {},
  hasBird: () => false,
});

export const BirdProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [birdList, setBirdList] = useState<TBird[]>([]);

  const addBird = (bird: TBird) => {
    setBirdList((prev) => {
    if (prev.find((b) => b.id === bird.id)) return prev;
      return [...prev, bird];
    });
  };

  const deleteBird = (id: string) => {
    setBirdList((prev) => prev.filter((b) => b.id !== id));
  };

  const hasBird = (id: string) => {
    return birdList.some((b) => b.id === id);
  };

  return (
    <BirdContext.Provider value={{ birdList, addBird, deleteBird, hasBird }}>
      {children}
    </BirdContext.Provider>
  );
};

export const useBirdsContext = (): TBirdContext => {
  const context = useContext(BirdContext);
  if (!context) {
    throw new Error("BirdProvider est manquant");
  }
  return context;
};
