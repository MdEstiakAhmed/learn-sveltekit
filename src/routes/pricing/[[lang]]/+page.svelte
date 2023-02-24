<script>
    import {page} from "$app/stores";
    const lang = $page.params.lang;
    console.log(lang);
</script>

<h1>pricing in {lang || "global"}</h1>