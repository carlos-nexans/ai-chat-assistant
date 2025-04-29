export type ThreadMessage = {
    role: "user" | "assistant";
    content: string;
}

export type Thread = {
    id: string;
    title: string | null
    messages: ThreadMessage[];
}

export type AddMessageToThreadInput = {
    threadId: string;
    message: Omit<ThreadMessage, "role">;
}

export type StartThreadInput = {
    message: Omit<ThreadMessage, "role">;
}
