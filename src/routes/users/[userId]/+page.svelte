<script>
    import {page} from "$app/stores"
    const userId = $page.params.userId;
    export let data;
    const user = data.user;
</script>

<div>
    <pre>
        {JSON.stringify(user, null, 4)}
    </pre>
    <div>
        <button>
            <a href="/users/">back</a>
        </button>
    </div>
</div>