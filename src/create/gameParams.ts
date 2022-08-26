export type GameParamType = {
  name: string;
  value: number | null;
  label: string;
  valid: boolean;
  update: (input: string) => void;
  helper: string;
};

export const CLASSIC_PARAMS: GameParamType[] = [
  {
    name: "n",
    value: null,
    label: "Number of holes",
    helper: "Must be an integer between 1 and 4",
    valid: false,
    update(input) {
      this.value = Number(input);
      this.valid =
        Number.isInteger(this.value) && 1 <= this.value && this.value <= 4;
    },
  },
  {
    name: "c",
    value: null,
    label: "Number of colors",
    helper: "Must be an integer between 1 and 6",
    valid: false,
    update(input) {
      this.value = Number(input);
      this.valid =
        Number.isInteger(this.value) && 1 <= this.value && this.value <= 6;
    },
  },
];
