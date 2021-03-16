import fetch from 'node-fetch'
import { ResponseType } from '@microsoft/microsoft-graph-client'
import {getClient} from './index'


export default async (token: string, path?: string) => {
    const _path = path? `/sites/root/drive/items/${path}/children` : `/sites/root/drive/root/children`;
        return getClient(token).api(_path).version('v1.0').responseType(ResponseType.JSON).get().then(res =>
        res.value.map((folder: any) => ({
            name: folder.name,
            path: `${folder.id}`,
            type: folder.folder? 'folder' : 'file'
        })
    ))
};
