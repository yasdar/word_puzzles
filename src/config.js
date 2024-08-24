"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateQ = exports.BreakDies = exports.removeDies = exports.CleanExtension = exports.GameData = exports.game_data = void 0;
var howler_1 = require("howler");
exports.game_data = {
    Direction: '',
    goodS: howler_1.Howl,
    wrongS: howler_1.Howl,
    pinS: howler_1.Howl,
    applause: howler_1.Howl,
    letters144: Array < string > ,
    maxSentenceLength: 12,
    sentences: Array < string > ,
    usedID: Array < string > ,
    wordsInGame: Array < any > ,
    PointerDown: false,
    collectedLetter: '',
    collectedDiv: Array < any > ,
    ico_horizental: '<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-arrow-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/></svg></span>',
    ico_vertical: '<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-arrow-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/></svg></span>',
    ico_diagonal1: '<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-arrow-down-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0z"/></svg></span>',
    ico_diagonal2: '<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-arrow-down-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 13.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 0-1H3.707L13.854 2.854a.5.5 0 0 0-.708-.708L3 12.293V7.5a.5.5 0 0 0-1 0z"/></svg></span>',
    lastId: '',
    sentenceByTiles: Array < any > ,
    maxHint: 80,
    CurrentHintCounter: 0,
    foundedWords: Array < string > ,
    Phrases: Array < string > ,
    Medias: Array < string > ,
    wordTransformed: Array < any > ,
    CurrentAudios: Array < any > ,
    imageCounter: 0
};
exports.GameData = {
    data_Collection: null,
    audioUrl: '',
    imageUrl: '',
    counter: 2
};
var CleanExtension = function (str) {
    str = str.replace('.png', '');
    str = str.replace('.jpg', '');
    str = str.replace('.JPG', '');
    str = str.replace('.PNG', '');
    return str;
};
exports.CleanExtension = CleanExtension;
var removeDies = function (str) {
    str = str.replace('#', '');
    return str;
};
exports.removeDies = removeDies;
var BreakDies = function (str) {
    str = str.replace('#', '\n');
    return str;
};
exports.BreakDies = BreakDies;
var calculateQ = function (totallength) {
    var N = 2;
    if (exports.GameData.data_Collection.config.indexOf("_questions") != -1) {
        N = Number(exports.GameData.data_Collection.config.replace("_questions", ""));
    }
    else if (exports.GameData.data_Collection.config == "Randomize") {
        N = Math.round(Math.random() * (totallength));
        if (N < 2 || N > 4) {
            N = 2;
        }
    }
    else if (exports.GameData.data_Collection.config == "2-3-4") {
        N = exports.GameData.counter;
        exports.GameData.counter = exports.GameData.counter + 1;
        if (N < 2 || N > 4) {
            N = 2;
        }
    }
    return N;
};
exports.calculateQ = calculateQ;
