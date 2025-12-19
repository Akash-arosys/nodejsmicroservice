export enum AnswerOptionType {
  TEXT = "text",
  IMAGE = "image",
}

export enum UserRole {
  ADMIN = "admin",
  STAFF = "staff",
  STUDENT = "student"
}
export enum UserStatusOptions {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCK = "block",
  DELETE = "delete",
}

export enum UserPerformance {
  POOR = "poor",
  ORDINARY = "ordinary",
  EXTRAORDINARY = "extra-ordinary",
  EXCEPTIONAL = "exceptional",
}

export enum StatusOptions {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DELETE = "delete",
}

export enum SubcriptionStatusOptions {
  ACTIVE = "active",
  EXPIRED = "expired",
  CANCEL = "cancel",
  DELETE = "delete",
}

export enum PaymentStatusOptions {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export enum PaymentMethods {
  NETBANKING = "netbanking",
  CARD = "card",
  UPI = "upi",
  RAZORPAY = "razorpay",
}

export enum DifficultyLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  VERYHARD = "very-hard"
}
export enum QuestionType {
  FITB = "fill-in-the-blank",
  MCQSC = "mcq-single-correct",
  MCQMC = "mcq-multi-correct",
  TNF = "true-and-false",
}