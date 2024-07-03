//Madlibs Test
require('./scratch3');

// identifty a varibale and print out its value

module.exports = class{
    constructor() {
        this.requirements = {};
        this.extensions = {};
    }
    initReqs() {
        this.requirements.hasVar = {bool: false, str: "I had the given variable"};
    }

    grade(fileObj, user) {
        var project = new Project(fileObj, null);
        this.initReqs();
        if (!is(fileObj)) return;
        console.log("targets: ", project.targets);
        return;
    }
}