export interface AbstractType<T> {
  name: string
  new?(...args: any[]): T
}

export interface ClassType<T> extends AbstractType<T> {
  name: string
  new (...args: any[]): T
}
