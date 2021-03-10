import {User, Resource, Action} from '../../types'
import accessManager from './access-manager'
import filterOwned from './filter-owned'

class accessControl {
    private _user: User;
    constructor (user: User) {
        this._user = user;
    }
    public create (resource: Resource) {
        if (resource === (Resource.client || Resource.material || Resource.project || Resource.skill)) {
            return accessManager(this._user, Action.create, resource);
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

class idInit {
    private _user: User;
    private _action: Action;
    private _resource: Resource;

    constructor(user: User, action: Action, resource: Resource) {
        this._user = user;
        this._action = action;
        this._resource = resource;
    }

    public id (_id: number) {
        return accessManager(this._user, this._action, this._resource, _id);
    }

    public list(_id: number) {
        return accessManager(this._user, this._action, this._resource, _id, true);
    }
}