
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum TaskFrequencyEnum {
    ONEOFF = "ONEOFF",
    RECURRING = "RECURRING"
}

export enum RepeatTypeEnum {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY"
}

export enum CanCreateEnum {
    EVERYONE = "EVERYONE",
    ADMIN = "ADMIN"
}

export class RepeatDetailsInput {
    how_often_repeat: number;
    stop_repeat?: Nullable<DateTime>;
    repeat_type?: Nullable<RepeatTypeEnum>;
    day_of_week?: Nullable<number[]>;
    day_of_month?: Nullable<number>;
    week_of_month?: Nullable<number>;
    month_of_year?: Nullable<number>;
}

export class CreateTaskInput {
    task_title: string;
    task_description: string;
    task_file_id?: Nullable<Nullable<string>[]>;
    task_frequency?: Nullable<TaskFrequencyEnum>;
    syear?: Nullable<number>;
    smonth?: Nullable<number>;
    sdate?: Nullable<number>;
    shour?: Nullable<number>;
    sminute?: Nullable<number>;
    eyear?: Nullable<number>;
    emonth?: Nullable<number>;
    edate?: Nullable<number>;
    ehour?: Nullable<number>;
    eminute?: Nullable<number>;
    task_coordinates?: Nullable<string>;
    task_location?: Nullable<string>;
    task_board_id?: Nullable<number>;
    repeat_details?: Nullable<RepeatDetailsInput>;
    task_status?: Nullable<string>;
    user_ids?: Nullable<Nullable<number>[]>;
    created_by?: Nullable<number>;
    tag_ids?: Nullable<Nullable<number>[]>;
    created_at?: Nullable<DateTime>;
    updated_at?: Nullable<DateTime>;
}

export class UpdateTaskInput {
    id: number;
}

export class TagInput {
    tag_name?: Nullable<string>;
    tag_type?: Nullable<string>;
}

export class CustomisationMandatoryInput {
    mandatory?: Nullable<boolean>;
}

export class CustomisationMandatoryCheckedInput {
    mandatory?: Nullable<boolean>;
    checked?: Nullable<boolean>;
}

export class CustomisationInput {
    task_title?: Nullable<CustomisationMandatoryInput>;
    task_description?: Nullable<CustomisationMandatoryCheckedInput>;
    task_location?: Nullable<CustomisationMandatoryCheckedInput>;
}

export class CreateTaskBoardInput {
    org_id: number;
    task_board_name: string;
    customisation: CustomisationInput;
    can_create: CanCreateEnum;
    created_by: number;
}

export class UpdateTaskBoardInput {
    id: number;
}

export class RepeatDetailsType {
    id: number;
    how_often_repeat: number;
    stop_repeat?: Nullable<DateTime>;
    repeat_type?: Nullable<RepeatTypeEnum>;
    day_of_week?: Nullable<number[]>;
    day_of_month?: Nullable<number>;
    week_of_month?: Nullable<number>;
    month_of_year?: Nullable<number>;
}

export class Task {
    id: string;
    task_title: string;
    task_description: string;
    task_file_id?: Nullable<Nullable<string>[]>;
    task_frequency?: Nullable<TaskFrequencyEnum>;
    syear?: Nullable<number>;
    smonth?: Nullable<number>;
    sdate?: Nullable<number>;
    shour?: Nullable<number>;
    sminute?: Nullable<number>;
    eyear?: Nullable<number>;
    emonth?: Nullable<number>;
    edate?: Nullable<number>;
    ehour?: Nullable<number>;
    eminute?: Nullable<number>;
    task_coordinates?: Nullable<string>;
    task_location?: Nullable<string>;
    task_board_id?: Nullable<number>;
    repeat_details?: Nullable<RepeatDetailsType>;
    task_status?: Nullable<string>;
    user_ids?: Nullable<Nullable<number>[]>;
    created_by?: Nullable<number>;
    tag_ids?: Nullable<Nullable<number>[]>;
    created_at?: Nullable<DateTime>;
    updated_at?: Nullable<DateTime>;
}

export abstract class IQuery {
    abstract tasks(take: number, orgId: number, cursor?: Nullable<number>, isUnassigned?: Nullable<boolean>, userIds?: Nullable<Nullable<number>[]>, dates?: Nullable<string>, fromStartYear?: Nullable<number>, fromStartMonth?: Nullable<number>, fromStartDate?: Nullable<number>, toStartYear?: Nullable<number>, toStartMonth?: Nullable<number>, toStartDate?: Nullable<number>, tagIds?: Nullable<Nullable<number>[]>, createdBy?: Nullable<number>, taskStatus?: Nullable<string>): Nullable<Task>[] | Promise<Nullable<Task>[]>;

    abstract task(id: number): Nullable<Task> | Promise<Nullable<Task>>;

    abstract taskBoards(): Nullable<TaskBoard>[] | Promise<Nullable<TaskBoard>[]>;

    abstract taskBoard(id: number): Nullable<TaskBoard> | Promise<Nullable<TaskBoard>>;
}

export abstract class IMutation {
    abstract createTask(createTaskInput: CreateTaskInput): Task | Promise<Task>;

    abstract updateTask(updateTaskInput: UpdateTaskInput): Task | Promise<Task>;

    abstract removeTask(id: number): Nullable<Task> | Promise<Nullable<Task>>;

    abstract createTaskBoard(createTaskBoardInput: CreateTaskBoardInput): TaskBoard | Promise<TaskBoard>;

    abstract updateTaskBoard(updateTaskBoardInput: UpdateTaskBoardInput): TaskBoard | Promise<TaskBoard>;

    abstract removeTaskBoard(id: number): Nullable<TaskBoard> | Promise<Nullable<TaskBoard>>;
}

export class TagType {
    tag_name?: Nullable<string>;
    tag_type?: Nullable<string>;
}

export class CustomisationMandatoryCheckedType {
    mandatory?: Nullable<boolean>;
    checked?: Nullable<boolean>;
}

export class CustomisationMandatoryType {
    mandatory?: Nullable<boolean>;
}

export class CustomisationType {
    task_title?: Nullable<CustomisationMandatoryType>;
    task_description?: Nullable<CustomisationMandatoryCheckedType>;
    task_location?: Nullable<CustomisationMandatoryCheckedType>;
}

export class TaskBoard {
    id: string;
    task_board_name: string;
    org_id: number;
    tags?: Nullable<TagType[]>;
    customisation: CustomisationType;
    can_create: CanCreateEnum;
    created_by: number;
    created_at?: Nullable<DateTime>;
    updated_at?: Nullable<DateTime>;
}

export type DateTime = any;
type Nullable<T> = T | null;
