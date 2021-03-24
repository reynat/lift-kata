import { MIN_NUM_FLOORS, MAX_NUM_FLOORS } from "./move"
import { DropOffRequest, PickUpRequest, LiftRequest, Floor, Direction, direction, FloorMonitor, Lift, State } from "./types"

const MIN_DROPOFF_REQUESTS = 0;
const MAX_DROPOFF_REQUESTS = 1;
const MIN_PICKUP_REQUESTS = 0;
const MAX_PICKUP_REQUESTS = 1;

const generateRequests = (): LiftRequest[] => {
    return [...generateDropOffRequests(), ...generatePickupRequests()]
}

const generateDropOffRequests = (): DropOffRequest[] => {
    const numRequests = Math.floor(Math.random() * (MAX_DROPOFF_REQUESTS - MIN_DROPOFF_REQUESTS + 1) + MIN_DROPOFF_REQUESTS);
    return Array.from(Array(numRequests), () => ({floor: generateRandomFloor(MIN_NUM_FLOORS, MAX_NUM_FLOORS)}))
}

const generatePickupRequests = (): PickUpRequest[] => {
    const numRequests = Math.floor(Math.random() * (MAX_PICKUP_REQUESTS - MIN_PICKUP_REQUESTS + 1) + MIN_PICKUP_REQUESTS)
    return Array.from(
            Array(numRequests), 
            () => ({
                floor: generateRandomFloor(MIN_NUM_FLOORS, MAX_NUM_FLOORS),
                direction: generateRandomDirection()
            }))
}

const generateRandomFloor = (
    lowestFloor: number,
    highestFloor: number
): Floor =>
    Math.floor(Math.random() * (highestFloor - lowestFloor + 1)) + lowestFloor;

const generateRandomDirection = (): Direction => {
    const index = Math.floor(Math.random() * direction.length);
    return direction[index];
}

export { generateRequests }