/**
 * TypeScript interfaces for API data models
 * These match the Spring Boot backend entities
 */

// ============= Common Types =============

export type UserRole = 'USER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'FLAGGED';
export type DatasetStatus = 'VERIFIED' | 'PENDING' | 'FLAGGED';
export type ModuleStatus = 'not-started' | 'in-progress' | 'completed';
export type DifficultyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type IncidentCategory = 'POLLUTION' | 'ILLEGAL_FISHING' | 'HABITAT_DESTRUCTION' | 'SPECIES_THREAT' | 'OTHER';
export type IncidentSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type IncidentStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
export type SavedItemType = 'module' | 'region' | 'species' | 'dataset';
export type Trend = 'up' | 'down' | 'stable';

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: ApiError[];
  timestamp?: string;
}

export interface ApiError {
  field?: string;
  message: string;
}

// ============= User Types =============

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
  joinDate?: string; // ISO 8601
  lastLogin?: string; // ISO 8601
  modulesCompleted?: number;
  datasetsUploaded?: number;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateUserRoleRequest {
  role: UserRole;
}

export interface FlagUserRequest {
  reason: string;
}

// ============= Learning Module Types =============

export interface LearningModule {
  id: number;
  title: string;
  description: string;
  icon?: string;
  lessonsCount: number;
  duration: string; // e.g., "2h 30m"
  category: string;
  difficultyLevel: DifficultyLevel;
  progress?: number;
  status?: ModuleStatus | string;
  userProgress?: UserModuleProgress;
}

export interface UserModuleProgress {
  progress: number; // 0-100
  status: ModuleStatus;
  startedAt: string | null; // ISO 8601
  completedAt: string | null; // ISO 8601
  currentLesson?: number | null;
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  order: number;
  completed: boolean;
}

export interface LearningModuleDetail extends LearningModule {
  lessons: Lesson[];
}

export interface UpdateProgressRequest {
  moduleId: number;
  progress: number;
  currentLesson?: number;
}

// ============= Dataset Types =============

export interface Dataset {
  id: number;
  name: string;
  description: string;
  uploaderName?: string;
  uploaderId?: number;
  uploadDate: string; // ISO 8601
  fileSize: number; // bytes
  fileUrl: string;
  status: DatasetStatus;
  category: string;
  region?: string;
  regionId?: number;
  regionName?: string;
  speciesIds?: number[];
  speciesNames?: string[];
  downloadCount: number;
  createdAt?: string;
}

export interface UploadDatasetRequest {
  name: string;
  description: string;
  category: string;
  regionId: number;
  speciesIds?: number[];
  fileUrl: string;
  fileSize: number;
}

export interface FlagDatasetRequest {
  reason: string;
}

// ============= Analytics Types =============

export interface RegionAnalytics {
  id: number;
  name: string;
  views: number;
  change: string; // e.g., "+12%"
  lastWeekViews: number;
}

export interface ContributorAnalytics {
  id: number;
  name: string;
  email: string;
  contributions: number;
  trend: Trend;
  lastContribution: string; // ISO 8601
}

export interface PlatformStats {
  totalUsers: number;
  activeUsers: number;
  totalDatasets: number;
  totalModules: number;
  completionRate: number; // percentage
  averageEngagement: number; // percentage
  monthlyGrowth: string; // e.g., "+15%"
}

// ============= User Stats & Metrics Types =============

export interface UserStats {
  userId: number;
  modulesCompleted: number;
  datasetsUploaded: number;
  discussionsStarted: number;
  incidentsReported: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate?: string;
  updatedAt?: string;
}

export interface ImpactReport {
  id: number;
  title: string;
  reportType: string;
  impact: string;
  uploadedBy: string;
  regionId?: number;
  regionName?: string;
}

export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  extendedDetails: string;
  impact: 'positive' | 'mixed' | 'negative' | string;
}

export interface PerformanceMetrics {
  knowledgeScore: number; // 0-100
  learningStreak: number; // days
  engagementLevel: number; // 0-100
  impactContribution: number; // 0-100
  lastUpdated: string; // ISO 8601
}

// ============= Saved Items Types =============

export interface SavedItem {
  id: number;
  type: SavedItemType;
  item: {
    id: number;
    title: string;
    description: string;
    imageUrl: string | null;
  };
  savedAt: string; // ISO 8601
}

export interface SaveItemRequest {
  itemType: SavedItemType;
  itemId: number;
}

// ============= Discussion Forum Types =============

export interface DiscussionTopic {
  id: number;
  title: string;
  author: {
    id: number;
    name: string;
  };
  repliesCount: number;
  viewsCount: number;
  createdAt: string; // ISO 8601
  lastReplyAt: string | null; // ISO 8601
  category: string;
}

export interface DiscussionReply {
  id: number;
  content: string;
  author: {
    id: number;
    name: string;
  };
  createdAt: string; // ISO 8601
  likesCount: number;
  userLiked: boolean;
}

export interface CreateDiscussionRequest {
  title: string;
  content: string;
  category: string;
}

export interface CreateReplyRequest {
  content: string;
}

// ============= Incident Reporting Types =============

export interface IncidentReport {
  reportId: number;
  userId: number;
  contractorId: number;
  regionId: number;
  regionName: string;
  reportType: IncidentCategory;
  title: string;
  summaryText: string;
  status: IncidentStatus;
  submittedAt?: string;
  createdAt?: string;
}

export interface CreateIncidentRequest {
  userId: number;
  contractorId: number;
  regionId: number;
  regionName: string;
  reportType: IncidentCategory;
  title: string;
  summaryText: string;
}

export interface IncidentStats {
  reportsThisMonth: {
    count: number;
    change: string;
  };
  underInvestigation: {
    count: number;
    change: string;
  };
  resolved: {
    count: number;
    change: string;
  };
  bySeverity: {
    LOW: number;
    MEDIUM: number;
    HIGH: number;
    CRITICAL: number;
  };
}

export interface UpdateIncidentStatusRequest {
  status: IncidentStatus;
}

// ============= Region & Species Types =============

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Region {
  id: number;
  name: string;
  description: string;
  coordinates: string;
  oceanName?: string;
  type?: string;
}

export interface RegionDetail extends Region {
  species: Species[];
  datasets: {
    id: number;
    name: string;
    uploadDate: string;
  }[];
}

export interface Species {
  id: number;
  commonName: string;
  scientificName: string;
  description: string;
  imageUrl: string | null;
  conservationStatus: string;
  category?: string;
  habitat?: string;
  averageSize?: string;
  averageLifespan?: string;
  diet?: string;
  threats?: string[];
  isFeatured?: boolean;
  datasetCount?: number;
}

// ============= Educational Portal Types =============

export interface EducationalPortal {
  id: number;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  category: string;
  resourcesCount: number;
}

// ============= Query Parameter Types =============

export interface PaginationParams {
  page?: number;
  size?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface UserQueryParams extends PaginationParams, SortParams {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface DatasetQueryParams extends PaginationParams, SortParams {
  search?: string;
  status?: DatasetStatus;
  category?: string;
}

export interface ModuleQueryParams {
  category?: string;
  status?: ModuleStatus;
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface DiscussionQueryParams extends PaginationParams, SortParams {
  search?: string;
  category?: string;
}

export interface IncidentQueryParams extends PaginationParams {
  status?: IncidentStatus;
  category?: IncidentCategory;
  severity?: IncidentSeverity;
}

export interface RegionQueryParams extends PaginationParams {
  search?: string;
  sortBy?: 'name' | 'views';
}

export interface SpeciesQueryParams extends PaginationParams {
  search?: string;
  regionId?: number;
}

export interface SavedItemsQueryParams extends PaginationParams {
  type?: SavedItemType;
}

export interface ContributorAnalyticsParams {
  period?: 'week' | 'month' | 'year';
  limit?: number;
}

// ============= Paginated Response Types =============

export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}

export type UsersResponse = {
  content: User[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
};
export type DatasetsResponse = {
  content: Dataset[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
};
export type ModulesResponse = {
  content: LearningModule[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
};
export type DiscussionsResponse = PaginatedResponse<DiscussionTopic>;
export type DiscussionRepliesResponse = PaginatedResponse<DiscussionReply>;
export type IncidentsResponse = PaginatedResponse<IncidentReport>;
export type RegionsResponse = Region[];
export type SpeciesResponse = {
  content: Species[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
};
export type SavedItemsResponse = PaginatedResponse<SavedItem>;
export type RegionAnalyticsResponse = { regions: RegionAnalytics[] };
export type ContributorAnalyticsResponse = { contributors: ContributorAnalytics[] };
export type PortalsResponse = { portals: EducationalPortal[] };
