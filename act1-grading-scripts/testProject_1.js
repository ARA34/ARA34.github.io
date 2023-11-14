/* 
testProject_1.js Autograder
Initial Version and testing: Saranya Turimella
*/

require('../grading-scripts-s3/scratch3')

module.exports = class {
    constructor() {
        this.requirements = {};
        this.extensions = {};
    }

    initReqs() {
        this.requirements.julianSaysHaveFun = { bool: false, str: 'Julian the cat says "Have fun!"' };
    }


    grade(fileObj, user) {
        var project = new Project(fileObj, null);
        this.initReqs();

        if (!is(fileObj)) return;

        let haveFunJulian = false;

        let requiredSteps = 150;

        for (let target of project.targets) {
            if (target.isStage) { continue; }
            else {
                // looks in sprite names Julian for a say block, move block
                if (target.name === 'Julian') {
                    for (let script of target.scripts) {
                        for (let block of script.allBlocks()) {
                            if ((block.opcode === 'looks_sayforsecs')) {
                                let dialogue = (block.textInput('MESSAGE')).toLowerCase();
                                let punctuationless = dialogue.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
                                let finalString = punctuationless.replace(/\s{2,}/g, " ");
                                finalString = finalString.replace(/\s+/g, '');
                                if (finalString === 'havefun') {
                                    haveFunJulian = true; 
                                }
                            }

                            if (block.opcode === 'motion_movesteps') {
                                numMoveJulian++;
                                distanceMoveJulian += block.floatInput('STEPS');
                            }
                        }
                    }
                    // if a move block is added, the boolean of julian moving is set to true
                    if (distanceMoveJulian > requiredSteps) {
                        julianMoves = true;
                    }
                }

                // deals with the cases if the sprite names are changed from julian and helen
                else {
                    for (let script of target.scripts)
                    {
                        for (let block of script.allBlocks()) {
                            if ((block.opcode === 'looks_sayforsecs')) {
                                let dialogue1 = block.textInput('MESSAGE').toLowerCase()
                                let punctuationless1 = dialogue1.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
                                let finalString1 = punctuationless1.replace(/\s{2,}/g, " ");
                                finalString1 = finalString1.replace(/\s+/g, '');
                                // checks that have fun is said
                                if (finalString1 === 'havefun') {
                                    haveFunMisc = true;
                                }
                            }

                            // motion block is used
                            if (block.opcode === 'motion_movesteps') {
                                distanceMoveMisc += block.floatInput('STEPS');
                            }

                            // speed at which the sprite changes costumes is changed
                            if (block.opcode === 'control_repeat') {
                                let subscript = block.subscripts[0];
                                for (let block of subscript.blocks) {
                                    if (block.opcode === 'control_wait') {
                                        if (block.floatInput('DURATION') < 1) {
                                            miscSpeed = true;
                                        }
                                    }
                                }
                            }

                            // Guide instructs students to add a next costume block
                            if (block.opcode === 'looks_nextcostume') {
                                miscColor = true;
                            }
                        }

                    }
                }
                if (distanceMoveMisc > requiredSteps) {
                    miscMoves = true;
                }
            }
        }
        // for all requirements, if the specific sprite does it or ANY sprite does it, the requirement is set to true
        if (haveFunJulian || haveFunMisc) {
            this.requirements.julianSaysHaveFun.bool = true;
        }

        if (julianMoves || miscMoves) {
            this.requirements.julianMoves.bool = true;
        }
    }
}