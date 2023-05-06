export const containsProperty = (obj: object, propertyName: string): boolean => {
  return Object.prototype.hasOwnProperty.call(obj, propertyName)
}

export const containsMethod = (obj: object, methodName: string): boolean => {
  return (
    Object.prototype.hasOwnProperty.call(obj, methodName) &&
    typeof obj[methodName] === "function"
  )
}
export const defined = (variable: any): boolean => {
  return variable !== undefined && variable !== null
}

export const equalsBetween = (a: any, b: any): boolean => {
  return !!a && !!a.equals && typeof a.equals === "function" ? !!a.equals(b) : a === b
}
