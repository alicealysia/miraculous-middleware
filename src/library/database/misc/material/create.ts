import {getPool} from '../../pool'
import {InsertMaterial} from '../../../../types'

export default async(material: InsertMaterial) => getPool().then(
    pool => pool.query('call create_material(?, ?, ?)', [material.materialName, material.cost, material.serialCode]
).then(
    value => value[0][0].id
));