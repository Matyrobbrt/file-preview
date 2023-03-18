export default function optional(value) {
    return {
        get: value,
        isEmpty: value === null,
        or(supplier) {
            return this.isEmpty ? optional(supplier()) : this
        }
    }
}