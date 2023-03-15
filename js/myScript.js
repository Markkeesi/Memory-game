let parit = 0;
let playing = false;
const kortit = document.querySelectorAll(".kortti");
let korttiYksi, korttiKaksi;

function pari(kuva1, kuva2) {
  setTimeout(() => {
    if(kuva1 === kuva2) {
      parit++;
      if(parit >= 6){
        $("#aloitus").show(); 
      }
      korttiYksi.removeEventListener("click", kortit);
      korttiKaksi.removeEventListener("click", kortit);
      korttiYksi = korttiKaksi = "";
      
      return;
    }
  }, 50);
  setTimeout(() => {
    korttiYksi.classList.add("vaara");
    korttiKaksi.classList.add("vaara");
  }, 150);
  setTimeout(() => {
    anime({
      targets: ".vaara",
      scale: [{value: 1}, {value: 1}, {value: 1, delay: 250}],
      rotateY: {value: "-=180", delay: 50},
      easing: "easeInOutSine",
      duration: 100,
      
    });
    korttiYksi.classList.remove("vaara", "flipped");
    korttiKaksi.classList.remove("vaara", "flipped");
    korttiYksi = korttiKaksi = "";
    
    
  }, 200);
}
function sekoitaKortit()
{
  parit = 0;
  anime({
    targets: ".flipped",
    scale: [{value: 1}, {value: 1}, {value: 1, delay: 250}],
    rotateY: {value: "-=180", delay: 50},
    easing: "easeInOutSine",
    duration: 100,
  });
  $("#aloitus").hide();
  let array = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  array.sort(() => Math.random() > 0.5 ? 1 : -1);
  setTimeout(() => {
    kortit.forEach((kortti, index) => {
      kortti.classList.remove("flipped");
      // Korttien etupuoli on aina sama
      let imgEtu = kortti.querySelector("img.etu");
      imgEtu.src = `img/maaLippu.jpg`;
      // Korttien takapuoli arvotaan randomisti arraysta
      let imgTagi = kortti.querySelector("img.taka");
      imgTagi.src = `img/img-${array[index]}.jpg`;
    });
  }, 300);
}
kortit.forEach(kortti => {
    kortti.addEventListener("click", function(e) {
      if(parit == 6){
        spin.pause(kortti);
      }

      if(playing)
        return;
        
      playing = true;

      var spin = anime({
        targets: kortti,
        scale: [{value: 1}, {value: 1}, {value: 1, delay: 250}],
        rotateY: {value: "+=180", delay: 50},
        easing: "easeInOutSine",
        duration: 100,
        complete: function(anim){
           playing = false;
        }
      });

      spin.play();
      function kaanto(){

        let valittu = e.target;
        if(valittu !== korttiYksi) {
            valittu.classList.add("flipped");

            if(!korttiYksi) {
              return korttiYksi = valittu;
            }

            korttiKaksi = valittu;

            let korttiYksiImg = korttiYksi.querySelector("img.taka").src,
            korttiKaksiImg = korttiKaksi.querySelector("img.taka").src;
            pari(korttiYksiImg, korttiKaksiImg);
        }
      }

      kaanto();
    });
});

