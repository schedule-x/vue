export class ReactivityError extends Error {
  constructor(message: string) {
    super(message)
    this.name = '[Schedule-X reactivity error]'
  }
}
