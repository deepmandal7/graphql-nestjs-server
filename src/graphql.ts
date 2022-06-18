
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

export enum CanCreateEnum {
    EVERYONE = "EVERYONE",
    ADMIN = "ADMIN"
}

export enum RepeatTypeEnum {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY"
}

export class CreateEmployeeBreakInput {
    break_type?: Nullable<string>;
    start_time?: Nullable<DateTime>;
    end_time?: Nullable<DateTime>;
    paid?: Nullable<boolean>;
    user_id?: Nullable<number>;
    time_entry_id?: Nullable<number>;
}

export class UpdateEmployeeBreakInput {
    id: number;
    break_type?: Nullable<string>;
    paid?: Nullable<boolean>;
}

export class CreateShiftInput {
    org_id?: Nullable<number>;
    start_time?: Nullable<DateTime>;
    end_time?: Nullable<DateTime>;
}

export class UpdateShiftInput {
    id: number;
    start_time?: Nullable<DateTime>;
    end_time?: Nullable<DateTime>;
}

export class CreateSubTaskInput {
    task_id?: Nullable<number>;
    task_description?: Nullable<string>;
    sub_task_start_date_time?: Nullable<DateTime>;
    sub_task_end_date_time?: Nullable<DateTime>;
    created_by?: Nullable<number>;
    user_ids?: Nullable<Nullable<number>[]>;
}

export class UpdateSubTaskInput {
    id: number;
    task_id: number;
    task_description?: Nullable<string>;
    sub_task_start_date_time?: Nullable<DateTime>;
    sub_task_end_date_time?: Nullable<DateTime>;
    created_by?: Nullable<number>;
    user_ids?: Nullable<Nullable<number>[]>;
}

export class CreateTaskInput {
    task_title?: Nullable<string>;
    task_description?: Nullable<string>;
    task_file_id?: Nullable<Nullable<string>[]>;
    task_frequency?: Nullable<TaskFrequencyEnum>;
    task_start_date_time?: Nullable<DateTime>;
    task_end_date_time?: Nullable<DateTime>;
    task_coordinates?: Nullable<string>;
    task_location?: Nullable<string>;
    task_board_id?: Nullable<number>;
    repeat_details?: Nullable<CreateTaskRepeatDetailInput>;
    user_ids?: Nullable<number[]>;
    created_by: number;
    tag_ids?: Nullable<number[]>;
    sub_task?: Nullable<Nullable<CreateSubTaskInput>[]>;
}

export class UpdateTaskInput {
    id: number;
    task_title?: Nullable<string>;
    task_description?: Nullable<string>;
    task_file_id?: Nullable<Nullable<string>[]>;
    task_frequency?: Nullable<TaskFrequencyEnum>;
    task_start_date_time?: Nullable<DateTime>;
    task_end_date_time?: Nullable<DateTime>;
    task_coordinates?: Nullable<string>;
    task_location?: Nullable<string>;
    task_status?: Nullable<string>;
}

export class QueryTaskInput {
    taskBoardId?: Nullable<number>;
    isUnassigned?: Nullable<boolean>;
    userIds?: Nullable<Nullable<number>[]>;
    userId?: Nullable<number>;
    startDate?: Nullable<string>;
    endDate?: Nullable<string>;
    filter_date_time?: Nullable<DateTime>;
    next_date_time?: Nullable<DateTime>;
    tagIds?: Nullable<Nullable<number>[]>;
    createdBy?: Nullable<number>;
    taskStatus?: Nullable<Nullable<string>[]>;
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

export class TaskBoardCustomisationArray {
    id: number;
    field_name: string;
    visibility: boolean;
    mandatory: boolean;
}

export class UpdateTaskBoardCustomisationInput {
    task_board_customisation_list: TaskBoardCustomisationArray[];
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

export class CreateTaskRepeatDetailInput {
    task_id?: Nullable<number>;
    stop_repeat?: Nullable<DateTime>;
    how_often_repeat?: Nullable<number>;
    repeat_type?: Nullable<RepeatTypeEnum>;
    day_of_week?: Nullable<number[]>;
    day_of_month?: Nullable<number>;
    week_of_month?: Nullable<number>;
    month_of_year?: Nullable<number>;
}

export class UpdateTaskRepeatDetailInput {
    id: number;
    stop_repeat?: Nullable<DateTime>;
    how_often_repeat?: Nullable<number>;
    repeat_type?: Nullable<RepeatTypeEnum>;
    day_of_week?: Nullable<number[]>;
    day_of_month?: Nullable<number>;
    week_of_month?: Nullable<number>;
    month_of_year?: Nullable<number>;
}

export class CreateTimeEntryInput {
    timesheet_id?: Nullable<number>;
    shift_id?: Nullable<number>;
    employee_break?: Nullable<Nullable<number>[]>;
    check_in_time: DateTime;
    check_out_time: DateTime;
    org_id: number;
    user_id?: Nullable<number>;
    position_id?: Nullable<number>;
}

export class UpdateTimeEntryInput {
    id: number;
    employee_break?: Nullable<Nullable<number>[]>;
    check_in_time?: Nullable<DateTime>;
    check_out_time?: Nullable<DateTime>;
    org_id: number;
    shift_id?: Nullable<number>;
    user_id?: Nullable<number>;
}

export class CreateTimesheetInput {
    timeclock_name: string;
    assign_to_all?: Nullable<boolean>;
    group_ids?: Nullable<number[]>;
    org: number;
    created_by: number;
}

export class UpdateTimesheetInput {
    id: number;
    timeclock_name?: Nullable<string>;
    assign_to_all?: Nullable<boolean>;
    group_ids?: Nullable<number[]>;
    admins_ids?: Nullable<number[]>;
}

export class CreateWorkDurationInput {
    user_id?: Nullable<number>;
    time_entry_id?: Nullable<number>;
    check_in_time?: Nullable<DateTime>;
    check_out_time?: Nullable<DateTime>;
}

export class UpdateWorkDurationInput {
    id: number;
    check_in_time?: Nullable<DateTime>;
    check_out_time?: Nullable<DateTime>;
}

export class EmployeeBreak {
    id: string;
    break_type?: Nullable<string>;
    start_time?: Nullable<DateTime>;
    end_time?: Nullable<DateTime>;
    paid?: Nullable<boolean>;
    time_entry_id?: Nullable<number>;
}

export abstract class IQuery {
    abstract employeeBreaks(): Nullable<EmployeeBreak>[] | Promise<Nullable<EmployeeBreak>[]>;

    abstract employeeBreak(id: number): Nullable<EmployeeBreak> | Promise<Nullable<EmployeeBreak>>;

    abstract getAllShifts(): Nullable<Shift>[] | Promise<Nullable<Shift>[]>;

    abstract getShift(id: number): Nullable<Shift> | Promise<Nullable<Shift>>;

    abstract subTasks(): Nullable<SubTask>[] | Promise<Nullable<SubTask>[]>;

    abstract subTask(id: number): Nullable<SubTask> | Promise<Nullable<SubTask>>;

    abstract userSubTasks(userId: number): Nullable<SubTask>[] | Promise<Nullable<SubTask>[]>;

    abstract getTasks(take: number, orgId: number, cursor?: Nullable<number>, searchText?: Nullable<string>, queryTaskInput?: Nullable<QueryTaskInput>): Nullable<Task>[] | Promise<Nullable<Task>[]>;

    abstract getTask(id: number): Nullable<Task> | Promise<Nullable<Task>>;

    abstract getUserTasks(userId: number): Nullable<Task>[] | Promise<Nullable<Task>[]>;

    abstract getTaskBoards(): Nullable<TaskBoard>[] | Promise<Nullable<TaskBoard>[]>;

    abstract getAllTaskBoardCustomisation(taskBoardId: number): Nullable<TaskBoardCustomisation> | Promise<Nullable<TaskBoardCustomisation>>;

    abstract taskComments(taskId: number): Nullable<TaskComment>[] | Promise<Nullable<TaskComment>[]>;

    abstract taskComment(id: number): Nullable<TaskComment> | Promise<Nullable<TaskComment>>;

    abstract getTaskRepeatDetail(taskId: number): Nullable<TaskRepeatDetail> | Promise<Nullable<TaskRepeatDetail>>;

    abstract getAllTimeEntries(): Nullable<TimeEntry>[] | Promise<Nullable<TimeEntry>[]>;

    abstract getTimeEntry(id: number): Nullable<TimeEntry> | Promise<Nullable<TimeEntry>>;

    abstract getAllTimesheets(orgId: number): Nullable<Timesheet>[] | Promise<Nullable<Timesheet>[]>;

    abstract getTimesheet(id: number): Nullable<Timesheet> | Promise<Nullable<Timesheet>>;

    abstract getWorkDurations(): Nullable<WorkDuration>[] | Promise<Nullable<WorkDuration>[]>;

    abstract getWorkDuration(id: number): Nullable<WorkDuration> | Promise<Nullable<WorkDuration>>;
}

export abstract class IMutation {
    abstract createEmployeeBreak(createEmployeeBreakInput: CreateEmployeeBreakInput): EmployeeBreak | Promise<EmployeeBreak>;

    abstract updateEmployeeBreak(updateEmployeeBreakInput: UpdateEmployeeBreakInput): EmployeeBreak | Promise<EmployeeBreak>;

    abstract removeEmployeeBreak(id: number): Nullable<EmployeeBreak> | Promise<Nullable<EmployeeBreak>>;

    abstract createShift(createShiftInput: CreateShiftInput): Shift | Promise<Shift>;

    abstract updateShift(updateShiftInput: UpdateShiftInput): Shift | Promise<Shift>;

    abstract removeShift(id: number): Nullable<Shift> | Promise<Nullable<Shift>>;

    abstract createSubTask(createSubTaskInput: CreateSubTaskInput): SubTask | Promise<SubTask>;

    abstract updateSubTask(updateSubTaskInput: UpdateSubTaskInput): SubTask | Promise<SubTask>;

    abstract removeSubTask(id: number): Nullable<SubTask> | Promise<Nullable<SubTask>>;

    abstract createTask(createTaskInput: CreateTaskInput): Task | Promise<Task>;

    abstract createTasks(createTaskInput: Nullable<CreateTaskInput>[]): Task[] | Promise<Task[]>;

    abstract updateTask(updateTaskInput: UpdateTaskInput): Task | Promise<Task>;

    abstract removeTask(id: number): Nullable<Task> | Promise<Nullable<Task>>;

    abstract createTaskBoard(createTaskBoardInput: CreateTaskBoardInput): TaskBoard | Promise<TaskBoard>;

    abstract updateTaskBoard(updateTaskBoardInput: UpdateTaskBoardInput): TaskBoard | Promise<TaskBoard>;

    abstract removeTaskBoard(id: number): Nullable<TaskBoard> | Promise<Nullable<TaskBoard>>;

    abstract updateTaskBoardCustomisation(updateTaskBoardCustomisationInput: UpdateTaskBoardCustomisationInput[]): TaskBoardCustomisation[] | Promise<TaskBoardCustomisation[]>;

    abstract createTaskComment(createTaskCommentInput: CreateTaskCommentInput): TaskComment | Promise<TaskComment>;

    abstract updateTaskComment(updateTaskCommentInput: UpdateTaskCommentInput): TaskComment | Promise<TaskComment>;

    abstract removeTaskComment(id: number): Nullable<TaskComment> | Promise<Nullable<TaskComment>>;

    abstract createTaskRepeatDetail(createTaskRepeatDetailInput: CreateTaskRepeatDetailInput): TaskRepeatDetail | Promise<TaskRepeatDetail>;

    abstract updateTaskRepeatDetail(updateTaskRepeatDetailInput: UpdateTaskRepeatDetailInput): TaskRepeatDetail | Promise<TaskRepeatDetail>;

    abstract removeTaskRepeatDetail(id: number): Nullable<TaskRepeatDetail> | Promise<Nullable<TaskRepeatDetail>>;

    abstract createTimeEntry(createTimeEntryInput: CreateTimeEntryInput): TimeEntry | Promise<TimeEntry>;

    abstract updateTimeEntry(updateTimeEntryInput: UpdateTimeEntryInput): TimeEntry | Promise<TimeEntry>;

    abstract removeTimeEntry(id: number): Nullable<TimeEntry> | Promise<Nullable<TimeEntry>>;

    abstract createTimesheet(createTimesheetInput: CreateTimesheetInput): Timesheet | Promise<Timesheet>;

    abstract updateTimesheet(updateTimesheetInput: UpdateTimesheetInput): Timesheet | Promise<Timesheet>;

    abstract removeTimesheet(id: number): Nullable<Timesheet> | Promise<Nullable<Timesheet>>;

    abstract createWorkDuration(createWorkDurationInput: CreateWorkDurationInput): WorkDuration | Promise<WorkDuration>;

    abstract updateWorkDuration(updateWorkDurationInput: UpdateWorkDurationInput): WorkDuration | Promise<WorkDuration>;

    abstract removeWorkDuration(id: number): Nullable<WorkDuration> | Promise<Nullable<WorkDuration>>;
}

export class Organization {
    id: string;
    org_name?: Nullable<string>;
    timezone?: Nullable<string>;
}

export class Position {
    id: string;
    positine_title?: Nullable<string>;
}

export class User {
    id: string;
    first_name?: Nullable<string>;
    email_id?: Nullable<string>;
}

export class Tag {
    tag?: Nullable<TagItem>;
}

export class TagItem {
    id: string;
    tag_name?: Nullable<string>;
    tag_color?: Nullable<string>;
}

export class Shift {
    id?: Nullable<number>;
    org_id?: Nullable<number>;
    start_time?: Nullable<DateTime>;
    end_time?: Nullable<DateTime>;
}

export class SubTask {
    id: string;
    task_id: number;
    task_description?: Nullable<string>;
    sub_task_start_date_time?: Nullable<DateTime>;
    sub_task_end_date_time?: Nullable<DateTime>;
    created_by?: Nullable<User>;
    user?: Nullable<User[]>;
}

export class Task {
    id: string;
    task_title?: Nullable<string>;
    task_description?: Nullable<string>;
    task_file_id?: Nullable<Nullable<string>[]>;
    task_frequency?: Nullable<TaskFrequencyEnum>;
    task_start_date_time?: Nullable<DateTime>;
    task_end_date_time?: Nullable<DateTime>;
    task_coordinates?: Nullable<string>;
    task_location?: Nullable<string>;
    task_board_id?: Nullable<number>;
    repeat_details?: Nullable<TaskRepeatDetail>;
    task_status?: Nullable<string>;
    user?: Nullable<User[]>;
    created_by: number;
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
    field_name?: Nullable<string>;
    visibility?: Nullable<boolean>;
    mandatory?: Nullable<boolean>;
}

export class TaskComment {
    id: string;
    user_id: number;
    comment: string;
    task_id: number;
}

export class TaskRepeatDetail {
    id: string;
    task_id: number;
    stop_repeat?: Nullable<DateTime>;
    how_often_repeat?: Nullable<number>;
    repeat_type?: Nullable<RepeatTypeEnum>;
    day_of_week?: Nullable<number[]>;
    day_of_month?: Nullable<number>;
    week_of_month?: Nullable<number>;
    month_of_year?: Nullable<number>;
}

export class TimeEntry {
    id: string;
    timesheet_id: number;
    shift?: Nullable<Shift>;
    employee_break?: Nullable<EmployeeBreak[]>;
    check_in_time: DateTime;
    check_out_time: DateTime;
    org: Organization;
    status?: Nullable<string>;
    notes?: Nullable<string>;
    user: User;
    position?: Nullable<Position>;
}

export class Timesheet {
    id: string;
    timeclock_name: string;
    assign_to_all?: Nullable<boolean>;
    group_ids?: Nullable<number[]>;
    admins?: Nullable<User[]>;
    org: number;
    created_by: number;
}

export class WorkDuration {
    id: string;
    user_id?: Nullable<number>;
    time_entry_id?: Nullable<number>;
    check_in_time?: Nullable<DateTime>;
    check_out_time?: Nullable<DateTime>;
}

export type DateTime = any;
type Nullable<T> = T | null;
