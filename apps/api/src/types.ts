type ThreadMessage = {
    role: "user" | "assistant";
    content: string;
}

type Thread = {
    id: string;
    messages: ThreadMessage[];
}

type AddMessageToThreadInput = {
    threadId: string;
    message: Omit<ThreadMessage, "role">;
}

type StartThreadInput = {
    message: Omit<ThreadMessage, "role">;
}
