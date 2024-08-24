import { Howl } from "howler";

export const game_data:any={
  Direction:'',
  goodS:Howl,
  wrongS:Howl,
  pinS:Howl,
  applause:Howl,
  letters144:Array<string>,
  maxSentenceLength:12,
  sentences:Array<string>,
  usedID:Array<string>,
  //coloredWords:true,
  wordsInGame:Array<any>,
  PointerDown:false,
  collectedLetter:'',
  collectedDiv:Array<any>,
 ico_horizental : '<span><svg xmlns="http://www.w3.org/2000/svg" width="1.5vw" height="1.5vw" fill="red" class="bi bi-arrow-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/></svg></span>',
 ico_vertical : '<span><svg xmlns="http://www.w3.org/2000/svg" width="1.5vw" height="1.5vw" fill="red" class="bi bi-arrow-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/></svg></span>',
 ico_diagonal1 : '<span><svg xmlns="http://www.w3.org/2000/svg" width="1.5vw" height="1.5vw" fill="red" class="bi bi-arrow-down-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0z"/></svg></span>',
 ico_diagonal2 : '<span><svg xmlns="http://www.w3.org/2000/svg" width="1.5vw" height="1.5vw" fill="red" class="bi bi-arrow-down-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0z"/></svg></span>',
 lastId:'',
 sentenceByTiles:Array<any>,
 maxHint:80,//this is +1 hints
 CurrentHintCounter:0,
 foundedWords:Array<string>,
 Phrases:Array<string>,
 Medias:Array<string>,//links to both images and audio
 wordTransformed:Array<any>,
 CurrentAudios:Array<any>,
 imageCounter:0,
maxRow: 20
}


export let GameData:any = {
  data_Collection:null,
  audioUrl:'',
  imageUrl:'',
  counter:2
}

export const onlyUnique = (value:any, index:any, array:any)=> {
  return array.indexOf(value) === index;
}

export const CleanExtension = function (str:string){
  str = str.replace('.png','');
  str = str.replace('.jpg','');
  str =  str.replace('.JPG','');
  str =  str.replace('.PNG','');
  return str;
}
export const removeDies = function (str:string){
  str = str.replace('#','');
  return str;
}
export const BreakDies = function (str:string){
  str = str.replace('#','\n');
  return str;
}
export const calculateQ  = function (totallength:number){
  let N:number =2;
  if(GameData.data_Collection.config.indexOf("_questions") != -1){
  N = Number(GameData.data_Collection.config.replace("_questions",""));
  }
  else if(GameData.data_Collection.config == "Randomize"){
    N = Math.round(Math.random()*(totallength));
    if(N<2 || N>4){N=2;}
  }
  else if(GameData.data_Collection.config == "2-3-4"){
    N = GameData.counter;
    GameData.counter = GameData.counter+1;
    if(N<2 || N>4){N=2;}
  }
 
  return N;
}