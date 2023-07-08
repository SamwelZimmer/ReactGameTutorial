export class Inventory {
    constructor() {
        this.inventoryMap = new Map();
    }

    has(key) {
        return Boolean(this.inventoryMap.has(key));
    }

    add(key) {
        if (!key) {
            console.warn("Warning: Trying to add false key to inventory", key);
            return;
        }
        this.inventoryMap.set(key, true);
        console.log(this.inventoryMap)
    }
}