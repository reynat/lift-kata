import { decideNextMove, execute } from "./controller";
import { generateDropOffRequests, sendDropOffRequests, updateFloorMonitor } from "./floorMonitor";
import { Floor, FloorMonitor, State } from "./types";

const createInitialState = (): State => {
    const lift = {
        floor: Floor.Basement
    };
    const monitor: FloorMonitor = {
        dropOff: []
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
    const newDropOffRequests = generateDropOffRequests();
    const newFloorMonitor = sendDropOffRequests(newDropOffRequests, initialState.monitor);
    const nextState = updateFloorMonitor(initialState, newFloorMonitor);

    console.log("New requests: ", JSON.stringify(nextState));

    const nextDirection = decideNextMove(nextState);

    console.log("Next direction: ", JSON.stringify(nextDirection));

    const newState = execute(nextState, nextDirection);
    
    initialState = newState;

    i++;

    console.log('New state ', i);
    console.log(JSON.stringify(newState));
}


