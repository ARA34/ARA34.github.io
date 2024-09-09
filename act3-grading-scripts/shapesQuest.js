/*
shapesQuest
Alex Reyes Aranda Summer 2024
*/

require('../grading-scripts-s3/scratch3')

module.exports = class {
    constructor() {
        this.requirements = {};
        this.extensions = {};
    }

     initReqs() {
        this.requirements.createFunction = { bool: false, str: "Create custom function and name it."};
        this.requirements.validFunction = { bool: false, str: "Custom function has the right repeating blocks."};
        this.requirements.usedFunction = { bool: false, str: "Three custom function blocks under 'When this sprite is clicked'"};

        this.extensions.turnBlocksAdded = { bool: false, str: "'Turn 15' blocks added in between custom function blocks under 'When this sprite is clicked'"};
        this.extensions.penColor = { bool: false, str: "'Change pen color (30)' blocks added in between turn blocks under 'When this sprite is clicked'"};
    }


    grade(fileObj, user) {
        var project = new Project(fileObj, null);
        this.initReqs();
        if (!is(fileObj)) return;

        let stage = project.targets.find(t=>t.isStage);
        let sprites = project.targets.filter(t=>!t.isStage);
        

        function procSprite(sprite){
            console.log("sprite: ", sprite);
            console.log("scripts: ", sprite.scripts);
            // evaluating a single sprite
            var out = { hasFunction: false, repeatingBlocks: false, addedFunctions: false};
            out.hasFunction = sprite.scripts.some(s=>s.blocks.some(b=>b.opcode.includes("procedures_definition")));

            //if or if else are ok control blocks
            return out;
        }
        var results = sprites.map(procSprite);
        this.requirements.createFunction.bool = results.filter(o=>o.hasFunction).length >= 1;
        
        
        console.log("-- DEBUG --");
        console.log("It is best to have all your scripts under one sprite with starter name 'drawtriangle2'");
        

        return;
    }
}