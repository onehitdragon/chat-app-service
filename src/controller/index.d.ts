interface StandardResponse<TBody = any>{
    status: "success" | "error" | "missing" | "system error" | "not authorized",
    msg?: string,
    content?: TBody
}
