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
