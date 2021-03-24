const direction = ['up', 'down'];
type Direction = typeof direction[number];

enum Floor {
    Basement = 1,
    Ground = 2,
    First = 3,
    Second = 4,
}

interface Lift {
    floor: Floor;
    dropOffRequests: DropOffRequest[];
}

interface PickUpRequest {
    floor: Floor;
    direction: Direction;
}

interface DropOffRequest {
    floor: Floor;
}

type LiftRequest = PickUpRequest | DropOffRequest;

interface FloorMonitor {
    pickUpRequests: PickUpRequest[];
}

interface State {
    lift: Lift;
    monitor: FloorMonitor;
    destinationFloor: Floor;
}

interface LiftCommand {
    direction: Direction;
    destinationFloor: Floor;
}

export {
    Direction,
    direction,
    Floor,
    Lift,
    LiftRequest,
    PickUpRequest,
    DropOffRequest,
    State,
    FloorMonitor,
    LiftCommand,
};
