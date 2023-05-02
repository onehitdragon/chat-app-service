interface StandardResponse{
    status: "success" | "error" | "missing" | "system error" | "not authorized",
    msg?: string
}

interface StandardResponseWithBody<TBody> extends StandardResponse{
    content?: TBody
}
