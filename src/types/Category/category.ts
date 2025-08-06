export interface CategoryResponseDto {
    id: string;
    name: string;
    description: string;
    parent_id: string | null;
}