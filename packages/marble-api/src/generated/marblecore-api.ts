/**
 * Marble Core API
 * 1.0.0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "@oazapfts/runtime";
import * as QS from "@oazapfts/runtime/query";
export const defaults: Oazapfts.Defaults<Oazapfts.CustomHeaders> = {
    headers: {},
    baseUrl: "http://localhost:8080",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    localDevlopmentServer: "http://localhost:8080"
};
export type Token = {
    access_token: string;
    token_type: string;
    expires_at: string;
};
export type CredentialsDto = {
    credentials: {
        organization_id: string;
        partner_id?: string;
        role: string;
        actor_identity: {
            user_id?: string;
            email?: string;
            first_name?: string;
            last_name?: string;
            api_key_name?: string;
        };
        permissions: string[];
    };
};
export type Outcome = "approve" | "review" | "decline" | "null" | "unknown";
export type PaginationCount = {
    value: number;
    is_max_count: boolean;
};
export type Pagination = {
    start_index: number;
    end_index: number;
    total_count: PaginationCount;
};
export type CaseStatus = "open" | "investigating" | "discarded" | "resolved";
export type CaseContributor = {
    id: string;
    case_id: string;
    user_id: string;
    created_at: string;
};
export type CaseTag = {
    id: string;
    case_id: string;
    tag_id: string;
    created_at: string;
};
export type Case = {
    id: string;
    created_at: string;
    decisions_count: number;
    name: string;
    status: CaseStatus;
    inbox_id: string;
    contributors: CaseContributor[];
    tags: CaseTag[];
};
export type Error = {
    code: number;
    message: string;
};
export type PivotValueDto = {
    pivot_id: string | null;
    pivot_value: string | null;
};
export type DecisionDto = {
    id: string;
    "case"?: Case;
    created_at: string;
    error?: Error;
    outcome: Outcome;
    pivot_values: PivotValueDto[];
    scenario: {
        id: string;
        description: string;
        name: string;
        scenario_iteration_id: string;
        version: number;
    };
    score: number;
    trigger_object: {
        [key: string]: any;
    };
    trigger_object_type: string;
};
export type CreateDecisionBody = {
    scenario_id: string;
    trigger_object: object;
    object_type: string;
};
export type ConstantDto = ((string | null) | (number | null) | (boolean | null) | (ConstantDto[] | null) | ({
    [key: string]: ConstantDto;
} | null)) | null;
export type EvaluationErrorCodeDto = "UNEXPECTED_ERROR" | "UNDEFINED_FUNCTION" | "WRONG_NUMBER_OF_ARGUMENTS" | "MISSING_NAMED_ARGUMENT" | "ARGUMENTS_MUST_BE_INT_OR_FLOAT" | "ARGUMENTS_MUST_BE_INT_FLOAT_OR_TIME" | "ARGUMENT_MUST_BE_INTEGER" | "ARGUMENT_MUST_BE_STRING" | "ARGUMENT_MUST_BE_BOOLEAN" | "ARGUMENT_MUST_BE_LIST" | "ARGUMENT_MUST_BE_CONVERTIBLE_TO_DURATION" | "ARGUMENT_MUST_BE_TIME" | "ARGUMENT_REQUIRED" | "ARGUMENT_INVALID_TYPE" | "LIST_NOT_FOUND" | "DATABASE_ACCESS_NOT_FOUND" | "PAYLOAD_FIELD_NOT_FOUND" | "NULL_FIELD_READ" | "NO_ROWS_READ" | "DIVISION_BY_ZERO" | "PAYLOAD_FIELD_NOT_FOUND" | "RUNTIME_EXPRESSION_ERROR";
export type EvaluationErrorDto = {
    error: EvaluationErrorCodeDto;
    message: string;
    argument_index?: number;
    argument_name?: string;
};
export type NodeEvaluationDto = {
    return_value: {
        value?: ConstantDto;
        is_omitted: boolean;
    };
    errors: EvaluationErrorDto[] | null;
    children?: NodeEvaluationDto[];
    named_children?: {
        [key: string]: NodeEvaluationDto;
    };
};
export type RuleExecutionDto = {
    error?: Error;
    description: string;
    name: string;
    result: boolean;
    rule_id: string;
    score_modifier: number;
    rule_evaluation?: NodeEvaluationDto;
};
export type DecisionDetailDto = DecisionDto & {
    rules: RuleExecutionDto[];
};
export type CreateCaseBody = {
    name: string;
    inbox_id: string;
    decision_ids?: string[];
};
export type CaseEventDtoBase = {
    id: string;
    case_id: string;
    created_at: string;
    event_type: string;
};
export type CaseCreatedEvent = {
    event_type: "case_created";
} & CaseEventDtoBase & {
    user_id?: string;
};
export type CaseStatusUpdatedEvent = {
    event_type: "status_updated";
} & CaseEventDtoBase & {
    new_value: CaseStatus;
    user_id: string;
};
export type DecisionAddedEvent = {
    event_type: "decision_added";
} & CaseEventDtoBase & {
    user_id?: string;
};
export type CommentAddedEvent = {
    event_type: "comment_added";
} & CaseEventDtoBase & {
    additional_note: string;
    user_id: string;
};
export type NameUpdatedEvent = {
    event_type: "name_updated";
} & CaseEventDtoBase & {
    new_value: string;
    user_id: string;
};
export type CaseTagsUpdatedEventDto = {
    event_type: "tags_updated";
} & CaseEventDtoBase & {
    /** comma separated list of tag ids */
    new_value: string;
    user_id: string;
};
export type FileAddedEvent = {
    event_type: "file_added";
} & CaseEventDtoBase & {
    additional_note: string;
    user_id: string;
};
export type InboxChangedEvent = {
    event_type: "inbox_changed";
} & CaseEventDtoBase & {
    new_value: string;
    user_id: string;
};
export type CaseEventDto = CaseCreatedEvent | CaseStatusUpdatedEvent | DecisionAddedEvent | CommentAddedEvent | NameUpdatedEvent | CaseTagsUpdatedEventDto | FileAddedEvent | InboxChangedEvent;
export type CaseFile = {
    id: string;
    case_id: string;
    created_at: string;
    file_name: string;
};
export type CaseDetailDto = Case & {
    decisions: {
        id: string;
        created_at: string;
        trigger_object: {
            [key: string]: any;
        };
        trigger_object_type: string;
        outcome: Outcome;
        pivot_values: PivotValueDto[];
        scenario: {
            id: string;
            name: string;
            description: string;
            scenario_iteration_id: string;
            version: number;
        };
        score: number;
        error?: Error;
    }[];
    events: CaseEventDto[];
    files: CaseFile[];
};
export type UpdateCaseBody = {
    name?: string;
    inbox_id?: string;
    status?: CaseStatus;
};
export type Tag = {
    id: string;
    name: string;
    color: string;
    organization_id: string;
    created_at: string;
    cases_count?: number;
};
export type ScheduledExecution = {
    finished_at: string | null;
    id: string;
    /** Whether the execution was manual or not */
    manual: boolean;
    number_of_created_decisions: number;
    scenario_id: string;
    scenario_iteration_id: string;
    scenario_name: string;
    scenario_trigger_object_type: string;
    started_at: string;
    status: string;
};
export type UploadLog = {
    started_at: string;
    finished_at: string;
    status: string;
    lines_processed: number;
};
export type CustomList = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};
export type CreateCustomListBody = {
    name: string;
    description: string;
};
export type CustomListValue = {
    id: string;
    value: string;
};
export type CustomListWithValues = CustomList & {
    values?: CustomListValue[];
};
export type UpdateCustomListBody = {
    name: string;
    description: string;
};
export type CreateCustomListValueBody = {
    value: string;
};
export type ScenarioDto = {
    id: string;
    createdAt: string;
    decision_to_case_inbox_id?: string;
    decision_to_case_outcomes: Outcome[];
    decision_to_case_workflow_type: "DISABLED" | "CREATE_CASE" | "ADD_TO_CASE_IF_POSSIBLE";
    description: string;
    liveVersionId?: string;
    name: string;
    organization_id: string;
    triggerObjectType: string;
};
export type ScenarioCreateInputDto = {
    description: string;
    name: string;
    triggerObjectType: string;
};
export type ScenarioUpdateInputDto = {
    decision_to_case_inbox_id?: string;
    decision_to_case_outcomes?: Outcome[];
    decision_to_case_workflow_type?: "DISABLED" | "CREATE_CASE" | "ADD_TO_CASE_IF_POSSIBLE";
    description?: string;
    name?: string;
};
export type ScenarioIterationDto = {
    id: string;
    scenarioId: string;
    version: number | null;
    createdAt: string;
    updatedAt: string;
};
export type NodeDto = {
    name?: string;
    constant?: ConstantDto;
    children?: NodeDto[];
    named_children?: {
        [key: string]: NodeDto;
    };
};
export type CreateScenarioIterationRuleBodyDto = {
    scenarioIterationId: string;
    displayOrder: number;
    name: string;
    description: string;
    rule_group: string;
    formula_ast_expression: (NodeDto) | null;
    scoreModifier: number;
};
export type CreateScenarioIterationBody = {
    scenarioId: string;
    body?: {
        trigger_condition_ast_expression?: (NodeDto) | null;
        scoreReviewThreshold?: number;
        scoreRejectThreshold?: number;
        rules?: CreateScenarioIterationRuleBodyDto[];
    };
};
export type ScenarioIterationRuleDto = {
    id: string;
    scenarioIterationId: string;
    displayOrder: number;
    name: string;
    description: string;
    rule_group: string;
    formula_ast_expression: (NodeDto) | null;
    scoreModifier: number;
    createdAt: string;
};
export type ScenarioIterationWithBodyDto = ScenarioIterationDto & {
    body: {
        trigger_condition_ast_expression?: (NodeDto) | null;
        scoreReviewThreshold?: number;
        scoreRejectThreshold?: number;
        rules: ScenarioIterationRuleDto[];
        schedule?: string;
    };
};
export type UpdateScenarioIterationBody = {
    body?: {
        trigger_condition_ast_expression?: (NodeDto) | null;
        scoreReviewThreshold?: number;
        scoreRejectThreshold?: number;
        schedule?: string;
    };
};
export type ScenarioValidationErrorCodeDto = "DATA_MODEL_NOT_FOUND" | "TRIGGER_OBJECT_NOT_FOUND" | "TRIGGER_CONDITION_REQUIRED" | "RULE_FORMULA_REQUIRED" | "SCORE_REVIEW_THRESHOLD_REQUIRED" | "SCORE_REJECT_THRESHOLD_REQUIRED" | "SCORE_REJECT_REVIEW_THRESHOLDS_MISSMATCH";
export type ScenarioValidationErrorDto = {
    error: ScenarioValidationErrorCodeDto;
    message: string;
};
export type ScenarioValidationDto = {
    trigger: {
        errors: ScenarioValidationErrorDto[];
        trigger_evaluation: NodeEvaluationDto;
    };
    rules: {
        errors: ScenarioValidationErrorDto[];
        rules: {
            [key: string]: {
                errors: ScenarioValidationErrorDto[];
                rule_evaluation: NodeEvaluationDto;
            };
        };
    };
    decision: {
        errors: ScenarioValidationErrorDto[];
    };
};
export type UpdateScenarioIterationRuleBodyDto = {
    displayOrder?: number;
    name?: string;
    description?: string;
    rule_group?: string;
    formula_ast_expression?: (NodeDto) | null;
    scoreModifier?: number;
};
export type PublicationAction = "publish" | "unpublish";
export type ScenarioPublication = {
    id: string;
    createdAt: string;
    scenarioIterationId: string;
    publicationAction: PublicationAction;
};
export type CreateScenarioPublicationBody = {
    scenarioIterationId: string;
    publicationAction: PublicationAction;
};
export type ScenarioPublicationStatusDto = {
    preparation_status: "required" | "ready_to_activate";
    preparation_service_status: "available" | "occupied";
};
export type FieldDto = {
    id: string;
    data_type: "Bool" | "Int" | "Float" | "String" | "Timestamp" | "unknown";
    description: string;
    is_enum: boolean;
    name: string;
    nullable: boolean;
    table_id: string;
    values?: (string | number)[];
    unicity_constraint: "no_unicity_constraint" | "pending_unique_constraint" | "active_unique_constraint";
};
export type LinkToSingleDto = {
    id: string;
    parent_table_name: string;
    parent_table_id: string;
    parent_field_name: string;
    parent_field_id: string;
    child_table_name: string;
    child_table_id: string;
    child_field_name: string;
    child_field_id: string;
};
export type TableDto = {
    id: string;
    name: string;
    description: string;
    fields: {
        [key: string]: FieldDto;
    };
    links_to_single?: {
        [key: string]: LinkToSingleDto;
    };
};
export type DataModelDto = {
    tables: {
        [key: string]: TableDto;
    };
};
export type CreateTableBody = {
    name: string;
    description: string;
};
export type UpdateTableBody = {
    description?: string;
};
export type CreateTableFieldDto = {
    name: string;
    description: string;
    "type": "Bool" | "Int" | "Float" | "String" | "Timestamp";
    nullable: boolean;
    is_enum?: boolean;
    is_unique?: boolean;
};
export type UpdateTableFieldDto = {
    description?: string;
    is_enum?: boolean;
    is_unique?: boolean;
};
export type CreateTableLinkBody = {
    name: string;
    parent_table_id: string;
    parent_field_id: string;
    child_table_id: string;
    child_field_id: string;
};
export type OpenApiSpec = {
    info?: object;
    openapi: string;
    tags: object[];
    paths: object;
    components?: {
        schemas?: object;
        securitySchemes?: object;
    };
};
export type PivotDto = {
    id: string;
    created_at: string;
    base_table: string;
    base_table_id: string;
    pivot_table: string;
    pivot_table_id: string;
    field: string;
    field_id: string;
    path_links: string[];
    path_link_ids: string[];
};
export type CreatePivotInputDto = {
    base_table_id: string;
    field_id?: string;
    path_link_ids?: string[];
};
export type AnalyticsDto = {
    embedding_type: "global_dashboard" | "unknown_embedding_type";
    signed_embedding_url: string;
};
export type ApiKeyDto = {
    id: string;
    description: string;
    organization_id: string;
    /** 3 first characters of the API key */
    prefix: string;
    role: string;
};
export type CreateApiKeyBody = {
    description: string;
    role: string;
};
export type CreatedApiKeyDto = ApiKeyDto & {
    key: string;
};
export type UserDto = {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    organization_id: string;
};
export type CreateUser = {
    email: string;
    role: string;
    organization_id: string;
    first_name: string;
    last_name: string;
};
export type UpdateUser = {
    email: string;
    role: string;
    organization_id: string;
    first_name: string;
    last_name: string;
};
export type OrganizationDto = {
    id: string;
    name: string;
    export_scheduled_execution_s3?: string;
};
export type CreateOrganizationBodyDto = {
    name: string;
};
export type UpdateOrganizationBodyDto = {
    name?: string;
};
export type FuncAttributes = {
    name: string;
    number_of_arguments: number;
    named_arguments?: string[];
};
export type InboxUserDto = {
    id: string;
    inbox_id: string;
    user_id: string;
    role: string;
};
export type InboxDto = {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    status: "active" | "archived";
    users?: InboxUserDto[];
    cases_count?: number;
};
export type CreateInboxBodyDto = {
    name: string;
};
export type AddInboxUserBodyDto = {
    user_id: string;
    role: string;
};
/**
 * Get an access token
 */
export function postToken({ xApiKey, authorization }: {
    xApiKey?: string;
    authorization?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Token;
    } | {
        status: 401;
        data: string;
    }>("/token", {
        ...opts,
        method: "POST",
        headers: oazapfts.mergeHeaders(opts?.headers, {
            "X-API-Key": xApiKey,
            Authorization: authorization
        })
    }));
}
/**
 * Get user credentials included in the token
 */
export function getCredentials(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CredentialsDto;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>("/credentials", {
        ...opts
    }));
}
/**
 * List decisions
 */
export function listDecisions({ caseId, endDate, hasCase, outcome, pivotValue, scenarioId, scheduledExecutionId, startDate, triggerObject, limit, next, offsetId, order, previous, sorting }: {
    caseId?: string[];
    endDate?: string;
    hasCase?: boolean;
    outcome?: Outcome[];
    pivotValue?: string;
    scenarioId?: string[];
    scheduledExecutionId?: string[];
    startDate?: string;
    triggerObject?: string[];
    limit?: number;
    next?: boolean;
    offsetId?: string;
    order?: "ASC" | "DESC";
    previous?: boolean;
    sorting?: "created_at";
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Pagination & {
            items: DecisionDto[];
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/decisions${QS.query(QS.explode({
        "case_id[]": caseId,
        end_date: endDate,
        has_case: hasCase,
        "outcome[]": outcome,
        pivot_value: pivotValue,
        "scenario_id[]": scenarioId,
        "scheduled_execution_id[]": scheduledExecutionId,
        start_date: startDate,
        "trigger_object[]": triggerObject,
        limit,
        next,
        offset_id: offsetId,
        order,
        previous,
        sorting
    }))}`, {
        ...opts
    }));
}
/**
 * Create a decision
 */
export function createDecision(createDecisionBody: CreateDecisionBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: DecisionDetailDto;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>("/decisions", oazapfts.json({
        ...opts,
        method: "POST",
        body: createDecisionBody
    })));
}
/**
 * List cases
 */
export function listCases({ status, inboxId, startDate, endDate, sorting, offsetId, previous, next, limit, order }: {
    status?: CaseStatus[];
    inboxId?: string[];
    startDate?: string;
    endDate?: string;
    sorting?: "created_at";
    offsetId?: string;
    previous?: boolean;
    next?: boolean;
    limit?: number;
    order?: "ASC" | "DESC";
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Pagination & {
            items: Case[];
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/cases${QS.query(QS.explode({
        "status[]": status,
        "inbox_id[]": inboxId,
        start_date: startDate,
        end_date: endDate,
        sorting,
        offset_id: offsetId,
        previous,
        next,
        limit,
        order
    }))}`, {
        ...opts
    }));
}
/**
 * Create a case
 */
export function createCase(createCaseBody: CreateCaseBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            "case": CaseDetailDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>("/cases", oazapfts.json({
        ...opts,
        method: "POST",
        body: createCaseBody
    })));
}
/**
 * Get a case by id
 */
export function getCase(caseId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CaseDetailDto;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/cases/${encodeURIComponent(caseId)}`, {
        ...opts
    }));
}
/**
 * Update a case
 */
export function updateCase(caseId: string, updateCaseBody: UpdateCaseBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            "case": CaseDetailDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/cases/${encodeURIComponent(caseId)}`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body: updateCaseBody
    })));
}
/**
 * Add decisions to a case
 */
export function addDecisionsToCase(caseId: string, body: {
    /** List of decision IDs to add to the case */
    decision_ids: string[];
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            "case": CaseDetailDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/cases/${encodeURIComponent(caseId)}/decisions`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Add a comment to a case
 */
export function addCommentToCase(caseId: string, body: {
    comment: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            "case": CaseDetailDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/cases/${encodeURIComponent(caseId)}/comments`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Define tags for a case
 */
export function updateTagsForCase(caseId: string, body: {
    /** List of all tag IDs for the case */
    tag_ids: string[];
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            "case": CaseDetailDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/cases/${encodeURIComponent(caseId)}/case_tags`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Download a case file
 */
export function downloadCaseFile(caseFileId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            /** Signed url to download the case file's content */
            url: string;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/cases/files/$${encodeURIComponent(caseFileId)}/download_link`, {
        ...opts
    }));
}
/**
 * List tags
 */
export function listTags({ withCaseCount }: {
    withCaseCount?: boolean;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            tags: Tag[];
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/tags${QS.query(QS.explode({
        withCaseCount
    }))}`, {
        ...opts
    }));
}
/**
 * Create a tag
 */
export function createTag(body: {
    name: string;
    color: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            tag: Tag;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>("/tags", oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Update a tag
 */
export function updateTag(tagId: string, body: {
    name: string;
    color: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            tag: Tag;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/tags/${encodeURIComponent(tagId)}`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body
    })));
}
/**
 * Delete a tag
 */
export function deleteTag(tagId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Tag;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/tags/${encodeURIComponent(tagId)}`, {
        ...opts,
        method: "DELETE"
    }));
}
/**
 * List Scheduled Executions
 */
export function listScheduledExecutions({ scenarioId }: {
    scenarioId?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            scheduled_executions: ScheduledExecution[];
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/scheduled-executions${QS.query(QS.explode({
        scenario_id: scenarioId
    }))}`, {
        ...opts
    }));
}
/**
 * Get a decision by id
 */
export function getDecision(decisionId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: DecisionDetailDto;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/decisions/${encodeURIComponent(decisionId)}`, {
        ...opts
    }));
}
/**
 * Ingest some data
 */
export function createIngestion(objectType: string, body: object, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 422;
        data: object;
    }>(`/ingestion/${encodeURIComponent(objectType)}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get ingestion upload logs for an object type
 */
export function getIngestionUploadLogs(objectType: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UploadLog[];
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/ingestion/${encodeURIComponent(objectType)}/upload-logs`, {
        ...opts
    }));
}
/**
 * List custom list
 */
export function listCustomLists(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            custom_lists: CustomList[];
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>("/custom-lists", {
        ...opts
    }));
}
/**
 * Create a custom list
 */
export function createCustomList(createCustomListBody: CreateCustomListBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            custom_list: CustomList;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 422;
        data: object;
    }>("/custom-lists", oazapfts.json({
        ...opts,
        method: "POST",
        body: createCustomListBody
    })));
}
/**
 * Get values of the corresponding custom list
 */
export function getCustomList(customListId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            custom_list: CustomListWithValues;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/custom-lists/${encodeURIComponent(customListId)}`, {
        ...opts
    }));
}
/**
 * Update a custom list
 */
export function updateCustomList(customListId: string, updateCustomListBody: UpdateCustomListBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            custom_list: CustomList;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/custom-lists/${encodeURIComponent(customListId)}`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body: updateCustomListBody
    })));
}
/**
 * Delete a custom list
 */
export function deleteCustomList(customListId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CustomList;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/custom-lists/${encodeURIComponent(customListId)}`, {
        ...opts,
        method: "DELETE"
    }));
}
/**
 * Create a custom list value
 */
export function createCustomListValue(customListId: string, createCustomListValueBody: CreateCustomListValueBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            custom_list_value: CustomListValue;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 409;
        data: string;
    } | {
        status: 422;
        data: object;
    }>(`/custom-lists/${encodeURIComponent(customListId)}/values`, oazapfts.json({
        ...opts,
        method: "POST",
        body: createCustomListValueBody
    })));
}
/**
 * Delete a custom list value
 */
export function deleteCustomListValue(customListId: string, customListValueId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CustomListValue;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/custom-lists/${encodeURIComponent(customListId)}/values/${encodeURIComponent(customListValueId)}`, {
        ...opts,
        method: "DELETE"
    }));
}
/**
 * List scenarios
 */
export function listScenarios(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ScenarioDto[];
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>("/scenarios", {
        ...opts
    }));
}
/**
 * Create a scenario
 */
export function createScenario(scenarioCreateInputDto: ScenarioCreateInputDto, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ScenarioDto;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 422;
        data: object;
    }>("/scenarios", oazapfts.json({
        ...opts,
        method: "POST",
        body: scenarioCreateInputDto
    })));
}
/**
 * Get a scenario by id
 */
export function getScenario(scenarioId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ScenarioDto;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/scenarios/${encodeURIComponent(scenarioId)}`, {
        ...opts
    }));
}
/**
 * Update a scenario
 */
export function updateScenario(scenarioId: string, scenarioUpdateInputDto: ScenarioUpdateInputDto, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ScenarioDto;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/scenarios/${encodeURIComponent(scenarioId)}`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body: scenarioUpdateInputDto
    })));
}
/**
 * List iterations
 */
export function listScenarioIterations({ scenarioId }: {
    scenarioId?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ScenarioIterationDto[];
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/scenario-iterations${QS.query(QS.explode({
        scenarioId
    }))}`, {
        ...opts
    }));
}
/**
 * Create a scenario iteration
 */
export function createScenarioIteration(createScenarioIterationBody: CreateScenarioIterationBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ScenarioIterationWithBodyDto;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>("/scenario-iterations", oazapfts.json({
        ...opts,
        method: "POST",
        body: createScenarioIterationBody
    })));
}
/**
 * Get a scenario iteration by id
 */
export function getScenarioIteration(scenarioIterationId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ScenarioIterationWithBodyDto;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/scenario-iterations/${encodeURIComponent(scenarioIterationId)}`, {
        ...opts
    }));
}
/**
 * Create draft from a scenario iteration
 */
export function createDraftFromScenarioIteration(scenarioIterationId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ScenarioIterationWithBodyDto;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/scenario-iterations/${encodeURIComponent(scenarioIterationId)}`, {
        ...opts,
        method: "POST"
    }));
}
/**
 * Update a scenario iteration
 */
export function updateScenarioIteration(scenarioIterationId: string, updateScenarioIterationBody: UpdateScenarioIterationBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            iteration: ScenarioIterationWithBodyDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/scenario-iterations/${encodeURIComponent(scenarioIterationId)}`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body: updateScenarioIterationBody
    })));
}
/**
 * Schedule a scenario execution
 */
export function scheduleScenarioExecution(scenarioIterationId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 201;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/scenario-iterations/${encodeURIComponent(scenarioIterationId)}/schedule-execution`, {
        ...opts,
        method: "POST"
    }));
}
/**
 * Validate a scenario iteration by id. A rule or trigger can be override in the body
 */
export function validateScenarioIteration(scenarioIterationId: string, body?: {
    trigger_or_rule: NodeDto;
    rule_id: string | null;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            scenario_validation: ScenarioValidationDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/scenario-iterations/${encodeURIComponent(scenarioIterationId)}/validate`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Commit a scenario iteration
 */
export function commitScenarioIteration(scenarioIterationId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            iteration: ScenarioIterationWithBodyDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/scenario-iterations/${encodeURIComponent(scenarioIterationId)}/commit`, {
        ...opts,
        method: "POST"
    }));
}
/**
 * List rules
 */
export function listScenarioIterationRules({ scenarioIterationId }: {
    scenarioIterationId?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ScenarioIterationRuleDto[];
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/scenario-iteration-rules${QS.query(QS.explode({
        scenarioIterationId
    }))}`, {
        ...opts
    }));
}
/**
 * Create a scenario iteration rule
 */
export function createScenarioIterationRule(createScenarioIterationRuleBodyDto: CreateScenarioIterationRuleBodyDto, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            rule: ScenarioIterationRuleDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>("/scenario-iteration-rules", oazapfts.json({
        ...opts,
        method: "POST",
        body: createScenarioIterationRuleBodyDto
    })));
}
/**
 * Get a scenario iteration rule by id
 */
export function getScenarioIterationRule(ruleId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            rule: ScenarioIterationRuleDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/scenario-iteration-rules/${encodeURIComponent(ruleId)}`, {
        ...opts
    }));
}
/**
 * Update a scenario iteration rule
 */
export function updateScenarioIterationRule(ruleId: string, updateScenarioIterationRuleBodyDto: UpdateScenarioIterationRuleBodyDto, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            rule: ScenarioIterationRuleDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/scenario-iteration-rules/${encodeURIComponent(ruleId)}`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body: updateScenarioIterationRuleBodyDto
    })));
}
/**
 * Delete a scenario iteration rule
 */
export function deleteScenarioIterationRule(ruleId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 204;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/scenario-iteration-rules/${encodeURIComponent(ruleId)}`, {
        ...opts,
        method: "DELETE"
    }));
}
/**
 * List scenario publications
 */
export function listScenarioPublications({ scenarioId, scenarioIterationId, publicationAction }: {
    scenarioId?: string;
    scenarioIterationId?: string;
    publicationAction?: PublicationAction;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ScenarioPublication[];
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/scenario-publications${QS.query(QS.explode({
        scenarioId,
        scenarioIterationId,
        publicationAction
    }))}`, {
        ...opts
    }));
}
/**
 * Create a scenario publication
 */
export function createScenarioPublication(createScenarioPublicationBody: CreateScenarioPublicationBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ScenarioPublication[];
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>("/scenario-publications", oazapfts.json({
        ...opts,
        method: "POST",
        body: createScenarioPublicationBody
    })));
}
/**
 * Get scenario publication preparation status
 */
export function getScenarioPublicationPreparationStatus(scenarioIterationId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ScenarioPublicationStatusDto;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/scenario-publications/preparation${QS.query(QS.explode({
        scenario_iteration_id: scenarioIterationId
    }))}`, {
        ...opts
    }));
}
/**
 * Start scenario publication preparation
 */
export function startScenarioPublicationPreparation(body: {
    scenario_iteration_id: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 202;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>("/scenario-publications/preparation", oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get a scenario publication by id
 */
export function getScenarioPublication(scenarioPublicationId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ScenarioPublication;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/scenario-publications/${encodeURIComponent(scenarioPublicationId)}`, {
        ...opts
    }));
}
/**
 * Get the data model associated with the current organization (present in the JWT)
 */
export function getDataModel(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            data_model: DataModelDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>("/data-model", {
        ...opts
    }));
}
/**
 * Create a new table on the data model
 */
export function postDataModelTable(createTableBody: CreateTableBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 204;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>("/data-model/tables", oazapfts.json({
        ...opts,
        method: "POST",
        body: createTableBody
    })));
}
/**
 * Update data model table
 */
export function patchDataModelTable(tableId: string, updateTableBody: UpdateTableBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 204;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/data-model/tables/${encodeURIComponent(tableId)}`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body: updateTableBody
    })));
}
/**
 * Create a new field on a table from the data model
 */
export function postDataModelTableField(tableId: string, createTableFieldDto: CreateTableFieldDto, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 204;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/data-model/tables/${encodeURIComponent(tableId)}/fields`, oazapfts.json({
        ...opts,
        method: "POST",
        body: createTableFieldDto
    })));
}
/**
 * Update data model field
 */
export function patchDataModelField(fieldId: string, updateTableFieldDto: UpdateTableFieldDto, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 204;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/data-model/fields/${encodeURIComponent(fieldId)}`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body: updateTableFieldDto
    })));
}
/**
 * Create a new link on a table from the data model
 */
export function postDataModelTableLink(createTableLinkBody: CreateTableLinkBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 204;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>("/data-model/links", oazapfts.json({
        ...opts,
        method: "POST",
        body: createTableLinkBody
    })));
}
/**
 * Get the OpenAPI specification of the client specific API for data ingestion and decision making
 */
export function getDataModelOpenApi(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: OpenApiSpec;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>("/data-model/openapi", {
        ...opts
    }));
}
/**
 * Get the pivots associated with the current organization (can be filtered by table_id)
 */
export function listDataModelPivots({ tableId }: {
    tableId?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            pivots: PivotDto[];
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/data-model/pivots${QS.query(QS.explode({
        table_id: tableId
    }))}`, {
        ...opts
    }));
}
/**
 * Create a pivot
 */
export function createDataModelPivot(createPivotInputDto: CreatePivotInputDto, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            pivot: PivotDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>("/data-model/pivots", oazapfts.json({
        ...opts,
        method: "POST",
        body: createPivotInputDto
    })));
}
/**
 * List analytics associated with the current organization (present in the JWT)
 */
export function listAnalytics(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            analytics: AnalyticsDto[];
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>("/analytics", {
        ...opts
    }));
}
/**
 * List api keys associated with the current organization (present in the JWT)
 */
export function listApiKeys(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            api_keys: ApiKeyDto[];
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>("/apikeys", {
        ...opts
    }));
}
/**
 * Create an api key
 */
export function createApiKey(createApiKeyBody: CreateApiKeyBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            api_key: CreatedApiKeyDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>("/apikeys", oazapfts.json({
        ...opts,
        method: "POST",
        body: createApiKeyBody
    })));
}
/**
 * Delete an api key
 */
export function deleteApiKey(apiKeyId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 204;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/apikeys/${encodeURIComponent(apiKeyId)}`, {
        ...opts,
        method: "DELETE"
    }));
}
/**
 * List all users present in the database
 */
export function listUsers(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            users: UserDto[];
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>("/users", {
        ...opts
    }));
}
/**
 * Create a user
 */
export function createUser(createUser: CreateUser, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            user: UserDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>("/users", oazapfts.json({
        ...opts,
        method: "POST",
        body: createUser
    })));
}
/**
 * Get a user by id
 */
export function getUser(userId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            user: UserDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/users/${encodeURIComponent(userId)}`, {
        ...opts
    }));
}
/**
 * Delete a user by id
 */
export function deleteUser(userId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 204;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/users/${encodeURIComponent(userId)}`, {
        ...opts,
        method: "DELETE"
    }));
}
/**
 * Update a user
 */
export function updateUser(userId: string, updateUser: UpdateUser, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            user: UserDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/users/${encodeURIComponent(userId)}`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body: updateUser
    })));
}
/**
 * List all organizations present in the database
 */
export function listOrganizations(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            organizations: OrganizationDto[];
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>("/organizations", {
        ...opts
    }));
}
/**
 * Create an organization
 */
export function createOrganization(createOrganizationBodyDto: CreateOrganizationBodyDto, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            organization: OrganizationDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>("/organizations", oazapfts.json({
        ...opts,
        method: "POST",
        body: createOrganizationBodyDto
    })));
}
/**
 * Get an organization by id
 */
export function getOrganization(organizationId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            organization: OrganizationDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/organizations/${encodeURIComponent(organizationId)}`, {
        ...opts
    }));
}
/**
 * Update an organization by id
 */
export function updateOrganization(organizationId: string, updateOrganizationBodyDto: UpdateOrganizationBodyDto, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            organization: OrganizationDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/organizations/${encodeURIComponent(organizationId)}`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body: updateOrganizationBodyDto
    })));
}
/**
 * Delete an organization by id
 */
export function deleteOrganization(organizationId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 204;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/organizations/${encodeURIComponent(organizationId)}`, {
        ...opts,
        method: "DELETE"
    }));
}
/**
 * List all users of an organization
 */
export function listOrganizationUsers(organizationId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            users: UserDto[];
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/organizations/${encodeURIComponent(organizationId)}/users`, {
        ...opts
    }));
}
/**
 * List all identifiers
 */
export function listIdentifiers(scenarioId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            database_accessors: NodeDto[];
            payload_accessors: NodeDto[];
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/editor/${encodeURIComponent(scenarioId)}/identifiers`, {
        ...opts
    }));
}
/**
 * List all operators
 */
export function listOperators(scenarioId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            operators_accessors: FuncAttributes[];
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/editor/${encodeURIComponent(scenarioId)}/operators`, {
        ...opts
    }));
}
/**
 * List all inboxes
 */
export function listInboxes({ withCaseCount }: {
    withCaseCount?: boolean;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            inboxes: InboxDto[];
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/inboxes${QS.query(QS.explode({
        withCaseCount
    }))}`, {
        ...opts
    }));
}
/**
 * Create an inbox
 */
export function createInbox(createInboxBodyDto: CreateInboxBodyDto, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            inbox: InboxDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>("/inboxes", oazapfts.json({
        ...opts,
        method: "POST",
        body: createInboxBodyDto
    })));
}
/**
 * Get an inbox by id
 */
export function getInbox(inboxId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            inbox: InboxDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    } | {
        status: 404;
        data: string;
    }>(`/inboxes/${encodeURIComponent(inboxId)}`, {
        ...opts
    }));
}
/**
 * Update an inbox
 */
export function updateInbox(inboxId: string, body: {
    name: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            inbox: InboxDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/inboxes/${encodeURIComponent(inboxId)}`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body
    })));
}
/**
 * Delete an inbox
 */
export function deleteInbox(inboxId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 204;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/inboxes/${encodeURIComponent(inboxId)}`, {
        ...opts,
        method: "DELETE"
    }));
}
/**
 * List all users of an inbox
 */
export function listInboxUsers(inboxId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            inbox_users: InboxUserDto[];
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/inboxes/${encodeURIComponent(inboxId)}/users`, {
        ...opts
    }));
}
/**
 * Add a user to an inbox
 */
export function addInboxUser(inboxId: string, addInboxUserBodyDto: AddInboxUserBodyDto, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            inbox_user: InboxUserDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/inboxes/${encodeURIComponent(inboxId)}/users`, oazapfts.json({
        ...opts,
        method: "POST",
        body: addInboxUserBodyDto
    })));
}
/**
 * List all inbox users
 */
export function listAllInboxUsers(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            inbox_users: InboxUserDto[];
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>("/inbox_users", {
        ...opts
    }));
}
/**
 * Get an inbox user by id
 */
export function getInboxUser(inboxUserId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            inbox_user: InboxUserDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/inbox_users/${encodeURIComponent(inboxUserId)}`, {
        ...opts
    }));
}
/**
 * Update an inbox user
 */
export function updateInboxUser(inboxUserId: string, body: {
    role: string;
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            inbox_user: InboxUserDto;
        };
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/inbox_users/${encodeURIComponent(inboxUserId)}`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body
    })));
}
/**
 * Delete an inbox user
 */
export function deleteInboxUser(inboxUserId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 204;
    } | {
        status: 401;
        data: string;
    } | {
        status: 403;
        data: string;
    }>(`/inbox_users/${encodeURIComponent(inboxUserId)}`, {
        ...opts,
        method: "DELETE"
    }));
}