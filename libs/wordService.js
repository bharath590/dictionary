const request = require('request-promise');
const colors= require('colors');

let baseUri='https://fourtytwowords.herokuapp.com';
var options = {
    method: 'GET',
    url: '',
    qs: { api_key: 'b972c7ca44dda72a5b482052b1f5e13470e01477f3fb97c85d5313b3c112627073481104fec2fb1a0cc9d84c2212474c0cbe7d8e59d7b95c7cb32a1133f778abd1857bf934ba06647fda4f59e878d164' },
    headers:
    {
        'cache-control': 'no-cache'
    }
};

let fetchDefinitions=(word)=>{
    return new Promise((resolve,reject)=>{
        options.url=`${baseUri}/word/${word}/definitions`;
        request(options).then(response=>{
            //console.log("@@@@@@@@@@@@@@@@@@",response);
            return resolve(response);
        }).catch(err=>{
            return reject(err.error);
        })
    })
}
let fetchSynonyms=(word)=>{
    return new Promise((resolve,reject)=>{
        options.uri=`${baseUri}/entries/en/${word}/synonyms`;
        request(options).then(response=>{
            return resolve(response.results[0]);
        }).catch(err=>{
            return reject(err.error);
        })
    })
}
let fetchAntonyms=(word,limit)=>{
    return new Promise((resolve,reject)=>{
        options.uri=`${baseUri}/entries/en/${word}/antonyms`;
        request(options).then(response=>{
            return resolve(response.results[0]);
        }).catch(err=>{
            return reject(err.error);
        })
    })
}
let fetchAntsAndSyns = (word, type) => {
    return new Promise((resolve, reject) => {
        options.url = `${baseUri}/word/${word}/relatedWords`;
        request(options).then(response => {
            response = JSON.parse(response);
            let relatedWords = {};
            response.forEach(element => {
                if (element.relationshipType) {
                    relatedWords[element.relationshipType] = element.words
                }
            });
            if (typeof type !== 'undefined' && type) {
                relatedWords = relatedWords[type];
            }
            return resolve(relatedWords);
        }).catch(err => {
            return reject(err.error);
        })
    })
}
let fetchExamples = (word) => {
    return new Promise((resolve, reject) => {
        options.url = `${baseUri}/word/${word}/examples`;
        request(options).then(response => {
            response = JSON.parse(response);
            let examples = typeof response.examples !='undefined' ? response.examples:[];
            return resolve(examples);
        }).catch(err => {
            return reject(err.error);
        })
    })
}
let validateWord=(word)=>{
    return new Promise((resolve,reject)=>{
        options.uri=`${baseUri}/inflections/en/${word}`;
        request(options).then(response=>{
            return resolve(true);                
        }).catch(err=>{
            return reject(err);
        })
    })
}
let getRandomWord=()=>{
    return new Promise((resolve,reject)=>{
        options.url=`${baseUri}/words/randomWord`;
        request(options).then(response=>{
            return resolve(JSON.parse(response).word);
        }).catch(err=>{
            return reject(JSON.parse(err.error));
        })
    })
}

module.exports={
    fetchDefinitions:fetchDefinitions,
    fetchAntonyms:fetchAntonyms,
    fetchSynonyms:fetchSynonyms,
	fetchAntsAndSyns:fetchAntsAndSyns,
    validateWord:validateWord,
    getRandomWord:getRandomWord,
    fetchExamples:fetchExamples
}