import {
    queryOptions,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { Game } from "../../../../schema/games";
import { ArgumentTypes, client, ExtractData } from "./client";

type CreateGameArgs = ArgumentTypes<typeof client.api.games.$post>[0]["json"];

type DeleteGameArgs = ArgumentTypes<
    typeof client.api.games.delete.$post
>[0]["json"];

type SerializeGame = ExtractData<
    Awaited<ReturnType<typeof client.api.games.$get>>
>["games"][number];

export function mapSerializedGameToSchema(SerializedGame: SerializeGame): Game {
    return {
        ...SerializedGame,
        createdAt: new Date(SerializedGame.createdAt),
    };
}

async function createGame(args: CreateGameArgs) {
    const res = await client.api.games.$post({ json: args });
    if (!res.ok) {
        let errorMessage =
            "There was an issue creating your account :( We'll look into it ASAP!";
        try {
            const errorResponse = await res.json();
            if (
                errorResponse &&
                typeof errorResponse === "object" &&
                "message" in errorResponse
            ) {
                errorMessage = String(errorResponse.message);
            }
        } catch (error) {
            console.error("Failed to parse error response:", error);
        }
        throw new Error(errorMessage);
    }
    const result = await res.json();
    if (!result.game) {
        throw new Error("Invalid response from server");
    }
    return mapSerializedGameToSchema(result.game);
}

export const useCreateGameMutation = (onError?: (message: string) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createGame,
        onSettled: (args) => {
            if (!args) return console.log(args, "create args, returning");
            queryClient.invalidateQueries({ queryKey: ["games"] });
        },
        onError: (error) => {
            if (onError) {
                onError(error.message);
            }
        },
    });
};

async function getGames() {
    const res = await client.api.games.$get();

    if (!res.ok) {
        throw new Error("Error getting chats by chatId");
    }
    const { games } = await res.json();
    return games.map((game) => mapSerializedGameToSchema(game));
}

export const getGamesQueryOptions = () =>
    queryOptions({
        queryKey: ["games"],
        queryFn: () => getGames(),
    });

async function deleteGame(args: DeleteGameArgs) {
    const res = await client.api.games.delete.$post({
        json: args,
    });
    if (!res.ok) {
        throw new Error("Error updating user.");
    }
    const { game } = await res.json();
    return mapSerializedGameToSchema(game);
}

export const useDeleteGameMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteGame,
        onSettled: (game) => {
            if (!game) return;
            queryClient.invalidateQueries({
                queryKey: ["games"],
            });
            queryClient.invalidateQueries({
                queryKey: ["games"],
            });
        },
    });
};
