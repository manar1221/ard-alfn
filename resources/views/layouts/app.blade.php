<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> أرض الفن </title>
    <!-- Favicon -->
    <link href="{{ asset('assets/images/logo1.png')}}" rel="icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Swiper CSS -->
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css"/>
    <link rel="stylesheet" href="{{ asset('assets/css/style.css')}}">
    @livewireStyles
</head>
<body>

    <!-- start header -->

    <header id="header">
        <div class="logo">
            <a href="/">
                <img id="" src="{{ asset('assets/images/logo1.png')}}" alt="أرض الفن">
             </a>
        </div>
        <ul class="navigation">
            <li><a href="/" class="active">home</a></li>
            <li><a href="{{route('gallery')}}">gallery</a></li>
            <!-- <li><a href="#ser">services</a></li> -->
            <li><a href="{{route('about')}}"> about </a></li>
            <li><a href="{{route('contact')}}">contact</a></li>
            <li><a href="login.html">LogIn</a></li>
        </ul>
        <div class="bars">
            <img id="bar" src="{{ asset('assets/images/menu.png')}}" alt="">
        </div>
    </header>

    <!-- end header -->




    {{$slot}}



    <!-- start footer section  -->

    <div class="bg-footer" id="contact">
        <div class="footer-flex pt-3 ps-5" style="display: flex; align-items: center; justify-content: space-between;">

            <div class="footer1">
                <h2 style="color: #94bcbf;">Most Used Links</h2>
                <ul>
                    <li><a href="#">home</a></li>
                    <li><a href="about.html">about us</a></li>
                    <li><a href="gallery.html">gallery</a></li>
                    <li><a href="contact.html">contact us</a></li>
                    <li><a href="#">link</a></li>
                </ul>
            </div>
            <div class="me-5">
                <img src="{{ asset('assets/images/logo1.png')}}" alt="" width="150" height="150">
            </div>
        </div>
        <div class="share text-center">
            <a href="#" class="fab fa-facebook-f"></a>
            <a href="#" class="fab fa-twitter"></a>
            <a href="#" class="fab fa-instagram"></a>
            <a href="#" class="fab fa-linkedin"></a>
        </div>
        <hr>
    </div>

    <div class="copy">
        <section>
            copyright &copy; at 2024 by <a href="https://eltasmem.com/" target="_blank" style="text-decoration: none;"> <span class="text-dark"> Tasmeem Company </span> </a>
        </section>
    </div>

    <!-- end footer section  -->

    <!-- Swiper JS -->
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="{{ asset('assets/js/main.js')}}"></script>
@livewireScripts
</body>
</html>
