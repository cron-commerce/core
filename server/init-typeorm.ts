import 'reflect-metadata'

import {createConnection} from 'typeorm'

export default () => createConnection().catch(e => console.error(e))
