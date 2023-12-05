/*
Place holder code for systems grading script
Adapted from final-project.js


This script account for blocks being connected but doesnt account for the type of blocks being.. 
connected except for the first one which is the run block
*/

// check for connecting blocks

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
        this.requirements.hasThink = { bool: false, str: "Has a say block" };
    }


    grade(fileObj, user) {
        var project = new Project(fileObj, null);
        this.initReqs();
        if (!is(fileObj)) return;

        let stage = project.targets.find(t => t.isStage);
     
       let sprites = project.targets.filter(t=> !t.isStage);

        function procSprite(sprite){
            var out = {maxScriptLength:0, nEvents:0, hasLoop:false, hasThink: false }
            for(let target of project.targets){
                if(target.isStage) {continue}
                else{
                    for(let script of target.scripts) {
                        for(let block of script.allBlocks()){
                            if((block.opcode == "looks_sayforsecs")) {
                                out.hasThink = true
                            }
                        }
                    }
                }
            }
            out.maxScriptLength = Math.max(...sprite.scripts.filter(s=> s.blocks[0].opcode.includes("event_")).map(s=>s.blocks.length));
            out.nEvents = new Set(sprite.scripts.filter(s=> s.blocks[0].opcode.includes("event_")).filter(s=>s.blocks.length > 1).map(s=>s.blocks[0].opcode + JSON.stringify(s.blocks[0].fields))).size;
            var loops = sprite.scripts.filter(s=> s.blocks[0].opcode.includes("event_")).map(s=>s.blocks.filter(b=>b.opcode.includes("control_repeat"))).flat();
            out.hasLoop = loops.some(loop=>loop.subscripts.some(s=>s.blocks.some(block=>block.opcode.includes("motion_") && s.blocks.some(block=>block.opcode.includes("control_wait")))));
            return out;
        }


        var results = sprites.map(procSprite);
        this.requirements.longScript.bool = Math.max(...results.map(r=>r.maxScriptLength)) >= 4; //checking for long script
        this.requirements.events.bool = results.filter(r=>r.nEvents >= 3).length > 0;
        this.requirements.loop.bool = results.some(r=>r.hasLoop);
        // this.reqiuirements.loop.bool = results.some(r=>r.hasLoop);
        console.log(results);
        console.log(results.some(r=>r.hasLoop));
        console.log(sprites);
   

        return;
    }
}