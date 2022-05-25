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
    
    sliderImages[current -1].style.display = 'block';
    current--;
    document.querySelector('.paintingAlone').animate([
        // keyframes
        { transform: 'translateX(-86px)' },
        { transform: 'translateY(-50px)' }
      ], {
        // timing options
        duration: 500,
        fill: forwards
      });
      document.querySelector('.painting').animate([
        // keyframes
        { opacity: 0 },
        { opacity: 1 }
      ], {
        // timing options
        duration: 1000,
        fill: forwards
      });
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
