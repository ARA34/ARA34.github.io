/*
Place holder code for systems grading script
Adapted from final-project.js
*/

require('./scratch3');

module.exports = class {
    constructor() {
        this.requirements = {};
        this.extensions = {};
    }

     initReqs() {
        this.requirements.explains = { bool: false, str: "At least sound block or say block to explain each arrow."};
        this.requirements.animation_loop = { bool: false, str: "At least one sprite is animated with the blocks given on worksheet."}; //done

        this.requirements.SpriteCategory = { bool: false, str: "I used 3 picture sprites"};
        this.requirements.EventCategory = { bool: false, str: "Event category on rubric"};
        this.requirements.LoopsCategory = { bool: false, str: "Loops category on rubric"};
    }


    grade(fileObj, user) {
        var project = new Project(fileObj, null);
        this.initReqs();
        if (!is(fileObj)) return;
        //SPRITES
        // look for 3 picture sprites --> picture sprite is not arrow and not backdrop DONE
        //EVENTS
        // each picture sprite has at least 2 "when this is clicked"
        // each arrow has a "when I recieve"
        // the backdrop has "when green flag"
        //LOOPS
        // the arrows blink(are animated) when corresponding picture sprite is clicked ALL Arrows have animation

        let stage = project.targets.find(t => t.isStage);
        let sprites = project.targets.filter(t=> !t.isStage);
        let arrows = sprites.filter(t=>t.name.includes("Arrow"));
        let pictureSprites = sprites.filter(t=> !arrows.includes(t));


        function procSprite(sprite){
            // evaluating a single sprite
            var out = {hasAnimation: false, hasExplanation: false, explains: false, pictureHas2When: false, arrowHasWhen: false, arrowBlinks: false };
            
            var loops_forever = sprite.scripts.filter(s=>s.blocks[0].opcode.includes("event_")).map(s=>s.blocks.filter(b=>b.opcode.includes("control_forever"))).flat();
            out.hasAnimation = loops_forever.some(loop=>loop.subscripts.some(s=>s.blocks.some(block=>block.opcode.includes("looks_nextcostume") && s.blocks.some(block=>block.opcode.includes("control_wait")))));
            //out.hasExplanation = sprite.scripts.some(s=>s.blocks.some(block=>block.opcode.includes("looks_sayforsecs") || s.blocks.some(block=>block.opcode.includes("sound_playuntildone"))));
            out.hasExplanation = (arrows.includes(sprite)) ? sprite.scripts.some(s=>s.blocks.some(block=>block.opcode.includes("looks_sayforsecs") || s.blocks.some(block=>block.opcode.includes("sound_playuntildone")))) : false;
            // check if each picture sprite has at leats 2 "when this is clicked"
            var available_scripts = (pictureSprites.includes(sprite)) ? sprite.scripts.filter(s=>s.blocks.some(block=>block.opcode.includes("event_whenthisspriteclicked"))): [];
            out.pictureHas2When = available_scripts.length >= 2;
            out.arrowHasWhen = (arrows.includes(sprite)) ? sprite.scripts.some(s=>s.blocks.some(block=>block.opcode.includes("event_whenbroadcastreceived"))) : false;
            out.arrowBlinks = (arrows.includes(sprite)) ? sprite.scripts.some(s=>s.blocks[0].opcode.includes("event_whenbroadcastreceived") && s.blocks[1].opcode.includes("control_repeat") && s.blocks.some(block=>block.opcode.includes("control_wait") && s.blocks.some(block=>block.opcode.includes("looks_nextcostume")))) : false;
            return out;
        }
        var results = sprites.map(procSprite);
        this.requirements.animation_loop.bool = results.some(r=>r.hasAnimation);
        //this.requirements.explains.bool = (results.length >= 6) ? this.requirements.explains.bool = results.filter(c=>c.hasExplanation == true).length == 6 : false;
        this.requirements.explains.bool = (arrows.length >=1) ? results.filter(c=>c.hasExplanation).length == arrows.length : false;
        this.requirements.SpriteCategor.bool = pictureSprites.length >= 3;
        if (pictureSprites.length >= 1){
            let picturesHave2When = results.filter(c=>c.pictureHas2When).length == pictureSprites.length;
            let arrowsHaveWhen = results.filter(c=>c.arrowHasWhen).length == arrows.length;
            let backdropHasFlag = stage.scripts.some(s=>s.blocks.some(blocks=>blocks.opcode.includes("event_whenflagclicked")));
            this.requirements.EventCategory.bool = picturesHave2When && arrowsHaveWhen && backdropHasFlag;
        }
        this.requirements.LoopsCategory.bool = (arrows.length >= 1) ? results.filter(c=>c.arrowBlinks).length == arrows.length : false;

        console.log("results: ", results);
        console.log("arrows_length: ", arrows.length);
        console.log("pictures_length: ", pictureSprites.length);
        // console.log(results.filter(c=>c.hasExplanation).length);

        return;
    }
}