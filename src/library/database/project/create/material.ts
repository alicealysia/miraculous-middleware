import {Pool} from 'promise-mysql'
import {Material} from '../../../../types'

export default async(connection: Pool, material: Material) => connection.query('call create_material(?, ?, ?)', [material.materialName, material.cost, material.serialCode]).then(value => value[0][0].id);
