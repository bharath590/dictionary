const wordService =require('./../libs/wordService'),
check=require('./../libs/checkLib'),
colors=require('colors'),
inquirer=require('inquirer');

let definitions=(word)=>{
    
    if(check.isEmpty(word)){
        console.log(colors.yellow("<word> is required."))
    }else{
        wordService.fetchDefinitions(word).then((data) => {
            data = JSON.parse(data);
            console.log("Definitions :: "); 
            for (let j = 0; j < data.length; j++) {
                if (typeof data[j] != undefined) {
                    console.log(`\n ${colors.green(data[j].text)}`)
                }
            }
        }, (err) => {
            handleError(err);
        });
    }
}
let synonyms = (word) => {
    if (check.isEmpty(word)) {
        console.log(colors.yellow("<word> is required."))
    } else {
        wordService.fetchAntsAndSyns(word, 'synonym').then((synonym) => {
            console.log("Synonym :: ");
            for (let j = 0; j < synonym.length; j++) {
                if (typeof synonym[j] != undefined) {
                    console.log(`\n ${colors.green(synonym[j])}`)
                }
            }

        }, (err) => {
            handleError(err);
        });
    }
}
let antonyms=(word)=>{
    if(check.isEmpty(word)){
        console.log(colors.yellow("<word> is required."))
    }else{
        //fetching & printing antonyms and synonyms 
        wordService.fetchAntsAndSyns(word,'antonym').then((antonym) => {
            console.log("Antonym :: ");
            for (let j = 0; j < antonym.length; j++) {
                if (typeof antonym[j] != undefined) {
                    console.log(`\n ${colors.green(antonym[j])}`)
                }
            }
        }, (err) => {
            handleError(err);
        });
    }
}
let examples = (word) => {
    if (check.isEmpty(word)) {
        console.log(colors.yellow("<word> is required."))
    } else {
        //fetching & printing antonyms and synonyms 
        wordService.fetchExamples(word).then((data) => {
            console.log("Examples :: ");
            for (let j = 0; j < data.length; j++) {
                if (typeof data[j] != undefined) {
                    console.log(`\n ${colors.green(data[j].text)}`)
                }
            }
        }, (err) => {
            handleError(err);
        });
    }
}
let getWordOfDay = () => {
    wordService.getRandomWord().then((word) => {
        if (check.isEmpty(word)) {
            console.log(colors.yellow("Sorry there is problem in the dictionary ."))
        } else {
            console.log(`\n ${colors.green("word of the Day:: "+word)}`);
            fullDictionary(word);
        }
    })
}
let fullDictionary = (word) => {

    if (check.isEmpty(word)) {
        console.log(colors.yellow("<word> is required."))
    } else {
        //fetching & printing definition & examples
        wordService.fetchDefinitions(word).then((data) => {
            data = JSON.parse(data);
            console.log("Definitions :: ");
            for (let j = 0; j < data.length; j++) {
                if (typeof data[j] != undefined) {
                    console.log(`\n ${colors.green(data[j].text)}`)
                }
            }
        }, (err) => {
            handleError(err);
        });
        //fetching & printing antonyms and synonyms 
        wordService.fetchAntsAndSyns(word).then((data) => {
            let antonym = typeof data.antonym != 'undefined' ? data.antonym : [];
            let synonym = typeof data.synonym != 'undefined' ? data.synonym : [];
            console.log("Antonym :: ");
            for (let j = 0; j < antonym.length; j++) {
                if (typeof antonym[j] != undefined) {
                    console.log(`\n ${colors.green(antonym[j])}`)
                }
            }
            console.log("Synonym :: ");
            for (let j = 0; j < synonym.length; j++) {
                if (typeof synonym[j] != undefined) {
                    console.log(`\n ${colors.green(synonym[j])}`)
                }
            }

        }, (err) => {
            handleError(err);
        });
        //fetching & printing antonyms and synonyms 
        wordService.fetchExamples(word).then((data) => {
            console.log("Examples :: ");
            for (let j = 0; j < data.length; j++) {
                if (typeof data[j] != undefined) {
                    console.log(`\n ${colors.green(data[j].text)}`)
                }
            }
        }, (err) => {
            handleError(err);
        });
    }
}

let playGame = async () => {

    try {
        let word = await wordService.getRandomWord();
        let synData = await wordService.fetchAntsAndSyns(word, 'synonym');
        let antData = await wordService.fetchAntsAndSyns(word, 'antonym');
        let definitionData = await wordService.fetchDefinitions(word);
        definitionData = JSON.parse(definitionData);
        let definition = typeof definitionData !='undefined' ? definitionData[0].text:'';
        let syn = typeof synData !='undefined' ?synData[0]:'';
        let ant = typeof antData !='undefined' ? antData[0]:'';
        let message = 'definition :' + definition + ' synonym : '+syn + ' antonym :'+ant;
        console.log('\n  Game Loaded! Let\'s play..');
        let i = 0;
        let gameBegins = () => {
            inquirer.prompt([
                {
                    type: 'input', name: 'word',
                    message: `\n    Guess the Word of ${colors.blue(message)}`,
                }
            ]).then(answers => {
                let checkOthers = () => {
                    for (let syn of synData) {
                        if (syn === answers.word)
                            return true;
                    }
                    return false;
                }
                if (answers.word === word || checkOthers())
                    console.log(colors.green('  Congratulations!! You guessed it correctly.\n'))
                else {
                    console.log(colors.yellow('\n  oops.. It\'s Incorrect.'))
                    let playAgain = () => {
                        inquirer.prompt([
                            {
                                type: 'list', name: 'options',
                                message: `\n  What would you like to do next.`,
                                choices: ['1. Try Again', '2. Hint', '3. Quit'],
                            }
                        ]).then(answer => {    
                            switch (answer.options) {
                                case '1. Try Again': gameBegins(); break;
                                case '2. Hint':
                                    ++i;
                                    if (definitionData && i < definitionData.length) {
                                        definition = typeof definitionData[i] != 'undefined' ? definitionData[i].text : '';
                                    }
                                    if (synData && i < synData.length) {
                                        syn = typeof synData[i] != 'undefined' ? synData[i] : '';
                                    }
                                    if (antData && i < antData.length) {
                                        ant = typeof antData[i] != 'undefined' ? antData[i] : '';
                                    }
                                    let shuffelWord = shuffel(word); 
                                    if(shuffelWord==word){
                                        shuffelWord = shuffel(word);
                                    }
                                    let message = 'shuffelWord :: '+ shuffelWord + ' definition :' + definition + ' synonym : ' + syn + ' antonym :' + ant;
                                    
                                    if (i < synData.length) {
                                        console.log(`\n  try with this hint ${colors.green(message)}`);
                                        gameBegins();
                                    }
                                    else {
                                        console.log('\n  No More Hints available.');
                                        playAgain();
                                    } 
                                    break;

                                case '3. Quit': console.log(`\n	The word was ${word}`); fullDictionary(word); break;
                                default: playAgain(); break;
                            }
                        })
                    }
                    playAgain();
                }
            });
        }
        gameBegins();
    } catch (e) {
        console.log("failed to load the game",e);
    }
}
let shuffel = (word) => {
    var shuffledWord = '';
    word = word.split('');
    while (word.length > 0) {
        shuffledWord += word.splice(word.length * Math.random() << 0, 1);
    }
    return shuffledWord;
}
let handleError=(err)=>{
	console.error( colors.red(new Error(`${err.substring(err.indexOf('<title>')+7,err.indexOf('</title>'))}` )));
}
module.exports={
    definitions:definitions,
    synonyms:synonyms,
    antonyms:antonyms,
    examples:examples,
    fullDictionary:fullDictionary,
    playGame:playGame,
    getWordOfDay:getWordOfDay
}