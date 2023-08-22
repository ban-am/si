import type { DataModel } from "$lib";
import { writable } from "svelte/store";

export const dataHash: string = "U2FsdGVkX1/lsEyqjjipjZ2aJQM2jBJygOD+H646qfPr4jH4i2L3NApX7OXLnJe5ud+n+TV3HD7W4tQvZsXxN1Hte1bFn2bVxo8RE4iMpWqL0InGEZtjJxQOAMtDF6MyhA7w64XRPoBXHl07sPzO3n949Z6kFAgrGy4YViI5UM9no1acUYVvELN/Lr75A0JEOsQztDmv/WPO6LPWYXdi3Q==";

export const dataModel = writable<DataModel | undefined>();
