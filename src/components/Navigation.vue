<template>
    <header id="header">
        <div class="header-inner">
            <a class="left-logo" href="/">
                <img class="sticky-logo" src="@/assets/small-image-logo.jpg" alt="Castle Howard, Historic House North Yorkshire" title="Castle Howard, Historic House North Yorkshire" />
            </a>
            <ul>
                <li><router-link class="header-link" to="/">Membership</router-link></li>
                <li><router-link class="header-link" to="/information">Information</router-link></li>
            </ul>
            <a class="right-logo" href="/">
                <img class="static-logo" src="@/assets/medium-text-logo.jpg" alt="Castle Howard, Historic House North Yorkshire" title="Castle Howard, Historic House North Yorkshire" />
            </a>
        </div>
    </header>
</template>

<script>
export default {
    
}
</script>