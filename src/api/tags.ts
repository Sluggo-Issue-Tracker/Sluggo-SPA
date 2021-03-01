export interface TagRecord {
    id: number,
    object_uuid: number,
    title: string,
    created: Date,
    activated?: Date,
    deactivated?: Date
}