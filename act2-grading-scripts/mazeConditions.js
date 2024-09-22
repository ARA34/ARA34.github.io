/*
Maze with Conditions Grading Script
Alex Reyes Aranda Fall 2024
*/


require('../grading-scripts-s3/scratch3')

module.exports = class {
    constructor() {
        this.requirements = {};
        this.extensions = {};
    }

     initReqs() {
        this.requirements.backdropProject = { bool: false, str: "I chose or designed a backdrop."};
        this.requirements.threeSpritesProject = { bool: false, str: "I added (3) backdrop sprites or objects."};
        this.requirements.threeCostumesProject = { bool: false, str: "Main sprite has at least (3) costumes"};
        this.requirements.validOriginProject = { bool: false, str: "Main sprite has script to start with same costume and location when green flag clicked."};
        this.requirements.saysDirectionsProject = { bool: false, str: "Main sprite says directions when green flag clicked."};
        this.requirements.mazeConditionsProject = { bool: false, str: "Main sprite has a script with a forever loop and 2 different conditions with actions."};
    }

    grade(fileObj, user) {
        var project = new Project(fileObj, null);
        this.initReqs();
        if (!is(fileObj)) return;

        let stage = project.targets.find(t=>t.isStage);
        let sprites = project.targets.filter(t=>!t.isStage);


        function procSprite(sprite){
            // evaluating a single sprite
            var out = { something: false};
            out.repeatMoreThanOnceSprite = sprite.scripts.some(s=>s.blocks.some(b=>b.opcode.includes("control_repeat") || b.opcode.includes("control_forever")));
            out.synchScriptsSprite = collectHeads(sprite.scripts);
            out.sayOrThinkSprite = sprite.scripts.some(s=>s.blocks.some(b=>b.opcode.includes("looks_say") || b.opcode.includes("looks_think")));
            out.validOriginSprite = sprite.scripts.some(s=>s.blocks[0].opcode.includes("event_whenflagclicked") && s.blocks.some(b=>b.opcode.includes("motion_gotoxy") && s.blocks.some(b=>b.opcode.incldues("looks_switchcostumeto"))));
            let looks_blocks = sprite.scripts.map(s=>s.blocks.map(b=>b.opcode.includes("looks_say")));
            console.log("looks blocks: ", looks_blocks);

            return out;
        }
        // we just want to check that at least two sprites have all the requirements
        var results = sprites.map(procSprite);

        this.requirements.repeatMoreThanOnceProject.bool = results.filter(o=>o.repeatMoreThanOnceSprite).length >= 2;
        
        console.log("-- DEBUG --");

        return;
    }
}