/*
Invasive Species Grading Script
Alex Reyes Aranda Summer 2024
*/

require('../grading-scripts-s3/scratch3')

module.exports = class {
    constructor() {
        this.requirements = {};
        this.extensions = {};
    }

     initReqs() {
        //upleaded picture of IS as sprite
        //IS sprite explains why with audio or text
        //There is another sprite with text or audio
        //backdrop is present
        this.requirements.invasiveSprite = { bool: false, str: "I uploaded a picture of my invasive species as a sprite"};
        this.requirements.invasiveExplained = { bool: false, str: "My invasive species sprite explains why it's harmful to my area's ecosystem through text or audio"};
        this.requirements.ecosystemExplained = { bool: false, str: "I  have a sprite that explains how to protect my area's ecosystem from the invasive species through text or audio."};
        this.requirements.backdropPresent = { bool: false, str: "I have a backdrop that shows my area's ecosystem."}; //done
        
    }


    grade(fileObj, user) {
        var project = new Project(fileObj, null);
        this.initReqs();
        if (!is(fileObj)) return;

        let stage = project.targets.find(t=>t.isStage);
        let sprites = project.targets.filter(t=>!t.isStage);
        
        console.log(scratch3.speak)
        function procSprite(sprite){
            // evaluating a single sprite
            var out = { invasiveExplains: false, ecosystemExplains: false };
            out.invasiveExplains = (sprites.length >= 2) ? sprite.scripts.some(s=>s.blocks.some(b=>b.opcode.includes("looks_") || b.opcode.includes())): false;
            out.ecosystemExplains = sprite.scripts.some(s=>s.blocks.some(b=>b.opcode.includes() || b.opcode.includes()));


            return out;
        }
        var results = sprites.map(procSprite);

        this.requirements.invasiveSprite.bool = sprites.length >= 2;

        this.requirements.invasiveExplained.bool = 
        this.requirements.ecosystemExplained.bool = 
        this.requirements.backdropPresent.bool = stage.costumes.length >= 2;
        
        console.log("-- DEBUG --");
        


        return;
    }
}