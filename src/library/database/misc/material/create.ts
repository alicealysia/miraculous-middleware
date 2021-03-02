import {getPool} from '../../pool'
import {Material} from '../../../../types'

export default async(material: Material) => getPool().then(
    pool => pool.query('call create_material(?, ?, ?)', [material.materialName, material.cost, material.serialCode]
).then(
    value => value[0][0].id
));