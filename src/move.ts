import { Direction, Lift } from './types';

const MIN_NUM_FLOORS = 1;
const MAX_NUM_FLOORS = 4;

const moveUpAFloor = (lift: Lift): Lift => {
    const nextFloor = lift.floor + 1;
    return capAtHighestFloor({
        ...lift,
        floor: nextFloor,
    });
};

const capAtHighestFloor = (lift: Lift): Lift => {
    return lift.floor < MAX_NUM_FLOORS
        ? lift
        : {
              ...lift,
              floor: MAX_NUM_FLOORS,
              direction: 'down',
          };
};

const moveDownAFloor = (lift: Lift) => {
    const nextFloor = lift.floor - 1;
    return capAtLowestFloor({
        ...lift,
        floor: nextFloor,
    });
};

const capAtLowestFloor = (lift: Lift): Lift => {
    return lift.floor > MIN_NUM_FLOORS
        ? lift
        : {
              ...lift,
              floor: MIN_NUM_FLOORS,
              direction: 'up',
          };
};

const stayOnCurrentFloor = (lift: Lift): Lift => lift;

const move = (lift: Lift): Lift => {
    const moveInDirection = getFromMapOrElse(
        moveLiftMap,
        lift.direction,
        stayOnCurrentFloor
    );
    return moveInDirection(lift);
};

type MoveLiftFunction = (lift: Lift) => Lift;
const moveLiftMap: Record<Direction, MoveLiftFunction> = {
    up: moveUpAFloor,
    down: moveDownAFloor,
    still: stayOnCurrentFloor, 
};
function getFromMapOrElse<T, K extends keyof T>(map: T, key: K, orElse: any) {
    return map[key] ? map[key] : orElse;
}

export { moveUpAFloor, moveDownAFloor, move };
