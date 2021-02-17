import { moveUpAFloor, moveDownAFloor, move } from './move';
import { Floor, Lift } from './types';

describe('should move up one floor', () => {
    it('should move to First floor from G floor', () => {
        const lift: Lift = {
            floor: Floor.Ground,
            direction: 'up',
        };
        const expected: Lift = {
            floor: Floor.First,
            direction: 'up',
        };
        const actual = moveUpAFloor(lift);

        expect(actual).toEqual(expected);
    });
    it('should change direction after reaching the top floor', () => {
        const lift: Lift = {
            floor: Floor.First,
            direction: 'up',
        };
        const expected: Lift = {
            floor: Floor.Second,
            direction: 'down',
        };
        const actual = moveUpAFloor(lift);

        expect(actual).toEqual(expected);
    });
});

describe('should move down one floor', () => {
    it('should move to First floor from Second floor', () => {
        const lift: Lift = {
            floor: Floor.Second,
            direction: 'down',
        };
        const expected: Lift = {
            floor: Floor.First,
            direction: 'down',
        };
        const actual = moveDownAFloor(lift);

        expect(actual).toEqual(expected);
    });
    it('should change direction after reaching the bottom floor', () => {
        const lift: Lift = {
            floor: Floor.Ground,
            direction: 'down',
        };
        const expected: Lift = {
            floor: Floor.Basement,
            direction: 'up',
        };
        const actual = moveDownAFloor(lift);

        expect(actual).toEqual(expected);
    });
});

describe('should move in the correct direction', () => {
    it('should move up a floor when the direction is up', () => {
        const lift: Lift = {
            floor: Floor.Ground,
            direction: 'up',
        };
        const expected: Lift = {
            floor: Floor.First,
            direction: 'up',
        };
        const actual = move(lift);

        expect(actual).toEqual(expected);
    });
    it('should move down a floor when the direction is down', () => {
        const lift: Lift = {
            floor: Floor.First,
            direction: 'down',
        };
        const expected: Lift = {
            floor: Floor.Ground,
            direction: 'down',
        };
        const actual = move(lift);

        expect(actual).toEqual(expected);
    });
});
