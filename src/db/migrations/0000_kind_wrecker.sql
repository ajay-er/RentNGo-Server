CREATE TABLE `vehicleType` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type_name` varchar(100) NOT NULL,
	`category` enum('Car','Bike') NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `vehicleType_id` PRIMARY KEY(`id`)
);
