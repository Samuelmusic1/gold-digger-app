import { EventEmitter } from "node:events"
import { createAlert } from "../utils/createAlert.js"

export const emailNotisEmitter = new EventEmitter()

emailNotisEmitter.on('email sent/added', createAlert)