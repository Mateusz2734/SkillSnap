export type Category = string;

export type ReportReason = string;

export type Skill = string;

export type User = {
  createdAt: Date;
  userId: number;
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
  offerId: number;
  userId: number;
  skill: string;
  description: string;
};

export type Report = {
  createdAt: Date;
  reportId: number;
  reportingUserId: number;
  reportedOfferId: number;
  reason: string;
  description: string;
  status: string;
};

export type Review = {
  createdAt: Date;
  reviewId: number;
  reviewingUserId: number;
  reviewedUserId: number;
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

export type PostAuthLoginResponse = Status & {
  authenticationToken: string;
  authenticationTokenExpiry: Date;
  user: User;
};

export type GetAuthLogoutResponse = Status;

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

export type PostOfferPayload = {
  skill: string;
  description: string;
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

export type PostReportPayload = {
  reportedOfferId: number;
  reason: string;
  description: string;
  status: string;
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
  userId: number;
  reviewCount: number;
  offerCount: number;
  averageStars: number;
};

export type PostUserResponse = Status;

export type PostUserPayload = {
  username: string;
  password: string;
  discordUsername: string;
};

export type GetUsersResponse = Status & {
  users: User[];
};

export type DeleteUserResponse = Status;

export type GetReviewsResponse = Status & {
  reviewingUserId?: number;
  reviewedUserId?: number;
  reviews: Review[];
};

export type PostReviewResponse = Status & {
  review: Review;
};

export type PostReviewPayload = {
  reviewedUserId: number;
  starCount: number;
  review: string;
};

export type DeleteReviewResponse = Status;

export type DeleteReportResponse = Status;