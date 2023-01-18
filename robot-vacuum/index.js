// Room class - initiates a room object
// size property
// return multidimensional array based on the size
// map of all the vacuums
// x -number of vacuums
// collision dection here
// move vacuumX forward. -> collision 
// hash map; array;

//keep of each vacuums location
//find vacuum x and move it
//


//Vacuum - initiates a cleaner
// N,S,W, E - direction it's facing
// rotateLeft - rotate it left
// rotateRight - rotate it right
// location property - cordinates in the room
// moveForward - move it 1 cell, update the location



//main
//initiate vacuum with a location, (0,0)
//initiate room with size
//pass instuctions string
//depending the instruction will call vacuum functions
//return the final state - location, direction

class Room {
    constructor(x,y) {
        this.roomSize = {x,y};
    }

}

class Vacuum {
    constructor(x,y,d) {
        this.location = {x,y};
        this.direction = d;
        
    }
    
     rotateLeft() {
        const currentDirection = this.direction;
        if(currentDirection == 'N'){
            return this.direction = 'E'
        }
        if(currentDirection == 'S'){
            return this.direction = 'W'
        }
        if(currentDirection == 'E'){
            return this.direction = 'S'
        }
        if(currentDirection == 'W'){
            return this.direction = 'N'
        }       
    }
     rotateRight() {
        const currentDirection = this.direction;
        if(currentDirection == 'N'){
            return this.direction = 'W'
        }
        if(currentDirection == 'S'){
            return this.direction = 'E'
        }
        if(currentDirection == 'E'){
            return this.direction = 'N'
        }
        if(currentDirection == 'W'){
            return this.direction = 'S'
        }       
    }
     moveForward() {
        const currentDirection = this.direction;
        let {x,y} = this.location;
        if(currentDirection == 'N'){
            y += 1;
            return this.location = {x,y};
        }
        if(currentDirection == 'S'){
            if(y == 0) {
                return this.location = {x,y};
            }
            y -= 1;
            return this.location = {x,y};
        }
        if(currentDirection == 'E'){
            if(x == 0) {
                return this.location = {x,y};
            }
            x += 1;
            return this.location = {x,y};
        }
        if(currentDirection == 'W'){
            x -= 1;
            return this.location = {x,y};
        }       

    }

}

function main(instructionSet, roomSize = {x:6,y:6}, vacuumLocation = {x:0,y:0}, vacuumDirection = 'N') {

    let instructionArray = instructionSet.split(",");


    let vacuum = new Vacuum(vacuumLocation.x,vacuumLocation.y,vacuumDirection);
    let room = new Room(roomSize.x, roomSize.y);
    
    for(let i = 0; i < instructionArray.length; i++) {
        const instruction = instructionArray[i];
        
        if(instruction == 'L') {
            vacuum.rotateLeft();
        } else if(instruction == 'R') {
            vacuum.rotateRight();
        } else if(instruction == 'M') {
            //based on the room size
            //determine if we move forward
            let vLocation = vacuum.location;
            let vacuumDirection = vacuum.direction;
            let rSize = room.roomSize;

            if(vLocation.x == rSize.y &&  vacuumDirection == 'W') {
                break;
            }
            if(vLocation.y == rSize.y &&  vacuumDirection == 'N') {
                break;
            }
            
            vacuum.moveForward();
        }
        
    };

    
    console.log("finalState", vacuum.location.x,vacuum.location.y, vacuum.direction);



}

main( "L, M, L, M, L, M, L, M, M", {x:6,y:6}, {x:1,y:2},'N');