// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatRequestBody(endpoint: string, userId: string | undefined, content: Record<string, any>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: Record<string, any> = {
        was: endpoint,
        ...content,
    };

    if (userId) {
        body.userid = userId;
    }

    return body;
}

export default formatRequestBody;
