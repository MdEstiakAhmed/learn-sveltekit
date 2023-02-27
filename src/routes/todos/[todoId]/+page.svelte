<script>
    import {page} from "$app/stores"
    const todoId = $page.params.todoId;
</script>

<div>
    I am user {todoId}
    <button>
        <a href="/todos">back</a>
    </button>
</div>