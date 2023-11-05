import { HttpResponse } from './HttpResponse'

export interface Controller<T = any, Y = any> {
  handle: (request: T) => Promise<HttpResponse>
}
