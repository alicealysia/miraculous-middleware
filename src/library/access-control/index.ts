import {Resource, Action, createAnyRequired, createOwnId, readList, cantReadList} from '../../types/access-control'
import {Entity, IndexableEntity} from '../../types'
import {Permission} from 'accesscontrol'
import accessManager from './access-manager'
import filterOwned from './filter-owned'

type User = Entity.User;

class accessControl {

    private _user: User;

    // sets user variable via constructor
    constructor (user: User) {
        this._user = user;
    }

    // create overloads, narrows return function (promise vs class)
    public async create<T extends createAnyRequired>(resource: T) : Promise<(data: IndexableEntity[T]) => IndexableEntity[T]>;
    public create<T extends createOwnId>(resource: T) : filterResourceById<Action.create, T>;

    //logic satisfies overloads and returns values
    public create (resource: createAnyRequired | createOwnId){
        if (resource === Resource.client || Resource.project || Resource.skill || Resource.material) {
            return accessManager(this._user, Action.create, resource).then(permissions => permissions.filter);
        }
        return new filterResourceById(this._user, Action.create, resource);
    }

    // read overloads, narrows return function (with read.list vs without)
    public read <T extends readList>(resource: T): readResourceWithList<T>;
    public read <T extends cantReadList>(resource: T): filterResourceById<Action.read, T>;

    // satisfies overloads and returns values
    public read (resource: readList | cantReadList) {
        if (resource === Resource.contract || Resource.material || Resource.otAssessment || Resource.skill) {
            return new filterResourceById(this._user, Action.read, resource);
        }
        return new readResourceWithList(this._user, resource as readList);
    }

    public update <T extends Resource>(resource: T): filterResourceById<Action.update,T>;
    // update always leverages an id, as does delete
    public update (resource: Resource) {
        return new filterResourceById(this._user, Action.update, resource);
    }
    public del <T extends Resource>(resource: T): filterResourceById<Action.delete, T>;
    public del (resource: Resource) {
        return new filterResourceById(this._user, Action.delete, resource);
    }
}

//simple class to return access manager after id is set
class filterResourceById <K extends Action, T extends Resource> {
    private _user: User;
    private _action: Action;
    private _resource: T;

    constructor(user: User, action: K, resource: T) {
        this._user = user;
        this._action = action;
        this._resource = resource;
    }

    public async id (_id: number): Promise<(data:IndexableEntity[T]) => IndexableEntity[T]>;
    public async id (_id: number) {
        return accessManager(this._user, this._action, this._resource, _id).then(permissions => permissions.filter);
    }
}

//acts like idinit, but also has a list function, this takes an array of the appropriate resource, and filters it to owned resources.
class readResourceWithList <T extends readList> {
    private _user: User;
    private _resource: T;

    constructor(user: User, resource: T) {
        this._user = user;
        this._resource = resource;
    }
    public async id (_id: number): Promise<(data:IndexableEntity[T]) => IndexableEntity[T]>;
    public async id (_id: number) {
        return accessManager(this._user, Action.read, this._resource, _id).then(permissions => permissions.filter);
    }
    public list(resource: IndexableEntity[T]) {
        return filterOwned(this._user, this._resource, resource);
    }
}

export default accessControl;