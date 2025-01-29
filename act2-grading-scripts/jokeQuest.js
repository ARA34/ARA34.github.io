/*
[Quest] Joke Quest Grading Script
Alex Reyes Aranda Fall 2024
*/


require('../grading-scripts-s3/scratch3')

module.exports = class {
    constructor() {
        this.requirements = {};
        this.extensions = {};
    }

     initReqs() {
        
    }

    grade(fileObj, user) {
        var project = new Project(fileObj, null);
        this.initReqs();
        if (!is(fileObj)) return;


        function procSprite(sprite){
            // evaluating an individual sprite
            
        }
        var results = sprites.map(procSprite);
        
        
        console.log("-- DEBUG --");

        return;
    }
}