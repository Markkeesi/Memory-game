$(document).ready(function(){
    
    $("#aloitus").click(function(){
      sekoitaKortit();
    });
    
    $("#aloitus").hide();
    
    let array = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    array.sort(() => Math.random() > 0.5 ? 1 : -1);
    
    kortit.forEach((kortti, index) => {
      let imgEtu = kortti.querySelector("img.etu");
      imgEtu.src = `img/maaLippu.jpg`;
      let imgTagi = kortti.querySelector("img.taka");
      imgTagi.src = `img/img-${array[index]}.jpg`;
    });
});