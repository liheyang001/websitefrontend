<template>
    <div class = "home">
        <h1 class="page-header"></h1>
        <div id="main-carousel" class="carousel slide carousel-fade" data-ride="main-carousel"><ol class="carousel-indicators"><li data-target="#main-carousel" data-slide-to="0" class=""></li><li data-target="#main-carousel" data-slide-to="1" class=""></li><li data-target="#main-carousel" data-slide-to="2" class="active"></li></ol><div class="carousel-inner">
            <div class="item">
                <a v-bind:href="'/about'" class="hover-link" style="height: 560px;">
                <div class="carousel-image"><img src="./assets/3.gif" alt="about us" style="    " class="img-responsive center-block img-resize"></div>
                </a>
            </div>
            <div class="item">
                <a v-bind:href="'/project/2'" class="hover-link" style="height: 560px;">
                <div class="carousel-image"><img src="./assets/2.jpg" alt="2" style="    " class="img-responsive center-block img-resize"></div>
                </a>
            </div>
            <div class="item active">
                <a v-bind:href="'/project/'" class="hover-link" style="height: 560px;">
                <div class="carousel-image"><img src="./assets/1.jpg" alt="1" style="    " class="img-responsive center-block img-resize"></div>
                </a>
            </div>


            <nav class="text-center navbar navbar-inverse carousel-links">

            </nav></div><!-- Left and right controls -->
            <a class="left carousel-control" href="#main-carousel" role="button" data-slide="prev">
                <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#main-carousel" role="button" data-slide="next">
                <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>

    </div>
</template>

<script>

</script>

<style scoped>
</style>