import { decideNextMove, execute } from "./controller";
import { generateRequests } from './generate-requests';
import { sendRequests } from './send-requests';
import { Floor, FloorMonitor, State } from "./types";

const createInitialState = (): State => {
    const lift = {
        floor: Floor.Basement,
        dropOffRequests: []
    };
    const monitor: FloorMonitor = {
        pickUpRequests: []
    }
    const destinationFloor: Floor = Floor.Basement
    return {
        lift,
        monitor,
        destinationFloor
    }
}

const NUM_ROUNDS = 5

let initialState: State = createInitialState();
console.log({initialState});
let i = 0;

while (i < NUM_ROUNDS) {
    // Generate random requests
    const newRequests = generateRequests();
    const nextState = sendRequests(newRequests, initialState);

    console.log("New requests: ", JSON.stringify(newRequests, null, 2));

    const nextDirection = decideNextMove(nextState);

    console.log("Next lift command: ", JSON.stringify(nextDirection, null, 2));

    const newState = execute(nextState, nextDirection);
    
    initialState = newState;

    i++;

    console.log('New state ', i);
    console.log(JSON.stringify(newState, null, 2));
}


