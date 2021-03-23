import {User, Resource, Action, createAnyRequired, createOwnId, readList, cantReadList, resolveReadList} from '../../types'
import {Permission} from 'accesscontrol'
import accessManager from './access-manager'
import filterOwned from './filter-owned'



class accessControl {

    private _user: User;

    // sets user variable via constructor
    constructor (user: User) {
        this._user = user;
    }

    // create overloads, narrows return function (promise vs class)
    public async create(resource: createAnyRequired) : Promise<(data:any) => any>;
    public create(resource: createOwnId) : idInit<createOwnId>;

    //logic satisfies overloads and returns values
    public create (resource: createAnyRequired | createOwnId){
        if (resource === Resource.client || Resource.project || Resource.skill || Resource.material) {
            return accessManager(this._user, Action.create, resource).then(permissions => permissions.filter);
        }
        return new idInit(this._user, Action.create, resource);
    }

    // read overloads, narrows return function (with read.list vs without)
    public read (resource: readList): idInitWithList<readList>;
    public read (resource: cantReadList): idInit<cantReadList>;

    // satisfies overloads and returns values
    public read (resource: readList | cantReadList) {
        if (resource === Resource.assignMaterial || Resource.contract || Resource.material || Resource.otAssessment || Resource.skill) {
            return new idInit(this._user, Action.read, resource);
        }
        return new idInitWithList(this._user, Action.read, resource as readList);
    }

    // update always leverages an id, as does delete
    public update (resource: Resource) {
        return new idInit(this._user, Action.update, resource);
    }
    public del (resource: Resource) {
        return new idInit(this._user, Action.delete, resource);
    }
}


//simple class to return access manager after id is set
class idInit <T extends Resource> {
    private _user: User;
    private _action: Action;
    private _resource: T;

    constructor(user: User, action: Action, resource: T) {
        this._user = user;
        this._action = action;
        this._resource = resource;
    }

    public async id (_id: number) {
        return accessManager(this._user, this._action, this._resource, _id).then(permissions => permissions.filter);
    }
}

//acts like idinit, but also has a list function, this takes an array of the appropriate resource, and filters it to owned resources.
class idInitWithList <T extends readList> {
    private _user: User;
    private _action: Action;
    private _resource: T;

    constructor(user: User, action: Action, resource: T) {
        this._user = user;
        this._action = action;
        this._resource = resource;
    }

    public async id (_id: number) {
        return accessManager(this._user, this._action, this._resource, _id).then(permissions => permissions.filter);
    }
    public list(resource: resolveReadList[T]) {
        return filterOwned(this._user, this._resource, resource);
    }
}

export default accessControl;