/*
[OLD] Act 1 About Me Grader
Intital version and testing: Saranya Turimella, Summer 2019, Updated by Alex Reyes
Updated to reflect new act 1 
*/
require('../grading-scripts-s3/scratch3')

module.exports = class {
    constructor() {
        this.requirements = {};
        this.extensions = {};
    }

    initReqs() {
        // sprites - done
        this.requirements.hasOneSprite = { bool: false, str: 'Project has at least one sprite' };
        this.requirements.hasTwoSprites = { bool: false, str: 'Project has at least two sprites' };
        this.requirements.hasThreeSprites = { bool: false, str: 'Project has at least three sprites' };
        
        this.requirements.hasOneSpeakingInteractive = { bool: false, str: 'Project has at least one sprite that says or thinks' };
        this.requirements.hasTwoSpeakingInteractive = { bool: false, str: 'Project has at least two sprites that says or thinks' };
        this.requirements.hasThreeSpeakingInteractive = { bool: false, str: 'Project has at least three sprites that says or thinks' };
        // interactive and speaking  - done
        this.requirements.oneInteractive = { bool: false, str: 'Project has one sprite with at least three actions' };
        this.requirements.twoInteractive = { bool: false, str: 'Project has two sprites with at least three actions' };
        this.requirements.threeInteractive = { bool: false, str: 'Project has three sprites with at least three actions' };
        // background - done
        this.requirements.hasBackdrop = { bool: false, str: 'This project has a backdrop' };
        // speaking - done
    }

    grade(fileObj, user) {
        var project = new Project(fileObj, null);

        this.initReqs();
        if (!is(fileObj)) return;


        let isInteractiveAndSpeaks = false;
        let numInteractiveAndSpeaks = 0;
        let numInteractive = 0;

        // loop through sprites (project.targets)
        for (let target of project.targets) {
            if (target.isStage) {
                for (let cost in target.costumes) {
                    if ((target.costumes.length > 1) || (cost.assetID !== "cd21514d0531fdffb22204e0ec5ed84a")) {
                        this.requirements.hasBackdrop.bool = true; // satisfies backdrop req
                    }
                }
            }
            else {
                // loop through scripts in sprite
                for (let script of target.scripts) {
                    if (script.blocks[0].opcode === 'event_whenthisspriteclicked') {
                        if (script.blocks.length > 4) {
                            numInteractive++;
                        }
                        // loops through individual blocks in script
                        for (let i = 0; i < script.blocks.length; i++) {
                            var opcode = script.blocks[i].opcode
                            isInteractiveAndSpeaks = opcode.includes("looks_say") || opcode.includes("looks_think")
                        }
                    }
                    // everytime there is a sprite that is interactive and speaks, increase the number of the sprites that fall under
                    // this category
                    if (isInteractiveAndSpeaks) {
                        numInteractiveAndSpeaks++;
                    }
                }
            }
        }

        // number of sprites
        if (project.sprites.length >= 1) {
            this.requirements.hasOneSprite.bool = true;
        } 
        if (project.sprites.length >= 2) {
            this.requirements.hasTwoSprites.bool = true;
        } 
        if (project.sprites.length >= 3) {
            this.requirements.hasThreeSprites.bool = true;
        }

        // number of interactive sprites
        if (numInteractive >= 1) {
            this.requirements.oneInteractive.bool = true;
        } 
        if (numInteractive >= 2) {
            this.requirements.twoInteractive.bool = true;
        } 
        if (numInteractive >= 3) {
            this.requirements.threeInteractive.bool = true;
        }

        // number of interactive and speaking sprites
        if (numInteractiveAndSpeaks >= 1) {
            this.requirements.hasOneSpeakingInteractive.bool = true;
        }
        if (numInteractiveAndSpeaks >= 2) {
            this.requirements.hasTwoSpeakingInteractive.bool = true;
        } 
        if (numInteractiveAndSpeaks >= 3) {
            this.requirements.hasThreeSpeakingInteractive.bool = true;
        }
    }
}
