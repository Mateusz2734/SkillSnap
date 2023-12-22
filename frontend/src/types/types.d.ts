export type Category = {
  category: string;
};

export type ReportReason = {
  reason: string;
};

export type Skill = {
  skill: string;
};

export type User = {
  createdAt: Date;
  id: number;
  username: string;
  role: string;
  discordUsername: string;
};

type Credentials = {
  username: string;
  password: string;
};

export type Offer = {
  createdAt: Date;
  offerID: number;
  userID: number;
  skill: string;
  description: string;
};

export type Report = {
  createdAt: Date;
  reportID: number;
  reportingUserID: number;
  reportedUserID?: number;
  reportedOfferID?: number;
  reason: string;
  description: string;
  status: string;
};

export type Review = {
  createdAt: Date;
  reviewID: number;
  reviewerUserID: number;
  reviewedUserID: number;
  rating: number;
  description: string;
};

export type ApiError = Status & {
  message?: string;
  errors?: string[];
  fieldErrors?: {
    [key: string]: string;
  };
};

type Status = {
  status: string;
};

export type GetHealthResponse = Status;

type Meta = {
  offset: number;
  limit: number;
};

export type GetOffersResponse = Status & {
  offers: Offer[];
  meta: Meta;
};

export type PostOfferResponse = Status & {
  offer: Offer;
};

export type DeleteOfferResponse = Status;

export type GetOfferResponse = Status & {
  offer: Offer;
};

export type GetReportsResponse = Status & {
  reports: Report[];
};

export type PostReportResponse = Status & {
  report: Report;
};

export type GetCategoriesResponse = Status & {
  categories: Category[];
};

export type PostCategoryResponse = Status & {
  category: Category;
};

export type GetSkillsResponse = Status & {
  skills: Skill[];
};

export type PostSkillResponse = Status & {
  skill: Skill;
};

export type GetCategoriesBySkillResponse = GetCategoriesResponse;

export type GetGeneralStatsResponse = Status & {
  userCount: number;
  offerCount: number;
  reviewCountByStars: {
    starCount: number;
    count: number;
  }[];
  offerCountByCategory: {
    category: string;
    count: number;
  }[];
  offerCountBySkill: {
    skill: string;
    count: number;
  }[];
};

export type GetUserStatsResponse = Status & {
  userID: number;
  reportCount: number;
  reviewCount: number;
  offerCount: number;
  averageStars: number;
};

export type PostUserResponse = Status & {
  user: User;
};

export type GetUsersResponse = Status & {
  users: User[];
};

export type DeleteUserResponse = Status;
