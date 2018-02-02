import { BackendType } from '../environment';
import * as array_ops from './array_ops';
import { MathBackend } from './backends/backend';
import { BackendEngine } from './backends/backend_engine';
import { TapeNodeInputGradientArrays } from './backends/tape_types';
import { ScopeFn, ScopeResult, ScopeResultImmediate } from './backends/tape_util';
import * as batchnorm from './batchnorm';
import * as binary_ops from './binary_ops';
import * as compare from './compare';
import * as concat from './concat';
import * as conv from './conv';
import * as image_ops from './image_ops';
import * as logical from './logical_ops';
import * as lstm_ops from './lstm';
import * as matmul from './matmul';
import { Array1D, Array3D, Array4D, NDArray, Scalar, Variable } from './ndarray';
import * as norm from './norm';
import * as pool from './pool';
import * as reduction_ops from './reduction_ops';
import * as reverse from './reverse';
import * as slice from './slice';
import * as softmax_ops from './softmax';
import * as transpose from './transpose';
import { NamedArrayMap, NamedVariableMap } from './types';
import { Rank, TypedArray } from './types';
import * as unary_ops from './unary_ops';
export interface NDArrayManager {
    getNumArrays(): number;
    register(a: NDArray): void;
    registerVariable(v: Variable): void;
}
export declare class NDArrayMath implements NDArrayManager {
    engine: BackendEngine;
    private registeredArrays;
    private backend;
    private customBackend;
    matMul: typeof matmul.Ops.matMul;
    vectorTimesMatrix: typeof matmul.Ops.vectorTimesMatrix;
    outerProduct: typeof matmul.Ops.outerProduct;
    matrixTimesVector: typeof matmul.Ops.matrixTimesVector;
    dotProduct: typeof matmul.Ops.dotProduct;
    slice: typeof slice.Ops.slice;
    slice1D: typeof slice.Ops.slice1D;
    slice2D: typeof slice.Ops.slice2D;
    slice3D: typeof slice.Ops.slice3D;
    slice4D: typeof slice.Ops.slice4D;
    reverse: typeof reverse.Ops.reverse;
    reverse1D: typeof reverse.Ops.reverse1D;
    reverse2D: typeof reverse.Ops.reverse2D;
    reverse3D: typeof reverse.Ops.reverse3D;
    reverse4D: typeof reverse.Ops.reverse4D;
    concat: typeof concat.Ops.concat;
    concat1D: typeof concat.Ops.concat1D;
    concat2D: typeof concat.Ops.concat2D;
    concat3D: typeof concat.Ops.concat3D;
    concat4D: typeof concat.Ops.concat4D;
    batchNormalization: typeof batchnorm.Ops.batchNormalization;
    batchNormalization2D: typeof batchnorm.Ops.batchNormalization2D;
    batchNormalization3D: typeof batchnorm.Ops.batchNormalization3D;
    batchNormalization4D: typeof batchnorm.Ops.batchNormalization4D;
    avgPool: typeof pool.Ops.avgPool;
    maxPool: typeof pool.Ops.maxPool;
    minPool: typeof pool.Ops.minPool;
    maxPoolBackprop: typeof pool.Ops.maxPoolBackprop;
    conv1d: typeof conv.Ops.conv1d;
    conv2d: typeof conv.Ops.conv2d;
    conv2dTranspose: typeof conv.Ops.conv2dTranspose;
    depthwiseConv2D: typeof conv.Ops.depthwiseConv2D;
    conv2dDerBias: typeof conv.Ops.conv2dDerBias;
    conv2dDerFilter: typeof conv.Ops.conv2dDerFilter;
    conv2dDerInput: typeof conv.Ops.conv2dDerInput;
    argMax: typeof reduction_ops.Ops.argMax;
    argMaxEquals: typeof reduction_ops.Ops.argMaxEquals;
    argMin: typeof reduction_ops.Ops.argMin;
    logSumExp: typeof reduction_ops.Ops.logSumExp;
    max: typeof reduction_ops.Ops.max;
    mean: typeof reduction_ops.Ops.mean;
    min: typeof reduction_ops.Ops.min;
    moments: typeof reduction_ops.Ops.moments;
    sum: typeof reduction_ops.Ops.sum;
    add: typeof binary_ops.Ops.add;
    addStrict: typeof binary_ops.Ops.addStrict;
    arrayDividedByScalar: typeof binary_ops.Ops.arrayDividedByScalar;
    div: typeof binary_ops.Ops.div;
    divide: typeof binary_ops.Ops.div;
    divStrict: typeof binary_ops.Ops.divStrict;
    divideStrict: typeof binary_ops.Ops.divStrict;
    elementWiseMul: typeof binary_ops.Ops.elementWiseMul;
    maximum: typeof binary_ops.Ops.maximum;
    maximumStrict: typeof binary_ops.Ops.maximumStrict;
    minimum: typeof binary_ops.Ops.minimum;
    minimumStrict: typeof binary_ops.Ops.minimumStrict;
    mul: typeof binary_ops.Ops.mul;
    multiply: typeof binary_ops.Ops.mul;
    mulStrict: typeof binary_ops.Ops.mulStrict;
    multiplyStrict: typeof binary_ops.Ops.mulStrict;
    pow: typeof binary_ops.Ops.pow;
    powStrict: typeof binary_ops.Ops.powStrict;
    scalarDividedByArray: typeof binary_ops.Ops.scalarDividedByArray;
    sub: typeof binary_ops.Ops.sub;
    subtract: typeof binary_ops.Ops.sub;
    subStrict: typeof binary_ops.Ops.subStrict;
    logicalAnd: typeof logical.Ops.logicalAnd;
    logicalOr: typeof logical.Ops.logicalOr;
    where: typeof logical.Ops.where;
    transpose: typeof transpose.Ops.transpose;
    equal: typeof compare.Ops.equal;
    equalStrict: typeof compare.Ops.equalStrict;
    greater: typeof compare.Ops.greater;
    greaterStrict: typeof compare.Ops.greaterStrict;
    greaterEqual: typeof compare.Ops.greaterEqual;
    greaterEqualStrict: typeof compare.Ops.greaterEqualStrict;
    less: typeof compare.Ops.less;
    lessStrict: typeof compare.Ops.lessStrict;
    lessEqual: typeof compare.Ops.lessEqual;
    lessEqualStrict: typeof compare.Ops.lessEqualStrict;
    notEqual: typeof compare.Ops.notEqual;
    notEqualStrict: typeof compare.Ops.notEqualStrict;
    abs: typeof unary_ops.Ops.abs;
    acos: typeof unary_ops.Ops.acos;
    asin: typeof unary_ops.Ops.asin;
    atan: typeof unary_ops.Ops.atan;
    ceil: typeof unary_ops.Ops.ceil;
    clip: typeof unary_ops.Ops.clip;
    cos: typeof unary_ops.Ops.cos;
    cosh: typeof unary_ops.Ops.cosh;
    elu: typeof unary_ops.Ops.elu;
    exp: typeof unary_ops.Ops.exp;
    floor: typeof unary_ops.Ops.floor;
    leakyRelu: typeof unary_ops.Ops.leakyRelu;
    log: typeof unary_ops.Ops.log;
    neg: typeof unary_ops.Ops.neg;
    prelu: typeof unary_ops.Ops.prelu;
    relu: typeof unary_ops.Ops.relu;
    selu: typeof unary_ops.Ops.selu;
    sigmoid: typeof unary_ops.Ops.sigmoid;
    sin: typeof unary_ops.Ops.sin;
    sinh: typeof unary_ops.Ops.sinh;
    sqrt: typeof unary_ops.Ops.sqrt;
    square: typeof unary_ops.Ops.square;
    step: typeof unary_ops.Ops.step;
    tan: typeof unary_ops.Ops.tan;
    tanh: typeof unary_ops.Ops.tanh;
    norm: typeof norm.Ops.norm;
    basicLSTMCell: typeof lstm_ops.Ops.basicLSTMCell;
    multiRNNCell: typeof lstm_ops.Ops.multiRNNCell;
    softmax: typeof softmax_ops.Ops.softmax;
    softmaxCrossEntropy: typeof softmax_ops.Ops.softmaxCrossEntropy;
    cast: typeof array_ops.Ops.cast;
    clone: typeof array_ops.Ops.clone;
    gather: typeof array_ops.Ops.gather;
    reshape: typeof array_ops.Ops.reshape;
    tile: typeof array_ops.Ops.tile;
    oneHot: typeof array_ops.Ops.oneHot;
    multinomial: typeof array_ops.Ops.multinomial;
    pad1D: typeof array_ops.Ops.pad1D;
    pad2D: typeof array_ops.Ops.pad2D;
    resizeBilinear3D: typeof image_ops.Ops.resizeBilinear;
    registeredVariables: NamedVariableMap;
    time(query: () => NDArray): Promise<number>;
    getNumArrays(): number;
    register(a: NDArray | Variable): void;
    registerVariable(v: Variable): void;
    fromPixels(pixels: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, numChannels: number): Array3D;
    write(dataId: number, values: TypedArray): void;
    readSync(dataId: number): TypedArray;
    read(dataId: number): Promise<TypedArray>;
    constructor(backend: BackendType | MathBackend, safeMode: boolean);
    enableDebugMode(): void;
    scope<T extends ScopeResult>(nameOrScopeFn: string | ScopeFn<T>, scopeFn?: ScopeFn<T>, gradientsMode?: boolean): T;
    gradientsScope<T extends ScopeResult>(nameOrScopeFn: string | ScopeFn<T>, scopeFn?: ScopeFn<T>): T;
    startScope(): void;
    endScope(result: ScopeResultImmediate): void;
    keep<T extends NDArray>(result: T): T;
    track<T extends NDArray>(result: T): T;
    dispose(): void;
    topK(x: NDArray, k: number): {
        values: Array1D;
        indices: Array1D;
    };
    switchDim<R extends Rank>(x: NDArray<R>, perm?: number[]): NDArray<R>;
    scalarPlusArray<T extends NDArray>(c: Scalar, a: T): T;
    scalarMinusArray<T extends NDArray>(c: Scalar, a: T): T;
    arrayMinusScalar<T extends NDArray>(a: T, c: Scalar): T;
    scaledArrayAdd<T extends NDArray>(c1: Scalar, a: T, c2: Scalar, b: T): T;
    scalarTimesArray<T extends NDArray>(c: Scalar, a: T): T;
    localResponseNormalization3D(x: Array3D, radius?: number, bias?: number, alpha?: number, beta?: number, normRegion?: 'acrossChannels' | 'withinChannel'): Array3D;
    localResponseNormalization4D(x: Array4D, radius?: number, bias?: number, alpha?: number, beta?: number, normRegion?: 'acrossChannels' | 'withinChannel'): Array4D;
    vjp<T extends NDArray | NamedArrayMap, R extends Rank>(f: () => NDArray<R>, x: T, dy: NDArray<R>): T;
    gradients<T extends NDArray | NamedArrayMap>(f: () => Scalar, x: T): T;
    variableGradients(f: () => Scalar, varList?: Variable[]): {
        value: Scalar;
        gradients: NamedArrayMap;
    };
    valueAndGradients<T extends NDArray | NamedArrayMap>(f: () => Scalar, x: T): {
        value: Scalar;
        gradients: T;
    };
    customGradient<R extends Rank, T extends NDArray<R>>(name: string, f: () => {
        value: T;
        gradients: (dy: T, y: T) => TapeNodeInputGradientArrays;
    }, inputs: NamedArrayMap): T;
    disposeData(dataId: number): void;
}
