const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // 7 tests here!
  it ("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(1200);
    expect(rover.position).toBe(1200);
    expect(rover.mode).toBe("NORMAL");
    expect(rover.generatorWatts).toBe(110);
  });

  it ("response returned by receiveMessage contains the name of the message", function(){
    let commands = [new Command("MOVE",1200 ),new Command("MODE_CHANGE","LOW_POWER")];
    let message = new Message("TA power",commands);
    let rover = new Rover(1300);
    let response = rover.receiveMessage(message);
    expect(response.message).toBe("TA power"); 
  });

  it ("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let commands = [new Command("MOVE",1200 ),new Command("MOVE",852)];
    let message = new Message("Exploring the north side of the moon",commands);
    let rover = new Rover(1300);
    let response = rover.receiveMessage(message);
    expect (response.results.length).toBe(commands.length); 
  });

  it ("responds correctly to the status check command", function() {
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("TA power",commands);
    let rover = new Rover(1300);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.mode).toBe("NORMAL");
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(1300);   
  });

  it ("responds correctly to the mode change command", function() {
    let commands = [new Command("MODE_CHANGE","NORMAL")];
    let message = new Message("TA power",commands);
    let rover = new Rover(1300);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBeFalsy();
    expect(rover.mode).toBe("NORMAL");
  });

  it ("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command("MODE_CHANGE","LOW_POWER"),("MOVE",1200)];
    let message = new Message("TA power",commands);
    let rover = new Rover(1300);
    let response = rover.receiveMessage(message);
    expect(response.results[1]).toBeFalsy();
    expect(rover.position).toEqual(1300);
  });

  it ("responds with the position for the move command", function() {
    let commands = [new Command("MOVE",587 ),new Command("STATUS_CHECK")];
    let message = new Message("TA power",commands);
    let rover = new Rover(1300);
    let response = rover.receiveMessage(message);
    expect (response.results[1].roverStatus.position).toEqual(587);
  });

})