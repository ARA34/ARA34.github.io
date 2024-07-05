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
        let stage = project.targets.find(t => t.isStage);
        let sprites = project.targets.filter(t => !t.isStage);

        function procSprite(sprite){
            //evaluate a single sprite
            var out = { initVars: 0 };
            function checkInitCond(block) {
                return block.opcode.includes("data_setvariableto") && block.inputs.VALUE.shadow.value.includes(0);
            };

            // given a sprite, check for initalization of vars

            let varScripts = sprite.scripts.filter(block=>block.opcode.includes("data_setvariableto"));
            let s = 0;
            for (s in varScripts) {
                //for each script in a sprite, count the number of blocks that satsify the condition
                let b = 0;
                for (b in s) {
                    if (checkInitCond(s[b])) {
                        console.log("cond satisfied");
                        out.initVars += 1;
                    };
                };
            };
            //if there are more initVars combine than variables existing - 1, then initAllVars is satified
            
            return out;
        };

        var results = allSprites.map(procSprite);
        function returnNumber(exOut) {
            return exOut.number;
        }
        this.requirements.initAllVars = results.

        this.requirements.Sprites = allSprites.length >= 2;
        console.log("targets: ", allSprites);
        return;
    }
}