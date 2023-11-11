
const WIRE_PER_JOINT = 5 / 12 // 5 inch
const WIRE_WEIGHT_PER_FEET = 0.002714286   // kg
export interface Spacing {
    x: number;
    y: number;
    z: number;
}
export interface Dimension {
    length: number;
    width: number;
    depth: number;
}

export enum SizeText {
    N_3 = '3/8"',
    N_4 = '4/8"',
}

export enum WeightPerFeet {
    N_3 = 0.170,
    N_4 = 0.303
}


export interface CalcObj {
    length: { [key: string]: number },
    weight: { [key: string]: number },
    wireWeight: number
}
const ceil = Math.ceil


export const WaterTankCalc = (
    dimension: Dimension,
    spacing: Spacing,
    ringOverlap: number = 1,
    roofOverlap: number = 1
): CalcObj => {
    const { length, width, depth } = dimension
    const sizeAlongX = ((depth + roofOverlap) * 2) + width
    const sizeAlongY = ((depth + roofOverlap) * 2) + length

    const countAlongX = ceil(length / spacing.x) + 1
    const countAlongY = ceil(width / spacing.y) + 1

    const baseTotal = (sizeAlongX * countAlongX) + (sizeAlongY * countAlongY)

    const ringsLength = ((width + length) * 2) + (ringOverlap * 4)
    const ringsCount = ceil(depth / spacing.z) + 1

    const ringTotal = ringsLength + ringsCount
    const N_3_total = ringTotal + baseTotal

    const roofX = ceil(width / spacing.y) + 1
    const roofY = ceil(length / spacing.x) + 1

    const roofTotal = roofX + roofY;


    const jointsCount = ((width / spacing.x) * (length / spacing.y) * 2) +
        ((width / spacing.x) * (depth / spacing.z) * 2) +
        ((depth / spacing.z) * (length / spacing.y) * 2)


    const wireWeight = jointsCount * WIRE_PER_JOINT * WIRE_WEIGHT_PER_FEET
    return {
        length: {
            [SizeText.N_3]: N_3_total,
            [SizeText.N_4]: roofTotal
        }, weight: {
            [SizeText.N_3]: N_3_total * WeightPerFeet.N_3,
            [SizeText.N_4]: roofTotal * WeightPerFeet.N_4
        },
        wireWeight
    }


}

console.log(WaterTankCalc({
    length: 7,
    width: 7,
    depth: 6
}, {
    x: 6, y: 6, z: 8
}, 1, 1))