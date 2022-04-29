
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateJobInput {
    job_title: string;
    qualified_users_id?: Nullable<number[]>;
    qualified_groups_id: number[];
    subjobs_id?: Nullable<number[]>;
}

export class UpdateJobInput {
    id: number;
    job_title?: Nullable<string>;
    qualified_users?: Nullable<number[]>;
    qualified_groups?: Nullable<number[]>;
    subjobs?: Nullable<string[]>;
}

export class NewOwner {
    name: string;
}

export class NewPet {
    name: string;
    ownerId: number;
}

export class UpdatePet {
    name: string;
    ownerId: string;
}

export class UpdateOwner {
    id: string;
    pets: string[];
}

export class RepeatDetailsInput {
    repeat_type: string;
    repeat_interval: number;
    end_repeat_after_shifts: number;
    week_days?: Nullable<number[]>;
}

export class CreateShiftInput {
    shift_title: string;
    shift_date: string;
    shift_start_time: string;
    shift_end_time: string;
    shift_timezone: string;
    shift_job_id: string;
    spots_to_claim: number;
    users_id: string[];
    shift_tasks_id?: Nullable<string[]>;
    repeat_details?: Nullable<RepeatDetailsInput>;
}

export class UpdateShiftInput {
    id: number;
}

export class CreateSubJobInput {
    exampleField?: Nullable<number>;
}

export class UpdateSubJobInput {
    id: number;
}

export class Job {
    id: string;
    job_title: string;
    qualified_users_id?: Nullable<string[]>;
    qualified_groups_id?: Nullable<string[]>;
    subjobs_id?: Nullable<string[]>;
}

export abstract class IQuery {
    abstract jobs(): Nullable<Job>[] | Promise<Nullable<Job>[]>;

    abstract job(id: number): Nullable<Job> | Promise<Nullable<Job>>;

    abstract owner(id: number): Owner | Promise<Owner>;

    abstract owners(skip: number, take: number): Owner[] | Promise<Owner[]>;

    abstract pet(id: number): Pet | Promise<Pet>;

    abstract pets(take: number, cursor?: Nullable<number>): Pet[] | Promise<Pet[]>;

    abstract shifts(): Nullable<Shift>[] | Promise<Nullable<Shift>[]>;

    abstract shift(id: number): Nullable<Shift> | Promise<Nullable<Shift>>;

    abstract subJobs(): Nullable<SubJob>[] | Promise<Nullable<SubJob>[]>;

    abstract subJob(id: number): Nullable<SubJob> | Promise<Nullable<SubJob>>;
}

export abstract class IMutation {
    abstract createJob(createJobInput: CreateJobInput): Job | Promise<Job>;

    abstract updateJob(updateJobInput: UpdateJobInput): Job | Promise<Job>;

    abstract removeJob(id: number): Nullable<Job> | Promise<Nullable<Job>>;

    abstract createOwner(createOwnerInput: NewOwner): string | Promise<string>;

    abstract updateOwner(input: UpdateOwner): Owner | Promise<Owner>;

    abstract deleteOwner(id: string): Owner | Promise<Owner>;

    abstract createPet(createPetInput: NewPet): Pet | Promise<Pet>;

    abstract updatePet(input: UpdatePet): Pet | Promise<Pet>;

    abstract deletePet(id: string): Pet | Promise<Pet>;

    abstract createShift(createShiftInput: CreateShiftInput): Shift | Promise<Shift>;

    abstract updateShift(updateShiftInput: UpdateShiftInput): Shift | Promise<Shift>;

    abstract removeShift(id: number): Nullable<Shift> | Promise<Nullable<Shift>>;

    abstract createSubJob(createSubJobInput: CreateSubJobInput): SubJob | Promise<SubJob>;

    abstract updateSubJob(updateSubJobInput: UpdateSubJobInput): SubJob | Promise<SubJob>;

    abstract removeSubJob(id: number): Nullable<SubJob> | Promise<Nullable<SubJob>>;
}

export class Owner {
    id: string;
    name: string;
    pets?: Nullable<Nullable<Pet>[]>;
}

export class Pet {
    id: string;
    name: string;
    ownerId: number;
    owner?: Nullable<Owner>;
}

export class RepeatDetailsType {
    repeat_type: string;
    repeat_interval: number;
    end_repeat_after_shifts: number;
    week_days?: Nullable<number[]>;
}

export class Shift {
    id: string;
    shift_title: string;
    shift_date: string;
    shift_start_time: string;
    shift_end_time: string;
    shift_timezone: string;
    shift_job_id: string;
    spots_to_claim: number;
    users_id: string[];
    shift_tasks_id?: Nullable<string[]>;
    repeat_details?: Nullable<RepeatDetailsType>;
}

export class SubJob {
    exampleField?: Nullable<number>;
}

type Nullable<T> = T | null;
