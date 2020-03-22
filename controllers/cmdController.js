const wordService = require('./../libs/wordService'),
    check = require('./../libs/checkLib'),
    colors = require('colors'),
    inquirer = require('inquirer');

let definitions = (word) => {


}
let synonyms = (word) => {

}
let antonyms = (word) => {

}
let examples = (word) => {

}
let getWordOfDay = () => {

}
let fullDictionary = (word) => {

}

let playGame = async () => {

}


let handleError = (err) => {
    console.error(colors.red(new Error(`${err.substring(err.indexOf('<title>') + 7, err.indexOf('</title>'))}`)));
}
module.exports = {
    definitions: definitions,
    synonyms: synonyms,
    antonyms: antonyms,
    examples: examples,
    fullDictionary: fullDictionary,
    playGame: playGame,
    getWordOfDay: getWordOfDay
}