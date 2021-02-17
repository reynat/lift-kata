type Direction = 'up' | 'down' | 'still';

enum Floor {
    Basement = 1,
    Ground = 2,
    First = 3,
    Second = 4,
}

interface Lift {
    floor: Floor;
    direction: Direction;
    queue?: Floor[];
}

export { Direction, Floor, Lift };
