import { Array4D } from '../../ndarray';
import { KernelNode } from '../tape_types';
export interface Reverse4DNode extends KernelNode {
    inputAndArgs: {
        inputs: {
            x: Array4D;
        };
        args: {
            axis: number[];
        };
    };
    output: Array4D;
    gradient: (dy: Array4D, y: Array4D) => {
        x: () => Array4D;
    };
}
