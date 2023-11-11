// class Sarya {
//     L4: number;
//     L3: number;
//     L1: number;

//     constructor(L4: number = 0, L3: number = 0, L1: number = 0) {
//         this.L4 = L4;
//         this.L3 = L3;
//         this.L1 = L1;
//     }

//     ComputeWeights(): number[] {
//         return [0.303 * this.L4, 0.170 * this.L3, 0.019 * this.L1];
//     }

//     price(): number {
//         const [W4, W3, W1] = this.ComputeWeights().map((weight) => weight / 1000.0);
//         const pricePerTon = 266000.0;
//         return W1 * (pricePerTon + 2000.0) + W3 * (pricePerTon + 2000.0) + W4 * pricePerTon;
//     }

//     add(other: Sarya): Sarya {
//         if (!(other instanceof Sarya)) {
//             throw new Error("Must be a Sarya");
//         }
//         return new Sarya(this.L4 + other.L4, this.L3 + other.L3, this.L1 + other.L1);
//     }

//     multiply(n: number): Sarya {
//         if (!Number.isInteger(n)) {
//             throw new Error("Must be an integer");
//         }
//         return new Sarya(this.L4 * n, this.L3 * n, this.L1 * n);
//     }

//     repr(): string {
//         return `Sarya(L4=${this.L4.toFixed(2)}, L3=${this.L3.toFixed(2)}, L1=${this.L1.toFixed(2)})`;
//     }
// }

// function WaterTankSteel(dim: number[] = [7.0, 7.0, 5.0], overlap: number = 1.0): Sarya {
//     const spacing: number[] = [6, 6, 8];
//     const [Length, Width, Depth] = dim;
//     const [Spacing_width, Spacing_length, Spacing_depth] = spacing.map((value) => value / 12.0);

//     const N_L = Math.ceil(Width / Spacing_width) + 1.0;
//     const N_W = Math.ceil(Length / Spacing_length) + 1.0;
//     const N_D = Math.ceil(Depth / Spacing_depth) + 1.0;

//     const L_L = 2.0 * (overlap + Depth) + Width;
//     const L_W = 2.0 * (overlap + Depth) + Length;
//     const L_D = 2.0 * (Length + overlap) + 2.0 * (Width + overlap);
//     const _L3 = L_L * N_L + L_W * N_W + L_D * N_D;

//     const _L4 = N_W * Length + N_L * Width;

//     const Total_Crossings = 2.0 * (N_L * N_D + N_W * N_D + N_L * N_W);

//     return new Sarya(_L4, _L3, Total_Crossings * 3 / 12.0);
// }

// function LentarSteel(Length: number, Width: number): Sarya {
//     const spacing: number[] = [6, 6, 8];
//     const [Spacing_width, Spacing_length] = spacing.map((value) => value / 12.0);

//     const N_alonglength = Math.ceil(Width / Spacing_width) + 1.0;
//     const N_alongwidth = Math.ceil(Length / Spacing_length) + 1.0;

//     const Total_Length = Length * N_alonglength + Width * N_alongwidth;
//     const Total_Crossings = N_alonglength * N_alongwidth;

//     return new Sarya(Total_Length, 0, Total_Crossings * 3 / 12.0);
// }

// function StairsSteel(Length: number, Width: number, Height: number): Sarya {
//     const spacing: number[] = [6, 6, 8];
//     const [Spacing_width, Spacing_length] = spacing.map((value) => value / 12.0);

//     Length = Math.sqrt(Length ** 2 + Height ** 2);

//     const N_alonglength = Math.ceil(Width / Spacing_width) + 1.0;
//     const N_alongwidth = Math.ceil(Length / Spacing_length) + 1.0;

//     const Total_Length = Length * N_alonglength + Width * N_alongwidth;
//     const Total_Crossings = N_alonglength * N_alongwidth;

//     return new Sarya(Total_Length, 0, Total_Crossings * 3 / 12.0);
// }

// function ColumnSteel(Height: number, Thickness: number): Sarya {
//     const spacing: number[] = [6, 6, 8];
//     const [, , Spacing_depth] = spacing.map((value) => value / 12.0);

//     const N = Math.ceil(Height / Spacing_depth) + 1.0;
//     const Total_Crossings = 4.0 * N;

//     return new Sarya(4.0 * Height, 4.0 * Thickness * N, Total_Crossings * 3 / 12.0);
// }

// const UGWT = WaterTankSteel([7, 7, 5]);
// const OHWT = WaterTankSteel([10, 6, 3]);
// const WaterTanks = UGWT.add(OHWT);
// console.log(WaterTanks.repr());

// const L1 = LentarSteel(13, 12);
// const L2 = LentarSteel(10, 6);
// const L3 = LentarSteel(6, 5);
// const L4 = LentarSteel(12, 5);
// const Lentars = L1.add(L2).add(L3).add(L4);
// console.log(Lentars.repr());

// const Stairs = StairsSteel(12, 3.5, 10);
// console.log(Stairs.repr());

// const C1 = ColumnSteel(12, 9 / 12).multiply(3);
// const C2 = ColumnSteel(25, 9 / 12).multiply(4);
// const Columns = C1.add(C2);
// console.log(Columns.repr());

// const Total = WaterTanks.add(Lentars).add(Stairs).add(Columns);
// console.log(Total.repr());

// const [W4s, W3s, W1s] = Total.ComputeWeights();
// console.log(`Total Weight (3/8 in.): ${Math.ceil(W3s)} [kg] = ${Math.ceil(W3s / 4) / 10} [Mn]`);
// console.log(`Total Weight (3/8 in.): ${Math.ceil(W4s)} [kg] = ${Math.ceil(W4s / 4) / 10} [Mn]`);
// console.log(`Wire Weight (1/8 in.): ${Math.ceil(W1s)} [kg]`);

// console.log(`Total Price: ${Total.price()} [PKR]`);
