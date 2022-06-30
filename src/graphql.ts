
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

export enum DayTypeEnum {
    NEXT = "NEXT",
    PREVIOUS = "PREVIOUS",
    CURRENT = "CURRENT"
}

export enum GeoLocationSettingsEnum {
    REQUIRED = "REQUIRED",
    OPTIONAL = "OPTIONAL",
    OFF = "OFF"
}

export enum PayPeriodCycleEnum {
    MONTHLY = "MONTHLY",
    WEEKLY = "WEEKLY",
    BIWEEKLY = "BIWEEKLY",
    HALFMONTHLY = "HALFMONTHLY"
}

export enum WorkingHoursCalculationEnum {
    FIRSTLAST = "FIRSTLAST",
    EVERY = "EVERY"
}

export enum ManualOrShiftMinimumHoursEnum {
    MANUAL = "MANUAL",
    SHIFT = "SHIFT"
}

export enum PayrollExportTimeFormatEnum {
    DECIMAL = "DECIMAL",
    MINUTES = "MINUTES"
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
    task_board_name: string;
    can_create: CanCreateEnum;
}

export class QueryTaskBoardInput {
    org_id: number;
    status?: Nullable<string>;
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
    timesheet_entry_id?: Nullable<number>;
    check_in_time: string;
    check_in_date_type: DayTypeEnum;
    check_out_time?: Nullable<string>;
    check_out_date_type?: Nullable<DayTypeEnum>;
    timesheet_jobs_id?: Nullable<number>;
    timesheet_sub_jobs_id?: Nullable<number>;
    user_id: number;
    created_by_id: number;
}

export class UpdateTimeEntryInput {
    id: number;
    check_in_time: string;
    check_in_date_type: string;
    check_out_time?: Nullable<string>;
    check_out_date_type?: Nullable<string>;
    timesheet_jobs_id?: Nullable<number>;
    timesheet_sub_jobs_id?: Nullable<number>;
}

export class QueryTimeEntryInput {
    timesheet_entry_id: number;
}

export class UpdateTimesheetCustomizationSettingInput {
    id: number;
    allow_clock_in_out_web_browser: boolean;
    allow_clock_in_out_mobile_app: boolean;
    allow_clock_in_out_no_shecduled_shift: boolean;
    allow_clock_in_out_mobile_app_timeclock: boolean;
    direct_clock_in_out_schedule: boolean;
    allow_clock_in_out_computer_timeclock: boolean;
    allow_manual_shift_records_addition: boolean;
    approval_manual_shift_records_addition: boolean;
    approval_manual_shift_records_deletion: boolean;
    approval_absence_addition: boolean;
    approval_cloking_out_outside_geofence: boolean;
}

export class CreateTimesheetEntryInput {
    timesheet_id: number;
    entry_date: string;
    user_id: number;
    timezone: string;
    time_entry: CreateTimeEntryInput[];
    created_by_id: number;
}

export class UpdateTimesheetEntryInput {
    id: number;
}

export class QueryTimesheetInput {
    timesheetId: number;
}

export class UpdateTimesheetGeoLocationSettingInput {
    id: number;
    settings: GeoLocationSettingsEnum;
    breadcrumbs_enabled: boolean;
}

export class CreateTimesheetGeoLocationInput {
    timesheets: number;
    site_name?: Nullable<string>;
    site_address?: Nullable<string>;
    jobs?: Nullable<number[]>;
    created_by: number;
}

export class UpdateTimesheetGeoLocationInput {
    id: number;
    site_name?: Nullable<string>;
    site_address?: Nullable<string>;
    jobs?: Nullable<number[]>;
}

export class QueryTimesheetGeoLocationInput {
    timesheet_id: number;
}

export class CreateTimesheetJobSettingInput {
    job_title?: Nullable<string>;
    color?: Nullable<string>;
    job_description?: Nullable<string>;
    all_user?: Nullable<boolean>;
    user?: Nullable<number[]>;
    sub_jobs_enabled?: Nullable<boolean>;
    geo_locations?: Nullable<number[]>;
    timesheets: number;
    timesheet_sub_jobs?: Nullable<CreateTimesheetSubJobSettingInput[]>;
    created_by: number;
}

export class UpdateTimesheetJobSettingInput {
    id: number;
    job_title?: Nullable<string>;
    color?: Nullable<string>;
    job_description?: Nullable<string>;
    all_user?: Nullable<boolean>;
    user?: Nullable<number[]>;
    sub_jobs_enabled?: Nullable<boolean>;
    geo_locations?: Nullable<number[]>;
}

export class QueryTimesheetJobSettingsInput {
    timesheet_id: number;
}

export class UpdateTimesheetNotificationSettingInput {
    id: number;
    user_request_absence_mobile: boolean;
    user_request_absence_webpush: boolean;
    user_request_absence_email: boolean;
    user_new_shift_added_mobile: boolean;
    user_new_shift_added_webpush: boolean;
    user_new_shift_added_email: boolean;
    user_edit_shift_mobile: boolean;
    user_edit_shift_webpush: boolean;
    user_edit_shift_email: boolean;
    user_exceeds_mobile: boolean;
    user_exceeds_webpush: boolean;
    user_exceeds_email: boolean;
    user_auto_clock_out_mobile: boolean;
    user_auto_clock_out_webpush: boolean;
    user_auto_clock_out_email: boolean;
    user_pending: number;
    user_pending_mobile: boolean;
    user_pending_webpush: boolean;
    user_pending_email: boolean;
    admin_absence_approval_mobile: boolean;
    admin_absence_approval_webpush: boolean;
    admin_absence_approval_email: boolean;
    admin_shift_approval_mobile: boolean;
    admin_shift_approval_webpush: boolean;
    admin_shift_approval_email: boolean;
}

export class UpdateTimesheetPayrollSettingInput {
    id: number;
    pay_period_cycle: PayPeriodCycleEnum;
    start_day: number;
    end_day: number;
    payroll_processing_day: number;
    payroll_report_generation_day: number;
    process_leave_encashment: boolean;
    lock: boolean;
}

export class UpdateTimesheetReminderSettingInput {
    id: number;
    before_start_enabled: boolean;
    before_start: number;
    after_start_enabled: boolean;
    after_start: number;
    before_end_enabled: boolean;
    before_end: number;
    after_end_enabled: boolean;
    after_end: number;
    no_check_in_enabled: boolean;
    no_check_in_after: number;
    no_check_out_enabled: boolean;
    no_check_out_after: number;
}

export class CreateTimesheetSubJobSettingInput {
    sub_job_title: string;
    all_user?: Nullable<boolean>;
    user?: Nullable<number[]>;
    job_id?: Nullable<number>;
    created_by: number;
}

export class UpdateTimesheetSubJobSettingInput {
    id: number;
    sub_job_title?: Nullable<string>;
    all_user?: Nullable<boolean>;
    user?: Nullable<number[]>;
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

export class UpdateTimesheetsGeneralSettingInput {
    id: number;
    workweek_starts_on: number;
    daily_limit: string;
    auto_clock_out: string;
    working_hours_calculation: WorkingHoursCalculationEnum;
    manual_or_shift_minimum_hours: ManualOrShiftMinimumHoursEnum;
    minimum_hours_manual_full_day: string;
    minimum_hours_manual_half_day: string;
    payroll_export_time_format: PayrollExportTimeFormatEnum;
    timezone: string;
    restrict_clock_in: boolean;
    restrict_clock_in_to: number;
    restrict_clock_out: boolean;
    restrict_clock_out_to: number;
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

export class UpdateWorkweekInput {
    id: number;
    monday: boolean;
    monday_start_time: string;
    monday_end_time: string;
    tuesday: boolean;
    tuesday_start_time: string;
    tuesday_end_time: string;
    wednesday: boolean;
    wednesday_start_time: string;
    wednesday_end_time: string;
    thursday: boolean;
    thursday_start_time: string;
    thursday_end_time: string;
    friday: boolean;
    friday_start_time: string;
    friday_end_time: string;
    saturday: boolean;
    saturday_start_time: string;
    saturday_end_time: string;
    sunday: boolean;
    sunday_start_time: string;
    sunday_end_time: string;
}

export class Organization {
    id: string;
    org_name?: Nullable<string>;
    timezone?: Nullable<string>;
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

export abstract class IQuery {
    abstract getAllShifts(): Nullable<Shift>[] | Promise<Nullable<Shift>[]>;

    abstract getShift(id: number): Nullable<Shift> | Promise<Nullable<Shift>>;

    abstract subTasks(): Nullable<SubTask>[] | Promise<Nullable<SubTask>[]>;

    abstract subTask(id: number): Nullable<SubTask> | Promise<Nullable<SubTask>>;

    abstract userSubTasks(userId: number): Nullable<SubTask>[] | Promise<Nullable<SubTask>[]>;

    abstract getTasks(take: number, orgId: number, cursor?: Nullable<number>, searchText?: Nullable<string>, where?: Nullable<QueryTaskInput>): Nullable<Task>[] | Promise<Nullable<Task>[]>;

    abstract getTask(id: number): Nullable<Task> | Promise<Nullable<Task>>;

    abstract getUserTasks(userId: number): Nullable<Task>[] | Promise<Nullable<Task>[]>;

    abstract getTaskBoards(where: QueryTaskBoardInput): Nullable<TaskBoard>[] | Promise<Nullable<TaskBoard>[]>;

    abstract getAllTaskBoardCustomisation(taskBoardId: number): Nullable<TaskBoardCustomisation> | Promise<Nullable<TaskBoardCustomisation>>;

    abstract taskComments(taskId: number): Nullable<TaskComment>[] | Promise<Nullable<TaskComment>[]>;

    abstract taskComment(id: number): Nullable<TaskComment> | Promise<Nullable<TaskComment>>;

    abstract getTaskRepeatDetail(taskId: number): Nullable<TaskRepeatDetail> | Promise<Nullable<TaskRepeatDetail>>;

    abstract getAllTimeEntries(take: number, orgId: number, cursor?: Nullable<number>, searchText?: Nullable<string>, where?: Nullable<QueryTimeEntryInput>): Nullable<TimeEntry>[] | Promise<Nullable<TimeEntry>[]>;

    abstract getTimeEntry(id: number): Nullable<TimeEntry> | Promise<Nullable<TimeEntry>>;

    abstract getTimesheetCustomizationSetting(timesheetId: number): TimesheetCustomizationSetting | Promise<TimesheetCustomizationSetting>;

    abstract getAllTimesheetEntry(take: number, orgId: number, where: QueryTimesheetInput, cursor?: Nullable<number>, searchText?: Nullable<string>): Nullable<TimesheetEntry>[] | Promise<Nullable<TimesheetEntry>[]>;

    abstract timesheetEntry(id: number): Nullable<TimesheetEntry> | Promise<Nullable<TimesheetEntry>>;

    abstract getTimesheetGeoLocationSetting(timesheetId: number): TimesheetGeoLocationSetting | Promise<TimesheetGeoLocationSetting>;

    abstract getAllTimesheetGeoLocations(take: number, orgId: number, where: QueryTimesheetGeoLocationInput, cursor?: Nullable<number>, searchText?: Nullable<string>): Nullable<TimesheetGeoLocation>[] | Promise<Nullable<TimesheetGeoLocation>[]>;

    abstract getTimesheetGeoLocation(id: number): Nullable<TimesheetGeoLocation> | Promise<Nullable<TimesheetGeoLocation>>;

    abstract getAllTimesheetJobSettings(take: number, orgId: number, where: QueryTimesheetJobSettingsInput, cursor?: Nullable<number>, searchText?: Nullable<string>): Nullable<TimesheetJobSetting>[] | Promise<Nullable<TimesheetJobSetting>[]>;

    abstract getTimesheetJobSetting(id: number): Nullable<TimesheetJobSetting> | Promise<Nullable<TimesheetJobSetting>>;

    abstract getTimesheetNotificationSetting(timesheetId: number): TimesheetNotificationSetting | Promise<TimesheetNotificationSetting>;

    abstract getTimesheetPayrollSetting(timesheetId: number): TimesheetPayrollSetting | Promise<TimesheetPayrollSetting>;

    abstract getTimesheetReminderSetting(timesheetId: number): TimesheetReminderSetting | Promise<TimesheetReminderSetting>;

    abstract getAllTimesheetSubJobSettings(jobId: number): Nullable<TimesheetSubJobSetting>[] | Promise<Nullable<TimesheetSubJobSetting>[]>;

    abstract getTimesheetSubJobSetting(id: number): Nullable<TimesheetSubJobSetting> | Promise<Nullable<TimesheetSubJobSetting>>;

    abstract getAllTimesheets(orgId: number): Nullable<Timesheet>[] | Promise<Nullable<Timesheet>[]>;

    abstract getTimesheet(id: number): Nullable<Timesheet> | Promise<Nullable<Timesheet>>;

    abstract getTimesheetsGeneralSetting(timesheetId: number): TimesheetsGeneralSetting | Promise<TimesheetsGeneralSetting>;

    abstract getWorkDurations(): Nullable<WorkDuration>[] | Promise<Nullable<WorkDuration>[]>;

    abstract getWorkDuration(id: number): Nullable<WorkDuration> | Promise<Nullable<WorkDuration>>;

    abstract getWorkweek(timesheetId: number): Workweek | Promise<Workweek>;
}

export abstract class IMutation {
    abstract createShift(createShiftInput: CreateShiftInput): Shift | Promise<Shift>;

    abstract updateShift(updateShiftInput: UpdateShiftInput): Shift | Promise<Shift>;

    abstract removeShift(id: number): Nullable<Shift> | Promise<Nullable<Shift>>;

    abstract createSubTask(input: CreateSubTaskInput): SubTask | Promise<SubTask>;

    abstract updateSubTask(input: UpdateSubTaskInput): SubTask | Promise<SubTask>;

    abstract removeSubTask(id: number): Nullable<SubTask> | Promise<Nullable<SubTask>>;

    abstract createTask(input: CreateTaskInput): Task | Promise<Task>;

    abstract createTasks(input: Nullable<CreateTaskInput>[]): Task[] | Promise<Task[]>;

    abstract updateTask(input: UpdateTaskInput): Task | Promise<Task>;

    abstract removeTask(id: number): Nullable<Task> | Promise<Nullable<Task>>;

    abstract createTaskBoard(input: CreateTaskBoardInput): TaskBoard | Promise<TaskBoard>;

    abstract updateTaskBoard(input: UpdateTaskBoardInput): TaskBoard | Promise<TaskBoard>;

    abstract removeTaskBoard(id: number): Nullable<TaskBoard> | Promise<Nullable<TaskBoard>>;

    abstract updateTaskBoardCustomisation(input: UpdateTaskBoardCustomisationInput[]): TaskBoardCustomisation[] | Promise<TaskBoardCustomisation[]>;

    abstract createTaskComment(input: CreateTaskCommentInput): TaskComment | Promise<TaskComment>;

    abstract updateTaskComment(input: UpdateTaskCommentInput): TaskComment | Promise<TaskComment>;

    abstract removeTaskComment(id: number): Nullable<TaskComment> | Promise<Nullable<TaskComment>>;

    abstract createTaskRepeatDetail(input: CreateTaskRepeatDetailInput): TaskRepeatDetail | Promise<TaskRepeatDetail>;

    abstract updateTaskRepeatDetail(input: UpdateTaskRepeatDetailInput): TaskRepeatDetail | Promise<TaskRepeatDetail>;

    abstract removeTaskRepeatDetail(id: number): Nullable<TaskRepeatDetail> | Promise<Nullable<TaskRepeatDetail>>;

    abstract createTimeEntry(input: CreateTimeEntryInput): TimeEntry | Promise<TimeEntry>;

    abstract updateTimeEntry(input: UpdateTimeEntryInput): TimeEntry | Promise<TimeEntry>;

    abstract removeTimeEntry(id: number): Nullable<TimeEntry> | Promise<Nullable<TimeEntry>>;

    abstract updateTimesheetCustomizationSetting(input: UpdateTimesheetCustomizationSettingInput): TimesheetCustomizationSetting | Promise<TimesheetCustomizationSetting>;

    abstract createTimesheetEntry(input: CreateTimesheetEntryInput): TimesheetEntry | Promise<TimesheetEntry>;

    abstract updateTimesheetEntry(input: UpdateTimesheetEntryInput): TimesheetEntry | Promise<TimesheetEntry>;

    abstract removeTimesheetEntry(id: number): Nullable<TimesheetEntry> | Promise<Nullable<TimesheetEntry>>;

    abstract updateTimesheetGeoLocationSetting(input: UpdateTimesheetGeoLocationSettingInput): TimesheetGeoLocationSetting | Promise<TimesheetGeoLocationSetting>;

    abstract removeTimesheetGeoLocationSetting(id: number): Nullable<TimesheetGeoLocationSetting> | Promise<Nullable<TimesheetGeoLocationSetting>>;

    abstract createTimesheetGeoLocation(input: CreateTimesheetGeoLocationInput): TimesheetGeoLocation | Promise<TimesheetGeoLocation>;

    abstract updateTimesheetGeoLocation(input: UpdateTimesheetGeoLocationInput): TimesheetGeoLocation | Promise<TimesheetGeoLocation>;

    abstract removeTimesheetGeoLocation(id: number): Nullable<TimesheetGeoLocation> | Promise<Nullable<TimesheetGeoLocation>>;

    abstract createTimesheetJobSetting(input: CreateTimesheetJobSettingInput): TimesheetJobSetting | Promise<TimesheetJobSetting>;

    abstract updateTimesheetJobSetting(input: UpdateTimesheetJobSettingInput): TimesheetJobSetting | Promise<TimesheetJobSetting>;

    abstract removeTimesheetJobSetting(id: number): Nullable<TimesheetJobSetting> | Promise<Nullable<TimesheetJobSetting>>;

    abstract updateTimesheetNotificationSetting(input: UpdateTimesheetNotificationSettingInput): TimesheetNotificationSetting | Promise<TimesheetNotificationSetting>;

    abstract removeTimesheetNotificationSetting(id: number): Nullable<TimesheetNotificationSetting> | Promise<Nullable<TimesheetNotificationSetting>>;

    abstract updateTimesheetPayrollSetting(input: UpdateTimesheetPayrollSettingInput): TimesheetPayrollSetting | Promise<TimesheetPayrollSetting>;

    abstract removeTimesheetPayrollSetting(id: number): Nullable<TimesheetPayrollSetting> | Promise<Nullable<TimesheetPayrollSetting>>;

    abstract updateTimesheetReminderSetting(input: UpdateTimesheetReminderSettingInput): TimesheetReminderSetting | Promise<TimesheetReminderSetting>;

    abstract removeTimesheetReminderSetting(id: number): Nullable<TimesheetReminderSetting> | Promise<Nullable<TimesheetReminderSetting>>;

    abstract createTimesheetSubJobSetting(input: CreateTimesheetSubJobSettingInput): Nullable<TimesheetSubJobSetting> | Promise<Nullable<TimesheetSubJobSetting>>;

    abstract updateTimesheetSubJobSetting(input: UpdateTimesheetSubJobSettingInput): TimesheetSubJobSetting | Promise<TimesheetSubJobSetting>;

    abstract removeTimesheetSubJobSetting(id: number): Nullable<TimesheetSubJobSetting> | Promise<Nullable<TimesheetSubJobSetting>>;

    abstract createTimesheet(input: CreateTimesheetInput): Timesheet | Promise<Timesheet>;

    abstract updateTimesheet(input: UpdateTimesheetInput): Timesheet | Promise<Timesheet>;

    abstract removeTimesheet(id: number): Nullable<Timesheet> | Promise<Nullable<Timesheet>>;

    abstract updateTimesheetsGeneralSetting(input: UpdateTimesheetsGeneralSettingInput): TimesheetsGeneralSetting | Promise<TimesheetsGeneralSetting>;

    abstract removeTimesheetsGeneralSetting(id: number): Nullable<TimesheetsGeneralSetting> | Promise<Nullable<TimesheetsGeneralSetting>>;

    abstract createWorkDuration(createWorkDurationInput: CreateWorkDurationInput): WorkDuration | Promise<WorkDuration>;

    abstract updateWorkDuration(updateWorkDurationInput: UpdateWorkDurationInput): WorkDuration | Promise<WorkDuration>;

    abstract removeWorkDuration(id: number): Nullable<WorkDuration> | Promise<Nullable<WorkDuration>>;

    abstract updateWorkweek(input: UpdateWorkweekInput): Workweek | Promise<Workweek>;

    abstract removeWorkweek(id: number): Nullable<Workweek> | Promise<Nullable<Workweek>>;
}

export class SubTask {
    id: string;
    task_id: number;
    task_description?: Nullable<string>;
    sub_task_start_date_time?: Nullable<DateTime>;
    sub_task_end_date_time?: Nullable<DateTime>;
    created_by?: Nullable<User>;
    user_ids?: Nullable<User[]>;
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
    created_by: User;
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
    timesheet_entry_id: number;
    shift?: Nullable<Shift>;
    check_in_time: DateTime;
    check_in_date_type: DayTypeEnum;
    check_out_time: DateTime;
    check_out_date_type?: Nullable<DayTypeEnum>;
    org: Organization;
    status?: Nullable<string>;
    notes?: Nullable<string>;
    user: User;
    created_by: User;
}

export class TimesheetCustomizationSetting {
    id: string;
    allow_clock_in_out_web_browser: boolean;
    allow_clock_in_out_mobile_app: boolean;
    allow_clock_in_out_no_shecduled_shift: boolean;
    allow_clock_in_out_mobile_app_timeclock: boolean;
    direct_clock_in_out_schedule: boolean;
    allow_clock_in_out_computer_timeclock: boolean;
    allow_manual_shift_records_addition: boolean;
    approval_manual_shift_records_addition: boolean;
    approval_manual_shift_records_deletion: boolean;
    approval_absence_addition: boolean;
    approval_cloking_out_outside_geofence: boolean;
}

export class TimesheetEntry {
    id: string;
    timesheet_id: number;
    entry_date: string;
    timesheet_clockin_time: string;
    timesheet_clockout_time?: Nullable<string>;
    status?: Nullable<string>;
    user: User;
    time_entry: TimeEntry[];
    created_by: User;
}

export class TimesheetGeoLocationSetting {
    id: string;
    settings: GeoLocationSettingsEnum;
    breadcrumbs_enabled: boolean;
}

export class TimesheetGeoLocation {
    id: string;
    site_name?: Nullable<string>;
    site_address?: Nullable<string>;
    jobs?: Nullable<TimesheetJobSetting[]>;
}

export class TimesheetJobSetting {
    id: string;
    job_title?: Nullable<string>;
    color?: Nullable<string>;
    job_description?: Nullable<string>;
    all_user?: Nullable<boolean>;
    user?: Nullable<Nullable<User>[]>;
    sub_jobs_enabled?: Nullable<boolean>;
    timesheet_sub_jobs?: Nullable<Nullable<TimesheetSubJobSetting>[]>;
    geo_locations?: Nullable<Nullable<TimesheetGeoLocation>[]>;
}

export class TimesheetNotificationSetting {
    id: string;
    user_request_absence_mobile: boolean;
    user_request_absence_webpush: boolean;
    user_request_absence_email: boolean;
    user_new_shift_added_mobile: boolean;
    user_new_shift_added_webpush: boolean;
    user_new_shift_added_email: boolean;
    user_edit_shift_mobile: boolean;
    user_edit_shift_webpush: boolean;
    user_edit_shift_email: boolean;
    user_exceeds_mobile: boolean;
    user_exceeds_webpush: boolean;
    user_exceeds_email: boolean;
    user_auto_clock_out_mobile: boolean;
    user_auto_clock_out_webpush: boolean;
    user_auto_clock_out_email: boolean;
    user_pending: number;
    user_pending_mobile: boolean;
    user_pending_webpush: boolean;
    user_pending_email: boolean;
    admin_absence_approval_mobile: boolean;
    admin_absence_approval_webpush: boolean;
    admin_absence_approval_email: boolean;
    admin_shift_approval_mobile: boolean;
    admin_shift_approval_webpush: boolean;
    admin_shift_approval_email: boolean;
}

export class TimesheetPayrollSetting {
    id: string;
    pay_period_cycle: PayPeriodCycleEnum;
    start_day: number;
    end_day: number;
    payroll_processing_day: number;
    payroll_report_generation_day: number;
    process_leave_encashment: boolean;
    lock: boolean;
}

export class TimesheetReminderSetting {
    id: string;
    before_start_enabled: boolean;
    before_start: number;
    after_start_enabled: boolean;
    after_start: number;
    before_end_enabled: boolean;
    before_end: number;
    after_end_enabled: boolean;
    after_end: number;
    no_check_in_enabled: boolean;
    no_check_in_after: number;
    no_check_out_enabled: boolean;
    no_check_out_after: number;
}

export class TimesheetSubJobSetting {
    id?: Nullable<string>;
    sub_job_title?: Nullable<string>;
    all_user?: Nullable<boolean>;
    user?: Nullable<Nullable<User>[]>;
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

export class TimesheetsGeneralSetting {
    id: string;
    workweek_starts_on: number;
    daily_limit?: Nullable<string>;
    auto_clock_out?: Nullable<string>;
    working_hours_calculation: WorkingHoursCalculationEnum;
    manual_or_shift_minimum_hours: ManualOrShiftMinimumHoursEnum;
    minimum_hours_manual_full_day: string;
    minimum_hours_manual_half_day: string;
    payroll_export_time_format: PayrollExportTimeFormatEnum;
    timezone: string;
    restrict_clock_in: boolean;
    restrict_clock_in_to: number;
    restrict_clock_out: boolean;
    restrict_clock_out_to: number;
}

export class WorkDuration {
    id: string;
    user_id?: Nullable<number>;
    time_entry_id?: Nullable<number>;
    check_in_time?: Nullable<DateTime>;
    check_out_time?: Nullable<DateTime>;
}

export class Workweek {
    id: string;
    monday: boolean;
    monday_start_time: string;
    monday_end_time: string;
    tuesday: boolean;
    tuesday_start_time: string;
    tuesday_end_time: string;
    wednesday: boolean;
    wednesday_start_time: string;
    wednesday_end_time: string;
    thursday: boolean;
    thursday_start_time: string;
    thursday_end_time: string;
    friday: boolean;
    friday_start_time: string;
    friday_end_time: string;
    saturday: boolean;
    saturday_start_time: string;
    saturday_end_time: string;
    sunday: boolean;
    sunday_start_time: string;
    sunday_end_time: string;
}

export type DateTime = any;
type Nullable<T> = T | null;
