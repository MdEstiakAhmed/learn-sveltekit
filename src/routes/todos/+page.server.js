export const load  = async (serverLoadEvent) => {
    console.log("hello from server");
    const {fetch} = serverLoadEvent;
    const title = "todo list";
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todo = await response.json();
    return {title, todo};
}