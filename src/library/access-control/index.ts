import {User, Resource, Action} from '../../types'
import {Permission} from 'accesscontrol'
import accessManager from './access-manager'
import filterOwned from './filter-owned'

type instantReturn = Resource.client | Resource.project | Resource.skill | Resource.material;
type idReturn = Resource.assignMaterial | Resource.assignment | Resource.closure | Resource.contract  | Resource.otAssessment | Resource.project | Resource.referral | Resource.task | Resource.user;

class accessControl {
    private _user: User;
    constructor (user: User) {
        this._user = user;
    }
    public create(resource: instantReturn) : Promise<(data:any) => any>;
    public create(resource: idReturn) : idInit;
    public create (resource: instantReturn | idReturn){
        if (resource === Resource.client || Resource.project || Resource.skill || Resource.material) {
            return accessManager(this._user, Action.create, resource).then(permissions => permissions.filter);
        }
        return new idInit(this._user, Action.create, resource);
    }
    public read (resource: Resource) {
        return new idInit(this._user, Action.read, resource);
    }
    public update (resource: Resource) {
        return new idInit(this._user, Action.update, resource);
    }
    public del (resource: Resource) {
        return new idInit(this._user, Action.delete, resource);
    }
    public filterToOwned(resource: any) {
        return filterOwned(this._user, resource);
    }
}

export class idInit {
    private _user: User;
    private _action: Action;
    private _resource: Resource;

    constructor(user: User, action: Action, resource: Resource) {
        this._user = user;
        this._action = action;
        this._resource = resource;
    }

    public id (_id: number) {
        return accessManager(this._user, this._action, this._resource, _id).then(permissions => permissions.filter);
    }

    public list(_id: number) {
        return accessManager(this._user, this._action, this._resource, _id, true);
    }
}

export default accessControl;