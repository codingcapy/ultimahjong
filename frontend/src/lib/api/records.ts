import {
    queryOptions,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { ArgumentTypes, client, ExtractData } from "./client";
import { Record } from "../../../../schema/records";

type CreateRecordArgs = ArgumentTypes<
    typeof client.api.records.$post
>[0]["json"];

type DeleteRecordArgs = ArgumentTypes<
    typeof client.api.records.delete.$post
>[0]["json"];

type SerializeRecord = ExtractData<
    Awaited<ReturnType<typeof client.api.records.$get>>
>["records"][number];

export function mapSerializedRecordToSchema(
    SerializedRecord: SerializeRecord
): Record {
    return {
        ...SerializedRecord,
        createdAt: new Date(SerializedRecord.createdAt),
    };
}

async function createRecord(args: CreateRecordArgs) {
    const res = await client.api.records.$post({ json: args });
    if (!res.ok) {
        let errorMessage =
            "There was an issue creating your record :( We'll look into it ASAP!";
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
    if (!result.record) {
        throw new Error("Invalid response from server");
    }
    return mapSerializedRecordToSchema(result.record[0]);
}

export const useCreateRecordMutation = (
    onError?: (message: string) => void
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createRecord,
        onSettled: (args) => {
            if (!args) return console.log(args, "create args, returning");
            queryClient.invalidateQueries({ queryKey: ["records"] });
        },
        onError: (error) => {
            if (onError) {
                onError(error.message);
            }
        },
    });
};

async function getRecords() {
    const res = await client.api.records.$get();

    if (!res.ok) {
        throw new Error("Error getting records");
    }
    const { records } = await res.json();
    return records.map((record) => mapSerializedRecordToSchema(record));
}

export const getRecordsQueryOptions = () =>
    queryOptions({
        queryKey: ["records"],
        queryFn: () => getRecords(),
    });

async function deleteRecord(args: DeleteRecordArgs) {
    const res = await client.api.records.delete.$post({
        json: args,
    });
    if (!res.ok) {
        throw new Error("Error deleting game.");
    }
    const { record } = await res.json();
    return mapSerializedRecordToSchema(record);
}

export const useDeleteRecordMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteRecord,
        onSettled: (record) => {
            if (!record) return;
            queryClient.invalidateQueries({
                queryKey: ["records"],
            });
            queryClient.invalidateQueries({
                queryKey: ["records"],
            });
        },
    });
};
