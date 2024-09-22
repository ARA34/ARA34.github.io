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
            var out = { validOriginSprite: false, saysDirectionsSprite: false, mazeConditionsSprite: false};
            

            

            return out;
        }
        // we just want to check that at least two sprites have all the requirements
        var results = sprites.map(procSprite);

        
        console.log("-- DEBUG --");

        return;
    }
}