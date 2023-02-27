import { error } from "@sveltejs/kit";

export const load = async (serverLoadEvent) => {
    /**
     * @property{fetch} - fetch function from the serverLoadEvent
     * @property{params} - params object from the serverLoadEvent
     * @property{url} - url object from the serverLoadEvent
     * @property{route} - route object from the serverLoadEvent
     */
    const { fetch, params} = serverLoadEvent;
    const { userId } = params;
    const title = "user data";
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (response.statusText === "OK") {
        const user = await response.json();
        return { title, user };
    }
    else {
        throw error(404, "User not found");
    }
}