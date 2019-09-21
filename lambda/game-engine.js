const topics = require('./resources/topics.json');

/**
 * Returns an object of the current status of the game
 * @returns {{topic: *, finished: boolean, word: *, status: number}}
 */
function startGame() {
    const maxTopics = topics.topics.length;
    const currentTopicIndex = random(0, maxTopics);
    const currentTopic = topics.topics[currentTopicIndex];

    const currentWordList = currentTopic.words;
    const maxWords = currentWordList.length;
    const currentWordIndex = random(0, maxWords);
    const currentWord = currentWordList[currentWordIndex];

    const examples = require('./resources/examples.json');
    const firstCharacter = currentWord[0].toLowerCase();
    const maxExamples = examples[firstCharacter].length; 
    const randomExampleIndex = random(0,maxExamples);
    const firstWord = examples[firstCharacter][randomExampleIndex];

    return {
        'topic': currentTopic.name.toLowerCase(),
        'secretWord': currentWord.toLowerCase(),
        'position': 1,
        'wordList': [firstWord],
        'finished': false
    };
}

/**
 *
 * @param currentStatus
 * @param word
 * @returns {{result: boolean, status: *}}
 */
function validateWord(currentStatus, word) {
    // Get search letter
    const currentWord = currentStatus.secretWord;
    const currentWordLetter = currentWord.toLowerCase().charAt(currentStatus.position);

    const letterToCheck = word.toLowerCase().charAt(0);

    const result = currentWordLetter === letterToCheck;

    if (result) {
        currentStatus.position += 1;
        currentStatus.wordList.push(word);
    }

    currentStatus.finished = currentStatus.secretWord.length === currentStatus.position;

    return {
        'result': result,
        'status': currentStatus
    }

}

function random(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
}
module.exports = {
    startGame: startGame,
    validateWord: validateWord
};