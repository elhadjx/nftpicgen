class CreationCounter {

    constructor(maxsArray) {
        this.max = maxsArray;
        this.current = new Array(maxsArray.length).fill(0);
    }

    increment() {
        for (let ArrayPointer = (this.current.length - 1); ArrayPointer >= 0; ArrayPointer--) {
            if (this.current[ArrayPointer] < this.max[ArrayPointer]) {
                this.current[ArrayPointer]++;
                return;
            } else {
                this.current[ArrayPointer] = 0;
            }
        }
    }
}

module.exports = CreationCounter