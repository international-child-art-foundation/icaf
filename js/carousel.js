//Paintings Navigation
let sliderImages = document.querySelectorAll(".slide");
let arrowRight = document.querySelector(".goRight");
let arrowLeft = document.querySelector(".goLeft");
let current = 0;

function reset(){
    for(let i=0; i<sliderImages.length;i++){
        sliderImages[i].style.display = "none";
    }
}

//initialize slider
function startSlide(){
    reset();
    sliderImages[0].style.display = 'block';
}

//show previous
function slideLeft(){
    reset();
    if(current === 0){
        current = sliderImages.length;
    }
    // document.querySelector('.paintingAlone').classList.add = 'slideRight';
    sliderImages[current -1].style.display = 'block';
    current--;
}
//show Next
function slideRight(){
    reset();
    if(current === sliderImages.length -1){
        current = -1;
    }
    sliderImages[current +1].style.display = 'block';
    current++;
}
//Left arrow click 
arrowLeft.addEventListener('click', function(){
    slideLeft();
});
//Right arrow click 
arrowRight.addEventListener('click', function(){
    slideRight();
});
function checkCurrent(){


}
startSlide();
setInterval(slideRight,5000);
