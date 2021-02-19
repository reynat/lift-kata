import { Direction, Lift, MoveLiftFunction } from './types';

export const MIN_NUM_FLOORS = 1;
export const MAX_NUM_FLOORS = 4;

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
          };
};

const stayOnCurrentFloor = (lift: Lift): Lift => lift;

const move = (lift: Lift, direction: Direction): Lift => {
    const moveInDirection = getFromMapOrElse(
        moveLiftMap,
        direction,
        stayOnCurrentFloor
    );
    return moveInDirection(lift);
};

const moveLiftMap: Record<Direction, MoveLiftFunction> = {
    up: moveUpAFloor,
    down: moveDownAFloor,
    none: stayOnCurrentFloor,
};
function getFromMapOrElse<T, K extends keyof T>(map: T, key: K, orElse: any) {
    return map[key] ? map[key] : orElse;
}

export { moveUpAFloor, moveDownAFloor, move };
