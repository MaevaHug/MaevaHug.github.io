const pions = [
    { 'color': 'black', 'index': '0', 'class': 'bBlack' },
    { 'color': 'white', 'index': '1', 'class': 'bWhite' },
    { 'color': 'blue', 'index': '2', 'class': 'bBlue' },
    { 'color': 'green', 'index': '3', 'class': 'bGreen' },
    { 'color': 'yellow', 'index': '4', 'class': 'bYellow' },
    { 'color': 'orange', 'index': '5', 'class': 'bOrange' },
    { 'color': 'red', 'index': '6', 'class': 'bRed' },
    { 'color': 'brown', 'index': '7', 'class': 'bBrown' },

];

// (pions[4].class);renvoie bYellow

let correctPlace = 0;
let correctColor = 0;
let soluce = [0, 0, 0, 0, 0]; // combinaison à deviner
let select = [0, 0, 0, 0, 0]; // combinaison à chaque tour
let color = "";
let tour = 1;
let indice = 0;

$(document).ready(function () {

    generateSoluce();


    function generateSoluce() {
        const cColor = pions.map(x => x.class); // renvoie nv tableau avec valeurs de la classe "class" à partir des objets du tableau pions
        for (let i = 0; i < soluce.length; i++) {
            color = cColor[Math.floor(Math.random() * cColor.length)];
            soluce[i] = color;

        };
        console.log(soluce);
    }
    function displaySoluce() {
        for (let i = 0; i < soluce.length; i++) {
            classPion = soluce[i]
            $('.solution #c' + i).addClass(classPion);
        };
    }

    $('.choix').on('click', function () {
        if (indice < 5) {
            let index = $('.choix').index(this); // permet de récupérer l'indice du la couleur
            let classAdd = pions[index].class; // on récupère la valeur de la class à attribuer
            select[indice] = classAdd;
            //let bgcFocus = $('.focus #c' + indice).css('background-color');
            // console.log(bgcFocus);
            $('.focus #c' + indice).addClass(classAdd);
            indice++;
        };
    });

    $('#clear').on('click', function () {
        if ((indice >= 1) && (indice <= 5)) {
            indice--;
            let classDel = $('.focus #c' + indice).attr('class').split(' ').pop(); //on récup dernière class ajoutée
            $('.focus #c' + indice).removeClass(classDel);
            select[indice] = 0;
        };
    });


    $('#submit').on("click", function () {
        if (tour <= 12) {
            if (indice < 5) {
                $('#msg').fadeIn(2000);
                $('.closebtn').on("click", function () {
                    $('#msg').fadeOut();
                })
            } else {
                $('#msg').fadeOut(1500);
                tour++;
                checkColors();
                select = [0, 0, 0, 0, 0];
                $('.focus').removeClass('focus');
                $('#line' + tour).addClass('focus');
                indice = 0;
            };
        }
    });

    $('#start').on('click', function () {
        location.reload();
    });

    function checkColors() {
        let indiceCheck = 0;
        correctPlace = 0;
        correctColor = 0;
        // on duplique dans un nouveau tableau qu'on modifiera sans altérer la tableau init grâce à methode slice()
        let tableau = soluce.slice();
        for (let i = 0; i <= 4; i++) {
            if (select[i] == tableau[i]) {
                correctPlace += 1;
                tableau[i] = 0;
                console.log(tableau);
                select[i] = 0;
            }
        }

        for (let i = 0; i <= 4; i++) {
            if (select[i] == 0) {
                continue;
            }

            loc = tableau.indexOf(select[i]);
            console.log(loc);
            if (loc != -1) {
                select[i] = 0;
                tableau[loc] = 0;
                correctColor += 1;
            }
        }

        /* Affiche le bon nombre de pions bien places */
        for (let i = 0; i < correctPlace; i++) {
            $('.focus #b' + indiceCheck).addClass('bBlack');
            indiceCheck += 1;
        }

        for (let j = 0; j < correctColor; j++) {
            $('.focus #b' + indiceCheck).addClass('bWhite');
            indiceCheck += 1;
        }

        if (correctPlace === 5) {
            $('#anim').html('<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script><lottie-player class="img-fluid" src="https://assets5.lottiefiles.com/packages/lf20_fixmre.json"  background="transparent"  speed="1" width="150%" autoplay></lottie-player>');
            $('#audio').attr("src", "audio/8d82b5_Mortal_Kombat_Crowd_Clap_Sound_Effect.mp3");
            $('#audio')[0].play();
            $('object').fadeToggle(2000, function () {
                $('.hidden').fadeIn();
            });
            displaySoluce();
        }
        if (tour === 13 && correctPlace != 5) {
            $('#anim').html('<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script><lottie-player class="img-fluid" src="https://assets9.lottiefiles.com/packages/lf20_9xRnlw.json"  background="transparent"  speed="1" width="150%" autoplay></lottie-player>');
            $('#audio').attr("src", "audio/Female-voice-you-lose.mp3");
            $('#audio')[0].play();
            $('object').fadeToggle(2000, function () {
                $('.hidden').fadeIn();
            });
            displaySoluce();
        };
    };
});


