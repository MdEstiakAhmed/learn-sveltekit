<script>
    export let data;
    const todos = data.todo;
</script>

<div>
    <h1>{data.title}</h1>
    <ul>
        {#each todos as todo}
            <li><a href="/todos/{todo.id}">{todo.title}</a></li>
        {/each}
    </ul>
</div>