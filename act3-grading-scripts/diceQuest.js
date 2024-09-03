/*
Place holder code for diceQuest grading script
Alex Reyes Aranda Summer 2024
*/

require('../grading-scripts-s3/scratch3')

module.exports = class {
    constructor() {
        this.requirements = {};
        this.extensions = {};
    }

     initReqs() {
        this.requirements.dieFourSet = { bool: false, str: "When die number = 4, increase score by 4."};
        this.requirements.dieFiveSet = { bool: false, str: "When die number=5, increase score by 5."};
        this.requirements.dieSixSet = { bool: false, str: "When die number=6 condition in program."};
    }


    grade(fileObj, user) {
        var project = new Project(fileObj, null);
        this.initReqs();
        if (!is(fileObj)) return;

        let stage = project.targets.find(t=>t.isStage);
        let sprites = project.targets.filter(t=>!t.isStage);

        function checkOperand(operand, value) {
            return map(operand.filter(o=>Array.isArray(o).length == 2)[1] == value).includes(true);
        }
        
        function procSprite(sprite){
            // evaluating a single sprite
            var out = { hasFour: false, hasFive: false, hasSix: false};
            //if or if else are ok control blocks
            out.hasFour = sprite.scripts.some(s=>s.blocks.some(b=>b.opcode.includes("control_if_else") && (checkOperand(b.conditionBlock.inputs.OPERAND1, "4") || checkOperand(b.conditionBlock.inputs.OPERAND2, "4"))));
            return out;
        }
        var results = sprites.map(procSprite);
        this.requirements.dieFourSet.bool = results.filter(o=>o.hasFour).length >= 1;
        // this.requirements.dieFiveSet.bool = results.filter(o=>o.hasFive).length >= 1;
        // this.requirements.dieSixSet.bool = results.filter(o=>o.hasSix).length >= 1;
        
        console.log("-- DEBUG --");
        console.log("remeber to have values inside your conditions");

        return;
    }
}