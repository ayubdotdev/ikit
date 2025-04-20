import {Connection} from "mongoose"

declare global {
    var mongoose:{
        conn: Connection | null
        promise:Promise<Connection> | null
    }
}
export{} // this is to make sure that this file is treated as a module