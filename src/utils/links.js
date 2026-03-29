import { clients } from "../data/videos_client.js";

export function getFirstClientSlug(baseUrl) {
    const firstClient = clients[0];

    const toSlug = (title) =>
        title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

    return baseUrl + "client/" + toSlug(firstClient.title);
}