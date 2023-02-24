<script>
	import { goto, beforeNavigate, afterNavigate } from '$app/navigation';
	const gotoHome = () => {
        /**
         * @param {String} - path string
         * @param {Object} - { replaceState: true | false }
        */
		goto('/');
	};

    beforeNavigate((navigation) => {
        console.log('before navigate',navigation);
    });

    afterNavigate((navigation) => {
        console.log('after navigate',navigation);
    });
</script>

<button on:click="{gotoHome}">goto home</button>