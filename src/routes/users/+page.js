export const load  = async (loadEvent) => {
    console.log("hello from client");
    const {fetch} = loadEvent;
    const title = "users list";
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    return {title, users};
}