class Rover {
   constructor(position) {
      this.position = position;
      this.mode ="NORMAL";
      this.generatorWatts = 110;
   }

   receiveMessage = (message) => { //this parameter is an object with name and commands propert(array of Command objects)
      let returningObj = {
         message: message.name,//it was name: message.name.Changed to message:message.name to try to pass test 14
         results: [], 
      }
      for (let i = 0; i < message.commands.length; i++) {
         if (message.commands[i].commandType === "MOVE"){
            if (this.mode === "NORMAL") {
               this.position = message.commands[i].value;
               returningObj.results.push({completed: true});

            } else {
               returningObj.results.push({completed: false});          
            }     
         }
         if (message.commands[i].commandType === "STATUS_CHECK") {
            returningObj.results.push({completed: true,
                                       roverStatus:{mode: this.mode,
                                                    generatorWatts: this.generatorWatts,
                                                    position: this.position}});
         }

         if (message.commands[i].commandType === "MODE_CHANGE"){
            if (message.commands[i].value === this.mode) {
               returningObj.results.push({completed: false});
            } else {                                             //else is part of test #12
               this.mode = message.commands[i].value;            //
               returningObj.results.push({completed: true});     //
            }         
         }
      }
     
      return returningObj;{}
   }
}

module.exports = Rover;


