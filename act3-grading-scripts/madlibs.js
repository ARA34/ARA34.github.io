//Madlibs Test
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
        this.requirements.initVars = { bool: false, str: "I initialized my varibale values to 0" };
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
            var out = { spriteHasVar};
            return out;
        }


        
        // let NumVars = 0;
        // for (sprite in allSprites){
        //     if (sprite.varibales){
        //         // NumVars += 1;
        //         console.log(type(sprite.varibales))
        //         console.log("numOfVars:", len(sprite.varibales))
        //     }
        // }

        this.requirements.Sprites = len(allSprites) >= 2;
        
        console.log("targets: ", allSprites);
        

        return;
    }
}