<script>
    export let data;
    const users = data.users;
</script>

<div>
    <h1>{data.title}</h1>
    <ul>
        {#each users as user}
            <li><a href="/users/{user.id}">{user.name}</a></li>
        {/each}
    </ul>
</div>