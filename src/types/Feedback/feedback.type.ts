export interface FeedbackDTO {
    service_rating: number;
    service_feedback: string;
    supplier_rating: number;
    supplier_feedback: string;
}
export interface SystemFeedbackGroup {
    id: string;
    text: string;
}
export interface UserAnswer {
    question_id: string;
    answer: string;
}
export interface UserAnswerSystem {
    user_name: string;
    user_answers: UserAnswer[];
}


