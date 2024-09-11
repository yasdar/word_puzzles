import $ from "jquery";
import gsap from "gsap";
import { CleanExtension, GameData, game_data, onlyUnique } from "./config";
import { Howl } from "howler";

//import { GameState } from "./config";
//import { GameManager } from "./GameManager";
//import { UIManager } from "./UIManager";

//let GM: GameManager;
//let UM: UIManager;


$(function () {
  console.log('ready');
  collectData();
  addAudios();

  $("#playAgain").on('click',()=>{
    RestartGame();
    $("#playAgain").hide();
  });

  $(".base").on('pointerup',function() {
    game_data.PointerDown = false;
    Onup();
  });
  
  let pp:any = document.getElementById("parentDiv");
  pp.addEventListener("pointermove", (event:any) => {
    event.preventDefault();

    let actual_target:Element|null = document.elementFromPoint(event.clientX, event.clientY);
   //over the div
   if(actual_target?.className == "panel"){   
   // console.log('div id',actual_target?.id)
  }
  /*over the text -- see css : 
  #parentDiv{
  touch-action: none;
}*/
   if(actual_target?.className == "panelTitle"){
    let divId = actual_target.parentElement?.id;
   // console.log('div id',divId)
    if( game_data.PointerDown  && game_data.lastId != divId?.toString() ){
      CollectLetter( $("#"+divId).find("p:first").text(),$("#"+divId) );
      game_data.lastId = divId;
    }
   }
  });
});
function startGame(Phrases:Array<string>){
  //calculate max row length
  //console.log('startGame Phrases',Phrases);
  //let _maxwordlength = game_data.maxRow;//12
  /*Phrases.forEach((ph:string)=>{
    _maxwordlength = Math.max(ph.length,_maxwordlength+1);
  })*/
  //game_data.maxRow = _maxwordlength;


  //init
  init();
  //draw letters
  addLetters();
  //get sentences
  arrangeLetters(Phrases);
  //find a place for each sentence
  //sort by length , max length come first
  game_data.sentences.sort((a:any, b:any) => b.length - a.length);
  console.log('pppn',game_data.sentences);

  placeSentences();
  //fill empty tile randomly
  placeRandomLetters();
  //show words to reveal at the bottom
  showBottomWords();


 //make the parent iframe scrollable
}
function init(){
  game_data.letters144 =Array.from(Array(144).keys())
  game_data.usedID=[];
  game_data.sentences=[];
  game_data.wordsInGame=[];
  game_data.PointerDown = false;
  game_data.collectedLetter ='';
  game_data.collectedDiv=[];
  game_data.sentenceByTiles=[];
  game_data.CurrentHintCounter = 0;
  game_data.foundedWords=[];
  game_data.imageCounter = 0;
  
}
function placeSentences(){
  game_data.sentences.forEach((sentence:string)=>{
    searchSolution(sentence,0);
  })
}
function searchSolution(sentence:string,lookagain:number){
  //console.log('search Solution for' ,sentence); 
  const Func=[checkHorizental,checkVertical];//,checkDiangonal1,checkDiangonal2
  //shuffleArray(Func);
 // console.log(Func)
   //random line
   let RandomLine:number;
   //random From
   let randomFrom:number;

  //random from
  let solution:boolean = false;



  if(sentence.length> 12){
    randomFrom = 0;
    RandomLine =  lookagain; //Math.floor(Math.random() * 11)

    if(Func[1](RandomLine,randomFrom,sentence).pass ){
      solution=true;
      game_data.wordsInGame.push({sentence:sentence.toUpperCase(),direction:game_data.Direction});
    }
  }else{
    randomFrom =  Math.floor(Math.random() * 11);
    RandomLine =  lookagain;
    if( Func[0](RandomLine,randomFrom,sentence).pass  ){
    solution=true;
    game_data.wordsInGame.push({sentence:sentence.toUpperCase(),direction:game_data.Direction});
  }
  }
  
 /*else if(Func[1](RandomLine,randomFrom,sentence).pass ){
    solution=true;
    game_data.wordsInGame.push({sentence:sentence.toUpperCase(),direction:game_data.Direction});
  }*/
  
  

  
  /*else if(Func[2](RandomLine,randomFrom,sentence).pass ){
    solution=true;
    game_data.wordsInGame.push({sentence:sentence.toUpperCase(),direction:game_data.Direction});
  }
  else if( Func[3](RandomLine,randomFrom,sentence).pass ){
    solution=true;
    game_data.wordsInGame.push({sentence:sentence.toUpperCase(),direction:game_data.Direction});
  }*/
  if(solution){
    console.log(
      "solution for sentence",
      sentence,solution,
      'line',RandomLine,
      'from',randomFrom);
  }else{
    
     // console.log('no solution for' ,sentence);
      //try 20 times
      if(lookagain == 0){searchSolution(sentence,1);}
      else if(lookagain == 1){searchSolution(sentence,2);}
      else if(lookagain == 2){searchSolution(sentence,3);}
      else if(lookagain == 3){searchSolution(sentence,4);}
      else if(lookagain == 4){searchSolution(sentence,5);}
      else if(lookagain == 5){searchSolution(sentence,6);}
      else if(lookagain == 6){searchSolution(sentence,7);}
      else if(lookagain == 7){searchSolution(sentence,8);}
      else if(lookagain == 8){searchSolution(sentence,9);}
      else if(lookagain == 9){searchSolution(sentence,10);}
      else if(lookagain == 10){searchSolution(sentence,11);}
      else if(lookagain == 11){searchSolution(sentence,12);}
      else if(lookagain == 12){searchSolution(sentence,13);}
      else if(lookagain == 13){searchSolution(sentence,14);}
      else if(lookagain == 14){searchSolution(sentence,15);}

     
      else{
        console.log('%c ! end of repeat , no solution for ' +sentence, 'background: #222; color: #bada55');

      }

  }
}
function placeRandomLetters(){
  const alphabetic = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  for(let line:number = 0 ; line<game_data.maxRow; line++){
  for(let l:number = 0 ; l<12; l++){
let id:string = l.toString()+'-'+line.toString();


$("#"+l.toString()+'-'+line.toString()).on('pointerdown',function() {

  if(!game_data.PointerDown && game_data.lastId !=l.toString()+'-'+line.toString()){
    game_data.PointerDown = true;
    CollectLetter( $(this).find("p:first").text(),$(this) );
    game_data.lastId = l.toString()+'-'+line.toString();
  }
});
//check with pointermove
/*$("#"+l.toString()+'-'+line.toString()).on('pointermove',function(t) {

  if( game_data.PointerDown && t.target.className =='panelTitle' && game_data.lastId !=l.toString()+'-'+line.toString() ){
    console.log(l.toString()+'-'+line.toString())
    CollectLetter( $(this).find("p:first").text(),$(this) );
    game_data.lastId = l.toString()+'-'+line.toString();
  }

});*/


if(game_data.usedID.indexOf(id) == -1){
  const random = Math.floor(Math.random() * alphabetic.length);
  $("#"+l.toString()+'-'+line.toString()).find("p:first").text(alphabetic[random]);
}
  }
  } 
}
function CollectLetter(L:string,div:any){

  if(div.hasClass("foundedPanel")){return;}
  if(game_data.pinS){ game_data.pinS.play();}
game_data.collectedLetter += L;
//console.log('CollectLetter',game_data.collectedLetter);
game_data.collectedDiv.push(div);
div.removeClass('inactivePanel');
div.addClass('activePanel');
}
function Onup(){
//check result
game_data.lastId = '';
if(game_data.collectedLetter.length == 0 ){return;}

let index = game_data.wordsInGame.findIndex((x:any)=> {
  return x.sentence === game_data.collectedLetter}
  );
//console.log('check' , game_data.collectedLetter,game_data.wordsInGame,index);
if( index != -1){
 if(game_data.goodS){game_data.goodS.play();}


 //play funded audio
 //found correct id
 console.log("wordTransformed @",GameData.wordTransformed)
 console.log("looking for @",game_data.wordsInGame[index].sentence.toLowerCase());

  const found = GameData.wordTransformed.find((obj:any) => {
    return (obj.transformed).toLowerCase() === game_data.wordsInGame[index].sentence.toLowerCase();
  });
  console.log("found@",found)
  let BoxId = 'Box'+found.id;
  playAudioByid(BoxId)
  //highlight founded image
  $("#"+BoxId+" .imgbox").removeClass('imgboxNotFounded');
  $("#"+BoxId+" .imgbox").addClass('imgboxFounded');

  $("#"+game_data.wordsInGame[index].id).find("p:first").css('background-color', "#ffff00");
  game_data.foundedWords.push( $("#"+game_data.wordsInGame[index].id).find("p:first").text())
  //remove it from array
  game_data.wordsInGame.splice(index, 1);
  //highlight yellow
  game_data.collectedDiv.forEach((div:any)=>{
  div.removeClass('activePanel');
  div.addClass('foundedPanel');
  })
  
 if(game_data.wordsInGame.length==0){
  console.log('!End all words founded');
  if(game_data.applause){game_data.applause.play();}
  //show play again button
  $("#playAgain").show();
 }
}else{
  if( game_data.wrongS){ game_data.wrongS.play();}
 
  game_data.collectedDiv.forEach((div:any)=>{
    div.removeClass('activePanel');
    div.addClass('inactivePanel');
    })
}

//reset collected addLetters
game_data.collectedLetter = '';
game_data.collectedDiv = [];
}


function RestartGame(){
  removeLetters();
setTimeout(() => {
  startGame(game_data.Phrases);
}, 500);
}
function arrangeLetters(phrases:Array<string>){
  GameData.wordTransformed=[];

  let sentences:Array<string>=[];
 
  phrases.forEach((p:string)=>{

    //get sentences without space
    let sentence:string = p.replace(/\s/g, '');
    //remove dots
    sentence = sentence.replace(/\./g, '');

    let index:number = phrases.indexOf(p);
    //save original and transfromed words
    GameData.wordTransformed.push({id:index,originalW:p,transformed:sentence})
   
    
    if(sentence.length > game_data.maxRow){
      console.log('too long sentence',sentence.length,sentence)
    }else{
      sentences.push(sentence);
      console.log('accepted',sentence,sentence.length)
     //console.log('accepted media',game_data.Medias[index]);
    }
  });

  //sort by sentence length
  sentences = sentences.filter(onlyUnique);
  sentences.sort((a, b) => a.length - b.length);
 // console.log('0-->voila',sentences);
shuffleArray(sentences);
  //keep only a given numbeer of words
  let maxWords:number =Number(GameData.data_Collection.config.replace('_MaxWords',''));
  console.log("maxWords : ",maxWords);

  let actualN:number = sentences.length;

  for(let w:number=0; w<actualN; w++ ){
    
    if( w>= maxWords){ sentences.pop();}
  }

 




  console.log('1-->voila',sentences);

  game_data.sentences = sentences;
  //console.log("total sentences",game_data.sentences.length);
}
function checkHorizental(line:number,from:number,sentence:string):any{
 
  let to :number = sentence.length+from;
console.log(sentence," : -> checkHorizental line",line,"from:",from,"to:",to);
if(to > 12){
 // console.log("can't no tile ",to); 
  return false;}
let TempIds:Array<string>=[];
let pass:boolean= true;
for(let i:number = from;  i<to; i++){
 // console.log('tile',i.toString()+'-'+line.toString());
  TempIds.push(i.toString()+'-'+line.toString());
  if( game_data.usedID.indexOf(i.toString()+'-'+line.toString()) != -1){
    pass = false;
  // console.log('this case',i.toString()+'-'+line.toString(),"already used");
   TempIds=[];
   break;
  }
}
if(pass){
  game_data.usedID = game_data.usedID.concat(TempIds);
  fillTiles(TempIds,sentence);
}
game_data.Direction ='checkHorizental';
return  {pass:pass,name:""};
}
function checkVertical(line:number,from:number,sentence:string):any{
  let to :number = sentence.length+from;
  //console.log(sentence," : -> checkVertical line",line,"from:",from,"to:",to);
  if(to >game_data.maxRow){
    //console.log("can't no tile ",to);
     return false;}
  let TempIds:Array<string>=[];
  let pass:boolean= true;
  for(let i:number = from;  i<to; i++){
   // console.log('tile',line.toString()+'-'+i.toString());
    TempIds.push(line.toString()+'-'+i.toString());
    //check if tile already used
    if( game_data.usedID.indexOf(line.toString()+'-'+i.toString()) != -1){
      //check if this is not the same letter
      if( $("#"+line.toString()+'-'+i.toString()).text() != sentence.charAt(i)){
        pass = false;
       // console.log('this case',line.toString()+'-'+i.toString(),"already used");
        TempIds=[];
        break;
      }
    }
  }
  if(pass){
    game_data.usedID = game_data.usedID.concat(TempIds);
    fillTiles(TempIds,sentence);
  }
  game_data.Direction ='checkVertical';
  return  {pass:pass,name:""};
}
//diagonal from top to down-right
function checkDiangonal1(line:number,from:number,sentence:string):any{
  let to :number = sentence.length+from;
  //console.log(sentence," : -> checkDiangonal1 line",line,"from:",from,"to:",to);
  if(to > 12){
    //console.log("can't no tile ",to); 
    return false;}
  let TempIds:Array<string>=[];
  let pass:boolean= true;
  let count:number=line;
  for(let i:number = from;  i<to; i++){
   // console.log('checkDiangonal1 tile',(i).toString()+'-'+(count).toString());
    TempIds.push((i).toString()+'-'+(count).toString());
    //check if tile already used
    if( game_data.usedID.indexOf((i).toString()+'-'+(count).toString()) != -1){
      //check if this is not the same letter
      if( $("#"+(i).toString()+'-'+(count).toString()).text() != sentence.charAt(i)){
        pass = false;
       // console.log('this case',(i).toString()+'-'+(count).toString(),"already used");
        TempIds=[];
        break;
      }
    }
     //out of tile
    if(count>11){
      pass = false;
      break;
    }
    count++;
  }
  if(pass){
    game_data.usedID = game_data.usedID.concat(TempIds);
    fillTiles(TempIds,sentence);
  }
  game_data.Direction ='checkDiangonal1';
  return  {pass:pass,name:""};
}
//diagonal from top to down-left
function checkDiangonal2(line:number,from:number,sentence:string):any{
  let to :number = (from - sentence.length);
  //console.log(sentence," : -> checkDiangonal2 line",line,"from:",from,"to:",to);
  if(to <0){
    //console.log("can't no tile ",to); 
    return false;
  }
  let TempIds:Array<string>=[];
  let pass:boolean= true;
  let count:number = 0;
  for(let i:number = from;  i>to; i--){
    //console.log(i,'checkDiangonal2 tile',i.toString()+'-'+(line).toString());
    TempIds.push(i.toString()+'-'+(line).toString());
    //check if tile already used
    //console.log(count,'letter now',sentence.charAt(count));
    if( game_data.usedID.indexOf(i.toString()+'-'+(line).toString()) != -1){
      //check if this is not the same letter
      /*console.log(i.toString()+'-'+(line).toString(),"comparing two letters",
      $("#"+i.toString()+'-'+(line).toString()).text(),"and",
      sentence.charAt(count));*/

      if( $("#"+i.toString()+'-'+(line).toString()).text() != sentence.charAt(count)){
        pass = false;
       // console.log('this case',i.toString()+'-'+(line).toString(),"already used");
        TempIds=[];
        break;
      }
    }
    if(line > 11){
      //out of tile
      pass = false;
      break;
    }
    line++;
    count++;
  }
  if(pass){
    game_data.usedID = game_data.usedID.concat(TempIds);
    fillTiles(TempIds,sentence);
  }
  game_data.Direction ='checkDiangonal2';
  return  {pass:pass,name:""};
}
function fillTiles(TempIds:Array<any>,sentence:string){

  game_data.sentenceByTiles.push({sentence:sentence,tiles:TempIds});
  //console.log(game_data.sentenceByTiles);
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
 
  for(let c:number = 0; c< TempIds.length; c++){
    let tile = TempIds[c];
   // console.log(tile)
    $("#"+tile).find("p:first").text(sentence.charAt(c).toUpperCase());
    if(game_data.coloredWords){
      $("#"+tile).find("p:first").css('color', "#" + randomColor);
    }
  }
}
function Hint(sentence:string,div:any){
 //console.log(game_data.sentenceByTiles);
 //console.log('hint for',sentence,game_data.foundedWords,game_data.foundedWords.indexOf(sentence));

 const found = GameData.wordTransformed.find((obj:any) => {
  return obj.originalW === sentence;
});
 if(
  game_data.CurrentHintCounter>game_data.maxHint ||
  game_data.foundedWords.indexOf(found.transformed.toUpperCase()) != -1)
  {return;}
console.log('ok---->2',found);
 game_data.CurrentHintCounter++;

 let index =game_data.sentenceByTiles.findIndex((x:any)=> {
  return x.sentence.toUpperCase() === found.transformed.toUpperCase()}
  );
let tiles:Array<string> = game_data.sentenceByTiles[index].tiles;
//tiles become green
tiles.forEach((id:string)=>{
  $('#'+id).removeClass('inactivePanel');
  $('#'+id).addClass('activePanel');
})
//clicked word become yello bg
 div.find("p:first").css('background-color', "#FFFF00");
 //reset
 setTimeout(() => {
  div.find("p:first").css('background-color', "#FFFFff");
  tiles.forEach((id:string)=>{
    $('#'+id).addClass('inactivePanel');
    $('#'+id).removeClass('activePanel');
  })
 }, 800);
 
 
}
function removeLetters(){
  //remove tiles
  for(let line:number = 0 ; line<game_data.maxRow; line++){
  for(let l:number = 0 ; l<12; l++){
  $("#"+l.toString()+'-'+line.toString()).remove();
}
}
//remove the bottom
for(let w:number = 0 ; w<game_data.foundedWords.length; w++){
  $("#w"+w).remove();
}

//remove left images
game_data.CurrentAudios.forEach((obj:any)=>{
  $("#"+obj.id).remove();
})
}
function addLetters(){
  for(let line:number = 0 ; line<game_data.maxRow; line++){
   
    $('<div>', {
      id: 'line'+line,
      class: 'd-flex justify-content-center col-12 m-0 p-0',
  }).appendTo('#parentDiv');

  for(let l:number = 0 ; l<12; l++){

  $('#line'+line).append(' <div id="'+l.toString()+'-'+line.toString()+'" class="panel"><p class="panelTitle">'+l.toString()+'-'+line.toString()+'</p></div>');    
 
  
   
  }
  }
  
}
function showBottomWords(){
 //console.log(game_data);
let i:number = 0;
 game_data.wordsInGame.forEach((obg:any)=>{
  let ico='';
  if(obg.direction == "checkHorizental"){ico = game_data.ico_horizental; obg.id="w"+i.toString();}
  else if(obg.direction == "checkVertical"){ico = game_data.ico_vertical; obg.id="w"+i.toString();}
  //else if(obg.direction == "checkDiangonal1"){ico = game_data.ico_diagonal1; obg.id="w"+i.toString();}
  //else if(obg.direction == "checkDiangonal2"){ico = game_data.ico_diagonal2; obg.id="w"+i.toString();}

const found = GameData.wordTransformed.find((obj:any) => {
  return obj.transformed.toUpperCase() === obg.sentence;
});



if(found){
//add image and audio to object
  let AudioUrl = CleanExtension(game_data.Medias[found.id])+'.mp3';
  found.img = game_data.Medias[found.id];
  found.audioUrl = GameData.data_Collection.prefix+'_'+AudioUrl;
  //console.log('--> 01 found ',found);
  loadAudiosAddImages(found);
}






  $('#words').append('<div id="w'+i.toString()+'"><p  class="word">'+found.originalW+ico+'</p></div>'); //  
  $( "#w"+i.toString() ).on( "click", function() {
    Hint($(this).find("p:first").text(),$(this));
  });

  i++;


 
})

}
function loadAudiosAddImages(found:any){

  //image
  //console.log('pp', game_data.sentences);
  let Half = Math.round(game_data.sentences.length/2);
  //console.log('--> 03 found image',GameData.imageUrl+found.img);
  if(game_data.imageCounter < Half){
    $('.revealedLeft').append('<div class="Box" id="Box'+(found.id).toString()+'">'+' <img class="imgbox imgboxNotFounded" src="'+GameData.imageUrl+found.img+'">'+
    '<img class="audioIco" src="./assets/images/audioIco.png"></div>'); 
  }else{
    $('.revealedRight').append('<div class="Box" id="Box'+(found.id).toString()+'">'+' <img class="imgbox imgboxNotFounded" src="'+GameData.imageUrl+found.img+'">'+
    '<img class="audioIco" src="./assets/images/audioIco.png"></div>'); 
  }
   
 
  //audio
  game_data.CurrentAudios.push({
    word:found.originalW,
    id:"Box"+(found.id).toString(),
    audio:new Howl({src: GameData.audioUrl+found.audioUrl,volume:0.5,loop:false})});
  //console.log('game_data.CurrentAudios',game_data.CurrentAudios)

 //listen to image box click
   $("#Box"+(found.id).toString()).on('click',function(){
    playAudioByid($(this).attr("id"));
  });


  game_data.imageCounter++;
}
function playAudioByid(id:string|undefined){
  console.log('playAudioByid',id,game_data.CurrentAudios)

  //$("#"+game_data.wordsInGame[index].id).find("p:first").css('background-color', "#ffff00");

  const _obj = game_data.CurrentAudios.find((obj:any) => {
    return obj.id === id;
  });
  if(_obj){ _obj.audio.play();}
  else{
    console.log('audio not found')
  }
}


function addAudios() {
 // console.log('add audios')
  game_data.goodS = new Howl({src:'./assets/audios/goodS.mp3',volume:0.5,loop:false});
  game_data.pinS = new Howl({src:'./assets/audios/pinS.mp3',volume:0.3,loop:false});
  game_data.wrongS = new Howl({src:'./assets/audios/wrongS.mp3',volume:0.5,loop:false});
  game_data.applause = new Howl({src:'./assets/audios/applause.mp3',volume:0.5,loop:false});
}


function shuffleArray(array:any) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function collectData(){
  console.log('word search : version V1');
  //collect data from header
 
  let _data:string = window.location.search;

  //get language : 
  let L_indexi = _data.indexOf("?L=");
  let L_indexf = _data.indexOf("&H=");
  let _language:string = _data.substring(L_indexi+3,L_indexf);

  //get hint : 
  let L_indexC = _data.indexOf("&C=");
  let _Hint:string = _data.substring(L_indexf+3,L_indexC);

  //get config : 
  let L_indexJ = _data.indexOf("&J=");
  let _Config:string = _data.substring(L_indexC+3,L_indexJ);

  //get json
  let L_indexW = _data.indexOf("&W=");
  let _Json:string = _data.substring(L_indexJ+3,L_indexW);

  //get week
  let L_indexPrefix = _data.indexOf("&Prefix=");
  let _Week:Array<string> = _data.substring(L_indexW+3,L_indexPrefix).split(',');

  //get Prefix
  let _Prefix:string = _data.substring(L_indexPrefix+8,_data.length);
  
  //console.log(_language,_Hint,_Config,_Json,_Week)

  GameData.data_Collection ={
      'language':_language,
      'hint':_Hint,
      'config':_Config,
      'jsonpath':_Json,
      "week":_Week,
      "prefix":_Prefix
  };
 // console.log("GameData.data_Collection");
 console.table(GameData.data_Collection);
 
  let _path:string = _Json;
  let lastindex=_path.length;
  for(var i=0; i<_path.length;i++) {
      if (_path[i] === "/") {lastindex = i;}
  }
  GameData.audioUrl = _path.substring(0,lastindex)+"/audios/";
  GameData.imageUrl = _path.substring(0,lastindex)+"/images/";


  console.log("GameData.audioUrl",GameData.audioUrl);
  console.log("GameData.imageUrl",GameData.imageUrl);

 
//use jsonpath and get json file of the Unit
$.getJSON( 
  GameData.data_Collection.jsonpath,
   function( data:any ) {
  console.log('sucess data',data);
  GameData.data_Collection.data = data;
  console.log("GameData.data_Collection",GameData.data_Collection);

  
  game_data.Phrases=[];
  game_data.Medias=[];
  game_data.CurrentAudios=[]

  //everything is ready , console.log("create game")
  GameData.data_Collection.data.forEach((obj:any)=>{
    //texts
    //console.log("ee",obj[GameData.data_Collection.language]);
    //console.log("img",obj.image);
    //get only second part after the # ( only for mandarian and japaneses
    //french doesn't have the #
   // console.log(obj[GameData.data_Collection.language].split('#'))

   let _phrase =  obj[GameData.data_Collection.language];
   if(obj[GameData.data_Collection.language].indexOf('#') != -1){
    _phrase = obj[GameData.data_Collection.language].split('#')[1];
   
   }
   let _w =obj.unitweek;
    //console.log('_w',_w)
   for(let c:number = 0 ; c<GameData.data_Collection.week.length; c++){
    if(_w.indexOf(GameData.data_Collection.week[c]) != -1 ){
      game_data.Phrases.push(_phrase);
      game_data.Medias.push(obj.image)
     }
   }
  })
  
console.log('01->',game_data.Phrases);
//console.log('media 01->',game_data.Medias);
startGame(game_data.Phrases);
}
).fail(function(error) {
  console.log( "error",error );
});
}

