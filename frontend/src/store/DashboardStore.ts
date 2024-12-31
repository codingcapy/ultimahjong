import { create } from "zustand";

type gamesStore = {
  games: any;
  setGames: (args: any) => void;
  currentGameId: number;
  setCurrentGameId: (args: any) => void;
};

const useGamesStore = create<gamesStore>((set, _) => ({
  games: [],
  setGames: (args: any) => set({ games: args }),
  currentGameId: 0,
  setCurrentGameId: (args: any) => set({ currentGameId: args }),
}));

export default useGamesStore;
