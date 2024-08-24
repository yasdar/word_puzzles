"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = __importDefault(require("jquery"));
var config_1 = require("./config");
var howler_1 = require("howler");
(0, jquery_1.default)(function () {
    console.log('ready');
    collectData();
    addAudios();
    (0, jquery_1.default)("#playAgain").on('click', function () {
        RestartGame();
        (0, jquery_1.default)("#playAgain").hide();
    });
    (0, jquery_1.default)(".base").on('pointerup', function () {
        config_1.game_data.PointerDown = false;
        Onup();
    });
    var pp = document.getElementById("parentDiv");
    pp.addEventListener("pointermove", function (event) {
        var _a;
        event.preventDefault();
        var actual_target = document.elementFromPoint(event.clientX, event.clientY);
        if ((actual_target === null || actual_target === void 0 ? void 0 : actual_target.className) == "panel") {
        }
        if ((actual_target === null || actual_target === void 0 ? void 0 : actual_target.className) == "panelTitle") {
            var divId = (_a = actual_target.parentElement) === null || _a === void 0 ? void 0 : _a.id;
            if (config_1.game_data.PointerDown && config_1.game_data.lastId != (divId === null || divId === void 0 ? void 0 : divId.toString())) {
                CollectLetter((0, jquery_1.default)("#" + divId).find("p:first").text(), (0, jquery_1.default)("#" + divId));
                config_1.game_data.lastId = divId;
            }
        }
    });
});
function startGame(Phrases) {
    console.log('startGame Phrases', Phrases);
    init();
    addLetters();
    arrangeLetters(Phrases);
    placeSentences();
    placeRandomLetters();
    showBottomWords();
}
function init() {
    config_1.game_data.letters144 = Array.from(Array(144).keys());
    config_1.game_data.usedID = [];
    config_1.game_data.sentences = [];
    config_1.game_data.wordsInGame = [];
    config_1.game_data.PointerDown = false;
    config_1.game_data.collectedLetter = '';
    config_1.game_data.collectedDiv = [];
    config_1.game_data.sentenceByTiles = [];
    config_1.game_data.CurrentHintCounter = 0;
    config_1.game_data.foundedWords = [];
    config_1.game_data.imageCounter = 0;
}
function placeSentences() {
    config_1.game_data.sentences.forEach(function (sentence) {
        searchSolution(sentence, 0);
    });
}
function searchSolution(sentence, lookagain) {
    var Func = [checkHorizental, checkVertical, checkDiangonal1, checkDiangonal2];
    shuffleArray(Func);
    var RandomLine = Math.floor(Math.random() * 11);
    var randomFrom = Math.floor(Math.random() * 11);
    var solution = false;
    if (Func[0](RandomLine, randomFrom, sentence).pass) {
        solution = true;
        config_1.game_data.wordsInGame.push({ sentence: sentence.toUpperCase(), direction: config_1.game_data.Direction });
    }
    else if (Func[1](RandomLine, randomFrom, sentence).pass) {
        solution = true;
        config_1.game_data.wordsInGame.push({ sentence: sentence.toUpperCase(), direction: config_1.game_data.Direction });
    }
    else if (Func[2](RandomLine, randomFrom, sentence).pass) {
        solution = true;
        config_1.game_data.wordsInGame.push({ sentence: sentence.toUpperCase(), direction: config_1.game_data.Direction });
    }
    else if (Func[3](RandomLine, randomFrom, sentence).pass) {
        solution = true;
        config_1.game_data.wordsInGame.push({ sentence: sentence.toUpperCase(), direction: config_1.game_data.Direction });
    }
    if (solution) {
    }
    else {
        if (lookagain == 0) {
            searchSolution(sentence, 1);
        }
        else if (lookagain == 1) {
            searchSolution(sentence, 2);
        }
        else if (lookagain == 2) {
            searchSolution(sentence, 3);
        }
        else if (lookagain == 3) {
            searchSolution(sentence, 4);
        }
        else if (lookagain == 4) {
            searchSolution(sentence, 5);
        }
        else if (lookagain == 5) {
            searchSolution(sentence, 6);
        }
        else if (lookagain == 6) {
            searchSolution(sentence, 7);
        }
        else if (lookagain == 7) {
            searchSolution(sentence, 8);
        }
        else if (lookagain == 8) {
            searchSolution(sentence, 9);
        }
        else if (lookagain == 9) {
            searchSolution(sentence, 10);
        }
        else if (lookagain == 10) {
            searchSolution(sentence, 11);
        }
        else if (lookagain == 11) {
            searchSolution(sentence, 12);
        }
        else if (lookagain == 12) {
            searchSolution(sentence, 13);
        }
        else if (lookagain == 13) {
            searchSolution(sentence, 14);
        }
        else if (lookagain == 14) {
            searchSolution(sentence, 15);
        }
        else if (lookagain == 15) {
            searchSolution(sentence, 16);
        }
        else if (lookagain == 16) {
            searchSolution(sentence, 17);
        }
        else if (lookagain == 17) {
            searchSolution(sentence, 18);
        }
        else if (lookagain == 18) {
            searchSolution(sentence, 19);
        }
        else {
            console.log('%c ! end of repeat , no solution for ' + sentence, 'background: #222; color: #bada55');
        }
    }
}
function placeRandomLetters() {
    var alphabetic = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var _loop_1 = function (line) {
        var _loop_2 = function (l) {
            var id = l.toString() + '-' + line.toString();
            (0, jquery_1.default)("#" + l.toString() + '-' + line.toString()).on('pointerdown', function () {
                if (!config_1.game_data.PointerDown && config_1.game_data.lastId != l.toString() + '-' + line.toString()) {
                    config_1.game_data.PointerDown = true;
                    CollectLetter((0, jquery_1.default)(this).find("p:first").text(), (0, jquery_1.default)(this));
                    config_1.game_data.lastId = l.toString() + '-' + line.toString();
                }
            });
            if (config_1.game_data.usedID.indexOf(id) == -1) {
                var random = Math.floor(Math.random() * alphabetic.length);
                (0, jquery_1.default)("#" + l.toString() + '-' + line.toString()).find("p:first").text(alphabetic[random]);
            }
        };
        for (var l = 0; l < 12; l++) {
            _loop_2(l);
        }
    };
    for (var line = 0; line < 12; line++) {
        _loop_1(line);
    }
}
function CollectLetter(L, div) {
    if (div.hasClass("foundedPanel")) {
        return;
    }
    if (config_1.game_data.pinS) {
        config_1.game_data.pinS.play();
    }
    config_1.game_data.collectedLetter += L;
    config_1.game_data.collectedDiv.push(div);
    div.removeClass('inactivePanel');
    div.addClass('activePanel');
}
function Onup() {
    config_1.game_data.lastId = '';
    if (config_1.game_data.collectedLetter.length == 0) {
        return;
    }
    var index = config_1.game_data.wordsInGame.findIndex(function (x) {
        return x.sentence === config_1.game_data.collectedLetter;
    });
    if (index != -1) {
        if (config_1.game_data.goodS) {
            config_1.game_data.goodS.play();
        }
        console.log("wordTransformed @", config_1.GameData.wordTransformed);
        console.log("looking for @", config_1.game_data.wordsInGame[index].sentence.toLowerCase());
        var found = config_1.GameData.wordTransformed.find(function (obj) {
            return (obj.transformed).toLowerCase() === config_1.game_data.wordsInGame[index].sentence.toLowerCase();
        });
        console.log("found@", found);
        var BoxId = 'Box' + found.id;
        playAudioByid(BoxId);
        (0, jquery_1.default)("#" + BoxId + " .imgbox").removeClass('imgboxNotFounded');
        (0, jquery_1.default)("#" + BoxId + " .imgbox").addClass('imgboxFounded');
        (0, jquery_1.default)("#" + config_1.game_data.wordsInGame[index].id).find("p:first").css('background-color', "#ffff00");
        config_1.game_data.foundedWords.push((0, jquery_1.default)("#" + config_1.game_data.wordsInGame[index].id).find("p:first").text());
        config_1.game_data.wordsInGame.splice(index, 1);
        config_1.game_data.collectedDiv.forEach(function (div) {
            div.removeClass('activePanel');
            div.addClass('foundedPanel');
        });
        if (config_1.game_data.wordsInGame.length == 0) {
            console.log('!End all words founded');
            if (config_1.game_data.applause) {
                config_1.game_data.applause.play();
            }
            (0, jquery_1.default)("#playAgain").show();
        }
    }
    else {
        if (config_1.game_data.wrongS) {
            config_1.game_data.wrongS.play();
        }
        config_1.game_data.collectedDiv.forEach(function (div) {
            div.removeClass('activePanel');
            div.addClass('inactivePanel');
        });
    }
    config_1.game_data.collectedLetter = '';
    config_1.game_data.collectedDiv = [];
}
function RestartGame() {
    removeLetters();
    setTimeout(function () {
        startGame(config_1.game_data.Phrases);
    }, 500);
}
function arrangeLetters(phrases) {
    config_1.GameData.wordTransformed = [];
    var sentences = [];
    phrases.forEach(function (p) {
        var sentence = p.replace(/\s/g, '');
        sentence = sentence.replace(/\./g, '');
        var index = phrases.indexOf(p);
        config_1.GameData.wordTransformed.push({ id: index, originalW: p, transformed: sentence });
        if (sentence.length > config_1.game_data.maxSentenceLength) {
        }
        else {
            sentences.push(sentence);
        }
    });
    sentences.sort(function (a, b) { return a.length - b.length; });
    var maxWords = Number(config_1.GameData.data_Collection.config.replace('_MaxWords', ''));
    var actualN = sentences.length;
    for (var w = 0; w < actualN; w++) {
        if (w >= maxWords) {
            sentences.pop();
        }
    }
    console.log('1-->voila', sentences);
    config_1.game_data.sentences = sentences;
}
function checkHorizental(line, from, sentence) {
    var to = sentence.length + from;
    if (to > 12) {
        return false;
    }
    var TempIds = [];
    var pass = true;
    for (var i = from; i < to; i++) {
        TempIds.push(i.toString() + '-' + line.toString());
        if (config_1.game_data.usedID.indexOf(i.toString() + '-' + line.toString()) != -1) {
            pass = false;
            TempIds = [];
            break;
        }
    }
    if (pass) {
        config_1.game_data.usedID = config_1.game_data.usedID.concat(TempIds);
        fillTiles(TempIds, sentence);
    }
    config_1.game_data.Direction = 'checkHorizental';
    return { pass: pass, name: "" };
}
function checkVertical(line, from, sentence) {
    var to = sentence.length + from;
    if (to > 12) {
        return false;
    }
    var TempIds = [];
    var pass = true;
    for (var i = from; i < to; i++) {
        TempIds.push(line.toString() + '-' + i.toString());
        if (config_1.game_data.usedID.indexOf(line.toString() + '-' + i.toString()) != -1) {
            if ((0, jquery_1.default)("#" + line.toString() + '-' + i.toString()).text() != sentence.charAt(i)) {
                pass = false;
                TempIds = [];
                break;
            }
        }
    }
    if (pass) {
        config_1.game_data.usedID = config_1.game_data.usedID.concat(TempIds);
        fillTiles(TempIds, sentence);
    }
    config_1.game_data.Direction = 'checkVertical';
    return { pass: pass, name: "" };
}
function checkDiangonal1(line, from, sentence) {
    var to = sentence.length + from;
    if (to > 12) {
        return false;
    }
    var TempIds = [];
    var pass = true;
    var count = line;
    for (var i = from; i < to; i++) {
        TempIds.push((i).toString() + '-' + (count).toString());
        if (config_1.game_data.usedID.indexOf((i).toString() + '-' + (count).toString()) != -1) {
            if ((0, jquery_1.default)("#" + (i).toString() + '-' + (count).toString()).text() != sentence.charAt(i)) {
                pass = false;
                TempIds = [];
                break;
            }
        }
        if (count > 11) {
            pass = false;
            break;
        }
        count++;
    }
    if (pass) {
        config_1.game_data.usedID = config_1.game_data.usedID.concat(TempIds);
        fillTiles(TempIds, sentence);
    }
    config_1.game_data.Direction = 'checkDiangonal1';
    return { pass: pass, name: "" };
}
function checkDiangonal2(line, from, sentence) {
    var to = (from - sentence.length);
    if (to < 0) {
        return false;
    }
    var TempIds = [];
    var pass = true;
    var count = 0;
    for (var i = from; i > to; i--) {
        TempIds.push(i.toString() + '-' + (line).toString());
        if (config_1.game_data.usedID.indexOf(i.toString() + '-' + (line).toString()) != -1) {
            if ((0, jquery_1.default)("#" + i.toString() + '-' + (line).toString()).text() != sentence.charAt(count)) {
                pass = false;
                TempIds = [];
                break;
            }
        }
        if (line > 11) {
            pass = false;
            break;
        }
        line++;
        count++;
    }
    if (pass) {
        config_1.game_data.usedID = config_1.game_data.usedID.concat(TempIds);
        fillTiles(TempIds, sentence);
    }
    config_1.game_data.Direction = 'checkDiangonal2';
    return { pass: pass, name: "" };
}
function fillTiles(TempIds, sentence) {
    config_1.game_data.sentenceByTiles.push({ sentence: sentence, tiles: TempIds });
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    for (var c = 0; c < TempIds.length; c++) {
        var tile = TempIds[c];
        (0, jquery_1.default)("#" + tile).find("p:first").text(sentence.charAt(c).toUpperCase());
        if (config_1.game_data.coloredWords) {
            (0, jquery_1.default)("#" + tile).find("p:first").css('color', "#" + randomColor);
        }
    }
}
function Hint(sentence, div) {
    var found = config_1.GameData.wordTransformed.find(function (obj) {
        return obj.originalW === sentence;
    });
    if (config_1.game_data.CurrentHintCounter > config_1.game_data.maxHint ||
        config_1.game_data.foundedWords.indexOf(found.transformed.toUpperCase()) != -1) {
        return;
    }
    console.log('ok---->2', found);
    config_1.game_data.CurrentHintCounter++;
    var index = config_1.game_data.sentenceByTiles.findIndex(function (x) {
        return x.sentence.toUpperCase() === found.transformed.toUpperCase();
    });
    var tiles = config_1.game_data.sentenceByTiles[index].tiles;
    tiles.forEach(function (id) {
        (0, jquery_1.default)('#' + id).removeClass('inactivePanel');
        (0, jquery_1.default)('#' + id).addClass('activePanel');
    });
    div.find("p:first").css('background-color', "#FFFF00");
    setTimeout(function () {
        div.find("p:first").css('background-color', "#FFFFff");
        tiles.forEach(function (id) {
            (0, jquery_1.default)('#' + id).addClass('inactivePanel');
            (0, jquery_1.default)('#' + id).removeClass('activePanel');
        });
    }, 800);
}
function removeLetters() {
    for (var line = 0; line < 12; line++) {
        for (var l = 0; l < 12; l++) {
            (0, jquery_1.default)("#" + l.toString() + '-' + line.toString()).remove();
        }
    }
    for (var w = 0; w < config_1.game_data.foundedWords.length; w++) {
        (0, jquery_1.default)("#w" + w).remove();
    }
    config_1.game_data.CurrentAudios.forEach(function (obj) {
        (0, jquery_1.default)("#" + obj.id).remove();
    });
}
function addLetters() {
    for (var line = 0; line < 12; line++) {
        (0, jquery_1.default)('<div>', {
            id: 'line' + line,
            class: 'd-flex justify-content-center col-12 m-0 p-0',
        }).appendTo('#parentDiv');
        for (var l = 0; l < 12; l++) {
            (0, jquery_1.default)('#line' + line).append(' <div id="' + l.toString() + '-' + line.toString() + '" class="panel"><p class="panelTitle">' + l.toString() + '-' + line.toString() + '</p></div>');
        }
    }
}
function showBottomWords() {
    var i = 0;
    config_1.game_data.wordsInGame.forEach(function (obg) {
        var ico = '';
        if (obg.direction == "checkHorizental") {
            ico = config_1.game_data.ico_horizental;
            obg.id = "w" + i.toString();
        }
        else if (obg.direction == "checkVertical") {
            ico = config_1.game_data.ico_vertical;
            obg.id = "w" + i.toString();
        }
        else if (obg.direction == "checkDiangonal1") {
            ico = config_1.game_data.ico_diagonal1;
            obg.id = "w" + i.toString();
        }
        else if (obg.direction == "checkDiangonal2") {
            ico = config_1.game_data.ico_diagonal2;
            obg.id = "w" + i.toString();
        }
        var found = config_1.GameData.wordTransformed.find(function (obj) {
            return obj.transformed.toUpperCase() === obg.sentence;
        });
        if (found) {
            var AudioUrl = (0, config_1.CleanExtension)(config_1.game_data.Medias[found.id]) + '.mp3';
            found.img = config_1.game_data.Medias[found.id];
            found.audioUrl = config_1.GameData.data_Collection.prefix + '_' + AudioUrl;
            loadAudiosAddImages(found);
        }
        (0, jquery_1.default)('#words').append('<div id="w' + i.toString() + '"><p  class="word">' + found.originalW + ico + '</p></div>');
        (0, jquery_1.default)("#w" + i.toString()).on("click", function () {
            Hint((0, jquery_1.default)(this).find("p:first").text(), (0, jquery_1.default)(this));
        });
        i++;
    });
}
function loadAudiosAddImages(found) {
    console.log('--> 03 found image', config_1.GameData.imageUrl + found.img);
    if (config_1.game_data.imageCounter < 4) {
        (0, jquery_1.default)('.revealedLeft').append('<div class="Box" id="Box' + (found.id).toString() + '">' + ' <img class="imgbox imgboxNotFounded" src="' + config_1.GameData.imageUrl + found.img + '">' +
            '<img class="audioIco" src="./assets/images/audioIco.png"></div>');
    }
    else {
        (0, jquery_1.default)('.revealedRight').append('<div class="Box" id="Box' + (found.id).toString() + '">' + ' <img class="imgbox imgboxNotFounded" src="' + config_1.GameData.imageUrl + found.img + '">' +
            '<img class="audioIco" src="./assets/images/audioIco.png"></div>');
    }
    config_1.game_data.CurrentAudios.push({
        word: found.originalW,
        id: "Box" + (found.id).toString(),
        audio: new howler_1.Howl({ src: config_1.GameData.audioUrl + found.audioUrl, volume: 0.5, loop: false })
    });
    console.log('game_data.CurrentAudios', config_1.game_data.CurrentAudios);
    (0, jquery_1.default)("#Box" + (found.id).toString()).on('click', function () {
        playAudioByid((0, jquery_1.default)(this).attr("id"));
    });
    config_1.game_data.imageCounter++;
}
function playAudioByid(id) {
    console.log('playAudioByid', id);
    var _obj = config_1.game_data.CurrentAudios.find(function (obj) {
        return obj.id === id;
    });
    if (_obj) {
        _obj.audio.play();
    }
}
function addAudios() {
    config_1.game_data.goodS = new howler_1.Howl({ src: './assets/audios/goodS.mp3', volume: 0.5, loop: false });
    config_1.game_data.pinS = new howler_1.Howl({ src: './assets/audios/pinS.mp3', volume: 0.3, loop: false });
    config_1.game_data.wrongS = new howler_1.Howl({ src: './assets/audios/wrongS.mp3', volume: 0.5, loop: false });
    config_1.game_data.applause = new howler_1.Howl({ src: './assets/audios/applause.mp3', volume: 0.5, loop: false });
}
function shuffleArray(array) {
    var _a;
    var currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [
            array[randomIndex], array[currentIndex]
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
function collectData() {
    console.log('word search : version V1');
    var _data = window.location.search;
    var L_indexi = _data.indexOf("?L=");
    var L_indexf = _data.indexOf("&H=");
    var _language = _data.substring(L_indexi + 3, L_indexf);
    var L_indexC = _data.indexOf("&C=");
    var _Hint = _data.substring(L_indexf + 3, L_indexC);
    var L_indexJ = _data.indexOf("&J=");
    var _Config = _data.substring(L_indexC + 3, L_indexJ);
    var L_indexW = _data.indexOf("&W=");
    var _Json = _data.substring(L_indexJ + 3, L_indexW);
    var L_indexPrefix = _data.indexOf("&Prefix=");
    var _Week = _data.substring(L_indexW + 3, L_indexPrefix).split(',');
    var _Prefix = _data.substring(L_indexPrefix + 8, _data.length);
    config_1.GameData.data_Collection = {
        'language': _language,
        'hint': _Hint,
        'config': _Config,
        'jsonpath': _Json,
        "week": _Week,
        "prefix": _Prefix
    };
    console.log("GameData.data_Collection");
    console.table(config_1.GameData.data_Collection);
    var _path = _Json;
    var lastindex = _path.length;
    for (var i = 0; i < _path.length; i++) {
        if (_path[i] === "/") {
            lastindex = i;
        }
    }
    config_1.GameData.audioUrl = _path.substring(0, lastindex) + "/audios/";
    config_1.GameData.imageUrl = _path.substring(0, lastindex) + "/images/";
    console.log("GameData.audioUrl", config_1.GameData.audioUrl);
    console.log("GameData.imageUrl", config_1.GameData.imageUrl);
    jquery_1.default.getJSON(config_1.GameData.data_Collection.jsonpath, function (data) {
        console.log('sucess data', data);
        config_1.GameData.data_Collection.data = data;
        console.log("GameData.data_Collection", config_1.GameData.data_Collection);
        config_1.game_data.Phrases = [];
        config_1.game_data.Medias = [];
        config_1.game_data.CurrentAudios = [];
        config_1.GameData.data_Collection.data.forEach(function (obj) {
            var _phrase = obj[config_1.GameData.data_Collection.language];
            if (obj[config_1.GameData.data_Collection.language].indexOf('#') != -1) {
                _phrase = obj[config_1.GameData.data_Collection.language].split('#')[1];
            }
            var _w = obj.unitweek;
            for (var c = 0; c < config_1.GameData.data_Collection.week.length; c++) {
                if (_w.indexOf(config_1.GameData.data_Collection.week[c]) != -1) {
                    config_1.game_data.Phrases.push(_phrase);
                    config_1.game_data.Medias.push(obj.image);
                }
            }
        });
        startGame(config_1.game_data.Phrases);
    }).fail(function (error) {
        console.log("error", error);
    });
}
