
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class NewOwner {
    name: string;
}

export class NewPet {
    name: string;
    ownerId: string;
}

export class UpdatePet {
    name: string;
    ownerId: string;
}

export class UpdateOwner {
    id: string;
    pets: string[];
}

export class Owner {
    id: string;
    name: string;
    pets?: Nullable<Nullable<Pet>[]>;
}

export class Pet {
    id: string;
    name: string;
    owner?: Nullable<Owner>;
    ownerId?: Nullable<string>;
}

export abstract class IQuery {
    abstract owner(id: number): Owner | Promise<Owner>;

    abstract owners(skip: number, take: number): Owner[] | Promise<Owner[]>;

    abstract pets(): Pet[] | Promise<Pet[]>;
}

export abstract class IMutation {
    abstract createOwner(createOwnerInput: NewOwner): Owner | Promise<Owner>;

    abstract updateOwner(input: UpdateOwner): Owner | Promise<Owner>;

    abstract deleteOwner(id: string): Owner | Promise<Owner>;

    abstract createPet(input: NewPet): Pet | Promise<Pet>;

    abstract updatePet(input: UpdatePet): Pet | Promise<Pet>;

    abstract deletePet(id: string): Pet | Promise<Pet>;
}

type Nullable<T> = T | null;
