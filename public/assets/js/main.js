document.addEventListener('DOMContentLoaded', function () {
    function myHeader(){
        let header = document.getElementById("header");
        let lol = document.getElementById("lol");
        window.addEventListener("scroll" , function(){
            if(window.scrollY > 0){
                header.classList.add("active");
                lol.src = "assets/images/bulb2.png";
            }else{
                header.classList.remove("active");
                lol.src = "assets/images/bulb.png";
            }
        })
    }
    myHeader();

    function myBars(){
        let bars = document.querySelector("#bar");
        let nav = document.querySelector(".navigation");
        bars.onclick = function(){
            if(nav.style.right == "0%"){
                nav.style.right = "-50%";
                bars.src = "assets/images/menu.png"
            }else{
                nav.style.right = "0%";
                bars.src = "assets/images/x.png"
            }
            nav.classList.toggle("new")
        }
    }
    myBars()

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    var swiper = new Swiper(".mySwiper1", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: true,
        speed: 600,
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            991: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    });
});
