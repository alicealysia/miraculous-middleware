import {getPool} from '../../pool'
import {Material} from '../../../../types'

export default async(id: number, cost: number) => getPool().then(
    pool => pool.query('call create_material(?, ?)', [id, cost]
).then(
    value => value[0][0].id
));