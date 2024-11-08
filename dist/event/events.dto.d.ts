export declare class CreateEventDto {
    readonly user_id: number;
    readonly event_name: string;
    readonly location: string;
    readonly event_start_date: Date;
    readonly event_end_date: Date;
    readonly description: string;
    readonly event_type: string;
    readonly image: string;
    readonly registration_fee: number;
    readonly trending: boolean;
}
export declare class UpdateEventDto {
    readonly event_name?: string;
    readonly location?: string;
    readonly event_start_date?: Date;
    readonly event_end_date?: Date;
    readonly description?: string;
    readonly user_type?: string;
    readonly event_type: string;
    readonly image: string;
    readonly status?: string;
    readonly registration_fee?: number;
    readonly trending?: boolean;
}
