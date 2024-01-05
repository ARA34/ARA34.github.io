/*
Place holder code for systems grading script
Adapted from final-project.js
*/

require('../grading-scripts-s3/scratch3')

module.exports = class {
    constructor() {
        this.requirements = {};
        this.extensions = {};
    }

     initReqs() {
        this.requirements.explains = { bool: false, str: "At least sound block or say block to explain each arrow."}; //working
        this.requirements.animation_loop = { bool: false, str: "At least one sprite is animated with the blocks given on worksheet."} //done 

    }


    grade(fileObj, user) {
        var project = new Project(fileObj, null);
        this.initReqs();
        if (!is(fileObj)) return;

        let stage = project.targets.find(t => t.isStage);
     
       let sprites = project.targets.filter(t=> !t.isStage); //important
       let arrows = sprites.filter(t=>t.name.includes("Sprite"));

        function procSprite(sprite){
            var out = {hasAnimation: false, hasExplanation:false, explains:false};
            
            var loops_forever = sprite.scripts.filter(s=>s.blocks[0].opcode.includes("event_")).map(s=>s.blocks.filter(b=>b.opcode.includes("control_forever"))).flat();
            out.hasAnimation = loops_forever.some(loop=>loop.subscripts.some(s=>s.blocks.some(block=>block.opcode.includes("looks_nextcostume") && s.blocks.some(block=>block.opcode.includes("control_wait")))));
            out.hasExplanation = sprite.scripts.some(s=>s.blocks.some(block=>block.opcode.includes("looks_sayforsecs") || s.blocks.some(block=>block.opcode.includes("sound_playuntildone"))));
            return out;
        }

        var results = sprites.map(procSprite);
        this.requirements.animation_loop.bool = results.some(r=>r.hasAnimation);
        //this.requirements.explains.bool = (results.length >= 6) ? this.requirements.explains.bool = results.filter(c=>c.hasExplanation == true).length == 6 : false;
        this.requirements.explains.bool = (arrows.length >=1) ? results.filter(c=>c.hasExplanation == true).length == arrows.length : false;

        console.log(results);
        console.log(arrows.length)
        
        return;
    }
}