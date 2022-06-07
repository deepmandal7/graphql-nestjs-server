
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

export class CreateSubTaskInput {
    task_id?: Nullable<number>;
    task_description?: Nullable<string>;
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
    created_by?: Nullable<number>;
    user_ids?: Nullable<Nullable<number>[]>;
}

export class UpdateSubTaskInput {
    id: number;
    task_id: number;
    task_description?: Nullable<string>;
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
    created_by?: Nullable<number>;
    user_ids?: Nullable<Nullable<number>[]>;
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
    task_title?: Nullable<string>;
    task_description?: Nullable<string>;
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
    user_ids?: Nullable<number[]>;
    created_by?: Nullable<number>;
    tag_ids?: Nullable<Nullable<number>[]>;
    created_at?: Nullable<DateTime>;
    updated_at?: Nullable<DateTime>;
    sub_task?: Nullable<Nullable<CreateSubTaskInput>[]>;
}

export class UpdateTaskInput {
    id: number;
}

export class UpdateTaskStatusInput {
    id: number;
    task_status: string;
}

export class TagInput {
    tag_name?: Nullable<string>;
    tag_type?: Nullable<string>;
}

export class CreateTaskBoardInput {
    org_id: number;
    task_board_name: string;
    can_create: CanCreateEnum;
    created_by: number;
}

export class UpdateTaskBoardInput {
    id: number;
}

export class UpdateTaskBoardCustomisationInput {
    id: number;
    task_title_mandatory?: Nullable<boolean>;
    description_required?: Nullable<boolean>;
    description_mandatory?: Nullable<boolean>;
    location_required?: Nullable<boolean>;
    location_mandatory?: Nullable<boolean>;
}

export class CreateTaskCommentInput {
    user_id: number;
    comment: string;
    task_id: number;
}

export class UpdateTaskCommentInput {
    id: number;
    comment: string;
}

export class CreateTimeclockInput {
    exampleField?: Nullable<number>;
}

export class UpdateTimeclockInput {
    id: number;
}

export class User {
    id: string;
    first_name?: Nullable<string>;
}

export class Tag {
    tag?: Nullable<TagItem>;
}

export class TagItem {
    id: string;
    tag_name?: Nullable<string>;
    tag_color?: Nullable<string>;
}

export class SubTask {
    id: string;
    task_id: number;
    task_description?: Nullable<string>;
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
    created_by?: Nullable<User>;
    user?: Nullable<User[]>;
}

export abstract class IQuery {
    abstract subTasks(): Nullable<SubTask>[] | Promise<Nullable<SubTask>[]>;

    abstract subTask(id: number): Nullable<SubTask> | Promise<Nullable<SubTask>>;

    abstract userSubTasks(userId: number): Nullable<SubTask>[] | Promise<Nullable<SubTask>[]>;

    abstract tasks(take: number, orgId: number, taskBoardId?: Nullable<number>, cursor?: Nullable<number>, isUnassigned?: Nullable<boolean>, userIds?: Nullable<Nullable<number>[]>, userId?: Nullable<number>, dates?: Nullable<string>, fromStartYear?: Nullable<number>, fromStartMonth?: Nullable<number>, fromStartDate?: Nullable<number>, toStartYear?: Nullable<number>, toStartMonth?: Nullable<number>, toStartDate?: Nullable<number>, tagIds?: Nullable<Nullable<number>[]>, createdBy?: Nullable<number>, taskStatus?: Nullable<Nullable<string>[]>): Nullable<Task>[] | Promise<Nullable<Task>[]>;

    abstract task(id: number): Nullable<Task> | Promise<Nullable<Task>>;

    abstract userTasks(userId: number): Nullable<Task>[] | Promise<Nullable<Task>[]>;

    abstract taskBoards(): Nullable<TaskBoard>[] | Promise<Nullable<TaskBoard>[]>;

    abstract taskBoard(id: number): Nullable<TaskBoard> | Promise<Nullable<TaskBoard>>;

    abstract taskBoardCustomisation(taskBoardId: number): Nullable<TaskBoardCustomisation> | Promise<Nullable<TaskBoardCustomisation>>;

    abstract taskComments(taskId: number): Nullable<TaskComment>[] | Promise<Nullable<TaskComment>[]>;

    abstract taskComment(id: number): Nullable<TaskComment> | Promise<Nullable<TaskComment>>;

    abstract timeclocks(): Nullable<Timeclock>[] | Promise<Nullable<Timeclock>[]>;

    abstract timeclock(id: number): Nullable<Timeclock> | Promise<Nullable<Timeclock>>;
}

export abstract class IMutation {
    abstract createSubTask(createSubTaskInput: CreateSubTaskInput): SubTask | Promise<SubTask>;

    abstract updateSubTask(updateSubTaskInput: UpdateSubTaskInput): SubTask | Promise<SubTask>;

    abstract removeSubTask(id: number): Nullable<SubTask> | Promise<Nullable<SubTask>>;

    abstract createTask(createTaskInput: CreateTaskInput): Task | Promise<Task>;

    abstract createTasks(createTaskInput: Nullable<CreateTaskInput>[]): Task[] | Promise<Task[]>;

    abstract updateTask(updateTaskInput: UpdateTaskInput): Task | Promise<Task>;

    abstract updateTaskStatus(updateTaskStatusInput: UpdateTaskStatusInput): Task | Promise<Task>;

    abstract removeTask(id: number): Nullable<Task> | Promise<Nullable<Task>>;

    abstract createTaskBoard(createTaskBoardInput: CreateTaskBoardInput): TaskBoard | Promise<TaskBoard>;

    abstract updateTaskBoard(updateTaskBoardInput: UpdateTaskBoardInput): TaskBoard | Promise<TaskBoard>;

    abstract removeTaskBoard(id: number): Nullable<TaskBoard> | Promise<Nullable<TaskBoard>>;

    abstract updateTaskBoardCustomisation(updateTaskBoardCustomisationInput: UpdateTaskBoardCustomisationInput): TaskBoardCustomisation | Promise<TaskBoardCustomisation>;

    abstract createTaskComment(createTaskCommentInput: CreateTaskCommentInput): TaskComment | Promise<TaskComment>;

    abstract updateTaskComment(updateTaskCommentInput: UpdateTaskCommentInput): TaskComment | Promise<TaskComment>;

    abstract removeTaskComment(id: number): Nullable<TaskComment> | Promise<Nullable<TaskComment>>;

    abstract createTimeclock(createTimeclockInput: CreateTimeclockInput): Timeclock | Promise<Timeclock>;

    abstract updateTimeclock(updateTimeclockInput: UpdateTimeclockInput): Timeclock | Promise<Timeclock>;

    abstract removeTimeclock(id: number): Nullable<Timeclock> | Promise<Nullable<Timeclock>>;
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
    task_title?: Nullable<string>;
    task_description?: Nullable<string>;
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
    user?: Nullable<User[]>;
    created_by?: Nullable<number>;
    task_tag?: Nullable<Tag[]>;
    created_at?: Nullable<DateTime>;
    updated_at?: Nullable<DateTime>;
    sub_task?: Nullable<Nullable<SubTask>[]>;
}

export class TagType {
    tag_name?: Nullable<string>;
    tag_type?: Nullable<string>;
}

export class TaskBoard {
    id: string;
    task_board_name: string;
    org_id: number;
    tags?: Nullable<TagType[]>;
    can_create: CanCreateEnum;
    created_by: number;
    created_at?: Nullable<DateTime>;
    updated_at?: Nullable<DateTime>;
}

export class TaskBoardCustomisation {
    id: string;
    task_title_mandatory?: Nullable<boolean>;
    description_required?: Nullable<boolean>;
    description_mandatory?: Nullable<boolean>;
    location_required?: Nullable<boolean>;
    location_mandatory?: Nullable<boolean>;
}

export class TaskComment {
    id: string;
    user_id: number;
    comment: string;
    task_id: number;
}

export class Timeclock {
    id: string;
    title: string;
    assign_to_all?: Nullable<boolean>;
    group_ids?: Nullable<number[]>;
    locale?: Nullable<string>;
    timezone?: Nullable<string>;
    user_ids?: Nullable<Nullable<number>[]>;
    admin_ids?: Nullable<Nullable<number>[]>;
    org_id?: Nullable<number>;
    created_by?: Nullable<number>;
    clock_ins?: Nullable<Nullable<number>[]>;
}

export type DateTime = any;
type Nullable<T> = T | null;
