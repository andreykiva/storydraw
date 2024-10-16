import { PaginationInput } from 'src/common/dto/pagination.dto';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

/**
 * Interface for the Notifications service, defining methods for managing user notifications.
 */
export interface NotificationsServiceInterface {
	/**
	 * Retrieves all notifications for a specific user with pagination support.
	 *
	 * @param userId - The ID of the user whose notifications are to be retrieved.
	 * @param paginationInput - Pagination parameters, including limit and cursor.
	 * @returns A promise that resolves to an array of notifications.
	 */
	findAllByUserId(userId: string, paginationInput: PaginationInput): Promise<Notification[]>;

	/**
	 * Retrieves like notifications for a specific user with pagination support.
	 *
	 * @param userId - The ID of the user whose like notifications are to be retrieved.
	 * @param paginationInput - Pagination parameters, including limit and cursor.
	 * @returns A promise that resolves to an array of like notifications.
	 */
	findLikesNotifications(userId: string, paginationInput: PaginationInput): Promise<Notification[]>;

	/**
	 * Retrieves comment notifications for a specific user with pagination support.
	 *
	 * @param userId - The ID of the user whose comment notifications are to be retrieved.
	 * @param paginationInput - Pagination parameters, including limit and cursor.
	 * @returns A promise that resolves to an array of comment notifications.
	 */
	findCommentsNotifications(userId: string, paginationInput: PaginationInput): Promise<Notification[]>;

	/**
	 * Retrieves mention notifications for a specific user with pagination support.
	 *
	 * @param userId - The ID of the user whose mention notifications are to be retrieved.
	 * @param paginationInput - Pagination parameters, including limit and cursor.
	 * @returns A promise that resolves to an array of mention notifications.
	 */
	findMentionsNotifications(userId: string, paginationInput: PaginationInput): Promise<Notification[]>;

	/**
	 * Retrieves follow notifications for a specific user with pagination support.
	 *
	 * @param userId - The ID of the user whose follow notifications are to be retrieved.
	 * @param paginationInput - Pagination parameters, including limit and cursor.
	 * @returns A promise that resolves to an array of follow notifications.
	 */
	findFollowsNotifications(userId: string, paginationInput: PaginationInput): Promise<Notification[]>;

	/**
	 * Creates a new notification.
	 *
	 * @param createNotificationDto - The data transfer object containing the details of the notification to create.
	 * @returns A promise that resolves to the created notification.
	 */
	create(createNotificationDto: CreateNotificationDto): Promise<Notification>;

	/**
	 * Retrieves the count of new notifications for a specific user.
	 *
	 * @param userId - The ID of the user whose new notifications count is to be retrieved.
	 * @returns A promise that resolves to the count of new notifications.
	 */
	getNewNotificationsCount(userId: string): Promise<number>;

	/**
	 * Updates the last viewed date of notifications for a specific user.
	 *
	 * @param userId - The ID of the user whose last notifications viewed date is to be updated.
	 * @returns A promise that resolves to a boolean indicating success.
	 */
	updateLastNotificationsViewed(userId: string): Promise<boolean>;
}
