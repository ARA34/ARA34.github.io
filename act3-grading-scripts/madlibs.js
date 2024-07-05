//madlibs.js Test
require('./scratch3');

// identifty a varibale and print out its value

module.exports = class{
    constructor(){
        this.requirements = {};
        this.extensions = {};
    }
    initReqs(){

        this.requirements.Sprites = { bool: false, str: "I had at least one sprite and a backdrop" };
        this.requirements.VarsExistance = { bool: false, str: "I created 3 variables" };
        this.requirements.initAllVars = { bool: false, str: "I initialized my varibale values to 0" };
        this.requirements.questionsAndVars = {bool: false, str: "I asked questions and store their responses in my variables" };
    }

    grade(fileObj, user){
        //grading function
        var project = new Project(fileObj, null);
        this.initReqs();
        if (!is(fileObj)) return;
        
        let allSprites = project.targets;
        let stage = project.targets.find(t=>t.isStage);
        let sprites = project.targets.filter(t=>!t.isStage);

        function accumulateVars(sprites) {
            let numOfVars = 0;
            let s = 0;
            for (s in sprites) {
                numOfVars += sprites[s].variables.length;
            }
            console.log(numOfVars); // DEBUG: printing out number of existing vars
            return numOfVars;
        }

        function procSprite(sprite){
            //evaluate a single sprite
            var out = { initVars: 0, askedAndStored: false};
            // function checkInitCond(block) {
            //     return block.opcode.includes("data_setvariableto") && block.inputs.VALUE[1].includes("0");
            // }

            // given a sprite, check for initalization of vars
            let varScripts = sprite.scripts.filter(s=>s.blocks.some(block=>block.opcode.includes("data_setvariableto") && block.inputs.VALUE[1].includes("0")));

            let s = 0;
            for (s in varScripts) {
                //for each script in a sprite, count the number of blocks that satsify the condition
                let b = 0;
                for (b in varScripts[s]) {
                    if (varScripts[s][b].opcode.includes("data_setvariableto") && block.inputs.VALUE[1].includes("0")) { // conditions for a set 0 block
                        console.log("cond satisfied"); // DEBUG: Checking the loop works
                        out.initVars += 1;
                    }
                }
            }
            out.askedAndStored = sprite.scripts.some(s=>s.blocks.some(block=>block.opcode.includes("sensing_askandwait") && block.opcode.includes("data_setvariableto")));

            return out;
        };

        var results = allSprites.map(procSprite);
        function returnNumVars(exOut) {
            return exOut.number;
        }
        this.requirements.Sprites = allSprites.length >= 2;
        this.requirements.VarsExistance = accumulateVars(allSprites) >= 3;
        this.requirements.initAllVars = results.map(returnNumVars).reduce((sum, current) => sum + current, 0) >= accumulateVars(allSprites) - 1;
        this.requirements.questionsAndVars = results.filter(o=>o.askedAndStored).length >= 1; // There exists one instance of asking & storing
        console.log("targets: ", allSprites); // DEBUG: printing out all targets(sprites)
        return;
    }
}