/*
Place holder code for dragonBoat grading script
Previously [Previous Project Placeholder]
*/

require('../grading-scripts-s3/scratch3')

module.exports = class {
    constructor() {
        this.requirements = {};
        this.extensions = {};
    }

     initReqs() {
        this.requirements.RedFinishes = { bool: false, str: "The red boat reaches the end of the stage."};
        this.requirements.FishMoves = { bool: false, str: "Used 'when right arrow clicked' to loop and move the fish."};
        this.requirements.FishResets = { bool: false, str: "Used 'when green flag clicked' and goto block to start the first in the middle of stage."};
    }


    grade(fileObj, user) {
        var project = new Project(fileObj, null);
        this.initReqs();
        if (!is(fileObj)) return;

        let stage = project.targets.find(t=>t.isStage);
        let sprites = project.targets.filter(t=>!t.isStage);

        function procSprite(sprite){
            // evaluating a single sprite
            var out = { spriteResets: false, spriteLoops: false, spriteSays: false };

            


            return out;
        }
        var results = sprites.map(procSprite);

        
        console.log("-- DEBUG --");
        
        return;
    }
}