/*
Place holder code for systems grading script
Adapted from final-project.js


This script account for blocks being connected but doesnt account for the type of blocks being... 
connected except for the first one which is the run block
*/

require('../grading-scripts-s3/scratch3')

module.exports = class {
    constructor() {
        this.requirements = {};
        this.extensions = {};
    }

     initReqs() {
        this.requirements.longScript = { bool: false, str: 'At least one script with 4 blocks' };//erase
        this.requirements.events = { bool: false, str: 'At least one sprite with three different event blocks.' };//erase
        this.requirements.repeat_loop = { bool: false, str: 'At least one sprite uses a repeat block to move smoothly.' };//erase
        this.requirements.explains = { bool: false, str: "At least sound block or say block to explain each arrow(6)."}; //done
        this.requirements.animation_loop = { bool: false, str: "At least one sprite is animated with the blocks given on worksheet."} //working 

    }


    grade(fileObj, user) {
        var project = new Project(fileObj, null);
        this.initReqs();
        if (!is(fileObj)) return;

        let stage = project.targets.find(t => t.isStage);
     
       let sprites = project.targets.filter(t=> !t.isStage); //important

        function procSprite(sprite){
            var out = {maxScriptLength:0, nEvents:0, hasLoop:false, hasAnimation: false, hasExplanation:false, explains:false};
            
            out.maxScriptLength = Math.max(...sprite.scripts.filter(s=> s.blocks[0].opcode.includes("event_")).map(s=>s.blocks.length));
            out.nEvents = new Set(sprite.scripts.filter(s=> s.blocks[0].opcode.includes("event_")).filter(s=>s.blocks.length > 1).map(s=>s.blocks[0].opcode + JSON.stringify(s.blocks[0].fields))).size;
            //var loops = sprite.scripts.filter(s=> s.blocks[0].opcode.includes("event_")).map(s=>s.blocks.filter(b=>b.opcode.includes("control_repeat"))).flat();
            var loops_repeat = sprite.scripts.filter(s=>s.blocks[0].opcode.includes("event_")).map(s=>s.blocks.filter(b=>b.opcode.includes("control_repeat_until"))).flat();
            var loops_forever = sprite.scripts.filter(s=>s.blocks[0].opcode.includes("event_")).map(s=>s.blocks.filter(b=>b.opcode.includes("control_forever"))).flat();
            out.hasLoop = loops_repeat.some(loop=>loop.subscripts.some(s=>s.blocks.some(block=>block.opcode.includes("motion_") && s.blocks.some(block=>block.opcode.includes("control_wait")))));
            out.hasAnimation = loops_forever.some(loop=>loop.subscripts.some(s=>s.blocks.some(block=>block.opcode.includes("looks_nextcostume") && s.blocks.some(block=>block.opcode.includes("control_wait")))));
            out.hasExplanation = sprite.scripts.some(s=>s.blocks.some(block=>block.opcode.includes("looks_sayforsecs") || s.blocks.some(block=>block.opcode.includes("sound_playuntildone")))); // either sound or say block
            return out;
        }

        var results = sprites.map(procSprite);
        this.requirements.longScript.bool = Math.max(...results.map(r=>r.maxScriptLength)) >= 4; //checking for long script
        this.requirements.events.bool = results.filter(r=>r.nEvents >= 3).length > 0;
        this.requirements.repeat_loop.bool = results.some(r=>r.hasLoop);
        // this.reqiuirements.loop.bool = results.some(r=>r.hasLoop);
        this.requirements.animation_loop.bool = results.some(r=r.hasAnimation);
        this.requirements.explains.bool = (results.length >= 6) ? this.requirements.explains.bool = results.filter(c=>c.hasExplanation == true).length == 6 : false;

        console.log(results);
        console.log(results.some(r=>r.hasLoop));

        return;
    }
}