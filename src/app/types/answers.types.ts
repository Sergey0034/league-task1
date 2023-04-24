export type AnswersTypes = {
  owner: {
    account_id: number,
    reputation: number,
    user_id: number,
    user_type: string,
    profile_image: string,
    display_name: string,
    link: string
  },
  is_accepted: boolean,
  score: number,
  last_activity_date: number,
  last_edit_date: number,
  creation_date: number,
  answer_id: number,
  question_id: number,
  content_license: string,
  body: string
}
