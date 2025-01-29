/*
[Quest] Loops with Conditions Grading Script
Alex Reyes Aranda Fall 2024
*/


require('../grading-scripts-s3/scratch3')

module.exports = class {
    constructor() {
        this.requirements = {};
        this.extensions = {};
    }

     initReqs() {
        this.requirements.touchingRoadProject = { bool: false, str: "The ice cream truck only plays music when touching the road."};
        this.requirements.AndieProject = { bool: false, str: "Andie must have condition to say something inside of a forever loop with a green flag event block"};
        this.requirements.iceCreamShopProject = { bool: false, str: "Ice cream shop must have a condition to change costume inside of a forever loop with a green flag event block"};
    }

    grade(fileObj, user) {
        var project = new Project(fileObj, null);
        this.initReqs();
        if (!is(fileObj)) return;

        let stage = project.targets.find(t=>t.isStage);
        let sprites = project.targets.filter(t=>!t.isStage);
        let truckSprite = project.targets.find(t=>t.name == "Ice Cream Truck");
        let andieSprite = project.targets.find(t=>t.name == "Andie");
        let iceCreamSprite = project.targets.find(t=>t.name == "Ice Cream Shop");

        this.requirements.touchingRoadProject.bool = truckSprite.scripts.some(s=>s.blocks[0].opcode.includes("event_whenflagclicked") && s.blocks[1].opcode.includes("control_forever") && s.blocks[1].subscripts.some(s=>s.blocks.some(b=>b.opcode.includes("control_if") && b.conditionBlock.opcode.includes("sensing_touchingcolor") && b.conditionBlock.inputs.COLOR[1][1] == "#718944" && s.blocks.some(b=>b.opcode.includes("sound_playuntildone")))));
        this.requirements.AndieProject.bool = andieSprite.scripts.some(s=>s.blocks[0].opcode.includes("event_whenflagclicked") && s.blocks[1].opcode.includes("control_forever") && s.blocks[1].subscripts.some(s=>s.blocks.some(b=>b.opcode.includes("looks_say"))));
        this.requirements.iceCreamShopProject.bool = iceCreamSprite.scripts.some(s=>s.blocks[0].opcode.includes("event_whenflagclicked") && s.blocks[1].opcode.includes("control_forever") && s.blocks[1].subscripts.some(s=>s.blocks.some(b=>b.opcode.includes("looks_switch"))));
        
        console.log("-- DEBUG --");

        return;
    }
}