import { create } from "zustand";

type gamesStore = {
  games: any;
  setGames: (args: any) => void;
};

const useGamesStore = create<gamesStore>((set, _) => ({
  games: [],
  setGames: (args: any) => set({ games: args }),
}));

export default useGamesStore;
