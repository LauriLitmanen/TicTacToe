var blockSize = 40;
var maxColumn = 3; // 3 ruutua korkea
var maxRow = 3; // 3 ruutua leveä
var maxIndex = maxColumn * maxRow; //3x3
var board = new Array(maxIndex);
var component;
var block = 0;



//Index function used instead of a 2D array
function index(column, row) {
    return column + (row * maxColumn);
}

function startNewGame() {


    background.pelaaja1 = []; //nollataan pelaajan klikkaamat ruudut
    background.pelaaja2 = [];
    background.clickCounter = 0; // nollataan globaali clickcount
    //Delete blocks from previous game
    block = 0;
    for (var i = 0; i < maxIndex; i++) {
        if (board[i] != null)
            board[i].destroy();
    }



    //Initialize Board
    board = new Array(maxIndex);
    for (var column = 0; column < maxColumn; column++) {
        for (var row = 0; row < maxRow; row++) {
            board[index(column, row)] = null;
            block++;
            var blockId = block;
            createBlock(column, row, blockId);
        }
    }

    instructor.text = 'Pelaaja1 Vuoro'

}

function createBlock(column, row, blockId) {
    if (component == null)
        component = Qt.createComponent("Block.qml");

    // Note that if Block.qml was not a local file, component.status would be
    // Loading and we should wait for the component's statusChanged() signal to
    // know when the file is downloaded and ready before calling createObject().
    if (component.status == Component.Ready) {
        var dynamicObject = component.createObject(background);
        if (dynamicObject == null) {
            console.log("error creating block");
            console.log(component.errorString());
            return false;
        }
        dynamicObject.x = column * blockSize * 2.5;
        dynamicObject.y = row * blockSize * 2.5;
        dynamicObject.width = blockSize * 2.5;
        dynamicObject.height = blockSize * 2.5;
        dynamicObject.blockId = blockId;
        //dynamicObject.clickCounter = clickCounter;
        board[index(column, row)] = dynamicObject;
        console.log(block);

    } else {
        console.log("error loading block component");
        console.log(component.errorString());
        return false;
    }
    return true;
}


function pelaajaVuoro(){


    if (background.clickCounter % 2 === 0){         //onko klikkien määrä parillinen
        if (container.onkoVapaa == true){           //onko klikattu ruutu valittu vai ei
            blockTxt.text='X';                      // asetetaan ruutu ÄKSÄKSI X
            container.color = "blue";
            background.pelaaja1.push(blockId);      // laitetaan pelaaj1 arrayhyn klikatun blokin id

            if (background.pelaaja1.length > 2){
                if (checkWinner() != undefined){
                    //highLight();
                    hiiriAlue.enabled = 'false';
                    return;
                }
                else{
                    instructor.text='Pelaaja2 Vuoro';
                }
            }
            else{
                instructor.text='Pelaaja2 Vuoro';
            }
            background.clickCounter++;
            console.log('clickCount: ' + background.clickCounter);
            console.log('blockID: ' + blockId);
            console.log('pelaaja1 valitut blokit: ' + background.pelaaja1);
        }
        else {                                      // jos ruutu oli varattu
            instructor.text='Ruutu on jo valittu';
        }
    }
    else {                                          //jos klikkien määrä oli pariton
        if (container.onkoVapaa == true){           // onko klikattu ruutu valittu vai ei
            blockTxt.text = 'O';
            container.color = "purple";
            background.pelaaja2.push(blockId);

            if (background.pelaaja2.length > 2){
                if (checkWinner() != undefined){
                    var voittoRivi = checkWinner();
                    //highLight(voittoRivi);
                    hiiriAlue.enabled = 'false';
                    return;
                }
                else{
                    instructor.text='Pelaaja1 Vuoro';
                }
            }
            else{
                instructor.text='Pelaaja1 Vuoro';
            }
            background.clickCounter++;
            console.log('clickCount: ' + background.clickCounter);
            console.log('blockID: ' + blockId);
            console.log('pelaaja2 valitut blokit: ' + background.pelaaja2);
        }
        else { // ruutu oli varattu
            instructor.text='Ruutu on jo valittu';
        }
    }

    if (background.clickCounter == 9){
        instructor.text = 'Tasa peli';
        hiiriAlue.enabled = 'false';
    }
}



function checkWinner(){
 var voittoNumerot = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
                [1,4,7],
                [2,5,8],
                [3,6,9],
                [1,5,9],
                [3,5,7]
                ];
   var pelaaja1 = background.pelaaja1;
   var pelaaja2 = background.pelaaja2;
   var count = 0;


     if (background.clickCounter % 2 === 0){
        for(var x = 0; x < voittoNumerot.length; x++){                                // loopataan voittovaihtoehdot läpi
            count = 0; // nollataan count
            for(var y = 0; y < 3; y++){                                             // loopataan jokaisen voittovaihtoehdon kolme numeroa läpi
                for(var i = 0; i < pelaaja1.length; i++){                           // loopataan pelaajan valitsemat numerot läpi
                    if(pelaaja1[i] == voittoNumerot[x][y]){                         //verrataan pelaajan numeroita yksitellen voittonumeroita vastaan
                        console.log(pelaaja1[i] + ' = ' + voittoNumerot[x][y]);
                        count = count + 1;                                          // nostetaan counttia yhdellä
                        console.log('count =  ' + count);
                        if(count == 3){                                     // jos count on 3 niin pelaaja sai voittorivin oikein
                            console.log('voitit pelin kusipää');
                            instructor.text='Pelaaja1 Voitit Pelin';        //ilmoitetaan voitosta
                            return voittoNumerot[x];                                         // poistutaan functiosta
                        }else{
                            console.log('count ei ollu 3')
                        }
                    }
                    else {
                        console.log(pelaaja1[i] + ' ei ole ' + voittoNumerot[x][y]);
                    }
                }
            }
        } instructor.text='Pelaaja2 Vuoro';                                //jatketaan peliä kun ei löytyny voittajaa vielä
     }else {
        for(var x = 0; x < voittoNumerot.length; x++){                              // loopataan voittovaihtoehdot läpi
            count = 0; // nollataan count
            for(var y = 0; y < 3; y++){                                             // loopataan jokaisen voittovaihtoehdon kolme numeroa läpi
                for(var i = 0; i < pelaaja2.length; i++){                           // loopataan pelaajan valitsemat numerot läpi
                    if(pelaaja2[i] == voittoNumerot[x][y]){                         //verrataan pelaajan numeroita yksitellen voittonumeroita vastaan
                        console.log(pelaaja2[i] + ' = ' + voittoNumerot[x][y]);
                        count = count + 1;                                          // nostetaan counttia yhdellä
                        console.log('count =  ' + count);
                        if(count == 3){                                     // jos count on 3 niin pelaaja sai voittorivin oikein
                            console.log('voitit pelin kusipää2');
                            instructor.text='Pelaaja2 Voitit Pelin';        //ilmoitetaan voitosta
                            return voittoNumerot[x];                                         // poistutaan functiosta ja muutetaan checkwinner = voitto rivi [esim 1,2,3]
                        }else{
                            console.log('count ei ollu 3')
                        }
                    }
                    else {
                        console.log(pelaaja2[i] + ' ei ole ' + voittoNumerot[x][y]);
                    }
                }
            }
        }
    }

     instructor.text='Pelaaja1 Vuoro';                                     //jatketaan peliä kun ei löytynyt voittajaa
}

/*function highLight(voittoRivi){
    console.log('voittorivi = '+voittoRivi);
    var ekaRuutu = voittoRivi[0];
    var tokaRuutu = voittoRivi[1];
    var kolmasRuutu = voittoRivi[2];


}
*/

