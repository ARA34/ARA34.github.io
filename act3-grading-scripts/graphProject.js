//graphProject.js (previously home to condLoopsL1)
require('./scratch3');

// identifty a varibale and print out its value

module.exports = class{
    constructor(){
        this.requirements = {};
        this.extensions = {};
    }
    initReqs(){

        // this.requirements.Sprites = { bool: false, str: "I had at least one sprite and a backdrop" };
        // this.requirements.VarsExistance = { bool: false, str: "I created 3 variables" };
        // this.requirements.initAllVars = { bool: false, str: "I initialized my varibale values to 0" };
        // this.requirements.questionsAndVars = {bool: false, str: "I asked questions and store their responses in my variables" };


        this.requirements.Category1 = { bool: false, str: "Completed category 1"};
        this.requirements.Category2 = { bool: false, str: "Completed category 2"};
        this.requirements.Category3 = { bool: false, str: "Completed category 3"};
        this.requirements.MainScript = { bool: false, str: "The structure of the main script is correct"}
        this.requirements.CategoryOrder = { bool: false, str: "The ordering of categories is correct"}
    }

    grade(fileObj, user){
        var project = new Project(fileObj, null);
        this.initReqs();
        if (!is(fileObj)) return;
        
        let allSprites = project.targets;
        let stage = project.targets.find(t=>t.isStage);
        let sprites = project.targets.filter(t=>!t.isStage);


        //ex. findCategory(Ball Sprite, 4, idk, idk, ball-e) -> true
        function findCategory(sprite, n, x, y, costumeName) {
            // Look for a specific custom function in a sprite
            let customScripts = sprite.scripts.filter(s=>s.blocks[0].opcode.includes("procedures_definition") && s.blocks.some(block=>block.opcode.includes("sensing_askandwait")));
            console.log(customScripts, n)

            var catOut = false

            //the customScripts is an Array(2) with the restricted blocks, iterate over these blocks and analyze their insides

            let gs = 0;
            for(gs in customScripts) {
                if (Object.keys(customScripts[gs]).includes("blocks")) {
                    //now iterate through the blocks in the script
                    let scriptPieces = { set: false, move: false, costumeSwitch: false, stampsBall: false}; // TODO: if anyone of these are missing flag it!
                    // console.log("here: ", customScripts[gs].blocks[0])
                    if (customScripts[gs].blocks[0].opcode.includes("procedures_definition") && customScripts[gs].blocks[0].inputBlocks[0].mutation.proccode == `category${n}`) {
                        let gb = 1;
                        for (gb in customScripts[gs].blocks) {
                            let currBlock = customScripts[gs].blocks[gb]
                            if (currBlock.opcode.includes("data_setvariableto")) { // check for inputs (which var changing, new value)
                                // sets category to answer
                                scriptPieces.set = true;
                            } else if (currBlock.opcode.includes("motion_gotoxy")) { // new x,y
                                // moves the ball
                                scriptPieces.move = true;
                            } else if (currBlock.opcode.includes("looks_switchcostumeto")) { // check for inputs (new costume)
                                // switch costume
                                scriptPieces.costumeSwitch = true;
                            } else if (currBlock.opcode.includes("procedures_call")) { // check the name of custom script is stampball
                                // stamps ball
                                scriptPieces.stampsBall = true;
                            }
                        }
                    }
                catOut = Object.values(scriptPieces).filter(c=>c).length == Object.values(scriptPieces).length;
                }
            }
            return catOut
        }

        // function accumulateVars(sprites) {
        //     let numOfVars = 0;
        //     let s = 0;
        //     for (s in sprites) {
        //         if (sprites[s].variables != null) {
        //             numOfVars += Object.keys(sprites[s].variables).length;
        //         }
        //     }
        //     return numOfVars;
        // }

        function procSprite(sprite){
            //evaluate a single sprite
            var out = { initVars: 0, askedAndStored: false, loopStructure: false, foundCats: []};
            // given a sprite, check for initalization of vars
            // let varScripts = sprite.scripts.filter(s=>s.blocks.some(block=>block.opcode.includes("data_setvariableto") && block.inputs.VALUE[1].includes('0')));
            

            

            for (let i = 1; i <= 3; i++) {
                // where i is the number of functions we want to check for
                out.foundCats.push(findCategory(sprite,i, null, null, null))
            }
            
            
            // let gs = 0;
            // for (gs in varScripts) {
            //     //check if scripts property exists in object
            //     if (Object.keys(varScripts[gs]).includes("blocks")) {
            //         let gb = 0;
            //         for (gb in varScripts[gs].blocks) {
            //             let currBlock = varScripts[gs].blocks[gb];
            //             if (currBlock.opcode.includes("data_setvariableto") && currBlock.inputs.VALUE[1].includes('0')) {
            //                 out.initVars += 1;
            //             }
            //         }
            //     }
            // }
            // out.askedAndStored = sprite.scripts.some(s=>s.blocks.some(block=>block.opcode.includes("sensing_askandwait") && s.blocks.some(block=>block.opcode.includes("data_setvariableto"))));

            return out;
        };

        var results = allSprites.map(procSprite);
        function returnCats(exOut) {
            return exOut.foundCats
        }
        var categoryMatrix = results.map(returnCats)
        





        // function returnNumVars(exOut) {
        //     return exOut.initVars;
        // }
        // var initVarsSum = results.map(returnNumVars).reduce((sum, current) => sum + current, 0);
        // this.requirements.Sprites.bool = allSprites.length >= 2;
        // this.requirements.VarsExistance.bool = accumulateVars(allSprites) >= 3;
        // this.requirements.initAllVars.bool = initVarsSum >= accumulateVars(allSprites) - 1;
        // this.requirements.questionsAndVars.bool = results.filter(o=>o.askedAndStored).length >= 1; // There exists one instance of asking & storing

        // we look at the column and check if at least one value is true
        this.requirements.Category1.bool = categoryMatrix.map(c=>c[0]).some(c=>c)
        this.requirements.Category2.bool = categoryMatrix.map(c=>c[1]).some(c=>c)
        this.requirements.Category3.bool = categoryMatrix.map(c=>c[2]).some(c=>c)
        return;
    }
}