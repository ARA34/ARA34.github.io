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
        this.requirements.longScript = { bool: false, str: 'At least one script with 4 blocks' };//done
        this.requirements.events = { bool: false, str: 'At least one sprite with three different event blocks.' };//done
        this.requirements.loop = { bool: false, str: 'At least one sprite uses a repeat block to move smoothly.' };//done
        this.requirements.hasSay = { bool: false, str: "Has a say block" }; // example -- can remove
        this.requirements.explains = { bool: false, str: "At least sound block or say block to explain each arrow(6)."}; //done
    }


    grade(fileObj, user) {
        var project = new Project(fileObj, null);
        this.initReqs();
        if (!is(fileObj)) return;

        let stage = project.targets.find(t => t.isStage);
     
       let sprites = project.targets.filter(t=> !t.isStage); //important

        function procSprite(sprite){
            var out = {maxScriptLength:0, nEvents:0, hasLoop:false, hasSay:false , hasExplanation:false , explains:false };

            /*for (let script of sprite.scripts){
                for (let block of script.allBlocks()){
                    if((block.opcode == "looks_sayforsecs")){
                        out.hasSay = true;
                    }
                }
            }*/
            
            out.maxScriptLength = Math.max(...sprite.scripts.filter(s=> s.blocks[0].opcode.includes("event_")).map(s=>s.blocks.length));
            out.nEvents = new Set(sprite.scripts.filter(s=> s.blocks[0].opcode.includes("event_")).filter(s=>s.blocks.length > 1).map(s=>s.blocks[0].opcode + JSON.stringify(s.blocks[0].fields))).size;
            var loops = sprite.scripts.filter(s=> s.blocks[0].opcode.includes("event_")).map(s=>s.blocks.filter(b=>b.opcode.includes("control_repeat"))).flat();
            out.hasLoop = loops.some(loop=>loop.subscripts.some(s=>s.blocks.some(block=>block.opcode.includes("motion_") && s.blocks.some(block=>block.opcode.includes("control_wait")))));
            out.hasExplanation = sprite.scripts.some(s=>s.blocks.some(block=>block.opcode.includes("looks_sayforsecs") || s.blocks.some(block=>block.opcode.includes("sound_playuntildone")))); // either sound or say block
            out.hasSay = sprite.scripts.some(s=>s.blocks.some(block=>block.opcode == "looks_sayforsecs"));
            return out;
        }


        var results = sprites.map(procSprite);
        this.requirements.longScript.bool = Math.max(...results.map(r=>r.maxScriptLength)) >= 4; //checking for long script
        this.requirements.events.bool = results.filter(r=>r.nEvents >= 3).length > 0;
        this.requirements.loop.bool = results.some(r=>r.hasLoop);
        // this.reqiuirements.loop.bool = results.some(r=>r.hasLoop);

        this.requirements.explains.bool = results.filter(c=>c.hasExplanation).length == 6;
        this.requirements.hasSay.bool = results.some(b=>b.hasSay);

        console.log(results);
        console.log(results.some(r=>r.hasLoop));
        console.log(results.filter(c=>c.hasExplanation).length == 6);
        console.log(results.some(b=>b.hasSay));

        return;
    }
}